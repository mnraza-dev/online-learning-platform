import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { GoogleGenerativeAI, GoogleGenAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import mime from "mime";
import { writeFile } from "fs/promises"; // use promise-based API

const PROMPT = `
Generate Learning Course based on the following details. Output only valid JSON.
Schema:
{
  "course": {
    "title": "string",
    "description": "string",
    "noOfChapters": "number",
    "category": "string",
    "isVideoIncluded": "boolean",
    "difficulty_level": "string",
    "duration": "number",
    "imagePrompt": "string",
    "chapters": [
      {
        "chapterName": "string",
        "duration": "number",
        "topics": ["string"]
      }
    ]
  }
}
User Input: 
`;

export async function POST(req) {
  const user = await currentUser();
  const { courseId, ...formData } = await req.json();

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = PROMPT + JSON.stringify(formData);

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const Rawjson = text.replace(/```json|```/g, "").trim();
    const jsonResponse = JSON.parse(Rawjson);

    // extract image prompt
    const imagePrompt = jsonResponse?.course?.imagePrompt;

    let imagePath = null;
    if (imagePrompt) {
      try {
        imagePath = await generateImageFromPrompt(imagePrompt, courseId);
      } catch (imgErr) {
        console.warn("⚠️ Failed to generate image:", imgErr);
      }
    }

    // Save to database
    await db.insert(coursesTable).values({
      ...formData,
      courseJson: {
        ...jsonResponse,
        courseBannerPath: imagePath || null,
      },
      userEmail: user?.primaryEmailAddress?.emailAddress,
      cid: courseId,
    });

    return NextResponse.json({ courseId });
  } catch (err) {
    console.error("🔥 Error generating course:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Helper: generate image from Gemini and save to disk
async function generateImageFromPrompt(imagePrompt, courseId) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const model = "gemini-2.0-flash-preview-image-generation";
  const config = {
    responseModalities: ["IMAGE"],
    responseMimeType: "image/png",
  };

  const contents = [
    {
      role: "user",
      parts: [{ text: imagePrompt }],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  for await (const chunk of response) {
    const inlineData = chunk?.candidates?.[0]?.content?.parts?.[0]?.inlineData;
    if (inlineData) {
      const fileExtension = mime.getExtension(inlineData.mimeType || "png");
      const buffer = Buffer.from(inlineData.data || "", "base64");
      const fileName = `public/course-banners/${courseId}.${fileExtension}`;
      await writeFile(fileName, buffer);
      return `/course-banners/${courseId}.${fileExtension}`; // relative URL path
    }
  }

  return null;
}

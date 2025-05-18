import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

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
    "chapters": [
      {
        "chapterName": "string",
        "duration": "number",
        "topics": ["string"],
        "imagePrompt": "string"
      }
    ]
  }
}
User Input: Reactjs, 3 chapters
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

    await db.insert(coursesTable).values({
      ...formData,
      courseJson: jsonResponse,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      cid: courseId,
    });

    return NextResponse.json({ courseId });
  } catch (err) {
    console.error("🔥 Error generating course:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

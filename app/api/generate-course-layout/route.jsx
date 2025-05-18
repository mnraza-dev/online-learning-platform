import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const PROMPT = `
Generate Learning Course depends on following details. In which Make sure to add course name, description, Chapter Name, image prompt (Create a modern, flat-style 2D digital illustration representing user Topic. Include UI/UX elements such as mockup screens, text blocks, icons, buttons , and creative workspace tools. Add symbolic elements related to user Course, like sticky notes, design components, and visual aids. Use a vibrant color palette ( blues, purple, oranges) with a clean, professional look. The illustration should feel creative , tech savvy and and educational, ideal for visualizing concepts in user Course) for Course Banner in 3D format, Topic under each chapters, Duration for each chapters etc, in JSON format only
Schema:
{
“course”:{
“title”:”string”,
“description”:”string”,
“noOfChapters”:”number”,
“category”:”string”,
“isVideoIncluded”:”boolean”,
“difficulty_level”:”string”,
“duration”:”number”,
“chapters”:[{
	“chapterName”:”string”,
            “duration”:”number”,
“topics”:[“string”],
“imagePrompt”:”string”
}],
}
},
User Input : Reactjs , 3 chapters
`;
export async function POST(req) {
  const user = await currentUser();
  const { courseId, ...formData } = await req.json();
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const config = {
    responseMimeType: "text/plain",
  };
  const model = "gemini-2.5-pro-preview-05-06";
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: PROMPT + JSON.stringify(formData),
        },
      ],
    },
  ];
  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  // Save to database
  const RawResp = response?.candidates[0]?.content?.parts?.[0]?.text;
  const Rawjson = RawResp.replace("```json", "").replace("```", "");
  const jsonResponse = JSON.parse(Rawjson);
  if (!RawResp) {
    return NextResponse.json({ error: "Empty AI response" }, { status: 500 });
  }

  const result = await db.insert(coursesTable).values({
    ...formData,
    courseJson: jsonResponse,
    userEmail: user?.primaryEmailAddress?.emailAddress,
    cid: courseId,
  });

  return NextResponse.json({
    courseId: courseId,
  });
}

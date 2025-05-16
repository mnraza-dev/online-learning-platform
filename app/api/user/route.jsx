import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, name } = await req.json();
  return NextResponse.json({
    email,
    name,
  });
}

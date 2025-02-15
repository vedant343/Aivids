import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Video from "@/models/Video";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const {
      sourceVideoUrl,
      transformedVideoUrl,
      transformationParams,
      downloadLink,
    } = await req.json();

    const newVideo = new Video({
      sourceVideoUrl,
      transformedVideoUrl,
      prompt: transformationParams.prompt,
      downloadLink,
    });
    await newVideo.save();

    return NextResponse.json(
      { message: "Video saved successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving video:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

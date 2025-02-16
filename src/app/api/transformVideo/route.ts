import { NextResponse } from "next/server";
import { fal } from "@fal-ai/client";

fal.config({
  credentials: process.env.NEXT_PUBLIC_FAL_KEY,
});
const falClient = fal;
export async function POST(req: Request) {
  try {
    const { prompt, videoUrl } = await req.json();

    // Log the incoming request data
    console.log("Received request with prompt:", prompt);
    console.log("Received video URL:", videoUrl);
    console.log("Using FAL API Key:", process.env.NEXT_PUBLIC_FAL_KEY);

    const result = await falClient.subscribe(
      "fal-ai/hunyuan-video/video-to-video",
      {
        input: {
          prompt,
          num_inference_steps: 30,
          aspect_ratio: "16:9",
          resolution: "720p",
          num_frames: 129,
          enable_safety_checker: true,
          video_url: videoUrl,
          strength: 0.85,
        },
        logs: true,
        onQueueUpdate: (update) => {
          if (update.status === "IN_PROGRESS") {
            update.logs.map((log) => log.message).forEach(console.log);
          }
        },
      }
    );

    return NextResponse.json({
      data: result.data,
      requestId: result.requestId,
    });
  } catch (error) {
    console.error("Error during video transformation:", error);
    alert(`Error during video transformation: ${error.message}`);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

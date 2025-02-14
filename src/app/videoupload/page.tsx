"use client";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import "dotenv/config";
import { uploadVideo } from "@/lib/cloudinary";
import { NextResponse } from "next/server";

function Page() {
  const [videoUrl, setVideoUrl] = useState("");
  const [prompt, setPrompt] = useState("");

  console.log(
    "Upload Preset:",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  );
  // connectToDatabase();

  const handleUpload = async (result: any) => {
    const url = result.info.secure_url;
    setVideoUrl(url);
    console.log("Video URL:", url);
    await transformVideo(url, prompt);
  };

  const transformVideo = async (videoUrl: string, prompt: string) => {
    try {
      const response = await fetch("/api/transformVideo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoUrl, prompt }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error transforming video:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-6">
      <div>
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          options={{
            resourceType: "video",
            clientAllowedFormats: ["mov", "mp4"],
          }}
          onSuccess={handleUpload}
        >
          {({ open }) => {
            return <button onClick={() => open()}>Upload a Video</button>;
          }}
        </CldUploadWidget>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <textarea
          className="bg-black w-full max-w-md p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your prompt here..."
          onChange={(e) => setPrompt(e.target.value)}
        ></textarea>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
          Enter
        </button>
      </div>
    </div>
  );
}

export default Page;

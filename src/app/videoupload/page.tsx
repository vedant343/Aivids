"use client";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import "dotenv/config";
import { uploadVideo } from "@/lib/cloudinary";
import { NextResponse } from "next/server";
import { FaUpload } from "react-icons/fa";

function Page() {
  const [videoUrl, setVideoUrl] = useState("");
  const [transformedVideoUrl, setTransformedVideoUrl] = useState("");
  const [prompt, setPrompt] = useState("");

  console.log(
    "Upload Preset:",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  );

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

      if (data.data && data.data.transformedVideoUrl) {
        const transformedVideoUrl = data.data.transformedVideoUrl;
        const downloadLink = data.data.downloadLink;
        setTransformedVideoUrl(transformedVideoUrl);
        await saveTransformedVideo(
          videoUrl,
          transformedVideoUrl,
          prompt,
          downloadLink
        );
      }
    } catch (error) {
      console.error("Error transforming video:", error);
    }
  };

  const saveTransformedVideo = async (
    sourceVideoUrl: string,
    transformedVideoUrl: string,
    prompt: string,
    downloadLink: string
  ) => {
    try {
      const response = await fetch("/api/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sourceVideoUrl,
          transformedVideoUrl,
          transformationParams: { prompt },
          downloadLink,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error saving video:", error);
    }
  };

  const isTransformButtonDisabled = !videoUrl || !prompt;

  return (
    <div className="bg-white flex flex-col items-center justify-center min-h-screen p-4 space-y-6">
      <div>
        <div className="border border-gray-300 rounded-md p-2 bg-blue-500">
          <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            options={{
              resourceType: "video",
              clientAllowedFormats: ["mov", "mp4"],
            }}
            onSuccess={handleUpload}
          >
            {({ open }) => {
              return (
                <button
                  className="flex items-center justify-center text-white text-lg px-6 py-3 bg-transparent rounded-md"
                  onClick={() => open()}
                >
                  <FaUpload className="mr-2" />
                  Upload a Video
                </button>
              );
            }}
          </CldUploadWidget>
        </div>
        <p className="text-black text-center text-sm mt-2">
          Allowed formats: <strong>MP4, MOV</strong>
        </p>
      </div>

      <div className="border border-gray-500 rounded-md border-dotted p-4 w-full max-w-md">
        {videoUrl ? (
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-black text-lg font-semibold">
              Uploaded Video Preview:
            </h2>
            <video
              className="w-full border border-gray-300 rounded-md"
              controls
              src={videoUrl}
            />
          </div>
        ) : (
          <p className="text-center text-gray-700">Yet to upload a video</p>
        )}
      </div>

      <div className="flex flex-col items-center space-y-4">
        <textarea
          className="bg-white text-black w-full max-w-md p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your prompt here..."
          onChange={(e) => setPrompt(e.target.value)}
        ></textarea>
        <button
          className={`px-4 py-2 rounded-md transition ${
            isTransformButtonDisabled
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          disabled={isTransformButtonDisabled}
        >
          Transform
        </button>
      </div>

      {transformedVideoUrl && (
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-lg font-semibold">Transformed Video:</h2>
          <video
            className="w-full max-w-md border border-gray-300 rounded-md"
            controls
            src={transformedVideoUrl}
          />
          <a
            href={transformedVideoUrl}
            download
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            Download Transformed Video
          </a>
        </div>
      )}
    </div>
  );
}

export default Page;

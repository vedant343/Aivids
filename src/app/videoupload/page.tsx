"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import { FaUpload } from "react-icons/fa";
import DownloadButton from "../components/DownloadButton";

function Page() {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [transformedVideoUrl, setTransformedVideoUrl] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");

  const handleUpload = async (result: any) => {
    const url = result.info.secure_url;
    setVideoUrl(url);
    console.log("Video URL:", url);
  };

  const transformVideo = async (videoUrl: string, prompt: string) => {
    try {
      console.log("Sending request with:", { videoUrl, prompt });

      const response = await fetch("/api/transformVideo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoUrl, prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received response:", data);

      setTransformedVideoUrl(data.transformedVideoUrl);
      await saveTransformedVideo(
        videoUrl,
        data.transformedVideoUrl,
        prompt,
        data.data?.downloadLink
      );
    } catch (error) {
      console.error("Error transforming video:", error);
      alert("Error transforming video. Check console for details.");
    }
  };

  const saveTransformedVideo = async (
    sourceVideoUrl: string,
    transformedVideoUrl: string,
    prompt: string,
    downloadLink: string
  ) => {
    try {
      await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceVideoUrl,
          transformedVideoUrl,
          transformationParams: { prompt },
          downloadLink,
        }),
      });
    } catch (error) {
      console.error("Error saving video:", error);
    }
  };

  return (
    <div className="bg-white flex flex-col items-center justify-center min-h-screen p-4 space-y-6">
      <div className="border border-gray-300 rounded-md p-2 bg-black">
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
          options={{
            resourceType: "video",
            clientAllowedFormats: ["mov", "mp4"],
          }}
          onSuccess={handleUpload}
        >
          {({ open }) => (
            <button
              className="flex items-center justify-center text-white text-lg px-6 py-3 bg-transparent rounded-md"
              onClick={() => open()}
            >
              <FaUpload className="mr-2" /> Upload a Video
            </button>
          )}
        </CldUploadWidget>
      </div>

      {videoUrl && (
        <div className="border border-gray-500 rounded-md border-dotted p-4 w-full max-w-md">
          <video
            className="w-full border border-gray-300 rounded-md"
            controls
            src={videoUrl}
          />
        </div>
      )}

      <textarea
        className="bg-white text-black w-full max-w-md p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Write your prompt here..."
        onChange={(e) => setPrompt(e.target.value)}
      ></textarea>

      <button
        className={`px-4 py-2 rounded-md transition ${
          !videoUrl || !prompt
            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
            : "bg-black text-white"
        }`}
        disabled={!videoUrl && !prompt}
        onClick={() => transformVideo(videoUrl, prompt)}
      >
        Transform
      </button>

      {transformedVideoUrl && (
        <div className="flex flex-col items-center space-y-4">
          <video
            className="w-full max-w-md border border-gray-300 rounded-md"
            controls
            src={transformedVideoUrl}
          />
          <DownloadButton videoUrl={transformedVideoUrl} />
        </div>
      )}
    </div>
  );
}

export default Page;

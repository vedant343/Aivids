"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import { FaUpload } from "react-icons/fa";
import DownloadButton from "../components/DownloadButton";
import Navbar from "../components/Navbar";
import handleUpload from "./handleUpload";
import saveTransformedVideo from "./saveTransformedVideo";
//import transformVideo from "./transformVideo";

function Page() {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [transformedVideoUrl, setTransformedVideoUrl] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [downloadLink, setDownloadLink] = useState<string>("");

  const uploadHandler = handleUpload(setVideoUrl);

  const transformVideo = async (
    videoUrl: string,
    prompt: string,
    setIsLoading: (loading: boolean) => void,
    setTransformedVideoUrl: (url: string) => void,
    setDownloadLink: (url: string) => void,
    saveTransformedVideo: (
      sourceVideoUrl: string,
      transformedVideoUrl: string,
      prompt: string,
      downloadLink: string
    ) => Promise<void>
  ) => {
    setIsLoading(true);
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

      setTransformedVideoUrl(data.data.video.url);
      setDownloadLink(data.data.video.url);
      await saveTransformedVideo(
        videoUrl,
        data.data.video.url,
        prompt,
        data.data.video.url
      );
    } catch (error) {
      console.error("Error transforming video:", error);
      alert("Error transforming video. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-white flex flex-col items-center justify-center min-h-screen p-4 space-y-6 mt-10">
        <div className="border border-gray-300 rounded-md p-2 bg-black max-w-md">
          <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
            options={{
              resourceType: "video",
              clientAllowedFormats: ["mov", "mp4"],
            }}
            onSuccess={uploadHandler}
          >
            {({ open }) => (
              <div>
                <button
                  className="flex items-center justify-center text-white text-lg px-6 py-3 bg-transparent rounded-md"
                  onClick={() => open()}
                >
                  <FaUpload className="mr-2" /> Upload a Video
                </button>
              </div>
            )}
          </CldUploadWidget>
          <p className="text-white text-sm mt-2 text-center">
            (Allowed Format : mov, mp4)
          </p>
        </div>

        {videoUrl && (
          <div className="border-4 border-dotted text-black text-center text-lg border-gray-300 rounded-md p-4 w-full max-w-md">
            Uploaded Video Preview
            <video
              className="w-full border border-gray-300 rounded-md mt-2"
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
          className={`px-4 py-2 rounded-md transition flex items-center justify-center ${
            !videoUrl || !prompt || isLoading
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-black text-white"
          }`}
          disabled={!videoUrl || !prompt || isLoading}
          onClick={() =>
            transformVideo(
              videoUrl,
              prompt,
              setIsLoading,
              setTransformedVideoUrl,
              setDownloadLink,
              saveTransformedVideo
            )
          }
        >
          {isLoading ? (
            <div>
              Generating rseult<span className="loader"></span>
            </div>
          ) : (
            "Transform"
          )}
        </button>

        {transformedVideoUrl && (
          <div className="flex text-black flex-col items-center space-y-4">
            Video Preview
            <video
              className="w-full max-w-md border border-gray-300 rounded-md"
              controls
              src={transformedVideoUrl}
            />
            <DownloadButton videoUrl={downloadLink} disabled={isLoading} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;

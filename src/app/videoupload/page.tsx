"use client";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import "dotenv/config";
import { Upload, Video, ChevronDown, Wand2 } from "lucide-react";

function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Video className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-semibold text-gray-900">
              VideoAI
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">Help</button>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Page() {
  const [videoUrl, setVideoUrl] = useState("");
  const [transformedVideoUrl, setTransformedVideoUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [subtitlePosition, setSubtitlePosition] = useState("Bottom (75%)");
  const [showAdvanced, setShowAdvanced] = useState(false);

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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Add professional captions to your video using AI
        </h1>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Upload Video
            </h2>

            <CldUploadWidget
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
              options={{
                resourceType: "video",
                clientAllowedFormats: ["mov", "mp4"],
              }}
              onSuccess={handleUpload}
            >
              {({ open }) => (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-16 text-center hover:border-indigo-500 transition-colors cursor-pointer">
                  <Upload className="mx-auto h-16 w-16 text-gray-400" />
                  <div className="mt-6">
                    <p className="text-base text-gray-600">
                      Drag and drop your video here
                    </p>
                    <p className="text-sm text-gray-500 mt-1">or</p>
                    <button
                      onClick={open}
                      className="mt-2 text-sm text-indigo-600 font-medium hover:text-indigo-700"
                    >
                      Browse Files
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Supported formats: MP4, MOV (max 500MB)
                  </p>
                </div>
              )}
            </CldUploadWidget>

            <div className="mt-10">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtitles Position
              </label>
              <div className="relative">
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                  value={subtitlePosition}
                  onChange={(e) => setSubtitlePosition(e.target.value)}
                >
                  <option>Bottom (75%)</option>
                  <option>Top (25%)</option>
                  <option>Middle (50%)</option>
                </select>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Choose where to position the subtitles in the video
              </p>
            </div>

            <div className="mt-8">
              <button
                className="flex items-center w-full justify-between px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                <span>Advanced Settings</span>
                <ChevronDown
                  className={`h-5 w-5 transform ${
                    showAdvanced ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showAdvanced && (
                <div className="mt-4 space-y-6 p-6 bg-gray-50 rounded-md">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Font Size
                    </label>
                    <input
                      type="range"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      min="12"
                      max="36"
                      defaultValue="24"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Small</span>
                      <span>Large</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Text Color
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="color"
                        className="h-10 w-20"
                        defaultValue="#ffffff"
                      />
                      <div className="flex space-x-2">
                        <button
                          className="w-8 h-8 rounded-full bg-white border border-gray-300"
                          title="White"
                        ></button>
                        <button
                          className="w-8 h-8 rounded-full bg-yellow-300"
                          title="Yellow"
                        ></button>
                        <button
                          className="w-8 h-8 rounded-full bg-black"
                          title="Black"
                        ></button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button className="mt-10 w-full bg-indigo-600 text-white px-6 py-4 rounded-lg hover:bg-indigo-700 flex items-center justify-center space-x-2 text-lg font-medium">
              <Wand2 className="h-6 w-6" />
              <span>Generate Captions</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Page;

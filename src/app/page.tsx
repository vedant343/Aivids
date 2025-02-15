"use client";
import Link from "next/link";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";

interface Video {
  _id: string;
  sourceVideoUrl: string;
  transformedVideoUrl: string;
  transformationParams: {
    prompt: string;
  };
  downloadLink: string;
  createdAt: Date;
}

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch("/api/videos/history");
      const data = await response.json();
      setVideos(data);
    };

    fetchVideos();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black pt-16">
      <div>
        <Navbar />
      </div>
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4">
          Transform your videos with the help of FAL AI
        </h1>
        <p className="text-xl text-gray-700">
          Experience the power of AI-driven video transformation and unleash
          your creativity.
        </p>
      </div>
      <Link href="/videoupload">
        <button className="bg-black text-white px-8 py-4 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition">
          Get Started
          <span className="ml-1">➡️</span>
        </button>
      </Link>
      <section className="mt-16 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Tested Video Transformation by FAL
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Discover how our advanced AI technology transforms videos with
          stunning results.
        </p>
        {videos.map((video) => (
          <div key={video._id} className="border p-4 mb-4 rounded-md">
            <h3 className="font-bold">
              Prompt: {video.transformationParams.prompt}
            </h3>
            <div className="flex space-x-4">
              <div>
                <h4>Source Video Preview</h4>
                <video
                  className="w-full max-w-xs border border-gray-300 rounded-md"
                  controls
                  src={video.sourceVideoUrl}
                />
              </div>
              <div>
                <h4>Resulted Video Preview</h4>
                <video
                  className="w-full max-w-xs border border-gray-300 rounded-md"
                  controls
                  src={video.transformedVideoUrl}
                />
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

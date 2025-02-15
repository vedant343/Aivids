"use client";
import Link from "next/link";
import Navbar from "./components/Navbar";
import VideoList from "./components/VideoList"; // Import the VideoList component

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black pt-16">
      <Navbar />
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
      <VideoList /> {/* Include the VideoList component here */}
    </div>
  );
}

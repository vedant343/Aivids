"use client";
import Link from "next/link";
import Navbar from "./components/Navbar";
import VideoList from "./components/VideoList"; // Import the VideoList component
import { ArrowRight, Video, Wand2 } from "lucide-react";

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-300 p-6 hover:shadow-md transition duration-300">
      <div className="rounded-lg w-12 h-12 flex items-center justify-center bg-indigo-50 mb-4">
        <Icon className="w-6 h-6 text-indigo-600" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black pt-16 pb-10">
      <Navbar />
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-7xl font-bold pt-8 mb-7 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-500">
          Transform Your Videos with AI Magic
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Experience the future of video transformation. Create stunning visual
          effects and enhance your content with the power of artificial
          intelligence.
        </p>
        <button className="bg-indigo-600 text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-indigo-700 transition mx-auto">
          <Link href="/videoupload" className="flex items-center">
            Get Started
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 px-12">
        <FeatureCard
          icon={Wand2}
          title="AI-Powered Effects"
          description="Apply stunning visual effects using advanced AI algorithms"
        />
        <FeatureCard
          icon={Video}
          title="Real-time Processing"
          description="Transform your videos quickly with our optimized processing"
        />
        <FeatureCard
          icon={ArrowRight}
          title="Easy Export"
          description="Download your transformed videos in multiple formats"
        />
      </div>
      <VideoList /> {/* Include the VideoList component here */}
    </div>
  );
}

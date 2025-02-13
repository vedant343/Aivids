"use client";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import React from "react";
import "@uploadcare/react-uploader/core.css";

function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-6">
      {/* File Uploader */}
      <FileUploaderRegular
        sourceList="local, camera, facebook, gdrive"
        cameraModes="video"
        classNameUploader="uc-light"
        pubkey="d04b7482c7532345057c"
        accept=".mp4,.mov,video/mp4,video/quicktime"
      />

      {/* Prompt Input Section */}
      <div className="w-full max-w-md flex space-x-2">
        <textarea
          className="w-full p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          //rows="2"
          placeholder="Enter your prompt..."
        ></textarea>
        <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
          Enter
        </button>
      </div>
    </div>
  );
}

export default Page;

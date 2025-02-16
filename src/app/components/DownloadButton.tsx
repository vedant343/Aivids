"use client";

import { useState } from "react";
import { FaDownload } from "react-icons/fa";

export default function DownloadButton({
  videoUrl,
  disabled,
}: {
  videoUrl: string;
  disabled: boolean;
}) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!videoUrl) {
      alert("No video URL available.");
      return;
    }

    setLoading(true);

    try {
      const downloadUrl = `${videoUrl}?download=true`;
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "transformed-video.mp4";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading video:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center justify-center px-4 py-2 bg-black text-white rounded-md"
      disabled={loading || disabled}
    >
      {loading ? (
        "Downloading..."
      ) : (
        <>
          <FaDownload className="mr-2" />
          Download Video
        </>
      )}
    </button>
  );
}

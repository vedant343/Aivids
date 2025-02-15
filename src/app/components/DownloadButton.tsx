"use client";

import { useState } from "react";

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
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      disabled={loading || disabled}
    >
      {loading ? "Downloading..." : "Download Video"}
    </button>
  );
}

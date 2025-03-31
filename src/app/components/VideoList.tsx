import React, { useEffect, useState } from "react";

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

const VideoList = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("/api/videos/history");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        // Check if error is an instance of Error
        const message =
          error instanceof Error ? error.message : "Unknown error occurred";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Video Transformation History</h2>
      <div>
        {videos.map((video) => (
          <div key={video._id}>
            <h3>Prompt: {video.transformationParams.prompt}</h3>
            <video controls src={video.sourceVideoUrl} />
            <video controls src={video.transformedVideoUrl} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;

const saveTransformedVideo = async (
  sourceVideoUrl: string,
  transformedVideoUrl: string,
  prompt: string,
  downloadLink: string
): Promise<void> => {
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

export default saveTransformedVideo;

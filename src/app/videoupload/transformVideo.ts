export const transformVideo = async (
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

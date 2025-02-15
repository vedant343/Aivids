import { CloudinaryUploadWidgetResults } from "next-cloudinary";

const handleUpload =
  (setVideoUrl: (url: string) => void) =>
  async (result: CloudinaryUploadWidgetResults) => {
    const info = result.info;

    // Type guard to check if info is of type CloudinaryUploadWidgetInfo
    if (typeof info !== "string" && info && "secure_url" in info) {
      const url = info.secure_url;
      setVideoUrl(url);
      console.log("Video URL:", url);
    } else {
      console.error("Upload result does not contain a secure URL.");
    }
  };

export default handleUpload;

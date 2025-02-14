import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
});
export const uploadVideo = async (url: string) => {
  return cloudinary.uploader.upload(url, {
    resource_type: "video",
    allowed_formats: ["mp4", "mov"],
    folder: "video-transformations",
    invalidate: true,
  });
};

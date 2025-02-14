import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  sourceVideoUrl: { type: String, required: true },
  prompt: { type: String, required: true },
  transformedVideoUrl: { type: String, required: true },
  downloadLink: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
console.log("Video model created successfully!");

export default mongoose.model("Video", VideoSchema);

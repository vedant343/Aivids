const UploadInstructions = () => {
  return (
    <div className="border border-dotted border-gray-300 rounded-md p-6 bg-white shadow-md">
      <h2 className="text-xl text-center font-semibold mb-3">
        Instructions for Uploading
      </h2>
      <ul className="list-disc list-inside">
        <li>Upload a video in the following formats: mp4, mov</li>
        <li>Check the video preview of the uploaded video</li>
        <li>Type a relevant prompt in the input area</li>
        <li>Click on the Transform button</li>
        <li>Generating a new video may take a few minutes</li>
        <li>Click on the download button to obtain the resulting video</li>
      </ul>
    </div>
  );
};

export default UploadInstructions;

# AiVid

AiVid is a Next.js application that allows users to upload videos, apply transformations using AI, and download the transformed videos. The application leverages Cloudinary for video uploads and a custom AI service for video transformations.

![Demo Video](https://drive.google.com/uc?export=view&id1xKpyKcVegVE2d_Ft3adQ6moeiTisYi_D)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- Upload videos in formats like MP4 and MOV.
- Transform videos using AI with customizable prompts.
- View transformation history.
- Download transformed videos.

## Technologies Used

- **Next.js**: A React framework for building server-side rendered applications.
- **Cloudinary**: A cloud-based service for managing images and videos.
- **MongoDB**: A NoSQL database for storing video metadata.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **React Icons**: A library for including icons in React applications.

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/ai-vids.git
   cd ai-vids
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env.local` file in the root of the project and add the following variables:

   ```plaintext
   MONGODB_URI=your_mongodb_connection_string
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   NEXT_PUBLIC_CLOUDINARY_API_KEY=your_cloudinary_api_key
   NEXT_PUBLIC_CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset
   NEXT_PUBLIC_FAL_KEY=your_fal_api_key
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   ```

5. **Open your browser**:

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application in action.

## Usage

1. **Upload a Video**: Click on the "Upload a Video" button to select and upload a video file.
2. **Enter a Prompt**: After uploading, enter a prompt for the AI transformation.
3. **Transform the Video**: Click the "Transform" button to apply the transformation.
4. **View and Download**: Once the transformation is complete, you can view the transformed video and download it.

## API Endpoints

### Video Upload

- **POST** `/api/videos`
  - Description: Save video metadata to the database.
  - Request Body:
    ```json
    {
      "sourceVideoUrl": "string",
      "transformedVideoUrl": "string",
      "transformationParams": {
        "prompt": "string"
      },
      "downloadLink": "string"
    }
    ```

### Video History

- **GET** `/api/videos/history`
  - Description: Fetch the history of uploaded and transformed videos.

### Video Transformation

- **POST** `/api/transformVideo`
  - Description: Transform a video using AI.
  - Request Body:
    ```json
    {
      "videoUrl": "string",
      "prompt": "string"
    }
    ```

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

import Link from "next/link";
import { VideoIcon } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-white text-black p-4 fixed top-0 left-0 right-0 z-10 border-b border-gray-300 backdrop-blur-md shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <VideoIcon className="mr-2" />
          AiVid
        </h1>
        <div className="flex space-x-4 items-center">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link
            href="https://github.com/vedant343/ai-vids"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            <FaGithub className="text-xl" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

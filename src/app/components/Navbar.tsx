import Link from "next/link";
import { FileVideoIcon } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-violet-500 text-white p-4 fixed top-0 left-0 right-0 z-10 border-b border-gray-300 backdrop-blur-md shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center">
          <FileVideoIcon className="mr-2" />
          AiVids
        </Link>
        <div className="flex space-x-4 items-center">
          <Link
            href="https://github.com/vedant343/ai-vids"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:underline transition duration-300"
          >
            <FaGithub className="text-xl mr-1" />
            GitHub
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

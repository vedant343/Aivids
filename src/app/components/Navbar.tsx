import Link from "next/link";
import { VideoIcon } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white text-black p-4 fixed top-0 left-0 right-0 z-10 border-b border-gray-300 backdrop-blur-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold flex items-center">
          <VideoIcon className="mr-2" />
          ai-vid
        </h1>
        <div className="flex space-x-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

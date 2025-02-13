import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Link href="/videoupload">
        <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition">
          Get started
          <span className="ml-1">➡️</span>
        </button>
      </Link>
    </div>
  );
}

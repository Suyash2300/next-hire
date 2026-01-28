import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4">
      <h1 className="text-4xl font-extrabold">404</h1>

      <p className="text-gray-600">
        The page you are looking for does not exist.
      </p>

      <Link
        href="/"
        className="px-5 py-2 rounded-md bg-blue-700 text-white hover:bg-blue-600 transition"
      >
        Go back home
      </Link>
    </div>
  );
}

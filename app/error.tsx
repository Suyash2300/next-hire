"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
      <h2 className="text-2xl font-bold text-red-600">Something went wrong</h2>

      <p className="text-gray-600 max-w-md">
        An unexpected error occurred. Please try again.
      </p>

      <button
        onClick={reset}
        className="px-5 py-2 rounded-md bg-blue-700 text-white hover:bg-blue-600 transition"
      >
        Try again
      </button>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-6">
          We apologize for the inconvenience. Please try again or contact support if the problem
          persists.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={reset}>Try again</Button>
        </div>
      </div>
    </div>
  );
}

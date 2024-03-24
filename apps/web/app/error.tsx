"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex justify-center items-center flex-col h-screen gap-2">
      <div className="text-center">
        <h1 className="text-2xl font-bold">{error.message}</h1>
        <p>
          Sorry, the page you are looking for could not be found or has been
          removed.
        </p>
      </div>
      <div className="flex gap-2">
        <Button onClick={reset} variant="secondary">
          Try again
        </Button>
        <Button>Contact Support</Button>
      </div>
    </div>
  );
}

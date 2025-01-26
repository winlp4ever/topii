"use client";

import * as React from "react";

import { Progress } from "@/components/ui/progress";

export function LoadingView() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, [])

  return (
    <div
      className='fixed top-0 left-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-50 w-screen h-screen'
    >
      <Progress value={progress} className="w-[60%]" />
    </div>
  )
}

"use client";

import * as React from "react";

import { Progress } from "@/components/ui/progress";


interface LoadingViewProps {
  responseViewType?: 'Graph' | 'Response';
}


export const LoadingView: React.FC<LoadingViewProps> = ({ responseViewType = 'Graph'}) => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const targetProgress = 90; // Updated target progress
    const increment = 10;
    const interval = 100; // milliseconds

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + increment;
        if (newProgress >= targetProgress) {
          clearInterval(timer);
          return targetProgress;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className='fixed top-0 left-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-20 w-screen h-screen'
    >
      <Progress value={progress} className="w-[20%]" />
      <div className='text-sm text-center text-card-foreground p-6'>Loading {responseViewType} ...</div>
    </div>
  )
}

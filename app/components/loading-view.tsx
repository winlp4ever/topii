"use client";

import * as React from "react";

import { Progress } from "@/components/ui/progress";
import { useAppStore } from "../store";
import { capitalize } from "./utils";


interface LoadingViewProps {
  responseViewType?: 'Graph' | 'Response';
  viewMode?: 'full' | 'compact';
}


export const LoadingView: React.FC<LoadingViewProps> = ({
  responseViewType = 'Graph',
  viewMode = 'full'
}) => {
  const dataStateName = useAppStore((state) => state.data?.name);

  const [progress, setProgress] = React.useState(0);
  const [message, setMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (dataStateName !== undefined && dataStateName !== null && dataStateName !== '') {
      setMessage(capitalize(dataStateName + "..."));
    } else {
      setMessage("Loading " + responseViewType + "...");
    }
  }, [responseViewType, dataStateName]);

  React.useEffect(() => {
    const targetProgress = 90; // Updated target progress
    const increment = 1;
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

  const loadingViewStyle = viewMode === 'full' ?
    'fixed top-0 left-0 flex flex-col items-center justify-center bg-transparent bg-opacity-90 z-20 w-screen h-screen' :
    'fixed top-24 bg-zinc-100 rounded-xl shadow-lg left-1/2 transform -translate-x-1/2 z-50 w-64 flex flex-col items-center justify-center p-2 border-none';

  return (
    <div
      className={loadingViewStyle}
    >
      <Progress value={progress} className={viewMode === 'full' ? "w-[20%] mt-4" : "w-[80%] mt-4"} />
      <div className='text-sm text-center text-card-foreground p-4'>{message}</div>
    </div>
  )
}

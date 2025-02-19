"use client";

import { Button } from "@/components/ui/button";


interface NodeLabelProps {
  label: string
  emoji: string
}


const NodeLabel: React.FC<NodeLabelProps> = ({ label, emoji }) => {
  return (
    <div className="relative flex items-center bg-transparent">
      <div className="left-0 w-8 h-8 bg-transparent rounded-full z-0"></div>
      <Button className="absolute -left-4 ml-4 px-4 py-6 rounded-l-full rounded-r-md text-xl space-x-2" variant='amber'>
        <span>{ emoji }</span>
        <span className="">{ label }</span>
      </Button>
    </div>
  );
}

export default NodeLabel;
import React from "react";

import { cn } from "@/app/lib/utils";
import { Clipboard } from "lucide-react";


export interface CopyToClipboardProps extends React.HTMLAttributes<HTMLButtonElement> {
  copyToClipboard: () => void;
}


const CopyToClipboard = React.forwardRef<HTMLButtonElement, CopyToClipboardProps>(
  ({ copyToClipboard, className, ...props }, ref) => {
    return (
      <div className='absolute top-0 right-0 p-2 z-40'>
        <button
          className={cn('text-stone-500 text-sm bg-none outline-none hover:bg-stone-100 rounded-xl p-2 transition-all duration-200 ease-in-out', className)}
          ref={ref}
          {...props}
          onClick={copyToClipboard}
        >
          <Clipboard className='w-4 h-4' />
        </button>
      </div>
    );
  }
);
CopyToClipboard.displayName = "CopyToClipboard";

export default CopyToClipboard;
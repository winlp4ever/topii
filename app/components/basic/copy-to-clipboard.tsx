import React, { useState } from "react";

import { Check, Copy } from "lucide-react";
import { cn } from "@/app/lib/utils";


/**
 * Props for the CopyToClipboard component.
 *
 * @property {() => void} copyToClipboard - Function to execute when the copy button is clicked.
 * @property {string} [className] - Optional additional class names for styling.
 */
export interface CopyToClipboardProps extends React.HTMLAttributes<HTMLButtonElement> {
  copyToClipboard: () => void;
}


/**
 * Component to copy text to clipboard with a button.
 *
 * @param {CopyToClipboardProps} props - The properties for the component.
 * @returns {JSX.Element} The rendered component.
 */
const CopyToClipboard = React.forwardRef<HTMLButtonElement, CopyToClipboardProps>(
  ({ copyToClipboard, className, ...props }, ref) => {

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
    try {
      copyToClipboard();
      setCopied(true)
      setTimeout(() => setCopied(false), 1000)
    } catch (err) {
      console.error("Failed to copy text:", err)
    }
  }

    return (
      <>
        <button
          className={
            cn(
              `
                text-stone-400 text-sm font-mono bg-none
                outline-none hover:bg-stone-100 hover:text-stone-500
                rounded-xl p-2 transition-all duration-200
                ease-in-out flex flex-row items-center
                justify-center gap-2
              `,
              className
            )
          }
          ref={ref}
          {...props}
          onClick={handleCopy}
        >
          {
            copied ?
            <Check className='w-4 h-4 flex-shrink-0' />
            : <Copy className='w-4 h-4 flex-shrink-0' />
          }
          <span>{copied ? "Copied": "Copy"}</span>
        </button>
      </>
    );
  }
);
CopyToClipboard.displayName = "CopyToClipboard";

export default CopyToClipboard;

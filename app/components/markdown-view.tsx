import ReactMarkdown from "react-markdown";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import 'katex/dist/katex.min.css'; // Import KaTeX CSS for styling
import 'highlight.js/styles/github.css'; // Import a highlight.js theme
import { cn } from "../lib/utils";
import { Clipboard } from "lucide-react";
import { toast } from "sonner";
import React from "react";


interface CustomCodeViewProps {
  className?: string;
  children?: React.ReactNode;
}

// Utility function to extract text content from React children
const extractText = (children: React.ReactNode): string => {
  if (typeof children === 'string') {
    return children;
  }
  if (Array.isArray(children)) {
    return children.map(extractText).join('');
  }
  if (React.isValidElement(children)) {
    return extractText(children.props.children);
  }
  return '';
};

const CustomCodeView: React.FC<CustomCodeViewProps> = ({ className, children }) => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Text copied to clipboard: ', text);
      toast('Text copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  const codeContent = extractText(children).trim();
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : 'plaintext';

  return match ? (
    <pre className={cn('text-xs text-mono rounded-xl p-4bg-stone-100 relative my-4', className)} style={{ background: '#f5f5f4', padding: '1em', borderRadius: '5px' }}>
      <button
        onClick={() => handleCopy(codeContent)}
        className="transition-all absolute top-1 right-1 text-xs bg-transparent hover:bg-stone-200 p-2 rounded-lg text-stone-500"
        aria-label="Copy to clipboard"
      >
        <Clipboard strokeWidth={1.5} className='h-3 w-3' />
      </button>
      {match && (
        <span className="absolute top-0 left-0 w-auto bg-stone-200 text-xs px-3 py-1 rounded-t text-xs">
          {language}
        </span>
      )}
      <code className={match ? 'block mt-5': ''}>{children}</code>
    </pre>
  ) : (
    <code className={cn('text-left text-xs text-red-700 bg-stone-100', className)} style={{ background: '#f5f5f4', padding: '0.2em 0.4em', borderRadius: '3px' }} >
      {children}
    </code>
  );
};


interface CustomLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode;
}

const CustomLink: React.FC<CustomLinkProps> = ({ children, ...props }) => {
  // Ensure children is an array and get the first element as a string
  const content = Array.isArray(children) ? children[0] : children;
  const contentWithoutBrackets = typeof content === 'string' ? content.replace(/^\[|\]$/g, '') : '';

  return (
    <a
      href="#"
      className="font-medium text-primary text-[10px] rounded-full bg-stone-200 px-2
        inline-block text-center text-stone-700 font-light"
      {...props}
    >
      {contentWithoutBrackets}
    </a>
  );
};


export interface MarkdownViewProps {
  content: string;
};


const MarkdownView: React.FC<MarkdownViewProps> = ({ content }) => {
  return (
    <>
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex, rehypeHighlight]}
        components={{
          h1: ({ ...props }) => <h1 className="mt-6 scroll-m-20 text-xl font-bold tracking-tight lg:text-2xl" {...props} />,
          h2: ({ ...props }) => <h2 className="mt-4 scroll-m-20 border-b pb-2 text-lg font-semibold tracking-tight transition-colors first:mt-0" {...props} />,
          h3: ({ ...props }) => <h3 className="mt-2 scroll-m-20 text-md font-semibold tracking-tight" {...props} />,
          h4: ({ ...props }) => <h4 className="mt-2 scroll-m-20 text-sm font-semibold tracking-tight" {...props} />,
          p: ({ ...props }) => <p className="leading-5 [&:not(:first-child)]:mt-2 text-sm" {...props} />,
          blockquote: ({ ...props }) => <blockquote className="mt-2 border-l-2 pl-6 italic text-xs" {...props} />,
          ul: ({ ...props }) => <ul className="my-2 ml-6 list-disc [&>li]:mt-2 text-sm" {...props} />,
          ol: ({ ...props }) => <ul className="my-2 ml-6 list-decimal [&>li]:mt-2 text-sm" {...props} />,
          li: ({ ...props }) => <li className="mt-2" {...props} />,
          a: CustomLink,
          // Custom rendering for code blocks
          code: CustomCodeView,
        }}
      >{ content }</ReactMarkdown>
    </>
  );
}

export default MarkdownView;
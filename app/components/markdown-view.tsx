import ReactMarkdown from "react-markdown";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import 'katex/dist/katex.min.css'; // Import KaTeX CSS for styling
import 'highlight.js/styles/github.css'; // Import a highlight.js theme
import { cn } from "@/app/lib/utils";
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

  const codeContent = extractText(children);
  const isBlock = codeContent.includes('\n'); // Check for multiline content
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : 'plaintext';

  return isBlock ? (
    <pre
      className={cn('text-sm text-mono !rounded-2xl p-4 bg-stone-100 relative my-4 border overflow-x-auto', className)}
      style={{ background: '#f5f5f4', padding: '1em', borderRadius: '5px' }}
    >
      <button
        onClick={() => handleCopy(codeContent)}
        className="transition-all absolute top-1 right-1 text-sm bg-transparent hover:bg-stone-200 p-2 rounded-xl text-stone-500"
        aria-label="Copy to clipboard"
      >
        <Clipboard strokeWidth={1.75} className='h-4 w-4' />
      </button>
      {
        language !== 'plaintext' && (
          <span className="absolute top-0 left-0 w-auto bg-transparent text-[11px] px-4 py-2 text-stone-500 text-sm">
            {language}
          </span>
        )
      }
      <code className={language !== 'plaintext' ? "block mt-6": "block"}>{children}</code>
    </pre>
  ) : (
    <code
      className={cn('text-left text-sm text-mono text-red-700 bg-stone-100', className)}
      style={{ background: '#f5f5f4', padding: '0.2em 0.4em', borderRadius: '3px' }}
    >
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
          h1: ({ ...props }) => <h1 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0" {...props} />,
          h2: ({ ...props }) => <h2
            className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight"
            {...props}
          />,
          h3: ({ ...props }) => <h3 className="mt-6 scroll-m-20 text-xl font-semibold tracking-tight" {...props} />,
          h4: ({ ...props }) => <h4 className="mt-6 scroll-m-20 text-lg font-semibold tracking-tight" {...props} />,
          p: ({ ...props }) => <p className="leading-7 [&:not(:first-child)]:mt-6 text-base" {...props} />,
          blockquote: ({ ...props }) => <blockquote className="mt-4 border-l-2 pl-6 italic text-sm" {...props} />,
          ul: ({ ...props }) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />,
          ol: ({ ...props }) => <ul className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />,
          li: ({ ...props }) => <li className="" {...props} />,
          a: CustomLink,
          // Custom rendering for code blocks
          code: CustomCodeView,
          table: ({ ...props }) => <div className='my-8 w-full overflow-y-auto'><table className="w-full text-base border-b" {...props} /></div>,
          tr: ({ ...props }) => <tr className="m-0 border-t p-0 even:bg-muted" {...props} />,
          th: ({ ...props }) => <th className="border-b px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right" {...props} />,
          td: ({ ...props }) => <td className="px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right" {...props} />,
          b: ({ ...props }) => <b className="font-semibold" {...props} />,
          strong: ({ ...props }) => <strong className="font-semibold" {...props} />,
          em: ({ ...props }) => <em className="italic" {...props} />,
          del: ({ ...props }) => <del className="line-through" {...props} />,
        }}
      >{ content }</ReactMarkdown>
    </>
  );
}

export default MarkdownView;
import ReactMarkdown from "react-markdown";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import 'katex/dist/katex.min.css'; // Import KaTeX CSS for styling
import 'highlight.js/styles/github.css'; // Import a highlight.js theme


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
      className="font-medium text-primary text-xs rounded-full bg-gray-200 w-4 h-4 inline-block text-center"
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
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <pre className={className} style={{ background: '#f6f8fa', padding: '1em', borderRadius: '5px' }}>
                <code {...props}>{children}</code>
              </pre>
            ) : (
              <code className={className} style={{ background: '#f6f8fa', padding: '0.2em 0.4em', borderRadius: '3px' }} {...props}>
                {children}
              </code>
            );
          },
        }}
      >{ content }</ReactMarkdown>
    </>
  );
}

export default MarkdownView;
import ReactMarkdown from "react-markdown";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import 'katex/dist/katex.min.css'; // Import KaTeX CSS for styling
import 'highlight.js/styles/github.css'; // Import a highlight.js theme

export interface MarkdownViewProps {
  content: string;
};

const MarkdownView: React.FC<MarkdownViewProps> = ({ content }) => {
  return (
    <>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeHighlight]}
        components={{
          h1: ({ ...props }) => <h1 className="mt-12 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl" {...props} />,
          h2: ({ ...props }) => <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0" {...props} />,
          h3: ({ ...props }) => <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight" {...props} />,
          h4: ({ ...props }) => <h4 className="mt-6 scroll-m-20 text-xl font-semibold tracking-tight" {...props} />,
          p: ({ ...props }) => <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />,
          blockquote: ({ ...props }) => <blockquote className="mt-6 border-l-2 pl-6 italic" {...props} />,
          ul: ({ ...props }) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />,
          ol: ({ ...props }) => <ul className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />,
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
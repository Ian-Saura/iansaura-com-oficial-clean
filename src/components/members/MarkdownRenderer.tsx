import React, { useEffect, useRef, useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import mermaid from 'mermaid';
import { 
  AlertTriangle, Lightbulb, Info, 
  Copy, Check
} from 'lucide-react';

// Initialize Mermaid with dark theme
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  themeVariables: {
    primaryColor: '#8b5cf6',
    primaryTextColor: '#fff',
    primaryBorderColor: '#6366f1',
    lineColor: '#94a3b8',
    secondaryColor: '#1e293b',
    tertiaryColor: '#0f172a',
    background: '#0f172a',
    mainBkg: '#1e293b',
    nodeBorder: '#6366f1',
    clusterBkg: '#1e293b',
    titleColor: '#fff',
    edgeLabelBackground: '#1e293b',
  },
  flowchart: {
    htmlLabels: true,
    curve: 'basis',
  },
});

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// Mermaid Diagram Component
const MermaidDiagram: React.FC<{ chart: string }> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderChart = async () => {
      if (!containerRef.current) return;
      
      try {
        // Clean up the chart - remove any leading/trailing whitespace
        const cleanChart = chart.trim();
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(id, cleanChart);
        setSvg(svg);
        setError(null);
      } catch (err: any) {
        console.error('Mermaid render error:', err);
        setError(err?.message || 'Error rendering diagram');
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(renderChart, 100);
    return () => clearTimeout(timer);
  }, [chart]);

  if (error) {
    return (
      <div className="my-6 p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
        <p className="text-sm text-amber-400 mb-2">⚠️ Diagram preview not available</p>
        <pre className="text-xs text-slate-400 overflow-x-auto whitespace-pre-wrap">
          {chart.substring(0, 200)}...
        </pre>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="my-6 p-4 bg-slate-900/50 rounded-xl border border-slate-700/50 animate-pulse">
        <div className="h-32 bg-slate-800 rounded"></div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="my-6 p-4 bg-slate-900/50 rounded-xl border border-slate-700/50 overflow-x-auto flex justify-center"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

// Code Block with Copy Button
const CodeBlock: React.FC<{ 
  language?: string; 
  children: string;
}> = ({ language, children }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Check if it's a mermaid diagram
  if (language === 'mermaid') {
    return <MermaidDiagram chart={children} />;
  }

  const langColors: Record<string, string> = {
    bash: 'text-emerald-300',
    python: 'text-blue-300',
    sql: 'text-cyan-300',
    javascript: 'text-yellow-300',
    typescript: 'text-blue-400',
  };

  return (
    <div className="relative group my-4">
      <div className="absolute top-2 right-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        {language && (
          <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">
            {language}
          </span>
        )}
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-lg bg-slate-700 text-slate-400 hover:text-white hover:bg-slate-600 transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <pre className={`p-4 bg-slate-900 rounded-xl border border-slate-700/50 overflow-x-auto text-sm ${langColors[language || ''] || 'text-slate-300'}`}>
        <code className="block whitespace-pre">{children}</code>
      </pre>
    </div>
  );
};

// Callout/Admonition Component
const Callout: React.FC<{ type: string; title?: string; children: React.ReactNode }> = ({ type, title, children }) => {
  const styles: Record<string, { bg: string; border: string; icon: React.ReactNode; defaultTitle: string; titleColor: string }> = {
    WARNING: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      icon: <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />,
      defaultTitle: 'Gotcha de Senior',
      titleColor: 'text-amber-400'
    },
    IMPORTANT: {
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/30',
      icon: <Info className="w-5 h-5 text-violet-400 flex-shrink-0" />,
      defaultTitle: 'Importante',
      titleColor: 'text-violet-400'
    },
    TIP: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      icon: <Lightbulb className="w-5 h-5 text-emerald-400 flex-shrink-0" />,
      defaultTitle: 'Tip',
      titleColor: 'text-emerald-400'
    },
    NOTE: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      icon: <Info className="w-5 h-5 text-blue-400 flex-shrink-0" />,
      defaultTitle: 'Nota',
      titleColor: 'text-blue-400'
    }
  };

  const style = styles[type] || styles.NOTE;

  return (
    <div className={`my-6 p-4 rounded-xl ${style.bg} border ${style.border}`}>
      <div className="flex items-start gap-3">
        {style.icon}
        <div className="flex-1 min-w-0">
          <span className={`font-bold ${style.titleColor} block mb-2`}>
            {title || style.defaultTitle}
          </span>
          <div className="text-slate-300 text-sm space-y-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Pre-process content to convert GitHub-style admonitions to a parseable format
const preprocessContent = (content: string): string => {
  // Remove YAML frontmatter
  let processed = content.replace(/^---[\s\S]*?---\n/, '');
  
  // Remove HTML comments
  processed = processed.replace(/<!--[\s\S]*?-->/g, '');
  
  return processed;
};

// Extract text content from React children
const getTextFromChildren = (children: React.ReactNode): string => {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (Array.isArray(children)) {
    return children.map(getTextFromChildren).join('');
  }
  if (React.isValidElement(children) && children.props?.children) {
    return getTextFromChildren(children.props.children);
  }
  return '';
};

// Main Markdown Renderer
export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  const processedContent = preprocessContent(content);

  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Headers
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-white mt-8 mb-4 flex items-center gap-3">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold text-white mt-10 mb-4 pb-2 border-b border-slate-700/50">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold text-white mt-8 mb-3">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-semibold text-slate-200 mt-6 mb-2">
              {children}
            </h4>
          ),

          // Paragraphs
          p: ({ children }) => (
            <p className="text-slate-300 my-4 leading-relaxed">{children}</p>
          ),

          // Blockquotes - Handle GitHub-style admonitions
          blockquote: ({ children }) => {
            // Get text content to check for admonition pattern
            const text = getTextFromChildren(children);
            
            // Check for GitHub-style admonition: [!WARNING], [!IMPORTANT], etc.
            const admonitionMatch = text.match(/\[!(WARNING|IMPORTANT|TIP|NOTE)\]\s*(.*)/s);
            
            if (admonitionMatch) {
              const type = admonitionMatch[1];
              // Extract the content after the admonition marker
              const contentText = admonitionMatch[2].trim();
              
              // Try to extract a title if there's a **Title**: pattern
              const titleMatch = contentText.match(/^\*\*([^*]+)\*\*:?\s*/);
              const title = titleMatch ? titleMatch[1] : undefined;
              const bodyText = titleMatch ? contentText.replace(titleMatch[0], '') : contentText;
              
              return (
                <Callout type={type} title={title}>
                  <p className="whitespace-pre-wrap">{bodyText}</p>
                </Callout>
              );
            }
            
            return (
              <blockquote className="my-6 pl-4 border-l-4 border-violet-500/50 text-slate-400 italic">
                {children}
              </blockquote>
            );
          },

          // Code blocks
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : undefined;
            const content = String(children).replace(/\n$/, '');
            
            // Inline code (no language, short content)
            if (!className && content.length < 100 && !content.includes('\n')) {
              return (
                <code className="text-violet-300 bg-slate-800/80 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                  {children}
                </code>
              );
            }

            return (
              <CodeBlock language={language}>
                {content}
              </CodeBlock>
            );
          },

          // Pre (wrapper for code blocks)
          pre: ({ children }) => <>{children}</>,

          // Tables
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto rounded-xl border border-slate-700/50">
              <table className="w-full border-collapse min-w-full">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-slate-800/80">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-slate-700/50">
              {children}
            </tbody>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 text-left text-sm font-semibold text-white whitespace-nowrap">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-sm text-slate-300">
              {children}
            </td>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-slate-800/30 transition-colors">
              {children}
            </tr>
          ),

          // Lists
          ul: ({ children }) => (
            <ul className="my-4 space-y-2">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-4 space-y-2 list-decimal list-inside">
              {children}
            </ol>
          ),
          li: ({ children }) => {
            // Check if it's a task list item
            const text = getTextFromChildren(children);
            if (text.startsWith('[ ] ') || text.startsWith('[x] ')) {
              const isChecked = text.startsWith('[x] ');
              const content = text.substring(4);
              return (
                <li className="flex items-start gap-3 text-slate-300">
                  <span className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${
                    isChecked 
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' 
                      : 'border-slate-600 text-slate-600'
                  }`}>
                    {isChecked && '✓'}
                  </span>
                  <span className={isChecked ? 'text-slate-400' : ''}>{content}</span>
                </li>
              );
            }
            
            return (
              <li className="flex items-start gap-2 text-slate-300">
                <span className="text-violet-400 mt-1 flex-shrink-0">→</span>
                <span className="flex-1">{children}</span>
              </li>
            );
          },

          // Links
          a: ({ href, children }) => (
            <a 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-violet-400 hover:text-violet-300 underline underline-offset-2 transition-colors"
            >
              {children}
            </a>
          ),

          // Strong/Bold
          strong: ({ children }) => (
            <strong className="text-white font-semibold">{children}</strong>
          ),

          // Emphasis/Italic
          em: ({ children }) => (
            <em className="text-slate-200 italic">{children}</em>
          ),

          // Horizontal Rule
          hr: () => (
            <hr className="my-8 border-slate-700/50" />
          ),

          // Images
          img: ({ src, alt }) => (
            <img 
              src={src} 
              alt={alt} 
              className="my-4 rounded-xl max-w-full border border-slate-700/50"
            />
          ),
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;

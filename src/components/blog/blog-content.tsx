"use client";

interface BlogContentProps {
  content: string;
}

export function BlogContent({ content }: BlogContentProps) {
  // Simple markdown-style renderer
  const renderContent = (text: string) => {
    const lines = text.split("\n");
    const elements: React.ReactElement[] = [];
    let key = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Headings
      if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={key++}
            className="text-2xl font-serif text-[#1A1A1A] mt-8 mb-4"
          >
            {line.slice(3)}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3
            key={key++}
            className="text-xl font-serif text-[#1A1A1A] mt-6 mb-3"
          >
            {line.slice(4)}
          </h3>
        );
      }
      // Paragraphs
      else if (line.trim()) {
        elements.push(
          <p key={key++} className="text-gray-700 leading-relaxed mb-4">
            {line}
          </p>
        );
      }
      // Empty lines
      else {
        elements.push(<div key={key++} className="h-2" />);
      }
    }

    return elements;
  };

  return (
    <div className="prose prose-lg max-w-none">
      {renderContent(content)}
    </div>
  );
}

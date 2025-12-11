'use client';

import { Content, JSONContent } from '@tiptap/react';

interface RichTextRendererProps {
  content: JSONContent;
}

export function RichTextRenderer({ content }: RichTextRendererProps) {
  if (!content || !content.content) return null;

  const renderNode = (node: JSONContent): JSX.Element | null => {
    if (node.type === 'paragraph') {
      return (
        <p className="mb-4">
          {node.content?.map((child, i) => renderInline(child, i))}
        </p>
      );
    }
    
    if (node.type === 'heading') {
      const HeadingTag = `h${node.attrs?.level || 2}` as keyof JSX.IntrinsicElements;
      return (
        <HeadingTag className="font-serif font-bold my-6">
          {node.content?.map((child, i) => renderInline(child, i))}
        </HeadingTag>
      );
    }
    
    if (node.type === 'bulletList') {
      return <ul className="list-disc pl-6 mb-4">{node.content?.map(renderNode)}</ul>;
    }
    
    if (node.type === 'orderedList') {
      return <ol className="list-decimal pl-6 mb-4">{node.content?.map(renderNode)}</ol>;
    }
    
    if (node.type === 'listItem') {
      return <li className="mb-1">{node.content?.map(renderNode)}</li>;
    }
    
    if (node.type === 'image') {
      return (
        <div className="my-6">
          <img 
            src={node.attrs?.src} 
            alt={node.attrs?.alt || ''} 
            className="rounded-lg w-full"
          />
          {node.attrs?.caption && (
            <p className="text-gray text-sm mt-2 text-center">{node.attrs.caption}</p>
          )}
        </div>
      );
    }
    
    return null;
  };

  const renderInline = (node: JSONContent, key: number): JSX.Element | null => {
    if (node.type === 'text') {
      let textElement = <>{node.text}</>;
      
      if (node.marks) {
        for (const mark of node.marks) {
          if (mark.type === 'bold') textElement = <strong key={key}>{textElement}</strong>;
          if (mark.type === 'italic') textElement = <em key={key}>{textElement}</em>;
          if (mark.type === 'link') {
            textElement = (
              <a 
                href={mark.attrs?.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue hover:underline"
                key={key}
              >
                {textElement}
              </a>
            );
          }
        }
      }
      
      return textElement;
    }
    
    return null;
  };

  return <>{content.content?.map(renderNode)}</>;
}

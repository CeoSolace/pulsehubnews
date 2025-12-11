'use client';

import { useState } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ReportArticleModal } from '@/components/ReportArticleModal';
import { RichTextRenderer } from '@/components/RichTextRenderer';

interface ArticleDetailProps {
  article: {
    title: string;
    slug: string;
    content: any;
    coverImage: string;
    category: string;
    tags: string[];
    author: { name: string; avatar?: string };
    createdAt: Date;
    updatedAt: Date;
  };
}

export function ArticleDetail({ article }: ArticleDetailProps) {
  const [showReportModal, setShowReportModal] = useState(false);

  return (
    <article className="container py-8 max-w-4xl">
      <div className="mb-6">
        <span className="inline-block px-3 py-1 bg-blue/10 text-blue rounded-full text-sm mb-4">
          {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
        </span>
        {article.category === 'opinion' && (
          <span className="inline-block ml-2 px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-full text-sm">
            Opinion
          </span>
        )}
      </div>
      
      <h1 className="font-serif text-4xl font-bold mb-4">{article.title}</h1>
      
      <div className="flex items-center gap-4 mb-8 pb-4 border-b">
        <div className="flex items-center gap-3">
          {article.author.avatar ? (
            <Image 
              src={article.author.avatar} 
              alt={article.author.name} 
              width={40} 
              height={40} 
              className="rounded-full" 
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray/20 flex items-center justify-center">
              <span className="text-sm font-medium">{article.author.name.charAt(0)}</span>
            </div>
          )}
          <div>
            <div className="font-medium">{article.author.name}</div>
            <div className="text-gray text-sm">
              {format(new Date(article.createdAt), 'MMM d, yyyy')} • Updated {format(new Date(article.updatedAt), 'MMM d, yyyy')}
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
        <Image 
          src={article.coverImage} 
          alt={article.title} 
          fill 
          className="object-cover" 
        />
      </div>
      
      <div className="prose prose-blue dark:prose-invert max-w-none mb-8">
        <RichTextRenderer content={article.content} />
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-gray/10 rounded-full text-sm">
              #{tag}
            </span>
          ))}
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowReportModal(true)}
          className="border-gray text-gray hover:bg-gray/10"
        >
          Report Article
        </Button>
      </div>
      
      <ReportArticleModal 
        articleId={article.slug} 
        articleTitle={article.title} 
        isOpen={showReportModal} 
        onClose={() => setShowReportModal(false)} 
      />
    </article>
  );
}

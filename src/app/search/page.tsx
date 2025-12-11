'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { ArticleCard } from '@/components/ArticleCard';
import { connectDB } from '@/lib/db';
import Article from '@/models/Article';
import User from '@/models/User';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data);
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Search Articles</h1>
      
      <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray h-5 w-5" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            className="pl-10 pr-20"
            required
          />
          <Button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue hover:bg-blue/90">
            Search
          </Button>
        </div>
      </form>
      
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((article) => (
            <ArticleCard
              key={article.slug}
              slug={article.slug}
              title={article.title}
              excerpt={article.content?.[0]?.text?.substring(0, 120) || ''}
              coverImage={article.coverImage}
              category={article.category}
              tags={article.tags}
              author={article.author?.name || 'Unknown'}
              publishedAt={article.createdAt}
            />
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-12">
          <p className="text-gray">No articles found matching your search.</p>
        </div>
      ) : null}
    </div>
  );
}

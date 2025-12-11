import { connectDB } from '@/lib/db';
import Article from '@/models/Article';
import { ArticleCard } from '@/components/ArticleCard';
import { notFound } from 'next/navigation';

const categories = ['esports', 'politics', 'tech', 'opinion'];

export async function generateStaticParams() {
  return categories.map(category => ({ category }));
}

export async function generateMetadata({ params }: { params: { category: string } }) {
  if (!categories.includes(params.category)) notFound();
  
  const titles: Record<string, string> = {
    esports: 'Global Esports News',
    politics: 'UK Politics Coverage',
    tech: 'Technology & Digital Culture',
    opinion: 'Opinion Pieces'
  };
  
  return { title: `${titles[params.category]} | PulseHub.Space` };
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  if (!categories.includes(params.category)) notFound();
  
  await connectDB();
  const articles = await Article.find({ 
    category: params.category, 
    status: 'published' 
  })
  .populate('author')
  .sort({ createdAt: -1 })
  .limit(20);
  
  const categoryTitles: Record<string, string> = {
    esports: 'Global Esports',
    politics: 'UK Politics',
    tech: 'Technology',
    opinion: 'Opinion'
  };
  
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">{categoryTitles[params.category]}</h1>
      {articles.length === 0 ? (
        <p className="text-center text-gray py-12">No articles found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article: any) => (
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
      )}
    </div>
  );
}

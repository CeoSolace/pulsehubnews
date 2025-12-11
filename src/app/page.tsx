import { connectDB } from '@/lib/db';
import Article from '@/models/Article';
import { ArticleCard } from '@/components/ArticleCard';

export default async function HomePage() {
  await connectDB();
  const articles = await Article.find({ status: 'published' })
    .populate('author')
    .sort({ createdAt: -1 })
    .limit(12);
  
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Latest News</h1>
      {articles.length === 0 ? (
        <p className="text-center text-gray py-12">No articles published yet.</p>
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

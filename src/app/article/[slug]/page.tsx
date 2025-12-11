import { connectDB } from '@/lib/db';
import Article from '@/models/Article';
import User from '@/models/User';
import { ArticleDetail } from '@/components/ArticleDetail';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  await connectDB();
  const article = await Article.findOne({ slug: params.slug }).populate('author');
  
  if (!article) return { title: 'Article Not Found' };
  
  return {
    title: `${article.title} | PulseHub.Space`,
    description: article.content?.[0]?.text?.substring(0, 160) || 'Read the full article on PulseHub.Space',
    openGraph: {
      title: article.title,
      description: article.content?.[0]?.text?.substring(0, 160) || 'Read the full article on PulseHub.Space',
      images: [{ url: article.coverImage }],
    },
    twitter: {
      card: 'summary_large_image',
      images: [article.coverImage],
    },
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  await connectDB();
  const article = await Article.findOne({ slug: params.slug })
    .populate<{ author: { name: string; avatar?: string } }>('author');
  
  if (!article) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
        <a href="/" className="text-blue hover:underline">Return Home</a>
      </div>
    );
  }
  
  return <ArticleDetail article={JSON.parse(JSON.stringify(article))} />;
}

import { connectDB } from '@/lib/db';
import Article from '@/models/Article';
import Link from 'next/link';

export default async function ArticlesPage() {
  await connectDB();
  const articles = await Article.find().populate('author').sort({ createdAt: -1 });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Articles</h1>
        <Link
          href="/admin/articles/new"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-500/90"
        >
          New Article
        </Link>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Title</th>
              <th className="text-left p-4">Author</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article: any) => (
              <tr key={article._id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">{article.title}</td>
                <td className="p-4">{article.author?.name || 'Unknown'}</td>
                <td className="p-4 capitalize">{article.category}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    article.status === 'published' 
                      ? 'bg-green-500/10 text-green-500' 
                      : 'bg-yellow-500/10 text-yellow-500'
                  }`}>
                    {article.status}
                  </span>
                </td>
                <td className="p-4">
                  <Link
                    href={`/admin/articles/${article._id}`}
                    className="px-3 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-100"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

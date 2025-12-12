export function ArticleCard({ title, excerpt, href, className = '' }) {
  return (
    <a href={href} className={`block p-4 border rounded hover:shadow ${className}`}>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-gray-600">{excerpt}</p>
    </a>
  );
}

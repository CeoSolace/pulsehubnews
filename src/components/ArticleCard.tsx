export function ArticleCard({
  title,
  excerpt,
  href,
  coverImage,
  category,
  tags,
  author,
  publishedAt,
  className = ''
}) {
  return (
    <a href={href} className={`block p-4 border rounded hover:shadow ${className}`}>
      {coverImage && (
        <img src={coverImage} alt={title} className="w-full h-40 object-cover rounded mb-3" />
      )}
      <span className="text-xs text-gray-500 uppercase">{category}</span>
      {tags && tags.length > 0 && (
        <div className="mt-1">
          {tags.map((tag: string, i: number) => (
            <span key={i} className="inline-block bg-gray-200 text-xs px-2 py-0.5 rounded mr-1">
              {tag}
            </span>
          ))}
        </div>
      )}
      <h2 className="text-lg font-semibold mt-2">{title}</h2>
      <p className="mt-2 text-gray-600">{excerpt}</p>
      <div className="mt-3 text-sm text-gray-500">
        By {author} • {publishedAt ? new Date(publishedAt).toLocaleDateString() : ''}
      </div>
    </a>
  );
}

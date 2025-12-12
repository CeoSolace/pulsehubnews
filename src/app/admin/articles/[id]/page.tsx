'use client';

import { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useRouter } from 'next/navigation';

export default function EditArticlePage({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const router = useRouter();

  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Loading...</p>',
  });

  useEffect(() => {
    fetch(`/api/articles/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setArticle(data);
        setCoverImageUrl(data.coverImage || '');
        editor?.commands.setContent(data.content);
      });
  }, [params.id, editor]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      const updatedArticle = {
        title: formData.get('title'),
        slug: formData.get('slug'),
        content: editor?.getJSON(),
        coverImage: coverImageUrl,
        category: formData.get('category'),
        tags: (formData.get('tags') as string)?.split(',').map(t => t.trim()).filter(t => t) || [],
        status: formData.get('status'),
      };
      
      const res = await fetch(`/api/articles/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedArticle),
      });
      
      if (res.ok) {
        router.push('/admin/articles');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!article) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Article</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="title">Title *</label>
            <input
              id="title"
              name="title"
              defaultValue={article.title}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="slug">Slug *</label>
            <input
              id="slug"
              name="slug"
              defaultValue={article.slug}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Cover Image *</label>
          <div className="border border-dashed rounded-lg p-4">
            {coverImageUrl ? (
              <img src={coverImageUrl} alt="Cover" className="max-h-48 object-contain mb-2" />
            ) : (
              <div className="text-gray-400 text-sm mb-2">No image selected</div>
            )}
            <input
              type="text"
              placeholder="Paste Cloudinary image URL"
              value={coverImageUrl}
              onChange={(e) => setCoverImageUrl(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              defaultValue={article.category}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="esports">Esports</option>
              <option value="politics">Politics</option>
              <option value="tech">Tech</option>
              <option value="opinion">Opinion</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="status">Status *</label>
            <select
              id="status"
              name="status"
              defaultValue={article.status}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="tags">Tags (comma separated)</label>
          <input
            id="tags"
            name="tags"
            defaultValue={article.tags?.join(', ') || ''}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Content *</label>
          <div className="border rounded-md min-h-[300px] p-2">
            <EditorContent editor={editor} />
          </div>
        </div>
        
        <div className="flex gap-3 justify-end pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-sm font-medium border rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CloudinaryImageUploader } from '@/components/CloudinaryImageUploader';
import { useRouter } from 'next/navigation';

export default function EditArticlePage({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
        editor?.commands.setContent(data.content);
      });
  }, [params.id, editor]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const updatedArticle = {
        title: formData.get('title'),
        slug: formData.get('slug'),
        content: editor?.getJSON(),
        coverImage: formData.get('coverImage'),
        category: formData.get('category'),
        tags: (formData.get('tags') as string).split(',').map(t => t.trim()).filter(t => t),
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
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Edit Article</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input type="hidden" name="coverImage" value={article.coverImage} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Title *</Label>
            <Input name="title" defaultValue={article.title} required />
          </div>
          <div>
            <Label>Slug *</Label>
            <Input name="slug" defaultValue={article.slug} required />
          </div>
        </div>
        
        <div>
          <Label>Cover Image *</Label>
          <CloudinaryImageUploader 
            value={article.coverImage} 
            onChange={(url) => {
              const input = document.querySelector('input[name="coverImage"]') as HTMLInputElement;
              if (input) input.value = url;
            }}
            className="h-48 border border-dashed rounded-lg flex items-center justify-center"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Category *</Label>
            <Select name="category" defaultValue={article.category}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="esports">Esports</SelectItem>
                <SelectItem value="politics">Politics</SelectItem>
                <SelectItem value="tech">Tech</SelectItem>
                <SelectItem value="opinion">Opinion</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Status *</Label>
            <Select name="status" defaultValue={article.status}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <Label>Tags (comma separated)</Label>
          <Input name="tags" defaultValue={article.tags.join(', ')} />
        </div>
        
        <div>
          <Label>Content *</Label>
          <div className="border rounded-md min-h-[300px]">
            <EditorContent editor={editor} />
          </div>
        </div>
        
        <div className="flex gap-3 justify-end pt-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="bg-blue hover:bg-blue/90">
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}

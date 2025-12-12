import { Document } from 'mongodb';

export interface Article extends Document {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  publishedAt: Date;
  author: string;
  status: 'draft' | 'published';
}

// Dummy default export to satisfy import
const Article = {} as any;
export default Article;

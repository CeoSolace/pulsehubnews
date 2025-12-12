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

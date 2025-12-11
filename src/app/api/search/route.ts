import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Article from '@/models/Article';

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');
    
    if (!q) {
      return NextResponse.json([]);
    }
    
    const articles = await Article.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { 'content.text': { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } }
      ],
      status: 'published'
    })
    .populate('author')
    .limit(20)
    .sort({ createdAt: -1 });
    
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json([]);
  }
}

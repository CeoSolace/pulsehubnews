import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Article from '@/models/Article';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    
    const article = await Article.findById(params.id);
    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }
    
    // Only owners can edit any article, others can only edit their own
    if (
      session.user.role !== 'owner' && 
      article.author.toString() !== session.user.id
    ) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    Object.assign(article, body);
    await article.save();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Article update error:', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

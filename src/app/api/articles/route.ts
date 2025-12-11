import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Article from '@/models/Article';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['owner', 'article_writer'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    
    const article = new Article({
      ...body,
      author: session.user.id,
    });
    
    await article.save();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Article creation error:', error);
    return NextResponse.json({ error: 'Creation failed' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Report from '@/models/Report';

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const report = new Report(body);
    await report.save();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Report submission error:', error);
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import PartnershipApplication from '@/models/PartnershipApplication';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['owner', 'support'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    await PartnershipApplication.findByIdAndUpdate(params.id, { status: body.status });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Partnership update error:', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import PartnershipApplication from '@/models/PartnershipApplication';
import { uploadFileToCloudinary } from '@/lib/cloudinary';

export async function POST(request: Request) {
  try {
    await connectDB();
    const formData = await request.formData();
    
    const file = formData.get('file') as File | null;
    let fileUrl = '';
    
    if (file && file.size > 0) {
      const uploadResult = await uploadFileToCloudinary(file, process.env.CLOUDINARY_UPLOAD_PRESET!);
      fileUrl = uploadResult.secure_url;
    }
    
    const application = new PartnershipApplication({
      organizationName: formData.get('organizationName'),
      contactName: formData.get('contactName'),
      contactEmail: formData.get('contactEmail'),
      website: formData.get('website'),
      organizationType: formData.get('organizationType'),
      message: formData.get('message'),
      fileUrl,
    });
    
    await application.save();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Partnership submission error:', error);
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 });
  }
}

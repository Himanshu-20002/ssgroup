import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/adminAuth';
import { saveMediaFile } from '@/lib/storage/mediaStorage';

export async function POST(req: NextRequest) {
  try {
    const isAuthed = await isAuthenticated();
    if (!isAuthed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate size (max 20MB)
    const MAX_SIZE = 20 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File size exceeds 20MB limit' }, { status: 400 });
    }

    const url = await saveMediaFile(file);

    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.error('Upload handler error:', error);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
}

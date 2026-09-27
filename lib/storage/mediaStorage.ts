import fs from 'fs';
import path from 'path';

/**
 * Saves an uploaded file buffer to storage.
 * Defaults to local disk (/public/uploads/projects/).
 * If BLOB_READ_WRITE_TOKEN is set, it can hook into Vercel Blob.
 */
export async function saveMediaFile(file: File): Promise<string> {
  // Check if Vercel Blob is configured
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      // Dynamic import of @vercel/blob so project runs without needing it locally
      const { put } = await import('@vercel/blob');
      const filename = `projects/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const blob = await put(filename, file, { access: 'public' });
      return blob.url;
    } catch (err) {
      console.warn('Vercel Blob failed, falling back to local storage:', err);
    }
  }

  // Local Storage Provider
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'projects');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Generate safe unique filename
  const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const uniqueName = `stall_${Date.now()}_${cleanName}`;
  const filePath = path.join(uploadsDir, uniqueName);

  fs.writeFileSync(filePath, buffer);

  return `/uploads/projects/${uniqueName}`;
}

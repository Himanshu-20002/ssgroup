/**
 * Video URL Parser Utility
 * Automatically handles YouTube (watch, youtu.be, shorts, embed), Vimeo,
 * direct MP4/WebM files, and generic embed URLs.
 */

export interface ParsedVideo {
  type: 'youtube' | 'vimeo' | 'direct' | 'iframe';
  embedUrl: string;
  originalUrl: string;
}

export function parseVideoUrl(url?: string | null): ParsedVideo | null {
  if (!url || typeof url !== 'string' || !url.trim()) return null;
  const trimmed = url.trim();

  // 1. YouTube matching (watch?v=, youtu.be/, shorts/, embed/, etc.)
  const ytMatch = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/i
  );
  if (ytMatch && ytMatch[1]) {
    const videoId = ytMatch[1];
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`,
      originalUrl: trimmed,
    };
  }

  // 2. Vimeo matching (vimeo.com/123456789 or player.vimeo.com/video/123456789)
  const vimeoMatch = trimmed.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)/i);
  if (vimeoMatch && vimeoMatch[3]) {
    return {
      type: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[3]}?autoplay=1`,
      originalUrl: trimmed,
    };
  }

  // 3. Direct HTML5 video (.mp4, .webm, .ogg, .mov)
  if (/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(trimmed)) {
    return {
      type: 'direct',
      embedUrl: trimmed,
      originalUrl: trimmed,
    };
  }

  // 4. Default fallback: assumed to be embeddable iframe URL
  return {
    type: 'iframe',
    embedUrl: trimmed,
    originalUrl: trimmed,
  };
}

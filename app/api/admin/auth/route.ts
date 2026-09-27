import { NextRequest, NextResponse } from 'next/server';
import {
  validatePasscode,
  createSessionToken,
  SESSION_COOKIE_NAME,
} from '@/lib/adminAuth';

// In-memory rate limiting map: ip -> { count, lockUntil }
const rateLimitMap = new Map<string, { count: number; lockUntil: number }>();

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();

    // Check rate limit
    const record = rateLimitMap.get(ip);
    if (record && record.lockUntil > now) {
      const waitMinutes = Math.ceil((record.lockUntil - now) / 60000);
      return NextResponse.json(
        { error: `Too many failed attempts. Please try again in ${waitMinutes} minutes.` },
        { status: 429 }
      );
    }

    const { passcode } = await req.json();

    if (!validatePasscode(passcode)) {
      const currentCount = (record?.count || 0) + 1;
      if (currentCount >= 5) {
        // Lock out for 10 minutes
        rateLimitMap.set(ip, { count: currentCount, lockUntil: now + 10 * 60 * 1000 });
        return NextResponse.json(
          { error: 'Too many failed attempts. Locked for 10 minutes.' },
          { status: 429 }
        );
      } else {
        rateLimitMap.set(ip, { count: currentCount, lockUntil: 0 });
        return NextResponse.json(
          { error: `Invalid passcode. ${5 - currentCount} attempts remaining.` },
          { status: 401 }
        );
      }
    }

    // Success: reset rate limit
    rateLimitMap.delete(ip);

    const token = createSessionToken();
    const response = NextResponse.json({ success: true });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Auth route error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(SESSION_COOKIE_NAME);
  return response;
}

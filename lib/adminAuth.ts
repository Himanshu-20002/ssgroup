import crypto from 'crypto';
import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'ssgroup_admin_session';
const SECRET = process.env.ADMIN_SECRET || 'ssgroup_admin_secure_key_2026_xyz';
const PASSCODE = process.env.ADMIN_PASSCODE || 'ssgroup2026';

/**
 * Creates an HMAC signature for a timestamp
 */
export function createSessionToken(): string {
  const timestamp = Date.now().toString();
  const signature = crypto
    .createHmac('sha256', SECRET)
    .update(timestamp)
    .digest('hex');
  return `${timestamp}.${signature}`;
}

/**
 * Validates a session token
 */
export function verifySessionToken(token: string): boolean {
  if (!token || !token.includes('.')) return false;

  const [timestamp, signature] = token.split('.');
  const time = parseInt(timestamp, 10);

  // Validate expiry: 7 days
  const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
  if (isNaN(time) || Date.now() - time > sevenDaysMs) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac('sha256', SECRET)
    .update(timestamp)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

/**
 * Checks if the current request has an active valid session
 */
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionCookie) return false;
  return verifySessionToken(sessionCookie);
}

/**
 * Validates the entered passcode
 */
export function validatePasscode(inputPasscode: string): boolean {
  if (!inputPasscode) return false;
  return inputPasscode.trim() === PASSCODE.trim();
}

export { SESSION_COOKIE_NAME };

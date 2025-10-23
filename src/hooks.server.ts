import { randomBytes } from 'crypto';
import type { Handle } from '@sveltejs/kit';
import { PUBLIC_R2_BUCKET_ENDPOINT } from '$env/static/public';

const PERMISSIVE_CSP = [
  "default-src * data: blob: 'unsafe-inline' 'unsafe-eval'",
  "script-src * 'unsafe-inline' 'unsafe-eval'",
  "style-src * 'unsafe-inline'",
  "img-src * data:",
  "media-src *",
  "connect-src *",
  "frame-src *",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests"
].join('; ');

function getAllowedOrigins(): string[] | '*' {
  const raw = process.env.CORS_ALLOWED_ORIGINS?.trim() ?? '';
  if (!raw) return [];
  if (raw === '*') return '*';
  return raw.split(',').map(s => s.trim()).filter(Boolean);
}

function isOriginAllowed(origin: string | null, whitelist: string[] | '*'): boolean {
  if (!origin) return false;
  if (whitelist === '*') return true;
  return whitelist.includes(origin);
}

export const handle: Handle = async ({ event, resolve }) => {
  const allowedOrigins = getAllowedOrigins();
  const requestOrigin = event.request.headers.get('origin');

  if (event.request.method === 'OPTIONS') {
    if (!isOriginAllowed(requestOrigin, allowedOrigins)) {
      return new Response('CORS origin denied', { status: 403 });
    }
    const preflightHeaders = new Headers({
      'Access-Control-Allow-Origin': requestOrigin!,
      'Access-Control-Allow-Methods': 'GET,HEAD,POST,PUT,PATCH,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization,Accept,X-Requested-With',
      'Access-Control-Max-Age': '86400'
    });
    preflightHeaders.set('Vary', 'Origin');
    return new Response(null, { status: 204, headers: preflightHeaders });
  }

  const response = await resolve(event);

  if (requestOrigin && isOriginAllowed(requestOrigin, allowedOrigins)) {
    response.headers.set('Access-Control-Allow-Origin', requestOrigin);
    response.headers.append('Vary', 'Origin');
  }

  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.startsWith('text/html')) {
    const nonce = randomBytes(16).toString('base64');
    const cspHeader = PERMISSIVE_CSP.replace("'unsafe-inline'", `'nonce-${nonce}'`).trimEnd() + ';';
    response.headers.set('Content-Security-Policy', cspHeader);
    (event.locals as any).cspNonce = nonce;
  }

  return response;
};
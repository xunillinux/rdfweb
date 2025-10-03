import { randomBytes } from 'crypto';
import type { Handle } from '@sveltejs/kit';
import { PUBLIC_R2_BUCKET_ENDPOINT } from '$env/static/public';

const CSP_TEMPLATE = [
  "default-src 'self'",
  "script-src 'self' https://challenges.cloudflare.com",
  "style-src 'self' https://challenges.cloudflare.com 'unsafe-inline'",
  "img-src 'self' data:",
  "media-src 'self'",
  "connect-src 'self' https://challenges.cloudflare.com",
  "frame-src 'self' https://challenges.cloudflare.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests"
].join('; ');

function getR2Origin(): string | null {
  const endpoint = PUBLIC_R2_BUCKET_ENDPOINT?.trim();
  if (!endpoint) return null;

  try {
    const url = new URL(endpoint);
    return url.origin;
  } catch {
    return null;
  }
}

function getAllowedOrigins(): string[] | '*' {
  const raw = process.env.CORS_ALLOWED_ORIGINS?.trim() ?? '';
  if (!raw) return [];
  if (raw === '*') return '*';
  return raw.split(',').map((s) => s.trim()).filter(Boolean);
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

    const r2Origin = getR2Origin();

    let csp = CSP_TEMPLATE
			.replace(
				"script-src 'self' https://challenges.cloudflare.com",
				`script-src 'self' https://challenges.cloudflare.com 'nonce-${nonce}'`
			)
			.replace(
				"img-src 'self' data:",
				r2Origin
					? `img-src 'self' data: ${r2Origin}`
					: "img-src 'self' data:"
			)
			.replace(
				"media-src 'self'",
				r2Origin ? `media-src 'self' ${r2Origin}` : "media-src 'self'"
			)
			.replace(
				"connect-src 'self' https://challenges.cloudflare.com",
				r2Origin
					? `connect-src 'self' https://challenges.cloudflare.com ${r2Origin}`
					: "connect-src 'self' https://challenges.cloudflare.com"
			);

		csp = csp.trimEnd() + ';';

		console.log(csp);

    response.headers.set('Content-Security-Policy', csp);

    (event.locals as any).cspNonce = nonce;
  }

  return response;
};
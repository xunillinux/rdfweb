import type { Handle } from '@sveltejs/kit';

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
			'Access-Control-Allow-Headers':	'Content-Type,Authorization,Accept,X-Requested-With',
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

	return response;
};
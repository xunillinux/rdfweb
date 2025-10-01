import { json, error } from '@sveltejs/kit';
import { sanitizeString } from '$lib/helper/format-helper';
import { db, Timestamp } from '$lib/server/firebase-admin';
import { env } from '$env/dynamic/private';

function emailToDocId(email: string): string {
	const normalized = email.trim().toLowerCase();
	return Buffer.from(normalized).toString('base64url');
}

export async function POST({ request, getClientAddress }) {
	try {
		const raw = await request.json();
		const turnstileToken = raw.turnstileToken;

		if (!turnstileToken) {
			throw error(400, 'Missing Captcha token');
		}

		const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				secret: env.TURNSTILE_SECRET_KEY,
				response: turnstileToken,
				remoteip: getClientAddress()
			})
		});

		const outcome = await response.json();

		if (!outcome.success) {
			console.error('Turnstile verification failed:', outcome['error-codes']);
			throw error(403, 'CAPTCHA verification failed. Please try again.');
		}

		const fan = {
			name: sanitizeString(raw.name, 100),
			email: sanitizeString(raw.email, 254),
			streaming: sanitizeString(raw.streaming, 50),
			wantsUpdates: !!raw.wantsUpdates,
			submittedAt: Timestamp.now()
		};

		if (!fan.name || !fan.email || !fan.streaming) {
			throw error(400, 'Missing or malformed fields');
		}

		const docId = emailToDocId(fan.email);

		await db.collection('rdffanbase').doc(docId).set(fan, { merge: true });

		return json({ ok: true });
	} catch (err: any) {
		console.error('/api/fandata error:', err);
		if (err.status) throw err;
		throw error(500, 'An internal server error occurred.');
	}
}
import { sanitizeString } from '$lib/helper/format-helper';
import { db } from '$lib/server/firebase-admin';
import { json, error } from '@sveltejs/kit';

/**
 * POST /api/fandata
 * 
 * Expected JSON body: { name:string, email:string, streaming:string, wantsUpdates:boolean }
 */
export async function POST({ request }) {
	try {
		const data = await request.json();

    const name = sanitizeString(data.name, 100);
    const email = sanitizeString(data.email, 254).toLowerCase();
    const streaming = sanitizeString(data.streaming, 50);

		if (
			!name ||
			!email ||
			!streaming ||
			typeof data.wantsUpdates !== 'boolean'
		) {
			throw error(400, 'Missing or malformed fields');
		}

		await db.collection('rdfweb').doc('fandata').set(data, { merge: true });

		return json({ ok: true });
	} catch (err) {
		console.error('/api/fandata error:', err);
		if (err instanceof Error && 'status' in err) {
			throw err;
		}
		throw error(500, 'Internal server error');
	}
}


import { json, error } from '@sveltejs/kit';
import { sanitizeString } from '$lib/helper/format-helper';
import { db, Timestamp } from '$lib/server/firebase-admin';

function emailToDocId(email: string): string {
  const normalized = email.trim().toLowerCase();

  const bytes = new TextEncoder().encode(normalized);
  const base64 = btoa(String.fromCharCode(...bytes));

  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * POST /api/fandata
 *
 * Expected JSON body: { name:string, email:string, streaming:string, wantsUpdates:boolean }
 */
export async function POST({ request }) {
  try {
    const raw = await request.json();

    const fan = {
      name: sanitizeString(raw.name, 100),
      email: sanitizeString(raw.email, 254),
      streaming: sanitizeString(raw.streaming, 50),
      wantsUpdates: !!raw.wantsUpdates,
      submittedAt: Timestamp.now()
    };

    if (
      !fan.name ||
      !fan.email ||
      !fan.streaming ||
      typeof fan.wantsUpdates !== 'boolean'
    ) {
      throw error(400, 'Missing or malformed fields');
    }

    const docId = emailToDocId(fan.email);

    await db
      .collection('rdffanbase')
      .doc(docId)
      .set(fan, { merge: true });

    return json({ ok: true });
  } catch (err) {
    console.error('/api/fandata error:', err);
    if (err instanceof Error && 'status' in err) throw err;
    throw error(500, 'Internal server error');
  }
}
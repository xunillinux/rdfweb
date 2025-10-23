import { PUBLIC_FB_PROJECT_ID } from '$env/static/public';
import { env } from '$env/dynamic/private';
import admin from 'firebase-admin';

function normalizePrivateKey(key?: string): string | undefined {
  if (!key) return undefined;
  return key.replace(/\\n/g, '\n').trim();
}

if (!admin.apps.length) {
  const privateKey = normalizePrivateKey(env.FB_PRIVATE_KEY);

  if (!privateKey) {
    throw new Error('FB_PRIVATE_KEY is missing or empty');
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: PUBLIC_FB_PROJECT_ID,
      clientEmail: env.FB_CLIENT_EMAIL,
      privateKey,
    }),
  });
}

export const db = admin.firestore();
export const adminAuth = admin.auth();
export const { FieldValue, Timestamp } = admin.firestore;

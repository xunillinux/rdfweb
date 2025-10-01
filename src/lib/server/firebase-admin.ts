import { PUBLIC_FB_PROJECT_ID } from '$env/static/public';
import { env } from '$env/dynamic/private';
import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: PUBLIC_FB_PROJECT_ID,
      clientEmail: env.FB_CLIENT_EMAIL,
      privateKey: env.FB_PRIVATE_KEY,
    }),
  });
}

export const db = admin.firestore();
export const adminAuth = admin.auth();
export const { FieldValue, Timestamp } = admin.firestore;

import { PUBLIC_FB_PROJECT_ID } from '$env/static/public';
import { FB_CLIENT_EMAIL, FB_PRIVATE_KEY } from '$env/static/private';
import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: PUBLIC_FB_PROJECT_ID,
      clientEmail: FB_CLIENT_EMAIL,
      privateKey: FB_PRIVATE_KEY,
    }),
  });
}

export const db = admin.firestore();
export const adminAuth = admin.auth();
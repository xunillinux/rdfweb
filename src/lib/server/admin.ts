import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { PUBLIC_FB_PROJECT_ID } from '$env/static/public';
import { FB_CLIENT_EMAIL, FB_PRIVATE_KEY, R2_ACCESS_KEY_ID, R2_ENDPOINT, R2_SECRET_ACCESS_KEY } from '$env/static/private';
import pkg from 'firebase-admin';
import { S3Client } from '@aws-sdk/client-s3';

try {
  pkg.initializeApp({
    credential: pkg.credential.cert({
      projectId: PUBLIC_FB_PROJECT_ID,
      clientEmail: FB_CLIENT_EMAIL,
      privateKey: FB_PRIVATE_KEY,
    }),
  });
} catch (err: any) {
  if (!/already exists/u.test(err.message)) {
    console.error('Firebase Admin Error: ', err.stack)
  }
}


export const adminDB = getFirestore();
export const adminAuth = getAuth();


export const s3 = new S3Client({
  region: 'auto', // Required for R2
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

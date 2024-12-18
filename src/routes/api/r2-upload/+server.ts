// src/routes/api/r2-upload-url/+server.js
import { R2_ACCESS_KEY_ID, R2_BUCKET, R2_ENDPOINT, R2_SECRET_ACCESS_KEY } from '$env/static/private';
import { adminAuth } from '$lib/server/firebase-admin.js';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { json } from '@sveltejs/kit';

const s3 = new S3Client({
  region: 'auto', // Required for R2
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true, // Ensure this is set for R2
});

export async function POST({ request }) {
  try {
    const { firebaseToken, fileName, contentType } = await request.json();
    // Verify Firebase token
    const user = await adminAuth.verifyIdToken(firebaseToken);
    if (!user) {
      return json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Generate Presigned URL
    const command = new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: fileName,
      ContentType: contentType,
    });

    const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 300 }); // 5-min expiration

    return json({ uploadUrl: presignedUrl });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    return json({ error: 'Unauthorized' }, { status: 401 });
  }
}

import { adminAuth } from '$lib/server/firebase-admin.js';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const s3 = new S3Client({
  region: 'auto', // Required for R2
  endpoint: env.R2_ENDPOINT,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
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
      Bucket: env.R2_BUCKET,
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

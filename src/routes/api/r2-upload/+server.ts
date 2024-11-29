// src/routes/api/r2-upload-url/+server.js
import { json } from '@sveltejs/kit';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { R2_BUCKET } from '$env/static/private';
import { adminAuth, s3 } from '$lib/server/admin.js';

export async function POST({ request }) {
  try {
    const { firebaseToken, fileName, contentType } = await request.json();
    console.log(fileName);
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

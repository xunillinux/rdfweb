import { adminAuth } from "$lib/server/firebase-admin";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { json } from "@sveltejs/kit";
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

export async function DELETE({ request }) {
  try {
    const { firebaseToken, fileName } = await request.json();
    // Verify Firebase token
    const user = await adminAuth.verifyIdToken(firebaseToken);
    if (!user) {
      return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const command = new DeleteObjectCommand({
      Bucket: env.R2_BUCKET,
      Key: fileName
    });

    await s3.send(command);

    return json({ sucess: true });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    return json({ error: 'Unauthorized' }, { status: 401 });
  }
}
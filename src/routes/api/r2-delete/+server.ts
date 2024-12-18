import { R2_ACCESS_KEY_ID, R2_BUCKET, R2_ENDPOINT, R2_SECRET_ACCESS_KEY } from "$env/static/private";
import { adminAuth } from "$lib/server/firebase-admin";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { json } from "@sveltejs/kit";

const s3 = new S3Client({
  region: 'auto', // Required for R2
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
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
      Bucket: R2_BUCKET,
      Key: fileName
    });

    await s3.send(command);

    return json({ sucess: true });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    return json({ error: 'Unauthorized' }, { status: 401 });
  }
}
import { getIdToken } from "$lib/firebase";

export async function uploadR2File(file: File, fileNameOverwrite: string): Promise<string> {
  if (!file) {
    throw new Error("No file provided");
  }

  // Get Firebase token
  const firebaseToken = await getIdToken();

  // Fetch presigned URL from your API
  const response = await fetch("/api/r2-upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firebaseToken,
      fileName: fileNameOverwrite ?? file.name,
      contentType: file.type,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch upload URL: ${response.statusText}`);
  }

  const { uploadUrl } = await response.json();
  if (!uploadUrl) {
    throw new Error("Upload URL not provided");
  }

  // Upload file to Cloudflare R2
  const uploadResponse = await fetch(uploadUrl, {
    method: "PUT",
    body: file,
    headers: { "Content-Type": file.type },
  });

  if (!uploadResponse.ok) {
    throw new Error(`Failed to upload file: ${uploadResponse.statusText}`);
  }

  return fileNameOverwrite ?? file.name; // Return the file URL without query parameters
}

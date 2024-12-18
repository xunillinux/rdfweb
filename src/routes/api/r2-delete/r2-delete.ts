import { getIdToken } from "$lib/firebase";

export async function deleteR2File(fileName: string): Promise<void> {
  if (!fileName) {
    throw new Error("No filename provided");
  }

  // Get Firebase token
  const firebaseToken = await getIdToken();

   // Send DELETE request to the backend
   const response = await fetch("/api/r2-delete", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firebaseToken,
      fileName
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to delete file: ${response.statusText}`);
  }
}

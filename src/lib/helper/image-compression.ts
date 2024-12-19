import imageCompression from 'browser-image-compression';

export async function optimizeImage(file: File): Promise<File> {
  const options = {
    maxSizeMB: 1, // Balanced size for good quality (~1 MB max)
    maxWidthOrHeight: 1920, // Suitable for most screens (FHD resolution)
    useWebWorker: true, // For better performance
    fileType: 'image/webp', // Efficient compression with WebP
    initialQuality: 0.85, // High-quality compression (~85%)
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    return file; // Return the original file if compression fails
  }
}
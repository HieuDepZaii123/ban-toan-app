/** Longest side and JPEG quality steps for a photo of a problem; the server accepts about 1.5 MB. */
const STEPS: readonly { side: number; quality: number }[] = [
  { side: 1600, quality: 0.82 },
  { side: 1280, quality: 0.72 },
  { side: 1024, quality: 0.62 },
];
const MAX_CHARS = 1_900_000;

/** Shrink a chosen or captured photo to a JPEG data URL small enough to send, or null if it can't be read. */
export async function shrinkPhoto(file: File): Promise<string | null> {
  if (!file.type.startsWith("image/")) return null;
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    return null;
  }
  try {
    for (const step of STEPS) {
      const scale = Math.min(1, step.side / Math.max(bitmap.width, bitmap.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(bitmap.width * scale));
      canvas.height = Math.max(1, Math.round(bitmap.height * scale));
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      const url = canvas.toDataURL("image/jpeg", step.quality);
      if (url.length <= MAX_CHARS) return url;
    }
    return null;
  } finally {
    bitmap.close();
  }
}

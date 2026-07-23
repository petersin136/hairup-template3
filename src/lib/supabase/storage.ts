const bucket = () => process.env.NEXT_PUBLIC_STORAGE_BUCKET ?? "site-assets";

/** Storage object path → public URL */
export function getPublicStorageUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  }

  const encoded = path
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `${base}/storage/v1/object/public/${bucket()}/${encoded}`;
}

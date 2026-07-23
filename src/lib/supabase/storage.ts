import { normalizeSupabaseUrl } from "@/lib/supabase/url";

const bucket = () => process.env.NEXT_PUBLIC_STORAGE_BUCKET ?? "site-assets";

/** Storage object path → public URL */
export function getPublicStorageUrl(path: string): string {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!raw) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  }

  const base = normalizeSupabaseUrl(raw);

  const encoded = path
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `${base}/storage/v1/object/public/${bucket()}/${encoded}`;
}

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { normalizeSupabaseUrl } from "@/lib/supabase/url";

/**
 * Server-only Supabase client.
 * Node 20 on Vercel has no global WebSocket — pass `ws` as realtime transport.
 */
export function createSupabaseServerClient(): SupabaseClient {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!rawUrl || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY (set in Vercel → Settings → Environment Variables)",
    );
  }

  const url = normalizeSupabaseUrl(rawUrl);

  const options: NonNullable<Parameters<typeof createClient>[2]> = {
    auth: { persistSession: false, autoRefreshToken: false },
  };

  if (typeof WebSocket === "undefined") {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const ws = require("ws");
    options.realtime = { transport: ws };
  }

  return createClient(url, key, options);
}

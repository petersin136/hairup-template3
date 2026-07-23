import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client.
 * Node 20 on Vercel has no global WebSocket — pass `ws` as realtime transport.
 * Prefer Node 22+ (native WebSocket) via package.json engines.
 */
export function createSupabaseServerClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY (set in Vercel → Settings → Environment Variables)",
    );
  }

  const options: NonNullable<Parameters<typeof createClient>[2]> = {
    auth: { persistSession: false, autoRefreshToken: false },
  };

  if (typeof WebSocket === "undefined") {
    // Lazy require so Edge/bundlers don't break when WebSocket exists (Node 22+)
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const ws = require("ws");
    options.realtime = { transport: ws };
  }

  return createClient(url, key, options);
}

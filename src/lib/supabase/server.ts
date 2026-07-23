import { createClient } from "@supabase/supabase-js";
import ws from "ws";

export function createSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    // Node < 22: supabase-js realtime requires an explicit WebSocket transport
    realtime: { transport: ws as unknown as typeof WebSocket },
  });
}

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/** Production diagnostics — no secrets returned */
export async function GET() {
  const hasUrl = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const hasAnon = Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const hasBucket = Boolean(process.env.NEXT_PUBLIC_STORAGE_BUCKET);
  const node = process.version;
  const hasWebSocket = typeof WebSocket !== "undefined";

  let supabaseOk = false;
  let supabaseError: string | null = null;

  if (hasUrl && hasAnon) {
    try {
      const { createSupabaseServerClient } = await import(
        "@/lib/supabase/server"
      );
      const supabase = createSupabaseServerClient();
      const { error } = await supabase
        .from("site_settings")
        .select("id")
        .limit(1);
      if (error) {
        supabaseError = error.message;
      } else {
        supabaseOk = true;
      }
    } catch (e) {
      supabaseError = e instanceof Error ? e.message : String(e);
    }
  }

  return NextResponse.json({
    ok: hasUrl && hasAnon && supabaseOk,
    node,
    hasWebSocket,
    env: { hasUrl, hasAnon, hasBucket },
    supabaseOk,
    supabaseError,
  });
}

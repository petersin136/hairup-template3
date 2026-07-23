import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/** Production diagnostics — no secrets returned */
export async function GET() {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const hasUrl = Boolean(rawUrl);
  const hasAnon = Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const hasBucket = Boolean(process.env.NEXT_PUBLIC_STORAGE_BUCKET);
  const node = process.version;
  const hasWebSocket = typeof WebSocket !== "undefined";

  let urlHost: string | null = null;
  let urlPath: string | null = null;
  let urlLooksValid = false;
  try {
    const u = new URL(rawUrl);
    urlHost = u.host;
    urlPath = u.pathname;
    urlLooksValid =
      u.protocol === "https:" && u.hostname.endsWith(".supabase.co");
  } catch {
    urlLooksValid = false;
  }

  let supabaseOk = false;
  let supabaseError: string | null = null;
  let supabaseStatus: number | null = null;

  if (hasUrl && hasAnon) {
    try {
      const base = rawUrl.trim();
      let origin: string;
      try {
        origin = new URL(base).origin;
      } catch {
        origin = base.replace(/\/$/, "");
      }
      const res = await fetch(
        `${origin}/rest/v1/site_settings?select=id&limit=1`,
        {
          headers: {
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
          },
        },
      );
      supabaseStatus = res.status;
      const text = await res.text();
      if (!res.ok) {
        supabaseError = text.slice(0, 240);
      } else {
        supabaseOk = true;
      }
    } catch (e) {
      supabaseError = e instanceof Error ? e.message : String(e);
    }

    if (supabaseOk) {
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
          supabaseOk = false;
          supabaseError = `js-client: ${error.message}`;
        }
      } catch (e) {
        supabaseOk = false;
        supabaseError = `js-client: ${
          e instanceof Error ? e.message : String(e)
        }`;
      }
    }
  }

  return NextResponse.json({
    ok: hasUrl && hasAnon && urlLooksValid && supabaseOk,
    node,
    hasWebSocket,
    env: { hasUrl, hasAnon, hasBucket, urlHost, urlPath, urlLooksValid },
    supabaseOk,
    supabaseStatus,
    supabaseError,
  });
}

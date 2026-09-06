import { createServiceRoleClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    const cronSecret = process.env.CRON_SECRET;
    const authorization = request.headers.get("authorization");

    if (!cronSecret || authorization !== `Bearer ${cronSecret}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const supabase = createServiceRoleClient();
        const results = await Promise.all([
            supabase.from("profiles").select("id").limit(1),
            supabase.from("vehicles").select("id").limit(1),
            supabase.from("entries").select("id").limit(1),
        ]);

        if (results.some(({ error }) => error !== null)) {
            return NextResponse.json(
                { error: "Keep-alive failed" },
                { status: 500 }
            );
        }

        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json(
            { error: "Keep-alive failed" },
            { status: 500 }
        );
    }
}

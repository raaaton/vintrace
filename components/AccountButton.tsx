import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export async function AccountButton() {
    const supabase = await createClient();

    // You can also use getUser() which will be slower.
    const { data } = await supabase.auth.getClaims();

    const user = data?.claims;

    return user ? (
        <Link href="/account" className="flex items-center gap-4">
            <span className="hover:text-primary transition-all text-xs tracking-wider uppercase text-muted-foreground cursor-pointer">
                Mon Compte
            </span>
        </Link>
    ) : null;
}

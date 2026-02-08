"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
    const router = useRouter();

    const logout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.refresh();
        router.push("/");
    };

    return (
        <button
            onClick={logout}
            className="hover:text-primary transition-all text-xs tracking-wider uppercase text-muted-foreground cursor-pointer"
        >
            Déconnexion
        </button>
    );
}

import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./LogoutButton";

export async function AuthButton() {
    const supabase = await createClient();

    // You can also use getUser() which will be slower.
    const { data } = await supabase.auth.getClaims();

    const user = data?.claims;

    return user ? (
        <div className="flex items-center gap-4">
            <LogoutButton />
        </div>
    ) : (
        <div className="flex gap-6 items-center">
            <Link
                href="/login"
                className="hover:text-primary transition-all text-xs tracking-wider uppercase text-stone-400 cursor-pointer"
            >
                Connexion
            </Link>
            <Button asChild size="sm" variant={"default"}>
                <Link
                    href="/register"
                    className="uppercase px-4 py-1 hover:bg-primary transition-all text-xs font-semibold cursor-pointer"
                >
                    Commencer
                </Link>
            </Button>
        </div>
    );
}

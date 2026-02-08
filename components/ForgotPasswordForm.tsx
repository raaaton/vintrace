"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";

export function ForgotPasswordForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        const supabase = createClient();
        setIsLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/update-password`,
            });
            if (error) throw error;
            setSuccess(true);
        } catch (error: unknown) {
            setError(
                error instanceof Error ? error.message : "Une erreur est survenue"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            {success ? (
                <Card className="max-sm:border-none">
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            Vérifiez vos emails
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Si cet email est associé à un compte, vous recevrez 
                            un lien pour réinitialiser votre mot de passe d&apos;ici quelques instants.
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <Card className="max-sm:border-none">
                    <CardHeader>
                        <CardTitle className="text-xl md:text-2xl">
                            Réinitialiser le mot de passe
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleForgotPassword}>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="exemple@vintrace.fr"
                                        required
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                                {error && (
                                    <p className="text-sm text-red-500">
                                        {error}
                                    </p>
                                )}
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isLoading}
                                >
                                    {isLoading
                                        ? "Envoi en cours..."
                                        : "Envoyer le lien"}
                                </Button>
                            </div>
                            <div className="mt-4 text-center text-sm">
                                Vous avez déjà un compte ?{" "}
                                <Link
                                    href="/login"
                                    className="underline underline-offset-4"
                                >
                                    Connexion
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
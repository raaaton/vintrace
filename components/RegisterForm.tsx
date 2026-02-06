"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldSeparator,
} from "./ui/field";
import GoogleAuthButton from "@/components/GoogleAuthButton";

export function RegisterForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        const supabase = createClient();
        setIsLoading(true);
        setError(null);

        if (password !== repeatPassword) {
            setError("Les mots de passe ne correspondent pas");
            setIsLoading(false);
            return;
        }

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${window.location.origin}/protected`,
                    data: {
                        full_name: fullName,
                    },
                },
            });
            if (error) throw error;
            router.push("/auth/sign-up-success");
        } catch (error: unknown) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Une erreur est survenue"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="max-sm:border-none">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Créer un compte</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleRegister}>
                        <FieldGroup>
                            {/* OAuth Register */}
                            <GoogleAuthButton />
                            <FieldSeparator>Ou continuer avec</FieldSeparator>
                            <div className="flex flex-col gap-6">
                                <Field className="grid< gap-2">
                                    <Label htmlFor="fullName">
                                        Nom complet
                                    </Label>
                                    <Input
                                        id="fullName"
                                        type="text"
                                        placeholder="Jean Dupont"
                                        required
                                        value={fullName}
                                        onChange={(e) =>
                                            setFullName(e.target.value)
                                        }
                                    />
                                </Field>
                                <Field className="grid gap-2">
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
                                </Field>
                                <Field className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">
                                            Mot de passe
                                        </Label>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••••"
                                        required
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </Field>
                                <Field className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="repeat-password">
                                            Confirmer le mot de passe
                                        </Label>
                                    </div>
                                    <Input
                                        id="repeat-password"
                                        type="password"
                                        placeholder="••••••••••"
                                        required
                                        value={repeatPassword}
                                        onChange={(e) =>
                                            setRepeatPassword(e.target.value)
                                        }
                                    />
                                </Field>
                                {/* Error Message */}
                                {error && (
                                    <p className="text-sm text-red-500">
                                        {error}
                                    </p>
                                )}
                                <Field className="">
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={isLoading}
                                    >
                                        {isLoading
                                            ? "Création du compte..."
                                            : "Commencer"}
                                    </Button>
                                    <FieldDescription className="text-center text-sm">
                                        Vous avez déjà un compte ?{" "}
                                        <Link
                                            href="/login"
                                            className="underline underline-offset-4"
                                        >
                                            Connexion
                                        </Link>
                                    </FieldDescription>
                                </Field>
                            </div>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

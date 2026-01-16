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
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Créer un compte</CardTitle>
                    <CardDescription>
                        Complétez le formulaire pour créer votre compte
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleRegister}>
                        <FieldGroup>
                            <Field>
                                <Button variant="outline" type="button">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    Continuer avec Google
                                </Button>
                            </Field>
                            <FieldSeparator>Ou continuez avec</FieldSeparator>
                            <div className="flex flex-col gap-6">
                                <Field className="grid gap-2">
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

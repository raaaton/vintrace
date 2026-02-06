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
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GoogleAuthButton from "@/components/GoogleAuthButton";

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const supabase = createClient();
        setIsLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;
            router.refresh();
            setTimeout(() => {
                router.push("/garage");
            }, 100);
        } catch (error: unknown) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Une erreur est survenue",
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="max-sm:border-none">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">
                        Ravi de vous revoir
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin}>
                        <FieldGroup>
                            {/* OAuth Login */}
                            <GoogleAuthButton />
                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                Ou continuer avec
                            </FieldSeparator>

                            <div className="flex flex-col gap-6">
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
                                        <Link
                                            href="/auth/forgot-password"
                                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                        >
                                            Mot de passe oublié ?
                                        </Link>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        value={password}
                                        placeholder="••••••••••"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </Field>
                                {/* Error Message */}
                                {error && (
                                    <p className="text-sm text-red-500">
                                        {error}
                                    </p>
                                )}
                                <Field>
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={isLoading}
                                    >
                                        {isLoading
                                            ? "Connexion en cours..."
                                            : "Se connecter"}
                                    </Button>
                                    <FieldDescription className="text-center text-sm">
                                        Vous n&apos;avez pas de compte ?{" "}
                                        <Link
                                            href="/register"
                                            className="underline underline-offset-4"
                                        >
                                            S&apos;inscrire
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

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Inscription Réussie | VinTrace",
};
export default function Page() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">
                                Merci pour votre inscription !
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Votre compte a été créé avec succès. Veuillez consulter vos emails pour confirmer votre compte avant de vous connecter.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
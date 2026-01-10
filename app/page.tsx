import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Vintrace | Valorisez votre véhicule lors de sa revente",
};

export default function Home() {
    return (
        <div className="flex-1 flex flex-col gap-10 max-w-5xl p-5 mt-20 text-center">
            <h1 className="text-4xl font-bold tracking-tight">Bienvenue</h1>
            <p className="text-lg text-muted-foreground">
                Votre application est prête.
            </p>
        </div>
    );
}

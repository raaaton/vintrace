import Link from "next/link";
import { Gauge, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-[80vh] text-white font-sans selection:bg-[#E5B02B] selection:text-black">
            <main className="relative z-10 flex flex-col items-center px-4 text-center">
                {/* Icône de compteur */}
                <Gauge
                    className="w-10 h-10 mb-6 text-zinc-500 opacity-60"
                    strokeWidth={1}
                />

                {/* 404 Géant */}
                <h1 className="text-[110px] md:text-[130px] font-bold leading-none tracking-tighter mb-5">
                    404
                </h1>

                {/* Sous-titre coloré */}
                <h2 className="mb-5 text-xs font-medium tracking-[0.3em] text-[#E5B02B] uppercase">
                    Sortie de piste
                </h2>

                {/* Texte explicatif */}
                <p className="max-w-[400px] mb-10 text-sm leading-relaxed text-zinc-400">
                    La page que vous recherchez semble avoir pris un virage trop
                    large. L'historique de cette URL est introuvable dans nos
                    archives.
                </p>

                {/* Bouton retour */}
                <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-3 px-5 py-3 text-xs font-semibold tracking-wider text-zinc-300 uppercase transition-all duration-200 bg-transparent border rounded-md border-white/10 hover:bg-white/5 hover:text-white"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Retour au garage
                </Link>
            </main>
        </div>
    );
}

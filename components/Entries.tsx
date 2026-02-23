import { Badge } from "@/components/ui/badge";

export default function Entries({
    vehicleId,
    filter,
}: {
    vehicleId: string;
    filter: string;
}) {
    const entries = [
        {
            id: "e1",
            type: "service",
            title: "Grand Entretien & Réglage Soupapes",
            description:
                "Procédure complète avec dépose moteur. Remplacement bougies, filtres (huile, essence, air). Vidange Motul 300V 15W50. Test de compression effectué : OK (145-150 psi).",
            detailer: "Flat Six Spécialistes",
            kileage: 84100,
            cost: 3200.0,
            event_date: "2024-11-15",
        },
        {
            id: "e2",
            type: "modification",
            title: "Optimisation Échappement Inox",
            description:
                "Installation d'une ligne complète en acier inoxydable 304L. Gain de poids substantiel (-12kg) et amélioration du flux thermique.",
            detailer: "Motorsport Performance",
            kileage: 84500,
            cost: 2450.0,
            event_date: "2024-12-02",
        },
        {
            id: "e3",
            type: "event",
            title: "Concours d'Élégance de Monterey",
            description:
                "Participation au Concours de Carmel-by-the-Sea. Récompensé 2ème de la catégorie (964/993 Turbo). État cosmétique exceptionnel noté par le jury.",
            detailer: "Monterey Car Week",
            kileage: 84800,
            cost: 450.0,
            event_date: "2025-01-20",
        },
        {
            id: "e4",
            type: "admin",
            title: "Renouvellement Certificat d'Immatriculation",
            description:
                "Mise à jour administrative suite à l'importation. Dossier FFVE complet approuvé.",
            detailer: "ANTS / Préfecture",
            kileage: 84800,
            cost: 0.0,
            event_date: "2025-02-10",
        },
    ].filter((entry) => entry.type === filter || filter === "all");

    // Type Configuration: Label & Dot Color based on Entry Type
    const typeConfig: Record<string, { label: string; dotColor: string }> = {
        service: { label: "SRV", dotColor: "bg-white" },
        event: { label: "EVT", dotColor: "bg-red-500" },
        modification: { label: "MOD", dotColor: "bg-primary" },
        admin: { label: "ADM", dotColor: "bg-gray-500" },
    };

    return (
        <div className="flex flex-col w-full max-w-5xl mx-auto py-10 px-4">
            {entries.map((entry, index) => {
                const config = typeConfig[entry.type] || {
                    label: "???",
                    dotColor: "bg-white",
                };

                return (
                    <div
                        key={entry.id}
                        className="relative flex gap-6 md:gap-10"
                    >
                        {/* --- LEFT: Date & Km --- */}
                        <div className="w-24 md:w-32 pt-1 text-right shrink-0">
                            <div className="text-sm font-mono text-white/90 tracking-tight">
                                {entry.event_date}
                            </div>
                            <div className="text-[11px] font-mono tracking-widest text-muted-foreground mt-1">
                                {entry.kileage.toLocaleString()} km
                            </div>
                        </div>

                        {/* --- MIDDLE: Timeline --- */}
                        <div className="relative flex flex-col items-center">
                            {/* Dot */}
                            <div className="z-10 mt-1.5">
                                <div
                                    className={`size-3 rotate-45 ${config.dotColor}`}
                                />
                            </div>
                            {/* Line */}
                            {index !== entries.length - 1 && (
                                <div className="w-[1px] flex-1 bg-gradient-to-b from-white/20 to-transparent my-3" />
                            )}
                        </div>

                        {/* --- RIGHT: Content --- */}
                        <div className="flex-1 pb-16">
                            <div className="flex items-start justify-between w-full mb-1">
                                <div className="flex items-center gap-3">
                                    <Badge
                                        variant="outline"
                                        className="bg-white/5 text-[10px] border-white/10 px-1.5 py-0.5 text-muted-foreground"
                                    >
                                        {config.label}
                                    </Badge>
                                    <h3 className="text-lg text-white tracking-tight leading-none">
                                        {entry.title}
                                    </h3>
                                </div>
                                <div className="text-sm font-mono text-white/80 whitespace-nowrap ml-4">
                                    {entry.cost > 0
                                        ? `${entry.cost.toLocaleString("en-US")} €`
                                        : "-- €"}
                                </div>
                            </div>

                            <div className="text-sm text-muted-foreground/60 mb-6">
                                {entry.detailer}
                            </div>

                            {/* Description */}
                            {entry.description && (
                                <div className="relative pl-4 border-l-2 border-white/5 py-1">
                                    <p className="text-sm text-muted-foreground/80 italic leading-relaxed">
                                        {entry.description}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

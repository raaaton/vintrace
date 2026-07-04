import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { History, Maximize2 } from "lucide-react";
import { filterToLabel } from "@/lib/utils";
import AddEntryButton from "./AddEntryButton";
import DocumentThumbnail from "./DocumentThumbnail";

export default async function Entries({
    vehicleId,
    filter,
}: {
    vehicleId: string;
    filter: string;
}) {
    // Entries fetching
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const { data: entries, error } = await supabase
        .from("entries")
        .select("*")
        .eq("vehicle_id", vehicleId)
        .order("event_date", { ascending: false });

    if (error) {
        console.error("Error when fetching entries:", error);
        return null;
    }

    // Filter entries based on selected type
    const filteredEntries = entries.filter((entry) => {
        return filter === "all" || entry.type === filter;
    });

    // Type Configuration: Label & Dot Color based on Entry Type
    const typeConfig: Record<string, { label: string; dotColor: string }> = {
        service: { label: "SRV", dotColor: "bg-white" },
        event: { label: "EVT", dotColor: "bg-red-500" },
        modification: { label: "MOD", dotColor: "bg-primary" },
        admin: { label: "ADM", dotColor: "bg-gray-500" },
    };

    const formatDate = (dateStr: string) => {
        const [year, month, day] = dateStr.split("-");
        return `${day}-${month}-${year}`;
    };

    return (
        <div className="flex flex-col w-full max-w-5xl mx-auto py-6 px-4 md:px-6">
            {filteredEntries.length ? (
                filteredEntries.map((entry, index) => {
                    const config = typeConfig[entry.type] || {
                        label: "???",
                        dotColor: "bg-white",
                    };

                    const formattedDate = formatDate(entry.event_date);
                    const formattedKileage = entry.kileage
                        ? entry.kileage.toLocaleString()
                        : "-,---";

                    return (
                        <div
                            key={entry.id}
                            className="relative flex gap-4 md:gap-10"
                        >
                            {/* --- LEFT: Date & Km for desktop--- */}
                            <div className="hidden md:block w-20 md:w-32 pt-1 text-right shrink-0">
                                <div className="text-xs md:text-sm font-mono text-white/90 tracking-tight">
                                    {formattedDate}
                                </div>
                                <div className="text-[10px] md:text-[11px] font-mono tracking-widest text-muted-foreground mt-0.5 md:mt-1">
                                    {formattedKileage} km
                                </div>
                            </div>

                            {/* --- MIDDLE: Timeline & Date & Km for mobile --- */}
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
                            <div className="flex-1 pb-12 md:pb-16">
                                {/* Date and Kilometer */}
                                <div className="flex items-center gap-2 md:hidden md:w-32 pt-1 mb-2 text-right shrink-0">
                                    <div className="text-xs md:text-sm font-mono text-white/90 tracking-tight">
                                        {formattedDate}
                                    </div>
                                    <div className="text-[10px] md:text-[11px] font-mono tracking-widest text-muted-foreground mt-0.5 md:mt-1">
                                        {formattedKileage} km
                                    </div>
                                </div>

                                {/* Title and Cost */}
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between w-full mb-1 gap-2">
                                    <div className="flex flex-row items-center justify-start gap-2 sm:gap-3 min-w-0">
                                        <Badge
                                            variant="outline"
                                            className="bg-white/5 text-[10px] border-white/10 px-1.5 py-0.5 text-muted-foreground shrink-0"
                                        >
                                            {config.label}
                                        </Badge>
                                        <h3 className="text-sm sm:text-lg text-white tracking-tight leading-none">
                                            {entry.title}
                                        </h3>
                                    </div>
                                    <div className="text-sm font-mono text-white/80 whitespace-nowrap sm:ml-4">
                                        {entry.cost
                                            ? entry.cost > 0
                                                ? `${entry.cost.toLocaleString("en-US")} €`
                                                : "--- €"
                                            : "--- €"}
                                    </div>
                                </div>

                                {/* Detailer */}
                                <div className="text-xs sm:text-sm text-muted-foreground/60 mb-4 md:mb-6">
                                    {entry.detailer}
                                </div>

                                {/* Description */}
                                {entry.description && (
                                    <div className="relative pl-3 md:pl-4 border-l-2 border-white/5 py-1">
                                        <p className="text-xs sm:text-sm text-muted-foreground/80 italic leading-relaxed">
                                            {entry.description}
                                        </p>
                                    </div>
                                )}

                                {/* Documents */}
                                {entry.documents &&
                                    entry.documents.length > 0 && (
                                        <div className="mt-4 flex gap-2">
                                            {entry.documents.map(
                                                (doc, docIndex) => (
                                                    <div
                                                        key={docIndex}
                                                        className="mt-4 flex-shrink-0 w-[120px] h-[160px] relative overflow-hidden rounded-md border border-white/10
                                                        group hover:border-white/50 transition-all duration-300 ease-in-out cursor-pointer"
                                                    >
                                                        <Maximize2 className="text-foreground z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
                                                        <DocumentThumbnail
                                                            src={doc}
                                                            alt={`Document ${docIndex + 1}`}
                                                        />
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    )}
                            </div>
                        </div>
                    );
                })
            ) : (
                <Empty className="py-20 border-none bg-transparent">
                    <EmptyHeader className="flex flex-col items-center">
                        <EmptyMedia
                            variant="icon"
                            className="size-16 rounded-xl bg-white/5 border border-white/10 rotate-45 flex items-center justify-center mb-6"
                        >
                            {/* On contre-pivote l'icône pour qu'elle reste droite dans le carré incliné */}
                            <History className="-rotate-45 size-8 text-muted-foreground/60" />
                        </EmptyMedia>

                        <EmptyTitle className="text-xl font-medium tracking-tight text-white">
                            Aucune entrée trouvée
                        </EmptyTitle>

                        <EmptyDescription className="text-sm text-muted-foreground mt-2">
                            Il n'y a pas encore d'historique enregistré
                            {filter === "all" ? (
                                "."
                            ) : (
                                <p>
                                    pour la catégorie{" "}
                                    <span className="text-white">
                                        {filterToLabel(filter)}
                                    </span>
                                    .
                                </p>
                            )}
                        </EmptyDescription>
                    </EmptyHeader>

                    <EmptyContent className="mt-8">
                        <AddEntryButton vehicleId={vehicleId} />
                    </EmptyContent>
                </Empty>
            )}
        </div>
    );
}

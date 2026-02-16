import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Settings, Plus } from "lucide-react";
import Link from "next/link";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger
} from "@/components/ui/tooltip";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function VehiclePage({
    params
}: {
    params: { vehicleSlug: string };
}) {
    const supabase = await createClient();
    const { vehicleSlug } = await params;

    const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("slug", vehicleSlug)
        .single();

    if (error || !data) {
        if (error && error.code !== "PGRST116") {
            // PGRST116 is the standard error "no rows returned"
            console.error("Database error:", error);
        }
        notFound();
    }

    return (
        <>
            <nav className="fixed z-[100] p-6 md:p-6 lg:p-12 w-full flex justify-between items-center">
                <Link
                    href="/garage"
                    className="flex items-center gap-2 p-2 md:px-3 md:py-2 lg:px-4 lg:py-3 backdrop-blur-md bg-secondary/35 hover:bg-secondary/50 uppercase text-xs font-semibold border border-foreground/25 hover:border-foreground/25 transition-colors ease-out"
                >
                    <ArrowLeft size={16} />{" "}
                    <span className="hidden md:inline">Retour</span>
                </Link>
                <div className="flex gap-4">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button className="flex items-center gap-2 p-2 lg:px-4 lg:py-3 backdrop-blur-md bg-secondary/35 hover:bg-secondary/50 uppercase text-xs font-semibold border border-foreground/25 hover:border-foreground/25 transition-colors ease-out">
                                <Settings size={16} />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>En construction 🚧</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="#"
                                className="flex items-center gap-4 px-3 py-2 lg:px-4 lg:py-3  text-primary-foreground bg-foreground hover:bg-stone-300 uppercase text-xs font-semibold transition-colors ease-out"
                            >
                                Showroom <ArrowUpRight size={16} />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>En construction 🚧</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </nav>
            <div className="relative w-full h-[25vh] md:h-[60vh] lg:h-[65vh] min-h-[400px] md:min-h-[500px] group overflow-hidden">
                <Image
                    className="w-full h-full object-cover z-0"
                    src={data.cover_image_url}
                    alt={`${data.make} ${data.model}`}
                    width={1600}
                    height={1000}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-6 lg:p-12 flex flex-row items-stretch justify-between gap-6 md:gap-8 text-foreground z-20">
                    <div className="max-w-4xl w-auto flex flex-col justify-end">
                        <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-2 md:mb-4">
                            <span className="text-muted-foreground text-xs lg:text-sm font-mono tracking-wider">
                                {data.year}
                            </span>
                            <div className="h-4 w-px bg-muted-foreground" />
                            <span className="text-muted-foreground text-xs lg:text-sm font-mono tracking-wider">
                                {data.license_plate}
                            </span>
                            <div className="h-4 w-px bg-muted-foreground hidden md:block" />
                            <span className="text-muted-foreground text-xs lg:text-sm font-mono tracking-wider hidden md:inline">
                                {data.vin}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-8xl font-light tracking-tighter break-words md:-ml-1 lg:-ml-2 leading-none">
                            {data.model}
                        </h1>
                    </div>

                    <div className="flex flex-col items-end justify-end">
                        <span className="text-xs md:text-sm lg:text-base text-primary uppercase tracking-widest mb-2">
                            <span className="md:hidden">Kilométrage</span>
                            <span className="hidden md:inline">
                                Kilométrage Actuel
                            </span>
                        </span>
                        <span className="flex items-end text-2xl md:text-3xl lg:text-5xl font-mono text-foreground tracking-tight leading-none">
                            {data.kileage.toLocaleString("en-US")}
                            <span className="text-sm md:text-base lg:text-lg ml-2 text-muted-foreground">
                                km
                            </span>
                        </span>
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10"></div>
            </div>
            <div className="w-full px-6 md:px-12 mt-12">
                <Tabs defaultValue="all" className="w-full">
                    {/* Header de la section : Tabs à gauche, Action à droite */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
                        <TabsList>
                            <TabsTrigger value="all">Tout</TabsTrigger>
                            <TabsTrigger value="maintenance">
                                Entretien
                            </TabsTrigger>
                            <TabsTrigger value="modification">
                                Modifs
                            </TabsTrigger>
                            <TabsTrigger value="admin">Admin</TabsTrigger>
                            <TabsTrigger value="event">Événement</TabsTrigger>
                        </TabsList>

                        {/* ... dans le TabsList, assure-toi que les triggers utilisent text-xs font-semibold ... */}

<div className="flex items-center gap-4"> {/* Réduit gap à 4 pour matcher la nav */}
    <div className="flex flex-col items-end leading-none">
        <span className="hidden md:inline text-xs uppercase font-semibold tracking-wider text-muted-foreground">
            5 Entrées
        </span>
    </div>

    {/* Bouton AJOUTER Desktop : Copie conforme du style Nav */}
    <button className="hidden md:flex items-center gap-2 px-3 py-2 lg:px-4 lg:py-3 text-primary-foreground bg-primary hover:bg-primary/90 uppercase text-xs font-semibold transition-colors ease-out">
        <Plus size={16} strokeWidth={2.5} />
        <span className="hidden md:inline">Ajouter</span>
    </button>

    {/* Bouton Mobile : On garde le fixed mais on ajuste pour la cohérence tactile */}
    <button
        className="md:hidden fixed bottom-6 right-6 z-[110] flex items-center justify-center w-14 h-14 bg-primary text-primary-foreground shadow-2xl active:scale-95 transition-transform"
        aria-label="Ajouter une entrée"
    >
        <Plus size={24} strokeWidth={2.5} />
    </button>
</div>

                    </div>
                    <TabsContent value="all">Tout</TabsContent>
                    <TabsContent value="maintenance">Entretien</TabsContent>
                    <TabsContent value="modification">Modifs</TabsContent>
                    <TabsContent value="admin">Admin</TabsContent>
                    <TabsContent value="event">Événements</TabsContent>
                </Tabs>
            </div>
        </>
    );
}

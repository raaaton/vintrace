import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ArrowUpRight, Settings, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Loader2 } from "lucide-react";

function AddEntryButtonSkeleton() {
    return (
        <button className="hidden md:flex items-center gap-2 px-3 py-2 lg:px-4 lg:py-3 text-primary-foreground bg-primary hover:bg-primary/90 uppercase text-xs font-semibold transition-colors ease-out">
            <Plus size={16} strokeWidth={2.5} />
            <span className="hidden md:inline">Ajouter</span>
        </button>
    );
}

export default function Loading() {
    return (
        <>
            {/* Top Navigation Bar */}
            <nav className="fixed z-[100] p-6 md:p-6 lg:p-12 w-full flex justify-between items-center">
                <div className="flex items-center gap-2 p-2 md:px-3 md:py-2 lg:px-4 lg:py-3 backdrop-blur-md bg-secondary/35 uppercase text-xs font-semibold border border-foreground/25">
                    <ArrowLeft size={16} />
                    <span className="hidden md:inline">Retour</span>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 p-2 lg:px-4 lg:py-3 backdrop-blur-md bg-secondary/35 uppercase text-xs font-semibold border border-foreground/25">
                        <Settings size={16} />
                    </button>
                    <div className="flex items-center gap-4 px-3 py-2 lg:px-4 lg:py-3 text-primary-foreground bg-foreground uppercase text-xs font-semibold">
                        Showroom <ArrowUpRight size={16} />
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative w-full h-[25vh] md:h-[60vh] lg:h-[65vh] min-h-[400px] md:min-h-[500px] overflow-hidden">
                {/* Image skeleton */}
                <Image
                    className="w-full h-full object-cover opacity-0"
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='1000'%3E%3C/svg%3E"
                    alt=""
                    width={1600}
                    height={1000}
                    priority
                />
                <Skeleton className="absolute inset-0 rounded-none" />

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10" />

                {/* Overlay content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-6 lg:p-12 flex flex-row items-stretch justify-between gap-6 md:gap-8 z-20">
                    {/* Left */}
                    <div className="max-w-4xl w-auto flex flex-col justify-end">
                        <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-2 md:mb-4">
                            <Skeleton className="text-xs lg:text-sm font-mono tracking-wider text-transparent">
                                2020
                            </Skeleton>
                            <div className="h-4 w-px bg-muted-foreground" />
                            <Skeleton className="text-xs lg:text-sm font-mono tracking-wider text-transparent">
                                FW-823-DP
                            </Skeleton>
                            <div className="h-4 w-px bg-muted-foreground hidden md:block" />
                            <Skeleton className="text-xs lg:text-sm font-mono tracking-wider hidden md:inline text-transparent">
                                1JRO827JDI6183727
                            </Skeleton>
                        </div>
                        <Skeleton className="text-4xl md:text-6xl lg:text-8xl font-light text-transparent w-fit leading-none">
                            488 Pista Spider
                        </Skeleton>
                    </div>

                    {/* Right: kileage */}
                    <div className="flex flex-col items-end justify-end">
                        <span className="text-xs md:text-sm lg:text-base text-primary uppercase tracking-widest mb-2">
                            <span className="md:hidden">Kilométrage</span>
                            <span className="hidden md:inline">
                                Kilométrage Actuel
                            </span>
                        </span>
                        <div className="flex items-end">
                            <Skeleton className="text-2xl md:text-3xl lg:text-5xl font-mono text-transparent tracking-tight leading-none w-fit">
                                00,000
                            </Skeleton>
                            <span className="text-sm md:text-base lg:text-lg ml-2 text-muted-foreground">
                                km
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs Section */}
            <div className="w-full px-4 md:px-12 mt-8 md:mt-12 overflow-hidden">
                <Tabs defaultValue="all" className="w-full">
                    <div className="flex flex-wrap items-center justify-between gap-4 md:border-b md:border-white/10 md:pb-6">
                        <div className="w-full md:w-auto overflow-hidden">
                            <TabsList>
                                <TabsTrigger value="all">Tout</TabsTrigger>
                                <TabsTrigger value="maintenance">
                                    Entretien
                                </TabsTrigger>
                                <TabsTrigger value="modification">
                                    Modifs
                                </TabsTrigger>
                                <TabsTrigger value="admin">Admin</TabsTrigger>
                                <TabsTrigger value="event">
                                    Événement
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* getEntriesNumber skeleton */}
                            <Skeleton className="hidden md:inline text-xs text-transparent w-fit">
                                0 entrées
                            </Skeleton>
                            <AddEntryButtonSkeleton />
                        </div>
                    </div>

                    <TabsContent value="all">
                        <div className="flex justify-center items-start py-[13.25rem]">
                            <Loader2
                                className="animate-spin text-muted-foreground"
                                size={32}
                                strokeWidth={1.5}
                            />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}

import VehicleCard from "@/components/VehicleCard";
import VehicleHero from "@/components/VehicleHero";
import VehicleHeroSkeleton from "@/components/skeletons/VehicleHeroSkeleton";
import VehicleCardSkeleton from "@/components/skeletons/VehicleCardSkeleton";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import AddVehicleButton from "@/components/AddVehicleButton";
import { headers } from "next/headers";

export const metadata: Metadata = {
    title: "Mon Garage | VinTrace",
};

export const dynamic = "force-dynamic";

export default async function GaragePage() {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "";
    const isMobile = /mobile/i.test(userAgent);

    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    let count = 0;
    if (user) {
        const { count: vehicleCount } = await supabase
            .from("vehicles")
            .select("*", { count: "exact", head: true })
            .eq("owner_id", user.id);
        count = vehicleCount || 0;
    }

    return (
        <div className="mt-8 mx-auto w-[90%] sm:w-[80%] lg:w-[75%]">
            <header className="flex items-center justify-between mb-16 border-b border-foreground/10 pb-8">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-light tracking-tight text-foreground mb-2">
                        Garage
                    </h1>
                    <Suspense
                        fallback={
                            <Skeleton className="h-4 w-20 bg-muted-foreground/10" />
                        }
                    >
                        <VehicleNumber />
                    </Suspense>
                </div>
                <AddVehicleButton />
            </header>
            <Suspense
                fallback={
                    count > 0 ? (
                        count === 1 && !isMobile ? (
                            <section className="flex justify-center">
                                <VehicleHeroSkeleton />
                            </section>
                        ) : (
                            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr mb-20">
                                {Array.from({ length: count }).map((_, i) => (
                                    <VehicleCardSkeleton key={i} />
                                ))}
                            </section>
                        )
                    ) : null
                }
            >
                <VehicleContent />
            </Suspense>
        </div>
    );
}

async function VehicleContent() {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "";
    const isMobile = /mobile/i.test(userAgent);

    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const { data: vehicles } = await supabase
        .from("vehicles")
        .select("*")
        .eq("owner_id", user.id)
        .order("created_at", {
            ascending: false,
        });

    if (!vehicles || vehicles.length === 0) {
        return (
            <p className="text-muted-foreground">
                Aucun véhicule trouvé. Ajoutez-en un pour commencer à suivre son historique.
            </p>
        );
    }

    if (vehicles.length > 1 || isMobile) {
        return (
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr mb-20">
                {vehicles.map((vehicle) => (
                    <Link
                        key={vehicle.slug}
                        href={`/garage/${vehicle.slug}`}
                        className="hover:-translate-y-1 transition-all ease-out duration-300"
                    >
                        <VehicleCard vehicle={vehicle} />
                    </Link>
                ))}
            </section>
        );
    }

    return (
        <section className="flex justify-center">
            <Link href={`/garage/${vehicles[0].slug}`}>
                <VehicleHero vehicle={vehicles[0]} />
            </Link>
        </section>
    );
}

async function VehicleNumber() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    let count = 0;

    if (user) {
        const { count: vehicleCount } = await supabase
            .from("vehicles")
            .select("*", { count: "exact", head: true })
            .eq("owner_id", user.id);

        count = vehicleCount || 0;
    }

    if (count === 0) return null;

    return (
        <p className="text-muted-foreground text-[0.8rem] tracking-wide font-light">
            {count} Véhicule{count > 1 ? "s" : ""}
        </p>
    );
}
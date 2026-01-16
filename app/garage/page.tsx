import VehicleCard from "@/components/VehicleCard";
import VehicleHero from "@/components/VehicleHero";
import VehicleHeroSkeleton from "@/components/skeletons/VehicleHeroSkeleton";
import VehicleCardSkeleton from "@/components/skeletons/VehicleCardSkeleton";
import Link from "next/link";
import type { Vehicle } from "@/types";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
    title: "Mon Garage | VinTrace",
};

export const dynamic = 'force-dynamic';


export default async function GaragePage() {
    const supabase = await createClient();

    const { count } = await supabase
        .from("vehicles")
        .select("*", { count: "exact", head: true });

    return (
        <div className="mt-24 mx-auto w-[90%] sm:w-[80%] lg:w-[75%]">
            <header className="flex items-center justify-between mb-16 border-b border-foreground/10 pb-8">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-light tracking-tight text-stone-50 mb-2">
                        Garage
                    </h1>
                    <Suspense
                        fallback={
                            <Skeleton className="text-stone-400/0 text-[0.8rem] tracking-wide font-light w-fit">
                                {count === 1 ? "X Véhicule" : "X Véhicules"}
                            </Skeleton>
                        }
                    >
                        <VehicleNumber />
                    </Suspense>
                </div>
                <Button variant="outline">Ajouter un Véhicule</Button>
            </header>
            <Suspense
                fallback={
                    !!count &&
                    (count === 1 ? (
                        <section className="flex justify-center">
                            <VehicleHeroSkeleton />
                        </section>
                    ) : (
                        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr mb-20">
                            {new Array(count).fill(null).map((_, i) => (
                                <VehicleCardSkeleton key={i} />
                            ))}
                        </section>
                    ))
                }
            >
                <VehicleContent />
            </Suspense>
        </div>
    );
}

async function VehicleContent() {
    const supabase = await createClient();
    
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
        .from("vehicles")
        .select(
            `
            id,
            brand,
            model,
            year,
            vin,
            mileage,
            cover_image_url,
            slug
            `
        )
        .eq("owner_id", user?.id)
        .order("created_at", {
            ascending: false,
        });

    const vehicles: Vehicle[] =
        data?.map((vehicle) => ({
            year: vehicle.year,
            make: vehicle.brand,
            model: vehicle.model,
            trim: vehicle.vin,
            image: vehicle.cover_image_url,
            kileage: vehicle.mileage,
            slug: vehicle.slug,
        })) || [];

    let vehicleEls;

    if (vehicles.length > 1) {
        vehicleEls = vehicles.map((vehicle) => (
            <Link
                key={vehicle.slug}
                href={`/garage/${vehicle.slug}`}
                className="hover:-translate-y-1 transition-all ease-out duration-300"
            >
                <VehicleCard vehicle={vehicle} />
            </Link>
        ));
    }

    return (
        <section
            className={
                vehicles.length > 1
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr mb-20"
                    : "flex justify-center"
            }
        >
            {vehicles.length > 1 ? (
                vehicleEls
            ) : vehicles.length === 1 ? (
                <Link href={`/garage/${vehicles[0].slug}`} className="">
                    <VehicleHero vehicle={vehicles[0]} />
                </Link>
            ) : (
                <p className="text-stone-400">
                    Aucun véhicule trouvé. Ajoutez-en un pour commencer à suivre
                    son historique.
                </p>
            )}
        </section>
    );
}

async function VehicleNumber() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
        .from("vehicles")
        .select(
            `
            id
            `
        )
        .eq("owner_id", user?.id);

    return (
        <>
            {data && !error
                ? data?.length > 0 && (
                      <p className="text-stone-400 text-[0.8rem] tracking-wide font-light">
                          {data?.length} Véhicule
                          {data?.length !== 1 ? "s" : ""}
                      </p>
                  )
                : null}
        </>
    );
}

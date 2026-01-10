import VehicleCard from "@/components/VehicleCard";
import VehicleHero from "@/components/VehicleHero";
import Link from "next/link";
import type { Vehicle } from "@/types";
import { createClient } from '@/lib/supabase/server';

export default async function DashboardPage() {

    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase
        .from('vehicles')
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
            `,
        )
        .eq('owner_id', user?.id)
        .order('created_at', {
            ascending: false,
        })

        console.log(data, error);

    const vehicles: Vehicle[] = data?.map((vehicle) => ({
        year: vehicle.year,
        make: vehicle.brand,
        model: vehicle.model,
        trim: vehicle.vin,
        image: vehicle.cover_image_url,
        kileage: vehicle.mileage,
        slug: vehicle.slug
    })) || [];

    let vehicleEls;

    if (vehicles.length > 1) {
        vehicleEls = vehicles.map((vehicle) => (
            <Link
                key={vehicle.slug}
                href={`/dashboard/${vehicle.slug}`}
                className="hover:-translate-y-1 transition-all ease-out duration-300">
                
                <VehicleCard vehicle={vehicle} />
            </Link>
        ));
    }  

    return (
        <main className="mt-8 mx-auto w-[90%] sm:w-[80%] lg:w-[75%]">
            <header className="flex items-center justify-between mb-16 border-b border-foreground/10 pb-8">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-light tracking-tight text-stone-50 mb-2">Garage</h1>
                    <p className="text-stone-500 text-[0.8rem] tracking-wide font-light">2 Véhicles</p>
                </div>
                <button className="bg-stone-50 hover:bg-stone-300 transition-all text-black px-5 py-2 text-sm">Ajouter un Véhicule</button>
            </header>
            <section className={vehicles.length > 1 ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr mb-20" : "flex justify-center"}>
                {vehicles.length > 1 ?
                    vehicleEls :
                    vehicles.length === 1 ?
                    <Link
                        href={`/dashboard/${vehicles[0].slug}`}
                        className="">
                            
                        <VehicleHero vehicle={vehicles[0]} />
                    </Link>
                    :

                    <p className="text-stone-500">Aucun véhicule trouvé. Ajoutez-en un pour commencer à suivre son historique.</p>
                }
            </section>
        </main>
    );
}
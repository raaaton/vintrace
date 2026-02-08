import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function VehiclePage({
    params,
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
            <div className="relative w-full h-[25vh] md:h-[60vh] lg:h-[65vh] min-h-[400px] md:min-h-[500px] group overflow-hidden -z-10">
                <Image
                    className="w-full h-full object-cover"
                    src={data.cover_image_url}
                    alt={`${data.make} ${data.model}`}
                    width={1600}
                    height={1000}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-6 lg:p-12 flex flex-row items-stretch justify-between gap-6 md:gap-8 text-foreground z-10">
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
                            <span className="md:hidden">
                                Kilométrage
                            </span>
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
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-0"></div>
            </div>
        </>
    );
}

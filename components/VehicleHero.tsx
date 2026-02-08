import Image from "next/image";
import type { Vehicle } from "@/lib/types";
import { ArrowUpRight } from "lucide-react";

type VehicleHeroProps = {
    vehicle: Vehicle;
};

export default function VehicleHero({ vehicle }: VehicleHeroProps) {
    return (
        <div className="bg-stone-900/25 relative p-0 border border-stone-700/75 hover:border-stone-500/75 transition-colors ease-out group flex flex-col md:flex-row items-stretch max-w-6xl mx-auto overflow-hidden w-fit select-none">
            {/* Year badge */}
            <span className="text-stone-200 font-light text-[12px] bg-stone-900/90 absolute top-6 left-6 px-3 py-1 border border-stone-700 z-50">
                {vehicle.year}
            </span>

            {/* Image */}
            <div className="md:w-[60%] aspect-[16/10] overflow-hidden flex justify-center items-center border-b md:border-b-0 md:border-r border-stone-700/75 w-fit">
                <div className="w-full h-full relative">
                    {/* SVG placeholder to force the 16:10 ratio */}
                    <Image
                        className="w-full h-full object-cover opacity-0"
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3C/svg%3E"
                        alt=""
                        width={1920}
                        height={1080}
                    />
                    {/* Real image positioned on top */}
                    <Image
                        className="absolute inset-0 w-full h-full object-cover hover:scale-[1.02] transition-all duration-1000 ease-out filter saturate-[0.85] group-hover:saturate-100"
                        src={vehicle.cover_image_url ? vehicle.cover_image_url : "/images/vehicle-placeholder.webp"}
                        alt={`${vehicle.make} ${vehicle.model}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 60vw"
                        priority
                    />
                </div>
            </div>
            {/* Content */}
            <div className="p-8 md:p-12 md:w-[40%] flex flex-col justify-center">
                <div className="flex justify-between items-start mb-2">
                    {/* Make & Model */}
                    <h2 className="text-2xl md:text-3xl text-foreground font-medium">
                        {vehicle.make}
                        <br />
                        <span className="font-light text-muted-foreground">
                            {vehicle.model}
                        </span>
                    </h2>
                    <ArrowUpRight className="text-muted-foreground group-hover:text-foreground transition-colors duration-250 w-6 h-6" />
                </div>

                {/* License Plate */}
                <p className="text-sm font-light font-mono tracking-widest uppercase text-muted-foreground mb-8">
                    {vehicle.license_plate}
                </p>

                {/* Kileage */}
                <div className="mt-auto pt-8 border-t border-stone-700/75">
                    <p className="text-xs font-light tracking-wider uppercase text-muted-foreground mb-1">
                        Kilométrage
                    </p>
                    <p className="text-2xl font-light text-foreground font-mono">
                        {vehicle.kileage.toLocaleString("en-US")}
                        <span className="text-sm ml-2 text-muted-foreground">km</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

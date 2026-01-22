import Image from "next/image";
import type { Vehicle } from "@/types";
import { ArrowUpRight } from "lucide-react";
import { maskVIN } from "@/lib/utils";

type VehicleCardProps = {
    vehicle: Vehicle;
};

export default function VehicleCard({ vehicle }: VehicleCardProps) {
    return (
        <div className="bg-stone-900/25 relative p-0 border border-stone-700/75 hover:border-stone-500/75 transition-colors ease-out group">
            {/* Year Badge */}
            <span className="text-stone-200 font-light text-[12px] bg-stone-900/90 absolute top-4 right-4 px-3 py-1 border border-stone-700 z-40">
                {vehicle.year}
            </span>
            {/* Image */}
            <div className="aspect-[16/10] overflow-hidden flex justify-center items-center">
                <Image
                    className="aspect-[16/10] object-cover hover:scale-[1.05] transition-all duration-1500 ease-out filter saturate-[0.85] group-hover:saturate-100"
                    src={vehicle.image ? vehicle.image : "/images/vehicle-placeholder.webp"}
                    alt={vehicle.make + " " + vehicle.model}
                    width={1920}
                    height={1080}
                />
            </div>
            {/* Content */}
            <div className="p-6">
                {/* Make and Model */}
                <h2 className="text-lg text-stone-50 mb-2 flex items-center gap-2">
                    {vehicle.make}
                    <span className="font-light text-stone-400 text-[1rem]">
                        {vehicle.model}
                    </span>
                    <ArrowUpRight className="ml-auto text-stone-400 group-hover:text-stone-50 transition-colors duration-250" />
                </h2>

                {/* VIN */}
                <p className="text-xs font-light font-mono tracking-wider uppercase text-stone-400 mb-4 pb-8 border-b border-b-stone-700/75">
                    {maskVIN(vehicle.vin)}
                </p>

                {/* Kileage */}
                <span className="text-xs font-light tracking-wider uppercase text-stone-400">
                    Kilométrage
                </span>
                <div className="flex items-end mt-1 text-xs/2">
                    <span className="text-sm font-light tracking-wider uppercase text-stone-50 font-mono mr-1">
                        {vehicle.kileage.toLocaleString("en-US")}
                    </span>
                    <span className="text-sm text-stone-400">km</span>
                </div>
            </div>
        </div>
    );
}

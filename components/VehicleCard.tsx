import Image from "next/image";
import type { Vehicle } from "@/types";
import { ArrowUpRight } from 'lucide-react';
import { maskVIN } from "@/lib/utils";

type VehicleCardProps = {
    vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
    return (
        <div className="bg-stone-900/25 relative p-0 border border-stone-700/75 hover:border-stone-500/75 transition-colors ease-out group">
            <span className="text-stone-200 font-light text-[12px] bg-stone-900/95 absolute top-4 right-4 px-3 py-1 border border-stone-700 z-50">{vehicle.year}</span>
            <div className="aspect-[16/10] overflow-hidden flex justify-center items-center">
                <Image
                    className="aspect-[16/10] object-cover hover:scale-[1.05] transition-all duration-1500 ease-out filter saturate-[0.85] group-hover:saturate-100"
                    src={vehicle.image}
                    alt={vehicle.make    + " " + vehicle.model}
                    width={1920}
                    height={1080}
                />
            </div>
            <div className="p-6">
                <h2 className="text-lg text-stone-50 mb-2 flex items-center gap-2">
                    {vehicle.make} 
                    <span className="font-light text-stone-500 text-[1rem]">
                        {vehicle.model}
                    </span>
                    <ArrowUpRight className="ml-auto text-stone-500 group-hover:text-stone-50 transition-colors duration-250" />
                </h2>

                <p className="text-xs font-light font-mono tracking-wider uppercase text-stone-500 mb-4 pb-8 border-b border-b-stone-700/75">{maskVIN(vehicle.trim)}</p>

                <p className="text-stone-500 text-xs/2">
                    <span className="text-xs font-light tracking-wider uppercase text-stone-500 lh-1">Kilométrage</span>
                    <br />
                    <span className="text-sm font-light tracking-wider uppercase text-stone-50 font-mono mr-1">
                        {vehicle.kileage.toLocaleString('en-US')}
                    </span>
                    km
                </p>
            </div>
        </div>
    )
}
import Image from "next/image";
import type { Vehicle } from "@/types";
import { ArrowUpRight } from 'lucide-react';

type VehicleHeroProps = {
    vehicle: Vehicle;
}

export default function VehicleHero({ vehicle }: VehicleHeroProps) {
    return (
        <div className="bg-stone-900/25 relative p-0 border border-stone-700/75 hover:border-stone-500/75 transition-colors ease-out group flex flex-col md:flex-row items-stretch max-w-6xl mx-auto overflow-hidden">
            
            {/* Badge année repositionné pour le format Hero */}
            <span className="text-stone-200 font-light text-[12px] bg-stone-800/90 absolute top-6 left-6 px-3 py-1 border border-stone-700 z-50">
                {vehicle.year}
            </span>

            {/* Section Image : prend 60% de la largeur sur desktop */}
            <div className="md:w-[60%] aspect-[16/10] md:aspect-auto overflow-hidden flex justify-center items-center border-b md:border-b-0 md:border-r border-stone-700/75">
                <Image
                    className="w-full h-full object-cover hover:scale-[1.02] transition-all duration-1000 ease-out filter saturate-[0.85] group-hover:saturate-100"
                    src={vehicle.image}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    width={1600}
                    height={1000}
                    priority
                />
            </div>
            <div className="p-8 md:p-12 md:w-[40%] flex flex-col justify-center">
                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-2xl md:text-3xl text-stone-50 font-medium">
                        {vehicle.make} 
                        <br />
                        <span className="font-light text-stone-400">
                            {vehicle.model}
                        </span>
                    </h2>
                    <ArrowUpRight className="text-stone-400 group-hover:text-stone-50 transition-colors duration-250 w-6 h-6" />
                </div>

                <p className="text-sm font-light tracking-widest uppercase text-stone-400 mb-8">
                    {vehicle.trim}
                </p>

                <div className="mt-auto pt-8 border-t border-stone-700/75">
                    <p className="text-xs font-light tracking-wider uppercase text-stone-400 mb-1">
                        Kilométrage
                    </p>
                    <p className="text-2xl font-light text-stone-50 font-mono">
                        {vehicle.kileage.toLocaleString('en-US')} 
                        <span className="text-sm ml-2 text-stone-400">km</span>
                    </p>
                </div>
            </div>
        </div>
    )
}
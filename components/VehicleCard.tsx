"use client";

import Image from "next/image";
import type { Vehicle } from "@/types";
import { ArrowUpRight, Trash2 } from "lucide-react";
import { deleteVehicle } from "@/app/actions/vehicle-actions";

type VehicleCardProps = {
    vehicle: Vehicle;
};

export default function VehicleCard({ vehicle }: VehicleCardProps) {
    const handleDelete = (e: React.MouseEvent, vehicleId: string) => {
        e.preventDefault();
        e.stopPropagation();

        deleteVehicle(vehicleId);
    };
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
                    src={
                        vehicle.image
                            ? vehicle.image
                            : "/images/vehicle-placeholder.webp"
                    }
                    alt={vehicle.make + " " + vehicle.model}
                    width={1920}
                    height={1080}
                />
            </div>
            {/* Content */}
            <div className="p-6">
                {/* Make and Model */}
                <h2 className="text-lg text-foreground mb-2 flex items-center gap-2">
                    {vehicle.make}
                    <span className="font-light text-muted-foreground text-[1rem]">
                        {vehicle.model}
                    </span>
                    <ArrowUpRight className="ml-auto text-muted-foreground group-hover:text-foreground transition-colors duration-250" />
                </h2>

                {/* License Plate */}
                <p className="text-xs font-light font-mono tracking-wider uppercase text-muted-foreground mb-4 pb-8 border-b border-b-stone-700/75">
                    {vehicle.license_plate}
                </p>

                {/* Kileage */}
                <span className="text-xs font-light tracking-wider uppercase text-muted-foreground">
                    Kilométrage
                </span>
                <div className="flex justify-between items-center">
                    <div className="flex items-end mt-1 text-xs/2">
                        <span className="text-sm font-light tracking-wider uppercase text-foreground font-mono mr-1">
                            {vehicle.kileage.toLocaleString("en-US")}
                        </span>
                        <span className="text-sm text-muted-foreground">km</span>
                    </div>

                    {/* Temporary Delete Button */}
                    <button
                        className="hover:text-primary transition-all duration-300"
                        onClick={(e) => handleDelete(e, vehicle.id)}
                    >
                        <Trash2
                            strokeWidth={1.25}
                            size={20}
                            color="currentColor"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}

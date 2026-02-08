"use client";

import { deleteVehicle } from "@/app/actions/vehicle-actions";
import { Trash2 } from "lucide-react";

export default function DeleteVehicleButton({
    vehicleId,
}: {
    vehicleId: string;
}) {
    const handleDelete = (e: React.MouseEvent, vehicleId: string) => {
        e.preventDefault();
        e.stopPropagation();

        deleteVehicle(vehicleId);
    };

    return (
        <button
            className="hover:text-primary transition-all duration-300"
            onClick={(e) => handleDelete(e, vehicleId)}
        >
            <Trash2 strokeWidth={1.25} size={20} color="currentColor" />
        </button>
    );
}

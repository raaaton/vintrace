import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteVehicle(vehicleId: string) {
    const supabase = await createClient();

    const { data: vehicle, error: fetchError } = await supabase
        .from("vehicles")
        .select("owner_id")
        .eq("id", vehicleId)
        .single();

    if (fetchError || !vehicle) {
        return { error: "Vehicle not found." };
    }

    const filePath = `${vehicle.owner_id}/cover-image/${vehicleId}.webp`;

    const { error: storageError } = await supabase.storage
        .from("vehicle-media")
        .remove([filePath]);

    if (storageError) {
        console.error("Storage Error:", storageError);
    }

    const { error: dbError } = await supabase
        .from("vehicles")
        .delete()
        .eq("id", vehicleId);

    if (dbError) {
        return { error: "Error deleting vehicle from database." };
    }

    revalidatePath("/");
    return { success: true };
}

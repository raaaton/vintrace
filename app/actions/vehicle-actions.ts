"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { SupabaseClient } from "@supabase/supabase-js";

async function listAllFiles(
    supabase: SupabaseClient,
    bucket: string,
    prefix: string,
): Promise<string[]> {
    const { data, error } = await supabase.storage.from(bucket).list(prefix);

    if (error || !data) return [];

    const paths: string[] = [];

    for (const item of data) {
        const itemPath = `${prefix}/${item.name}`;

        if (item.id === null) {
            const subPaths = await listAllFiles(supabase, bucket, itemPath);
            paths.push(...subPaths);
        } else {
            paths.push(itemPath);
        }
    }

    return paths;
}

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

    const folderPath = `${vehicle.owner_id}/${vehicleId}`;

    const filesToDelete = await listAllFiles(
        supabase,
        "vehicle-media",
        folderPath,
    );

    if (filesToDelete.length > 0) {
        const { error: storageError } = await supabase.storage
            .from("vehicle-media")
            .remove(filesToDelete);

        if (storageError) {
            console.error("Storage Error:", storageError);
        }
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
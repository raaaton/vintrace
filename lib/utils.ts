import { clsx, type ClassValue } from "clsx";
import { notFound } from "next/dist/client/components/navigation";
import { twMerge } from "tailwind-merge";
import { createClient } from "./supabase/client";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// This check can be removed, it is just for tutorial purposes
export const hasEnvVars =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const maskVIN = (vin: string): string => {
    if (!vin || vin.length < 11) return vin;

    const visibleCount = 11;
    const visibleSection = vin.slice(0, visibleCount);
    const maskedSection = "*".repeat(vin.length - visibleCount);

    return visibleSection + maskedSection;
};

export const filterToLabel: (filter: string) => string = (filter) => {
    switch (filter) {
        case "maintenance":
            return "entretien";
        case "event":
            return "événements";
        case "modification":
            return "modifications";
        case "admin":
            return "administratif";
        default:
            return filter;
    }
};

export const getEntriesNumber = async (vehicleId: string): Promise<string> => {
    console.log("Fetching entries count for vehicle ID:", vehicleId);
    
    const supabase = await createClient();

        const { count, error } = await supabase
            .from("entries")
            .select("*", { count: "exact", head: true })
            .eq("vehicle_id", vehicleId);
    
        if (error) {
            console.error("Database error:", error.code, error.message, error);
            if (error.code !== "PGRST116") {
                console.error("Database error:", error);
            }
            notFound();
        }
    
    return count ? (String(count) + " Entrée" + (count > 1 ? "s" : "")) : "Aucune entrée";
};

export const getVehicleIdBySlug = async (slug: string): Promise<string> => {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("vehicles")
        .select("id")
        .eq("slug", slug)
        .single();

    if (error) {
        console.error("Database error:", error.code, error.message, error);
        notFound();
    }

    return data?.id || "";
};

export const getPreviousKileage = async (vehicleId: string): Promise<number | string> => {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("vehicles")
        .select("kileage")
        .eq("id", vehicleId)
        .order("created_at", { ascending: false })
        .maybeSingle();

    if (error) {
        console.error("Database error:", error.code, error.message, error);
        notFound();
    }

    return data?.kileage || "";
};
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

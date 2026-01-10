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
    if (!vin || vin.length < 8) return vin;
    
    const visibleCount = 6;
    const maskedSection = "*".repeat(vin.length - visibleCount);
    const visibleSection = vin.slice(-visibleCount);
    
    return maskedSection + visibleSection;
};
import { Tables } from "@/lib/supabase/database.types";

export type Vehicle = Tables<"vehicles">;
export type EntryType = "service" | "admin" | "modification" | "event";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function VehiclePage({
    params,
}: {
    params: { vehicleSlug: string };
}) {
    const supabase = await createClient();
    const { vehicleSlug } = await params;

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
        .from("vehicles")
        .select(`make, model`)
        .eq("slug", vehicleSlug)
        .single(); // Security: the user must be the owner

    if (error || !data) {
        if (error && error.code !== "PGRST116") {
            // PGRST116 is the standard error "no rows returned"
            console.error("Database error:", error);
        }
        notFound();
    }

    return (
        <>
            <h1 className="mt-8 text-2xl font-bold">Vehicle Page</h1>
            <p className="mt-4">
                Details about your {data.make} {data.model} will be displayed
                here.
            </p>
        </>
    );
}

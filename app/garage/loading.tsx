import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Loading() {
    return (
        <div className="mt-8 mx-auto w-[90%] sm:w-[80%] lg:w-[75%]">
            <header className="flex items-center justify-between mb-16 border-b border-foreground/10 pb-8">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-light tracking-tight text-foreground mb-2">
                        Garage
                    </h1>
                    <Skeleton className="h-[1.2rem] w-20" />
                </div>
                <Button variant="outline">Ajouter un Véhicule</Button>
            </header>

            <div className="flex justify-center items-center py-40">
                <Loader2
                    className="animate-spin text-muted-foreground"
                    size={32}
                    strokeWidth={1.5}
                />
            </div>
        </div>
    );
}

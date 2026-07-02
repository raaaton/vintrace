"use client";

import { cn, getPreviousKileage } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ComponentProps, useState, useEffect } from "react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { EntryType } from "@/lib/types";
import EntryTypeSelector from "./EntryTypeSelector";
import DateInput from "@/components/DateInput";

export default function AddEntryButton({ vehicleId }: { vehicleId: string }) {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery(
        "(min-width: 768px) and (min-height: 850px)",
    );

    // TODO: This button doesnt exist on mobile

    // Desktop: Dialog modal
    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <button className="hidden md:flex items-center gap-2 px-3 py-2 lg:px-4 lg:py-3 text-primary-foreground bg-primary hover:bg-primary/90 uppercase text-xs font-semibold transition-colors ease-out">
                        <Plus size={16} strokeWidth={2.5} />
                        <span className="hidden md:inline">Ajouter</span>
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Ajouter une Entrée</DialogTitle>
                    </DialogHeader>
                    <ProfileForm setOpen={setOpen} vehicleId={vehicleId} />
                </DialogContent>
            </Dialog>
        );
    }

    // Mobile: Bottom drawer
    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <button className="hidden md:flex items-center gap-2 px-3 py-2 lg:px-4 lg:py-3 text-primary-foreground bg-primary hover:bg-primary/90 uppercase text-xs font-semibold transition-colors ease-out">
                    <Plus size={16} strokeWidth={2.5} />
                    <span className="hidden md:inline">Ajouter</span>
                </button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[92vh] flex flex-col">
                <DrawerHeader className="text-left shrink-0">
                    <DrawerTitle>Ajouter une Entrée</DrawerTitle>
                </DrawerHeader>

                <div className="flex-1 overflow-y-auto px-4 py-2">
                    <ProfileForm
                        setOpen={setOpen}
                        vehicleId={vehicleId}
                        id="entries-form"
                    />
                </div>
            </DrawerContent>
        </Drawer>
    );
}

function ProfileForm({
    setOpen,
    vehicleId,
    className,
}: ComponentProps<"form"> & {
    setOpen: (open: boolean) => void;
    vehicleId: string;
}) {
    const isDesktop = useMediaQuery(
        "(min-width: 768px) and (min-height: 850px)",
    );
    const router = useRouter();

    const [isPending, setIsPending] = useState(false);

    const [initialKileage, setInitialKileage] = useState("");

    useEffect(() => {
        getPreviousKileage(vehicleId).then((val) => {
            if (val) setInitialKileage(val.toString());
        });
    }, [vehicleId]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        setIsPending(true);

        try {
            const supabase = await createClient();

            const {
                data: { user },
            } = await supabase.auth.getUser();

            const entryId = crypto.randomUUID();

            const payload = {
                id: entryId,
                vehicle_id: vehicleId,
                owner_id: user?.id,
                title: formData.get("title"),
                kileage: Number(formData.get("kileage")),
                event_date: formData.get("event_date"),
            };
            console.log("Payload envoyé à Supabase :", payload);

            const { error } = await supabase.from("entries").insert({
                id: entryId,
                vehicle_id: vehicleId,
                owner_id: user?.id,
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                kileage: Number(formData.get("kileage")),
                cost: Number(formData.get("cost")),
                event_date: formData.get("event_date") as string,
                detailer: formData.get("detailer") as string,
                type: formData.get("type") as EntryType,
            });

            if (error) throw error;

            toast.success("Entrée ajoutée avec succès !");
            setOpen(false);
            router.refresh();
        } catch (error: any) {
            console.error("Détails complets de l'erreur :", error);
            if (error.message) {
                toast.error(`Erreur : ${error.message}`);
            } else {
                toast.error("Erreur inconnue, vérifie la console");
            }
        } finally {
            setIsPending(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={cn("grid items-start gap-6", className)}
        >
            {/* Entry Type */}
            <div className="flex flex-col gap-3">
                <EntryTypeSelector name="type" defaultValue="service" />
            </div>

            {/* Title */}
            <div className="flex flex-col gap-3">
                <Label htmlFor="title">Titre</Label>
                <Input
                    name="title"
                    type="text"
                    id="title"
                    defaultValue=""
                    placeholder="Contrôle technique"
                    required
                />
            </div>

            {/* Date & Kileage */}
            <div className="flex gap-3">
                <div className="flex flex-col gap-3 flex-1">
                    <Label htmlFor="date">Date</Label>
                    <DateInput />
                </div>
                <div className="flex flex-col gap-3 flex-1">
                    <Label htmlFor="kileage">Kilométrage</Label>
                    <Input
                        name="kileage"
                        type="number"
                        id="kileage"
                        defaultValue={initialKileage}
                        placeholder="1991"
                        required
                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none min-w-1"
                    />
                </div>
            </div>

            {/* Cost & Detailer */}
            <div className="flex gap-3">
                <div className="flex flex-col gap-3 flex-1">
                    <Label htmlFor="cost">Coût</Label>
                    <Input
                        name="cost"
                        type="number"
                        id="cost"
                        defaultValue=""
                        placeholder="323,50"
                        required
                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none min-w-1"
                    />
                </div>
                <div className="flex flex-col gap-3 flex-1">
                    <Label htmlFor="detailer">Prestataire</Label>
                    <Input
                        name="detailer"
                        type="text"
                        id="detailer"
                        defaultValue=""
                        placeholder="Porsche Center Paris"
                        required
                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none min-w-1"
                    />
                </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-3">
                <Label htmlFor="description">Description / Notes</Label>
                <Textarea
                    name="description"
                    id="description"
                    defaultValue=""
                    placeholder="CT refusé pour déséquilibre freinage essieu arrière"
                    required
                    className="resize-none min-h-[75px] !bg-transparent"
                />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="mb-2" disabled={isPending}>
                {isPending ? "Création..." : "Ajouter l'entrée"}
            </Button>
        </form>
    );
}

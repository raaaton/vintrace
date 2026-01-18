"use client";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
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
import { Label } from "@/components/ui/label";
import { ComponentProps, useState } from "react";
import CoverImageUploader from "./CoverImageUploader";
import { toast } from "sonner";

export default function AddVehicleButton() {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">Ajouter un Véhicule</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Ajouter un Véhicule</DialogTitle>
                        <DialogDescription>
                            Créez le dossier numérique de votre véhicule pour
                            documenter et protéger son historique.
                        </DialogDescription>
                    </DialogHeader>
                    <ProfileForm />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline">Ajouter un Véhicule</Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[92vh] flex flex-col">
                <DrawerHeader className="text-left shrink-0">
                    <DrawerTitle>Ajouter un Véhicule</DrawerTitle>
                </DrawerHeader>

                <div className="flex-1 overflow-y-auto px-4 py-2">
                    <ProfileForm id="vehicle-form" />
                </div>
            </DrawerContent>
        </Drawer>
    );
}

function ProfileForm({ className }: ComponentProps<"form">) {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const [files, setFiles] = useState<File[]>([]);
    const [isPending, setIsPending] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        if (files.length === 0) {
            toast.error("Image obligatoire");
            return;
        }

        setIsPending(true);

        formData.append("cover_image", files[0]);

        try {
            console.log("Véhicule prêt pour la création");
            console.log(formData);
        } finally {
            setIsPending(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={cn("grid items-start gap-6", className)}
        >
            <div className="flex gap-3">
                <div className="flex flex-col gap-3 flex-1">
                    <Label htmlFor="make">Marque</Label>
                    <Input
                        name="make"
                        type="text"
                        id="make"
                        defaultValue=""
                        placeholder="Porsche"
                        required
                    />
                </div>
                <div className="flex flex-col gap-3 flex-1">
                    <Label htmlFor="year">Année</Label>
                    <Input
                        name="year"
                        type="number"
                        id="year"
                        defaultValue=""
                        placeholder="1991"
                        required
                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none min-w-1"
                    />
                </div>
            </div>
            {isDesktop ? (
                <>
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="model">Modèle</Label>
                        <Input
                            name="model"
                            type="text"
                            id="model"
                            defaultValue=""
                            placeholder="911 (964) Turbo 3.3"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="kileage">Kilométrage</Label>
                        <Input
                            name="kileage"
                            type="number"
                            id="kileage"
                            defaultValue=""
                            placeholder="8211"
                            min="0"
                            required
                            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                    </div>
                </>
            ) : (
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3 flex-1">
                        <Label htmlFor="model">Modèle</Label>
                        <Input
                            name="model"
                            type="text"
                            id="model"
                            defaultValue=""
                            placeholder="911 (964)"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-3 flex-1">
                        <Label htmlFor="kileage">Kilométrage</Label>
                        <Input
                            name="kileage"
                            type="number"
                            id="kileage"
                            defaultValue=""
                            placeholder="8211"
                            required
                            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-3">
                <Label htmlFor="vin">VIN</Label>
                <Input
                    name="vin"
                    type="text"
                    id="vin"
                    defaultValue=""
                    placeholder="AB1CD23E456789012"
                    required
                />
            </div>
            <div className="flex flex-col gap-3">
                <Label htmlFor="license_plate">Plaque d'immatriculation</Label>
                <Input
                    name="license_plate"
                    type="text"
                    id="license_plate"
                    defaultValue=""
                    placeholder="AB-123-CD"
                    required
                />
            </div>
            <div className="flex flex-col gap-3 justify-center">
                <Label>Photo principale du véhicule</Label>
                <CoverImageUploader
                    isDesktop={isDesktop}
                    files={files}
                    setFilesAction={setFiles}
                />
            </div>
            <Button type="submit" className="mb-2">
                Créer la fiche véhicule
            </Button>
        </form>
    );
}

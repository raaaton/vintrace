"use client";

import { cn } from "@/lib/utils";
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
import { Label } from "@/components/ui/label";
import { ComponentProps, useState } from "react";
import CoverImageUploader from "./CoverImageUploader";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { getCoverImageLink } from "@/lib/supabase/storage";
import { ImageCropper } from "@/components/ImageCropper";

export default function AddVehicleButton() {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    // Desktop: Dialog modal
    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">Ajouter un Véhicule</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Ajouter un Véhicule</DialogTitle>
                    </DialogHeader>
                    <ProfileForm setOpen={setOpen} />
                </DialogContent>
            </Dialog>
        );
    }

    // Mobile: Bottom drawer
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
                    <ProfileForm setOpen={setOpen} id="vehicle-form" />
                </div>
            </DrawerContent>
        </Drawer>
    );
}

function ProfileForm({ setOpen, className }: ComponentProps<"form"> & { setOpen: (open: boolean) => void }) {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const router = useRouter();

    const [files, setFiles] = useState<File[]>([]);
    const [isPending, setIsPending] = useState(false);

    const [imageToCrop, setImageToCrop] = useState<string | null>(null);

    const handleFileSelect = (newFiles: File[]) => {
        if (newFiles.length === 0) {
            setFiles([]);
            return;
        }

        const file = newFiles[0];

        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                setImageToCrop(reader.result);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleCropComplete = (blob: Blob) => {

        const croppedFile = new File([blob], "cover_cropped.webp", { 
            type: "image/webp",
            lastModified: Date.now() 
        });

        setFiles([croppedFile]);
        
        setImageToCrop(null);
    };

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
            const supabase = await createClient();

            const {
                data: { user },
            } = await supabase.auth.getUser();

            const vehicleId = crypto.randomUUID();

            const { error } = await supabase.from("vehicles").insert({
                id: vehicleId,
                owner_id: user?.id,
                make: formData.get("make") as string,
                model: formData.get("model") as string,
                year: Number(formData.get("year")),
                license_plate: formData.get("license_plate") as string,
                vin: formData.get("vin") as string,
                kileage: Number(formData.get("kileage")),
                cover_image_url: await getCoverImageLink(user!, formData.get("cover_image") as File, vehicleId as string, "cover-image"),
            });

            if (error) throw error;

            toast.success("Véhicule ajouté avec succès !");
            setOpen(false);
            router.refresh();

        } catch (error: any) {
            console.error("Error submitting form: ", error);
            toast.error(
                "Erreur lors de l'ajout du véhicule : " + error.message,
            );
        } finally {
            setIsPending(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={cn("grid items-start gap-6", className)}
        >
            {/* Make & Year */}
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

            {/* VIN */}
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
            {/* License Plate */}
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
            {/* Cover Image */}
            <div className="flex flex-col gap-3 justify-center">
                <Label>Photo principale du véhicule</Label>
                <CoverImageUploader
                    isDesktop={isDesktop}
                    files={files}
                    setFilesAction={handleFileSelect}
                />
            </div>
            <Button type="submit" className="mb-2" disabled={isPending}>
                {isPending ? "Création..." : "Créer la fiche véhicule"}
            </Button>

            {/* Image Cropper Modal */}
            {imageToCrop && (
                <ImageCropper 
                    image={imageToCrop}
                    onCropComplete={handleCropComplete}
                    onCancel={() => {
                        setImageToCrop(null);
                        setFiles([]);
                    }}
                />
            )}
        </form>
    );
}

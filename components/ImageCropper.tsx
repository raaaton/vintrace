"use client";
import React, { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";

interface ImageCropperProps {
    image: string | null;
    onCropComplete: (blob: Blob) => void;
    onCancel: () => void;
}

export function ImageCropper({
    image,
    onCropComplete,
    onCancel,
}: ImageCropperProps) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
    const [key, setKey] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (image) {
            setOpen(true);
            const timer = setTimeout(() => {
                setKey((prev) => prev + 1);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [image]);

    const onCropChange = (crop: { x: number; y: number }) => setCrop(crop);
    const onZoomChange = (zoom: number) => setZoom(zoom);

    const onCropCompleteInternal = useCallback(
        (_: any, croppedAreaPixels: any) => {
            setCroppedAreaPixels(croppedAreaPixels);
        },
        [],
    );

    const createCroppedImage = async () => {
        try {
            if (!image || !croppedAreaPixels) return;
            const img = new Image();
            img.src = image;
            await new Promise((resolve) => (img.onload = resolve));
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            canvas.width = croppedAreaPixels.width;
            canvas.height = croppedAreaPixels.height;
            ctx.drawImage(
                img,
                croppedAreaPixels.x,
                croppedAreaPixels.y,
                croppedAreaPixels.width,
                croppedAreaPixels.height,
                0,
                0,
                croppedAreaPixels.width,
                croppedAreaPixels.height,
            );
            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        setOpen(false);
                        setTimeout(() => onCropComplete(blob), 200);
                    }
                },
                "image/webp",
                0.9,
            );
        } catch (e) {
            console.error(e);
        }
    };

    const handleCancel = () => {
        setOpen(false);
        setTimeout(() => onCancel(), 200);
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                if (!isOpen) {
                    handleCancel();
                }
            }}
        >
            <DialogContent className="sm:max-w-[600px] border-border">
                <DialogHeader>
                    <DialogTitle>Ajuster la photo</DialogTitle>
                </DialogHeader>
                {/* Cropper Area */}
                <div className="relative w-full h-[400px] bg-black rounded-md overflow-hidden mt-4">
                    {image && (
                        <Cropper
                            key={key}
                            image={image}
                            crop={crop}
                            zoom={zoom}
                            zoomSpeed={0.5}
                            aspect={16 / 10}
                            onCropChange={onCropChange}
                            onCropComplete={onCropCompleteInternal}
                            onZoomChange={onZoomChange}
                            showGrid={true}
                            objectFit="contain"
                        />
                    )}
                </div>
                {/* Zoom Slider */}
                <div className="flex items-center gap-4 py-4">
                    <span className="text-sm text-muted-foreground w-12">
                        Zoom
                    </span>
                    <Slider
                        value={[zoom]}
                        min={1}
                        max={3}
                        step={0.01}
                        onValueChange={(vals) => setZoom(vals[0])}
                        className="flex-1"
                    />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={handleCancel}>
                        Annuler
                    </Button>
                    <Button onClick={createCroppedImage}>
                        Valider la photo
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

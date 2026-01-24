"use client";

import { Upload, X } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    FileUpload,
    FileUploadDropzone,
    FileUploadItem,
    FileUploadItemDelete,
    FileUploadItemMetadata,
    FileUploadItemPreview,
    FileUploadList,
    FileUploadTrigger,
} from "@/components/ui/file-upload";

export default function CoverImageUploader({
    isDesktop,
    files,
    setFilesAction,
}: {
    isDesktop: boolean;
    files: File[];
    setFilesAction: (files: File[]) => void;
}) {
    const onFileReject = React.useCallback((file: File) => {
        toast.error("Upload failed", {
            description: `"${file.name.slice(0, 20)}${file.name.length > 20 ? "..." : ""}" is invalid or too large.`,
        });
    }, []);

    // Desktop: Drag & drop zone
    if (isDesktop) {
        return (
            <FileUpload
                maxFiles={1}
                maxSize={5 * 1024 * 1024}
                accept=".jpeg, .jpg, .png, .webp"
                className="w-full"
                value={files}
                onValueChange={setFilesAction}
                onFileReject={onFileReject}
            >
                {!files.length && (
                    <FileUploadDropzone>
                        <div className="flex flex-col items-center gap-1 text-center">
                            <div className="flex items-center justify-center rounded-full border p-2.5">
                                <Upload className="size-6 text-muted-foreground" />
                            </div>
                            <p className="font-medium text-sm">
                                Glissez et déposez une image ici
                            </p>
                            <p className="text-muted-foreground text-xs">
                                Ou cliquez pour parcourir (1 image obligatoire,
                                jusqu'à 50 Mo)
                            </p>
                        </div>
                        <FileUploadTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className="mt-2 w-fit"
                            >
                                Parcourir les fichiers
                            </Button>
                        </FileUploadTrigger>
                    </FileUploadDropzone>
                )}
                <FileUploadList>
                    {files.map((file, index) => (
                        <FileUploadItem key={index} value={file}>
                            <FileUploadItemPreview />
                            <FileUploadItemMetadata />
                            <FileUploadItemDelete asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="size-7"
                                >
                                    <X />
                                </Button>
                            </FileUploadItemDelete>
                        </FileUploadItem>
                    ))}
                </FileUploadList>
            </FileUpload>
        );
    }

    // Mobile: Simple file picker button
    return (
        <FileUpload
            maxFiles={1}
            maxSize={50 * 1024 * 1024}
            accept=".jpeg, .jpg, .png, .webp"
            className="w-full"
            value={files}
            onValueChange={setFilesAction}
            onFileReject={onFileReject}
        >
            {!files.length && (
                <FileUploadTrigger asChild>
                    <Button variant="outline" className="w-full">
                        Parcourir les fichiers
                    </Button>
                </FileUploadTrigger>
            )}
            <FileUploadList>
                {files.map((file, index) => (
                    <FileUploadItem key={index} value={file}>
                        <FileUploadItemPreview />
                        <FileUploadItemMetadata />
                        <FileUploadItemDelete asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="size-7"
                            >
                                <X />
                            </Button>
                        </FileUploadItemDelete>
                    </FileUploadItem>
                ))}
            </FileUploadList>
        </FileUpload>
    );
}

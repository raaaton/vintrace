"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FileWarning, Loader2 } from "lucide-react";
import type { PDFDocumentProxy } from "pdfjs-dist";

export default function DocumentThumbnail({
    src,
    alt,
}: {
    src: string;
    alt: string;
}) {
    const isPdf = src.split("?")[0].toLowerCase().endsWith(".pdf");
    const [thumbnail, setThumbnail] = useState<string | null>(null);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        if (!isPdf) return;

        let cancelled = false;

        (async () => {
            try {
                const pdfjsLib = await import("pdfjs-dist");
                pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
                    "pdfjs-dist/build/pdf.worker.min.mjs",
                    import.meta.url,
                ).toString();

                const pdf: PDFDocumentProxy = await pdfjsLib.getDocument({
                    url: src,
                }).promise;
                const page = await pdf.getPage(1);
                const viewport = page.getViewport({ scale: 2 });

                const canvas = document.createElement("canvas");
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                const context = canvas.getContext("2d");
                if (!context) throw new Error("Canvas context unavailable");

                await page.render({ canvas, canvasContext: context, viewport })
                    .promise;

                if (!cancelled) setThumbnail(canvas.toDataURL("image/png"));
            } catch (err) {
                console.error("PDF thumbnail generation failed:", err);
                if (!cancelled) setFailed(true);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [src, isPdf]);

    if (!isPdf) {
        return (
            <Image
                src={src}
                alt={alt}
                fill
                sizes="120px"
                className="object-cover group-hover:scale-105 group-hover:opacity-50 transition-all duration-300 ease-in-out"
            />
        );
    }

    if (failed) {
        return (
            <div className="absolute inset-0 flex items-center justify-center bg-white/5">
                <FileWarning className="size-6 text-muted-foreground/60" />
            </div>
        );
    }

    if (!thumbnail) {
        return (
            <div className="absolute inset-0 bg-white/5 animate-pulse">
                <Loader2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
        );
    }

    return (
        <img
            src={thumbnail}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 group-hover:opacity-50 transition-all duration-300 ease-in-out"
        />
    );
}

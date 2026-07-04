"use client";

import {
    useEffect,
    useRef,
    useState,
    type MouseEvent as ReactMouseEvent,
    type SyntheticEvent,
} from "react";
import Image from "next/image";
import { FileWarning, Maximize2 } from "lucide-react";
import { loadPdfjs } from "@/lib/pdfjs-loader";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const thumbnailCache = new Map<string, string>();
const TARGET_WIDTH = 240;
const MIN_SCALE = 1;
const ZOOM_STEP = 1.2;

export default function DocumentThumbnail({
    src,
    alt,
}: {
    src: string;
    alt: string;
}) {
    const isPdf = src.split("?")[0].toLowerCase().endsWith(".pdf");
    const [thumbnail, setThumbnail] = useState<string | null>(
        thumbnailCache.get(src) ?? null,
    );
    const [failed, setFailed] = useState(false);
    const [open, setOpen] = useState(false);
    const pdfRatioRef = useRef<number | null>(null);

    // --- Zoom & pan (images uniquement) ---
    const [transform, setTransform] = useState({ scale: 1, x: 0, y: 0 });
    const [maxScale, setMaxScale] = useState(4);
    const [isDragging, setIsDragging] = useState(false);
    const viewportRef = useRef<HTMLDivElement>(null);
    const dragStartRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

    useEffect(() => {
        if (!isPdf || thumbnail) return;
        let cancelled = false;

        (async () => {
            try {
                const pdfjsLib = await loadPdfjs();
                const pdf = await pdfjsLib.getDocument({ url: src }).promise;
                const page = await pdf.getPage(1);
                const unscaledViewport = page.getViewport({ scale: 1 });
                pdfRatioRef.current =
                    unscaledViewport.width / unscaledViewport.height;

                const renderScale = TARGET_WIDTH / unscaledViewport.width;
                const viewport = page.getViewport({ scale: renderScale });

                const canvas = document.createElement("canvas");
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                const context = canvas.getContext("2d");
                if (!context) throw new Error("Canvas context unavailable");

                await page.render({ canvas, canvasContext: context, viewport })
                    .promise;

                const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
                thumbnailCache.set(src, dataUrl);
                if (!cancelled) setThumbnail(dataUrl);
            } catch (err) {
                console.error("PDF thumbnail generation failed:", err);
                if (!cancelled) setFailed(true);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [src, isPdf, thumbnail]);

    // Zoom molette centré sur le curseur — attaché seulement quand la preview image est ouverte
    // (viewportRef.current est null au mount, donc "open" doit être dans les deps pour réattacher au bon moment)
    useEffect(() => {
        const el = viewportRef.current;
        if (!el || isPdf || !open) return;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            const rect = el.getBoundingClientRect();
            const cursorX = e.clientX - rect.left;
            const cursorY = e.clientY - rect.top;

            setTransform((prev) => {
                const factor = e.deltaY < 0 ? ZOOM_STEP : 1 / ZOOM_STEP;
                const newScale = Math.min(
                    Math.max(prev.scale * factor, MIN_SCALE),
                    maxScale,
                );
                if (newScale === MIN_SCALE)
                    return { scale: MIN_SCALE, x: 0, y: 0 };

                // Le point sous le curseur doit rester fixe pendant le zoom
                const contentX = (cursorX - prev.x) / prev.scale;
                const contentY = (cursorY - prev.y) / prev.scale;

                return {
                    scale: newScale,
                    x: cursorX - contentX * newScale,
                    y: cursorY - contentY * newScale,
                };
            });
        };

        el.addEventListener("wheel", handleWheel, { passive: false });
        return () => el.removeEventListener("wheel", handleWheel);
    }, [isPdf, open, maxScale]);

    // Drag pour se déplacer dans l'image zoomée
    useEffect(() => {
        if (!isDragging) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { x, y, tx, ty } = dragStartRef.current;
            setTransform((prev) => ({
                ...prev,
                x: tx + (e.clientX - x),
                y: ty + (e.clientY - y),
            }));
        };
        const stopDragging = () => setIsDragging(false);

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", stopDragging);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", stopDragging);
        };
    }, [isDragging]);

    const resetZoom = () => setTransform({ scale: 1, x: 0, y: 0 });

    const handleOpen = () => {
        resetZoom();
        setOpen(true);
    };

    const handleImgLoad = (e: SyntheticEvent<HTMLImageElement>) => {
        const img = e.currentTarget;
        if (img.naturalWidth && img.clientWidth) {
            // Cap le zoom à la résolution native (pas de zoom au-delà du pixel réel)
            setMaxScale(Math.max(2, img.naturalWidth / img.clientWidth));
        }
    };

    const handleMouseDown = (e: ReactMouseEvent) => {
        if (transform.scale <= MIN_SCALE) return;
        setIsDragging(true);
        dragStartRef.current = {
            x: e.clientX,
            y: e.clientY,
            tx: transform.x,
            ty: transform.y,
        };
    };

    const ratio = pdfRatioRef.current;

    return (
        <>
            <div
                onClick={handleOpen}
                className="mt-4 flex-shrink-0 w-[120px] h-[160px] relative overflow-hidden rounded-md border border-white/10 group hover:border-foreground transition-all duration-300 ease-in-out cursor-pointer"
            >
                <Maximize2 className="text-foreground z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />

                {isPdf ? (
                    failed ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/5">
                            <FileWarning className="size-6 text-muted-foreground/60" />
                        </div>
                    ) : !thumbnail ? (
                        <div className="absolute inset-0 bg-white/5 animate-pulse" />
                    ) : (
                        <img
                            src={thumbnail}
                            alt={alt}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 group-hover:opacity-25 transition-all duration-300 ease-in-out"
                        />
                    )
                ) : (
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        sizes="120px"
                        className="object-cover group-hover:scale-105 group-hover:opacity-50 transition-all duration-300 ease-in-out"
                    />
                )}
            </div>

            <Dialog
                open={open}
                onOpenChange={(next) => {
                    setOpen(next);
                    if (!next) resetZoom();
                }}
            >
                <DialogContent
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    style={{
                        maxWidth: "none",
                        maxHeight: "none",
                        ...(isPdf
                            ? ratio
                                ? {
                                      aspectRatio: `${ratio.toFixed(4)}`,
                                      width: `min(92vw, calc(88vh * ${ratio.toFixed(4)}))`,
                                  }
                                : { width: "70vw", height: "80vh" } // fallback rare : ratio pas encore connu
                            : {}),
                    }}
                    className={`p-2 bg-black/95 border-white/10 flex items-center justify-center ${
                        isPdf ? "" : "w-fit h-fit"
                    }`}
                >
                    <DialogTitle className="sr-only">{alt}</DialogTitle>

                    {isPdf ? (
                        <iframe
                            src={src}
                            title={alt}
                            className="w-full h-full rounded-md"
                        />
                    ) : (
                        <div
                            ref={viewportRef}
                            onMouseDown={handleMouseDown}
                            onDoubleClick={resetZoom}
                            className="overflow-hidden w-fit h-fit"
                        >
                            <img
                                src={src}
                                alt={alt}
                                draggable={false}
                                onLoad={handleImgLoad}
                                className="block max-w-[92vw] max-h-[88vh] w-auto h-auto select-none"
                                style={{
                                    transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
                                    transformOrigin: "0 0",
                                    cursor:
                                        transform.scale > MIN_SCALE
                                            ? isDragging
                                                ? "grabbing"
                                                : "grab"
                                            : "zoom-in",
                                }}
                            />
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}

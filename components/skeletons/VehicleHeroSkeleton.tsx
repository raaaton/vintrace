import { ArrowUpRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function VehicleHeroSkeleton() {
    return (
        <div className="bg-stone-900/25 relative p-0 border border-stone-700/75 hover:border-stone-500/75 transition-colors ease-out group flex flex-col md:flex-row items-stretch max-w-6xl mx-auto overflow-hidden w-fit select-none">
            {/* Year Badge */}
            <Skeleton className="text-stone-200/0 font-light text-[12px] bg-stone-800/90 absolute top-6 left-6 px-3 py-1 border border-stone-700 z-50 w-fit">
                ####
            </Skeleton>

            {/* Fake Image */}
            <div className="md:w-[60%] aspect-[16/10] overflow-hidden flex justify-center items-center border-b md:border-b-0 md:border-r border-stone-700/75 w-fit">
                <div className="w-full h-full object-cover hover:scale-[1.02] transition-all duration-1000 ease-out filter saturate-[0.85] group-hover:saturate-100 bg-accent animate-pulse rounded-md">
                    <Image
                        className="w-full h-full object-cover opacity-0"
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3C/svg%3E"
                        alt="Loading..."
                        width={1920}
                        height={1080}
                    />
                </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 md:w-[40%] flex flex-col justify-center">
                <div className="flex justify-between items-start mb-2">
                    <div className="text-2xl md:text-3xl text-stone-50/0 font-medium">
                        {/* Make */}
                        <Skeleton className="w-fit">##########</Skeleton>
                        {/* Model */}
                        <Skeleton className="mt-2 font-light w-fit">
                            ############
                        </Skeleton>
                    </div>
                    <ArrowUpRight className="text-stone-400 group-hover:text-stone-50 transition-colors duration-250 w-6 h-6" />
                </div>

                {/* VIN */}
                <Skeleton className="text-sm font-light font-mono tracking-widest uppercase text-stone-400/0 mb-8 w-fit">
                    ############
                </Skeleton>

                {/* Kileage */}
                <div className="mt-auto pt-8 border-t border-stone-700/75">
                    <p className="text-xs font-light tracking-wider uppercase text-stone-400 mb-1">
                        Kilométrage
                    </p>
                    <div className="text-2xl font-light flex items-end">
                        <Skeleton className="text-stone-50/0 font-mono w-fit">######</Skeleton>
                        <span className="text-sm ml-2 text-stone-400">km</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

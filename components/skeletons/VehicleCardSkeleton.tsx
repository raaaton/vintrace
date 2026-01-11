import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function VehicleCardSkeleton() {
    return (
        <div className="bg-stone-900/25 relative p-0 border border-stone-700/75 hover:border-stone-500/75 transition-colors ease-out group select-none">
            {/* Year Badge */}
            <Skeleton className="text-stone-200/0 font-light text-[12px] bg-stone-800/90 absolute top-4 right-4 px-3 py-1 border border-stone-700 z-50 w-fit">
                ####
            </Skeleton>

            {/* Fake Image */}
            <div className="aspect-[16/10] overflow-hidden flex justify-center items-center relative">
                <Image
                    className="aspect-[16/10] object-cover opacity-0"
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3C/svg%3E"
                    alt="Loading..."
                    width={1920}
                    height={1080}
                    priority
                />
                <Skeleton className="absolute inset-0 rounded-none" />
            </div>

            {/* Content */}
            <div className="p-6">
                <h2 className="text-lg text-stone-50/0 mb-2 flex items-center gap-2">
                    {/* Make */}
                    <Skeleton className="p-0 w-fit">#######</Skeleton>
                    {/* Model */}
                    <Skeleton className="p-0 font-light text-stone-400/0 w-fit">
                        #########
                    </Skeleton>
                    <ArrowUpRight className="ml-auto text-stone-400 group-hover:text-stone-50 transition-colors duration-250" />
                </h2>

                {/* VIN */}
                <div className="mb-4 pb-8 border-b border-b-stone-700/75">
                    <Skeleton className="text-xs font-light font-mono tracking-wider uppercase text-stone-400/0 w-fit">
                        ############
                    </Skeleton>
                </div>

                {/* Kileage */}
                <div className="text-xs/2">
                    <span className="text-xs font-light tracking-wider uppercase text-stone-400 lh-1">
                        Kilométrage
                    </span>
                    <br />
                    <div className="flex items-end mt-1 text-xs/2">
                        <Skeleton className="text-sm font-light tracking-wider uppercase text-stone-50/0 font-mono w-fit">
                            ######
                        </Skeleton>
                        <span className="text-sm ml-1 text-stone-400">km</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

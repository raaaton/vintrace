"use client";

import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export default function DateInput() {
    const [date, setDate] = useState<Date | undefined>(new Date());

    const supabaseFormattedDate = date ? format(date, "yyyy-MM-dd") : "";

    return (
        <div className="flex flex-col gap-3">
            <input
                type="hidden"
                name="event_date"
                value={supabaseFormattedDate}
            />

            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            "w-full justify-start text-left font-normal bg-transparent border-0 border-b border-input rounded-none px-0 hover:bg-transparent text-foreground focus-visible:ring-0 focus-visible:border-amber-500 transition-colors",
                            !date && "text-muted-foreground",
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                        {date ? (
                            format(date, "dd/MM/yyyy")
                        ) : (
                            <span>Choisir une date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        locale={fr}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}

"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const ENTRY_TYPES = [
    { value: "service", label: "Entretien" },
    { value: "admin", label: "Admin" },
    { value: "modification", label: "Modifs" },
    { value: "event", label: "Événement" },
] as const;

interface EntryTypeSelectorProps {
    name?: string;
    defaultValue?: string;
}

export default function EntryTypeSelector({
    name = "entryType",
    defaultValue = "entretien",
}: EntryTypeSelectorProps) {
    return (
        <RadioGroup
            name={name}
            defaultValue={defaultValue}
            className="grid grid-cols-2 gap-3"
        >
            {ENTRY_TYPES.map((type) => (
                <Label
                    key={type.value}
                    htmlFor={type.value}
                    className="flex items-center justify-center rounded-md border border-input bg-background px-4 py-3 text-sm font-semibold uppercase tracking-wide cursor-pointer transition-colors hover:bg-accent/50 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:text-primary"
                >
                    <span className="sr-only">
                        <RadioGroupItem value={type.value} id={type.value} />
                    </span>
                    {type.label}
                </Label>
            ))}
        </RadioGroup>
    );
}

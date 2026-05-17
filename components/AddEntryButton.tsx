import { Plus } from "lucide-react";

export default function AddEntryButton() {
    return (
        <button className="hidden md:flex items-center gap-2 px-3 py-2 lg:px-4 lg:py-3 text-primary-foreground bg-primary hover:bg-primary/90 uppercase text-xs font-semibold transition-colors ease-out">
            <Plus size={16} strokeWidth={2.5} />
            <span className="hidden md:inline">Ajouter</span>
        </button>
    );
}

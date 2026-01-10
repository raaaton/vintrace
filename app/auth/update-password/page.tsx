import { UpdatePasswordForm } from "@/components/UpdatePasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Modifier le Mot de passe | VinTrace",
};
export default function Page() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <UpdatePasswordForm />
            </div>
        </div>
    );
}

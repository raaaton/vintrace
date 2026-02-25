import { Lexend } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Link from "next/link";
import { Suspense } from "react";
import { AuthButton } from "@/components/AuthButton";
import { AccountButton } from "@/components/AccountButton";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import Image from "next/image";
import { TooltipProvider } from "@/components/ui/tooltip";

const lexend = Lexend({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-lexend",
});

const priestacy = localFont({
    src: "../public/fonts/Priestacy.otf", 
    display: "swap",
    variable: "--font-hand",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://vintrace.vercel.app"),
    title: "VinTrace",
    description:
        "Valorisez votre véhicule avec une timeline d'entretien interactive. Archivez vos factures, documentez vos restaurations et sécurisez la revente de votre voiture de collection.",
    openGraph: {
        title: "VinTrace",
        description:
            "Valorisez votre véhicule avec une timeline d'entretien interactive. Archivez vos factures, documentez vos restaurations et sécurisez la revente de votre voiture de collection.",
        siteName: "VinTrace",
        url: "https://vintrace.vercel.app",
        type: "website",
        locale: "fr_FR",
        images: [
            {
                url: "/images/logo.png",
                width: 500,
                height: 500,
                alt: "VinTrace Logo",
            }
        ],
    },
    twitter: {
        card: "summary",
        title: "VinTrace",
        description:
            "Valorisez votre véhicule avec une timeline d'entretien interactive. Archivez vos factures, documentez vos restaurations et sécurisez la revente de votre voiture de collection.",
        images: ["/images/logo.png"],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr" className="dark" suppressHydrationWarning>
            <body
                className={`${lexend.variable} ${priestacy.variable} ${lexend.className} antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <TooltipProvider>
                        <div className="min-h-svh flex flex-col">
                            <nav className="w-full flex justify-center border-b border-b-foreground/10 sticky top-0 bg-background z-50">
                                <div className="w-[90%] sm:w-[80%] lg:w-[75%] flex justify-between items-center py-3 text-sm h-16">
                                    <div className="flex gap-5 items-center relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 md:hover:after:origin-bottom-left md:hover:after:scale-x-100">
                                        <Link
                                            href="/"
                                            className="group text-[1.05rem] font-semibold flex items-center gap-2"
                                        >
                                            <Image
                                                src="/images/logo.png"
                                                alt="VinTrace Logo"
                                                width={28}
                                                height={28}
                                            />
                                            <span>VinTrace</span>
                                        </Link>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Suspense
                                            fallback={<div>Chargement...</div>}
                                        >
                                            <AccountButton />
                                            <AuthButton />
                                        </Suspense>
                                    </div>
                                </div>
                            </nav>

                            <Toaster position="top-right" richColors />

                            <main
                                role="main"
                                className="flex-1 w-full flex flex-col items-center"
                            >
                                {children}
                            </main>

                            <footer className="w-full flex items-center justify-center border-t border-foreground/10 py-8 text-xs">
                                <p className="text-muted-foreground">
                                    © 2026 VinTrace
                                </p>
                            </footer>
                        </div>
                    </TooltipProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}

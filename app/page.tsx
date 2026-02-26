import { Metadata } from "next";
import Link from "next/link";
import {
    ArrowRight,
    Check,
    History,
    LineChart,
    ShieldCheck,
    Camera,
    SquareCheck,
} from "lucide-react";

export const metadata: Metadata = {
    title: "VinTrace | Le Digital Twin de votre passion automobile",
    description:
        "Transformez vos factures en une timeline interactive. Sécurisez la valeur de votre véhicule pour la revente.",
};

export default function Home() {
    return (
        <div className="flex-1 w-full relative overflow-x-clip">
            {/* Decorative background gradients */}
            <div className="absolute top-0 inset-x-0 h-[80vh] sm:h-[120vh] -z-10 pointer-events-none overflow-x-hidden sm:overflow-visible flex justify-center">
                <div className="absolute top-20 -right-10 sm:top-0 sm:left-1/2 sm:-translate-x-1/2 w-[300px] sm:w-[1000px] h-[300px] sm:h-[500px] opacity-20 sm:opacity-[0.1] blur-[60px] sm:blur-[120px] bg-primary rounded-full transition-all duration-1000" />
                <div className="absolute top-1/4 -right-10 sm:-right-40 w-[200px] sm:w-[600px] h-[200px] sm:h-[600px] opacity-20 sm:opacity-10 blur-[50px] sm:blur-[120px] bg-stone-500 rounded-full" />
                <div className="absolute top-1/3 -left-10 sm:-left-40 w-[200px] sm:w-[500px] h-[200px] sm:h-[500px] opacity-20 sm:opacity-10 blur-[50px] sm:blur-[100px] bg-primary rounded-full" />
            </div>

            <div className="mx-auto w-[90%] sm:w-[80%] lg:w-[75%] pb-24 z-10">
                {/* Hero Section */}
                <section className="pt-24 pb-20 md:pt-36 md:pb-32 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-12 duration-1000 relative">
                    <div className="mb-6 inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium shadow-[0_0_15px_-3px_hsl(var(--primary)_/_20%)]">
                        <span className="flex h-2.5 w-2.5 rounded-full bg-primary relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        </span>
                        Le carnet d'entretien numérique 2.0
                    </div>

                    <h1 className="text-3xl md:text-6xl lg:text-[4.5rem] leading-[1.1] font-bold tracking-tight text-foreground mb-8 max-w-4xl flex flex-col items-center select-none">
                        <span>Le Digital Twin de votre</span>
                        <span className="font-hand text-5xl md:text-[5.5rem] lg:text-[7.5rem] mt-2 text-primary font-normal opacity-90 inline-block select-none">
                            passion automobile
                        </span>
                    </h1>

                    <p className="md:text-xl text-muted-foreground mb-12 max-w-3xl font-light leading-relaxed">
                        Transformez vos factures papier en une Timeline
                        interactive. Rassurez les acheteurs et{" "}
                        <b className="text-foreground font-normal">
                            sécurisez la valeur de votre investissement
                        </b>{" "}
                        lors de la revente.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 items-center w-full justify-center sm:w-auto">
                        <Link
                            href="/register"
                            className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] transition-all duration-300 px-8 py-4 flex flex-1 sm:flex-initial items-center justify-center gap-2 font-medium shadow-[0_0_30px_-5px_hsl(var(--primary)_/_40%)]"
                        >
                            Créer mon Garage Virtuel{" "}
                            <ArrowRight className="w-5 h-5 ml-1" />
                        </Link>
                        <Link
                            href="#features"
                            className="w-full sm:w-auto bg-stone-900/50 hover:bg-stone-800 text-foreground border border-stone-700/75 hover:border-stone-500 transition-all duration-300 px-8 py-4 flex flex-1 sm:flex-initial justify-center items-center gap-2 font-light"
                        >
                            Découvrir les fonctionnalités
                        </Link>
                    </div>
                </section>

                {/* Pain point / Solution Section */}
                <section className="py-24 border-t border-stone-800/50">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="animate-in fade-in slide-in-from-left-8 duration-1000 delay-150 fill-mode-both">
                            <h2 className="text-3xl md:text-4xl font-light mb-6 leading-tight select-none">
                                La valeur d'une voiture de collection dépend à{" "}
                                <span className="font-hand text-5xl md:text-6xl text-primary tracking-normal font-normal inline-block mt-3 select-none">
                                    50%
                                </span>{" "}
                                de son{" "}
                                <span className="font-hand text-5xl md:text-6xl text-primary tracking-normal font-normal inline-block mt-3 select-none">
                                    historique
                                </span>
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8 font-light leading-relaxed">
                                Actuellement, cet historique prend la forme d'un
                                tas de factures papier en vrac ou d'un fichier
                                Excel basique. Cette opacité ne rassure pas
                                l'acheteur et fait perdre de la valeur à la
                                vente.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Fini les dossiers administratifs désorganisés",
                                    "Centralisation numérique de toutes vos factures",
                                    "Suivi précis de l'investissement total",
                                ].map((item, i) => (
                                    <li
                                        key={i}
                                        className="flex items-center gap-4 text-stone-200"
                                    >
                                        <SquareCheck className="w-5 h-5 text-primary shrink-0" />
                                        <span className="font-light tracking-wide">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-6 animate-in fade-in slide-in-from-right-8 duration-1000 delay-300 fill-mode-both">
                            <div className="bg-stone-900/50 backdrop-blur-md border border-stone-800 p-6 flex flex-col gap-4 hover:border-stone-600 transition-colors group h-full">
                                <History className="w-8 h-8 text-stone-400 group-hover:text-primary transition-colors" />
                                <h3 className="font-medium text-lg tracking-wide text-stone-100">
                                    Timeline Visuelle
                                </h3>
                                <p className="text-sm text-muted-foreground font-light leading-relaxed flex-1">
                                    De l'achat aux restaurations, visualisez
                                    votre historique chronologiquement.
                                </p>
                            </div>
                            <div className="bg-stone-900/50 backdrop-blur-md border border-stone-800 p-6 flex flex-col gap-4 hover:border-stone-600 transition-colors group h-full">
                                <ShieldCheck className="w-8 h-8 text-stone-400 group-hover:text-primary transition-colors" />
                                <h3 className="font-medium text-lg tracking-wide text-stone-100">
                                    Preuve Ultime
                                </h3>
                                <p className="text-sm text-muted-foreground font-light leading-relaxed flex-1">
                                    Associez vos PDF, factures et photos
                                    irréfutables à chaque étape.
                                </p>
                            </div>
                            <div className="bg-stone-900/50 backdrop-blur-md border border-stone-800 p-6 flex flex-col gap-4 hover:border-stone-600 transition-colors group h-full">
                                <Camera className="w-8 h-8 text-stone-400 group-hover:text-primary transition-colors" />
                                <h3 className="font-medium text-lg tracking-wide text-stone-100">
                                    Showroom
                                </h3>
                                <p className="text-sm text-muted-foreground font-light leading-relaxed flex-1">
                                    Partagez une URL vitrine qui fait rêver
                                    l'acheteur, en toute confidentialité.
                                </p>
                            </div>
                            <div className="bg-stone-900/50 backdrop-blur-md border border-stone-800 p-6 flex flex-col gap-4 hover:border-stone-600 transition-colors group h-full">
                                <LineChart className="w-8 h-8 text-stone-400 group-hover:text-primary transition-colors" />
                                <h3 className="font-medium text-lg tracking-wide text-stone-100">
                                    Tracking
                                </h3>
                                <p className="text-sm text-muted-foreground font-light leading-relaxed flex-1">
                                    Suivez votre investissement global d'un
                                    simple coup d'œil.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Deep Dive */}
                <section
                    id="features"
                    className="py-24 border-t border-stone-800/50"
                >
                    <div className="text-center mb-24">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                            Fonctionnalités Clés
                        </h2>
                        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                            Tout ce dont vous avez besoin pour gérer, documenter
                            et prouver la valeur de vos véhicules d'exception.
                        </p>
                    </div>

                    <div className="space-y-24 lg:space-y-32">
                        {/* 1st Feature */}
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center group">
                            <div className="order-2 lg:order-1 relative aspect-square sm:aspect-[4/3] bg-stone-950/50 border border-stone-800 hover:border-stone-600 transition-all duration-500 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50"></div>
                                <div className="relative z-10 grid grid-cols-2 gap-4 sm:gap-6 w-full h-[110%] sm:h-[120%] opacity-80 group-hover:opacity-100 transition-all duration-700 ease-out group-hover:scale-105">
                                    <div className="border border-stone-700/50 bg-stone-900/80 backdrop-blur-sm w-full h-full flex flex-col p-3 sm:p-4 shadow-2xl">
                                        <div className="h-24 sm:h-32 bg-stone-800/50 mb-3 sm:mb-4 rounded-sm"></div>
                                        <div className="h-3 sm:h-4 w-full sm:w-2/3 bg-stone-800/50 mb-2 sm:mb-3 rounded-sm"></div>
                                        <div className="h-2 sm:h-3 w-2/3 sm:w-1/3 bg-stone-800/50 rounded-sm"></div>
                                    </div>
                                    <div className="border border-stone-700/50 bg-stone-900/80 backdrop-blur-sm w-full h-full flex flex-col p-3 sm:p-4 shadow-2xl translate-y-6 sm:translate-y-12">
                                        <div className="h-24 sm:h-32 bg-stone-800/50 mb-3 sm:mb-4 rounded-sm"></div>
                                        <div className="h-3 sm:h-4 w-full sm:w-2/3 bg-stone-800/50 mb-2 sm:mb-3 rounded-sm"></div>
                                        <div className="h-2 sm:h-3 w-2/3 sm:w-1/3 bg-stone-800/50 rounded-sm"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="order-1 lg:order-2">
                                <div className="text-primary font-mono text-sm tracking-widest mb-3 uppercase">
                                    Interface Épurée
                                </div>
                                <h3 className="text-3xl lg:text-4xl font-semibold mb-6 tracking-tight text-foreground">
                                    Le Garage Virtuel
                                </h3>
                                <p className="text-muted-foreground font-light mb-8 text-lg leading-relaxed">
                                    Une vue globale sur votre collection.
                                    Ajoutez vos véhicules avec leurs
                                    informations fondamentales : Année, VIN,
                                    Kilométrage initial, et une magnifique photo
                                    de couverture.
                                </p>
                                <Link
                                    href="/register"
                                    className="inline-flex items-center gap-2 text-stone-200 hover:text-primary transition-colors font-medium border-b border-transparent hover:border-primary pb-1"
                                >
                                    Démarrer{" "}
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                </Link>
                            </div>
                        </div>

                        {/* 2nd Feature */}
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center group">
                            <div>
                                <div className="text-primary font-mono text-sm tracking-widest mb-3 uppercase">
                                    Cœur du Système
                                </div>
                                <h3 className="text-3xl lg:text-4xl font-semibold mb-6 tracking-tight text-foreground">
                                    La Timeline d'Entretien
                                </h3>
                                <p className="text-muted-foreground font-light mb-8 text-lg leading-relaxed">
                                    Dites adieu aux dossiers désordonnés.
                                    Ajoutez des événements chronologiques
                                    classés par type avec photos et
                                    justificatifs PDF pour construire
                                    l'historique irréfutable de votre
                                    automobile.
                                </p>
                                <ul className="space-y-4 mb-6">
                                    <li className="flex items-center gap-4 text-stone-300 font-light border border-stone-800/50 p-4 bg-stone-900/20 hover:border-stone-600 transition-colors">
                                        <SquareCheck className="w-5 h-5 text-primary shrink-0" />{" "}
                                        Entretien (Vidanges, Freins)
                                    </li>
                                    <li className="flex items-center gap-4 text-stone-300 font-light border border-stone-800/50 p-4 bg-stone-900/20 hover:border-stone-600 transition-colors">
                                        <SquareCheck className="w-5 h-5 text-primary shrink-0" />{" "}
                                        Modifications & Restaurations
                                    </li>
                                    <li className="flex items-center gap-4 text-stone-300 font-light border border-stone-800/50 p-4 bg-stone-900/20 hover:border-stone-600 transition-colors">
                                        <SquareCheck className="w-5 h-5 text-primary shrink-0" />{" "}
                                        Administratif (Contrôle Technique)
                                    </li>
                                </ul>
                            </div>
                            <div className="relative aspect-[4/5] sm:aspect-[4/3] bg-stone-950/50 border border-stone-800 hover:border-stone-600 transition-all duration-500 flex items-center p-3 sm:p-8 overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-50 z-0 pointer-events-none"></div>
                                <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-stone-950/90 to-transparent z-20 pointer-events-none"></div>

                                <div className="relative z-10 flex flex-col w-full gap-4 sm:gap-6 opacity-70 group-hover:opacity-100 transition-all duration-700 ease-out transform group-hover:-translate-y-2 sm:group-hover:-translate-y-4">
                                    {/* Entry 1 */}
                                    <div className="relative flex gap-3 sm:gap-6 transform transition-transform duration-500 group-hover:translate-x-1 sm:group-hover:translate-x-2">
                                        <div className="w-12 sm:w-20 pt-2 text-right shrink-0">
                                            <div className="h-1.5 sm:h-2 w-full bg-stone-800/60 mb-2 rounded-sm ml-auto"></div>
                                            <div className="h-1 sm:h-1.5 w-2/3 bg-stone-800/40 rounded-sm ml-auto"></div>
                                        </div>
                                        <div className="relative flex flex-col items-center">
                                            <div className="z-10 mt-1.5">
                                                <div className="size-2.5 sm:size-3 lg:size-4 transform rotate-45 bg-white shadow-[0_0_15px_rgba(255,255,255,0.4)]"></div>
                                            </div>
                                            <div className="absolute top-4 bottom-[-32px] w-[2px] bg-gradient-to-b from-white/20 to-primary/30" />
                                        </div>
                                        <div className="flex-1 border border-stone-700/50 bg-stone-900/90 backdrop-blur-sm p-3 sm:p-4 shadow-xl group-hover:border-stone-500/50 transition-colors">
                                            <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                                                <div className="w-6 sm:w-8 h-3 sm:h-4 bg-white/10 rounded-sm"></div>
                                                <div className="h-2 sm:h-3 w-1/2 bg-stone-700/50 rounded-sm"></div>
                                            </div>
                                            <div className="h-1.5 sm:h-2 w-3/4 bg-stone-700/40 rounded-sm mb-2"></div>
                                            <div className="h-1.5 sm:h-2 w-1/2 bg-stone-800/40 rounded-sm"></div>
                                        </div>
                                    </div>

                                    {/* Entry 2 */}
                                    <div
                                        className="relative flex gap-3 sm:gap-6 transform transition-transform duration-500 group-hover:translate-x-1 sm:group-hover:translate-x-2"
                                        style={{ transitionDelay: "100ms" }}
                                    >
                                        <div className="w-12 sm:w-20 pt-2 text-right shrink-0">
                                            <div className="h-1.5 sm:h-2 w-5/6 bg-stone-800/60 mb-2 rounded-sm ml-auto"></div>
                                            <div className="h-1 sm:h-1.5 w-1/2 bg-stone-800/40 rounded-sm ml-auto"></div>
                                        </div>
                                        <div className="relative flex flex-col items-center">
                                            <div className="z-10 mt-1.5">
                                                <div className="size-2.5 sm:size-3 lg:size-4 transform rotate-45 bg-primary shadow-[0_0_20px_rgba(255,183,0,0.6)]"></div>
                                            </div>
                                            <div className="absolute top-4 bottom-[-32px] w-[2px] bg-gradient-to-b from-primary/30 to-red-500/30" />
                                        </div>
                                        <div className="flex-1 border border-primary/20 bg-stone-900/90 backdrop-blur-sm p-3 sm:p-4 shadow-[0_0_30px_rgba(255,183,0,0.1)] border-l-2 border-l-primary group-hover:border-primary/40 transition-colors">
                                            <div className="flex items-start justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
                                                <div className="flex items-center gap-2 sm:gap-3 w-full">
                                                    <div className="w-6 sm:w-8 h-3 sm:h-4 bg-primary/20 rounded-sm"></div>
                                                    <div className="h-2 sm:h-3 w-2/3 bg-stone-700/60 rounded-sm"></div>
                                                </div>
                                                <div className="h-2 sm:h-3 w-8 sm:w-12 bg-stone-800/80 rounded-sm shrink-0 hidden sm:block"></div>
                                            </div>
                                            <div className="flex gap-3 sm:gap-4">
                                                <div className="w-10 h-10 sm:w-14 sm:h-14 shrink-0 bg-stone-800/50 rounded border border-stone-700/50"></div>
                                                <div className="flex-1 justify-center flex flex-col">
                                                    <div className="h-1.5 sm:h-2 w-full bg-stone-700/40 rounded-sm mb-2 sm:mb-3"></div>
                                                    <div className="h-1.5 sm:h-2 w-4/5 bg-stone-800/40 rounded-sm"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Entry 3 */}
                                    <div
                                        className="relative flex gap-3 sm:gap-6 transform transition-transform duration-500 group-hover:translate-x-1 sm:group-hover:translate-x-2"
                                        style={{ transitionDelay: "200ms" }}
                                    >
                                        <div className="w-12 sm:w-20 pt-2 text-right shrink-0">
                                            <div className="h-1.5 sm:h-2 w-3/4 bg-stone-800/60 mb-2 rounded-sm ml-auto"></div>
                                            <div className="h-1 sm:h-1.5 w-2/3 bg-stone-800/40 rounded-sm ml-auto"></div>
                                        </div>
                                        <div className="relative flex flex-col items-center">
                                            <div className="z-10 mt-1.5">
                                                <div className="size-2.5 sm:size-3 lg:size-4 transform rotate-45 bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]"></div>
                                            </div>
                                            <div className="absolute top-4 bottom-[-32px] w-[2px] bg-red-500/20" />
                                        </div>
                                        <div className="flex-1 border border-stone-700/50 bg-stone-900/90 backdrop-blur-sm p-3 sm:p-4 shadow-xl">
                                            <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                                                <div className="w-6 sm:w-8 h-3 sm:h-4 bg-red-500/20 rounded-sm"></div>
                                                <div className="h-2 sm:h-3 w-1/2 bg-stone-700/50 rounded-sm"></div>
                                            </div>
                                            <div className="h-1.5 sm:h-2 w-2/3 bg-stone-800/60 rounded-sm"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3rd Feature*/}
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center group">
                            <div className="order-2 lg:order-1 relative aspect-[4/5] sm:aspect-square md:aspect-[4/3] bg-stone-950/50 border border-stone-800 hover:border-stone-600 transition-all duration-500 flex items-end justify-center pt-8 sm:pt-12 px-4 sm:px-8 overflow-hidden">
                                <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-primary/10 to-transparent"></div>
                                <div className="relative z-10 w-[95%] sm:w-[85%] h-[90%] sm:h-full border-t border-x border-stone-700/50 bg-stone-900/90 backdrop-blur-md shadow-2xl p-4 sm:p-6 flex flex-col translate-y-8 sm:translate-y-12 group-hover:translate-y-2 sm:group-hover:translate-y-4 transition-transform duration-700 ease-out">
                                    <div className="flex justify-between items-center mb-4 sm:mb-6 border-b border-stone-800/80 pb-3 sm:pb-4">
                                        <div className="font-mono text-[9px] sm:text-xs text-stone-500 truncate flex-1 pr-2 sm:pr-4">
                                            vintrace.fr/showroom/porsche-911
                                        </div>
                                        <div className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 bg-primary/10 text-primary text-[8px] sm:text-[10px] uppercase font-bold tracking-widest border border-primary/20 shrink-0 shadow-[0_0_10px_rgba(255,183,0,0.1)]">
                                            Vue Publique
                                        </div>
                                    </div>
                                    <div className="w-full h-24 sm:h-36 bg-stone-800/40 mb-4 sm:mb-6 rounded-sm border border-stone-800"></div>
                                    <div className="h-4 sm:h-6 w-1/2 bg-stone-800/60 mb-4 sm:mb-5 rounded-sm"></div>
                                    <div className="flex gap-3 sm:gap-4 flex-1 pb-4">
                                        <div className="h-full min-h-[3rem] sm:min-h-[4rem] w-full bg-stone-800/30 border border-stone-800 rounded-sm"></div>
                                        <div className="h-full min-h-[3rem] sm:min-h-[4rem] w-full bg-stone-800/30 border border-stone-800 rounded-sm"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="order-1 lg:order-2">
                                <div className="text-primary font-mono text-sm tracking-widest mb-3 uppercase">
                                    L'Atout Majeur
                                </div>
                                <h3 className="text-3xl lg:text-4xl font-semibold mb-6 tracking-tight text-foreground">
                                    Le Showroom Public
                                </h3>
                                <p className="text-muted-foreground font-light mb-6 text-lg leading-relaxed">
                                    Générez une URL unique pour votre véhicule.
                                    Affichez votre voiture et sa timeline de
                                    manière élégante aux acheteurs potentiels,
                                    prouvant ainsi la rigueur de votre entretien
                                    et justifiant sa valeur.
                                </p>
                                <div className="p-4 bg-stone-900/30 border-l-2 border-primary/50 text-stone-400 font-light text-sm italic leading-relaxed">
                                    Sécurité incluse : floutage automatique des
                                    données sensibles (adresse, nom complet) sur
                                    la vue publique pour garantir votre
                                    confidentialité absolue.
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section
                    id="pricing"
                    className="py-24 border-t border-stone-800/50 relative"
                >
                    <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                            Tarifs
                        </h2>
                        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-light">
                            Des offres claires et adaptées à votre{" "}
                            <span className="font-hand text-4xl text-primary font-normal tracking-normal inline-block ml-1">
                                passion
                            </span>
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
                        {/* Free */}
                        <div className="bg-stone-950/40 backdrop-blur-sm border border-stone-800 p-8 hover:border-stone-700 transition-colors flex flex-col group">
                            <h3 className="text-xl font-medium mb-3 text-stone-200">
                                Amateur
                            </h3>
                            <div className="mb-6 flex items-baseline gap-1">
                                <span className="text-5xl font-bold tracking-tighter text-foreground">
                                    0€
                                </span>
                            </div>
                            <p className="text-stone-400 font-light text-sm mb-8 h-10 leading-relaxed border-b border-stone-800/50 pb-16">
                                L'offre idéale pour tester le carnet digital et
                                visualiser l'interface sur un premier véhicule.
                            </p>
                            <ul className="space-y-5 mb-10 flex-1">
                                <li className="flex items-start gap-4 text-sm text-stone-300 font-light">
                                    <Check className="w-5 h-5 text-stone-500 shrink-0" />{" "}
                                    <span>1 Véhicule dans votre garage</span>
                                </li>
                                <li className="flex items-start gap-4 text-sm text-stone-300 font-light">
                                    <Check className="w-5 h-5 text-stone-500 shrink-0" />{" "}
                                    <span>
                                        Limite de 5 événements (factures)
                                    </span>
                                </li>
                                <li className="flex items-start gap-4 text-sm text-stone-500 font-light line-through opacity-50">
                                    <Check className="w-5 h-5 shrink-0" />{" "}
                                    <span>Page Showroom Publique</span>
                                </li>
                                <li className="flex items-start gap-4 text-sm text-stone-500 font-light line-through opacity-50">
                                    <Check className="w-5 h-5 shrink-0" />{" "}
                                    <span>Export PDF complet</span>
                                </li>
                            </ul>
                            <Link
                                href="/register"
                                className="w-full text-center border border-stone-700 hover:border-stone-500 hover:bg-stone-800 text-stone-200 py-4 font-medium transition-colors tracking-wide"
                            >
                                Tester gratuitement
                            </Link>
                        </div>

                        {/* Passionné (Highlighted) */}
                        <div className="bg-stone-950 border border-primary/50 relative p-8 shadow-2xl shadow-primary/5 flex flex-col lg:-mt-4 lg:mb-[-1rem] z-10">
                            <div className="absolute inset-0 -z-10 pointer-events-none overflow-visible flex items-center justify-center">
                                <div className="w-[800px] h-[500px] bg-primary/5 blur-[120px] rounded-full"></div>
                            </div>
                            <div className="absolute top-0 inset-x-0 h-1 bg-primary"></div>
                            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 text-[10px] font-bold uppercase tracking-widest shadow-md">
                                Recommandé
                            </div>
                            <h3 className="text-xl font-medium mb-3 text-primary mt-2">
                                Passionné
                            </h3>
                            <div className="mb-6 flex items-baseline gap-1">
                                <span className="text-5xl font-bold tracking-tighter text-foreground">
                                    80€
                                </span>
                                <span className="text-stone-500 font-light">
                                    /an
                                </span>
                            </div>
                            <p className="text-stone-300 font-light text-sm mb-8 h-10 leading-relaxed border-b border-stone-800/80 pb-16">
                                La solution complète pour valoriser un petit
                                garage et créer la confiance à la revente.
                            </p>
                            <ul className="space-y-5 mb-10 flex-1">
                                <li className="flex items-start gap-4 text-sm text-stone-100 font-medium">
                                    <Check className="w-5 h-5 text-primary shrink-0" />{" "}
                                    <span>Jusqu'à 2 véhicules</span>
                                </li>
                                <li className="flex items-start gap-4 text-sm text-stone-100 font-medium">
                                    <Check className="w-5 h-5 text-primary shrink-0" />{" "}
                                    <span>Événements & Factures illimités</span>
                                </li>
                                <li className="flex items-start gap-4 text-sm text-stone-100 font-medium">
                                    <Check className="w-5 h-5 text-primary shrink-0" />{" "}
                                    <span className="pb-0.5">
                                        Showroom Public inclus
                                    </span>
                                </li>
                                <li className="flex items-start gap-4 text-sm text-stone-100 font-medium">
                                    <Check className="w-5 h-5 text-primary shrink-0" />{" "}
                                    <span>Export PDF Professionnel</span>
                                </li>
                            </ul>
                            <Link
                                href="/register"
                                className="w-full text-center bg-primary text-primary-foreground hover:bg-primary/90 py-4 font-medium transition-colors tracking-wide shadow-[0_0_20px_rgba(255,183,0,0.2)]"
                            >
                                Choisir Passionné
                            </Link>
                        </div>

                        {/* Collectionneur */}
                        <div className="bg-stone-950/40 backdrop-blur-sm border border-stone-800 p-8 hover:border-stone-700 transition-colors flex flex-col group">
                            <h3 className="text-xl font-medium mb-3 text-stone-200">
                                Collectionneur
                            </h3>
                            <div className="mb-6 flex items-baseline gap-1">
                                <span className="text-5xl font-bold tracking-tighter text-foreground">
                                    200€
                                </span>
                                <span className="text-stone-500 font-light">
                                    /an
                                </span>
                            </div>
                            <p className="text-stone-400 font-light text-sm mb-8 h-10 leading-relaxed border-b border-stone-800/50 pb-16">
                                Pour les passionnés avec une flotte importante
                                qui nécessite une gestion experte.
                            </p>
                            <ul className="space-y-5 mb-10 flex-1">
                                <li className="flex items-start gap-4 text-sm text-stone-300 font-light">
                                    <Check className="w-5 h-5 text-primary/70 shrink-0" />{" "}
                                    <span>Jusqu'à 10 véhicules</span>
                                </li>
                                <li className="flex items-start gap-4 text-sm text-stone-300 font-light">
                                    <Check className="w-5 h-5 text-primary/70 shrink-0" />{" "}
                                    <span>
                                        Tout l'illimité du plan Passionné
                                    </span>
                                </li>
                                <li className="flex items-start gap-4 text-sm text-stone-300 font-light">
                                    <Check className="w-5 h-5 text-primary/70 shrink-0" />{" "}
                                    <span>Support prioritaire</span>
                                </li>
                                <li className="flex items-start gap-4 text-sm text-stone-300 font-light">
                                    <Check className="w-5 h-5 text-primary/70 shrink-0" />{" "}
                                    <span>
                                        Nouvelles fonctionnalités en
                                        avant-première
                                    </span>
                                </li>
                            </ul>
                            <Link
                                href="/register"
                                className="w-full text-center border border-stone-700 hover:border-stone-500 hover:bg-stone-800 text-stone-200 py-4 font-medium transition-colors tracking-wide"
                            >
                                Choisir Collectionneur
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-24 md:py-32 border-t border-stone-800/50 text-center relative overflow-hidden">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight">
                        Prêt à valoriser votre patrimoine ?
                    </h2>
                    <p className="text-xl text-muted-foreground font-light mb-12 max-w-3xl mx-auto leading-relaxed">
                        Rejoignez les passionnés qui ont déjà transformé
                        l'histoire de leurs véhicules en une timeline numérique{" "}
                        <b className="text-foreground font-normal">
                            irréfutable
                        </b>
                        .
                    </p>
                    <Link
                        href="/register"
                        className="inline-flex items-center justify-center bg-foreground text-background hover:bg-stone-300 hover:scale-[1.02] transition-all duration-300 px-10 py-5 font-semibold text-lg tracking-wide group"
                    >
                        Créer mon compte
                        <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </section>
            </div>
        </div>
    );
}

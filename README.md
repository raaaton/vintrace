# 🏎️ VinTrace | Le Double Numérique de votre Automobile

**VinTrace** est une plateforme SaaS (B2C) permettant aux propriétaires de Youngtimers et de véhicules d'exception de créer un "Double Numérique" de leur véhicule. Plus qu'un simple carnet d'entretien, c'est un dossier notarial numérique visant à valoriser le patrimoine automobile.

## 🎯 Vision MVP

- **Garage Virtuel** : Vue d'ensemble de la collection.
- **Timeline de Vie** : Historique chronologique (Maintenance, Modifs, Administratif).
- **Preuves Numériques** : Stockage sécurisé des factures et photos de restauration.
- **Showroom Public** : Page de vente optimisée masquant les données sensibles (VIN partiel, adresse).

## 🛠️ Tech Stack

- **Framework** : [Next.js 16 (App Router)](https://nextjs.org/) - Server Components par défaut.
- **Langage** : TypeScript (Strict mode).
- **UI/UX** : Tailwind CSS + [ShadcnUI](https://ui.shadcn.com/)
- **Backend-as-a-Service** : [Supabase](https://supabase.com/) (PostgreSQL, Auth, Storage).
- **Paiements** : [Polar.sh](https://polar.sh/)
- **Emails** : [Resend](https://resend.com/).

## 🏗️ Architecture des Données (PostgreSQL)

L'architecture est optimisée pour le Serverless et la sécurité (RLS Supabase) :

- `profiles` : Données utilisateurs.
- `vehicles` : Le cœur du système (lié au `owner_id`).
- `maintenance_events` & `event_files` : La preuve de la valeur du véhicule.
- `ownership_transfers` : Système de passation du dossier lors de la vente.

## 🚀 Installation & Développement

1. **Cloner le projet** :

```bash
git clone https://github.com/raaaton/vin-trace.git
cd vin-trace
```

2. **Installer les dépendances** :

```bash
pnpm install

```

3. **Variables d'environnement** :

Créer un fichier `.env.local` basé sur `.env.example` :

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key

# Optional API keys for additional features that have not yet been implemented in this project
POLAR_API_KEY=your_polar_key
RESEND_API_KEY=your_resend_key

```

4. **Lancer le serveur** :

```bash
pnpm dev

```

## 📅 Roadmap MVP

- [x] Initialisation Next.js 16 + Shadcn.
- [x] Setup Supabase Auth & Schema.
- [x] Garage
  - [x] Dashboard "Garage" (fetch les véhicules).
  - [x] Ajout de véhicule : Formulaire de création (Marque, Modèle, Année, VIN) avec validation stricte.
- [ ] Timeline d'événements avec Upload Storage.
- [ ] Génération de l'URL Showroom publique.
- [ ] Intégration Polar.sh pour le plan "Collectionneur".

---

*VinTrace - Documentez aujourd'hui la valeur de demain.*

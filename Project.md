# VinTrace

# 1. Le Concept & La Vision

**SaaS B2C / Solo Founder Friendly**

- **L'Idée :** Le carnet d'entretien numérique et portfolio de restauration transférable pour véhicules de passionnés. C'est un "Digital Twin" administratif.

- **Le Problème :** La valeur d'une voiture de collection/sport dépend à 50% de son historique. Actuellement, cet historique est un tas de factures papier en vrac ou un fichier Excel laid. Cela ne rassure pas l'acheteur et fait perdre de la valeur.

- **La Proposition de Valeur :** Transformer des factures ennuyeuses en une "Timeline de Valeur" interactive et visuelle, qui sert de preuve ultime lors de la revente.

- **La Cible :** Adultes (30-65 ans), propriétaires de Youngtimers, sportives, ou restaurateurs amateurs. Budget moyen/élevé.

---

# 2. Le MVP

### 🏠 A. Le "Garage Virtuel" (Dashboard)

- **Fonction :** Ajouter un ou plusieurs véhicules.

- **Données :** Marque, Modèle, Année, VIN (Numéro série), Kilométrage initial, Photo de couverture.

- **UX :** Interface propre, vision globale de la collection.

### 📅 B. La "Timeline" d'Entretien (Cœur du système)

- **Fonction :** Ajouter des événements chronologiques au lieu de dossiers.

- **Types d'événements :**
    1.  Entretien (Vidange, freins...)
    2.  Modification (Stage 1, nouvelles jantes...)
    3.  Administratif (Contrôle technique, Assurance)
- **Preuves :** Upload de photos et factures (PDF, JPG, PNG) pour chaque événement.

### 🏎️ C. La Page "Showroom" (La Killer Feature)

- **Fonction :** Générer une URL publique unique (ex: `(https://vin-trace.fr/v/porsche911-vin123).

- **Contenu :** Affiche la voiture et sa timeline de manière sexy pour les acheteurs potentiels.

- **Sécurité :** Floutage automatique des données sensibles (adresse, nom complet) sur la vue publique.

- **Graphique :** Courbe simple "Investissement total sur 2 ans".

### 📄 D. Fonctionnalités "Old School"

- **Export PDF :** Bouton pour télécharger tout le dossier en un PDF propre (pour impression).

---

# 3. La Stack

_Optimisée pour la vitesse de dev, le coût zéro au lancement, et la performance._

### ⚛️ Le Cœur (Fullstack)

- **Framework :** **Next.js (App Router)**.
    - _Rôle :_ Gère à la fois le Frontend (React) et le Backend (API Routes). Permet le SSR (référencement) des pages Showroom.

- **Langage :** **TypeScript**.
    - _Rôle :_ Évite les bugs bêtes en imposant une structure aux données.

- **Style :** **Tailwind CSS**.
    - _Rôle :_ Design ultra-rapide sans écrire de fichiers CSS séparés.

### ☁️ L'Infrastructure (Serverless)

- **Hébergement :** **Vercel** (Plan Hobby Gratuit).
    - _Rôle :_ Héberge le site. Déploiement automatique depuis GitHub.

- **Base de Données :** **Supabase Database (PostgreSQL)**.
    - _Rôle :_ Stocke toutes les infos textuelles (Utilisateurs, Voitures, Events).

- **Stockage Fichiers :** **Supabase Storage**.
    - _Rôle :_ Stocke les images et PDF.

### 🛠️ Les Outils Satellites

- **Authentification :** **Supabase Auth**.
    - _Rôle :_ Gère l'inscription, le login, les sessions et la sécurité.

- **Emails :** **Supabase + Resend (via Edge Functions)**.
    - _Rôle :_ Envoie les mails de bienvenue ou de notifs.

- **Paiement :** **Polar.sh**.
    - _Rôle :_ Gère les abonnements.

- **React Ui Library : ShadcnUi**
    - _Rôle :_ Permet de contruire rapidement l'Ui.

---

# 4. Apprentissage

### ✅ 1. TypeScript : Typage Statique

_Objectif : Sécuriser les données entrantes et sortantes des composants._

- [x] **Comprendre les fichiers .tsx**
    - Notez que c'est du JSX standard, mais qui refuse de compiler si les types ne sont pas définis.
- [x] **Définir des types des Props**
    - Apprenez à déclarer la structure des données attendues par un composant.
    - _Syntaxe à maîtriser :_ Utiliser `type` ou `interface` pour définir les propriétés (`props`).
        ```typescript
        type ButtonProps {
          label: string,
          isDisabled?: boolean,
          onClick: () => void
        }
        ```
- [x] **Typer les Hooks (useState)**
    - Apprenez à forcer le type d'un état local.
    - _Syntaxe :_ `const [user, setUser] = useState<UserType | null>(null);`

---

### 2. Next.js (App Router) : Architecture

_Objectif : Comprendre le routage et le rendu hybride._

- [x] **Routing par système de fichiers**
    - [x] Comprenez que créer un dossier `app/dashboard/page.tsx` crée automatiquement la route URL `/dashboard`.
    - [x] `layout.tsx` définit le cadre commun qui persiste lors de la navigation.
- [x] **Server Components (Défaut)**
    - [x] **Rendu sur le serveur** (pas de JS envoyé au navigateur).
    - [x] Ils peuvent être **`async`** et lire la base de données directement via **Supabase server client**.
    - [x] Ils ne supportent pas `onClick`, `useState` ou `useEffect`.
- [x] **Client Components**
    - [x] Exigent la directive **`"use client";`** en haut du fichier.
    - [x] Utilisation obligatoire dès qu'il y a de l'**interactivité** (boutons, formulaires) ou des hooks React.
- [x] **Routes Dynamiques (`/[id]`)**
    - [x] Comprendre comment le dossier entre crochets `[id]` permet de capturer un paramètre dans l'URL (ex: l'ID d'une voiture ou d'un événement).
    - [x] Savoir récupérer ce paramètre dans le Server Component `page.tsx` via l'objet **`params`** pour l'utiliser dans une requête Supabase.

---

### 3. Tailwind CSS : Stylisation

_Objectif : Mettre en page sans écrire de CSS._

- [x] **Classes Utilitaires**
    - [x] Comprendre la correspondance : `p-4` = `padding: 1rem`, `bg-black` = `background-color: black`.
- [x] **Modèle Flexbox**
    - [x] Maîtriser l'alignement avec `flex`, `items-center` (axe vertical), `justify-between` (axe horizontal), `gap-4`.
- [x] **Design Mobile-First**
    - [x] Les classes de base s'appliquent au mobile.
    - [x] Utiliser les préfixes pour les écrans plus larges : `md:flex-row`.

---

### 4. Supabase : Données, Auth & Stockage

_Objectif : Centraliser la donnée, les fichiers, l’auth et les actions backend._

- [ ] **Définition du Schéma (SQL Editor / Migrations)**
    - [ ] Apprenez à créer des tables PostgreSQL pour voitures, événements, utilisateurs.
- [ ] **Row Level Security (RLS)**
    - [ ] Apprenez à restreindre l’accès aux données par utilisateur.
- [ ] **Requêtes côté serveur**
    - [ ] Utilisez le client Supabase server-side dans les Server Components Next.js.
- [ ] **Requêtes côté client**
    - [ ] Utilisez le client browser pour les formulaires interactifs.
- [ ] **Stockage**
    - [ ] Upload, suppression et récupération d’images/PDF via **Supabase Storage**.
- [ ] **Edge Functions** (optionnel)
    - [ ] Permet d’ajouter de la logique backend (ex: envoyer un mail via Resend après un ajout d’événement).

---

### 🚫 5. À ignorer temporairement (Anti-submersion)

- **Gestion d'état globale complexe :** Pas de Redux, Zustand ou Context API.
- **`useEffect` pour charger des données :** Inutile si vous utilisez des Server Components pour charger en SSR.
- **L'optimisation prématurée :** Pas de `useMemo` ou `useCallback`.
- **L'écriture de requêtes SQL brutes** (Supabase abstrait déjà tout).

---

### 📝 6. Exercice de Validation

- [ ] **Setup :** Projet Next.js + Supabase.
- [ ] **Database :** Définir une table `taches` simple.
- [ ] **Lecture :** Lire les données dans `page.tsx` (Server Component) depuis Supabase.
- [ ] **Écriture :** Créer un composant `Formulaire.tsx` (`"use client";`) qui ajoute une tâche via le client Supabase.
- [ ] **Test :** Vérifier que la nouvelle tâche apparaît après soumission.

---

# 5. Étapes précises pour le MVP

[[Todo List VinTrace]]

---

# 6. Architecture Supabase

### Table : profiles

**Rôle**  
Extension applicative de `auth.users`.  
Centralise les données utilisateur côté produit.

**Colonnes**

- `id` — uuid  
   Identifiant utilisateur, clé primaire, lié à `auth.users.id`
- `email` — text  
   Email de l’utilisateur
- `full_name` — text | nullable  
   Nom affiché
- `avatar_url` — text | nullable  
   Image de profil
- `created_at` — timestamp  
   Date de création du profil

**Relations**

- 1–1 avec `auth.users`
- 1–N avec `vehicles`
- 1–N avec `maintenance_events`
- 1–N avec `event_files`
- 1–N avec `subscriptions`

**Row Level Security**

- Activée

**Policies**

- Lecture autorisée uniquement à l’utilisateur propriétaire du profil
- Mise à jour autorisée uniquement à l’utilisateur propriétaire du profil
- Aucune suppression autorisée depuis le client

---

### Table : vehicles

**Rôle**  
Représente un véhicule possédé par un utilisateur.  
Supporte une exposition publique via une page showroom.

**Colonnes**

- `id` — uuid  
   Identifiant du véhicule
- `owner_id` — uuid  
   Référence vers `profiles.id`
- `brand` — text  
   Marque du véhicule
- `model` — text  
   Modèle du véhicule
- `year` — integer | nullable  
   Année
- `vin` — text  
   Numéro de série, unique
- `initial_mileage` — integer | nullable  
   Kilométrage à l’ajout
- `cover_image_url` — text | nullable  
   Image principale
- `is_public` — boolean  
   Indique si la page showroom est accessible
- `public_slug` — text | nullable  
   Identifiant public utilisé dans l’URL
- `created_at` — timestamp

**Relations**

- N–1 avec `profiles`
- 1–N avec `maintenance_events`
- 1–N avec `ownership_transfers`

**Row Level Security**

- Activée

**Policies**

- Accès complet (lecture, écriture, suppression) réservé au propriétaire
- Lecture publique autorisée uniquement si `is_public = true`
- Aucune écriture publique possible

---

### Table : maintenance_events

**Rôle**  
Événements chronologiques constituant l’historique du véhicule.  
C’est le cœur métier.

**Colonnes**

- `id` — uuid  
   Identifiant de l’événement
- `vehicle_id` — uuid  
   Véhicule concerné
- `owner_id` — uuid  
   Propriétaire de l’événement
- `type` — text  
   Valeurs possibles : `maintenance`, `modification`, `administrative`
- `title` — text  
   Titre court
- `description` — text | nullable  
   Détails
- `mileage` — integer | nullable  
   Kilométrage au moment de l’événement
- `cost` — numeric | nullable  
   Coût associé
- `event_date` — date  
   Date réelle de l’événement
- `created_at` — timestamp

**Relations**

- N–1 avec `vehicles`
- N–1 avec `profiles`
- 1–N avec `event_files`

**Row Level Security**

- Activée

**Policies**

- Accès complet réservé au propriétaire
- Aucun accès public direct (la lecture publique passe par la voiture)

---

### Table: event_files

**Rôle**  
Fichiers justificatifs associés à un événement.

**Colonnes**

- `id` — uuid  
   Identifiant du fichier
- `event_id` — uuid  
   Événement associé
- `owner_id` — uuid  
   Propriétaire
- `file_url` — text  
   URL Supabase Storage
- `file_type` — text  
   Valeurs possibles : `invoice`, `photo`
- `created_at` — timestamp

**Relations**

- N–1 avec `maintenance_events`
- N–1 avec `profiles`

**Row Level Security**

- Activée

**Policies**

- Accès complet réservé au propriétaire
- Aucun accès public direct

---

### Table: ownership_transfers

**Rôle**  
Gestion du transfert de propriété d’un véhicule avec son historique.

**Colonnes**

- `id` — uuid  
   Identifiant du transfert
- `vehicle_id` — uuid  
   Véhicule concerné
- `from_user` — uuid  
   Propriétaire actuel
- `to_email` — text  
   Email du futur propriétaire
- `transfer_token` — text  
   Token unique de validation
- `accepted` — boolean  
   État du transfert
- `created_at` — timestamp
- `accepted_at` — timestamp | nullable

**Relations**

- N–1 avec `vehicles`
- N–1 avec `profiles`

**Row Level Security**

- Activée

**Policies**

- Gestion complète réservée à l’expéditeur du transfert
- Aucun accès pour le destinataire tant que le token n’est pas validé

---

### Table : subscriptions

**Rôle**  
Représentation locale des abonnements Polar.sh.

**Colonnes**

- `id` — uuid  
   Identifiant interne
- `user_id` — uuid  
   Utilisateur concerné
- `plan` — text  
   Valeurs possibles : `free`, `passionne`, `collectionneur`
- `active` — boolean  
   État de l’abonnement
- `current_period_end` — timestamp | nullable  
   Fin de période courante
- `created_at` — timestamp

**Relations**

- N–1 avec `profiles`

**Row Level Security**

- Activée

**Policies**

- Lecture autorisée uniquement au propriétaire
- Aucune écriture directe côté client

---

### Buckets Storage : vehicle-media

**Rôle**  
Stockage des images et documents liés aux véhicules.

**Structure logique**

- user_id /
    - vehicle_id /
        - cover /
        - events /
            - event_id /

**Accès**

- Upload et lecture autorisés uniquement au propriétaire
- Lecture indirecte possible via URLs publiques si la voiture est publique

---

### Logique Transversale

**Principes**

- Privé par défaut
- Public uniquement par intention explicite (`is_public`)
- Aucune policy ambiguë
- Aucun accès croisé entre utilisateurs

---

# 7. Pricing

- **_Freemium :_** 1 voiture, limite de 5 factures (Test).
- **_Passionné (80€/an) :_** 2 voitures complètes + Page Showroom + Transfert de propriété.
- **_Collectionneur (200€/an) :_** 10 voitures.

---

# 8. Post MVP

_Une fois que tu as des utilisateurs._

- **V2 - Transfert de Propriété :** Permettre de céder la voiture ET son historique numérique au nouvel acheteur (crée une boucle virale d'acquisition).
- **V3 - IA OCR :** Scanner une facture papier avec le téléphone et laisser l'IA remplir le montant et la date toute seule.
- **V4 - Écosystème :** Rappels automatiques d'entretien basés sur la date/km.

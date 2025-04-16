# RugbyTournament

Une application web de gestion et d'inscription à des tournois de rugby, développée avec **NextJS 15**, **Tailwind CSS**, **ShadCN UI** et connectée à **Supabase** pour la gestion des données et l'authentification.

---

## Table des Matières

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration de Supabase](#configuration-de-supabase)
- [Utilisation](#utilisation)
- [Structure du Projet](#structure-du-projet)
- [Contribution](#contribution)
- [Licence](#licence)

---

## Aperçu

**RugbyTournament** est conçue pour afficher la liste des tournois de rugby disponibles. Les utilisateurs peuvent consulter les tournois et s'inscrire à celui qui correspond le mieux à leurs intérêts.  
L'application intègre les technologies suivantes :
- **NextJS 15** pour la structure de l'application et l'optimisation côté serveur.
- **Tailwind CSS** pour un design moderne et responsive.
- **ShadCN UI** pour des composants préfabriqués et personnalisables.
- **Supabase** pour la gestion de la base de données, l'authentification et les opérations en temps réel.

---

## Fonctionnalités

- **Liste des tournois :** Affichage de tous les tournois disponibles.
- **Inscription aux tournois :** Formulaire d'inscription pour rejoindre un tournoi.
- **Interface moderne et responsive :** Grâce à Tailwind CSS et ShadCN UI.

---

## Prérequis

Avant de démarrer, assurez-vous d’avoir installé :

- [Node.js](https://nodejs.org/) (version 22 ou supérieure recommandée)
- [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/)

---

## Installation

1. **Cloner le dépôt**

   ```bash
   git clone https://github.com/votre-utilisateur/rugby-tournament.git
   cd rugby-tournament
   ```

2. **Installer les dépendances**

   Utilisez npm :

   ```bash
   npm install
   ```

   ou Yarn :

   ```bash
   yarn install
   ```

3. **Lancer l’application en mode développement**

   ```bash
   npm run dev
   ```

   L'application sera accessible par défaut sur [http://localhost:3000](http://localhost:3000).

---

## Configuration de Supabase

Pour connecter votre application à Supabase, vous devez configurer les variables d’environnement.

1. **Créer le fichier `.env.local`**

   À la racine du projet, créez un fichier `.env.local` :

   ```bash
   touch .env.local
   ```

2. **Ajouter les variables d’environnement**

   Remplissez le fichier avec vos informations Supabase :

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://votre-instance.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=VotreClePubliqueAnonyme
   SUPABASE_SERVICE_ROLE_KEY=VotreCleServiceRole (optionnel, pour les opérations côté serveur)
   ```

3. **Redémarrer le serveur de développement**

   Pour appliquer les modifications, redémarrez l’application.

---

## Utilisation

- **Affichage des tournois :**  
  Parcourez l’interface pour voir la liste des tournois et obtenir des détails sur chacun d’eux.

- **Inscription :**  
  Sélectionnez un tournoi et utilisez le formulaire d’inscription pour rejoindre le tournoi de votre choix.

- **Gestion des utilisateurs :**  
  Les utilisateurs peuvent s’inscrire et se connecter, l’authentification étant gérée par Supabase.

---

## Structure du Projet

```
rugby-tournament/
├── components/          # Composants React réutilisables (liste de tournois, formulaires, etc.)
├── pages/               # Pages Next.js (ex. : index.js, pages d'authentification, détails du tournoi)
├── public/              # Ressources statiques (images, icônes, etc.)
├── styles/              # Fichiers CSS et configurations Tailwind
├── utils/               # Fonctions utilitaires et helpers (ex. : intégration Supabase)
├── .env.local           # Variables d’environnement (non versionné)
├── package.json         # Dépendances et scripts de l'application
└── README.md            # Ce fichier
```

---

## Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. **Forkez le dépôt**
2. **Créez votre branche de fonctionnalité :**

   ```bash
   git checkout -b feature/nouvelle-fonctionnalité
   ```

3. **Committez vos modifications :**

   ```bash
   git commit -m 'Ajout d’une nouvelle fonctionnalité'
   ```

4. **Poussez votre branche :**

   ```bash
   git push origin feature/nouvelle-fonctionnalité
   ```

5. **Ouvrez une Pull Request**

Merci de contribuer à l'amélioration de ce projet !

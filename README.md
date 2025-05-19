# Clone de Trello avec React et TypeScript

Une application de gestion de tâches inspirée de Trello, développée avec React, TypeScript, Redux Toolkit et Tailwind CSS.

## Fonctionnalités

- Création de plusieurs tableaux
- Ajout/suppression/modification de listes
- Ajout/suppression/modification de cartes
- Glisser-déposer des cartes entre les listes
- Interface réactive pour mobile et bureau
- Persistance des données avec localStorage

## Technologies utilisées

- React 18
- TypeScript
- Redux Toolkit pour la gestion d'état
- React Router pour la navigation
- React Beautiful DnD pour le glisser-déposer
- Tailwind CSS pour le style
- Heroicons pour les icônes

## Installation

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/votre-utilisateur/react-trello-clone.git
   cd react-trello-clone
   ```

2. Installer les dépendances :
   ```bash
   npm install
   ```

3. Démarrer l'application en mode développement :
   ```bash
   npm start
   ```

4. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Structure du projet

```
src/
├── app/                 # Configuration du store Redux
├── assets/              # Images et autres ressources
├── components/          # Composants réutilisables
├── features/            # Fonctionnalités (par domaine)
│   └── board/          # Fonctionnalité tableau
├── hooks/               # Hooks personnalisés
├── pages/               # Composants de page
├── types/               # Définitions de types TypeScript
├── utils/               # Utilitaires
├── App.tsx              # Composant racine
└── index.tsx            # Point d'entrée de l'application
```

## Déploiement

Pour créer une version de production :

```bash
npm run build
```

## Licence

Ce projet est sous licence MIT.

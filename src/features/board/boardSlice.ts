import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import { AppState, Board, Card, List } from '../../types';

const initialState: AppState = {
  boards: [
    {
      id: 'board-1',
      title: 'Projet Web - Tableau de bord',
    },
  ],
  lists: [
    { id: 'list-1', title: 'À faire', boardId: 'board-1' },
    { id: 'list-2', title: 'En cours', boardId: 'board-1' },
    { id: 'list-3', title: 'En révision', boardId: 'board-1' },
    { id: 'list-4', title: 'Terminé', boardId: 'board-1' },
  ],
  cards: [
    // Cartes dans 'À faire'
    {
      id: 'card-1',
      title: 'Créer la maquette Figma',
      description: 'Dessiner les maquettes pour les pages principales du tableau de bord',
      listId: 'list-1',
      status: 'todo',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      progress: 0,
      priority: 'high',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'card-2',
      title: 'Configurer le routeur React',
      description: 'Mettre en place la navigation entre les différentes vues de l\'application',
      listId: 'list-1',
      status: 'todo',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      progress: 0,
      priority: 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'card-4',
      title: 'Définir le schéma de base de données',
      description: 'Créer les modèles et relations pour les utilisateurs et les tableaux',
      listId: 'list-1',
      status: 'todo',
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      progress: 0,
      priority: 'high',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'card-5',
      title: 'Configurer ESLint et Prettier',
      description: 'Mettre en place la configuration pour le formatage et le linting du code',
      listId: 'list-1',
      status: 'todo',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      progress: 0,
      priority: 'low',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },

    // Cartes dans 'En cours'
    {
      id: 'card-3',
      title: 'Implémenter le header',
      description: 'Créer le composant header avec la navigation principale',
      listId: 'list-2',
      status: 'in_progress',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      progress: 30,
      priority: 'high',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'card-6',
      title: 'Créer le système d\'authentification',
      description: 'Mettre en place la connexion, inscription et gestion des sessions',
      listId: 'list-2',
      status: 'in_progress',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      progress: 45,
      priority: 'high',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'card-7',
      title: 'Développer le composant de carte',
      description: 'Créer un composant réutilisable pour afficher les cartes dans les listes',
      listId: 'list-2',
      status: 'in_progress',
      dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
      progress: 70,
      priority: 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'card-8',
      title: 'Configurer Redux Toolkit',
      description: 'Mettre en place le store Redux et les slices nécessaires',
      listId: 'list-2',
      status: 'in_progress',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      progress: 85,
      priority: 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },

    // Cartes dans 'En révision'
    {
      id: 'card-9',
      title: 'Page d\'accueil',
      description: 'Développer la page d\'accueil avec la liste des tableaux',
      listId: 'list-3',
      status: 'in_review',
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      progress: 100,
      priority: 'high',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'card-10',
      title: 'Système de thème sombre',
      description: 'Implémenter le basculement entre thème clair et sombre',
      listId: 'list-3',
      status: 'in_review',
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      progress: 100,
      priority: 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'card-11',
      title: 'Tests unitaires',
      description: 'Écrire des tests pour les composants principaux',
      listId: 'list-3',
      status: 'in_review',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      progress: 100,
      priority: 'low',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },

    // Cartes dans 'Terminé'
    {
      id: 'card-12',
      title: 'Mise en place du projet',
      description: 'Initialisation du projet avec Create React App et configuration initiale',
      listId: 'list-4',
      status: 'done',
      dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      progress: 100,
      priority: 'high',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'card-13',
      title: 'Choix des technologies',
      description: 'Sélectionner les bibliothèques et outils à utiliser',
      listId: 'list-4',
      status: 'done',
      dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      progress: 100,
      priority: 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'card-14',
      title: 'Cahier des charges',
      description: 'Rédiger les spécifications fonctionnelles et techniques',
      listId: 'list-4',
      status: 'done',
      dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      progress: 100,
      priority: 'high',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'card-15',
      title: 'Étude de marché',
      description: 'Analyser les solutions existantes et les fonctionnalités à implémenter',
      listId: 'list-4',
      status: 'done',
      dueDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      progress: 100,
      priority: 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    // Suppression des cartes en double avec les IDs 4, 5 et 6
  ],
  currentBoardId: 'board-1',
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    // Actions pour les tableaux
    addBoard: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const newBoard: Board = {
        id: action.payload.id,
        title: action.payload.title,
      };
      state.boards.push(newBoard);
      state.currentBoardId = newBoard.id;
    },
    
    setCurrentBoard: (state, action: PayloadAction<string>) => {
      state.currentBoardId = action.payload;
    },
    
    // Actions pour les listes
    addList: (state, action: PayloadAction<{ title: string; boardId: string }>) => {
      const newList: List = {
        id: `list-${Date.now()}`,
        title: action.payload.title,
        boardId: action.payload.boardId,
      };
      state.lists.push(newList);
    },
    
    // Actions pour les cartes
    addCard(
      state, 
      action: PayloadAction<{ 
        title: string; 
        listId: string;
        status?: 'todo' | 'in_progress' | 'in_review' | 'done';
        description?: string;
        dueDate?: string;
        progress?: number;
        priority?: 'low' | 'medium' | 'high';
        labels?: string[];
        assignees?: string[];
        createdAt?: string;
        updatedAt?: string;
      }>
    ) {
      const { 
        title, 
        listId, 
        status = 'todo',
        description = '',
        progress = 0,
        priority = 'medium',
        createdAt = new Date().toISOString(),
        updatedAt = new Date().toISOString()
      } = action.payload;
      
      const newCard: Card = {
        id: `card-${Date.now()}`,
        title,
        description,
        listId,
        status,
        progress,
        priority,
        createdAt,
        updatedAt
      };
      
      state.cards.push(newCard);
    },
    
    // Gestion du glisser-déposer
    moveCard: (
      state,
      action: PayloadAction<{ cardId: string; sourceListId: string; destinationListId: string; destinationIndex: number }>
    ) => {
      const { cardId, destinationListId } = action.payload;
      const card = state.cards.find(card => card.id === cardId);
      if (card) {
        card.listId = destinationListId;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCard, (state, action) => {
        const { id, updates } = action.payload;
        const cardIndex = state.cards.findIndex(card => card.id === id);
        if (cardIndex !== -1) {
          state.cards[cardIndex] = {
            ...state.cards[cardIndex],
            ...updates,
            updatedAt: new Date().toISOString()
          };
        }
      })
      .addCase(deleteCard, (state, action) => {
        const cardId = action.payload;
        state.cards = state.cards.filter(card => card.id !== cardId);
      });
  },
});

// Action pour mettre à jour une carte
const updateCard = createAction<{ 
  id: string; 
  updates: Partial<Card> 
}>('board/updateCard');

// Action pour supprimer une carte
const deleteCard = createAction<string>('board/deleteCard');

export const { addBoard, setCurrentBoard, addList, addCard, moveCard } = boardSlice.actions;

export { updateCard, deleteCard };
export default boardSlice.reducer;

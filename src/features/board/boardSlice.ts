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
    {
      id: 'card-1',
      title: 'Créer la maquette Figma',
      description: 'Dessiner les maquettes pour les pages principales du tableau de bord',
      listId: 'list-1',
      status: 'todo',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Dans 7 jours
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
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // Dans 5 jours
      progress: 0,
      priority: 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'card-3',
      title: 'Implémenter le header',
      description: 'Créer le composant header avec la navigation principale',
      listId: 'list-2',
      status: 'in_progress',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // Dans 3 jours
      progress: 30,
      priority: 'high',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'card-4',
      title: 'Style du formulaire de connexion',
      description: 'Appliquer le style CSS au formulaire de connexion utilisateur',
      listId: 'list-2',
      status: 'in_progress',
      dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 jours de retard
      progress: 80,
      priority: 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'card-5',
      title: 'Page d\'accueil',
      description: 'Finaliser le design et les animations de la page d\'accueil',
      listId: 'list-3',
      status: 'in_review',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // Dans 2 jours
      progress: 90,
      priority: 'high',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'card-6',
      title: 'Documentation API',
      description: 'Rédiger la documentation technique pour les développeurs',
      listId: 'list-4',
      status: 'done',
      dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // Hier
      progress: 100,
      priority: 'low',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
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

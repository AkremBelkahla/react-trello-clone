import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
      description: 'Dessiner les maquettes pour les pages principales',
      listId: 'list-1',
    },
    {
      id: 'card-2',
      title: 'Configurer le routeur React',
      description: 'Mettre en place la navigation entre les pages',
      listId: 'list-1',
    },
    {
      id: 'card-3',
      title: 'Implémenter le header',
      description: 'Créer le composant header avec la navigation',
      listId: 'list-2',
    },
    {
      id: 'card-4',
      title: 'Style du formulaire de connexion',
      description: 'Appliquer le style CSS au formulaire',
      listId: 'list-2',
    },
    {
      id: 'card-5',
      title: 'Page d\'accueil',
      description: 'Révision du design et des animations',
      listId: 'list-3',
    },
    {
      id: 'card-6',
      title: 'Documentation API',
      description: 'Rédiger la documentation pour les développeurs',
      listId: 'list-4',
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
    addCard: (state, action: PayloadAction<{ title: string; listId: string }>) => {
      const newCard: Card = {
        id: `card-${Date.now()}`,
        title: action.payload.title,
        listId: action.payload.listId,
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
});

export const { addBoard, setCurrentBoard, addList, addCard, moveCard } = boardSlice.actions;
export default boardSlice.reducer;

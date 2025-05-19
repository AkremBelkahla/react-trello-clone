import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState, Board, Card, List } from '../../types';

const initialState: AppState = {
  boards: [],
  lists: [],
  cards: [],
  currentBoardId: null,
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

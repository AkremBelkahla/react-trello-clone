import { configureStore } from '@reduxjs/toolkit';
import boardReducer from '../features/board/boardSlice';

// Charger l'état depuis le localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('trello-clone-state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Sauvegarder l'état dans le localStorage
const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('trello-clone-state', serializedState);
  } catch {
    // Ignorer les erreurs d'écriture
  }
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    board: boardReducer,
  },
  preloadedState,
});

// Sauvegarder l'état dans le localStorage à chaque modification
store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

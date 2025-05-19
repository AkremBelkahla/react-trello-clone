import { configureStore } from '@reduxjs/toolkit';
import boardReducer from '../features/board/boardSlice';
import { AppState } from '../types';

// Charger l'état depuis le localStorage
const loadState = (): Partial<{ board: AppState }> | undefined => {
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
const saveState = (state: { board: AppState }) => {
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
    board: boardReducer as (state: AppState | undefined, action: any) => AppState,
  },
  preloadedState,
});

// Sauvegarder l'état dans le localStorage à chaque modification
store.subscribe(() => {
  saveState(store.getState() as { board: AppState });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

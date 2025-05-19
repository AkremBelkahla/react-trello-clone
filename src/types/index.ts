export interface Card {
  id: string;
  title: string;
  description?: string;
  listId: string;
}

export interface List {
  id: string;
  title: string;
  boardId: string;
}

export interface Board {
  id: string;
  title: string;
}

export interface AppState {
  boards: Board[];
  lists: List[];
  cards: Card[];
  currentBoardId: string | null;
}

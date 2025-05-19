export interface Card {
  id: string;
  title: string;
  description?: string;
  listId: string;
  dueDate?: string; // Date au format ISO
  status?: 'todo' | 'in_progress' | 'in_review' | 'done';
  progress?: number; // 0-100
  labels?: string[];
  assignees?: string[];
  priority?: 'low' | 'medium' | 'high';
  createdAt?: string; // Date au format ISO
  updatedAt?: string; // Date au format ISO
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

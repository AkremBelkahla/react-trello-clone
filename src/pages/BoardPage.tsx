import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addList, addCard, moveCard } from '../features/board/boardSlice';
import List from '../components/List';

const BoardPage: React.FC = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [newListTitle, setNewListTitle] = useState('');
  
  const { boards, lists, cards } = useAppSelector((state) => state.board);
  
  // Trouver le tableau actuel
  const currentBoard = boards.find(board => board.id === boardId);
  
  // Si le tableau n'existe pas, rediriger vers la page d'accueil
  React.useEffect(() => {
    if (!currentBoard && boards.length > 0) {
      navigate('/');
    }
  }, [currentBoard, boards, navigate]);
  
  // Filtrer les listes pour le tableau actuel
  const boardLists = lists.filter(list => list.boardId === boardId);
  
  const handleAddList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListTitle.trim() || !boardId) return;
    
    dispatch(addList({
      title: newListTitle,
      boardId
    }));
    
    setNewListTitle('');
  };
  
  const handleAddCard = (listId: string, title: string) => {
    if (!title.trim()) return;
    dispatch(addCard({ title, listId }));
  };
  
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    
    // Si on a pas de destination, on ne fait rien
    if (!destination) return;
    
    // Si on déplace au même endroit, on ne fait rien
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    
    // Déplacer la carte
    dispatch(moveCard({
      cardId: draggableId,
      sourceListId: source.droppableId,
      destinationListId: destination.droppableId,
      destinationIndex: destination.index
    }));
  };
  
  if (!currentBoard) {
    return <div>Chargement...</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">{currentBoard.title}</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex overflow-x-auto pb-4">
            {boardLists.map((list) => (
              <List
                key={list.id}
                list={list}
                cards={cards.filter(card => card.listId === list.id)}
                onAddCard={handleAddCard}
              />
            ))}
            
            <div className="flex-shrink-0 w-64 bg-gray-100 rounded-lg p-3 ml-4">
              <form onSubmit={handleAddList}>
                <input
                  type="text"
                  value={newListTitle}
                  onChange={(e) => setNewListTitle(e.target.value)}
                  placeholder="Nouvelle liste..."
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="mt-2 flex">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                  >
                    Ajouter une liste
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewListTitle('')}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
              </form>
            </div>
          </div>
        </DragDropContext>
      </main>
    </div>
  );
};

export default BoardPage;

import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addList, addCard, moveCard } from '../features/board/boardSlice';
import List from '../components/List';

const BoardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [newListTitle, setNewListTitle] = useState('');
  
  const { boards, lists, cards } = useAppSelector((state) => state.board);
  
  // Utiliser le premier tableau disponible comme tableau par défaut
  const defaultBoardId = boards[0]?.id || 'board-1';
  
  // Filtrer les listes pour le tableau par défaut
  const boardLists = lists.filter(list => list.boardId === defaultBoardId);
  
  const handleAddList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListTitle.trim()) return;
    
    dispatch(addList({
      title: newListTitle,
      boardId: defaultBoardId
    }));
    
    setNewListTitle('');
  };
  
  const handleAddCard = (title: string, listId: string) => {
    if (!title.trim() || !listId) return;
    
    // Trouver la liste par son ID pour déterminer le statut par défaut
    const targetList = lists.find(list => list.id === listId);
    let status: 'todo' | 'in_progress' | 'in_review' | 'done' = 'todo';
    
    if (targetList) {
      // Déterminer le statut en fonction du nom de la liste
      if (targetList.title.includes('En cours')) status = 'in_progress';
      else if (targetList.title.includes('révision')) status = 'in_review';
      else if (targetList.title.includes('Terminé')) status = 'done';
    }
    
    dispatch(addCard({
      title,
      listId,
      status,
      priority: 'medium',
      progress: 0,
      description: ''
    }));
  };
  
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    
    // Si la destination n'existe pas ou si l'élément est déposé au même endroit
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }
    
    // Si c'est une carte qui est déplacée
    if (result.type === 'CARD') {
      dispatch(moveCard({
        cardId: draggableId,
        sourceListId: source.droppableId,
        destinationListId: destination.droppableId,
        destinationIndex: destination.index
      }));
    }
  };

  if (boards.length === 0) {
    return <div>Chargement du tableau...</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">{boards[0].title}</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex-1 p-4 overflow-x-auto">
            <div className="flex items-start gap-4">
              {boardLists.map((list) => {
                const listCards = cards
                  .filter(card => card.listId === list.id)
                  .sort((a, b) => {
                    // Trier les cartes par date de création (les plus récentes en premier)
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                  });
                  
                return (
                  <List 
                    key={list.id}
                    list={list}
                    cards={listCards}
                    onAddCard={handleAddCard}
                  />
                );
              })}
              
              {/* Formulaire pour ajouter une nouvelle liste */}
              <div className="w-64 flex-shrink-0">
                <form onSubmit={handleAddList} className="bg-gray-100 p-2 rounded-lg">
                  <input
                    type="text"
                    value={newListTitle}
                    onChange={(e) => setNewListTitle(e.target.value)}
                    placeholder="+ Ajouter une autre liste"
                    className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="mt-2 flex">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
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
          </div>
        </DragDropContext>
      </main>
    </div>
  );
};

export default BoardPage;

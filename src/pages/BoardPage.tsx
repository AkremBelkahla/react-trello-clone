import React, { useState, useRef } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { PlusIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { 
  addList, 
  addCard, 
  moveCard, 
  updateList, 
  deleteList 
} from '../features/board/boardSlice';
import List from '../components/List';
import '../index.css';

const BoardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [newListTitle, setNewListTitle] = useState('');
  const [showAddListForm, setShowAddListForm] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { boards, lists, cards } = useAppSelector((state) => state.board);
  
  // Utiliser le premier tableau disponible comme tableau par défaut
  const defaultBoardId = boards[0]?.id || 'board-1';
  
  // Filtrer les listes pour le tableau par défaut
  const boardLists = lists.filter(list => list.boardId === defaultBoardId);
  
  const handleAddList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListTitle.trim()) {
      setShowAddListForm(false);
      return;
    }
    
    dispatch(addList({
      title: newListTitle,
      boardId: defaultBoardId
    }));
    
    setNewListTitle('');
    setShowAddListForm(false);
  };
  
  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = 300; // Ajustez cette valeur selon vos besoins
      if (direction === 'left') {
        containerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };
  
  const handleAddCard = (title: string, listId: string) => {
    if (!title.trim()) return;
    
    const targetList = boardLists.find(list => list.id === listId);
    if (!targetList) return;
    
    let status: 'todo' | 'in_progress' | 'in_review' | 'done' = 'todo';
    
    // Déterminer le statut en fonction du nom de la liste
    if (targetList.title.includes('En cours')) status = 'in_progress';
    else if (targetList.title.includes('révision')) status = 'in_review';
    else if (targetList.title.includes('Terminé')) status = 'done';
    
    dispatch(addCard({
      title,
      listId,
      status,
      priority: 'medium',
      progress: 0,
      description: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
  };
  
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    // Si la destination n'existe pas ou si l'élément est déposé au même endroit
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }
    
    // Si c'est une carte qui est déplacée
    if (type === 'CARD') {
      dispatch(moveCard({
        cardId: draggableId,
        sourceListId: source.droppableId,
        destinationListId: destination.droppableId,
        destinationIndex: destination.index
      }));
    }
  };
  
  const handleUpdateList = (id: string, title: string) => {
    if (!title.trim()) return;
    dispatch(updateList({ id, title }));
  };

  const handleDeleteList = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette liste et toutes ses cartes ?')) {
      dispatch(deleteList({ id }));
    }
  };

  if (boards.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-dark-900 dark:to-dark-800">
        <div className="text-center p-6 bg-white dark:bg-dark-800 rounded-lg shadow-md">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300">Chargement du tableau...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-blue-gradient">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">{boards[0].title}</h1>
          <div className="flex items-center space-x-4">
            {!showAddListForm ? (
              <button
                onClick={() => setShowAddListForm(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm flex items-center"
              >
                <PlusIcon className="w-4 h-4 mr-1" />
                Ajouter une liste
              </button>
            ) : (
              <form onSubmit={handleAddList} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newListTitle}
                  onChange={(e) => setNewListTitle(e.target.value)}
                  placeholder="Nom de la liste"
                  className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 text-sm"
                >
                  Ajouter
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddListForm(false);
                    setNewListTitle('');
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </form>
            )}
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        <div className="relative">
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-dark-700 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-dark-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-dark-900 transition-colors duration-200"
            aria-label="Faire défiler vers la gauche"
          >
            <ChevronLeftIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-dark-700 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-dark-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-dark-900 transition-colors duration-200"
            aria-label="Faire défiler vers la droite"
          >
            <ChevronRightIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
          
          <DragDropContext onDragEnd={handleDragEnd}>
            <div 
              ref={containerRef}
              className="flex-1 p-4 overflow-x-auto scrollbar-hide"
            >
              <div className="flex items-start gap-4 w-max pb-2">
              {boardLists.map((list) => {
                const listCards = cards
                  .filter(card => card.listId === list.id)
                  .sort((a, b) => {
                    // Trier les cartes par date de création (les plus récentes en premier)
                    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                    return dateB - dateA;
                  });
                  
                return (
                  <List 
                    key={list.id}
                    list={list}
                    cards={listCards}
                    onAddCard={handleAddCard}
                    onUpdateList={handleUpdateList}
                    onDeleteList={handleDeleteList}
                  />
                );
              })}
              

            </div>
          </div>
        </DragDropContext>
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-dark-700 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-dark-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          aria-label="Faire défiler vers la droite"
        >
          <ChevronRightIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </main>
  </div>
  );
};

export default BoardPage;

import React, { useState, useRef, useEffect } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Card as CardType } from '../types';
import Card from './Card';
import { PlusIcon, XMarkIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface ListProps {
  list: {
    id: string;
    title: string;
    boardId: string;
  };
  cards: CardType[];
  onAddCard: (title: string, listId: string) => void;
  onUpdateList: (id: string, title: string) => void;
  onDeleteList: (id: string) => void;
}

const List: React.FC<ListProps> = ({ 
  list, 
  cards, 
  onAddCard, 
  onUpdateList, 
  onDeleteList 
}) => {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(list.title);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCardTitle.trim()) {
      setIsAddingCard(false);
      return;
    }
    
    onAddCard(newCardTitle, list.id);
    setNewCardTitle('');
    setIsAddingCard(false);
  };

  const handleUpdateList = () => {
    if (editedTitle.trim()) {
      onUpdateList(list.id, editedTitle);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUpdateList();
    } else if (e.key === 'Escape') {
      setEditedTitle(list.title);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [isEditing]);

  // Couleurs de fond pour les listes (mode clair et sombre)
  const listColors = [
    { light: 'bg-blue-100', dark: 'bg-blue-900 bg-opacity-30' },
    { light: 'bg-green-100', dark: 'bg-green-900 bg-opacity-30' },
    { light: 'bg-yellow-100', dark: 'bg-yellow-900 bg-opacity-30' },
    { light: 'bg-purple-100', dark: 'bg-purple-900 bg-opacity-30' },
    { light: 'bg-pink-100', dark: 'bg-pink-900 bg-opacity-30' },
  ];
  
  // Sélectionner une couleur en fonction de l'ID de la liste
  const colorIndex = list.id.charCodeAt(list.id.length - 1) % listColors.length;
  const listColor = `dark:${listColors[colorIndex].dark} ${listColors[colorIndex].light}`;

  return (
    <div className={`flex-shrink-0 w-72 rounded-lg p-2 ${listColor}`}>
      <div className="flex justify-between items-center mb-2 p-1">
        {isEditing ? (
          <div className="mt-2 transition-all duration-200">
            <input
              ref={titleInputRef}
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={handleUpdateList}
              onKeyDown={handleKeyDown}
              className="w-full px-2 py-1 text-sm font-medium rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ) : (
          <h3 
            className="font-medium text-sm text-gray-800 flex-1 cursor-text"
            onClick={() => setIsEditing(true)}
          >
            {list.title}
          </h3>
        )}
        <div className="flex items-center space-x-1">
          <span className="text-xs text-gray-500 bg-white bg-opacity-50 px-2 py-0.5 rounded">
            {cards.length}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(!isEditing);
              if (isEditing) {
                setEditedTitle(list.title);
              }
            }}
            className="text-gray-500 hover:text-blue-600 p-1 rounded hover:bg-gray-200"
            title="Modifier la liste"
          >
            {isEditing ? (
              <XMarkIcon className="h-4 w-4" />
            ) : (
              <PencilIcon className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm('Êtes-vous sûr de vouloir supprimer cette liste et toutes ses cartes ?')) {
                onDeleteList(list.id);
              }
            }}
            className="text-gray-500 hover:text-red-600 p-1 rounded hover:bg-gray-200"
            title="Supprimer la liste"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <Droppable droppableId={list.id} type="CARD">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-2 min-h-[10px] py-1"
          >
            {cards.map((card, index) => (
              <Draggable key={card.id} draggableId={card.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-white dark:bg-dark-700 rounded shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <Card card={card} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            
            {isAddingCard && (
              <form onSubmit={handleAddCard} className="mt-1">
                <div className="bg-white dark:bg-dark-700 rounded shadow-sm p-2">
                  <textarea
                    value={newCardTitle}
                    onChange={(e) => setNewCardTitle(e.target.value)}
                    placeholder="Saisissez un titre pour cette carte…"
                    className="w-full p-2 text-sm rounded border border-gray-300 dark:border-dark-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-white mb-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    rows={3}
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        setIsAddingCard(false);
                        setNewCardTitle('');
                      }
                    }}
                  />
                  <div className="flex items-center">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-dark-800 shadow-sm"
                    >
                      Ajouter une carte
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingCard(false);
                        setNewCardTitle('');
                      }}
                      className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors duration-200"
                      aria-label="Annuler"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        )}
      </Droppable>

      {!isAddingCard && (
        <button
          onClick={() => setIsAddingCard(true)}
          className="w-full text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600 p-2 rounded flex items-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-dark-900"
          aria-label="Ajouter une carte"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          {cards.length === 0 ? 'Ajouter une carte' : 'Ajouter une autre carte'}
        </button>
      )}
    </div>
  );
};

export default List;

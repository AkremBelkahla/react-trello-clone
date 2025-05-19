import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Card as CardType } from '../types';
import Card from './Card';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ListProps {
  list: {
    id: string;
    title: string;
  };
  cards: CardType[];
  onAddCard: (title: string, listId: string) => void;
}

const List: React.FC<ListProps> = ({ list, cards, onAddCard }) => {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');

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

  // Couleurs de fond pour les listes (comme sur l'image de référence)
  const listColors = {
    'À faire': 'bg-blue-50',
    'En cours': 'bg-yellow-50',
    'En révision': 'bg-purple-50',
    'Terminé': 'bg-green-50'
  };

  // @ts-ignore - On ignore l'erreur de typage pour la couleur de la liste
  const listColor = listColors[list.title] || 'bg-gray-50';

  return (
    <div className={`flex-shrink-0 w-72 rounded-lg p-2 ${listColor}`}>
      <div className="flex justify-between items-center mb-2 p-1">
        <h3 className="font-medium text-sm text-gray-800">{list.title}</h3>
        <span className="text-xs text-gray-500 bg-white bg-opacity-50 px-2 py-0.5 rounded">
          {cards.length}
        </span>
      </div>
      
      <Droppable droppableId={list.id} type="CARD">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-2 min-h-[10px]"
          >
            {cards.map((card, index) => (
              <Draggable key={card.id} draggableId={card.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card card={card} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            
            {isAddingCard && (
              <form onSubmit={handleAddCard} className="mt-1">
                <textarea
                  value={newCardTitle}
                  onChange={(e) => setNewCardTitle(e.target.value)}
                  placeholder="Saisissez un titre pour cette carte…"
                  className="w-full p-2 text-sm rounded border border-gray-300 mb-1 resize-none"
                  rows={3}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setIsAddingCard(false);
                    }
                  }}
                />
                <div className="flex items-center">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-blue-600 transition-colors"
                  >
                    Ajouter une carte
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingCard(false)}
                    className="ml-2 text-gray-500 hover:text-gray-700 p-1"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </Droppable>

      {!isAddingCard && (
        <button
          onClick={() => setIsAddingCard(true)}
          className="mt-2 w-full text-gray-600 hover:bg-gray-200 py-2 px-2 rounded text-sm flex items-center justify-start"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          <span>Ajouter une carte</span>
        </button>
      )}
    </div>
  );
};

export default List;

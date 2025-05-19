import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Card as CardType } from '../types';
import Card from './Card';
import { PlusIcon } from '@heroicons/react/24/outline';

interface ListProps {
  list: {
    id: string;
    title: string;
  };
  cards: CardType[];
  onAddCard: (listId: string, title: string) => void;
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
    
    onAddCard(list.id, newCardTitle);
    setNewCardTitle('');
    setIsAddingCard(false);
  };

  return (
    <div className="flex-shrink-0 w-64 bg-gray-100 rounded-lg p-3 mr-4">
      <h3 className="font-semibold mb-3 text-gray-800">{list.title}</h3>
      
      <Droppable droppableId={list.id} type="CARD">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-2 min-h-[20px]"
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
          </div>
        )}
      </Droppable>

      {isAddingCard ? (
        <form onSubmit={handleAddCard} className="mt-3">
          <input
            type="text"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            placeholder="Saisissez un titre pour cette carte..."
            className="w-full p-2 text-sm border rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            autoFocus
          />
          <div className="flex mt-2">
            <button
              type="submit"
              className="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600 transition-colors"
            >
              Ajouter une carte
            </button>
            <button
              type="button"
              onClick={() => setIsAddingCard(false)}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsAddingCard(true)}
          className="w-full mt-2 flex items-center text-sm text-gray-600 hover:bg-gray-200 p-2 rounded transition-colors"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          <span>Ajouter une carte</span>
        </button>
      )}
    </div>
  );
};

export default List;

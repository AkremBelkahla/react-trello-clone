import React, { useState } from 'react';
import { Card as CardType } from '../types';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface CardProps {
  card: CardType;
}

const Card: React.FC<CardProps> = ({ card }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [showActions, setShowActions] = useState(false);

  const handleSave = () => {
    // TODO: Implémenter la mise à jour de la carte
    setIsEditing(false);
  };

  const handleDelete = () => {
    // TODO: Implémenter la suppression de la carte
  };

  if (isEditing) {
    return (
      <div className="bg-white p-3 rounded shadow mb-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          autoFocus
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') {
              setTitle(card.title);
              setIsEditing(false);
            }
          }}
        />
      </div>
    );
  }

  return (
    <div 
      className="bg-white p-3 rounded shadow mb-2 hover:bg-gray-50 relative group"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <p className="text-sm text-gray-800">{card.title}</p>
      
      {showActions && (
        <div className="absolute right-1 top-1 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 text-gray-500 hover:bg-gray-200 rounded"
            title="Modifier"
          >
            <PencilIcon className="h-3 w-3" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 text-gray-500 hover:bg-red-100 hover:text-red-600 rounded"
            title="Supprimer"
          >
            <TrashIcon className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;

import React, { useState } from 'react';
import { Card as CardType } from '../types';
import { PencilIcon, TrashIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface CardProps {
  card: CardType;
}

const Card: React.FC<CardProps> = ({ card }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Fonctions de placeholder pour les actions
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Implémenter l'édition
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Implémenter la suppression
  };

  // Déterminer si la carte a une date d'échéance
  const hasDueDate = Boolean(card.dueDate);
  const isOverdue = hasDueDate && card.dueDate ? new Date(card.dueDate) < new Date() : false;
  
  // Couleur de la pastille en fonction de l'état
  const getStatusColor = () => {
    if (card.status === 'done') return 'bg-green-100 text-green-700';
    if (isOverdue) return 'bg-red-100 text-red-700';
    return 'bg-gray-100 text-gray-700';
  };
  
  // Couleur de la priorité
  const getPriorityColor = () => {
    switch (card.priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  
  // Texte de la priorité
  const getPriorityText = () => {
    switch (card.priority) {
      case 'high':
        return 'Haute';
      case 'medium':
        return 'Moyenne';
      case 'low':
        return 'Basse';
      default:
        return 'Non définie';
    }
  };
  
  // Formater la date
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 mb-2 hover:shadow-md transition-shadow cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* En-tête de la carte avec titre et actions */}
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-sm font-medium text-gray-900">{card.title}</h4>
        {isHovered && (
          <div className="flex space-x-1">
            <button 
              onClick={handleEdit}
              className="text-gray-400 hover:text-blue-500 p-1"
              title="Modifier"
            >
              <PencilIcon className="h-3.5 w-3.5" />
            </button>
            <button 
              onClick={handleDelete}
              className="text-gray-400 hover:text-red-500 p-1"
              title="Supprimer"
            >
              <TrashIcon className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Description */}
      {card.description && (
        <p className="text-xs text-gray-600 mb-2 line-clamp-2">
          {card.description}
        </p>
      )}

      {/* Badge d'état */}
      {card.status && (
        <div className="flex items-center mb-2">
          <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor()}`}>
            {card.status === 'done' ? 'Terminé' : 'En cours'}
          </span>
        </div>
      )}

      {/* Date d'échéance */}
      {hasDueDate && card.dueDate && (
        <div className="flex items-center text-xs text-gray-500 mt-2">
          <ClockIcon className={`h-3.5 w-3.5 mr-1 ${isOverdue ? 'text-red-500' : 'text-gray-400'}`} />
          <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
            {formatDate(card.dueDate)}
          </span>
        </div>
      )}

      {/* Barre de progression (exemple) */}
      {card.progress !== undefined && (
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
            <div 
              className="bg-blue-500 h-1.5 rounded-full" 
              style={{ width: `${card.progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Progression</span>
            <span>{card.progress}%</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;

import React, { useState } from 'react';
import { Card as CardType } from '../types';
import { PencilIcon, TrashIcon, ClockIcon } from '@heroicons/react/24/outline';
import CardModal from './CardModal';
import { useAppDispatch } from '../app/hooks';
import { updateCard, deleteCard } from '../features/board/boardSlice';

interface CardProps {
  card: CardType;
}

const Card: React.FC<CardProps> = ({ card }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  
  const handleCardClick = () => {
    setIsModalOpen(true);
  };
  
  const handleSave = (updates: Partial<CardType>) => {
    dispatch(updateCard({ 
      id: card.id, 
      updates 
    }));
  };
  
  const handleDelete = () => {
    dispatch(deleteCard(card.id));
  };

  // Fonctions de placeholder pour les actions
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette carte ?')) {
      dispatch(deleteCard(card.id));
    }
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
    <React.Fragment>
      <div
        className={`bg-white rounded-lg shadow-sm p-3 mb-2 cursor-pointer hover:shadow-md transition-shadow duration-200 ${
          isHovered ? 'ring-2 ring-blue-300' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        {/* En-tête de la carte avec titre et actions */}
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-sm font-medium text-gray-900">{card.title}</h4>
          {isHovered && (
            <div className="flex space-x-1">
              <button 
                onClick={handleEditClick}
                className="text-gray-400 hover:text-blue-500 p-1"
                title="Modifier"
              >
                <PencilIcon className="h-3.5 w-3.5" />
              </button>
              <button 
                onClick={handleDeleteClick}
                className="text-gray-400 hover:text-red-500 p-1"
                title="Supprimer"
              >
                <TrashIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {/* Badge d'état */}
          {card.status && (
            <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor()}`}>
              {card.status === 'done' ? 'Terminé' : 
               card.status === 'in_progress' ? 'En cours' :
               card.status === 'in_review' ? 'En révision' : 'À faire'}
            </span>
          )}
          
          {/* Badge de priorité */}
          {card.priority && (
            <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor()}`}>
              {getPriorityText()}
            </span>
          )}
        </div>

        {/* Date d'échéance */}
        {hasDueDate && card.dueDate && (
          <div className="flex items-center text-xs text-gray-500 mt-2">
            <ClockIcon className={`h-3.5 w-3.5 mr-1 ${isOverdue ? 'text-red-500' : 'text-gray-400'}`} />
            <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
              {formatDate(card.dueDate)}
            </span>
          </div>
        )}

        {/* Barre de progression */}
        {card.progress !== undefined && (
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
              <div 
                className="bg-blue-500 h-1.5 rounded-full" 
                style={{ width: `${card.progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Progression</span>
              <span>{card.progress}%</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Modale d'édition */}
      {isModalOpen && (
        <CardModal
          card={card}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          onDelete={() => dispatch(deleteCard(card.id))}
        />
      )}
    </React.Fragment>
  );
};

export default Card;

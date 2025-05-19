import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addBoard, setCurrentBoard } from '../features/board/boardSlice';

const HomePage: React.FC = () => {
  const [newBoardTitle, setNewBoardTitle] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { boards } = useAppSelector((state) => state.board);

  const handleAddBoard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBoardTitle.trim()) return;
    
    const action = addBoard({ title: newBoardTitle });
    dispatch(action);
    
    // Naviguer vers le nouveau tableau
    const newBoardId = action.payload.id;
    navigate(`/board/${newBoardId}`);
    
    // Réinitialiser le champ
    setNewBoardTitle('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Tableaux</h1>
      
      <div className="mb-8">
        <form onSubmit={handleAddBoard} className="flex items-center">
          <input
            type="text"
            value={newBoardTitle}
            onChange={(e) => setNewBoardTitle(e.target.value)}
            placeholder="Créer un nouveau tableau..."
            className="flex-1 p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition-colors"
          >
            Créer
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {boards.map((board) => (
          <div
            key={board.id}
            onClick={() => {
              dispatch(setCurrentBoard(board.id));
              navigate(`/board/${board.id}`);
            }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          >
            <h2 className="text-xl font-semibold">{board.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

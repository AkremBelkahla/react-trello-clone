import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BoardPage from './pages/BoardPage';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Routes>
        <Route path="/" element={<BoardPage />} />
        <Route path="*" element={<BoardPage />} />
      </Routes>
    </div>
  );
};

export default App;

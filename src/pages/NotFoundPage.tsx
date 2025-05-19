import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page non trouvée</h2>
      <p className="text-gray-600 mb-8 text-center">
        La page que vous recherchez semble introuvable.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default NotFoundPage;

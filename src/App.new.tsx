import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { 
  MoonIcon, 
  SunIcon, 
  ComputerDesktopIcon 
} from '@heroicons/react/24/outline';
import BoardPage from './pages/BoardPage';

type ThemePreference = 'light' | 'dark' | 'system';

const App: React.FC = () => {
  const [themePreference, setThemePreference] = useState<ThemePreference>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('themePreference') as ThemePreference) || 'system';
    }
    return 'system';
  });

  // Fonction pour vérifier si le thème sombre est actif
  const isDarkMode = useCallback((): boolean => {
    if (themePreference === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return themePreference === 'dark';
  }, [themePreference]);

  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>(isDarkMode() ? 'dark' : 'light');

  // Appliquer le thème au chargement et lors des changements
  useEffect(() => {
    const darkMode = isDarkMode();
    setCurrentTheme(darkMode ? 'dark' : 'light');
    
    // Mettre à jour la classe du document
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
    
    // Stocker la préférence
    localStorage.setItem('themePreference', themePreference);
    
    // Pour la rétrocompatibilité
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    
    // Définir les attributs pour les transitions fluides
    document.documentElement.style.setProperty('--color-transition', 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease');
  }, [themePreference, isDarkMode]);
  
  // Écouter les changements de préférence système
  useEffect(() => {
    if (themePreference === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        const darkMode = isDarkMode();
        setCurrentTheme(darkMode ? 'dark' : 'light');
        if (darkMode) {
          document.documentElement.classList.add('dark');
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          document.documentElement.setAttribute('data-theme', 'light');
        }
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [themePreference, isDarkMode]);

  // Fonction pour définir le thème
  const setTheme = (theme: ThemePreference) => {
    setThemePreference(theme);
  };
  
  // Rendu du sélecteur de thème
  const renderThemeSelector = () => {
    // Vérifier si nous sommes côté client avant d'accéder à window
    if (typeof window === 'undefined') return null;
    
    return (
      <div className="fixed top-4 right-4 z-50">
        <div className="relative group">
          <button
            className="p-2 rounded-full bg-white/80 dark:bg-dark-700/80 backdrop-blur-sm shadow-lg hover:bg-gray-100 dark:hover:bg-dark-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:ring-offset-dark-900"
            aria-label="Changer le thème"
            aria-expanded={false}
            aria-haspopup="true"
          >
            {currentTheme === 'dark' ? (
              <MoonIcon className="h-5 w-5 text-blue-400" />
            ) : (
              <SunIcon className="h-5 w-5 text-yellow-500" />
            )}
          </button>
          
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-dark-700 ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 z-50">
            <div className="py-1">
              <button
                onClick={() => setTheme('light')}
                className={`w-full text-left px-4 py-2 text-sm flex items-center ${
                  themePreference === 'light' 
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-600'
                }`}
              >
                <SunIcon className="h-4 w-4 mr-2" />
                <span>Clair</span>
                {themePreference === 'light' && (
                  <span className="ml-auto">✓</span>
                )}
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`w-full text-left px-4 py-2 text-sm flex items-center ${
                  themePreference === 'dark' 
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-600'
                }`}
              >
                <MoonIcon className="h-4 w-4 mr-2" />
                <span>Sombre</span>
                {themePreference === 'dark' && (
                  <span className="ml-auto">✓</span>
                )}
              </button>
              <button
                onClick={() => setTheme('system')}
                className={`w-full text-left px-4 py-2 text-sm flex items-center ${
                  themePreference === 'system' 
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-600'
                }`}
              >
                <ComputerDesktopIcon className="h-4 w-4 mr-2" />
                <span>Système</span>
                {themePreference === 'system' && (
                  <span className="ml-auto">✓</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-[background-color,color] duration-300 ${
      currentTheme === 'dark' 
        ? 'bg-dark-900 text-gray-100' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      {renderThemeSelector()}
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<BoardPage />} />
          <Route path="/board/:boardId" element={<BoardPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;

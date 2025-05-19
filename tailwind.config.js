/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Active le mode sombre basé sur les classes
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs personnalisées pour le thème sombre
        dark: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
          // Nouvelles couleurs pour le thème sombre
          'main': '#1a1a1a',
          'secondary': '#2d2d2d',
          'card': '#333333',
          'input': '#404040',
          'border': '#404040',
        },
        // Couleurs d'accent pour le thème sombre
        accent: {
          blue: '#3b82f6',
          green: '#10b981',
          red: '#ef4444',
          yellow: '#f59e0b',
          purple: '#8b5cf6',
        },
      },
      // Extension des couleurs de fond
      backgroundColor: {
        'dark-main': 'var(--color-dark-main, #1a1a1a)',
        'dark-secondary': 'var(--color-dark-secondary, #2d2d2d)',
        'dark-card': 'var(--color-dark-card, #333333)',
        'dark-input': 'var(--color-dark-input, #404040)',
      },
      // Extension des couleurs de texte
      textColor: {
        'dark-primary': 'var(--color-dark-primary, #f3f4f6)',
        'dark-secondary': 'var(--color-dark-secondary, #d1d5db)',
        'dark-muted': 'var(--color-dark-muted, #9ca3af)',
      },
      // Extension des couleurs de bordure
      borderColor: {
        'dark': 'var(--color-dark-border, #404040)',
      },
      // Animation pour les transitions en douceur
      transitionProperty: {
        'colors': 'background-color, border-color, color, fill, stroke',
      },
      // Extension des ombres pour le thème sombre
      boxShadow: {
        'dark-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.25)',
        'dark': '0 4px 6px -1px rgba(0, 0, 0, 0.25), 0 2px 4px -1px rgba(0, 0, 0, 0.15)',
        'dark-md': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.35), 0 4px 6px -2px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
      backgroundColor: ['active', 'hover', 'focus', 'dark'],
      textColor: ['active', 'hover', 'focus', 'dark'],
      borderColor: ['active', 'hover', 'focus', 'dark'],
      ringColor: ['active', 'hover', 'focus', 'dark'],
      ringWidth: ['active', 'hover', 'focus', 'dark'],
      ringOffsetWidth: ['active', 'hover', 'focus', 'dark'],
      ringOffsetColor: ['active', 'hover', 'focus', 'dark'],
      boxShadow: ['active', 'hover', 'focus', 'dark'],
      scale: ['active', 'hover', 'focus', 'group-hover'],
      translate: ['active', 'hover', 'focus', 'group-hover'],
    },
  },
  plugins: [],
}

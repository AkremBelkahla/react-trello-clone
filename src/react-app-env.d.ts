/// <reference types="react-scripts" />

// Déclaration pour résoudre l'erreur de typage de react/jsx-runtime
declare module 'react/jsx-runtime' {
  const content: any;
  export default content;
}

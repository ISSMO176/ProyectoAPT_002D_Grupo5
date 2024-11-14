// context/ThemeContext.js
import React, { createContext, useEffect, useState } from 'react';

// Crear el contexto del tema
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

  useEffect(() => {
    // Definir mediaQuery dentro del useEffect para evitar problemas de referencia
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setIsDarkMode(e.matches);

    mediaQuery.addEventListener('change', handleChange);

    // Limpiar el listener cuando el componente se desmonta
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Cambiar la clase del body cada vez que el tema cambia
  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-theme' : 'light-theme';
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

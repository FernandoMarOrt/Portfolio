import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe ser usado dentro de ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [showStars, setShowStars] = useState(true); // Por defecto mostrar estrellas

  useEffect(() => {
    const savedStars = localStorage.getItem('portfolio-stars');
    if (savedStars !== null) {
      setShowStars(savedStars === 'true');
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('portfolio-stars', showStars.toString());
  }, [showStars]);

  const toggleStars = () => {
    setShowStars(prev => !prev);
  };

  const value = {
    showStars,
    toggleStars,
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

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
  const [isDark, setIsDark] = useState(true); // Por defecto modo oscuro como tu portafolio actual
  const [showStars, setShowStars] = useState(true); // Por defecto mostrar estrellas

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    const savedStars = localStorage.getItem('portfolio-stars');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
    if (savedStars !== null) {
      setShowStars(savedStars === 'true');
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('portfolio-stars', showStars.toString());
    
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDark, showStars]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const toggleStars = () => {
    setShowStars(!showStars);
  };

  const value = {
    isDark,
    showStars,
    toggleTheme,
    toggleStars,
    theme: isDark ? 'dark' : 'light'
  };
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

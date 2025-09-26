import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Theme, themes } from '../types';

interface ThemeContextType {
  theme: Theme;
  setTheme: (name: string) => void;
}

const defaultTheme = themes[0];

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  setTheme: (name: string) => {},
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const savedThemeName = localStorage.getItem('math-quiz-theme');
    const savedTheme = themes.find(t => t.name === savedThemeName);
    if (savedTheme) {
      setThemeState(savedTheme);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    for (const [key, value] of Object.entries(theme.colors)) {
      // FIX: Cast `value` to string to resolve 'unknown' type error.
      root.style.setProperty(`--color-${key}`, value as string);
    }
    localStorage.setItem('math-quiz-theme', theme.name);
  }, [theme]);

  const setTheme = (name: string) => {
    const newTheme = themes.find(t => t.name === name);
    if (newTheme) {
      setThemeState(newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
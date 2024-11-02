"use client";
import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(false);

  // Check localStorage for theme preference on initial load
  useEffect(() => {
    if (window !== undefined) {
      const savedTheme = localStorage.getItem("dark-theme");
      if (savedTheme) {
        setDark(JSON.parse(savedTheme));
      }
    }
  }, []);

  // Save theme preference to localStorage when it changes
  useEffect(() => {
    if (window !== undefined) {
      localStorage.setItem("dark-theme", JSON.stringify(dark));
    }
  }, [dark]);

  const toggleTheme = () => {
    setDark(!dark);
  };

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

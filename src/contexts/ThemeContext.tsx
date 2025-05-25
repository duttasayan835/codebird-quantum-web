
import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "matrix" | "cyberpunk" | "neon" | "space";

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themeClasses: string;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const themeConfigs = {
  matrix: {
    classes: "bg-gradient-to-br from-green-900 via-black to-green-800",
    primary: "#00ff41",
    secondary: "#008f11"
  },
  cyberpunk: {
    classes: "bg-gradient-to-br from-pink-900 via-purple-900 to-cyan-900",
    primary: "#ff0080", 
    secondary: "#00ffff"
  },
  neon: {
    classes: "bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900",
    primary: "#8b5cf6",
    secondary: "#06b6d4"
  },
  space: {
    classes: "bg-gradient-to-br from-gray-900 via-purple-900 to-black",
    primary: "#8b5cf6",
    secondary: "#f0abfc"
  }
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("space");

  useEffect(() => {
    const savedTheme = localStorage.getItem("codebird-theme") as Theme;
    if (savedTheme && Object.keys(themeConfigs).includes(savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("codebird-theme", theme);
    
    // Update CSS custom properties for the theme
    const config = themeConfigs[theme];
    document.documentElement.style.setProperty('--theme-primary', config.primary);
    document.documentElement.style.setProperty('--theme-secondary', config.secondary);
  }, [theme]);

  const value = {
    theme,
    setTheme,
    themeClasses: themeConfigs[theme].classes
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

import React, { createContext, useContext, useEffect, useState } from 'react';
import useLocalStorage from '../hooks/utils/useLocalStorage';

type ThemeContextType = {
  isThemeDark?: boolean;
  toggleTheme?: () => void;
};

const ThemeContext = createContext<ThemeContextType>({});

const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isThemeDark, setIsThemeDark] = useState<boolean>(
    useLocalStorage(false, 'theme'),
  );

  const toggleTheme = () => {
    setIsThemeDark((mode) => !mode);
  };

  useEffect(() => {
    if (isThemeDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [isThemeDark]);

  return (
    <ThemeContext.Provider value={{ isThemeDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const { toggleTheme } = useContext(ThemeContext);
  return toggleTheme;
};
export default ThemeContextProvider;

import React, { createContext, ReactNode } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import type { Language, WebsiteData } from '../types';
import { initialWebsiteData } from '../data/initialData';

interface AppContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  websiteData: WebsiteData;
  setWebsiteData: React.Dispatch<React.SetStateAction<WebsiteData>>;
}

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useLocalStorage<Language>('language', 'en');
  const [websiteData, setWebsiteData] = useLocalStorage<WebsiteData>('websiteData', initialWebsiteData);

  return (
    <AppContext.Provider value={{ language, setLanguage, websiteData, setWebsiteData }}>
      {children}
    </AppContext.Provider>
  );
};
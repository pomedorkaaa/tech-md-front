import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface FavoritesContextType {
  savedJobIds: string[];
  toggleFavorite: (jobId: string) => void;
  isFavorite: (jobId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('tech_moldova_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('tech_moldova_favorites', JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  const toggleFavorite = (jobId: string) => {
    setSavedJobIds(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId) 
        : [...prev, jobId]
    );
  };

  const isFavorite = (jobId: string) => savedJobIds.includes(jobId);

  return (
    <FavoritesContext.Provider value={{ savedJobIds, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}

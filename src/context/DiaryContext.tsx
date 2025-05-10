import React, { createContext, useContext, useState, useEffect } from 'react';
import { DiaryEntryType } from '../types';

interface DiaryContextType {
  entries: DiaryEntryType[];
  addEntry: (entry: DiaryEntryType) => void;
  removeEntry: (id: string) => void;
}

const DiaryContext = createContext<DiaryContextType | undefined>(undefined);

export const DiaryProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [entries, setEntries] = useState<DiaryEntryType[]>([]);
  useEffect(() => {
    const savedEntries = localStorage.getItem('diaryEntries');
    if (savedEntries) {
      try {
        setEntries(JSON.parse(savedEntries));
      } catch (error) {
        console.error('Failed to parse saved entries:', error);
      }
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = (entry: DiaryEntryType) => {
    setEntries(prevEntries => [entry, ...prevEntries]);
  };

  const removeEntry = (id: string) => {
    setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
  };

  return (
    <DiaryContext.Provider value={{ entries, addEntry, removeEntry }}>
      {children}
    </DiaryContext.Provider>
  );
};

export const useDiary = (): DiaryContextType => {
  const context = useContext(DiaryContext);
  if (context === undefined) {
    throw new Error('useDiary must be used within a DiaryProvider');
  }
  return context;
};
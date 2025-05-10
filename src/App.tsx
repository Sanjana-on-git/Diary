import React from 'react';
import { BookOpen } from 'lucide-react';
import DiaryLayout from './components/DiaryLayout';
import { DiaryProvider } from './context/DiaryContext';

function App() {
  return (
    <DiaryProvider>
      <div className="min-h-screen bg-amber-50 text-gray-800 flex flex-col">
        <header className="p-4 bg-amber-100 shadow-sm">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-amber-800" />
              <h1 className="text-xl font-serif font-semibold text-amber-900">My Diary</h1>
            </div>
          </div>
        </header>
        
        <main className="flex-grow container mx-auto p-4">
          <DiaryLayout />
        </main>
        
        <footer className="bg-amber-100 py-3 text-center text-sm text-amber-800">
          <p>Your personal diary — {new Date().getFullYear()}</p>
        </footer>
      </div>
    </DiaryProvider>
  );
}

export default App;
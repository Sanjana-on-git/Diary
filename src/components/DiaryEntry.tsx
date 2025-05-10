import React from 'react';
import { Calendar } from 'lucide-react';
import { DiaryEntryType } from '../types';

interface DiaryEntryProps {
  entry: DiaryEntryType;
}

const DiaryEntry: React.FC<DiaryEntryProps> = ({ entry }) => {
  const formattedDate = new Date(entry.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-semibold text-amber-800">{entry.title}</h2>
        <div className="flex items-center text-amber-600 text-sm">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{formattedDate}</span>
        </div>
      </div>
      
      <div className="w-full aspect-video overflow-hidden rounded-lg shadow-md bg-gray-100">
        {entry.photoUrl ? (
          <img 
            src={entry.photoUrl} 
            alt={entry.title} 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image available
          </div>
        )}
      </div>
      
      <div className="prose max-w-none text-gray-700">
        <p className="whitespace-pre-line leading-relaxed">{entry.content}</p>
      </div>
      
      {entry.mood && (
        <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
          Mood: {entry.mood}
        </div>
      )}
    </div>
  );
};

export default DiaryEntry;
import React, { useState, useEffect } from 'react';
import { Edit2 } from 'lucide-react';

const CoverPage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [coverTitle, setCoverTitle] = useState('My Personal Diary');
  const [coverMessage, setCoverMessage] = useState('Why I started this journey...');

  // Load saved cover information
  useEffect(() => {
    const savedTitle = localStorage.getItem('diaryTitle');
    const savedMessage = localStorage.getItem('diaryMessage');
    
    if (savedTitle) setCoverTitle(savedTitle);
    if (savedMessage) setCoverMessage(savedMessage);
  }, []);

  // Save cover information
  const saveCoverInfo = () => {
    localStorage.setItem('diaryTitle', coverTitle);
    localStorage.setItem('diaryMessage', coverMessage);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-full max-w-md text-center">
        {isEditing ? (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <label htmlFor="cover-title" className="block text-sm font-medium text-amber-700">
                Diary Title
              </label>
              <input
                id="cover-title"
                type="text"
                value={coverTitle}
                onChange={(e) => setCoverTitle(e.target.value)}
                className="w-full p-2 border border-amber-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="cover-message" className="block text-sm font-medium text-amber-700">
                Your Message
              </label>
              <textarea
                id="cover-message"
                value={coverMessage}
                onChange={(e) => setCoverMessage(e.target.value)}
                rows={6}
                className="w-full p-2 border border-amber-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            
            <button
              onClick={saveCoverInfo}
              className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
            >
              Save Cover
            </button>
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={() => setIsEditing(true)}
              className="absolute top-0 right-0 p-2 text-amber-600 hover:text-amber-800"
              aria-label="Edit cover"
            >
              <Edit2 className="h-5 w-5" />
            </button>
            
            <div className="py-10 space-y-8">
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-amber-800 leading-tight">
                {coverTitle}
              </h1>
              
              <div className="w-16 h-1 bg-amber-600 mx-auto"></div>
              
              <p className="text-lg italic text-amber-700 whitespace-pre-line">
                {coverMessage}
              </p>
              
              <p className="text-sm text-amber-600 mt-10">
                Started on {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoverPage;
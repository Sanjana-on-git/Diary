import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useDiary } from '../context/DiaryContext';

interface NewEntryFormProps {
  onClose: () => void;
}

const NewEntryForm: React.FC<NewEntryFormProps> = ({ onClose }) => {
  const { addEntry } = useDiary();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [mood, setMood] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }
    
    const newEntry = {
      id: Date.now().toString(),
      title,
      content,
      photoUrl,
      mood,
      date: new Date().toISOString(),
    };
    
    addEntry(newEntry);
    onClose();
  };

  return (
    <div className="relative">
      <button
        onClick={onClose}
        className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>
      
      <h2 className="text-xl font-serif font-semibold text-amber-800 mb-4">Add New Diary Entry</h2>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="Today's highlight..."
          />
        </div>
        
        <div>
          <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Photo URL
          </label>
          <input
            id="photoUrl"
            type="url"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="https://example.com/your-image.jpg"
          />
          {photoUrl && (
            <div className="mt-2 rounded-md overflow-hidden h-40">
              <img
                src={photoUrl}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={() => setError('Invalid image URL')}
              />
            </div>
          )}
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Entry
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="Write about your day..."
          />
        </div>
        
        <div>
          <label htmlFor="mood" className="block text-sm font-medium text-gray-700 mb-1">
            Mood (optional)
          </label>
          <select
            id="mood"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option value="">Select mood...</option>
            <option value="Happy">Happy</option>
            <option value="Excited">Excited</option>
            <option value="Calm">Calm</option>
            <option value="Reflective">Reflective</option>
            <option value="Melancholy">Melancholy</option>
            <option value="Tired">Tired</option>
            <option value="Inspired">Inspired</option>
          </select>
        </div>
        
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-amber-700 bg-amber-100 rounded-md hover:bg-amber-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
          >
            Save Entry
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewEntryForm;
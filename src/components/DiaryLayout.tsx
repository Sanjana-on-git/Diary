import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import CoverPage from './CoverPage';
import DiaryEntry from './DiaryEntry';
import NewEntryForm from './NewEntryForm';
import { useDiary } from '../context/DiaryContext';

const DiaryLayout: React.FC = () => {
  const { entries } = useDiary();
  const [currentPage, setCurrentPage] = useState(0);
  const [showNewEntryForm, setShowNewEntryForm] = useState(false);
  const [pageTransition, setPageTransition] = useState('');

  // Total pages: cover + entries
  const totalPages = entries.length + 1;

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setPageTransition('slide-left');
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setPageTransition('');
      }, 300);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setPageTransition('slide-right');
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setPageTransition('');
      }, 300);
    }
  };

  const toggleNewEntryForm = () => {
    setShowNewEntryForm(!showNewEntryForm);
  };

  const closeNewEntryForm = () => {
    setShowNewEntryForm(false);
  };

  // Get current entry for the page
  const getCurrentContent = () => {
    if (currentPage === 0) {
      return <CoverPage />;
    } else {
      const entryIndex = currentPage - 1;
      if (entryIndex < entries.length) {
        return <DiaryEntry entry={entries[entryIndex]} />;
      }
      return null;
    }
  };

  return (
    <div className="relative max-w-4xl mx-auto my-8">
      {/* Diary page with transition effects */}
      <div 
        className={`bg-white rounded-lg shadow-lg p-8 min-h-[70vh] transition-all duration-300 transform ${
          pageTransition === 'slide-left' ? 'translate-x-[-100%] opacity-0' : 
          pageTransition === 'slide-right' ? 'translate-x-[100%] opacity-0' : ''
        }`}
      >
        {getCurrentContent()}
      </div>

      {/* Navigation controls */}
      <div className="flex justify-between mt-8">
        <button 
          onClick={goToPrevPage}
          disabled={currentPage === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-full ${
            currentPage === 0 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-amber-800 hover:bg-amber-100'
          }`}
        >
          <ChevronLeft className="h-5 w-5" />
          Previous
        </button>

        <button
          onClick={toggleNewEntryForm}
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          New Entry
        </button>

        <button 
          onClick={goToNextPage}
          disabled={currentPage >= totalPages - 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-full ${
            currentPage >= totalPages - 1
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-amber-800 hover:bg-amber-100'
          }`}
        >
          Next
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Page counter */}
      <div className="text-center mt-4 text-amber-800">
        Page {currentPage + 1} of {totalPages}
      </div>

      {/* New Entry Modal */}
      {showNewEntryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <NewEntryForm onClose={closeNewEntryForm} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DiaryLayout;
import React, { useState, useRef, useEffect } from 'react';

const CategorySelectDropdown = ({
  selectedCategory,
  onCategoryChange,
  categories,
  disabled = false,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleCategorySelect = (category) => {
    onCategoryChange(category);
    setIsOpen(false);
    setSearchTerm('');
  };

  const clearCategory = () => {
    onCategoryChange('');
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Dropdown Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full px-4 py-3 text-left bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
          rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 
          focus:border-amber-500 dark:focus:border-amber-400 transition-all duration-200
          hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center justify-between
        `}
      >
        <span className="flex items-center space-x-2 truncate">
          {selectedCategory ? (
            <>
              <span className="text-gray-700 dark:text-gray-200 font-medium">
                {selectedCategory}
              </span>
            </>
          ) : (
            <span className="text-gray-500 dark:text-gray-400">
              All Categories
            </span>
          )}
        </span>
        
        <div className="flex items-center space-x-1">
          {selectedCategory && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clearCategory();
              }}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-500 rounded transition-colors"
            >
              <svg className="w-3 h-3 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <svg 
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-64 overflow-hidden">
          {/* Search Input */}
          <div className="p-2 border-b border-gray-200 dark:border-gray-600">
            <div className="relative">
              <svg 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md 
                         focus:outline-none focus:ring-1 focus:ring-amber-500 dark:focus:ring-amber-400 
                         text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>

          {/* Category List */}
          <div className="overflow-y-auto max-h-48">
            {filteredCategories.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                No categories found
              </div>
            ) : (
              <>
                {/* All Categories Option */}
                <button
                  type="button"
                  onClick={() => handleCategorySelect('')}
                  className={`
                    w-full px-4 py-3 text-left transition-colors duration-150 border-b border-gray-100 dark:border-gray-600
                    hover:bg-amber-50 dark:hover:bg-amber-900/20 focus:outline-none focus:bg-amber-50 dark:focus:bg-amber-900/20
                    ${!selectedCategory 
                      ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300' 
                      : 'text-gray-700 dark:text-gray-300'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">All Categories</span>
                  </div>
                </button>

                {/* Category Options */}
                {filteredCategories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategorySelect(category)}
                    className={`
                      w-full px-4 py-3 text-left transition-colors duration-150 border-b border-gray-100 dark:border-gray-600 last:border-b-0
                      hover:bg-amber-50 dark:hover:bg-amber-900/20 focus:outline-none focus:bg-amber-50 dark:focus:bg-amber-900/20
                      ${selectedCategory === category 
                        ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300' 
                        : 'text-gray-700 dark:text-gray-300'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{category}</span>
                      {selectedCategory === category && (
                        <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-600">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>
                {filteredCategories.length} of {categories.length} categories
              </span>
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySelectDropdown;
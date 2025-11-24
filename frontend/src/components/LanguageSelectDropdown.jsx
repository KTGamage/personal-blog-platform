import { useState, useRef, useEffect } from 'react';

const LanguageSelectDropdown = ({
  selectedLanguage,
  onLanguageChange,
  languages,
  disabled = false,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Filter languages based on search term
  const filteredLanguages = languages.filter(lang =>
    lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.code.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleLanguageSelect = (language) => {
    onLanguageChange(language.code);
    setIsOpen(false);
    setSearchTerm('');
  };

  const selectedLang = languages.find(lang => lang.code === selectedLanguage);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Dropdown Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full sm:w-48 px-4 py-2.5 text-left bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 
          rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 
          focus:border-amber-500 dark:focus:border-amber-400 transition-all duration-200
          hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center justify-between
        `}
      >
        <span className="flex items-center space-x-2 truncate">
          {selectedLang ? (
            <>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {selectedLang.name}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">
                ({selectedLang.nativeName})
              </span>
            </>
          ) : (
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              Select language
            </span>
          )}
        </span>
        
        <svg 
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-80 overflow-hidden">
          {/* Search Input */}
          <div className="p-2 border-b border-gray-200 dark:border-gray-700">
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
                placeholder="Search languages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md 
                         focus:outline-none focus:ring-1 focus:ring-amber-500 dark:focus:ring-amber-400 
                         text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>

          {/* Language List */}
          <div className="overflow-y-auto max-h-60">
            {filteredLanguages.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                No languages found
              </div>
            ) : (
              filteredLanguages.map((language) => (
                <button
                  key={language.code}
                  type="button"
                  onClick={() => handleLanguageSelect(language)}
                  className={`
                    w-full px-4 py-3 text-left transition-colors duration-150 border-b border-gray-100 dark:border-gray-700 last:border-b-0
                    hover:bg-amber-50 dark:hover:bg-amber-900/20 focus:outline-none focus:bg-amber-50 dark:focus:bg-amber-900/20
                    ${selectedLanguage === language.code 
                      ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300' 
                      : 'text-gray-700 dark:text-gray-300'
                    }
                  `}
                >
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{language.name}</span>
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                        {language.code}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {language.nativeName}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Footer with language count */}
          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>
                {filteredLanguages.length} of {languages.length} languages
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

export default LanguageSelectDropdown;
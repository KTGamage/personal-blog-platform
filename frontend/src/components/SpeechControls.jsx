import React, { useState, useRef, useEffect } from 'react';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';


const VoiceSelectDropdown = ({
  selectedVoice,
  onVoiceChange,
  voices,
  disabled = false,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Filter voices based on search term
  const filteredVoices = voices.filter(voice =>
    voice.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    voice.lang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group voices by language
  const groupedVoices = filteredVoices.reduce((groups, voice) => {
    const lang = voice.lang.split('-')[0]; // Get base language
    if (!groups[lang]) {
      groups[lang] = [];
    }
    groups[lang].push(voice);
    return groups;
  }, {});

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

  const handleVoiceSelect = (voice) => {
    onVoiceChange(voice.name);
    setIsOpen(false);
    setSearchTerm('');
  };

  const getVoiceDisplayName = (voice) => {
    const lang = voice.lang.split('-')[0];
    const country = voice.lang.split('-')[1];
    return `${voice.name} (${lang.toUpperCase()}${country ? `-${country}` : ''})`;
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Dropdown Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled || voices.length === 0}
        className={`
          w-full px-3 py-2 text-left bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
          rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 dark:focus:ring-amber-400 
          focus:border-amber-500 dark:focus:border-amber-400 transition-all duration-200
          hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center justify-between
        `}
      >
        <span className="truncate text-gray-700 dark:text-gray-200">
          {selectedVoice ? getVoiceDisplayName(selectedVoice) : 'Select voice'}
        </span>
        
        <svg 
          className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-64 overflow-hidden">
          {/* Search Input */}
          <div className="p-2 border-b border-gray-200 dark:border-gray-600">
            <div className="relative">
              <svg 
                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search voices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-7 pr-3 py-1 text-xs bg-gray-50 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded 
                         focus:outline-none focus:ring-1 focus:ring-amber-500 dark:focus:ring-amber-400 
                         text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>

          {/* Voice List */}
          <div className="overflow-y-auto max-h-48">
            {filteredVoices.length === 0 ? (
              <div className="px-3 py-2 text-xs text-gray-500 dark:text-gray-400 text-center">
                {voices.length === 0 ? 'Loading voices...' : 'No voices found'}
              </div>
            ) : (
              Object.entries(groupedVoices).map(([lang, langVoices]) => (
                <div key={lang}>
                  <div className="px-3 py-1 bg-gray-50 dark:bg-gray-600 text-xs font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-500">
                    {lang.toUpperCase()}
                  </div>
                  {langVoices.map((voice) => (
                    <button
                      key={voice.name}
                      type="button"
                      onClick={() => handleVoiceSelect(voice)}
                      className={`
                        w-full px-3 py-2 text-left transition-colors duration-150 border-b border-gray-100 dark:border-gray-600 last:border-b-0
                        hover:bg-amber-50 dark:hover:bg-amber-900/20 focus:outline-none focus:bg-amber-50 dark:focus:bg-amber-900/20
                        ${selectedVoice?.name === voice.name 
                          ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300' 
                          : 'text-gray-700 dark:text-gray-300'
                        }
                      `}
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-medium truncate">{voice.name}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {voice.lang}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="px-3 py-1 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-600">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {filteredVoices.length} of {voices.length} voices
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SpeechControls = ({ content, className = '' }) => {
  const {
    isSpeaking,
    isPaused,
    voices,
    selectedVoice,
    rate,
    pitch,
    speak,
    pause,
    resume,
    stop,
    changeVoice,
    setRate,
    setPitch
  } = useSpeechSynthesis();

  const handleSpeak = () => {
    // Extract text from HTML content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const text = tempDiv.textContent || tempDiv.innerText || '';
    
    if (text.trim()) {
      speak(text);
    }
  };

  const handleToggle = () => {
    if (isSpeaking) {
      if (isPaused) {
        resume();
      } else {
        pause();
      }
    } else {
      handleSpeak();
    }
  };

  return (
    <div className={`card p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm ${className}`}>
      <div className="flex flex-col space-y-4">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/20 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">Listen to this post</h4>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleToggle}
              disabled={!content}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-colors ${
                isSpeaking && !isPaused
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/30'
              } disabled:opacity-50 disabled:cursor-not-allowed text-sm`}
            >
              {isSpeaking && !isPaused ? (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>Pause</span>
                </>
              ) : isPaused ? (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  <span>Resume</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  <span>Listen</span>
                </>
              )}
            </button>

            <button
              onClick={stop}
              disabled={!isSpeaking}
              className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
              </svg>
              <span>Stop</span>
            </button>
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            {isSpeaking && !isPaused && 'Speaking...'}
            {isPaused && 'Paused'}
            {!isSpeaking && !isPaused && 'Ready'}
          </div>
        </div>

        {/* Settings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm pt-4 border-t border-gray-200 dark:border-gray-700">
          {/* Voice Selection */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Voice
            </label>
            <VoiceSelectDropdown
              selectedVoice={selectedVoice}
              onVoiceChange={changeVoice}
              voices={voices}
              disabled={isSpeaking}
            />
          </div>

          {/* Rate */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Speed: {rate}x
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Pitch */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Pitch: {pitch}
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={pitch}
              onChange={(e) => setPitch(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeechControls;
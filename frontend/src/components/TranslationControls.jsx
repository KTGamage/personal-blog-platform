import React, { useState } from "react";
import { useTranslation } from "../hooks/useTranslation";

const TranslationControls = ({ content, className = "" }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [showTranslated, setShowTranslated] = useState(false);

  const {
    isTranslating,
    translatedText,
    error,
    languages,
    translateText,
    resetTranslation,
  } = useTranslation();

  const handleTranslate = async () => {
    if (!selectedLanguage || !content) return;

    await translateText(content, selectedLanguage);
    setShowTranslated(true);
  };

  const handleReset = () => {
    resetTranslation();
    setShowTranslated(false);
    setSelectedLanguage("");
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);

    // Reset translation when language changes
    resetTranslation(); 
    setShowTranslated(false); 

    // Auto-translate when language is selected
    if (newLang && content) {
      handleTranslate();
    }
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 ${className}`}
    >
      <div className="flex flex-col space-y-4">
        {/* Language Selection */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
              Translate to:
            </label>
            <select
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="flex-1 input-field text-sm"
              disabled={isTranslating}
            >
              <option value="">Select language</option>
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {showTranslated && (
            <button
              onClick={handleReset}
              className="btn-secondary text-sm ml-4"
            >
              Show Original
            </button>
          )}
        </div>

        {/* Translate Button */}
        {selectedLanguage && !showTranslated && (
          <button
            onClick={handleTranslate}
            disabled={isTranslating}
            className="btn-primary text-sm disabled:opacity-50"
          >
            {isTranslating ? "Translating..." : "Translate"}
          </button>
        )}

        {/* Translation Status */}
        {isTranslating && (
          <div className="flex items-center space-x-2 text-sm text-primary-600 dark:text-primary-400">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
            <span>Translating...</span>
          </div>
        )}

        {error && (
          <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded">
            {error}
          </div>
        )}

        {/* Translated Content */}
        {showTranslated && translatedText && !isTranslating && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Translated Version:
            </h4>
            <div className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {translatedText}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranslationControls;

import { useState, useCallback } from "react";
import { translationAPI } from "../services/api";

// Enhanced language configuration
const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "fr", name: "French", nativeName: "Français" },
  { code: "de", name: "German", nativeName: "Deutsch" },
  { code: "it", name: "Italian", nativeName: "Italiano" },
  { code: "pt", name: "Portuguese", nativeName: "Português" },
  { code: "ru", name: "Russian", nativeName: "Русский" },
  { code: "ja", name: "Japanese", nativeName: "日本語" },
  { code: "ko", name: "Korean", nativeName: "한국어" },
  { code: "zh", name: "Chinese", nativeName: "中文" },
  { code: "ar", name: "Arabic", nativeName: "العربية" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "si", name: "Sinhala", nativeName: "සිංහල" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "th", name: "Thai", nativeName: "ไทย" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands" },
  { code: "pl", name: "Polish", nativeName: "Polski" },
  { code: "uk", name: "Ukrainian", nativeName: "Українська" }
];

export const useTranslation = () => {
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedText, setTranslatedText] = useState("");
  const [error, setError] = useState("");
  const [currentLang, setCurrentLang] = useState("");
  const [translationService, setTranslationService] = useState("");
  const [translationModel, setTranslationModel] = useState("");

  const extractTextFromHTML = useCallback((html) => {
    if (!html) return "";
    
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    
    const scripts = tempDiv.getElementsByTagName("script");
    const styles = tempDiv.getElementsByTagName("style");
    
    Array.from(scripts).forEach(script => script.remove());
    Array.from(styles).forEach(style => style.remove());
    
    const text = tempDiv.textContent || tempDiv.innerText || "";
    
    return text
      .replace(/\s+/g, ' ')
      .replace(/([.!?])\s+/g, '$1 ')
      .trim();
  }, []);

  const translateText = useCallback(async (text, targetLang) => {
    if (!text || !targetLang) {
      setError("Text and target language are required");
      return;
    }

    if (targetLang !== currentLang) {
      setTranslatedText("");
      setCurrentLang(targetLang);
    }

    setIsTranslating(true);
    setError("");
    setTranslationService("");
    setTranslationModel("");

    try {
      const plainText = extractTextFromHTML(text);
      
      if (!plainText.trim()) {
        throw new Error("No text content found to translate");
      }

      console.log("Starting AI translation to", targetLang);

      const response = await translationAPI.translate({
        text: plainText,
        targetLang,
      });

      if (response.data.translatedText) {
        setTranslatedText(response.data.translatedText);
        setTranslationService(response.data.service || "gemini-ai");
        setTranslationModel(response.data.model || "gemini-2.0-flash-lite");
        
        console.log(`Translation successful using ${response.data.service} (${response.data.model})`);
      } else {
        throw new Error("No translation received from AI service");
      }
    } catch (err) {
      console.error("AI translation error:", err);
      
      const errorMessage = err.response?.data?.message ||
        err.message ||
        "AI translation service is currently unavailable. Please try again later.";
      
      setError(errorMessage);
      
      // Fallback to original text
      const fallbackText = extractTextFromHTML(text);
      setTranslatedText(fallbackText);
    } finally {
      setIsTranslating(false);
    }
  }, [currentLang, extractTextFromHTML]);

  const resetTranslation = useCallback(() => {
    setTranslatedText("");
    setError("");
    setCurrentLang("");
    setTranslationService("");
    setTranslationModel("");
  }, []);

  return {
    isTranslating,
    translatedText,
    error,
    translationService,
    translationModel,
    languages,
    translateText,
    resetTranslation,
    currentLanguage: currentLang,
  };
};
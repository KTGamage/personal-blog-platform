const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const router = express.Router();

// Initialize Gemini AI with modern models
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Cache for translations
const translationCache = new Map();
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Rate limiting
const rateLimit = new Map();
const RATE_LIMIT_RPM = 30; // 30 requests per minute for Flash-Lite
const RATE_LIMIT_TPM = 1000000; // 1,000,000 tokens per minute

// Supported languages
const supportedLanguages = {
  'en': 'English',
  'es': 'Spanish', 
  'fr': 'French',
  'de': 'German',
  'it': 'Italian',
  'pt': 'Portuguese',
  'ru': 'Russian',
  'ja': 'Japanese',
  'ko': 'Korean',
  'zh': 'Chinese',
  'ar': 'Arabic',
  'hi': 'Hindi',
  'si': 'Sinhala',
  'ta': 'Tamil',
  'th': 'Thai',
  'vi': 'Vietnamese',
  'tr': 'Turkish',
  'nl': 'Dutch',
  'pl': 'Polish',
  'uk': 'Ukrainian'
};

// Modern Gemini models for free tier
const GEMINI_MODELS = {
  'flash-lite': 'gemini-2.0-flash-lite', // Best free tier: 30 RPM, 1M TPM
  'flash': 'gemini-2.0-flash', // 15 RPM, 1M TPM
  'flash-preview': 'gemini-2.0-flash-preview-02-05' // Alternative
};

// Current model - using Flash-Lite for best free tier limits
const CURRENT_MODEL = GEMINI_MODELS['flash-lite'];

// Helper function to extract clean text from HTML
function extractCleanText(htmlContent) {
  if (!htmlContent) return '';
  
  const plainText = htmlContent
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  return plainText.substring(0, 8000); // Limit for Gemini
}

// Helper function to create cache key
function getCacheKey(text, targetLang) {
  return `${Buffer.from(text).toString('base64')}-${targetLang}`;
}

// Get language name for prompt
function getLanguageName(languageCode) {
  return supportedLanguages[languageCode] || languageCode;
}

// Simple rate limiting
function checkRateLimit() {
  const now = Date.now();
  const minuteAgo = now - 60000;
  
  // Clean old entries
  for (const [timestamp] of rateLimit) {
    if (timestamp < minuteAgo) {
      rateLimit.delete(timestamp);
    }
  }
  
  // Check current rate
  const currentRate = rateLimit.size;
  if (currentRate >= RATE_LIMIT_RPM) {
    return {
      allowed: false,
      message: `Rate limit exceeded. Free tier allows ${RATE_LIMIT_RPM} requests per minute. Please try again in a moment.`
    };
  }
  
  // Add current request
  rateLimit.set(now, true);
  return { allowed: true };
}

// Modern Gemini AI Translation function
async function translateWithGemini(text, targetLang) {
  try {
    console.log(`Translating to ${targetLang} using ${CURRENT_MODEL}...`);
    
    // Check rate limit
    const rateCheck = checkRateLimit();
    if (!rateCheck.allowed) {
      throw new Error(rateCheck.message);
    }

    // Get the model
    const model = genAI.getGenerativeModel({ 
      model: CURRENT_MODEL,
      generationConfig: {
        temperature: 0.2, // Lower temperature for more consistent translations
        topP: 0.8,
        topK: 40,
      }
    });

    // Enhanced prompt for better translations
    const prompt = `
You are a professional translator with expertise in ${getLanguageName(targetLang)}. 
Translate the following text from English to ${getLanguageName(targetLang)}.

CRITICAL TRANSLATION GUIDELINES:
1. Preserve the exact meaning and context of the original text
2. Use natural, fluent ${getLanguageName(targetLang)} that native speakers use
3. Maintain the original tone (formal, informal, technical, conversational)
4. Keep proper names, technical terms, brands, and URLs unchanged
5. Ensure grammatical accuracy and proper sentence structure
6. For blog content, maintain readability and engagement
7. Do NOT add any explanations, notes, or additional text
8. Output ONLY the translated text

Original text to translate:
"""
${text}
"""

Translated text in ${getLanguageName(targetLang)}:
`;

    console.log(`Sending request to Gemini ${CURRENT_MODEL}...`);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const translatedText = response.text().trim();

    // Clean up any potential extra text from the model
    const cleanTranslatedText = translatedText
      .replace(/^["']|["']$/g, '') // Remove surrounding quotes
      .trim();

    console.log('Gemini translation successful');
    return {
      success: true,
      translatedText: cleanTranslatedText,
      service: 'gemini-ai',
      model: CURRENT_MODEL
    };
  } catch (error) {
    console.error('Gemini AI translation error:', error);
    
    // Handle specific Gemini API errors
    if (error.message?.includes('429') || error.message?.includes('RESOURCE_EXHAUSTED')) {
      return {
        success: false,
        error: 'Free tier rate limit exceeded. Please wait a minute and try again.',
        service: 'gemini-ai'
      };
    } else if (error.message?.includes('401') || error.message?.includes('403')) {
      return {
        success: false,
        error: 'API authentication failed. Please check your Gemini API key.',
        service: 'gemini-ai'
      };
    } else if (error.message?.includes('503') || error.message?.includes('UNAVAILABLE')) {
      return {
        success: false,
        error: 'AI service temporarily unavailable. Please try again in a moment.',
        service: 'gemini-ai'
      };
    } else if (error.message?.includes('Rate limit exceeded')) {
      return {
        success: false,
        error: error.message,
        service: 'gemini-ai'
      };
    } else {
      return {
        success: false,
        error: `Translation failed: ${error.message}`,
        service: 'gemini-ai'
      };
    }
  }
}

// Fallback to free translation APIs if Gemini fails
async function translateWithFallbackAPIs(text, targetLang) {
  console.log('Trying fallback translation APIs...');
  
  try {
    // Try MyMemory API
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`
    );

    if (response.ok) {
      const data = await response.json();
      if (data.responseStatus === 200 && data.responseData?.translatedText) {
        return {
          success: true,
          translatedText: data.responseData.translatedText,
          service: 'mymemory-fallback'
        };
      }
    }
  } catch (fallbackError) {
    console.error('Fallback API also failed:', fallbackError);
  }

  return {
    success: false,
    error: 'All translation services failed',
    service: 'none'
  };
}

// Main translation endpoint
router.post('/', async (req, res) => {
  try {
    const { text, targetLang } = req.body;

    if (!text || !targetLang) {
      return res.status(400).json({ 
        message: 'Text and target language are required' 
      });
    }

    // Validate target language
    if (!supportedLanguages[targetLang]) {
      return res.status(400).json({ 
        message: `Unsupported language: ${targetLang}. Supported languages: ${Object.keys(supportedLanguages).join(', ')}`
      });
    }

    // Check if Gemini API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        message: 'Translation service not configured. Please contact administrator.',
        translatedText: text
      });
    }

    // Extract and clean text
    const cleanText = extractCleanText(text);
    
    if (!cleanText) {
      return res.status(400).json({ 
        message: 'No meaningful text content found to translate' 
      });
    }

    console.log('Translation request:', cleanText.substring(0, 100) + '...', 'to', targetLang);

    // Check cache first
    const cacheKey = getCacheKey(cleanText, targetLang);
    const cached = translationCache.get(cacheKey);
    
    if (cached && (Date.now() - cached.timestamp < CACHE_DURATION)) {
      console.log('Using cached translation');
      return res.json({
        translatedText: cached.translatedText,
        service: 'cache',
        model: cached.model
      });
    }

    // Translate with Gemini AI
    const translationResult = await translateWithGemini(cleanText, targetLang);

    // If Gemini fails, try fallback APIs
    if (!translationResult.success) {
      console.log('Gemini failed, trying fallback APIs...');
      const fallbackResult = await translateWithFallbackAPIs(cleanText, targetLang);
      
      if (fallbackResult.success) {
        // Cache successful fallback translation
        translationCache.set(cacheKey, {
          translatedText: fallbackResult.translatedText,
          timestamp: Date.now(),
          service: fallbackResult.service
        });

        return res.json({
          translatedText: fallbackResult.translatedText,
          service: fallbackResult.service,
          note: 'Using fallback translation service'
        });
      }

      // All translation methods failed
      console.error('All translation methods failed');
      
      // Cache the failure to avoid repeated attempts
      translationCache.set(cacheKey, {
        translatedText: cleanText,
        timestamp: Date.now(),
        service: 'fallback'
      });

      return res.status(500).json({ 
        message: translationResult.error || 'Translation service is currently unavailable. Please try again later.',
        translatedText: cleanText,
        service: 'error'
      });
    }

    // Cache successful Gemini translation
    translationCache.set(cacheKey, {
      translatedText: translationResult.translatedText,
      timestamp: Date.now(),
      service: translationResult.service,
      model: translationResult.model
    });

    res.json({
      translatedText: translationResult.translatedText,
      service: translationResult.service,
      model: translationResult.model
    });

  } catch (error) {
    console.error('Translation endpoint error:', error.message);
    
    res.status(500).json({ 
      message: 'Translation service encountered an unexpected error. Please try again later.',
      translatedText: req.body.text ? extractCleanText(req.body.text) : '',
      service: 'error'
    });
  }
});

// Get supported languages
router.get('/languages', (req, res) => {
  res.json({
    languages: supportedLanguages,
    service: 'gemini-ai',
    model: CURRENT_MODEL,
    rateLimits: {
      requestsPerMinute: RATE_LIMIT_RPM,
      tokensPerMinute: RATE_LIMIT_TPM,
      freeTier: true
    }
  });
});

// Get rate limit info
router.get('/rate-limit', (req, res) => {
  const now = Date.now();
  const minuteAgo = now - 60000;
  
  // Clean old entries
  for (const [timestamp] of rateLimit) {
    if (timestamp < minuteAgo) {
      rateLimit.delete(timestamp);
    }
  }
  
  res.json({
    currentRequests: rateLimit.size,
    maxRequests: RATE_LIMIT_RPM,
    tokensPerMinute: RATE_LIMIT_TPM,
    model: CURRENT_MODEL,
    freeTier: true
  });
});

// Get translation cache info
router.get('/cache-info', (req, res) => {
  res.json({
    cacheSize: translationCache.size,
    cacheEnabled: true,
    cacheDuration: '24 hours'
  });
});

// Clear cache endpoint
router.delete('/cache', (req, res) => {
  const beforeSize = translationCache.size;
  translationCache.clear();
  res.json({
    message: `Translation cache cleared. Removed ${beforeSize} entries.`
  });
});

// Health check endpoint
router.get('/health', async (req, res) => {
  try {
    // Test Gemini API connection
    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        status: 'unhealthy',
        message: 'GEMINI_API_KEY not configured'
      });
    }

    const model = genAI.getGenerativeModel({ model: CURRENT_MODEL });
    const result = await model.generateContent("Translate 'hello' to Spanish.");
    const response = await result.response;
    
    res.json({
      status: 'healthy',
      service: 'gemini-ai',
      model: CURRENT_MODEL,
      freeTier: true,
      rateLimits: {
        rpm: RATE_LIMIT_RPM,
        tpm: RATE_LIMIT_TPM
      },
      message: 'Gemini AI translation service is working correctly'
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      service: 'gemini-ai',
      model: CURRENT_MODEL,
      message: `Service error: ${error.message}`
    });
  }
});

module.exports = router;
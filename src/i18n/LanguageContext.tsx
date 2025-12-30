import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Language, createTranslator, LANGUAGE_NAMES, LANGUAGE_FLAGS } from './index';
import { LocalizedContent, t as tLocalizedHelper } from '../types/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  tLocalized: (content: LocalizedContent | string) => string;
  languageName: string;
  languageFlag: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'ian-saura-language';

interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

export function LanguageProvider({ children, defaultLanguage }: LanguageProviderProps) {
  // Initialize language from: 1) URL parameter, 2) localStorage, 3) ESPAÑOL default
  // NOTE: Español is the default for ALL existing users. New users can change it manually.
  // Browser detection is NOT used to avoid confusion for existing Spanish-speaking users.
  const [language, setLanguageState] = useState<Language>(() => {
    // Check URL parameter FIRST (for shareable links)
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang') as Language | null;
    if (urlLang && ['es', 'en', 'pt'].includes(urlLang)) {
      return urlLang;
    }
    // Then check localStorage (user's explicit choice)
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored && ['es', 'en', 'pt'].includes(stored)) {
      return stored;
    }
    // Default: ESPAÑOL for all users (existing and new)
    // Users can change language via the selector in the header
    return defaultLanguage || 'es';
  });
  
  // Sync language with URL parameter changes
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang') as Language | null;
    if (urlLang && ['es', 'en', 'pt'].includes(urlLang) && urlLang !== language) {
      setLanguageState(urlLang);
      localStorage.setItem(STORAGE_KEY, urlLang);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Memoized translator for string keys
  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => {
      return createTranslator(language)(key, params);
    },
    [language]
  );

  // Memoized translator for LocalizedContent objects
  const tLocalizedMemo = useCallback(
    (content: LocalizedContent | string) => {
      return tLocalizedHelper(content, language);
    },
    [language]
  );

  // Set language and persist to localStorage
  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    
    // Update URL parameter (optional - for shareable links)
    const url = new URL(window.location.href);
    if (lang !== 'es') { // Don't add param for default language
      url.searchParams.set('lang', lang);
    } else {
      url.searchParams.delete('lang');
    }
    window.history.replaceState({}, '', url.toString());
    
    // Update document language
    document.documentElement.lang = lang;
  }, []);

  // Set document language on mount and language change
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    tLocalized: tLocalizedMemo,
    languageName: LANGUAGE_NAMES[language],
    languageFlag: LANGUAGE_FLAGS[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook to use language context
export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Hook that returns just the translator (for components that don't need full context)
export function useTranslation() {
  const { t, tLocalized, language } = useLanguage();
  return { t, tLocalized, language };
}

export { LanguageContext };


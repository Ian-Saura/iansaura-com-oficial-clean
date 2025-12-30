import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language, LANGUAGE_NAMES, LANGUAGE_FLAGS } from '../i18n';

interface LanguageSelectorProps {
  variant?: 'dropdown' | 'buttons' | 'compact';
  className?: string;
}

export function LanguageSelector({ variant = 'dropdown', className = '' }: LanguageSelectorProps) {
  const { language, setLanguage, languageFlag } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: Language[] = ['es', 'en', 'pt'];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Dropdown variant
  if (variant === 'dropdown') {
    return (
      <div ref={dropdownRef} className={`relative ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 text-slate-300 hover:text-white transition-colors"
          aria-label="Select language"
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm">{languageFlag} {LANGUAGE_NAMES[language]}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setLanguage(lang);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-700/50 transition-colors ${
                  language === lang ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-300'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="text-lg">{LANGUAGE_FLAGS[lang]}</span>
                  <span>{LANGUAGE_NAMES[lang]}</span>
                </span>
                {language === lang && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Buttons variant (all languages visible) - FOR LIGHT BACKGROUNDS
  if (variant === 'buttons') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              language === lang
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/30 scale-105'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 border border-gray-300'
            }`}
            title={LANGUAGE_NAMES[lang]}
          >
            <span className="text-base">{LANGUAGE_FLAGS[lang]}</span> <span className="ml-1">{lang.toUpperCase()}</span>
          </button>
        ))}
      </div>
    );
  }

  // Compact variant (just flags)
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-lg transition-all ${
            language === lang
              ? 'bg-emerald-500/20 ring-2 ring-emerald-500/50 scale-110'
              : 'bg-slate-800/50 hover:bg-slate-700/50 opacity-60 hover:opacity-100'
          }`}
          title={LANGUAGE_NAMES[lang]}
          aria-label={`Switch to ${LANGUAGE_NAMES[lang]}`}
        >
          {LANGUAGE_FLAGS[lang]}
        </button>
      ))}
    </div>
  );
}

export default LanguageSelector;


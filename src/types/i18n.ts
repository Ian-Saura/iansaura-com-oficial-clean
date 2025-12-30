export type Language = 'es' | 'en' | 'pt';

export interface LocalizedContent {
  es: string;
  en?: string;
  pt?: string;
}

/**
 * Helper to get localized content with fallback chain: requested -> en -> es
 */
export function t(content: LocalizedContent | string, lang: Language = 'es'): string {
  if (typeof content === 'string') {
    return content;
  }
  
  if (lang === 'pt') {
    return content.pt || content.es;
  }
  
  if (lang === 'en') {
    return content.en || content.es;
  }

  return content[lang] || content.es;
}

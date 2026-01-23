import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, BookOpen, Clock, Award, ExternalLink, ChevronDown, ChevronUp,
  CheckCircle, Bookmark, Share2, Copy, Check, BookMarked, Target, Brain,
  FileText, Code, AlertTriangle, Lightbulb, Sparkles
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { LocalizedContent as LC, t as tLocalized } from '../../types/i18n';
import { DeepDiveContent } from '../../types/deepDives';
import { getDeepDiveById } from '../../data/deepDives';

interface DeepDiveViewerProps {
  deepDiveId: string;
  onBack: () => void;
  onComplete?: (deepDiveId: string) => void;
  isCompleted?: boolean;
}

/**
 * DeepDiveViewer - Visualizador de contenido Deep Dive
 * 
 * Muestra el contenido profundo con mapas mentales, cheat sheets y bibliografía.
 */
export const DeepDiveViewer: React.FC<DeepDiveViewerProps> = ({ 
  deepDiveId, 
  onBack, 
  onComplete,
  isCompleted = false
}) => {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['mindmap', 'cheatsheet', 'bibliography']));
  const [localCompleted, setLocalCompleted] = useState(isCompleted);
  
  const t = (content: LC | string): string => {
    if (typeof content === 'string') return content;
    return tLocalized(content, language);
  };

  const deepDive = getDeepDiveById(deepDiveId);

  if (!deepDive) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-400 mb-2">
          {t({ es: 'Deep Dive no encontrado', en: 'Deep Dive not found', pt: 'Deep Dive não encontrado' })}
        </h3>
        <button 
          onClick={onBack}
          className="text-violet-400 hover:text-violet-300 mt-4"
        >
          ← {t({ es: 'Volver', en: 'Go back', pt: 'Voltar' })}
        </button>
      </div>
    );
  }

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const handleComplete = () => {
    setLocalCompleted(true);
    onComplete?.(deepDiveId);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/members?tab=especializaciones&dive=${deepDiveId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          {t({ es: 'Volver a Deep Dives', en: 'Back to Deep Dives', pt: 'Voltar aos Deep Dives' })}
        </button>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white border border-slate-700 hover:border-slate-600 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            {copied ? t({ es: '¡Copiado!', en: 'Copied!', pt: 'Copiado!' }) : t({ es: 'Compartir', en: 'Share', pt: 'Compartilhar' })}
          </button>
        </div>
      </div>

      {/* Hero Card */}
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-${deepDive.color}-500/20 via-slate-900 to-purple-500/10 border border-${deepDive.color}-500/30 p-8`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-white/5 to-transparent rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex items-start gap-6 mb-6">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-${deepDive.color}-500 to-${deepDive.color}-600 flex items-center justify-center text-4xl shadow-2xl`}>
              {deepDive.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">
                  {t(deepDive.title)}
                </h1>
                {localCompleted && (
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle className="w-4 h-4" />
                    {t({ es: 'Completado', en: 'Completed', pt: 'Completado' })}
                  </span>
                )}
              </div>
              <p className="text-slate-300 text-lg">
                {t(deepDive.subtitle)}
              </p>
            </div>
          </div>

          {/* Meta Row */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="flex items-center gap-2 text-slate-400">
              <Clock className="w-4 h-4" />
              {deepDive.readingTime} {t({ es: 'de lectura', en: 'reading', pt: 'de leitura' })}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm bg-${deepDive.color}-500/20 text-${deepDive.color}-400 border border-${deepDive.color}-500/30`}>
              {deepDive.difficulty === 'foundational' ? t({ es: 'Fundamentos', en: 'Foundational', pt: 'Fundamentos' }) :
               deepDive.difficulty === 'intermediate' ? t({ es: 'Intermedio', en: 'Intermediate', pt: 'Intermediário' }) :
               t({ es: 'Avanzado', en: 'Advanced', pt: 'Avançado' })}
            </span>
            <span className="flex items-center gap-1.5 text-yellow-400">
              <Award className="w-4 h-4" />
              +{deepDive.xpBonus} XP
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {deepDive.tags.map((tag, i) => (
              <span 
                key={i} 
                className={`text-sm px-3 py-1 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700`}
              >
                {t(tag)}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-4">
        
        {/* 🧠 Mind Map Section */}
        <div className="rounded-2xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
          <button
            onClick={() => toggleSection('mindmap')}
            className="w-full flex items-center justify-between p-5 hover:bg-slate-800/80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                <Brain className="w-5 h-5 text-violet-400" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white">
                  🧠 {t({ es: 'Mapa Mental de Conceptos', en: 'Concept Mind Map', pt: 'Mapa Mental de Conceitos' })}
                </h3>
                <p className="text-sm text-slate-400">
                  {t({ es: 'Visualización de conexiones teóricas y prácticas', en: 'Visualization of theoretical and practical connections', pt: 'Visualização de conexões teóricas e práticas' })}
                </p>
              </div>
            </div>
            {expandedSections.has('mindmap') ? 
              <ChevronUp className="w-5 h-5 text-slate-400" /> : 
              <ChevronDown className="w-5 h-5 text-slate-400" />
            }
          </button>
          
          {expandedSections.has('mindmap') && (
            <div className="px-5 pb-5 border-t border-slate-700/50">
              <div className="mt-4 p-4 bg-slate-900/50 rounded-xl border border-slate-700/30">
                <p className="text-sm text-slate-400 mb-4">
                  {t({ es: '📊 El mapa mental en formato Mermaid.js está disponible en el archivo de contenido.', en: '📊 The Mermaid.js mind map is available in the content file.', pt: '📊 O mapa mental em formato Mermaid.js está disponível no arquivo de conteúdo.' })}
                </p>
                <a
                  href={`https://github.com/iansaura/data-engineering-hub/blob/main/discord-content/enhanced/${deepDive.contentPath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300"
                >
                  <ExternalLink className="w-4 h-4" />
                  {t({ es: 'Ver contenido completo', en: 'View full content', pt: 'Ver conteúdo completo' })}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* 📋 Cheat Sheet Section */}
        <div className="rounded-2xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
          <button
            onClick={() => toggleSection('cheatsheet')}
            className="w-full flex items-center justify-between p-5 hover:bg-slate-800/80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white">
                  📋 {t({ es: 'Referencia Rápida (Cheat Sheet)', en: 'Quick Reference (Cheat Sheet)', pt: 'Referência Rápida (Cheat Sheet)' })}
                </h3>
                <p className="text-sm text-slate-400">
                  {t({ es: 'Comandos CLI, snippets y patrones de diseño', en: 'CLI commands, snippets and design patterns', pt: 'Comandos CLI, snippets e padrões de design' })}
                </p>
              </div>
            </div>
            {expandedSections.has('cheatsheet') ? 
              <ChevronUp className="w-5 h-5 text-slate-400" /> : 
              <ChevronDown className="w-5 h-5 text-slate-400" />
            }
          </button>
          
          {expandedSections.has('cheatsheet') && (
            <div className="px-5 pb-5 border-t border-slate-700/50">
              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Code className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-semibold text-white">
                      {t({ es: 'Comandos Esenciales', en: 'Essential Commands', pt: 'Comandos Essenciais' })}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {t({ es: 'Los comandos más utilizados con ejemplos', en: 'Most used commands with examples', pt: 'Os comandos mais usados com exemplos' })}
                  </p>
                </div>
                <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-semibold text-white">
                      {t({ es: 'Best Practices', en: 'Best Practices', pt: 'Best Practices' })}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {t({ es: 'Patrones y buenas prácticas de la industria', en: 'Industry patterns and best practices', pt: 'Padrões e boas práticas da indústria' })}
                  </p>
                </div>
                <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/30">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    <span className="text-sm font-semibold text-white">
                      {t({ es: 'Gotchas de Senior', en: 'Senior Gotchas', pt: 'Gotchas de Sênior' })}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {t({ es: 'Errores comunes que cometen incluso seniors', en: 'Common mistakes even seniors make', pt: 'Erros comuns que até sêniors cometem' })}
                  </p>
                </div>
                <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-semibold text-white">
                      {t({ es: 'Patrones de Diseño', en: 'Design Patterns', pt: 'Padrões de Design' })}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {t({ es: 'Patrones específicos para este tema', en: 'Specific patterns for this topic', pt: 'Padrões específicos para este tema' })}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 📚 Bibliography Section */}
        <div className="rounded-2xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
          <button
            onClick={() => toggleSection('bibliography')}
            className="w-full flex items-center justify-between p-5 hover:bg-slate-800/80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                <BookMarked className="w-5 h-5 text-orange-400" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white">
                  📚 {t({ es: 'Bibliografía Profunda', en: 'Deep Bibliography', pt: 'Bibliografia Profunda' })}
                </h3>
                <p className="text-sm text-slate-400">
                  {t({ es: 'Libros, papers y documentación técnica', en: 'Books, papers and technical documentation', pt: 'Livros, papers e documentação técnica' })}
                </p>
              </div>
            </div>
            {expandedSections.has('bibliography') ? 
              <ChevronUp className="w-5 h-5 text-slate-400" /> : 
              <ChevronDown className="w-5 h-5 text-slate-400" />
            }
          </button>
          
          {expandedSections.has('bibliography') && (
            <div className="px-5 pb-5 border-t border-slate-700/50">
              <div className="mt-4 space-y-3">
                {deepDive.keyReferences.map((ref, i) => (
                  <div 
                    key={i}
                    className="flex items-start gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-700/30"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      ref.type === 'book' ? 'bg-blue-500/20 text-blue-400' :
                      ref.type === 'paper' ? 'bg-purple-500/20 text-purple-400' :
                      ref.type === 'whitepaper' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {ref.type === 'book' ? '📕' :
                       ref.type === 'paper' ? '📄' :
                       ref.type === 'whitepaper' ? '📋' : '📖'}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-sm">{ref.title}</h4>
                      <p className="text-xs text-slate-400">{ref.author}</p>
                      <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full ${
                        ref.type === 'book' ? 'bg-blue-500/20 text-blue-400' :
                        ref.type === 'paper' ? 'bg-purple-500/20 text-purple-400' :
                        ref.type === 'whitepaper' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {ref.type === 'book' ? t({ es: 'Libro', en: 'Book', pt: 'Livro' }) :
                         ref.type === 'paper' ? 'Paper' :
                         ref.type === 'whitepaper' ? 'Whitepaper' :
                         t({ es: 'Documentación', en: 'Documentation', pt: 'Documentação' })}
                      </span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-500 hover:text-white cursor-pointer" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-2xl p-6 border border-violet-500/30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-white text-lg mb-1">
              {localCompleted 
                ? t({ es: '🎉 ¡Has completado este Deep Dive!', en: '🎉 You completed this Deep Dive!', pt: '🎉 Você completou este Deep Dive!' })
                : t({ es: '¿Terminaste de revisar el contenido?', en: 'Finished reviewing the content?', pt: 'Terminou de revisar o conteúdo?' })
              }
            </h3>
            <p className="text-sm text-slate-400">
              {localCompleted 
                ? t({ es: `Ganaste +${deepDive.xpBonus} XP bonus`, en: `You earned +${deepDive.xpBonus} bonus XP`, pt: `Você ganhou +${deepDive.xpBonus} XP bônus` })
                : t({ es: 'Márcalo como completado para ganar XP bonus', en: 'Mark as complete to earn bonus XP', pt: 'Marque como completo para ganhar XP bônus' })
              }
            </p>
          </div>
          
          {!localCompleted && (
            <button
              onClick={handleComplete}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold hover:from-violet-400 hover:to-purple-500 transition-all shadow-lg shadow-violet-500/30"
            >
              <CheckCircle className="w-5 h-5" />
              {t({ es: 'Marcar como completado', en: 'Mark as complete', pt: 'Marcar como completo' })}
              <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center">
        <button
          onClick={onBack}
          className="text-slate-400 hover:text-white transition-colors"
        >
          ← {t({ es: 'Volver a todos los Deep Dives', en: 'Back to all Deep Dives', pt: 'Voltar a todos os Deep Dives' })}
        </button>
      </div>
    </div>
  );
};

export default DeepDiveViewer;


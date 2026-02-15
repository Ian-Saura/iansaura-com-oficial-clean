/**
 * DatabricksPremiumView
 * Premium specialization view with sidebar navigation, labs, and exercises
 */

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { 
  DATABRICKS_STATS,
  ALL_DATABRICKS_PHASES,
  ALL_DATABRICKS_LABS,
  ALL_DATABRICKS_EXERCISES,
  getLabsByPhase
} from '../../data/specializations/databricks';
import { DatabricksPhase, DatabricksExercise } from '../../data/specializations/databricks/types';
import { DatabricksLab } from '../../data/specializations/databricks/labs/types';
import { 
  ChevronDown, ChevronRight, ArrowLeft, BookOpen, Code, Clock, 
  Lightbulb, ExternalLink, Play, CheckCircle,
  Beaker, Dumbbell, FolderOpen, Award, Target, Zap, ChevronLeft,
  Terminal, FileCode, AlertTriangle, Info, Copy, Check
} from 'lucide-react';

interface DatabricksSpecializationViewProps {
  onBack: () => void;
}

// ============================================
// MARKDOWN RENDERER
// ============================================
const renderTheoryMarkdown = (text: string): React.ReactNode => {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let listItems: { type: 'ul' | 'ol', items: string[] } | null = null;
  let tableRows: string[][] = [];
  let inTable = false;
  let key = 0;

  const flushList = () => {
    if (listItems && listItems.items.length > 0) {
      if (listItems.type === 'ul') {
        elements.push(
          <ul key={key++} className="space-y-2 my-4">
            {listItems.items.map((item, idx) => {
              const isSubItem = item.startsWith('  ') || item.startsWith('\t');
              const cleanItem = item.replace(/^[\s\t]+/, '');
              return (
                <li key={idx} className={`flex items-start gap-3 text-slate-300 ${isSubItem ? 'ml-6' : ''}`}>
                  <span className={`mt-1.5 text-xs ${isSubItem ? 'text-slate-500' : 'text-orange-400'}`}>
                    {isSubItem ? '◦' : '▸'}
                  </span>
                  <span className="leading-relaxed">{renderInlineMarkdown(cleanItem)}</span>
                </li>
              );
            })}
          </ul>
        );
      } else {
        elements.push(
          <ol key={key++} className="space-y-2 my-4">
            {listItems.items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-slate-300">
                <span className="bg-orange-500/20 text-orange-400 font-bold min-w-[24px] h-6 rounded flex items-center justify-center text-xs">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{renderInlineMarkdown(item)}</span>
              </li>
            ))}
          </ol>
        );
      }
      listItems = null;
    }
  };

  const flushTable = () => {
    if (tableRows.length > 0) {
      // Find header row (first row) and filter out separator rows
      const headerRow = tableRows[0];
      const dataRows = tableRows.filter((row, idx) => 
        idx > 0 && !(row.length === 1 && row[0] === '__SEPARATOR__')
      );
      
      // Don't render if we only have header/separator
      if (dataRows.length === 0) {
        tableRows = [];
        inTable = false;
        return;
      }
      
      elements.push(
        <div key={key++} className="my-6 overflow-x-auto rounded-xl border border-slate-600/50 shadow-lg">
          <table className="w-full text-sm min-w-max">
            <thead>
              <tr className="bg-gradient-to-r from-orange-500/20 to-amber-500/10 border-b border-slate-600/50">
                {headerRow.map((cell, idx) => (
                  <th key={idx} className="px-4 py-3 text-left text-orange-400 font-semibold">
                    {renderInlineMarkdown(cell.trim())}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataRows.map((row, rowIdx) => (
                <tr 
                  key={rowIdx} 
                  className={`border-b border-slate-700/30 last:border-b-0 ${rowIdx % 2 === 0 ? 'bg-slate-800/30' : 'bg-slate-900/30'} hover:bg-slate-700/30 transition-colors`}
                >
                  {row.map((cell, cellIdx) => (
                    <td key={cellIdx} className="px-4 py-3 text-slate-300">
                      {renderInlineMarkdown(cell.trim())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      inTable = false;
    }
  };

  const renderInlineMarkdown = (text: string): React.ReactNode => {
    // Split by bold, code, and URLs
    const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|https?:\/\/[^\s<>)"']+)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={idx} className="px-1.5 py-0.5 bg-slate-700/80 rounded text-cyan-400 text-sm font-mono">{part.slice(1, -1)}</code>;
      }
      // Handle URLs - make them clickable
      if (part.match(/^https?:\/\//)) {
        return (
          <a 
            key={idx} 
            href={part} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-orange-400 hover:text-orange-300 underline underline-offset-2 break-all"
          >
            {part.length > 50 ? part.slice(0, 47) + '...' : part}
          </a>
        );
      }
      // Handle checkmarks and emojis - render them with proper styling
      if (part.includes('✅') || part.includes('❌') || part.includes('⚠️')) {
        return <span key={idx} className="inline-flex items-center">{part}</span>;
      }
      return part;
    });
  };

  // Check if a line is a markdown table row
  const isTableRow = (line: string): boolean => {
    const trimmed = line.trim();
    return trimmed.startsWith('|') && trimmed.endsWith('|') && trimmed.includes('|');
  };

  // Check if a line is the separator row (|---|---|)
  const isTableSeparator = (line: string): boolean => {
    const trimmed = line.trim();
    return /^\|[\s\-:|]+\|$/.test(trimmed);
  };

  // Parse a table row into cells
  const parseTableRow = (line: string): string[] => {
    const trimmed = line.trim();
    // Remove leading and trailing pipes, then split by pipes
    const content = trimmed.slice(1, -1);
    return content.split('|').map(cell => cell.trim());
  };

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith('```')) {
      if (inCodeBlock) {
        flushList();
        flushTable();
        elements.push(
          <div key={key++} className="my-4 rounded-lg overflow-hidden border border-slate-600/50">
            <div className="bg-slate-800 px-4 py-2 border-b border-slate-600/50 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-400 font-mono">Código</span>
            </div>
            <pre className="p-4 bg-slate-900 overflow-x-auto">
              <code className="text-emerald-400 text-sm font-mono leading-relaxed">{codeBlockContent.join('\n')}</code>
            </pre>
          </div>
        );
        inCodeBlock = false;
        codeBlockContent = [];
      } else {
        flushList();
        flushTable();
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // Handle markdown tables
    if (isTableRow(trimmedLine)) {
      flushList();
      if (!inTable) {
        inTable = true;
      }
      if (isTableSeparator(trimmedLine)) {
        // Add separator row marker
        tableRows.push(['__SEPARATOR__']);
      } else {
        tableRows.push(parseTableRow(trimmedLine));
      }
      continue;
    } else if (inTable) {
      // End of table
      flushTable();
    }

    if (trimmedLine.startsWith('## ')) {
      flushList();
      flushTable();
      elements.push(
        <h2 key={key++} className="text-xl font-bold text-white mt-8 mb-4 flex items-center gap-3 pb-2 border-b border-slate-700/50">
          <div className="w-1.5 h-6 bg-gradient-to-b from-orange-400 to-amber-500 rounded-full"></div>
          {trimmedLine.slice(3)}
        </h2>
      );
      continue;
    }

    if (trimmedLine.startsWith('### ')) {
      flushList();
      flushTable();
      elements.push(
        <h3 key={key++} className="text-lg font-semibold text-orange-400 mt-6 mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4" />
          {trimmedLine.slice(4)}
        </h3>
      );
      continue;
    }

    if (trimmedLine.startsWith('#### ')) {
      flushList();
      flushTable();
      elements.push(
        <h4 key={key++} className="text-base font-medium text-amber-400 mt-4 mb-2">
          {trimmedLine.slice(5)}
        </h4>
      );
      continue;
    }

    // Check for list items (including indented sublists)
    const unorderedListMatch = line.match(/^(\s*)-\s+(.+)$/);
    if (unorderedListMatch) {
      if (!listItems || listItems.type !== 'ul') {
        flushList();
        flushTable();
        listItems = { type: 'ul', items: [] };
      }
      // Preserve indentation for sublists
      const indent = unorderedListMatch[1];
      const content = unorderedListMatch[2];
      listItems.items.push(indent + content);
      continue;
    }

    const orderedMatch = trimmedLine.match(/^(\d+)\.\s+(.+)$/);
    if (orderedMatch) {
      if (!listItems || listItems.type !== 'ol') {
        flushList();
        flushTable();
        listItems = { type: 'ol', items: [] };
      }
      listItems.items.push(orderedMatch[2]);
      continue;
    }

    if (!trimmedLine) {
      flushList();
      flushTable();
      continue;
    }

    flushList();
    flushTable();
    elements.push(
      <p key={key++} className="text-slate-300 my-3 leading-relaxed">
        {renderInlineMarkdown(trimmedLine)}
      </p>
    );
  }

  flushList();
  flushTable();
  return <div className="space-y-1">{elements}</div>;
};

// ============================================
// CODE BLOCK COMPONENT
// ============================================
const CodeBlock: React.FC<{ code: string; language?: string; title?: string }> = ({ code, language = 'python', title }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-slate-600/50 bg-slate-900">
      <div className="bg-slate-800 px-4 py-2.5 border-b border-slate-600/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-emerald-400" />
          <span className="text-xs text-slate-300 font-medium">{title || language.toUpperCase()}</span>
        </div>
        <button 
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? '✓' : '📋'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm font-mono text-emerald-400 leading-relaxed whitespace-pre">{code}</code>
      </pre>
    </div>
  );
};

// ============================================
// LAB CARD COMPONENT
// ============================================
const LabCard: React.FC<{ lab: DatabricksLab; language: 'es' | 'en' | 'pt'; onSelect: () => void }> = ({ lab, language, onSelect }) => {
  const difficultyColors = {
    beginner: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    intermediate: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    advanced: 'bg-red-500/20 text-red-400 border-red-500/30'
  };

  return (
    <button
      onClick={onSelect}
      className="w-full text-left bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl p-5 border border-slate-700/50 hover:border-purple-500/50 transition-all group"
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-semibold text-white group-hover:text-purple-400 transition-colors">
          {lab.title[language]}
        </h4>
        <span className={`text-xs px-2 py-1 rounded-full border ${difficultyColors[lab.difficulty]}`}>
          {lab.difficulty}
        </span>
      </div>
      <p className="text-sm text-slate-400 mb-4 line-clamp-2">{lab.description[language]}</p>
      <div className="flex items-center gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {lab.estimatedMinutes} min
        </span>
        <span className="flex items-center gap-1">
          <Target className="w-3.5 h-3.5" />
          {lab.steps.length} {{ es: 'pasos', en: 'steps', pt: 'passos' }[language]}
        </span>
        <span className="flex items-center gap-1">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          +{lab.xpReward} XP
        </span>
      </div>
    </button>
  );
};

// ============================================
// EXERCISE CARD COMPONENT (INTERACTIVE)
// ============================================
const ExerciseCard: React.FC<{ exercise: DatabricksExercise; language: 'es' | 'en' | 'pt'; index: number }> = ({ exercise, language, index }) => {
  const [userCode, setUserCode] = useState(exercise.code);
  const [showSolution, setShowSolution] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const difficultyColors = {
    easy: 'text-emerald-400',
    medium: 'text-amber-400',
    hard: 'text-red-400'
  };

  const checkSolution = () => {
    // Simple check - compare key parts of the solution
    const userNormalized = userCode.replace(/\s+/g, ' ').toLowerCase();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const solutionNormalized = exercise.solution.replace(/\s+/g, ' ').toLowerCase();
    
    // Check if user has filled in the blanks (removed ___)
    const hasFilledBlanks = !userCode.includes('___');
    
    // Check for key patterns from solution
    const keyPatterns = exercise.solution
      .match(/\b(createDataFrame|spark\.read|\.filter|\.select|\.groupBy|\.agg|\.show|\.count)\b/gi) || [];
    
    const hasKeyPatterns = keyPatterns.some(pattern => 
      userNormalized.includes(pattern.toLowerCase())
    );
    
    setIsCorrect(hasFilledBlanks && hasKeyPatterns);
  };

  const resetCode = () => {
    setUserCode(exercise.code);
    setIsCorrect(null);
  };

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
              isCorrect === true ? 'bg-emerald-500/20 text-emerald-400' : 
              isCorrect === false ? 'bg-red-500/20 text-red-400' : 
              'bg-purple-500/20 text-purple-400'
            }`}>
              {isCorrect === true ? '✓' : index + 1}
            </span>
            <h4 className="font-medium text-white">{exercise.name[language]}</h4>
          </div>
          <span className={`text-xs ${difficultyColors[exercise.difficulty]}`}>
            {exercise.difficulty === 'easy' ? '⭐' : exercise.difficulty === 'medium' ? '⭐⭐' : '⭐⭐⭐'}
          </span>
        </div>
        <p className="text-sm text-slate-400">{exercise.description[language]}</p>
      </div>
      
      {/* Interactive Code Editor */}
      <div className="border-b border-slate-700/50">
        <div className="bg-slate-800 px-4 py-2.5 border-b border-slate-600/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-slate-300 font-medium">{{ es: 'Tu código', en: 'Your code', pt: 'Seu código' }[language]}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={resetCode}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded hover:bg-slate-700 transition-colors"
            >
              {{ es: 'Reiniciar', en: 'Reset', pt: 'Reiniciar' }[language]}
            </button>
          </div>
        </div>
        <textarea
          value={userCode}
          onChange={(e) => { setUserCode(e.target.value); setIsCorrect(null); }}
          className="w-full bg-slate-900 text-emerald-400 font-mono text-sm p-4 min-h-[200px] focus:outline-none focus:ring-1 focus:ring-purple-500/50 resize-y"
          spellCheck={false}
          placeholder={{ es: 'Escribe tu código aquí...', en: 'Write your code here...', pt: 'Escreva seu código aqui...' }[language]}
        />
      </div>

      {/* Actions */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={checkSolution}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white rounded-lg font-medium text-sm transition-all flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            {{ es: 'Verificar', en: 'Check', pt: 'Verificar' }[language]}
          </button>
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-colors flex items-center gap-2"
          >
            {showSolution ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            {showSolution ? { es: 'Ocultar', en: 'Hide', pt: 'Ocultar' }[language] : { es: 'Ver solución', en: 'View solution', pt: 'Ver solução' }[language]}
          </button>
        </div>
        
        {/* Result */}
        {isCorrect !== null && (
          <div className={`flex items-center gap-2 text-sm ${isCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
            {isCorrect ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>{{ es: '¡Correcto!', en: 'Correct!', pt: 'Correto!' }[language]} 🎉</span>
              </>
            ) : (
              <>
                <Info className="w-5 h-5" />
                <span>{{ es: 'Revisa tu código o ve la solución', en: 'Check your code or view solution', pt: 'Revise seu código ou veja a solução' }[language]}</span>
              </>
            )}
          </div>
        )}
      </div>
      
      {/* Solution */}
      {showSolution && (
        <div className="border-t border-slate-700/50 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-white">{{ es: 'Solución', en: 'Solution', pt: 'Solução' }[language]}</span>
          </div>
          <CodeBlock code={exercise.solution} title={{ es: 'Código correcto', en: 'Correct code', pt: 'Código correto' }[language]} />
        </div>
      )}
    </div>
  );
};

// ============================================
// LAB DETAIL VIEW
// ============================================
const LabDetailView: React.FC<{ lab: DatabricksLab; language: 'es' | 'en' | 'pt'; onBack: () => void }> = ({ lab, language, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStepComplete = (stepIndex: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepIndex) 
        ? prev.filter(i => i !== stepIndex)
        : [...prev, stepIndex]
    );
  };

  const progress = (completedSteps.length / lab.steps.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-white">{lab.title[language]}</h2>
          <p className="text-sm text-slate-400">{lab.subtitle[language]}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-purple-400">{Math.round(progress)}%</div>
          <div className="text-xs text-slate-500">{{ es: 'completado', en: 'completed', pt: 'concluído' }[language]}</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-violet-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Objectives */}
      <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
        <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-400" />
          {{ es: 'Objetivos', en: 'Objectives', pt: 'Objetivos' }[language]}
        </h3>
        <ul className="space-y-2">
          {lab.objectives.map((obj, idx) => (
            <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              {obj[language]}
            </li>
          ))}
        </ul>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {lab.steps.map((step, idx) => (
          <div 
            key={step.id}
            className={`bg-slate-800/50 rounded-xl border transition-all ${
              currentStep === idx ? 'border-purple-500/50 ring-1 ring-purple-500/20' : 'border-slate-700/50'
            }`}
          >
            <button
              onClick={() => setCurrentStep(idx)}
              className="w-full p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={(e) => { e.stopPropagation(); toggleStepComplete(idx); }}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                    completedSteps.includes(idx)
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'border-slate-600 text-slate-400 hover:border-purple-500'
                  }`}
                >
                  {completedSteps.includes(idx) ? <Check className="w-4 h-4" /> : idx + 1}
                </button>
                <span className={`font-medium ${completedSteps.includes(idx) ? 'text-slate-400 line-through' : 'text-white'}`}>
                  {step.title[language]}
                </span>
              </div>
              {currentStep === idx ? <ChevronDown className="w-5 h-5 text-slate-400" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
            </button>

            {currentStep === idx && (
              <div className="px-4 pb-4 space-y-4">
                <p className="text-slate-300 pl-12">{step.description[language]}</p>
                
                {step.code && (
                  <div className="pl-12">
                    <CodeBlock code={step.code} language={step.codeLanguage || 'python'} />
                  </div>
                )}

                {step.tip && (
                  <div className="pl-12 bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-amber-200">{step.tip[language]}</span>
                  </div>
                )}

                {step.warning && (
                  <div className="pl-12 bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-red-200">{step.warning[language]}</span>
                  </div>
                )}

                {step.checkpoint && (
                  <div className="pl-12 bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 flex items-start gap-2">
                    <Info className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-purple-200">{step.checkpoint[language]}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Completion */}
      {completedSteps.length === lab.steps.length && (
        <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl p-6 border border-emerald-500/30 text-center">
          <Award className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">{{ es: '¡Lab Completado!', en: 'Lab Complete!', pt: 'Lab Concluído!' }[language]}</h3>
          <p className="text-emerald-300 mb-4">{{ es: 'Has ganado', en: 'You earned', pt: 'Você ganhou' }[language]} +{lab.xpReward} XP</p>
          <button 
            onClick={onBack}
            className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors"
          >
            {{ es: 'Volver a la especialización', en: 'Back to specialization', pt: 'Voltar à especialização' }[language]}
          </button>
        </div>
      )}
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
export const DatabricksSpecializationView: React.FC<DatabricksSpecializationViewProps> = ({ onBack }) => {
  const { language, tLocalized: t } = useLanguage();
  const lang = language as 'es' | 'en' | 'pt';
  
  // Load saved progress from localStorage
  const getSavedProgress = () => {
    const saved = localStorage.getItem('databricks_progress');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  };

  const savedProgress = getSavedProgress();
  const initialPhase = savedProgress?.phaseId 
    ? ALL_DATABRICKS_PHASES.find(p => p.id === savedProgress.phaseId) || ALL_DATABRICKS_PHASES[0]
    : ALL_DATABRICKS_PHASES[0];

  const [selectedPhase, setSelectedPhase] = useState<DatabricksPhase>(initialPhase);
  const [selectedLab, setSelectedLab] = useState<DatabricksLab | null>(null);
  const [expandedStep, setExpandedStep] = useState<string | null>(savedProgress?.expandedStep || null);
  const [activeTab, setActiveTab] = useState<'content' | 'labs' | 'exercises'>('content');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<string[]>(savedProgress?.completedSteps || []);

  // Save progress whenever it changes
  useEffect(() => {
    const progress = {
      phaseId: selectedPhase.id,
      expandedStep,
      completedSteps,
      lastVisited: Date.now()
    };
    localStorage.setItem('databricks_progress', JSON.stringify(progress));
    // Also mark that this specialization is active
    localStorage.setItem('active_specialization', 'databricks');
  }, [selectedPhase.id, expandedStep, completedSteps]);

  // Toggle step completion
  const toggleStepComplete = (stepId: string) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) ? prev.filter(id => id !== stepId) : [...prev, stepId]
    );
  };

  // Calculate progress percentage
  const totalSteps = ALL_DATABRICKS_PHASES.reduce((sum, phase) => sum + phase.steps.length, 0);
  const progressPercent = Math.round((completedSteps.length / totalSteps) * 100);

  // Get related labs and exercises for current phase
  const phaseLabs = getLabsByPhase(selectedPhase.id);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const phaseExercises = ALL_DATABRICKS_EXERCISES.filter(ex => 
    ex.tags?.some(tag => selectedPhase.id.includes('3') ? tag.includes('spark') : tag.includes('delta'))
  ).slice(0, 5);

  // If viewing a lab detail
  if (selectedLab) {
    return <LabDetailView lab={selectedLab} language={lang} onBack={() => setSelectedLab(null)} />;
  }

  return (
    <div className="flex h-full min-h-[800px]">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-72'} bg-slate-900/50 border-r border-slate-700/50 flex flex-col transition-all duration-300`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-700/50">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-3">
              <span className="text-3xl">🔶</span>
              <div>
                <h2 className="font-bold text-white text-sm">Databricks</h2>
                <p className="text-xs text-slate-400">Data Engineer</p>
              </div>
            </div>
          )}
          {sidebarCollapsed && <span className="text-2xl block text-center">🔶</span>}
        </div>

        {/* Progress */}
        {!sidebarCollapsed && (
          <div className="p-4 border-b border-slate-700/50">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-slate-400">{t({ es: 'Progreso', en: 'Progress', pt: 'Progresso' })}</span>
              <span className="text-orange-400 font-medium">{progressPercent}%</span>
            </div>
            <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {completedSteps.length} / {totalSteps} {t({ es: 'pasos', en: 'steps', pt: 'passos' })}
            </div>
          </div>
        )}

        {/* Phases */}
        <div className="flex-1 overflow-y-auto p-2">
          {!sidebarCollapsed && <div className="text-xs text-slate-500 uppercase px-2 mb-2">{t({ es: 'Fases', en: 'Phases', pt: 'Fases' })}</div>}
          {ALL_DATABRICKS_PHASES.map((phase) => (
            <button
              key={phase.id}
              onClick={() => { setSelectedPhase(phase); setActiveTab('content'); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all ${
                selectedPhase.id === phase.id
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <span className="text-lg">{phase.icon}</span>
              {!sidebarCollapsed && (
                <div className="flex-1 text-left">
                  <div className="text-xs text-slate-500">Fase {phase.number}</div>
                  <div className="text-sm font-medium truncate">{phase.title[lang]}</div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Quick Stats */}
        {!sidebarCollapsed && (
          <div className="p-4 border-t border-slate-700/50">
            <div className="grid grid-cols-2 gap-2 text-center mb-3">
              <div className="bg-slate-800/50 rounded-lg p-2">
                <div className="text-lg font-bold text-orange-400">{DATABRICKS_STATS.phases}</div>
                <div className="text-xs text-slate-500">{t({ es: 'Fases', en: 'Phases', pt: 'Fases' })}</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-2">
                <div className="text-lg font-bold text-emerald-400">{DATABRICKS_STATS.labs}</div>
                <div className="text-xs text-slate-500">{t({ es: 'Labs', en: 'Labs', pt: 'Labs' })}</div>
              </div>
            </div>
            {/* View All Specializations Link */}
            <button
              onClick={() => {
                localStorage.removeItem('active_specialization');
                onBack();
              }}
              className="w-full text-xs text-slate-500 hover:text-slate-300 transition-colors py-2 flex items-center justify-center gap-1"
            >
              <FolderOpen className="w-3 h-3" />
              {t({ es: 'Ver todas', en: 'View all', pt: 'Ver todas' })}
            </button>
          </div>
        )}

        {/* Collapse Toggle */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-3 border-t border-slate-700/50 text-slate-400 hover:text-white transition-colors flex items-center justify-center"
        >
          {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Top Navigation Bar */}
        <div className="bg-slate-900/80 border-b border-slate-700/50 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔶</span>
            <div>
              <h2 className="text-white font-bold text-lg">{t({ es: 'Especialización Databricks', en: 'Databricks Specialization', pt: 'Especialização Databricks' })}</h2>
              <p className="text-slate-400 text-xs">{completedSteps.length} / {totalSteps} {t({ es: 'pasos completados', en: 'steps completed', pt: 'passos concluídos' })}</p>
            </div>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('active_specialization');
              onBack();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-sm font-medium transition-all border border-slate-700 hover:border-slate-600"
          >
            <FolderOpen className="w-4 h-4" />
            {t({ es: 'Ver especializaciones', en: 'View specializations', pt: 'Ver especializações' })}
          </button>
        </div>

        {/* Phase Header */}
        <div className="bg-gradient-to-br from-orange-500/10 via-slate-900 to-amber-500/5 p-8 border-b border-slate-700/50">
          <div className="flex items-start gap-4 mb-4">
            <span className="text-5xl">{selectedPhase.icon}</span>
            <div className="flex-1">
              <div className="text-sm text-slate-400 mb-1">FASE {selectedPhase.number}</div>
              <h1 className="text-2xl font-bold text-white mb-2">{selectedPhase.title[lang]}</h1>
              <p className="text-slate-300">{selectedPhase.description[lang]}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{selectedPhase.estimatedDays}</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">{selectedPhase.steps.length} {t({ es: 'pasos', en: 'steps', pt: 'passos' })}</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            {[
              { id: 'content', label: t({ es: 'Contenido', en: 'Content', pt: 'Conteúdo' }), icon: BookOpen },
              { id: 'labs', label: `Labs (${phaseLabs.length})`, icon: Beaker },
              { id: 'exercises', label: t({ es: 'Ejercicios', en: 'Exercises', pt: 'Exercícios' }), icon: Dumbbell }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {/* Content Tab */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              {selectedPhase.steps.map((step, idx) => {
                const isCompleted = completedSteps.includes(step.id);
                return (
                <div 
                  key={step.id}
                  className={`bg-slate-800/30 rounded-xl border overflow-hidden transition-all ${
                    isCompleted ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-slate-700/50'
                  }`}
                >
                  {/* Step Header */}
                  <div className="flex items-center">
                    {/* Completion Checkbox */}
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleStepComplete(step.id); }}
                      className={`p-5 border-r border-slate-700/30 hover:bg-slate-700/30 transition-colors ${
                        isCompleted ? 'text-emerald-400' : 'text-slate-500'
                      }`}
                      title={isCompleted ? t({ es: 'Marcar como incompleto', en: 'Mark as incomplete', pt: 'Marcar como incompleto' }) : t({ es: 'Marcar como completado', en: 'Mark as complete', pt: 'Marcar como concluído' })}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-slate-500" />
                      )}
                    </button>
                    
                    {/* Step Content Toggle */}
                    <button
                      onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                      className="flex-1 p-5 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                          isCompleted 
                            ? 'bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border-emerald-500/30' 
                            : 'bg-gradient-to-br from-orange-500/20 to-amber-500/20 border-orange-500/30'
                        }`}>
                          <span className={`font-bold ${isCompleted ? 'text-emerald-400' : 'text-orange-400'}`}>{idx + 1}</span>
                        </div>
                        <div className="text-left">
                          <h3 className={`font-semibold ${isCompleted ? 'text-emerald-300' : 'text-white'}`}>{step.title?.[lang] || ''}</h3>
                          <p className="text-sm text-slate-400">{step.description?.[lang] || ''}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {step.estimatedMinutes && (
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {step.estimatedMinutes} min
                          </span>
                        )}
                        {step.xpReward && !isCompleted && (
                          <span className="text-xs text-amber-400 font-medium">+{step.xpReward} XP</span>
                        )}
                        {isCompleted && (
                          <span className="text-xs text-emerald-400 font-medium">✓ Completado</span>
                        )}
                        {expandedStep === step.id ? (
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                    </button>
                  </div>

                  {/* Step Content */}
                  {expandedStep === step.id && (
                    <div className="border-t border-slate-700/50">
                      {/* Theory Section */}
                      {step.theory && (
                        <div className="p-6 border-b border-slate-700/30">
                          <div className="flex items-center gap-2 mb-4">
                            <BookOpen className="w-5 h-5 text-orange-400" />
                            <h4 className="font-semibold text-white">{t({ es: 'Teoría', en: 'Theory', pt: 'Teoria' })}</h4>
                          </div>
                          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/30">
                            {renderTheoryMarkdown(step.theory[lang] || '')}
                          </div>
                        </div>
                      )}

                      {/* Code Example */}
                      {step.codeExample && (
                        <div className="p-6 border-b border-slate-700/30">
                          <div className="flex items-center gap-2 mb-4">
                            <Code className="w-5 h-5 text-emerald-400" />
                            <h4 className="font-semibold text-white">{t({ es: 'Código de Ejemplo', en: 'Example Code', pt: 'Código de Exemplo' })}</h4>
                          </div>
                          <CodeBlock 
                            code={step.codeExample.code} 
                            language={step.codeExample.language}
                            title={step.codeExample.language.toUpperCase()}
                          />
                          {step.codeExample.explanation && (
                            <p className="mt-3 text-sm text-slate-400">{step.codeExample.explanation[lang]}</p>
                          )}
                        </div>
                      )}

                      {/* Tips */}
                      {(step.tips?.length || step.practicalTips?.length) ? (
                        <div className="p-6 border-b border-slate-700/30">
                          <div className="flex items-center gap-2 mb-4">
                            <Lightbulb className="w-5 h-5 text-amber-400" />
                            <h4 className="font-semibold text-white">{t({ es: 'Tips Prácticos', en: 'Practical Tips', pt: 'Dicas Práticas' })}</h4>
                          </div>
                          <div className="space-y-2">
                            {step.tips?.map((tip, i) => (
                              <div key={i} className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-sm text-amber-200">
                                {tip[lang]}
                              </div>
                            ))}
                            {step.practicalTips?.map((tip, i) => (
                              <div key={`pt-${i}`} className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-sm text-amber-200">
                                {tip[lang]}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      {/* Checkpoint */}
                      {step.checkpoint && (
                        <div className="p-6 bg-purple-500/5">
                          <div className="flex items-center gap-2 mb-3">
                            <Target className="w-5 h-5 text-purple-400" />
                            <h4 className="font-semibold text-white">{t({ es: 'Punto de Control', en: 'Checkpoint', pt: 'Ponto de Verificação' })}</h4>
                          </div>
                          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                            <p className="text-purple-200">{step.checkpoint[lang]}</p>
                          </div>
                        </div>
                      )}

                      {/* Resources */}
                      {step.externalLinks && step.externalLinks.length > 0 && (
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-4">
                            <ExternalLink className="w-5 h-5 text-blue-400" />
                            <h4 className="font-semibold text-white">{t({ es: 'Recursos', en: 'Resources', pt: 'Recursos' })}</h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {step.externalLinks.map((link, i) => (
                              <a
                                key={i}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors"
                              >
                                <ExternalLink className="w-4 h-4" />
                                {link.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
              })}
            </div>
          )}

          {/* Labs Tab */}
          {activeTab === 'labs' && (
            <div className="space-y-6">
              {phaseLabs.length > 0 ? (
                <>
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 flex items-start gap-3">
                    <Beaker className="w-6 h-6 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-white mb-1">{t({ es: 'Labs Prácticos', en: 'Hands-on Labs', pt: 'Labs Práticos' })}</h3>
                      <p className="text-sm text-purple-200">
                        {t({ 
                          es: 'Estos labs están diseñados para usar con Databricks Community Edition (gratis). Incluyen código paso a paso, checkpoints y recompensas de XP.',
                          en: 'These labs are designed to use with Databricks Community Edition (free). They include step-by-step code, checkpoints and XP rewards.',
                          pt: 'Estes labs foram projetados para usar com Databricks Community Edition (grátis). Incluem código passo a passo, checkpoints e recompensas de XP.'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {phaseLabs.map(lab => (
                      <LabCard 
                        key={lab.id} 
                        lab={lab} 
                        language={lang}
                        onSelect={() => setSelectedLab(lab)}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <Beaker className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-400 mb-2">{t({ es: 'No hay labs para esta fase', en: 'No labs for this phase', pt: 'Sem labs para esta fase' })}</h3>
                  <p className="text-sm text-slate-500">{t({ es: 'Los labs de esta fase estarán disponibles pronto.', en: 'Labs for this phase will be available soon.', pt: 'Os labs desta fase estarão disponíveis em breve.' })}</p>
                </div>
              )}

              {/* All Labs */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-slate-400" />
                  {t({ es: 'Todos los Labs Disponibles', en: 'All Available Labs', pt: 'Todos os Labs Disponíveis' })}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ALL_DATABRICKS_LABS.slice(0, 6).map(lab => (
                    <LabCard 
                      key={lab.id} 
                      lab={lab} 
                      language={lang}
                      onSelect={() => setSelectedLab(lab)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Exercises Tab */}
          {activeTab === 'exercises' && (
            <div className="space-y-6">
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 flex items-start gap-3">
                <Dumbbell className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-white mb-1">{t({ es: 'Ejercicios de Práctica', en: 'Practice Exercises', pt: 'Exercícios de Prática' })}</h3>
                  <p className="text-sm text-emerald-200">
                    {t({ 
                      es: 'Completa el código y verifica tus soluciones. Cada ejercicio incluye hints y la solución completa.',
                      en: 'Complete the code and verify your solutions. Each exercise includes hints and the full solution.',
                      pt: 'Complete o código e verifique suas soluções. Cada exercício inclui dicas e a solução completa.'
                    })}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {ALL_DATABRICKS_EXERCISES.slice(0, 5).map((exercise, idx) => (
                  <ExerciseCard 
                    key={exercise.id}
                    exercise={exercise}
                    language={lang}
                    index={idx}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatabricksSpecializationView;

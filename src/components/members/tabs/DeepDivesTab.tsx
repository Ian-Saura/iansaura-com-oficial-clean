import React, { useState, useMemo } from 'react';
import { 
  BookOpen, Search, Clock, Award, ChevronRight, Sparkles, 
  GraduationCap, FileText, ExternalLink, Filter, CheckCircle,
  BookMarked, Brain, Target, TrendingUp, ArrowLeft
} from 'lucide-react';
import { useLanguage } from '../../../i18n/LanguageContext';
import { LocalizedContent as LC, t as tLocalized } from '../../../types/i18n';
import { deepDives, DEEP_DIVES_STATS } from '../../../data/deepDives';
import { DeepDiveContent } from '../../../types/deepDives';

interface DeepDivesTabProps {
  onViewContent: (deepDiveId: string) => void;
  completedDives?: string[];
  onBack?: () => void;
}

/**
 * DeepDivesTab - Vista principal de la especialización "Fundamentos Teóricos"
 * 
 * Contenido académico profundo OPCIONAL que complementa el roadmap.
 */
export const DeepDivesTab: React.FC<DeepDivesTabProps> = ({ 
  onViewContent,
  completedDives = [],
  onBack
}) => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const t = (content: LC | string): string => {
    if (typeof content === 'string') return content;
    return tLocalized(content, language);
  };

  // Filtrar Deep Dives
  const filteredDives = useMemo(() => {
    return deepDives.filter(dive => {
      const matchesSearch = searchQuery === '' || 
        t(dive.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
        t(dive.subtitle).toLowerCase().includes(searchQuery.toLowerCase()) ||
        dive.tags.some(tag => t(tag).toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesDifficulty = selectedDifficulty === 'all' || dive.difficulty === selectedDifficulty;
      const matchesCategory = selectedCategory === 'all' || dive.category === selectedCategory;
      
      return matchesSearch && matchesDifficulty && matchesCategory;
    });
  }, [searchQuery, selectedDifficulty, selectedCategory, language]);

  // Categorías únicas
  const categories = useMemo(() => {
    return Array.from(new Set(deepDives.map(d => d.category)));
  }, []);

  // Stats de progreso
  const completedCount = completedDives.length;
  const progressPercent = Math.round((completedCount / deepDives.length) * 100);
  const earnedXP = deepDives
    .filter(d => completedDives.includes(d.id))
    .reduce((acc, d) => acc + d.xpBonus, 0);

  return (
    <div className="space-y-6">
      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          {t({ es: 'Volver a Especializaciones', en: 'Back to Specializations', pt: 'Voltar para Especializações' })}
        </button>
      )}

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500/20 via-purple-500/10 to-fuchsia-500/20 border border-violet-500/30 p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-violet-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex items-start gap-6 mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-4xl shadow-2xl shadow-violet-500/30">
              🎓
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                  {t({ es: 'Fundamentos Teóricos', en: 'Theoretical Foundations', pt: 'Fundamentos Teóricos' })}
                </h1>
                <span className="px-2 py-1 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {t({ es: 'OPCIONAL', en: 'OPTIONAL', pt: 'OPCIONAL' })}
                </span>
              </div>
              <p className="text-slate-300 text-lg max-w-2xl">
                {t({ 
                  es: 'Contenido académico profundo para quienes quieren entender el "por qué", no solo el "cómo". First Principles, papers clásicos y gotchas de nivel senior.', 
                  en: 'Deep academic content for those who want to understand the "why", not just the "how". First Principles, classic papers and senior-level gotchas.', 
                  pt: 'Conteúdo acadêmico profundo para quem quer entender o "porquê", não apenas o "como". First Principles, papers clássicos e gotchas de nível sênior.' 
                })}
              </p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-violet-400" />
                <span className="text-sm text-slate-400">{t({ es: 'Deep Dives', en: 'Deep Dives', pt: 'Deep Dives' })}</span>
              </div>
              <div className="text-2xl font-bold text-white">{DEEP_DIVES_STATS.total}</div>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-slate-400">{t({ es: 'Lectura total', en: 'Total reading', pt: 'Leitura total' })}</span>
              </div>
              <div className="text-2xl font-bold text-white">{DEEP_DIVES_STATS.totalReadingTime} min</div>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-yellow-400" />
                <span className="text-sm text-slate-400">{t({ es: 'XP total', en: 'Total XP', pt: 'XP total' })}</span>
              </div>
              <div className="text-2xl font-bold text-white">{DEEP_DIVES_STATS.totalXP}</div>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span className="text-sm text-slate-400">{t({ es: 'Tu progreso', en: 'Your progress', pt: 'Seu progresso' })}</span>
              </div>
              <div className="text-2xl font-bold text-emerald-400">{progressPercent}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* What's Included */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 flex items-start gap-3">
          <Brain className="w-6 h-6 text-violet-400 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-white text-sm">{t({ es: 'Mapas Mentales', en: 'Mind Maps', pt: 'Mapas Mentais' })}</h4>
            <p className="text-xs text-slate-400">{t({ es: 'Mermaid.js para visualizar conceptos', en: 'Mermaid.js to visualize concepts', pt: 'Mermaid.js para visualizar conceitos' })}</p>
          </div>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 flex items-start gap-3">
          <FileText className="w-6 h-6 text-blue-400 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-white text-sm">{t({ es: 'Cheat Sheets', en: 'Cheat Sheets', pt: 'Cheat Sheets' })}</h4>
            <p className="text-xs text-slate-400">{t({ es: 'Comandos y snippets de referencia', en: 'Commands and reference snippets', pt: 'Comandos e snippets de referência' })}</p>
          </div>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 flex items-start gap-3">
          <BookMarked className="w-6 h-6 text-orange-400 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-white text-sm">{t({ es: 'Bibliografía', en: 'Bibliography', pt: 'Bibliografia' })}</h4>
            <p className="text-xs text-slate-400">{t({ es: 'Kleppmann, Kimball, Google Papers', en: 'Kleppmann, Kimball, Google Papers', pt: 'Kleppmann, Kimball, Google Papers' })}</p>
          </div>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 flex items-start gap-3">
          <Target className="w-6 h-6 text-red-400 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-white text-sm">{t({ es: 'Gotchas Senior', en: 'Senior Gotchas', pt: 'Gotchas Sênior' })}</h4>
            <p className="text-xs text-slate-400">{t({ es: 'Errores comunes de nivel senior', en: 'Common senior-level mistakes', pt: 'Erros comuns de nível sênior' })}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t({ es: 'Buscar Deep Dives...', en: 'Search Deep Dives...', pt: 'Buscar Deep Dives...' })}
            className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50"
          />
        </div>

        {/* Difficulty Filter */}
        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
        >
          <option value="all">{t({ es: 'Todos los niveles', en: 'All levels', pt: 'Todos os níveis' })}</option>
          <option value="foundational">{t({ es: 'Fundamentos', en: 'Foundational', pt: 'Fundamentos' })}</option>
          <option value="intermediate">{t({ es: 'Intermedio', en: 'Intermediate', pt: 'Intermediário' })}</option>
          <option value="advanced">{t({ es: 'Avanzado', en: 'Advanced', pt: 'Avançado' })}</option>
        </select>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
        >
          <option value="all">{t({ es: 'Todas las categorías', en: 'All categories', pt: 'Todas as categorias' })}</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Deep Dives Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredDives.map((dive) => {
          const isCompleted = completedDives.includes(dive.id);
          
          return (
            <button
              key={dive.id}
              onClick={() => onViewContent(dive.id)}
              className={`group relative overflow-hidden rounded-2xl p-5 border text-left transition-all
                ${isCompleted 
                  ? 'bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500/50' 
                  : 'bg-slate-800/50 border-slate-700/50 hover:border-violet-500/50 hover:bg-slate-800'
                }`}
            >
              {/* Completed Badge */}
              {isCompleted && (
                <div className="absolute top-4 right-4">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle className="w-3.5 h-3.5" />
                    {t({ es: 'Completado', en: 'Completed', pt: 'Completado' })}
                  </span>
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-xl bg-${dive.color}-500/20 flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  {dive.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-white text-lg group-hover:text-violet-300 transition-colors">
                      {t(dive.title)}
                    </h3>
                    <Sparkles className="w-4 h-4 text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <p className="text-sm text-slate-400 mb-3 line-clamp-2">
                    {t(dive.subtitle)}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {dive.tags.slice(0, 3).map((tag, i) => (
                      <span 
                        key={i} 
                        className={`text-xs px-2 py-0.5 rounded-full bg-${dive.color}-500/10 text-${dive.color}-400 border border-${dive.color}-500/20`}
                      >
                        {t(tag)}
                      </span>
                    ))}
                  </div>
                  
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {dive.readingTime}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full bg-${dive.color}-500/20 text-${dive.color}-400`}>
                      {dive.difficulty === 'foundational' ? t({ es: 'Fundamentos', en: 'Foundational', pt: 'Fundamentos' }) :
                       dive.difficulty === 'intermediate' ? t({ es: 'Intermedio', en: 'Intermediate', pt: 'Intermediário' }) :
                       t({ es: 'Avanzado', en: 'Advanced', pt: 'Avançado' })}
                    </span>
                    <span className="flex items-center gap-1 text-yellow-400">
                      <Award className="w-3.5 h-3.5" />
                      +{dive.xpBonus} XP
                    </span>
                  </div>
                </div>
                
                <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-all flex-shrink-0 self-center" />
              </div>

              {/* Key References Preview */}
              {dive.keyReferences.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-700/50">
                  <p className="text-xs text-slate-500 mb-2">
                    📚 {t({ es: 'Bibliografía incluida:', en: 'Included bibliography:', pt: 'Bibliografia incluída:' })}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {dive.keyReferences.slice(0, 2).map((ref, i) => (
                      <span key={i} className="text-xs text-slate-400 bg-slate-900/50 px-2 py-1 rounded">
                        {ref.author}
                      </span>
                    ))}
                    {dive.keyReferences.length > 2 && (
                      <span className="text-xs text-slate-500">+{dive.keyReferences.length - 2} más</span>
                    )}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredDives.length === 0 && (
        <div className="text-center py-12 bg-slate-800/30 rounded-2xl border border-slate-700/50">
          <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-400 mb-2">
            {t({ es: 'No se encontraron Deep Dives', en: 'No Deep Dives found', pt: 'Nenhum Deep Dive encontrado' })}
          </h3>
          <p className="text-sm text-slate-500">
            {t({ es: 'Intenta con otros filtros o términos de búsqueda', en: 'Try other filters or search terms', pt: 'Tente outros filtros ou termos de busca' })}
          </p>
        </div>
      )}

      {/* Coming Soon Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl p-5 border border-amber-500/30">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-amber-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-white">
              {t({ es: '🚀 Más Deep Dives en camino...', en: '🚀 More Deep Dives coming...', pt: '🚀 Mais Deep Dives a caminho...' })}
            </h3>
            <p className="text-sm text-slate-400">
              {t({ 
                es: 'Próximamente: AWS Deep Dives, Kafka Internals, dbt Best Practices y más', 
                en: 'Coming soon: AWS Deep Dives, Kafka Internals, dbt Best Practices and more', 
                pt: 'Em breve: AWS Deep Dives, Kafka Internals, dbt Best Practices e mais' 
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeepDivesTab;


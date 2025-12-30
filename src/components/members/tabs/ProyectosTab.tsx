import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, Target, Clock, Briefcase, ChevronRight, Lock, Code, Eye, EyeOff, BookOpen } from 'lucide-react';
import { useLanguage } from '../../../i18n/LanguageContext';
import { LocalizedContent as LC, t as tLocalized } from '../../../types/i18n';
import { useUserProgress } from '../../../hooks/useUserProgress';
import { projects, upcomingProjects } from '../../../data/projectsData';

export const ProyectosTab: React.FC<{ progress: ReturnType<typeof useUserProgress> }> = ({ progress }) => {
  const { language } = useLanguage();
  const t = (content: LC | string): string => tLocalized(content, language);
  const [levelFilter, setLevelFilter] = useState<number | 'all'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'level' | 'difficulty' | 'duration'>('level');
  const [showCompleted, setShowCompleted] = useState(true);

  const completedCount = progress.progress.completedProjects.length;
  const totalProgress = Math.round((completedCount / projects.length) * 100);

  // Filter and sort projects
  const filteredProjects = projects
    .filter(p => levelFilter === 'all' || p.level === levelFilter)
    .filter(p => difficultyFilter === 'all' || p.difficulty === difficultyFilter)
    .filter(p => showCompleted || !progress.isProjectCompleted(p.id))
    .sort((a, b) => {
      if (sortBy === 'level') return a.level - b.level;
      if (sortBy === 'difficulty') {
        const order = { 'Principiante': 1, 'Intermedio': 2, 'Avanzado': 3, 'Expert': 4 };
        return (order[a.difficulty] || 0) - (order[b.difficulty] || 0);
      }
      if (sortBy === 'duration') {
        const getDurationHours = (d: string) => parseInt(d.split('-')[0]) || 0;
        return getDurationHours(a.duration) - getDurationHours(b.duration);
      }
      return 0;
    });

  return (
    <div className="space-y-8">
      {/* Premium Header */}
      <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-indigo-500/20">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-400 text-xs font-medium rounded-full">✨ PREMIUM</span>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full">✓ VERIFICADOS</span>
        </div>
            <h2 className="text-2xl font-bold text-white mb-2">🎯 Proyectos Prácticos para tu Portfolio</h2>
            <p className="text-slate-300 max-w-2xl">
              Proyectos <strong className="text-white">reales de empresas</strong> con paso a paso detallado, 
              datasets incluidos y <strong className="text-purple-400">guía de storytelling para entrevistas</strong>.
            </p>
      </div>
          <div className="hidden md:flex flex-col items-end gap-1">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Award className="w-4 h-4 text-amber-400" />
              <span>{projects.length} proyectos disponibles</span>
    </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Briefcase className="w-4 h-4 text-cyan-400" />
              <span>Usados en Netflix, Spotify, Uber...</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-400" />
            <span className="font-semibold text-white">Progreso Total</span>
          </div>
          <span className="text-white font-bold">{completedCount}/{projects.length} proyectos</span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 transition-all" style={{ width: `${totalProgress}%` }} />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <div className="flex flex-wrap items-center gap-4">
          {/* Level Filter */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-sm">Nivel:</span>
            <div className="flex gap-1">
              {['all', 1, 2, 3].map((level) => (
                <button
                  key={level}
                  onClick={() => setLevelFilter(level as number | 'all')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                    levelFilter === level
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {level === 'all' ? 'Todos' : `Nivel ${level}`}
                </button>
                ))}
              </div>
                  </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-sm">Dificultad:</span>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="bg-slate-700 text-white rounded-lg px-3 py-1 text-sm border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">Todas</option>
              <option value="Principiante">Principiante</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzado">Avanzado</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-sm">Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'level' | 'difficulty' | 'duration')}
              className="bg-slate-700 text-white rounded-lg px-3 py-1 text-sm border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="level">Por Nivel</option>
              <option value="difficulty">Por Dificultad</option>
              <option value="duration">Por Duración</option>
            </select>
          </div>

          {/* Show Completed Toggle */}
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium transition-all ${
              showCompleted
                ? 'bg-slate-700 text-slate-300'
                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
            }`}
          >
            {showCompleted ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            {showCompleted ? 'Mostrar completados' : 'Ocultar completados'}
          </button>
        </div>

        {/* Results count */}
        <div className="mt-3 text-slate-500 text-sm">
          Mostrando {filteredProjects.length} de {projects.length} proyectos
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProjects.map((project) => {
          const isCompleted = progress.isProjectCompleted(project.id);
          
          const colorClasses: Record<string, string> = {
            emerald: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/30 hover:border-emerald-500/50',
            blue: 'from-blue-500/20 to-blue-600/5 border-blue-500/30 hover:border-blue-500/50',
            purple: 'from-purple-500/20 to-purple-600/5 border-purple-500/30 hover:border-purple-500/50',
            orange: 'from-orange-500/20 to-orange-600/5 border-orange-500/30 hover:border-orange-500/50',
          };
          
          const bgColor = colorClasses[project.color || 'emerald'] || colorClasses.emerald;
          
          return (
            <Link 
              key={project.id} 
              to={`/project/${project.id}`}
              id={`project-${project.id}`}
              className={`block rounded-xl border overflow-hidden transition-all transform hover:scale-[1.02] hover:shadow-xl ${
                isCompleted 
                  ? 'bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/40' 
                  : `bg-gradient-to-br ${bgColor}`
              }`}
            >
              {/* Project Card */}
              <div className="p-5">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`text-4xl flex-shrink-0`}>
                    {project.icon || (isCompleted ? '✅' : '📦')}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    {/* Badges */}
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      {isCompleted && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500 text-white font-medium">
                          ✓ Completado
                        </span>
                      )}
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        project.difficulty === 'Principiante' ? 'bg-green-500/20 text-green-400' :
                        project.difficulty === 'Intermedio' ? 'bg-yellow-500/20 text-yellow-400' :
                        project.difficulty === 'Avanzado' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>{project.difficulty}</span>
                      <span className="text-slate-500 text-xs">Nivel {project.level}</span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-bold text-white text-lg mb-1 truncate">{t(project.title)}</h3>
                    
                    {/* Description */}
                    <p className="text-slate-400 text-sm line-clamp-2 mb-3">{t(project.description)}</p>
                    
                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {project.duration}
                      </span>
                      {project.estimatedLines && (
                        <span className="flex items-center gap-1">
                          <Code className="w-3 h-3" /> ~{project.estimatedLines} líneas
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" /> {project.steps.length} pasos
                      </span>
                    </div>
                    
                    {/* Skills preview */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {project.skills.slice(0, 4).map((skill, idx) => (
                        <span key={idx} className="text-xs bg-slate-700/50 text-slate-400 px-2 py-0.5 rounded">
                          {t(skill)}
                        </span>
                      ))}
                      {project.skills.length > 4 && (
                        <span className="text-xs text-slate-500">+{project.skills.length - 4}</span>
                      )}
                    </div>
                    
                    {/* Quality indicators */}
                    {project.usedBy && project.usedBy.length > 0 && (
                      <div className="flex items-center gap-1 mt-3 pt-3 border-t border-slate-700/50">
                        <Briefcase className="w-3 h-3 text-amber-400" />
                        <span className="text-xs text-amber-400/80">Usado en:</span>
                        <span className="text-xs text-slate-400">{project.usedBy.slice(0, 2).join(', ')}</span>
                        {project.usedBy.length > 2 && <span className="text-xs text-slate-500">+{project.usedBy.length - 2}</span>}
                      </div>
                    )}
                    
                    {/* Interview story indicator */}
                    {project.interviewStory && (
                      <div className="flex items-center gap-1 mt-2">
                        <Award className="w-3 h-3 text-purple-400" />
                        <span className="text-xs text-purple-400/80">Incluye guía para entrevistas</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Arrow */}
                  <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* No results */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No hay proyectos que coincidan con los filtros seleccionados.</p>
          <button 
            onClick={() => { setLevelFilter('all'); setDifficultyFilter('all'); setShowCompleted(true); }}
            className="mt-4 text-emerald-400 hover:underline"
          >
            Limpiar filtros
          </button>
        </div>
      )}

      {/* Coming Soon */}
      <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
        <h3 className="text-lg font-semibold text-slate-400 mb-4">🔜 Próximos Proyectos</h3>
        <div className="space-y-3">
          {upcomingProjects.map((p, idx) => (
            <div key={idx} className="flex items-center gap-3 text-slate-500">
              <Lock className="w-5 h-5" />
              <span><strong>{t(p.title)}</strong> - {t(p.description)} ({p.estimatedDate})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

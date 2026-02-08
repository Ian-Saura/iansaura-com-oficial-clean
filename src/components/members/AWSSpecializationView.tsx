/**
 * AWSSpecializationView
 * AWS Data Engineering specialization view with 2 levels (Serverless + Advanced)
 * Displays phases, projects, and interview questions
 */

import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  ArrowLeft, Cloud, Clock, Layers, BookOpen, Award, ChevronDown,
  ChevronRight, Briefcase, Star, Zap, Shield
} from 'lucide-react';
import {
  awsPhasesNivel1,
  awsPhasesNivel2,
  AWS_SPECIALIZATION,
  interviewQuestions,
  awsProjectsNivel1,
  awsProjects as awsProjectsNivel2
} from '../../data/specializations/aws';
import type { AWSPhaseWithLevel } from '../../data/specializations/aws/phases';
import type { InterviewQuestion } from '../../data/specializations/aws/interview-questions';
import type { AWSProject } from '../../data/specializations/aws/types';

interface AWSSpecializationViewProps {
  onBack: () => void;
}

// ============================================
// MAIN COMPONENT
// ============================================
export const AWSSpecializationView: React.FC<AWSSpecializationViewProps> = ({ onBack }) => {
  const { language } = useLanguage();
  const [selectedLevel, setSelectedLevel] = useState<1 | 2>(1);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const t = (content: { es: string; en: string; pt: string } | string): string => {
    if (typeof content === 'string') return content;
    return content[language as 'es' | 'en' | 'pt'] || content.es;
  };

  const phases: AWSPhaseWithLevel[] = selectedLevel === 1 ? awsPhasesNivel1 : awsPhasesNivel2;
  const projects: AWSProject[] = selectedLevel === 1 ? awsProjectsNivel1 : awsProjectsNivel2;
  const levelInfo = selectedLevel === 1 ? AWS_SPECIALIZATION.levels.nivel1 : AWS_SPECIALIZATION.levels.nivel2;

  const levelColors = {
    1: { primary: 'emerald', gradient: 'from-emerald-500/20 to-teal-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', bg: 'bg-emerald-500/20', ring: 'ring-emerald-500/30' },
    2: { primary: 'purple', gradient: 'from-purple-500/20 to-violet-500/10', border: 'border-purple-500/30', text: 'text-purple-400', bg: 'bg-purple-500/20', ring: 'ring-purple-500/30' }
  };
  const colors = levelColors[selectedLevel];

  const difficultyColors: Record<string, string> = {
    intermediate: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
    expert: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    senior: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    staff: 'bg-rose-500/20 text-rose-400 border-rose-500/30'
  };

  // Group interview questions by module
  const questionsByModule = interviewQuestions.reduce<Record<string, InterviewQuestion[]>>((acc, q) => {
    const key = q.moduleId;
    if (!acc[key]) acc[key] = [];
    acc[key].push(q);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Back Button */}
      <div className="px-6 pt-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          {t({ es: 'Volver a especializaciones', en: 'Back to specializations', pt: 'Voltar às especializações' })}
        </button>
      </div>

      {/* Header */}
      <div className={`mx-6 mt-4 rounded-2xl bg-gradient-to-br ${colors.gradient} border ${colors.border} p-8`}>
        <div className="flex items-start gap-5">
          <div className="text-5xl">☁️</div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white mb-2">
              {t({ es: 'AWS Data Engineering', en: 'AWS Data Engineering', pt: 'AWS Data Engineering' })}
            </h1>
            <p className="text-slate-300 text-sm mb-4">
              {t({
                es: '2 niveles: Serverless (Free Tier) + Advanced. 15 fases, 134 pasos, 10 proyectos.',
                en: '2 levels: Serverless (Free Tier) + Advanced. 15 phases, 134 steps, 10 projects.',
                pt: '2 níveis: Serverless (Free Tier) + Advanced. 15 fases, 134 passos, 10 projetos.'
              })}
            </p>
            <div className="flex flex-wrap gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Layers className="w-3.5 h-3.5" />
                {AWS_SPECIALIZATION.totalPhases} {t({ es: 'fases', en: 'phases', pt: 'fases' })}
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <BookOpen className="w-3.5 h-3.5" />
                {AWS_SPECIALIZATION.totalSteps} {t({ es: 'pasos', en: 'steps', pt: 'passos' })}
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <Briefcase className="w-3.5 h-3.5" />
                {AWS_SPECIALIZATION.totalProjects} {t({ es: 'proyectos', en: 'projects', pt: 'projetos' })}
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                {t({ es: '10-12 semanas', en: '10-12 weeks', pt: '10-12 semanas' })}
              </span>
              <span className="flex items-center gap-1.5 text-amber-400">
                <Award className="w-3.5 h-3.5" />
                {AWS_SPECIALIZATION.totalXP.total.toLocaleString()} XP
              </span>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text} border ${colors.border}`}>
            Coming Soon
          </span>
        </div>
      </div>

      {/* Level Selector */}
      <div className="px-6 mt-6">
        <div className="flex gap-3">
          {([1, 2] as const).map(level => {
            const isActive = selectedLevel === level;
            const lColors = levelColors[level];
            const lInfo = level === 1 ? AWS_SPECIALIZATION.levels.nivel1 : AWS_SPECIALIZATION.levels.nivel2;
            return (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`flex-1 p-4 rounded-xl border transition-all text-left ${
                  isActive
                    ? `${lColors.bg} ${lColors.border} ring-1 ${lColors.ring}`
                    : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {level === 1 ? <Zap className={`w-4 h-4 ${isActive ? lColors.text : 'text-slate-500'}`} /> : <Shield className={`w-4 h-4 ${isActive ? lColors.text : 'text-slate-500'}`} />}
                  <span className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-slate-400'}`}>
                    {t(lInfo.name)}
                  </span>
                </div>
                <p className={`text-xs ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                  {t(lInfo.description)}
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                  <span>{lInfo.phases} {t({ es: 'fases', en: 'phases', pt: 'fases' })}</span>
                  <span>{lInfo.projects} {t({ es: 'proyectos', en: 'projects', pt: 'projetos' })}</span>
                  <span>{lInfo.estimatedWeeks} {t({ es: 'semanas', en: 'weeks', pt: 'semanas' })}</span>
                  {level === 1 && (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <Star className="w-3 h-3" /> Free Tier
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Phase Cards Grid */}
      <div className="px-6 mt-8">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Layers className={`w-5 h-5 ${colors.text}`} />
          {t({ es: 'Fases', en: 'Phases', pt: 'Fases' })} - {t(levelInfo.name)}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {phases.map((phase) => (
            <div
              key={phase.id}
              className="bg-slate-800/60 rounded-xl border border-slate-700/50 p-5 hover:border-slate-600/50 transition-all"
            >
              {/* Icon & Title */}
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl">{phase.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-sm leading-tight">{t(phase.title)}</h3>
                  {phase.subtitle && (
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{t(phase.subtitle)}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-400 line-clamp-2 mb-3">{t(phase.description)}</p>

              {/* Services Badges */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {(phase.services || []).slice(0, 4).map((service) => (
                  <span
                    key={service}
                    className="px-2 py-0.5 bg-slate-700/60 text-slate-300 rounded text-[10px] font-medium"
                  >
                    {service}
                  </span>
                ))}
                {(phase.services || []).length > 4 && (
                  <span className="px-2 py-0.5 bg-slate-700/40 text-slate-500 rounded text-[10px]">
                    +{(phase.services || []).length - 4}
                  </span>
                )}
              </div>

              {/* Meta */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-700/30">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    {phase.stepsCount || 0} {t({ es: 'pasos', en: 'steps', pt: 'passos' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {phase.estimatedDays}
                  </span>
                </div>
                {selectedLevel === 1 && (
                  <span className="text-emerald-400 text-[10px] font-medium px-1.5 py-0.5 bg-emerald-500/10 rounded">
                    Free Tier ✓
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects Section */}
      <div className="px-6 mt-10">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Briefcase className={`w-5 h-5 ${colors.text}`} />
          {t({ es: 'Proyectos', en: 'Projects', pt: 'Projetos' })} ({projects.length})
        </h2>
        <div className="space-y-3">
          {projects.slice(0, 5).map((project) => (
            <div
              key={project.id}
              className="bg-slate-800/60 rounded-xl border border-slate-700/50 p-5 hover:border-slate-600/50 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-white text-sm">{t(project.title)}</h3>
                  {project.subtitle && (
                    <p className="text-xs text-slate-400 mt-0.5">{t(project.subtitle)}</p>
                  )}
                </div>
                <span className={`text-xs px-2 py-1 rounded-full border ${difficultyColors[project.difficulty] || difficultyColors.intermediate}`}>
                  {project.difficulty}
                </span>
              </div>

              {/* Services */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {(project.services || []).slice(0, 5).map((service) => (
                  <span
                    key={service}
                    className="px-2 py-0.5 bg-slate-700/60 text-slate-300 rounded text-[10px] font-medium"
                  >
                    {service}
                  </span>
                ))}
                {(project.services || []).length > 5 && (
                  <span className="px-2 py-0.5 bg-slate-700/40 text-slate-500 rounded text-[10px]">
                    +{(project.services || []).length - 5}
                  </span>
                )}
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {project.estimatedHours}h
                </span>
                <span className="flex items-center gap-1 text-amber-400">
                  <Award className="w-3.5 h-3.5" />
                  +{project.xpReward} XP
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interview Questions Section (Nivel 1 only) */}
      {selectedLevel === 1 && (
        <div className="px-6 mt-10 pb-12">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Cloud className={`w-5 h-5 ${colors.text}`} />
            {t({ es: 'Preguntas de Entrevista', en: 'Interview Questions', pt: 'Perguntas de Entrevista' })} ({interviewQuestions.length})
          </h2>
          <p className="text-sm text-slate-400 mb-6">
            {t({
              es: 'Preguntas de nivel senior/expert que te harán en entrevistas reales de Data Engineering.',
              en: 'Senior/expert level questions you will face in real Data Engineering interviews.',
              pt: 'Perguntas de nível senior/expert que você enfrentará em entrevistas reais de Data Engineering.'
            })}
          </p>

          <div className="space-y-6">
            {Object.entries(questionsByModule).map(([moduleId, questions]) => (
              <div key={moduleId}>
                <h3 className="text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  {t(questions[0].moduleName)}
                </h3>
                <div className="space-y-2">
                  {questions.map((q) => {
                    const isExpanded = expandedQuestion === q.id;
                    return (
                      <div
                        key={q.id}
                        className="bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden"
                      >
                        <button
                          onClick={() => setExpandedQuestion(isExpanded ? null : q.id)}
                          className="w-full p-4 flex items-start justify-between text-left hover:bg-slate-800/80 transition-colors"
                        >
                          <div className="flex-1 pr-3">
                            <p className="text-sm text-white font-medium">{t(q.question)}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${difficultyColors[q.difficulty] || difficultyColors.senior}`}>
                              {q.difficulty}
                            </span>
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4 text-slate-400" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-slate-400" />
                            )}
                          </div>
                        </button>
                        {isExpanded && (
                          <div className="px-4 pb-4 border-t border-slate-700/30">
                            <p className="text-sm text-slate-300 mt-3 leading-relaxed whitespace-pre-line">
                              {t(q.answer)}
                            </p>
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {q.services.map((s) => (
                                <span key={s} className="px-2 py-0.5 bg-slate-700/50 text-slate-400 rounded text-[10px]">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom padding for Nivel 2 */}
      {selectedLevel === 2 && <div className="pb-12" />}
    </div>
  );
};

export default AWSSpecializationView;

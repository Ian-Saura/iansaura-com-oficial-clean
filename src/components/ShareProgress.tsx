import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Linkedin, Twitter, Copy, Check, X, Trophy, Zap, Target, Download, Image, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

// Tu LinkedIn para que te etiqueten
const LINKEDIN_PROFILE = 'https://www.linkedin.com/in/iansaura/';
const LINKEDIN_MENTION = 'Ian Saura'; // Nombre para mencion manual

interface ShareProgressProps {
  type: 'achievement' | 'level' | 'project' | 'streak' | 'milestone' | 'certificate' | 'xp';
  title: string;
  description?: string;
  userName?: string;
  stats?: {
    xp?: number;
    level?: string;
    streak?: number;
    projects?: number;
    rank?: string;
  };
}

export const ShareProgress: React.FC<ShareProgressProps> = ({
  type,
  title,
  description,
  userName = 'Estudiante',
  stats
}) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [cardGenerated, setCardGenerated] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generar card visual cuando se abre el modal
  useEffect(() => {
    if (isOpen && canvasRef.current) {
      generateCard();
    }
  }, [isOpen]);

  const getShareText = (): string => {
    const baseUrl = 'https://iansaura.com';
    const mention = `\n\n👉 Gracias Ian Saura por crear esta academia. Si querés aprender Data Engineering, les recomiendo su plataforma: ${baseUrl}`;
    
    switch (type) {
      case 'achievement':
        return `🏆 ¡Logro desbloqueado!\n\n"${title}"\n\n${description || 'Cada pequeño paso cuenta en el camino a Data Engineer.'}${mention}\n\n#DataEngineering #Carrera #Aprendizaje`;
      
      case 'level':
        return `🎉 ¡Completé el nivel "${title}" en Data Engineering!\n\n${stats?.xp ? `⚡ ${stats.xp.toLocaleString()} XP acumulados\n` : ''}${stats?.projects ? `🚀 ${stats.projects} proyectos en portfolio\n` : ''}${stats?.rank ? `🏅 Rango: ${stats.rank}\n` : ''}\nEl camino a mi primer trabajo en datos continúa.${mention}\n\n#DataEngineering #Portfolio #Carrera`;
      
      case 'project':
        return `🚀 ¡Proyecto completado!\n\n"${title}"\n\n${description || 'Un proyecto más para mi portfolio de Data Engineering.'}\n\nAprendizajes clave:\n✅ ETL real con Python/SQL\n✅ Buenas prácticas de la industria\n✅ Código listo para GitHub${mention}\n\n#DataEngineering #Portfolio #Python #SQL`;
      
      case 'streak':
        return `🔥 ¡${stats?.streak || 7} días consecutivos estudiando Data Engineering!\n\nLa consistencia vence al talento. Cada día:\n• 30 min de práctica\n• 1 ejercicio de SQL/Python\n• 1 paso más cerca de mi objetivo\n\n¿Vos cuántos días llevás de streak?${mention}\n\n#DataEngineering #Disciplina #Constancia`;
      
      case 'milestone':
        return `🎯 ¡Milestone alcanzado!\n\n${title}\n\n${description || 'Los milestones son recordatorios de que voy por buen camino.'}${mention}\n\n#DataEngineering #Milestone #Carrera`;

      case 'certificate':
        return `📜 ¡Certificado obtenido!\n\n"${title}"\n\nValidé mis conocimientos en Data Engineering. El certificado es verificable en: ${baseUrl}/verify\n\nGracias Ian Saura por la formación. Si querés aprender Data Engineering de verdad, te recomiendo su academia.\n\n${baseUrl}\n\n#DataEngineering #Certificacion #Carrera`;

      case 'xp':
        return `⚡ ¡${stats?.xp?.toLocaleString() || '1000'}+ XP en Data Engineering!\n\n${stats?.rank ? `🏅 Rango actual: ${stats.rank}\n` : ''}${stats?.streak ? `🔥 Streak: ${stats.streak} días\n` : ''}${stats?.projects ? `🚀 Proyectos: ${stats.projects}\n` : ''}\nCada ejercicio suma. Cada proyecto cuenta.${mention}\n\n#DataEngineering #Aprendizaje #Progreso`;
      
      default:
        return `Estoy aprendiendo Data Engineering en la Academia de Ian Saura 🚀\n\nSi querés arrancar tu carrera en datos, te la recomiendo:\n${baseUrl}\n\n#DataEngineering #Carrera`;
    }
  };

  // Generar imagen card para compartir
  const generateCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Dimensiones optimizadas para LinkedIn (1200x627)
    canvas.width = 1200;
    canvas.height = 627;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#0f172a');
    gradient.addColorStop(0.5, '#1e293b');
    gradient.addColorStop(1, '#0f172a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border glow effect
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Inner border
    ctx.strokeStyle = '#10b98150';
    ctx.lineWidth = 1;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

    // Type emoji and badge
    const typeEmoji = {
      achievement: '🏆',
      level: '🎉',
      project: '🚀',
      streak: '🔥',
      milestone: '🎯',
      certificate: '📜',
      xp: '⚡'
    }[type] || '🎯';

    // Big emoji
    ctx.font = '80px Arial';
    ctx.fillText(typeEmoji, 80, 150);

    // Title
    ctx.font = 'bold 48px Arial';
    ctx.fillStyle = '#ffffff';
    const titleText = type === 'streak' 
      ? `${stats?.streak || 7} días de streak!` 
      : type === 'xp' 
        ? `${stats?.xp?.toLocaleString() || '1000'}+ XP` 
        : title;
    ctx.fillText(titleText.substring(0, 35), 180, 130);

    // Subtitle / Description
    ctx.font = '28px Arial';
    ctx.fillStyle = '#94a3b8';
    const subtitleText = description || getSubtitle();
    wrapText(ctx, subtitleText, 80, 220, 1040, 36);

    // Stats boxes
    if (stats) {
      let xPos = 80;
      const yPos = 380;
      const boxWidth = 200;
      const boxHeight = 100;

      const statItems = [
        stats.xp && { label: 'XP', value: stats.xp.toLocaleString(), color: '#fbbf24' },
        stats.streak && { label: 'Streak', value: `${stats.streak} días`, color: '#f97316' },
        stats.projects && { label: 'Proyectos', value: stats.projects.toString(), color: '#10b981' },
        stats.rank && { label: 'Rango', value: stats.rank, color: '#8b5cf6' },
      ].filter(Boolean);

      statItems.forEach((stat: any, i) => {
        // Box background
        ctx.fillStyle = `${stat.color}20`;
        roundRect(ctx, xPos + i * (boxWidth + 20), yPos, boxWidth, boxHeight, 12);
        ctx.fill();
        
        // Box border
        ctx.strokeStyle = `${stat.color}50`;
        ctx.lineWidth = 2;
        roundRect(ctx, xPos + i * (boxWidth + 20), yPos, boxWidth, boxHeight, 12);
        ctx.stroke();

        // Value
        ctx.font = 'bold 32px Arial';
        ctx.fillStyle = stat.color;
        ctx.fillText(stat.value, xPos + i * (boxWidth + 20) + 20, yPos + 45);

        // Label
        ctx.font = '18px Arial';
        ctx.fillStyle = '#64748b';
        ctx.fillText(stat.label, xPos + i * (boxWidth + 20) + 20, yPos + 75);
      });
    }

    // User name
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(userName, 80, 550);

    // Academy branding
    ctx.font = '20px Arial';
    ctx.fillStyle = '#10b981';
    ctx.fillText('Ian Saura Academy', 80, 585);
    
    ctx.fillStyle = '#64748b';
    ctx.fillText(' • iansaura.com', 260, 585);

    // Logo/badge area (right side)
    ctx.fillStyle = '#10b98130';
    ctx.beginPath();
    ctx.arc(1080, 530, 60, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.font = '50px Arial';
    ctx.fillText('🎓', 1050, 550);

    setCardGenerated(true);
  };

  const getSubtitle = () => {
    switch (type) {
      case 'achievement': return 'Cada logro es un paso más en mi camino a Data Engineer';
      case 'level': return 'Nivel completado en la Academia de Data Engineering';
      case 'project': return 'Proyecto completado para mi portfolio profesional';
      case 'streak': return 'La consistencia es la clave del éxito';
      case 'milestone': return 'Milestone alcanzado en mi aprendizaje';
      case 'certificate': return 'Certificado verificable de Data Engineering';
      case 'xp': return 'Experiencia acumulada practicando Data Engineering';
      default: return 'Aprendiendo Data Engineering';
    }
  };

  // Helper para texto con wrap
  const wrapText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
    const words = text.split(' ');
    let line = '';
    let testLine = '';
    let lineCount = 0;

    for (let n = 0; n < words.length; n++) {
      testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line, x, y + lineCount * lineHeight);
        line = words[n] + ' ';
        lineCount++;
        if (lineCount >= 3) break; // Max 3 lines
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, y + lineCount * lineHeight);
  };

  // Helper para rectangulos redondeados
  const roundRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  };

  const downloadCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = `iansaura-${type}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const shareToLinkedIn = () => {
    // Copiar texto primero
    navigator.clipboard.writeText(getShareText());
    // Abrir LinkedIn para crear post
    window.open('https://www.linkedin.com/feed/?shareActive=true', '_blank');
  };

  const shareToTwitter = () => {
    const text = encodeURIComponent(getShareText());
    const url = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getShareText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'achievement': return <Trophy className="w-5 h-5" />;
      case 'streak': return <Zap className="w-5 h-5" />;
      case 'milestone': return <Target className="w-5 h-5" />;
      case 'certificate': return <Sparkles className="w-5 h-5" />;
      default: return <Share2 className="w-5 h-5" />;
    }
  };

  return (
    <>
      {/* Share Button - Más prominente */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#0077b5] to-[#00a0dc] text-white hover:opacity-90 transition-all text-sm font-medium shadow-lg shadow-blue-500/25"
      >
        <Linkedin className="w-4 h-4" />
        Compartir en LinkedIn
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Modal Content - Más grande para la card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-700 sticky top-0 bg-slate-900 z-10">
                <div className="flex items-center gap-2 text-white">
                  <Linkedin className="w-5 h-5 text-[#0077b5]" />
                  <h3 className="font-bold">Compartir en LinkedIn</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Card Preview */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-medium flex items-center gap-2">
                      <Image className="w-4 h-4 text-emerald-400" />
                      Imagen para tu post
                    </h4>
                    <button
                      onClick={downloadCard}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30 transition-all text-sm"
                    >
                      <Download className="w-4 h-4" />
                      Descargar
                    </button>
                  </div>
                  
                  {/* Canvas para la card */}
                  <div className="bg-slate-800 rounded-xl p-2 border border-slate-700">
                    <canvas 
                      ref={canvasRef} 
                      className="w-full rounded-lg"
                      style={{ aspectRatio: '1200/627' }}
                    />
                  </div>
                </div>

                {/* Text Preview */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-medium flex items-center gap-2">
                      <Copy className="w-4 h-4 text-blue-400" />
                      Texto para tu post
                    </h4>
                    <button
                      onClick={copyToClipboard}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-sm ${
                        copied 
                          ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400' 
                          : 'bg-blue-500/20 border border-blue-500/30 text-blue-400 hover:bg-blue-500/30'
                      }`}
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? '¡Copiado!' : 'Copiar texto'}
                    </button>
                  </div>
                  
                  <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 max-h-48 overflow-y-auto">
                    <p className="text-sm text-slate-300 whitespace-pre-line">
                      {getShareText()}
                    </p>
                  </div>
                </div>

                {/* Instructions */}
                <div className="bg-gradient-to-r from-[#0077b5]/10 to-[#00a0dc]/10 rounded-xl p-4 border border-[#0077b5]/30">
                  <h4 className="text-[#0077b5] font-bold mb-3 flex items-center gap-2">
                    📋 Cómo compartir en 3 pasos:
                  </h4>
                  <ol className="text-slate-300 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="bg-[#0077b5] text-white w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0">1</span>
                      <span dangerouslySetInnerHTML={{ __html: t('share.step1') }} />
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-[#0077b5] text-white w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0">2</span>
                      <span dangerouslySetInnerHTML={{ __html: t('share.step2') }} />
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-[#0077b5] text-white w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0">3</span>
                      <span dangerouslySetInnerHTML={{ __html: t('share.step3') }} />
                    </li>
                  </ol>
                  
                  <div className="mt-3 pt-3 border-t border-[#0077b5]/30">
                    <p className="text-xs text-slate-400">
                      💡 <strong>{t('share.tip')}:</strong> {t('share.tagIan')}{' '}
                      <a 
                        href={LINKEDIN_PROFILE} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#0077b5] hover:underline"
                      >
                        Ian Saura
                      </a>
                      {' '}{t('share.forReach')}
                    </p>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={shareToLinkedIn}
                    className="flex items-center justify-center gap-3 p-4 rounded-xl bg-gradient-to-r from-[#0077b5] to-[#00a0dc] text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-blue-500/25"
                  >
                    <Linkedin className="w-6 h-6" />
                    {t('share.postLinkedIn')}
                  </button>
                  
                  <button
                    onClick={shareToTwitter}
                    className="flex items-center justify-center gap-3 p-4 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 font-semibold hover:bg-slate-700 transition-all"
                  >
                    <Twitter className="w-6 h-6" />
                    Twitter/X
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Componente simplificado solo para el botón de LinkedIn
export const LinkedInShareButton: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  const share = () => {
    const encodedText = encodeURIComponent(text);
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://iansaura.com')}&summary=${encodedText}`;
    window.open(url, '_blank', 'width=600,height=600');
  };

  return (
    <button
      onClick={share}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0077b5]/10 border border-[#0077b5]/30 text-[#0077b5] hover:bg-[#0077b5]/20 transition-all text-sm ${className}`}
    >
      <Linkedin className="w-4 h-4" />
      LinkedIn
    </button>
  );
};

export default ShareProgress;




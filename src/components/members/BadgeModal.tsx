import React, { useRef } from 'react';
import { X, Download, Share2 } from 'lucide-react';

interface BadgeModalProps {
  level: number;
  type: '50' | '100';
  userName: string;
  onClose: () => void;
}

export const BadgeModal: React.FC<BadgeModalProps> = ({ level, type, userName, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const levelInfo = {
    1: { title: 'Primer Trabajo', color: '#10B981', colorLight: '#34D399', gradient: ['#059669', '#10B981', '#34D399'], emoji: '🌱' },
    2: { title: 'Jr/SSR', color: '#3B82F6', colorLight: '#60A5FA', gradient: ['#1D4ED8', '#3B82F6', '#60A5FA'], emoji: '🚀' },
    3: { title: 'Senior', color: '#8B5CF6', colorLight: '#A78BFA', gradient: ['#6D28D9', '#8B5CF6', '#A78BFA'], emoji: '👑' },
  }[level] || { title: 'Data Engineer', color: '#10B981', colorLight: '#34D399', gradient: ['#059669', '#10B981', '#34D399'], emoji: '🎯' };

  const badgeTitle = type === '50' 
    ? `50% Completado` 
    : `Nivel ${level} Completado`;
  
  const badgeSubtitle = type === '50'
    ? `Nivel ${level}: ${levelInfo.title}`
    : `${levelInfo.title}`;

  const downloadBadge = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Full HD Canvas size (1920x1080)
    canvas.width = 1920;
    canvas.height = 1080;

    // Enable high quality rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Background with radial gradient
    const bgGradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, canvas.width
    );
    bgGradient.addColorStop(0, '#1E293B');
    bgGradient.addColorStop(0.5, '#0F172A');
    bgGradient.addColorStop(1, '#020617');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Decorative grid pattern
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 60) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Glowing orbs in background
    const drawGlowOrb = (x: number, y: number, radius: number, color: string, alpha: number) => {
      const orbGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      orbGradient.addColorStop(0, color + Math.round(alpha * 255).toString(16).padStart(2, '0'));
      orbGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = orbGradient;
      ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    };
    drawGlowOrb(300, 200, 400, levelInfo.color, 0.15);
    drawGlowOrb(1620, 880, 350, levelInfo.colorLight, 0.1);
    drawGlowOrb(960, 540, 500, levelInfo.color, 0.05);

    // Outer border with gradient
    const borderGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    borderGradient.addColorStop(0, levelInfo.gradient[0]);
    borderGradient.addColorStop(0.5, levelInfo.gradient[1]);
    borderGradient.addColorStop(1, levelInfo.gradient[2]);
    ctx.strokeStyle = borderGradient;
    ctx.lineWidth = 6;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

    // Inner subtle border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 2;
    ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);

    // Main badge circle with glow
    const centerX = canvas.width / 2;
    const badgeY = 380;
    const badgeRadius = 140;

    // Outer glow
    for (let i = 5; i > 0; i--) {
      ctx.beginPath();
      ctx.arc(centerX, badgeY, badgeRadius + i * 15, 0, Math.PI * 2);
      ctx.fillStyle = levelInfo.color + Math.round(0.05 * (6 - i) * 255).toString(16).padStart(2, '0');
      ctx.fill();
    }

    // Badge circle gradient fill
    const badgeGradient = ctx.createRadialGradient(
      centerX - 30, badgeY - 30, 0,
      centerX, badgeY, badgeRadius
    );
    badgeGradient.addColorStop(0, levelInfo.gradient[2] + '40');
    badgeGradient.addColorStop(1, levelInfo.gradient[0] + '20');
    ctx.beginPath();
    ctx.arc(centerX, badgeY, badgeRadius, 0, Math.PI * 2);
    ctx.fillStyle = badgeGradient;
    ctx.fill();

    // Badge circle border
    ctx.beginPath();
    ctx.arc(centerX, badgeY, badgeRadius, 0, Math.PI * 2);
    ctx.strokeStyle = levelInfo.color;
    ctx.lineWidth = 6;
    ctx.stroke();

    // Inner circle
    ctx.beginPath();
    ctx.arc(centerX, badgeY, badgeRadius - 20, 0, Math.PI * 2);
    ctx.strokeStyle = levelInfo.colorLight + '60';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Trophy/Star emoji - larger
    ctx.font = '100px "Segoe UI Emoji", "Apple Color Emoji", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(type === '100' ? '🏆' : '⭐', centerX, badgeY);

    // Percentage badge for 50%
    if (type === '50') {
      ctx.beginPath();
      ctx.arc(centerX + 100, badgeY - 80, 45, 0, Math.PI * 2);
      ctx.fillStyle = '#F59E0B';
      ctx.fill();
      ctx.font = 'bold 36px "Inter", "Segoe UI", sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText('50%', centerX + 100, badgeY - 78);
    }

    // Main title
    ctx.font = 'bold 72px "Inter", "Segoe UI", sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(badgeTitle, centerX, 600);

    // Subtitle with level info
    ctx.font = '42px "Inter", "Segoe UI", sans-serif';
    ctx.fillStyle = levelInfo.color;
    ctx.fillText(badgeSubtitle, centerX, 670);

    // Decorative line
    const lineGradient = ctx.createLinearGradient(centerX - 200, 0, centerX + 200, 0);
    lineGradient.addColorStop(0, 'transparent');
    lineGradient.addColorStop(0.5, levelInfo.color);
    lineGradient.addColorStop(1, 'transparent');
    ctx.strokeStyle = lineGradient;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX - 200, 720);
    ctx.lineTo(centerX + 200, 720);
    ctx.stroke();

    // User name
    ctx.font = 'bold 52px "Inter", "Segoe UI", sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(userName, centerX, 800);

    // Date
    const today = new Date().toLocaleDateString('es-AR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
    ctx.font = '28px "Inter", "Segoe UI", sans-serif';
    ctx.fillStyle = '#64748B';
    ctx.fillText(today, centerX, 860);

    // Footer branding
    ctx.font = 'bold 32px "Inter", "Segoe UI", sans-serif';
    ctx.fillStyle = '#94A3B8';
    ctx.fillText('Ian Saura - Data Engineering Academy', centerX, 970);
    
    ctx.font = '26px "Inter", "Segoe UI", sans-serif';
    ctx.fillStyle = '#64748B';
    ctx.fillText('iansaura.com', centerX, 1010);

    // Corner decorations
    const cornerSize = 30;
    ctx.strokeStyle = levelInfo.color;
    ctx.lineWidth = 4;
    
    // Top left
    ctx.beginPath();
    ctx.moveTo(80, 80 + cornerSize);
    ctx.lineTo(80, 80);
    ctx.lineTo(80 + cornerSize, 80);
    ctx.stroke();
    
    // Top right
    ctx.beginPath();
    ctx.moveTo(canvas.width - 80 - cornerSize, 80);
    ctx.lineTo(canvas.width - 80, 80);
    ctx.lineTo(canvas.width - 80, 80 + cornerSize);
    ctx.stroke();
    
    // Bottom left
    ctx.beginPath();
    ctx.moveTo(80, canvas.height - 80 - cornerSize);
    ctx.lineTo(80, canvas.height - 80);
    ctx.lineTo(80 + cornerSize, canvas.height - 80);
    ctx.stroke();
    
    // Bottom right
    ctx.beginPath();
    ctx.moveTo(canvas.width - 80 - cornerSize, canvas.height - 80);
    ctx.lineTo(canvas.width - 80, canvas.height - 80);
    ctx.lineTo(canvas.width - 80, canvas.height - 80 - cornerSize);
    ctx.stroke();

    // Download as high quality PNG
    const link = document.createElement('a');
    link.download = `insignia-nivel-${level}-${type === '100' ? 'completado' : '50-porciento'}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  };

  const shareToLinkedIn = () => {
    const text = encodeURIComponent(
      type === '100'
        ? `🏆 ¡Completé el Nivel ${level} (${levelInfo.title}) del Roadmap de Data Engineering de @IanSaura!\n\nAprendiendo a ser un mejor Data Engineer cada día. 💪\n\n#DataEngineering #CareerGrowth #Learning`
        : `⭐ ¡50% del Nivel ${level} completado en el Roadmap de Data Engineering de @IanSaura!\n\nSiguiendo el camino para convertirme en Data Engineer. 🚀\n\n#DataEngineering #Learning #Progress`
    );
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=https://iansaura.com/suscripcion&title=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 border border-slate-700 relative" style={{ WebkitOverflowScrolling: 'touch' }}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="text-6xl mb-4">{type === '100' ? '🏆' : '⭐'}</div>
          <h2 className="text-2xl font-bold text-white mb-2">¡Felicitaciones, {userName}!</h2>
          <p className="text-slate-400">{badgeSubtitle}</p>
              </div>

        {/* Badge Preview */}
        <div 
          className="rounded-xl p-6 mb-6 text-center"
          style={{ background: `linear-gradient(135deg, ${levelInfo.color}20, ${levelInfo.color}05)`, border: `2px solid ${levelInfo.color}50` }}
        >
          <div className="text-4xl mb-2">{levelInfo.emoji}</div>
          <h3 className="text-xl font-bold text-white">{badgeTitle}</h3>
          <p className="text-slate-400 text-sm mt-1">Nivel {level}: {levelInfo.title}</p>
          <p className="text-slate-500 text-xs mt-2">Ian Saura - Data Engineering Academy</p>
            </div>

        {/* Actions */}
        <div className="flex gap-3">
              <button
            onClick={downloadBadge}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Download className="w-5 h-5" />
            Descargar PNG
          </button>
          <button
            onClick={shareToLinkedIn}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Share2 className="w-5 h-5" />
            Compartir en LinkedIn
              </button>
            </div>

        <p className="text-center text-slate-500 text-xs mt-4">
          ¡Compartí tu logro y motivá a otros! 🚀
        </p>

        {/* Hidden canvas for generating image */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
          </div>
        </div>
  );
};

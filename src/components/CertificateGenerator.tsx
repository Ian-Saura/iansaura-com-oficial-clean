import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Award, Lock, Loader2, Linkedin, ExternalLink, CheckCircle, Copy, Check, Edit2, User } from 'lucide-react';
import { analytics } from '../utils/analytics';

interface CertificateProps {
  level: number;
  levelTitle: string;
  userName: string;
  userEmail: string;
  completionPercent: number;
  completedDate?: string;
  onGenerate: () => void;
}

// Storage key for custom certificate names
const CERT_NAME_STORAGE_KEY = 'ian-saura-certificate-name';

const levelInfo: Record<number, { badge: string; color: string; gradient: string; skills: string[] }> = {
  0: { 
    badge: '🎓 Fundamentos', 
    color: '#06b6d4', 
    gradient: 'from-cyan-500 to-blue-500',
    skills: ['Python Básico', 'SQL Básico', 'Análisis de Datos', 'Pensamiento Analítico']
  },
  1: { 
    badge: '🌱 Novato', 
    color: '#10b981', 
    gradient: 'from-emerald-500 to-teal-500',
    skills: ['Python Fundamentals', 'SQL Basics', 'Data Pipelines', 'ETL Concepts']
  },
  2: { 
    badge: '⚔️ Guerrero', 
    color: '#8b5cf6', 
    gradient: 'from-purple-500 to-pink-500',
    skills: ['Advanced SQL', 'Data Modeling', 'Cloud Fundamentals (AWS)', 'Airflow Basics']
  },
  3: { 
    badge: '👑 Maestro', 
    color: '#f59e0b', 
    gradient: 'from-yellow-500 to-orange-500',
    skills: ['System Design', 'Data Architecture', 'Leadership', 'Optimization']
  }
};

// Generate unique certificate ID
function generateCertificateId(level: number, email: string): string {
  const hash = btoa(email + level + 'iansaura-cert').slice(0, 8).toUpperCase();
  return `DE-${level}${new Date().getFullYear()}-${hash}`;
}

// Generate verification URL
function getVerificationUrl(certId: string): string {
  return `https://iansaura.com/verify/${certId}`;
}

export const CertificateCard: React.FC<CertificateProps> = ({
  level,
  levelTitle,
  userName,
  userEmail,
  completionPercent,
  completedDate,
  onGenerate
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [customName, setCustomName] = useState('');
  const [tempName, setTempName] = useState('');
  const isComplete = completionPercent >= 100;
  const info = levelInfo[level] || levelInfo[1];
  
  // Load custom name from localStorage on mount
  useEffect(() => {
    const savedName = localStorage.getItem(CERT_NAME_STORAGE_KEY);
    if (savedName) {
      setCustomName(savedName);
    }
  }, []);

  // The name to display on certificate (custom or default)
  const displayName = customName || userName;
  
  const handleSaveName = () => {
    if (tempName.trim()) {
      setCustomName(tempName.trim());
      localStorage.setItem(CERT_NAME_STORAGE_KEY, tempName.trim());
    }
    setIsEditingName(false);
  };

  const handleStartEdit = () => {
    setTempName(customName || userName);
    setIsEditingName(true);
  };
  
  const certId = generateCertificateId(level, userEmail);
  const verifyUrl = getVerificationUrl(certId);

  const handleGenerate = async () => {
    if (!isComplete) return;
    
    setIsGenerating(true);
    
    // Track analytics
    analytics.certificateDownloaded(level);
    
    // 1. SAVE CERTIFICATE TO DATABASE FOR VERIFICATION (with custom name)
    try {
      await fetch('/api/certificates.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cert_id: certId,
          level: level,
          level_title: levelTitle,
          user_name: displayName, // Use custom name if set
          user_email: userEmail,
          completed_date: completedDate || new Date().toLocaleDateString('es-AR'),
          verify_url: verifyUrl
        })
      });
    } catch (error) {
      console.error('Error saving certificate:', error);
    }
    
    // 2. Generate and download PDF with custom name
    await generateCertificatePDF(level, levelTitle, displayName, completedDate || new Date().toLocaleDateString('es-AR'), certId, verifyUrl);
    
    setIsGenerating(false);
    setShowShareOptions(true);
    onGenerate();
  };

  const handleLinkedInShare = () => {
    analytics.progressShared('linkedin');
    
    const title = `Data Engineering - Nivel ${level}: ${levelTitle}`;
    
    // LinkedIn Add to Profile URL
    const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&` +
      `name=${encodeURIComponent(title)}&` +
      `organizationName=${encodeURIComponent('Ian Saura - Academia de Data Engineering')}&` +
      `issueYear=${new Date().getFullYear()}&` +
      `issueMonth=${new Date().getMonth() + 1}&` +
      `certUrl=${encodeURIComponent(verifyUrl)}&` +
      `certId=${encodeURIComponent(certId)}`;
    
    window.open(linkedInUrl, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verifyUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-xl border ${
        isComplete 
          ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-600' 
          : 'bg-slate-900/50 border-slate-700/50'
      }`}
    >
      {/* Decorative gradient */}
      {isComplete && (
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${info.gradient}`} />
      )}
      
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl ${
            isComplete 
              ? `bg-gradient-to-br ${info.gradient} shadow-lg` 
              : 'bg-slate-800 text-slate-500'
          }`}>
            {isComplete ? <Award className="w-8 h-8 text-white" /> : <Lock className="w-6 h-6" />}
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`font-bold text-sm ${isComplete ? 'text-white' : 'text-slate-400'}`}>
                Nivel {level} - {levelTitle}
              </h3>
            </div>
            
            <p className="text-sm text-slate-400 mb-3">
              {isComplete 
                ? `Completado el ${completedDate || 'recientemente'}` 
                : `${completionPercent}% completado`
              }
            </p>
            
            {/* Name customization for certificate */}
            {isComplete && (
              <div className="mb-4 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1">
                    <User className="w-4 h-4 text-slate-400" />
                    {isEditingName ? (
                      <input
                        type="text"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        placeholder="Tu nombre completo"
                        className="flex-1 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-emerald-500"
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                      />
                    ) : (
                      <span className="text-white text-sm font-medium">{displayName}</span>
                    )}
                  </div>
                  {isEditingName ? (
                    <div className="flex gap-1">
                      <button
                        onClick={handleSaveName}
                        className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 rounded text-xs text-white"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => setIsEditingName(false)}
                        className="px-2 py-1 bg-slate-600 hover:bg-slate-500 rounded text-xs text-white"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleStartEdit}
                      className="flex items-center gap-1 px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs text-slate-300"
                    >
                      <Edit2 className="w-3 h-3" />
                      Editar nombre
                    </button>
                  )}
                </div>
                <p className="text-slate-500 text-xs mt-2">
                  Este nombre aparecerá en tu certificado
                </p>
              </div>
            )}
            
            {/* Skills learned */}
            {isComplete && (
              <div className="flex flex-wrap gap-2 mb-4">
                {info.skills.map((skill, i) => (
                  <span 
                    key={i}
                    className="px-2 py-1 text-xs rounded-full bg-slate-700 text-slate-300 flex items-center gap-1"
                  >
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    {skill}
                  </span>
                ))}
              </div>
            )}
            
            {/* Progress bar */}
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionPercent}%` }}
                transition={{ duration: 0.5 }}
                className={`h-full bg-gradient-to-r ${info.gradient}`}
              />
            </div>
            
            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              {/* Download button */}
              <button
                onClick={handleGenerate}
                disabled={!isComplete || isGenerating}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  isComplete
                    ? `bg-gradient-to-r ${info.gradient} text-white hover:opacity-90 shadow-lg`
                    : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                }`}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generando...
                  </>
                ) : isComplete ? (
                  <>
                    <Download className="w-4 h-4" />
                    Descargar Certificado
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Completá el nivel para desbloquear
                  </>
                )}
              </button>
              
              {/* LinkedIn button - only show after download or if complete */}
              {isComplete && (
                <button
                  onClick={handleLinkedInShare}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-[#0077b5] text-white hover:bg-[#006097] transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                  Agregar a LinkedIn
                </button>
              )}
            </div>
            
            {/* Share options */}
            {showShareOptions && isComplete && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700"
              >
                <p className="text-sm text-slate-300 mb-3">
                  🎉 ¡Certificado generado! Compartilo:
                </p>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-slate-500">ID:</span>
                  <code className="text-xs text-emerald-400 bg-slate-900 px-2 py-1 rounded">{certId}</code>
                </div>
                
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={verifyUrl}
                    readOnly
                    className="flex-1 text-xs bg-slate-900 border border-slate-700 rounded px-3 py-2 text-slate-300"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="p-2 rounded bg-slate-700 hover:bg-slate-600 transition-colors"
                    title="Copiar link"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-slate-300" />
                    )}
                  </button>
                  <a
                    href={verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded bg-slate-700 hover:bg-slate-600 transition-colors"
                    title="Abrir página de verificación"
                  >
                    <ExternalLink className="w-4 h-4 text-slate-300" />
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Función para generar el PDF del certificado
async function generateCertificatePDF(
  level: number, 
  levelTitle: string, 
  userName: string, 
  completedDate: string,
  certId: string,
  verifyUrl: string
) {
  const info = levelInfo[level] || levelInfo[1];
  
  // Crear un canvas para el certificado
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  // Tamaño A4 horizontal (landscape) - Alta resolución
  canvas.width = 1920;
  canvas.height = 1080;
  
  // Fondo con gradiente
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#0f172a');
  gradient.addColorStop(0.5, '#1e293b');
  gradient.addColorStop(1, '#0f172a');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Patrón decorativo de fondo
  ctx.fillStyle = `${info.color}08`;
  for (let i = 0; i < 20; i++) {
    ctx.beginPath();
    ctx.arc(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * 100 + 50,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
  
  // Borde decorativo exterior
  ctx.strokeStyle = info.color;
  ctx.lineWidth = 6;
  ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
  
  // Borde interior
  ctx.strokeStyle = `${info.color}40`;
  ctx.lineWidth = 2;
  ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);
  
  // Esquinas decorativas
  const cornerSize = 40;
  ctx.fillStyle = info.color;
  // Top-left
  ctx.fillRect(40, 40, cornerSize, 6);
  ctx.fillRect(40, 40, 6, cornerSize);
  // Top-right
  ctx.fillRect(canvas.width - 40 - cornerSize, 40, cornerSize, 6);
  ctx.fillRect(canvas.width - 46, 40, 6, cornerSize);
  // Bottom-left
  ctx.fillRect(40, canvas.height - 46, cornerSize, 6);
  ctx.fillRect(40, canvas.height - 40 - cornerSize, 6, cornerSize);
  // Bottom-right
  ctx.fillRect(canvas.width - 40 - cornerSize, canvas.height - 46, cornerSize, 6);
  ctx.fillRect(canvas.width - 46, canvas.height - 40 - cornerSize, 6, cornerSize);
  
  // Logo "⚡" grande de fondo
  ctx.fillStyle = `${info.color}10`;
  ctx.font = 'bold 400px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('⚡', canvas.width / 2, canvas.height / 2 + 100);
  
  // Título "CERTIFICADO"
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 64px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('CERTIFICADO DE COMPLETACIÓN', canvas.width / 2, 180);
  
  // Línea decorativa
  const lineGradient = ctx.createLinearGradient(canvas.width / 2 - 300, 0, canvas.width / 2 + 300, 0);
  lineGradient.addColorStop(0, 'transparent');
  lineGradient.addColorStop(0.2, info.color);
  lineGradient.addColorStop(0.8, info.color);
  lineGradient.addColorStop(1, 'transparent');
  ctx.strokeStyle = lineGradient;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2 - 300, 210);
  ctx.lineTo(canvas.width / 2 + 300, 210);
  ctx.stroke();
  
  // "Se certifica que"
  ctx.fillStyle = '#94a3b8';
  ctx.font = '28px Arial';
  ctx.fillText('Se certifica que', canvas.width / 2, 290);
  
  // Nombre del usuario
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 72px Arial';
  ctx.fillText(userName, canvas.width / 2, 380);
  
  // "Ha completado exitosamente"
  ctx.fillStyle = '#94a3b8';
  ctx.font = '28px Arial';
  ctx.fillText('ha completado exitosamente el', canvas.width / 2, 460);
  
  // Badge y nivel
  ctx.fillStyle = info.color;
  ctx.font = 'bold 52px Arial';
  ctx.fillText(`${info.badge} - ${levelTitle}`, canvas.width / 2, 540);
  
  // Descripción
  ctx.fillStyle = '#94a3b8';
  ctx.font = '24px Arial';
  ctx.fillText('de la Academia de Data Engineering de Ian Saura', canvas.width / 2, 600);
  
  // Skills aprendidos
  ctx.fillStyle = '#64748b';
  ctx.font = '18px Arial';
  ctx.fillText(`Skills: ${info.skills.join(' • ')}`, canvas.width / 2, 660);
  
  // Línea separadora
  ctx.strokeStyle = `${info.color}30`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2 - 400, 700);
  ctx.lineTo(canvas.width / 2 + 400, 700);
  ctx.stroke();
  
  // Fecha y ID
  ctx.fillStyle = '#64748b';
  ctx.font = '20px Arial';
  ctx.fillText(`Fecha de emisión: ${completedDate}`, canvas.width / 2 - 200, 760);
  ctx.fillText(`ID: ${certId}`, canvas.width / 2 + 200, 760);
  
  // URL de verificación
  ctx.fillStyle = info.color;
  ctx.font = '16px Arial';
  ctx.fillText(`Verificar en: ${verifyUrl}`, canvas.width / 2, 800);
  
  // Firma
  ctx.fillStyle = '#ffffff';
  ctx.font = 'italic 32px Arial';
  ctx.fillText('Ian Saura', canvas.width / 2, 900);
  
  ctx.fillStyle = '#64748b';
  ctx.font = '18px Arial';
  ctx.fillText('Fundador - Academia Data Engineering', canvas.width / 2, 940);
  ctx.fillText('iansaura.com', canvas.width / 2, 970);
  
  // QR code placeholder (esquina inferior derecha)
  ctx.fillStyle = '#ffffff';
  ctx.font = '12px Arial';
  ctx.textAlign = 'right';
  ctx.fillText('Escanea para verificar', canvas.width - 100, canvas.height - 120);
  
  // Simple QR placeholder (cuadrado con patrón)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(canvas.width - 150, canvas.height - 110, 80, 80);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(canvas.width - 145, canvas.height - 105, 70, 70);
  ctx.fillStyle = '#ffffff';
  ctx.font = '10px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('SCAN', canvas.width - 110, canvas.height - 65);
  
  // Convertir a imagen de alta calidad
  const dataUrl = canvas.toDataURL('image/png', 1.0);
  
  // Crear link de descarga
  const link = document.createElement('a');
  link.download = `Certificado-Nivel-${level}-${userName.replace(/\s+/g, '-')}.png`;
  link.href = dataUrl;
  link.click();
  
  // También guardar en backend para verificación
  try {
    await fetch('/api/certificates.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cert_id: certId,
        level,
        level_title: levelTitle,
        user_name: userName,
        completed_date: completedDate,
        verify_url: verifyUrl
      })
    });
  } catch (e) {
    console.warn('Could not save certificate to backend:', e);
  }
}

export default CertificateCard;

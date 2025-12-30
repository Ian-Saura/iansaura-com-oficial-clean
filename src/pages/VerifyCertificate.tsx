import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Award, ArrowLeft, Loader2, Shield, Calendar, User, ExternalLink } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface CertificateData {
  id: string;
  level: number;
  level_title: string;
  holder_name: string;
  completed_date: string;
  issued_at: string;
  issuer: string;
  issuer_url: string;
}

const levelInfo: Record<number, { badge: string; color: string; gradient: string }> = {
  1: { badge: '🌱 Novato', color: '#10b981', gradient: 'from-emerald-500 to-teal-500' },
  2: { badge: '⚔️ Guerrero', color: '#8b5cf6', gradient: 'from-purple-500 to-pink-500' },
  3: { badge: '👑 Maestro', color: '#f59e0b', gradient: 'from-yellow-500 to-orange-500' }
};

const VerifyCertificate: React.FC = () => {
  const { certId } = useParams<{ certId: string }>();
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState<boolean | null>(null);
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyCertificate = async () => {
      if (!certId) {
        setError('No se proporcionó ID de certificado');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/certificates.php?id=${encodeURIComponent(certId)}`);
        const data = await response.json();

        if (data.valid) {
          setValid(true);
          setCertificate(data.certificate);
        } else {
          setValid(false);
          setError(data.message || 'Certificado no válido');
        }
      } catch (e) {
        setValid(false);
        setError('Error al verificar el certificado');
      } finally {
        setLoading(false);
      }
    };

    verifyCertificate();
  }, [certId]);

  const info = certificate ? levelInfo[certificate.level] || levelInfo[1] : levelInfo[1];

  return (
    <>
      <Helmet>
        <title>
          {valid && certificate 
            ? `Certificado Verificado - ${certificate.holder_name} | Ian Saura` 
            : 'Verificar Certificado | Ian Saura'}
        </title>
        <meta name="description" content="Verificación de certificados de la Academia de Data Engineering de Ian Saura" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg w-full"
        >
          {/* Back link */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>

          {/* Main card */}
          <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-800 overflow-hidden">
            {/* Header */}
            <div className={`p-6 bg-gradient-to-r ${valid ? info.gradient : 'from-slate-700 to-slate-800'}`}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                  {loading ? (
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  ) : valid ? (
                    <CheckCircle className="w-8 h-8 text-white" />
                  ) : (
                    <XCircle className="w-8 h-8 text-white" />
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {loading ? 'Verificando...' : valid ? 'Certificado Válido' : 'Certificado No Válido'}
                  </h1>
                  <p className="text-white/80">
                    {loading ? 'Por favor espere' : valid ? 'Este certificado es auténtico' : error}
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {loading ? (
                <div className="text-center py-8">
                  <Loader2 className="w-12 h-12 text-emerald-400 animate-spin mx-auto mb-4" />
                  <p className="text-slate-400">Verificando autenticidad del certificado...</p>
                </div>
              ) : valid && certificate ? (
                <div className="space-y-6">
                  {/* Certificate ID */}
                  <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-xl">
                    <Shield className="w-5 h-5 text-emerald-400" />
                    <div>
                      <p className="text-xs text-slate-500">ID del Certificado</p>
                      <p className="font-mono text-emerald-400">{certificate.id}</p>
                    </div>
                  </div>

                  {/* Holder info */}
                  <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-xl">
                    <User className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-xs text-slate-500">Otorgado a</p>
                      <p className="text-white font-medium">{certificate.holder_name}</p>
                    </div>
                  </div>

                  {/* Level */}
                  <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-xl">
                    <Award className="w-5 h-5" style={{ color: info.color }} />
                    <div>
                      <p className="text-xs text-slate-500">Nivel Completado</p>
                      <p className="font-medium" style={{ color: info.color }}>
                        {info.badge} - {certificate.level_title}
                      </p>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-xl">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    <div>
                      <p className="text-xs text-slate-500">Fecha de Completación</p>
                      <p className="text-white">{certificate.completed_date}</p>
                    </div>
                  </div>

                  {/* Issuer */}
                  <div className="border-t border-slate-800 pt-6 mt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Emitido por</p>
                        <p className="text-white font-medium">{certificate.issuer}</p>
                      </div>
                      <a
                        href={certificate.issuer_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Visitar Academia
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                  <h2 className="text-xl font-bold text-white mb-2">No se pudo verificar</h2>
                  <p className="text-slate-400 mb-6">{error}</p>
                  <p className="text-sm text-slate-500">
                    Si crees que esto es un error, contactá a{' '}
                    <a href="mailto:info@iansaura.com" className="text-emerald-400 hover:underline">
                      info@iansaura.com
                    </a>
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-800/30 border-t border-slate-800">
              <p className="text-xs text-center text-slate-500">
                Los certificados de Ian Saura son verificables y representan la completación 
                exitosa de los niveles de la Academia de Data Engineering.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 text-center">
            <p className="text-slate-400 mb-3">¿Querés obtener tu propio certificado?</p>
            <Link
              to="/suscripcion"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
            >
              Conocé la Academia
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default VerifyCertificate;




import React, { useState, useEffect, createContext, useContext } from 'react';
import { MessageCircle, Check, ExternalLink, RefreshCw, AlertCircle, X } from 'lucide-react';

interface DiscordLinkSectionProps {
  userEmail: string;
  userName?: string;
}

interface DiscordStatus {
  linked: boolean;
  discord_username?: string;
  discord_user_id?: string;
  has_role?: boolean;
}

// Context for sharing Discord status across components
interface DiscordContextType {
  status: DiscordStatus | null;
  loading: boolean;
  refresh: () => void;
}

const DiscordContext = createContext<DiscordContextType>({
  status: null,
  loading: true,
  refresh: () => {}
});

export const useDiscordStatus = () => useContext(DiscordContext);

export const DiscordLinkSection: React.FC<DiscordLinkSectionProps> = ({ userEmail, userName }) => {
  const [status, setStatus] = useState<DiscordStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [linking, setLinking] = useState(false);
  const [discordUsername, setDiscordUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const DISCORD_INVITE = 'https://discord.gg/jfyqeAMpmk';

  // Load Discord status function (accessible from handlers)
  const loadStatus = async () => {
    if (!userEmail) return;
    try {
      const response = await fetch(`/api/discord-status.php?email=${encodeURIComponent(userEmail)}`);
      const data = await response.json();
      if (data.success) {
        setStatus(data);
      }
    } catch (err) {
      console.error('Error loading Discord status:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load on mount
  useEffect(() => {
    loadStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail]);

  const handleLinkDiscord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!discordUsername.trim()) {
      setError('Ingresá tu nombre de usuario de Discord');
      return;
    }

    setLinking(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/link-discord.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          discord_username: discordUsername.trim().replace('@', '')
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(data.message || '¡Discord vinculado exitosamente!');
        setStatus({
          linked: true,
          discord_username: discordUsername.trim(),
          discord_user_id: data.discord_user_id,
          has_role: data.role_assigned
        });
        setDiscordUsername('');
        // Reload status from server after a short delay to ensure it's updated
        setTimeout(() => {
          loadStatus();
        }, 1000);
      } else {
        setError(data.error || 'Error al vincular Discord');
      }
    } catch (err) {
      setError('Error de conexión. Intentá de nuevo.');
    } finally {
      setLinking(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-5 h-5 text-indigo-400 animate-spin" />
          <span className="text-slate-400">Cargando estado de Discord...</span>
        </div>
      </div>
    );
  }

  // Already linked
  if (status?.linked && status?.discord_username) {
    return (
      <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-xl p-4 border border-indigo-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">Discord Vinculado</span>
                <Check className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-indigo-300 text-sm">@{status.discord_username}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {status.has_role && (
              <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded-full">
                ✓ Rol Suscriptor
              </span>
            )}
            <a
              href={DISCORD_INVITE}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 text-sm"
            >
              Ir al servidor <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Not linked - show link form directly (simplified flow)
  return (
    <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-xl p-4 border border-indigo-500/30">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center flex-shrink-0">
          <MessageCircle className="w-5 h-5 text-indigo-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-white font-medium">Vinculá tu Discord</h3>
            <span className="bg-red-500/20 text-red-400 text-xs px-2 py-0.5 rounded-full animate-pulse">
              No vinculado
            </span>
          </div>
          
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-2 mb-3 flex items-center gap-2">
            <span className="text-lg">🎙️</span>
            <span className="text-amber-300 text-sm">
              <strong>Bonus:</strong> Acceso al Q&A mensual en vivo con Ian
            </span>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-3 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <span className="text-red-400 text-sm">{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 mb-3 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm">{success}</span>
            </div>
          )}

          {/* Always show form - no need for two steps */}
          <form onSubmit={handleLinkDiscord} className="space-y-3">
            <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
              <label className="text-slate-300 text-sm font-medium mb-2 block">
                Tu nombre de usuario de Discord
              </label>
              <input
                type="text"
                value={discordUsername}
                onChange={(e) => setDiscordUsername(e.target.value)}
                placeholder="ejemplo: iansaura"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                disabled={linking}
              />
              <p className="text-slate-500 text-xs mt-2">
                💡 Lo encontrás en Discord → Configuración → Mi cuenta (sin el @)
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="submit"
                disabled={linking || !discordUsername.trim()}
                className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                {linking ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Vinculando...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Vincular mi cuenta
                  </>
                )}
              </button>
              <a
                href={DISCORD_INVITE}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#5865F2]/20 hover:bg-[#5865F2]/30 text-[#5865F2] px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-[#5865F2]/30"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                </svg>
                Unirme primero
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DiscordLinkSection;

// Discord Provider for sharing status
export const DiscordProvider: React.FC<{ userEmail: string; children: React.ReactNode }> = ({ userEmail, children }) => {
  const [status, setStatus] = useState<DiscordStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const loadStatus = async () => {
    if (!userEmail) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/discord-status.php?email=${encodeURIComponent(userEmail)}`);
      const data = await response.json();
      if (data.success) {
        setStatus(data);
      }
    } catch (err) {
      console.error('Error loading Discord status:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail]);

  return (
    <DiscordContext.Provider value={{ status, loading, refresh: loadStatus }}>
      {children}
    </DiscordContext.Provider>
  );
};

// Small banner to show when Discord is not linked
interface DiscordBannerProps {
  onLinkClick?: () => void;
}

export const DiscordBanner: React.FC<DiscordBannerProps> = ({ onLinkClick }) => {
  const { status, loading } = useDiscordStatus();
  const [dismissed, setDismissed] = useState(false);
  const DISCORD_INVITE = 'https://discord.gg/jfyqeAMpmk';
  
  // Check if already dismissed this session
  useEffect(() => {
    const isDismissed = sessionStorage.getItem('discord-banner-dismissed');
    if (isDismissed) setDismissed(true);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('discord-banner-dismissed', 'true');
  };

  // Don't show if loading, dismissed, or already linked
  if (loading || dismissed || status?.linked) return null;

  return (
    <div className="bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-indigo-600/20 border border-indigo-500/30 rounded-xl p-3 mb-4 animate-fadeIn">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-8 h-8 bg-indigo-500/30 rounded-full flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-white font-medium text-sm">¿Ya estás en Discord?</span>
              <span className="bg-amber-500/20 text-amber-300 text-xs px-2 py-0.5 rounded-full">
                🎙️ Acceso al Q&A mensual
              </span>
            </div>
            <p className="text-slate-400 text-xs mt-0.5 truncate">
              Vinculá tu cuenta para participar en las sesiones en vivo con Ian
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href={DISCORD_INVITE}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 bg-[#5865F2] hover:bg-[#4752C4] text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
            </svg>
            Unirme
          </a>
          <button
            onClick={onLinkClick}
            className="flex items-center gap-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border border-indigo-500/30"
          >
            Vincular →
          </button>
          <button
            onClick={handleDismiss}
            className="p-1 text-slate-500 hover:text-slate-300 transition-colors"
            title="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// 🎯 Simple Discord Quick Button - all-in-one component
export const DiscordQuickButton: React.FC<{ userEmail: string }> = ({ userEmail }) => {
  const [status, setStatus] = useState<DiscordStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [discordUsername, setDiscordUsername] = useState('');
  const [linking, setLinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const DISCORD_INVITE = 'https://discord.gg/jfyqeAMpmk';

  // Load status on mount
  useEffect(() => {
    const loadStatus = async () => {
      if (!userEmail) return;
      try {
        const response = await fetch(`/api/discord-status.php?email=${encodeURIComponent(userEmail)}`);
        const data = await response.json();
        if (data.success) {
          setStatus(data);
        }
      } catch (err) {
        console.error('Error loading Discord status:', err);
      } finally {
        setLoading(false);
      }
    };
    loadStatus();
  }, [userEmail]);

  const handleLinkDiscord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!discordUsername.trim()) {
      setError('Ingresá tu nombre de usuario de Discord');
      return;
    }

    setLinking(true);
    setError(null);

    try {
      const response = await fetch('/api/link-discord.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          discord_username: discordUsername.trim().replace('@', '')
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('¡Discord vinculado! 🎉');
        setStatus({
          linked: true,
          discord_username: discordUsername.trim(),
          discord_user_id: data.discord_user_id,
          has_role: data.role_assigned
        });
        setDiscordUsername('');
        setError(null);
        // Keep modal open for a moment to show success, then close
        await new Promise(resolve => setTimeout(resolve, 2000));
        setShowModal(false);
        setSuccess(null);
      } else {
        setError(data.error || 'Error al vincular Discord');
        setLinking(false);
      }
    } catch (err) {
      console.error('Error linking Discord:', err);
      setError('Error de conexión. Intentá de nuevo.');
      setLinking(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-slate-500 text-sm">
        <RefreshCw className="w-4 h-4 animate-spin" />
        <span>Cargando Discord...</span>
      </div>
    );
  }

  // Already linked - show success status
  if (status?.linked && status?.discord_username) {
    return (
      <div className="flex items-center justify-between bg-gradient-to-r from-emerald-900/20 to-indigo-900/20 rounded-lg px-4 py-2 border border-emerald-500/30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-medium text-sm">Discord vinculado</span>
              <Check className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-slate-400 text-xs">@{status.discord_username}</span>
          </div>
        </div>
        <a
          href={DISCORD_INVITE}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 text-xs"
        >
          Ir al servidor <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    );
  }

  // Not linked - show button to open modal
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center justify-between w-full bg-gradient-to-r from-indigo-900/20 to-purple-900/20 rounded-lg px-4 py-2 border border-indigo-500/30 hover:border-indigo-400/50 transition-colors group"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-500/20 rounded-full flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="text-indigo-400 font-medium text-sm">Vincular Discord</span>
              <span className="bg-amber-500/20 text-amber-400 text-xs px-1.5 py-0.5 rounded">🎙️ Q&A</span>
            </div>
            <span className="text-slate-500 text-xs">Acceso al Q&A mensual con Ian</span>
          </div>
        </div>
        <span className="text-indigo-400 group-hover:translate-x-1 transition-transform">→</span>
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-indigo-400" />
                Vincular Discord
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mb-4 flex items-center gap-2">
              <span className="text-xl">🎙️</span>
              <span className="text-amber-300 text-sm">
                Al vincular, tenés acceso al <strong>Q&A mensual en vivo</strong> con Ian
              </span>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-red-400 text-sm">{error}</span>
              </div>
            )}

            {success && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 mb-4 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 text-sm">{success}</span>
              </div>
            )}

            <form onSubmit={handleLinkDiscord} className="space-y-4">
              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">
                  Tu nombre de usuario de Discord
                </label>
                <input
                  type="text"
                  value={discordUsername}
                  onChange={(e) => setDiscordUsername(e.target.value)}
                  placeholder="ejemplo: iansaura"
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  disabled={linking}
                  autoFocus
                />
                <p className="text-slate-500 text-xs mt-2">
                  💡 Lo encontrás en Discord → Configuración → Mi cuenta (sin el @)
                </p>
              </div>
              
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={linking || !discordUsername.trim()}
                  className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg font-medium transition-colors"
                >
                  {linking ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Vinculando...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      Vincular
                    </>
                  )}
                </button>
                <a
                  href={DISCORD_INVITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white px-4 py-3 rounded-lg font-medium transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                  </svg>
                  Unirme
                </a>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

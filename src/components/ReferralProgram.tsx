import React, { useState, useEffect } from 'react';
import { Users, Clock, Gift, Calendar, Crown, ChevronDown, Percent, Send, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface ReferralStats {
  referral_code: string;
  referral_link: string;
  bonus_days: number;
  bootcamp_discount: number;
  total_referrals: number;
  converted_referrals: number;
  referred_users: Array<{
    email: string;
    date: string;
    status: string;
  }>;
  is_paid: boolean;
  trial_end: string | null;
}

interface ReferralProgramProps {
  userEmail: string;
  userName: string;
  isPremium?: boolean;
}

export const ReferralProgram: React.FC<ReferralProgramProps> = ({ userEmail, userName, isPremium = false }) => {
  const { tLocalized: t } = useLanguage();
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  
  // Email invite form
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteStatus, setInviteStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [inviteMessage, setInviteMessage] = useState('');

  useEffect(() => {
    loadReferralData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail]);

  const loadReferralData = async () => {
    try {
      const res = await fetch(`/api/referrals.php?action=get_stats&email=${encodeURIComponent(userEmail)}`);
      const data = await res.json();
      
      if (data.success && data.stats) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error loading referral data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Send referral invitation by email
  const sendInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inviteEmail || !inviteEmail.includes('@')) {
      setInviteStatus('error');
      setInviteMessage(t({ es: 'Ingresá un email válido', en: 'Enter a valid email', pt: 'Digite um email válido' }));
      return;
    }
    
    // Can't invite yourself
    if (inviteEmail.toLowerCase() === userEmail.toLowerCase()) {
      setInviteStatus('error');
      setInviteMessage(t({ es: 'No podés referirte a vos mismo', en: "You can't refer yourself", pt: 'Você não pode se indicar' }));
      return;
    }
    
    setInviteStatus('sending');
    
    try {
      const res = await fetch('/api/referrals.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send_invite',
          referrer_email: userEmail,
          referrer_name: userName,
          invited_email: inviteEmail,
          referral_code: stats?.referral_code
        })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setInviteStatus('success');
        setInviteMessage(t({ 
          es: `¡Invitación enviada a ${inviteEmail}!`, 
          en: `Invitation sent to ${inviteEmail}!`, 
          pt: `Convite enviado para ${inviteEmail}!` 
        }));
        setInviteEmail('');
        loadReferralData(); // Refresh stats
        setTimeout(() => setInviteStatus('idle'), 5000);
      } else {
        setInviteStatus('error');
        setInviteMessage(data.error || t({ es: 'Error al enviar', en: 'Error sending', pt: 'Erro ao enviar' }));
      }
    } catch (error) {
      setInviteStatus('error');
      setInviteMessage(t({ es: 'Error de conexión', en: 'Connection error', pt: 'Erro de conexão' }));
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 animate-pulse">
        <div className="h-6 bg-slate-700 rounded w-1/3 mb-4"></div>
        <div className="h-20 bg-slate-700 rounded"></div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 rounded-2xl border border-purple-500/30 overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-purple-500/20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Gift className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {t({ es: '🎁 Referí y Ganá', en: '🎁 Refer & Earn', pt: '🎁 Indique e Ganhe' })}
            </h3>
            <p className="text-slate-400 text-sm">
              {isPremium 
                ? t({ es: 'Dales 5 días gratis a tus amigos', en: 'Give your friends 5 free days', pt: 'Dê aos seus amigos 5 dias grátis' })
                : t({ es: 'Vos y tu amigo reciben +5 días gratis', en: 'You and your friend both get +5 free days', pt: 'Você e seu amigo ganham +5 dias grátis' })
              }
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Benefits Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Referrals Count */}
          <div className="bg-slate-900/50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <Users className="w-3 h-3" />
              {t({ es: 'Referidos', en: 'Referrals', pt: 'Indicados' })}
            </div>
            <p className="text-2xl font-bold text-white">{stats.total_referrals}</p>
          </div>

          {/* Bonus for FREE users */}
          {!isPremium && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
              <div className="flex items-center gap-2 text-emerald-400 text-xs mb-1">
                <Calendar className="w-3 h-3" />
                {t({ es: 'Días bonus', en: 'Bonus days', pt: 'Dias bônus' })}
              </div>
              <p className="text-2xl font-bold text-emerald-400">+{stats.bonus_days}</p>
            </div>
          )}

          {/* Discount for PAID users */}
          {isPremium && stats.bootcamp_discount > 0 && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
              <div className="flex items-center gap-2 text-amber-400 text-xs mb-1">
                <Percent className="w-3 h-3" />
                {t({ es: 'Descuento Bootcamp', en: 'Bootcamp Discount', pt: 'Desconto Bootcamp' })}
              </div>
              <p className="text-2xl font-bold text-amber-400">{stats.bootcamp_discount}%</p>
            </div>
          )}

          {/* Premium badge for paid users without discount yet */}
          {isPremium && stats.bootcamp_discount === 0 && (
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
              <div className="flex items-center gap-2 text-purple-400 text-xs mb-1">
                <Crown className="w-3 h-3" />
                {t({ es: 'Tu beneficio', en: 'Your benefit', pt: 'Seu benefício' })}
              </div>
              <p className="text-sm font-medium text-purple-300">
                {t({ es: '10% off al referir', en: '10% off when you refer', pt: '10% off ao indicar' })}
              </p>
            </div>
          )}
        </div>

        {/* 📧 INVITE BY EMAIL - Primary Action */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/30">
          <div className="flex items-center gap-2 mb-3">
            <Mail className="w-5 h-5 text-purple-400" />
            <h4 className="font-semibold text-white">
              {t({ es: 'Invitá por email', en: 'Invite by email', pt: 'Convidar por email' })}
            </h4>
          </div>
          <form onSubmit={sendInvite} className="space-y-3">
            <div className="flex gap-2">
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder={t({ es: 'Email de tu amigo/a', en: "Your friend's email", pt: 'Email do seu amigo' })}
                className="flex-1 px-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none transition-colors"
                disabled={inviteStatus === 'sending'}
              />
              <button
                type="submit"
                disabled={inviteStatus === 'sending' || !inviteEmail}
                className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-slate-700 disabled:to-slate-700 text-white font-medium rounded-lg transition-all flex items-center gap-2"
              >
                {inviteStatus === 'sending' ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
            
            {/* Status Message */}
            {inviteStatus !== 'idle' && inviteStatus !== 'sending' && (
              <div className={`flex items-center gap-2 text-sm ${
                inviteStatus === 'success' ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {inviteStatus === 'success' ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                {inviteMessage}
              </div>
            )}
          </form>
          <p className="text-xs text-slate-500 mt-2">
            {t({ 
              es: 'Le enviaremos un email con tu invitación personal', 
              en: "We'll send them an email with your personal invitation", 
              pt: 'Enviaremos um email com seu convite pessoal' 
            })}
          </p>
        </div>

        {/* How it works */}
        <div className="bg-slate-900/30 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-white mb-3">
            {t({ es: '¿Cómo funciona?', en: 'How does it work?', pt: 'Como funciona?' })}
          </h4>
          <ul className="space-y-2 text-sm text-slate-300">
            {!isPremium ? (
              <>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">1.</span>
                  {t({ es: 'Ingresá el email de tu amigo/a arriba', en: "Enter your friend's email above", pt: 'Digite o email do seu amigo acima' })}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">2.</span>
                  {t({ es: 'Le enviamos una invitación personalizada', en: 'We send them a personalized invitation', pt: 'Enviamos um convite personalizado' })}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">3.</span>
                  {t({ es: 'Cuando se registran, vos y ellos reciben +5 días de trial', en: 'When they sign up, you both get +5 trial days', pt: 'Quando se cadastram, vocês dois ganham +5 dias de trial' })}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">3.</span>
                  {t({ es: '¡Se acumula! Referí más = más días gratis', en: 'It stacks! More referrals = more free days', pt: 'Acumula! Mais indicações = mais dias grátis' })}
                </li>
              </>
            ) : (
              <>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">1.</span>
                  {t({ es: 'Compartí tu código con amigos', en: 'Share your code with friends', pt: 'Compartilhe seu código com amigos' })}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">2.</span>
                  {t({ es: 'Ellos reciben +5 días de trial gratis', en: 'They get +5 free trial days', pt: 'Eles ganham +5 dias de trial grátis' })}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">3.</span>
                  {t({ es: 'Vos obtenés 10% de descuento en el próximo Bootcamp', en: 'You get 10% off the next Bootcamp', pt: 'Você ganha 10% de desconto no próximo Bootcamp' })}
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Referral History */}
        {stats.referred_users && stats.referred_users.length > 0 && (
          <div>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="w-full flex items-center justify-between text-sm text-slate-400 hover:text-white transition-colors py-2"
            >
              <span>
                {t({ es: 'Historial de referidos', en: 'Referral history', pt: 'Histórico de indicações' })}
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showHistory ? 'rotate-180' : ''}`} />
            </button>
            
            {showHistory && (
              <div className="mt-2 space-y-2">
                {stats.referred_users.map((user, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-900/30 rounded-lg p-2 text-sm">
                    <span className="text-slate-300">{user.email}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {new Date(user.date).toLocaleDateString()}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        user.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-400'
                      }`}>
                        {user.status === 'active' ? '✓ Activo' : 'Trial'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferralProgram;

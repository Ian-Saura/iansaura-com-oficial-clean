import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Home, LogOut, Menu, X, Star, Settings, 
  HelpCircle, MessageCircle, ExternalLink, ChevronDown, Shield, Key, Rocket
} from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../i18n/LanguageContext';

// Admin emails that can access the admin panel
const ADMIN_EMAILS = ['iansauradata@gmail.com', 'info@iansaura.com'];

interface MembersNavigationProps {
  user: any;
  displayName: string;
}

const MembersNavigation: React.FC<MembersNavigationProps> = ({ user, displayName }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const isAdmin = user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase());
  const isGoogleUser = user?.provider === 'google';

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage(null);
    
    if (passwordForm.new !== passwordForm.confirm) {
      setPasswordMessage({ type: 'error', text: t('auth.passwordsDoNotMatch') });
      return;
    }
    
    if (passwordForm.new.length < 6) {
      setPasswordMessage({ type: 'error', text: t('auth.passwordLength') });
      return;
    }
    
    setPasswordLoading(true);
    try {
      const response = await fetch('/api/change-password.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          current_password: passwordForm.current,
          new_password: passwordForm.new,
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setPasswordMessage({ type: 'success', text: t('auth.passwordUpdated') });
        setPasswordForm({ current: '', new: '', confirm: '' });
        setTimeout(() => setShowPasswordModal(false), 2000);
      } else {
        setPasswordMessage({ type: 'error', text: data.error || t('auth.passwordUpdateFailed') });
      }
    } catch (error) {
      setPasswordMessage({ type: 'error', text: t('errors.network') });
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800" aria-label="Navegación de miembros">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Platform Name */}
          <div className="flex items-center gap-3">
            <Link to="/members" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-emerald-500/20">
                IS
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-white group-hover:text-emerald-400 transition-colors">
                  Data Engineering Academy
                </div>
                <div className="text-xs text-slate-500">{t('members.byIanSaura') || 'by Ian Saura'}</div>
              </div>
            </Link>
          </div>

          {/* Center - Premium Badge */}
          <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 text-emerald-400 px-4 py-1.5 rounded-full border border-emerald-500/30">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-medium text-sm">{t('members.premiumActive')}</span>
          </div>

          {/* Right Side - User Menu */}
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="hidden sm:block">
              <LanguageSelector variant="compact" />
            </div>

            {/* Discord Quick Link */}
            <a 
              href="https://discord.gg/jfyqeAMpmk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Discord</span>
            </a>

            {/* Help */}
            <button className="p-2 text-slate-400 hover:text-white transition-colors hidden sm:block">
              <HelpCircle className="w-5 h-5" />
            </button>

            {/* User Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 rounded-lg px-3 py-2 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:block text-white font-medium">{displayName}</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-slate-900 border border-slate-700 rounded-xl shadow-xl overflow-hidden">
                  <div className="p-3 border-b border-slate-700">
                    <div className="text-white font-medium">{displayName}</div>
                    <div className="text-slate-400 text-sm truncate">{user?.email}</div>
                    <div className="flex items-center gap-1 mt-1 text-emerald-400 text-xs">
                      <Star className="w-3 h-3 fill-current" />
                      {t('members.premiumSubscriber')}
                    </div>
                  </div>
                  
                  <div className="p-2">
                    {/* Admin Panel - Only for admins */}
                    {isAdmin && (
                      <Link 
                        to="/admin"
                        className="flex items-center gap-3 px-3 py-2 text-purple-400 hover:bg-purple-500/10 rounded-lg transition-colors mb-1"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Shield className="w-4 h-4" />
                        {t('nav.admin')}
                      </Link>
                    )}
                    {/* Si tiene acceso al bootcamp, mostrar link */}
                    {user?.bootcamp_access && (
                      <Link 
                        to="/bootcamp-platform"
                        className="flex items-center gap-3 px-3 py-2 text-orange-400 hover:bg-orange-500/10 rounded-lg transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Rocket className="w-4 h-4" />
                        {t('members.goToBootcamp')}
                      </Link>
                    )}
                    <Link 
                      to="/"
                      className="flex items-center gap-3 px-3 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Home className="w-4 h-4" />
                      {t('members.goToMainSite')}
                    </Link>
                    <a 
                      href="https://discord.gg/jfyqeAMpmk" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {t('members.discordCommunity')}
                      <ExternalLink className="w-3 h-3 ml-auto text-slate-500" />
                    </a>
                    <a 
                      href="mailto:info@iansaura.com"
                      className="flex items-center gap-3 px-3 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <HelpCircle className="w-4 h-4" />
                      {t('members.support')}
                    </a>
                  </div>

                  <div className="p-2 border-t border-slate-700">
                    {!isGoogleUser && (
                      <button 
                        onClick={() => { setShowPasswordModal(true); setShowUserMenu(false); }}
                        className="flex items-center gap-3 px-3 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors w-full"
                      >
                        <Key className="w-4 h-4" />
                        {t('members.changePassword')}
                      </button>
                    )}
                    <button 
                      onClick={() => { navigate('/settings'); setShowUserMenu(false); }}
                      className="flex items-center gap-3 px-3 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors w-full"
                    >
                      <Settings className="w-4 h-4" />
                      {t('members.settings')}
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      {t('nav.logout')}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-800 bg-slate-950 max-h-[calc(100vh-4rem)] overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="p-4 space-y-2">
            {/* Admin Panel - Only for admins */}
            {isAdmin && (
              <Link 
                to="/admin"
                className="flex items-center gap-3 px-4 py-3 text-purple-400 hover:bg-purple-500/10 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Shield className="w-5 h-5" />
                {t('nav.admin')}
              </Link>
            )}
            {/* Bootcamp - si tiene acceso */}
            {user?.bootcamp_access && (
              <Link 
                to="/bootcamp-platform"
                className="flex items-center gap-3 px-4 py-3 text-orange-400 hover:bg-orange-500/10 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Rocket className="w-5 h-5" />
                {t('members.goToBootcamp')}
              </Link>
            )}
            <Link 
              to="/"
              className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home className="w-5 h-5" />
              {t('members.goToMainSite')}
            </Link>
            <a 
              href="https://discord.gg/jfyqeAMpmk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              {t('members.discordCommunity')}
              <ExternalLink className="w-4 h-4 ml-auto text-slate-500" />
            </a>
            <a 
              href="mailto:info@iansaura.com"
              className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <HelpCircle className="w-5 h-5" />
              {t('members.support')}
            </a>
            <button 
              onClick={() => { navigate('/settings'); setMobileMenuOpen(false); }}
              className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors w-full"
            >
              <Settings className="w-5 h-5" />
              {t('members.settings')}
            </button>
            
            {/* Language Selector Mobile */}
            <div className="px-4 py-3 border-t border-slate-800">
              <div className="text-slate-500 text-xs mb-2">{t('members.language')}</div>
              <LanguageSelector variant="buttons" />
            </div>
            
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors w-full"
            >
              <LogOut className="w-5 h-5" />
              {t('nav.logout')}
            </button>
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-[-1]" 
          onClick={() => setShowUserMenu(false)}
        />
      )}

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 border border-slate-700" style={{ WebkitOverflowScrolling: 'touch' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Key className="w-5 h-5 text-emerald-400" />
                {t('members.changePassword')}
              </h3>
              <button 
                onClick={() => { setShowPasswordModal(false); setPasswordMessage(null); }}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label htmlFor="current-password" className="block text-slate-400 text-sm mb-1">{t('auth.currentPassword')}</label>
                <input
                  id="current-password"
                  type="password"
                  value={passwordForm.current}
                  onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                  autoComplete="current-password"
                />
              </div>
              <div>
                <label htmlFor="new-password" className="block text-slate-400 text-sm mb-1">{t('auth.newPassword')}</label>
                <input
                  id="new-password"
                  type="password"
                  value={passwordForm.new}
                  onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                  minLength={6}
                  autoComplete="new-password"
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-slate-400 text-sm mb-1">{t('auth.confirmPassword')}</label>
                <input
                  id="confirm-password"
                  type="password"
                  value={passwordForm.confirm}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                  minLength={6}
                  autoComplete="new-password"
                />
              </div>

              {passwordMessage && (
                <div className={`p-3 rounded-lg text-sm ${
                  passwordMessage.type === 'success' 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {passwordMessage.text}
                </div>
              )}

              <button
                type="submit"
                disabled={passwordLoading}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                {passwordLoading ? t('common.loading') : t('common.save')}
              </button>
            </form>

            <p className="text-slate-500 text-xs mt-4 text-center">
              {t('auth.passwordLength')}
            </p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MembersNavigation;

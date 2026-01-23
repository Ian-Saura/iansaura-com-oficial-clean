import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, TrendingUp, Activity, RefreshCw, 
  CheckCircle, XCircle, Clock,
  BarChart3, Calendar, Mail, Shield, AlertCircle,
  Search, Trash2, MessageCircle,
  UserPlus, Play, Target, Gift
} from 'lucide-react';
import { MetricsTab } from '../components/admin/tabs/MetricsTab';
import { BootcampsTab } from '../components/admin/tabs/BootcampsTab';

interface AdminUser {
  email: string;
  name?: string;
}

interface AdminProps {
  user: AdminUser | null;
}

interface Stats {
  active_subscribers: number;
  total_users: number;
  subscribers_this_month: number;
  cancellations_this_month: number;
  estimated_mrr: number;
  new_users_7days: number;
  conversion_rate: number;
  subscribers_by_month: { month: string; count: number }[];
  // New trial-related stats
  active_trials: number;
  expired_trials: number;
  total_with_access: number;
}

interface Subscriber {
  id: number;
  email: string;
  secondary_email?: string; // For users who paid with different email
  name: string;
  user_name?: string;
  status: string;
  subscription_start: string;
  subscription_end: string;
  next_payment_date: string;
  last_payment_date: string;
  amount: number;
  currency: string;
  discord_connected: boolean;
  discord_user_id: string;
  discord_username?: string;
  created_at: string;
  updated_at: string;
  payment_type: 
    | 'invited_permanent' | 'invited_temporary'
    | 'trial_with_card' | 'trial_no_card'
    | 'gumroad' | 'oneinfinite' | 'free' | 'paid' | 'external'
    | 'invited' | 'trial_free' | 'trial_manual';
  notes?: string;
  is_oneinfinite: boolean;
  oneinfinite_subscription_id?: string;
  // New fields for trial detection
  is_trial?: boolean;
  is_expired?: boolean;
  has_access?: boolean;
  effective_status?: string;
  days_left?: number;
  // Trial type distinction
  is_oneinfinite_trial?: boolean;
  is_manual_trial?: boolean;
  trial_type?: 'oneinfinite' | 'manual' | null;
  trial_type_label?: string;
  trial_ends_at?: string;
  trial_ends_at_formatted?: string;
  plan_type?: string;
}

interface ActivityItem {
  type: string;
  email: string;
  name: string;
  timestamp: string;
}

interface RegisteredUser {
  id: number;
  email: string;
  name: string;
  first_name: string;
  last_name: string;
  provider: string;
  email_verified: boolean;
  is_active: boolean;
  subscribed: boolean;
  bootcamp_access: boolean;
  login_count: number;
  last_login: string;
  created_at: string;
  subscription_status?: string;
  subscription_end?: string;
  is_trial?: boolean;
  trial_days_left?: number;
  // Info de suscripción pasada
  had_trial?: boolean;
  trial_expired_at?: string;
  had_subscription?: boolean;
  // Referral info
  referral_code?: string;
  referred_by?: string;
  referred_by_email?: string;
  referral_bonus_days?: number;
  bootcamp_discount?: number;
  referrals_count?: number;
  referred_users?: { email: string; created_at: string }[];
  status_type?: 'active' | 'trial' | 'referral_trial' | 'trial_expired' | 'free';
}

interface ReferralStats {
  success: boolean;
  total_referrals: number;
  referral_trials: number;
  total_bonus_days: number;
  top_referrers: Array<{
    email: string;
    referral_code: string;
    bonus_days: number;
    bootcamp_discount: number;
    referral_count: number;
  }>;
  recent_referrals: Array<{
    referred_email: string;
    referral_code: string;
    created_at: string;
    bonus_days: number;
    referrer_email: string;
    subscription_status: string;
  }>;
}

const ADMIN_EMAILS = ['iansauradata@gmail.com', 'info@iansaura.com'];
// API key se genera dinámicamente basada en el email del admin + timestamp del día
const generateAdminKey = (email: string): string => {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const base = `${email}_${today}_iansaura_admin_2024`;
  // Simple hash para ofuscar
  let hash = 0;
  for (let i = 0; i < base.length; i++) {
    const char = base.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return `adm_${Math.abs(hash).toString(36)}_${today.replace(/-/g, '')}`;
};

interface UserProgressData {
  id: number;
  email: string;
  name?: string;
  is_subscriber?: boolean;
  subscription_status?: string;
  has_progress?: boolean;
  level_1_percent: number;
  level_2_percent: number;
  level_3_percent: number;
  completed_steps: number;
  completed_projects: number;
  watched_videos: number;
  xp: number;
  datacoins: number;
  current_streak: number;
  longest_streak: number;
  monthly_xp: number;
  login_count: number;
  score: number;
  engagement_score: number;
  user_status: 'new' | 'active' | 'cooling' | 'at_risk' | 'churned';
  days_since_registration: number;
  days_inactive: number;
  last_active?: string;
  last_login?: string;
  created_at?: string;
}

interface BootcampStudent {
  id: number;
  email: string;
  name: string;
  edition: number;
  amount_paid: number;
  amount_total: number;
  payment_status: 'paid' | 'partial' | 'pending' | 'invited';
  has_platform_access: boolean;
  deliveries: boolean[]; // 8 entregas
  notes?: string;
  created_at: string;
  updated_at: string;
}

// Simple Markdown to HTML parser for feedback preview
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function renderFeedbackMarkdown(text: string): string {
  if (!text) return '<p class="text-slate-500 italic">Escribí algo para ver la preview...</p>';
  
  let html = text;
  
  // Escape HTML first
  html = html.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  
  // Code blocks (```language ... ```)
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre class="bg-slate-900 rounded-lg p-4 overflow-x-auto my-4 border border-slate-700"><code class="text-sm text-emerald-400">${code.trim()}</code></pre>`;
  });
  
  // Inline code (`code`)
  html = html.replace(/`([^`]+)`/g, '<code class="bg-slate-800 px-1.5 py-0.5 rounded text-orange-400 text-sm">$1</code>');
  
  // Tables
  html = html.replace(/\n\|(.+)\|\n\|[-:\s|]+\|\n((?:\|.+\|\n?)+)/g, (match, header, rows) => {
    const headerCells = header.split('|').filter((c: string) => c.trim());
    const headerHtml = headerCells.map((c: string) => `<th class="px-3 py-2 text-left text-orange-400 font-bold border-b border-slate-600 text-xs">${c.trim()}</th>`).join('');
    
    const rowsHtml = rows.trim().split('\n').map((row: string) => {
      const cells = row.split('|').filter((c: string) => c.trim());
      return `<tr class="border-b border-slate-700/50">${cells.map((c: string) => `<td class="px-3 py-2 text-slate-300 text-xs">${c.trim()}</td>`).join('')}</tr>`;
    }).join('');
    
    return `<div class="overflow-x-auto my-4"><table class="w-full text-sm border border-slate-700 rounded-lg overflow-hidden"><thead class="bg-slate-800"><tr>${headerHtml}</tr></thead><tbody class="bg-slate-800/50">${rowsHtml}</tbody></table></div>`;
  });
  
  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-base font-bold text-white mt-5 mb-2">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-lg font-bold text-white mt-6 mb-3 pb-2 border-b border-slate-700">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-xl font-bold text-white mt-4 mb-3">$1</h1>');
  
  // Bold and italic - ensure text color
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong class="text-white"><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em class="text-slate-200">$1</em>');
  
  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-orange-500 pl-4 py-2 my-3 bg-orange-500/10 rounded-r-lg text-slate-300 italic text-sm">$1</blockquote>');
  
  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr class="border-slate-700 my-5" />');
  
  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li class="ml-4 text-slate-300 flex items-start gap-2 text-sm"><span class="text-orange-400 mt-1">•</span><span>$1</span></li>');
  html = html.replace(/(<li[^>]*>.*<\/li>\n?)+/g, '<ul class="my-2 space-y-1">$&</ul>');
  
  // Line breaks
  html = html.replace(/\n\n/g, '</p><p class="my-2 text-slate-300 text-sm">');
  html = html.replace(/\n/g, '<br/>');
  
  // Wrap everything in a container with base text color
  html = `<div class="text-slate-300">${html}</div>`;
  
  return html;
}

const Admin: React.FC<AdminProps> = ({ user }) => {
  // Generate dynamic API key based on user email (changes daily)
  const API_KEY = user?.email ? generateAdminKey(user.email) : '';
  
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats | null>(null);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [users, setUsers] = useState<RegisteredUser[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgressData[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'bootcamps' | 'users' | 'progress' | 'activity' | 'metrics' | 'timeline' | 'suggestions' | 'referrals'>('overview');
  const [referralStats, setReferralStats] = useState<ReferralStats | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loadingReferrals, setLoadingReferrals] = useState(false);
  const [datasetSuggestions, setDatasetSuggestions] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [retentionMetrics, setRetentionMetrics] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [conversionMetrics, setConversionMetrics] = useState<any>(null);
  const [analyticsMetrics, setAnalyticsMetrics] = useState<any>(null);
  const [loadingMetrics, setLoadingMetrics] = useState(false);
  const [activityTimeline, setActivityTimeline] = useState<any>(null);
  const [loadingTimeline, setLoadingTimeline] = useState(false);
  const [bootcampStudents, setBootcampStudents] = useState<BootcampStudent[]>([]);
  const [editingBootcampStudent, setEditingBootcampStudent] = useState<BootcampStudent | null>(null);
  const [showAddBootcampModal, setShowAddBootcampModal] = useState(false);
  const [newBootcampStudent, setNewBootcampStudent] = useState({
    name: '', email: '', edition: 3, amount_paid: 0, amount_total: 350, payment_status: 'pending' as 'paid' | 'partial' | 'pending', notes: ''
  });
  // Bootcamp Feedback states
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({
    student_email: '', week_number: 1, feedback_title: '', feedback_content: '', grade: '', send_email: true
  });
  const [bootcampFeedbacks, setBootcampFeedbacks] = useState<any[]>([]);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchTerm, setSearchTerm] = useState('');
  const [userAccessFilter, setUserAccessFilter] = useState<string>('all');
  const [progressFilter, setProgressFilter] = useState<'all' | 'active' | 'subscribers'>('all');
  const [subscriberCounts, setSubscriberCounts] = useState({ 
    total: 0, active: 0, paid: 0, invited: 0, external: 0, 
    trials_active: 0, trials_expired: 0,
    trials_oneinfinite_active: 0, trials_manual_active: 0,
    trials_oneinfinite_expired: 0, trials_manual_expired: 0,
    paid_oneinfinite: 0, paid_gumroad: 0, trials_gumroad: 0
  });
  const [error, setError] = useState<string | null>(null);
  const [accessGranted, setAccessGranted] = useState(false);
  const [accessKey, setAccessKey] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSubscriber, setNewSubscriber] = useState({ 
    name: '', 
    email: '', 
    access_type: 'subscription' as 'subscription' | 'bootcamp' | 'both',
    subscription_months: 1 as 1 | 6 | 12
  });
  const [addingSubscriber, setAddingSubscriber] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showTrialModal, setShowTrialModal] = useState(false);
  const [trialUser, setTrialUser] = useState<RegisteredUser | null>(null);
  const [trialOptions, setTrialOptions] = useState({ grantAccess: true, days: 7, sendEmail: true, trialType: 'manual' as 'manual' | 'gumroad' | 'oneinfinite' });
  
  // Edit subscriber modal
  const [showEditSubscriberModal, setShowEditSubscriberModal] = useState(false);
  const [editingUserEmail, setEditingUserEmail] = useState<string>('');
  const [editSubscriberForm, setEditSubscriberForm] = useState({
    payment_type: 'gumroad' as string,
    status: 'active' as string,
    subscription_end: '',
    secondary_email: '',
    notes: ''
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sendingTrial, setSendingTrial] = useState(false);
  
  // Bulk selection state
  const [selectedSubscribers, setSelectedSubscribers] = useState<Set<number>>(new Set());
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [bulkActionLoading, setBulkActionLoading] = useState(false);

  // Verificar si el usuario es admin por email
  const isAdminByEmail = user && ADMIN_EMAILS.includes(user.email);
  
  // Verificar si hay key en URL (key dinámica basada en cualquier admin email)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const keyParam = urlParams.get('key');
    if (keyParam) {
      // Check if key matches any admin's dynamic key
      const isValidKey = ADMIN_EMAILS.some(email => generateAdminKey(email) === keyParam);
      if (isValidKey) {
        setAccessGranted(true);
      }
    }
  }, []);

  const isAdmin = isAdminByEmail || accessGranted;

  useEffect(() => {
    if (isAdmin) {
      loadData();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  const addSubscriber = async () => {
    if (!newSubscriber.email) {
      setError('Email es requerido');
      return;
    }
    
    setAddingSubscriber(true);
    setError(null);
    
    try {
      const res = await fetch(`/api/admin.php?action=add_subscriber&key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSubscriber)
      });
      
      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      // Mostrar mensaje con credenciales si se creó usuario nuevo
      let message = `✅ Suscriptor ${newSubscriber.email} agregado exitosamente!`;
      if (data.temp_password) {
        message += `\n\n🔑 CREDENCIALES TEMPORALES:\nEmail: ${newSubscriber.email}\nContraseña: ${data.temp_password}\n\n📋 Copiá esto y enviáselo al usuario.`;
      } else if (data.user_created === false) {
        message += `\n\nℹ️ El usuario ya existía. Puede usar su contraseña actual.`;
      }
      
      setSuccessMessage(message);
      setShowAddModal(false);
      setNewSubscriber({ name: '', email: '', access_type: 'subscription', subscription_months: 1 });
      loadData(); // Recargar datos
      
      // Limpiar mensaje después de 30 segundos (más tiempo para copiar credenciales)
      setTimeout(() => setSuccessMessage(null), 30000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al agregar suscriptor');
    } finally {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setAddingSubscriber(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const deleteSubscriber = async (id: number, email: string) => {
    if (!window.confirm(`¿Seguro que querés eliminar a ${email}?`)) return;
    
    try {
      const res = await fetch(`/api/admin.php?action=delete_subscriber&key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      setSuccessMessage(`Suscriptor ${email} eliminado`);
      loadData();
      setTimeout(() => setSuccessMessage(null), 5000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar');
    }
  };

  const handleTogglePermission = async (userId: number, email: string, permissionType: 'subscribed' | 'bootcamp_access', newValue: boolean) => {
    const permissionName = permissionType === 'subscribed' ? 'Academia' : 'Bootcamp';
    const action = newValue ? 'dar' : 'quitar';
    
    if (!window.confirm(`¿${action.charAt(0).toUpperCase() + action.slice(1)} acceso a ${permissionName} para ${email}?`)) return;
    
    try {
      const res = await fetch(`/api/admin.php?action=update_user_permissions&key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          user_id: userId,
          [permissionType]: newValue
        })
      });
      
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      setSuccessMessage(data.message || `Permiso actualizado para ${email}`);
      loadData(); // Recargar datos
      setTimeout(() => setSuccessMessage(null), 5000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar permisos');
    }
  };

  const handleDeleteUser = async (userId: number, email: string, name: string) => {
    if (!window.confirm(`⚠️ ¿ELIMINAR COMPLETAMENTE a ${name || email}?\n\nEsto eliminará:\n- Su cuenta de usuario\n- Su suscripción (si tiene)\n- Su progreso guardado\n- Todos sus datos\n\n¡Esta acción NO se puede deshacer!`)) return;
    
    try {
      const res = await fetch(`/api/admin.php?action=delete_user&key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId })
      });
      
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      setSuccessMessage(data.message || `Usuario ${email} eliminado`);
      loadData(); // Recargar datos
      setTimeout(() => setSuccessMessage(null), 5000);
      
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setError(err instanceof Error ? err.message : 'Error al eliminar usuario');
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleUpdatePaymentType = async (subscriberId: number, paymentType: string, notes?: string) => {
    try {
      const res = await fetch(`/api/admin.php?action=update_subscriber_type&key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriber_id: subscriberId, payment_type: paymentType, notes })
      });
      
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      setSuccessMessage(data.message);
      loadData();
      setTimeout(() => setSuccessMessage(null), 5000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar tipo de pago');
    }
  };

  // Handle Discord manual linking/unlinking
  const handleUpdateDiscord = async (email: string, discordUsername: string) => {
    try {
      const res = await fetch('/api/admin-update-discord.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email,
          discord_username: discordUsername,
          admin_key: API_KEY
        })
      });
      
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      setSuccessMessage(data.message || `Discord ${discordUsername ? 'vinculado' : 'desvinculado'} para ${email}`);
      loadData(); // Reload data
      setTimeout(() => setSuccessMessage(null), 5000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar Discord');
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleUpdateSubscriber = async (subscriber: Subscriber) => {
    const payload = {
      subscriber_id: subscriber.id,
      status: subscriber.status,
      payment_type: subscriber.payment_type,
      subscription_start: subscriber.subscription_start,
      subscription_end: subscriber.subscription_end,
      notes: subscriber.notes,
      secondary_email: subscriber.secondary_email || null
    };
    
    console.log('Updating subscriber:', payload);
    
    try {
      const res = await fetch(`/api/admin.php?action=update_subscriber_full&key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      console.log('Response:', data);
      
      if (data.error) throw new Error(data.error);
      
      setSuccessMessage(data.message || 'Suscriptor actualizado correctamente');
      loadData();
      setTimeout(() => setSuccessMessage(null), 5000);
      
    } catch (err) {
      console.error('Update error:', err);
      setError(err instanceof Error ? err.message : 'Error al actualizar suscriptor');
    }
  };

  const handleAddBootcampStudent = async () => {
    if (!newBootcampStudent.email) {
      setError('Email es requerido');
      return;
    }
    
    try {
      const res = await fetch(`/api/admin.php?action=add_bootcamp_student&key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBootcampStudent)
      });
      
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      setSuccessMessage(`Estudiante ${newBootcampStudent.email} agregado al Bootcamp Ed. ${newBootcampStudent.edition}`);
      setShowAddBootcampModal(false);
      setNewBootcampStudent({ name: '', email: '', edition: 3, amount_paid: 0, amount_total: 350, payment_status: 'pending', notes: '' });
      loadData();
      setTimeout(() => setSuccessMessage(null), 5000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al agregar estudiante');
    }
  };

  const handleUpdateBootcampStudent = async (student: BootcampStudent) => {
    try {
      const res = await fetch(`/api/admin.php?action=update_bootcamp_student&key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student)
      });
      
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      setSuccessMessage(`Estudiante ${student.email} actualizado`);
      setEditingBootcampStudent(null);
      loadData();
      setTimeout(() => setSuccessMessage(null), 5000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar estudiante');
    }
  };

  // Bootcamp Feedback functions
  const loadBootcampFeedbacks = async () => {
    setLoadingFeedbacks(true);
    try {
      const res = await fetch(`/api/bootcamp-feedback.php?action=all&key=${API_KEY}`);
      const data = await res.json();
      if (data.success) {
        setBootcampFeedbacks(data.feedbacks || []);
      }
    } catch (err) {
      console.error('Error loading feedbacks:', err);
    } finally {
      setLoadingFeedbacks(false);
    }
  };

  const handleCreateFeedback = async () => {
    if (!feedbackForm.student_email || !feedbackForm.feedback_title || !feedbackForm.feedback_content) {
      setError('Completá todos los campos obligatorios');
      return;
    }
    
    try {
      const res = await fetch(`/api/bootcamp-feedback.php?action=create&key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...feedbackForm,
          key: API_KEY,
          admin_email: user?.email
        })
      });
      
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      setSuccessMessage(`✅ Devolución enviada a ${feedbackForm.student_email}${data.email_sent ? ' (email enviado)' : ''}`);
      setShowFeedbackModal(false);
      setFeedbackForm({ student_email: '', week_number: 1, feedback_title: '', feedback_content: '', grade: '', send_email: true });
      loadBootcampFeedbacks();
      setTimeout(() => setSuccessMessage(null), 5000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear devolución');
    }
  };

  const handleDeleteFeedback = async (feedbackId: number) => {
    if (!window.confirm('¿Eliminar esta devolución?')) return;
    
    try {
      const res = await fetch(`/api/bootcamp-feedback.php?action=delete&key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback_id: feedbackId, key: API_KEY })
      });
      
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      setSuccessMessage('Devolución eliminada');
      loadBootcampFeedbacks();
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar');
    }
  };

  const handleToggleDelivery = async (studentId: number, deliveryIndex: number, completed: boolean) => {
    try {
      const res = await fetch(`/api/admin.php?action=toggle_delivery&key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_id: studentId, delivery_index: deliveryIndex, completed })
      });
      
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      // Update local state immediately for better UX
      setBootcampStudents(prev => prev.map(s => {
        if (s.id === studentId) {
          const deliveries = [...(s.deliveries || [false,false,false,false,false,false,false,false])];
          deliveries[deliveryIndex] = completed;
          return { ...s, deliveries };
        }
        return s;
      }));
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar entrega');
    }
  };

  const handleDeleteBootcampStudent = async (studentId: number, email: string, name: string) => {
    if (!window.confirm(`¿Eliminar a ${name || email} del bootcamp?\n\nEsto NO elimina su cuenta de usuario, solo lo quita de la lista de estudiantes del bootcamp.`)) return;
    
    try {
      const res = await fetch(`/api/admin.php?action=delete_bootcamp_student&key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: studentId })
      });
      
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      setSuccessMessage(data.message || `Estudiante ${name || email} eliminado del bootcamp`);
      setBootcampStudents(prev => prev.filter(s => s.id !== studentId));
      setTimeout(() => setSuccessMessage(null), 5000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar estudiante');
    }
  };

  const handleResendVerification = async (email: string) => {
    try {
      const res = await fetch('/api/auth.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'resend_verification', email })
      });
      
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      setSuccessMessage(`📧 Email de verificación reenviado a ${email}`);
      setTimeout(() => setSuccessMessage(null), 5000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al reenviar email');
    }
  };

  // Enviar invitación de trial gratuito
  const handleSendTrialInvitation = async () => {
    if (!trialUser) return;
    
    setSendingTrial(true);
    setError(null);
    
    try {
      const res = await fetch(`/api/admin.php?action=send_trial_invitation&key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trialUser.email,
          grant_access: trialOptions.grantAccess,
          days: trialOptions.days,
          trial_type: trialOptions.trialType
        })
      });
      
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      setSuccessMessage(`🎁 ${data.message}`);
      setShowTrialModal(false);
      setTrialUser(null);
      loadData(); // Recargar datos
      
      setTimeout(() => setSuccessMessage(null), 10000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar invitación');
    } finally {
      setSendingTrial(false);
    }
  };

  // Enviar trial masivo a usuarios sin suscripción
  const handleSendBulkTrialInvitations = async () => {
    const usersWithoutSubscription = users.filter(u => !u.subscribed && u.email_verified !== false);
    
    if (usersWithoutSubscription.length === 0) {
      setError('No hay usuarios elegibles para trial');
      return;
    }
    
    const confirm = window.confirm(
      `¿Enviar invitación de trial a ${usersWithoutSubscription.length} usuarios?\n\n` +
      `Esto les dará ${trialOptions.days} días de acceso gratuito y les enviará un email.`
    );
    
    if (!confirm) return;
    
    setSendingTrial(true);
    setError(null);
    
    let sent = 0;
    let errors = 0;
    
    for (const u of usersWithoutSubscription) {
      try {
        const res = await fetch(`/api/admin.php?action=send_trial_invitation&key=${API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: u.email,
            grant_access: true,
            days: trialOptions.days
          })
        });
        
        const data = await res.json();
        if (data.success) sent++;
        else errors++;
        
        // Pequeña pausa entre emails para no saturar
        await new Promise(r => setTimeout(r, 500));
        
      } catch {
        errors++;
      }
    }
    
    setSuccessMessage(`🎁 Trial enviado a ${sent} usuarios. ${errors > 0 ? `(${errors} errores)` : ''}`);
    setSendingTrial(false);
    loadData();
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setTimeout(() => setSuccessMessage(null), 15000);
  };

  // Bulk selection helpers
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const toggleSelectSubscriber = (id: number) => {
    const newSelected = new Set(selectedSubscribers);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }
    setSelectedSubscribers(newSelected);
  };

  const clearSelection = () => {
    setSelectedSubscribers(new Set());
  };

  const getSelectedSubscribers = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return subscribers.filter(s => selectedSubscribers.has(s.id));
  };

  // Bulk delete subscribers
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleBulkDelete = async () => {
    const selected = getSelectedSubscribers();
    if (selected.length === 0) return;

    const confirmMsg = selected.length === 1 
      ? `¿Eliminar a ${selected[0].email}?`
      : `¿Eliminar ${selected.length} suscriptores?\n\n${selected.slice(0, 5).map(s => s.email).join('\n')}${selected.length > 5 ? `\n...y ${selected.length - 5} más` : ''}`;

    if (!window.confirm(confirmMsg)) return;

    setBulkActionLoading(true);
    let deleted = 0;
    let errors = 0;

    for (const sub of selected) {
      try {
        const res = await fetch(`/api/admin.php?action=delete_subscriber&key=${API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: sub.email })
        });
        const data = await res.json();
        if (!data.error) deleted++;
        else errors++;
      } catch {
        errors++;
      }
    }

    setSuccessMessage(`🗑️ Eliminados: ${deleted} suscriptores${errors > 0 ? ` (${errors} errores)` : ''}`);
    setBulkActionLoading(false);
    clearSelection();
    loadData();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  // Bulk extend trial
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleBulkExtendTrial = async (days: number) => {
    const selected = getSelectedSubscribers();
    if (selected.length === 0) return;

    if (!window.confirm(`¿Extender trial ${days} días a ${selected.length} suscriptores?`)) return;

    setBulkActionLoading(true);
    let extended = 0;
    let errors = 0;

    for (const sub of selected) {
      try {
        const newEnd = new Date(sub.subscription_end || new Date());
        newEnd.setDate(newEnd.getDate() + days);
        
        const res = await fetch(`/api/admin.php?action=update_subscriber&key=${API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email: sub.email,
            subscription_end: newEnd.toISOString().split('T')[0],
            status: 'trial'
          })
        });
        const data = await res.json();
        if (!data.error) extended++;
        else errors++;
      } catch {
        errors++;
      }
    }

    setSuccessMessage(`⏳ Trial extendido a ${extended} suscriptores${errors > 0 ? ` (${errors} errores)` : ''}`);
    setBulkActionLoading(false);
    clearSelection();
    loadData();
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  // Bulk remove access (set as expired)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleBulkRemoveAccess = async () => {
    const selected = getSelectedSubscribers();
    if (selected.length === 0) return;

    if (!window.confirm(`¿Quitar acceso a ${selected.length} suscriptores? (Sus trials se marcarán como expirados)`)) return;

    setBulkActionLoading(true);
    let removed = 0;
    let errors = 0;

    for (const sub of selected) {
      try {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        const res = await fetch(`/api/admin.php?action=update_subscriber&key=${API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email: sub.email,
            subscription_end: yesterday.toISOString().split('T')[0],
            status: 'trial'
          })
        });
        const data = await res.json();
        if (!data.error) removed++;
        else errors++;
      } catch {
        errors++;
      }
    }

    setSuccessMessage(`🚫 Acceso removido a ${removed} suscriptores${errors > 0 ? ` (${errors} errores)` : ''}`);
    setBulkActionLoading(false);
    clearSelection();
    loadData();
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  // Bulk set access type
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleBulkSetAccessType = async (accessType: 'premium_invited' | 'premium_paid' | 'trial_card' | 'trial_free') => {
    const selected = getSelectedSubscribers();
    if (selected.length === 0) return;

    const typeLabels = {
      'premium_invited': '💎 Premium Invitado',
      'premium_paid': '💳 Premium Pago',
      'trial_card': '💳 Trial con Tarjeta',
      'trial_free': '⏳ Trial sin Tarjeta'
    };

    if (!window.confirm(`¿Cambiar ${selected.length} suscriptores a ${typeLabels[accessType]}?`)) return;

    setBulkActionLoading(true);
    let updated = 0;
    let errors = 0;

    for (const sub of selected) {
      try {
        let status = 'active';
        let paymentType = 'invited';
        let subscriptionEnd = '';

        if (accessType === 'premium_invited') {
          status = 'active';
          paymentType = 'invited';
          subscriptionEnd = ''; // Sin fecha de fin
        } else if (accessType === 'premium_paid') {
          status = 'active';
          paymentType = 'oneinfinite';
          // Mantener fecha actual o poner 1 mes
          const end = new Date();
          end.setDate(end.getDate() + 30);
          subscriptionEnd = end.toISOString().split('T')[0];
        } else if (accessType === 'trial_card') {
          status = 'trial';
          paymentType = 'oneinfinite';
          const end = new Date();
          end.setDate(end.getDate() + 7);
          subscriptionEnd = end.toISOString().split('T')[0];
        } else if (accessType === 'trial_free') {
          status = 'trial';
          paymentType = 'trial_free';
          const end = new Date();
          end.setDate(end.getDate() + 7);
          subscriptionEnd = end.toISOString().split('T')[0];
        }

        const res = await fetch(`/api/admin.php?action=update_subscriber&key=${API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email: sub.email,
            status,
            payment_type: paymentType,
            subscription_end: subscriptionEnd || null
          })
        });
        const data = await res.json();
        if (!data.error) updated++;
        else errors++;
      } catch {
        errors++;
      }
    }

    setSuccessMessage(`✅ ${updated} suscriptores actualizados a ${typeLabels[accessType]}${errors > 0 ? ` (${errors} errores)` : ''}`);
    setBulkActionLoading(false);
    clearSelection();
    loadData();
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Cargar estadísticas
      const statsRes = await fetch(`/api/admin.php?action=stats&key=${API_KEY}`);
      if (!statsRes.ok) throw new Error('Failed to load stats');
      const statsData = await statsRes.json();
      setStats(statsData);

      // Cargar suscriptores
      const subsRes = await fetch(`/api/admin.php?action=subscribers&key=${API_KEY}`);
      if (!subsRes.ok) throw new Error('Failed to load subscribers');
      const subsData = await subsRes.json();
      setSubscribers(subsData.subscribers || []);
      setSubscriberCounts({
        total: subsData.total || 0,
        active: subsData.active || 0,
        paid: subsData.paid || 0,
        invited: subsData.invited || 0,
        external: subsData.external || 0,
        trials_active: subsData.trials_active || 0,
        trials_expired: subsData.trials_expired || 0,
        trials_oneinfinite_active: subsData.trials_oneinfinite_active || 0,
        trials_manual_active: subsData.trials_manual_active || 0,
        trials_oneinfinite_expired: subsData.trials_oneinfinite_expired || 0,
        trials_manual_expired: subsData.trials_manual_expired || 0,
        paid_oneinfinite: subsData.paid_oneinfinite || 0,
        paid_gumroad: subsData.paid_gumroad || 0,
        trials_gumroad: subsData.trials_gumroad || 0
      });

      // Cargar actividad
      const actRes = await fetch(`/api/admin.php?action=activity&key=${API_KEY}`);
      if (!actRes.ok) throw new Error('Failed to load activity');
      const actData = await actRes.json();
      setActivity(actData || []);

      // Cargar usuarios
      const usersRes = await fetch(`/api/admin.php?action=users&key=${API_KEY}`);
      if (!usersRes.ok) throw new Error('Failed to load users');
      const usersData = await usersRes.json();
      setUsers(usersData.users || []);

      // Cargar progreso de usuarios (desde admin.php para obtener todos)
      const progressRes = await fetch(`/api/admin.php?action=user_progress&key=${API_KEY}`);
      if (progressRes.ok) {
        const progressData = await progressRes.json();
        setUserProgress(progressData.users || []);
      }

      // Cargar estudiantes de bootcamp
      const bootcampRes = await fetch(`/api/admin.php?action=bootcamp_students&key=${API_KEY}`);
      if (bootcampRes.ok) {
        const bootcampData = await bootcampRes.json();
        setBootcampStudents(bootcampData.students || []);
      }

      // Cargar estadísticas de referidos
      const referralsRes = await fetch(`/api/admin.php?action=referrals&key=${API_KEY}`);
      if (referralsRes.ok) {
        const referralsData = await referralsRes.json();
        setReferralStats(referralsData);
      }

      // Cargar métricas de retención y conversión
      loadRetentionMetrics();

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading data');
    } finally {
      setLoading(false);
    }
  };

  // Cargar métricas de retención y conversión
  const loadRetentionMetrics = async () => {
    setLoadingMetrics(true);
    setError(null);
    try {
      // Cargar nuevas métricas de analytics completas
      const analyticsRes = await fetch(`/api/analytics-metrics.php?admin_password=***REMOVED***`);
      if (analyticsRes.ok) {
        const analyticsData = await analyticsRes.json();
        if (!analyticsData.error) {
          setAnalyticsMetrics(analyticsData);
        }
      }
      
      // Cargar métricas de retención (legacy)
      const res = await fetch(`/api/retention-metrics.php?admin_password=***REMOVED***`);
      if (res.ok) {
        const data = await res.json();
        if (data.error) {
          console.error('Metrics API error:', data);
        } else {
          setRetentionMetrics(data);
        }
      }
      
      // Cargar métricas de conversión (Nivel 0)
      const convRes = await fetch(`/api/conversion-metrics.php`);
      if (convRes.ok) {
        const convData = await convRes.json();
        if (convData.success) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          setConversionMetrics(convData);
        }
      }
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Error loading metrics:', err);
    } finally {
      setLoadingMetrics(false);
    }
  };

  // Cargar timeline de actividad
  const loadActivityTimeline = async () => {
    setLoadingTimeline(true);
    try {
      const res = await fetch(`/api/admin.php?action=activity_timeline&key=${API_KEY}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setActivityTimeline(data);
        }
      }
    } catch (err) {
      console.error('Error loading activity timeline:', err);
    } finally {
      setLoadingTimeline(false);
    }
  };

  // Cargar timeline cuando se selecciona la tab
  useEffect(() => {
    if (activeTab === 'timeline' && !activityTimeline) {
      loadActivityTimeline();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // Verificar clave de acceso manual
  const handleAccessKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Check if key matches any admin's dynamic key
    const isValidKey = ADMIN_EMAILS.some(email => generateAdminKey(email) === accessKey);
    if (isValidKey) {
      setAccessGranted(true);
      // Agregar key a la URL para persistir
      window.history.replaceState({}, '', `/admin?key=${accessKey}`);
    } else {
      setError('Clave de acceso incorrecta');
    }
  };

  // Mostrar formulario de acceso si no es admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="bg-slate-900 rounded-xl p-8 border border-slate-800 max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <Shield className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-slate-400">Ingresá tu clave de acceso</p>
          </div>
          
          <form onSubmit={handleAccessKeySubmit} className="space-y-4">
            <input
              type="password"
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              placeholder="Clave de acceso..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
            />
            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Acceder
            </button>
          </form>
          
          <div className="mt-6 pt-6 border-t border-slate-800 text-center">
            <p className="text-slate-500 text-sm">
              {user ? `Logueado como: ${user.email}` : 'O iniciá sesión con tu cuenta de admin'}
            </p>
            {!user && (
              <a href="/auth" className="text-purple-400 hover:text-purple-300 text-sm mt-2 inline-block">
                Iniciar sesión →
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateStr: string) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleString('es-AR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_registered': return <Users className="w-4 h-4 text-blue-400" />;
      case 'subscription_created': return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      case 'subscription_cancelled': return <XCircle className="w-4 h-4 text-red-400" />;
      default: return <Activity className="w-4 h-4 text-slate-400" />;
    }
  };

  const getActivityLabel = (type: string) => {
    switch (type) {
      case 'user_registered': return 'Se registró';
      case 'subscription_created': return 'Se suscribió';
      case 'subscription_cancelled': return 'Canceló suscripción';
      default: return type;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 max-w-md w-full">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-emerald-400" />
              Agregar Usuario Manual
            </h2>
            <p className="text-slate-400 text-sm mb-4">
              Para usuarios que pagan por fuera de OneInfinite
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Nombre</label>
                <input
                  type="text"
                  value={newSubscriber.name}
                  onChange={(e) => setNewSubscriber({ ...newSubscriber, name: e.target.value })}
                  placeholder="Juan Pérez"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Email *</label>
                <input
                  type="email"
                  value={newSubscriber.email}
                  onChange={(e) => setNewSubscriber({ ...newSubscriber, email: e.target.value })}
                  placeholder="email@ejemplo.com"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500"
                  required
                />
              </div>
              
              {/* Access Type Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Tipo de Acceso *</label>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewSubscriber({ ...newSubscriber, access_type: 'subscription' })}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      newSubscriber.access_type === 'subscription'
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <div className="font-medium">💎 Solo Suscripción</div>
                    <div className="text-xs opacity-80">Academia Premium (roadmaps, proyectos, datasets)</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewSubscriber({ ...newSubscriber, access_type: 'bootcamp' })}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      newSubscriber.access_type === 'bootcamp'
                        ? 'bg-orange-500/20 border-orange-500/50 text-orange-400'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <div className="font-medium">🚀 Solo Bootcamp</div>
                    <div className="text-xs opacity-80">8 semanas + proyecto final</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewSubscriber({ ...newSubscriber, access_type: 'both' })}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      newSubscriber.access_type === 'both'
                        ? 'bg-purple-500/20 border-purple-500/50 text-purple-400'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <div className="font-medium">⭐ Ambos</div>
                    <div className="text-xs opacity-80">Acceso completo a todo</div>
                  </button>
                </div>
              </div>
              
              {/* Período de Suscripción - Solo para suscripción o ambos */}
              {(newSubscriber.access_type === 'subscription' || newSubscriber.access_type === 'both') && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Período de Suscripción</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { months: 1, label: '1 Mes', price: '$30' },
                      { months: 6, label: '6 Meses', price: '$150' },
                      { months: 12, label: '12 Meses', price: '$240' }
                    ].map(({ months, label, price }) => (
                      <button
                        key={months}
                        type="button"
                        onClick={() => setNewSubscriber({ ...newSubscriber, subscription_months: months as 1 | 6 | 12 })}
                        className={`p-3 rounded-lg border text-center transition-all ${
                          newSubscriber.subscription_months === months
                            ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                        }`}
                      >
                        <div className="font-medium">{label}</div>
                        <div className="text-xs opacity-80">{price}</div>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    El acceso expirará el {new Date(Date.now() + newSubscriber.subscription_months * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('es-AR')}
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={addSubscriber}
                disabled={addingSubscriber || !newSubscriber.email}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {addingSubscriber ? (
                  <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Agregando...</>
                ) : (
                  <><UserPlus className="w-4 h-4" /> Agregar</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Trial Invitation Modal */}
      {showTrialModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 max-w-md w-full">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              {trialUser?.is_trial ? '✏️ Editar Trial' : trialUser ? '🎁 Enviar Trial Gratuito' : '🎁 Enviar Trial Masivo'}
            </h2>
            
            {trialUser ? (
              <p className="text-slate-400 text-sm mb-4">
                {trialUser.is_trial ? (
                  <>Editando trial de <span className="text-amber-400 font-medium">{trialUser.email}</span> (actualmente {trialUser.trial_days_left} días restantes)</>
                ) : (
                  <>Enviar invitación a <span className="text-emerald-400 font-medium">{trialUser.email}</span></>
                )}
              </p>
            ) : (
              <p className="text-slate-400 text-sm mb-4">
                Enviar invitación a <span className="text-pink-400 font-medium">{users.filter(u => !u.subscribed && u.email_verified !== false).length} usuarios</span> sin suscripción
              </p>
            )}
            
            <div className="bg-slate-800/50 rounded-lg p-4 mb-4 border border-slate-700">
              <p className="text-slate-300 text-sm mb-3">
                📧 El email incluirá:
              </p>
              <ul className="text-slate-400 text-sm space-y-1">
                <li>• Mensaje personalizado de bienvenida</li>
                <li>• Explicación de qué incluye la academia</li>
                <li>• Link directo a la plataforma</li>
                <li>• Fecha de expiración del trial</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              {/* Tipo de Trial */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Tipo de Trial</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setTrialOptions({ ...trialOptions, trialType: 'manual' })}
                    className={`p-3 rounded-lg text-sm font-medium transition-colors border ${
                      trialOptions.trialType === 'manual'
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    <div className="text-lg mb-1">🎁</div>
                    <div>Manual</div>
                    <div className="text-xs opacity-70">Sin tarjeta</div>
                  </button>
                  <button
                    onClick={() => setTrialOptions({ ...trialOptions, trialType: 'gumroad' })}
                    className={`p-3 rounded-lg text-sm font-medium transition-colors border ${
                      trialOptions.trialType === 'gumroad' || trialOptions.trialType === 'oneinfinite'
                        ? 'bg-pink-500/20 border-pink-500 text-pink-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    <div className="text-lg mb-1">🛒</div>
                    <div>Gumroad</div>
                    <div className="text-xs opacity-70">Con tarjeta (se cobra al día 7)</div>
                  </button>
                </div>
              </div>

              {/* Duración */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Duración del Trial</label>
                <div className="grid grid-cols-6 gap-2">
                  {[1, 3, 5, 7, 14, 30].map((days) => (
                    <button
                      key={days}
                      onClick={() => setTrialOptions({ ...trialOptions, days })}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        trialOptions.days === days
                          ? 'bg-pink-500 text-white'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      {days} días
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="grantAccess"
                  checked={trialOptions.grantAccess}
                  onChange={(e) => setTrialOptions({ ...trialOptions, grantAccess: e.target.checked })}
                  className="w-4 h-4 rounded bg-slate-800 border-slate-600 text-pink-500 focus:ring-pink-500"
                />
                <label htmlFor="grantAccess" className="text-slate-300 text-sm">
                  Dar acceso inmediato (se desactiva automáticamente al vencer)
                </label>
              </div>
            </div>
            
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mt-4">
              <p className="text-amber-400 text-sm">
                ⚠️ {trialUser ? 'El usuario' : 'Los usuarios'} tendrán acceso hasta el{' '}
                <strong>{new Date(Date.now() + trialOptions.days * 24 * 60 * 60 * 1000).toLocaleDateString('es-AR')}</strong>
              </p>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowTrialModal(false);
                  setTrialUser(null);
                }}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={trialUser ? handleSendTrialInvitation : handleSendBulkTrialInvitations}
                disabled={sendingTrial}
                className={`flex-1 ${trialUser?.is_trial ? 'bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/50' : 'bg-pink-500 hover:bg-pink-600 disabled:bg-pink-500/50'} text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2`}
              >
                {sendingTrial ? (
                  <><RefreshCw className="w-4 h-4 animate-spin" /> {trialUser?.is_trial ? 'Actualizando...' : 'Enviando...'}</>
                ) : (
                  trialUser?.is_trial ? (
                    <><Clock className="w-4 h-4" /> Actualizar a {trialOptions.days} días</>
                  ) : (
                    <><Mail className="w-4 h-4" /> {trialUser ? 'Enviar Invitación' : `Enviar a ${users.filter(u => !u.subscribed && u.email_verified !== false).length} usuarios`}</>
                  )
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Subscriber Modal */}
      {showEditSubscriberModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              ✏️ Editar Suscripción
            </h2>
            
            <div className="mb-4 p-3 bg-slate-800 rounded-lg">
              <span className="text-slate-400 text-sm">Usuario:</span>
              <span className="text-white font-medium ml-2">{editingUserEmail}</span>
            </div>

            <div className="space-y-4">
              {/* Payment Type */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Tipo de Pago / Acceso
                </label>
                <select
                  value={editSubscriberForm.payment_type}
                  onChange={(e) => setEditSubscriberForm({...editSubscriberForm, payment_type: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                >
                  <option value="gumroad">💳 Gumroad (pago mensual)</option>
                  <option value="invited_permanent">🎁 Invitado Permanente</option>
                  <option value="invited_temporary">⏳ Invitado Temporal</option>
                  <option value="invited">🎁 Invitado (legacy)</option>
                  <option value="trial_with_card">💳 Trial con tarjeta</option>
                  <option value="trial_no_card">🆓 Trial sin tarjeta</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Estado de Suscripción
                </label>
                <select
                  value={editSubscriberForm.status}
                  onChange={(e) => setEditSubscriberForm({...editSubscriberForm, status: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                >
                  <option value="active">✅ Activo</option>
                  <option value="trial">⏳ Trial</option>
                  <option value="cancelled">❌ Cancelado</option>
                  <option value="expired">💀 Expirado</option>
                </select>
              </div>

              {/* Subscription End Date */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Fecha de Vencimiento
                </label>
                <input
                  type="date"
                  value={editSubscriberForm.subscription_end}
                  onChange={(e) => setEditSubscriberForm({...editSubscriberForm, subscription_end: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setEditSubscriberForm({...editSubscriberForm, subscription_end: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0]})}
                    className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs hover:bg-slate-600"
                  >
                    +30 días
                  </button>
                  <button
                    onClick={() => setEditSubscriberForm({...editSubscriberForm, subscription_end: new Date(Date.now() + 90*24*60*60*1000).toISOString().split('T')[0]})}
                    className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs hover:bg-slate-600"
                  >
                    +90 días
                  </button>
                  <button
                    onClick={() => setEditSubscriberForm({...editSubscriberForm, subscription_end: new Date(Date.now() + 365*24*60*60*1000).toISOString().split('T')[0]})}
                    className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs hover:bg-slate-600"
                  >
                    +1 año
                  </button>
                  <button
                    onClick={() => setEditSubscriberForm({...editSubscriberForm, subscription_end: '2030-01-01'})}
                    className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs hover:bg-emerald-500/30"
                  >
                    Permanente
                  </button>
                </div>
              </div>

              {/* Secondary Email */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Secundario (para vincular pago de otro email)
                </label>
                <input
                  type="email"
                  value={editSubscriberForm.secondary_email}
                  onChange={(e) => setEditSubscriberForm({...editSubscriberForm, secondary_email: e.target.value})}
                  placeholder="Ej: email-de-gumroad@gmail.com"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                />
                <p className="text-slate-500 text-xs mt-1">
                  Útil cuando el usuario pagó con un email diferente al de la plataforma
                </p>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Notas (opcional)
                </label>
                <textarea
                  value={editSubscriberForm.notes}
                  onChange={(e) => setEditSubscriberForm({...editSubscriberForm, notes: e.target.value})}
                  placeholder="Ej: Migrado de OneInfinite, extendido por problema técnico..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white h-20 resize-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowEditSubscriberModal(false);
                  setEditingUserEmail('');
                }}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={async () => {
                  try {
                    // Find subscriber ID (may not exist yet)
                    const sub = subscribers.find(s => s.email.toLowerCase() === editingUserEmail.toLowerCase());
                    
                    // Call update API - will create subscriber if not exists
                    const res = await fetch(`/api/admin.php?action=update_subscriber_full&key=${API_KEY}`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        subscriber_id: sub?.id || null,
                        email: editingUserEmail,
                        payment_type: editSubscriberForm.payment_type,
                        status: editSubscriberForm.status,
                        subscription_end: editSubscriberForm.subscription_end,
                        secondary_email: editSubscriberForm.secondary_email || null,
                        notes: editSubscriberForm.notes
                      })
                    });
                    
                    const data = await res.json();
                    if (data.error) throw new Error(data.error);
                    
                    setSuccessMessage(data.message || `✅ Suscripción actualizada para ${editingUserEmail}`);
                    setShowEditSubscriberModal(false);
                    setEditingUserEmail('');
                    loadData();
                    setTimeout(() => setSuccessMessage(null), 5000);
                  } catch (err) {
                    setError(err instanceof Error ? err.message : 'Error al actualizar');
                  }
                }}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                💾 Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-slate-900/50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-purple-500" />
              <div>
                <h1 className="text-xl font-bold text-white">Admin Panel</h1>
                <p className="text-slate-400 text-sm hidden sm:block">{user?.email || 'Admin Access'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              {/* Ver como suscriptor */}
              <Link
                to="/members"
                className="flex items-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 px-3 py-2 rounded-lg transition-colors border border-emerald-500/30 text-sm whitespace-nowrap"
              >
                <Play className="w-4 h-4" />
                <span className="hidden sm:inline">Academia</span>
              </Link>
              
              {/* Ver bootcamp */}
              <Link
                to="/bootcamp-platform"
                className="flex items-center gap-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 px-3 py-2 rounded-lg transition-colors border border-orange-500/30 text-sm whitespace-nowrap"
              >
                <Play className="w-4 h-4" />
                <span className="hidden sm:inline">Bootcamp</span>
              </Link>
              
              {/* Agregar suscriptor */}
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 px-3 py-2 rounded-lg transition-colors border border-purple-500/30 text-sm whitespace-nowrap"
              >
                <UserPlus className="w-4 h-4" />
                <span className="hidden sm:inline">Agregar</span>
              </button>
              
              {/* Actualizar */}
              <button
                onClick={loadData}
                disabled={loading}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-3 py-2 rounded-lg transition-colors text-sm whitespace-nowrap"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Actualizar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex gap-2 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'timeline', label: '🔴 En Vivo', icon: Activity },
            { id: 'users', label: '👥 Usuarios', icon: Users },
            { id: 'bootcamps', label: '🎓 Bootcamps', icon: Target },
            { id: 'progress', label: '📈 Progreso', icon: Activity },
            { id: 'metrics', label: '📊 Métricas', icon: TrendingUp },
            { id: 'referrals', label: '🎁 Referidos', icon: Gift },
            { id: 'suggestions', label: '💡 Sugerencias', icon: MessageCircle },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : 'bg-slate-800/50 text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {successMessage && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <pre className="text-emerald-400 whitespace-pre-wrap font-sans text-sm">{successMessage}</pre>
            </div>
            {successMessage.includes('CREDENCIALES') && (
              <button 
                onClick={() => navigator.clipboard.writeText(successMessage)}
                className="mt-3 text-xs bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 px-3 py-1 rounded transition-colors"
              >
                📋 Copiar todo
              </button>
            )}
          </div>
        )}
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <span className="text-red-400">{error}</span>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === 'overview' && stats && (
              <div className="space-y-6">
                {/* 💰 REVENUE PROJECTION - Main Focus */}
                <div className="bg-gradient-to-br from-emerald-900/30 to-slate-900 rounded-2xl p-6 border border-emerald-500/30">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    💰 Proyección de Ingresos Mensuales
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* MRR Actual - Todos los usuarios activos × $22 */}
                    <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                      <div className="text-slate-400 text-sm mb-1">MRR Actual (Pagos)</div>
                      {(() => {
                        const totalPaid = (subscriberCounts.paid_gumroad || 0) + (subscriberCounts.paid_oneinfinite || 0);
                        const invited = subscriberCounts.invited || 0;
                        const mrr = totalPaid * 22;
                        return (
                          <>
                            <div className="text-4xl font-bold text-emerald-400">
                              ${mrr.toFixed(0)}
                            </div>
                            <div className="text-slate-500 text-xs mt-2 space-y-1">
                              <div className="text-emerald-400">• {totalPaid} suscriptores activos × $22 = ${mrr.toFixed(0)}</div>
                              <div className="text-purple-400">• {invited} invitados (gratis)</div>
                            </div>
                          </>
                        );
                      })()}
                    </div>

                    {/* Potencial si Trials Convierten - $22 por trial */}
                    <div className="bg-slate-800/50 rounded-xl p-5 border border-amber-500/30">
                      <div className="text-slate-400 text-sm mb-1">Si Trials Convierten</div>
                      {(() => {
                        const activeTrials = subscribers.filter(s => s.is_trial && !s.is_expired);
                        const totalPotential = activeTrials.length * 22;
                        
                        return (
                          <>
                            <div className="text-4xl font-bold text-amber-400">
                              +${totalPotential.toFixed(0)}
                            </div>
                            <div className="text-slate-500 text-xs mt-2 space-y-1">
                              <div className="text-emerald-400">• {activeTrials.length} trials activos × $22 = ${totalPotential.toFixed(0)}</div>
                              <div className="text-red-400">• {subscriberCounts.trials_expired || 0} trials expirados</div>
                            </div>
                          </>
                        );
                      })()}
                    </div>

                    {/* MRR Potencial Total */}
                    <div className="bg-gradient-to-br from-purple-500/20 to-purple-900/20 rounded-xl p-5 border border-purple-500/50">
                      <div className="text-slate-400 text-sm mb-1">MRR Potencial Total</div>
                      {(() => {
                        const totalPaid = (subscriberCounts.paid_gumroad || 0) + (subscriberCounts.paid_oneinfinite || 0);
                        const activeTrials = subscribers.filter(s => s.is_trial && !s.is_expired).length;
                        
                        const mrrActual = totalPaid * 22;
                        const mrrPotencial = (totalPaid + activeTrials) * 22;
                        
                        return (
                          <>
                            <div className="text-4xl font-bold text-purple-400">
                              ${mrrPotencial.toFixed(0)}
                            </div>
                            <div className="text-slate-500 text-xs mt-2">
                              <div className="text-emerald-400 font-medium">Si todos los trials convierten</div>
                              <div className="mt-1">({totalPaid} pagos + {activeTrials} trials) × $22</div>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30">
                    <div className="text-emerald-400 text-xs uppercase mb-1">Pagos Activos</div>
                    <div className="text-3xl font-bold text-emerald-400">{(subscriberCounts.paid_gumroad || 0) + (subscriberCounts.paid_oneinfinite || 0)}</div>
                  </div>
                  <div className="bg-cyan-500/10 rounded-xl p-4 border border-cyan-500/30">
                    <div className="text-cyan-400 text-xs uppercase mb-1">🔄 OneInfinite</div>
                    <div className="text-3xl font-bold text-cyan-400">{subscriberCounts.paid_oneinfinite || 0}</div>
                    <div className="text-cyan-400/60 text-xs">Migrar 1/Ene</div>
                  </div>
                  <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30">
                    <div className="text-amber-400 text-xs uppercase mb-1">Trials Activos</div>
                    <div className="text-3xl font-bold text-amber-400">{subscriberCounts.trials_active || 0}</div>
                  </div>
                  <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30">
                    <div className="text-purple-400 text-xs uppercase mb-1">Invitados</div>
                    <div className="text-3xl font-bold text-purple-400">{subscriberCounts.invited || 0}</div>
                  </div>
                  <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                    <div className="text-red-400 text-xs uppercase mb-1">Expirados</div>
                    <div className="text-3xl font-bold text-red-400">{subscriberCounts.trials_expired || 0}</div>
                  </div>
                  <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30">
                    <div className="text-blue-400 text-xs uppercase mb-1">Registrados</div>
                    <div className="text-3xl font-bold text-blue-400">{stats.total_users}</div>
                  </div>
                </div>

                {/* 🔍 ACCESS VERIFICATION - Health Check */}
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    🔍 Verificación de Accesos
                    <span className="text-slate-500 text-sm font-normal ml-2">(detectar inconsistencias)</span>
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Problemas Potenciales */}
                    <div className="space-y-3">
                      <div className="text-slate-400 text-sm font-medium mb-2">⚠️ Posibles Problemas</div>
                      
                      {/* Trials expirados con acceso */}
                      {users.filter(u => u.had_trial && !u.is_trial && u.subscribed && !subscribers.some(s => s.email === u.email && s.status === 'active')).length > 0 && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-red-400 font-medium">
                                {users.filter(u => u.had_trial && !u.is_trial && u.subscribed && !subscribers.some(s => s.email === u.email && s.status === 'active')).length} con trial expirado pero acceso activo
                              </span>
                              <div className="text-slate-500 text-xs mt-1">Deberían pagar o perder acceso</div>
                            </div>
                            <button 
                              onClick={() => {
                                setUserAccessFilter('expired_trial_with_access');
                                setActiveTab('users');
                              }}
                              className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded hover:bg-red-500/30"
                            >
                              Ver →
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Pagaron pero sin acceso */}
                      {subscribers.filter(s => s.status === 'active' && s.payment_type !== 'invited' && !users.some(u => u.email === s.email && u.subscribed)).length > 0 && (
                        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-amber-400 font-medium">
                                {subscribers.filter(s => s.status === 'active' && s.payment_type !== 'invited' && !users.some(u => u.email === s.email && u.subscribed)).length} pagaron pero sin acceso en Users
                              </span>
                              <div className="text-slate-500 text-xs mt-1">Necesitan activar acceso</div>
                    </div>
                            <button
                              onClick={() => {
                                setUserAccessFilter('with_access');
                                setActiveTab('users');
                              }}
                              className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded hover:bg-amber-500/30"
                            >
                              Ver →
                            </button>
                          </div>
                        </div>
                      )}

                      {/* OneInfinite Migration Alert */}
                      {(subscriberCounts.paid_oneinfinite > 0 || subscribers.filter(s => s.is_oneinfinite || s.payment_type === 'oneinfinite').length > 0) && (
                        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-cyan-400 font-medium flex items-center gap-2">
                                🔄 {subscriberCounts.paid_oneinfinite || subscribers.filter(s => s.is_oneinfinite || s.payment_type === 'oneinfinite').length} de OneInfinite
                              </span>
                              <div className="text-slate-500 text-xs mt-1">Vencen 1 de Enero → Migrar a Gumroad</div>
                    </div>
                            <button
                              onClick={() => {
                                setUserAccessFilter('oneinfinite');
                                setActiveTab('users');
                              }}
                              className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded hover:bg-cyan-500/30"
                            >
                              Ver →
                            </button>
                  </div>
                        </div>
                      )}

                      {/* Sin problemas detectados */}
                      {users.filter(u => u.had_trial && !u.is_trial && u.subscribed && !subscribers.some(s => s.email === u.email && s.status === 'active')).length === 0 &&
                       subscribers.filter(s => s.status === 'active' && s.payment_type !== 'invited' && !users.some(u => u.email === s.email && u.subscribed)).length === 0 && (
                        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
                          <span className="text-emerald-400">✅ No se detectaron inconsistencias</span>
                    </div>
                      )}
                    </div>

                    {/* Resumen de Estados */}
                    <div className="space-y-3">
                      <div className="text-slate-400 text-sm font-medium mb-2">📊 Desglose de Usuarios</div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center py-1 border-b border-slate-700">
                          <span className="text-slate-300">Suscripción activa (pagaron)</span>
                          <span className="text-emerald-400 font-bold">{users.filter(u => u.subscribed && !u.is_trial).length}</span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-b border-slate-700">
                          <span className="text-slate-300">En período de trial</span>
                          <span className="text-amber-400 font-bold">{users.filter(u => u.is_trial).length}</span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-b border-slate-700">
                          <span className="text-slate-300">Trial expirado (no pagaron)</span>
                          <span className="text-red-400 font-bold">{users.filter(u => u.had_trial && !u.is_trial && !u.subscribed).length}</span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-b border-slate-700">
                          <span className="text-slate-300">Solo bootcamp</span>
                          <span className="text-orange-400 font-bold">{users.filter(u => u.bootcamp_access && !u.subscribed && !u.is_trial).length}</span>
                        </div>
                        <div className="flex justify-between items-center py-1">
                          <span className="text-slate-300">Sin ningún acceso</span>
                          <span className="text-slate-500 font-bold">{users.filter(u => !u.subscribed && !u.is_trial && !u.bootcamp_access).length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bootcamp Summary */}
                <div className="bg-gradient-to-br from-orange-500/10 to-slate-900 rounded-xl p-5 border border-orange-500/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-slate-400 text-sm">🎓 Bootcamps</div>
                      <div className="text-2xl font-bold text-orange-400">{bootcampStudents.length} estudiantes</div>
                    </div>
                    <div className="text-right">
                      <div className="text-slate-400 text-sm">Cobrado</div>
                      <div className="text-2xl font-bold text-emerald-400">
                        ${bootcampStudents.reduce((s, b) => s + (parseFloat(String(b.amount_paid)) || 0), 0).toFixed(0)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Secondary Stats */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-slate-400">Este Mes</span>
                      <Calendar className="w-4 h-4 text-slate-500" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Nuevos suscriptores</span>
                        <span className="text-emerald-400 font-bold">+{stats.subscribers_this_month}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Cancelaciones</span>
                        <span className="text-red-400 font-bold">-{stats.cancellations_this_month}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Nuevos usuarios (7d)</span>
                        <span className="text-blue-400 font-bold">+{stats.new_users_7days}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 md:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-slate-400">Suscriptores por Mes</span>
                      <BarChart3 className="w-4 h-4 text-slate-500" />
                    </div>
                    <div className="flex items-end gap-2 h-32">
                      {stats.subscribers_by_month.slice(0, 6).reverse().map((item, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center">
                          <div 
                            className="w-full bg-purple-500/50 rounded-t"
                            style={{ height: `${Math.max(10, (item.count / Math.max(...stats.subscribers_by_month.map(m => m.count))) * 100)}%` }}
                          />
                          <span className="text-xs text-slate-500 mt-2">{item.month.split('-')[1]}</span>
                          <span className="text-xs text-slate-400">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Actividad Reciente</h3>
                    <Activity className="w-4 h-4 text-slate-500" />
                  </div>
                  <div className="space-y-3">
                    {activity.slice(0, 10).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 py-2 border-b border-slate-700 last:border-0">
                        {getActivityIcon(item.type)}
                        <div className="flex-1">
                          <span className="text-white">{item.name || item.email}</span>
                          <span className="text-slate-500 mx-2">·</span>
                          <span className="text-slate-400">{getActivityLabel(item.type)}</span>
                        </div>
                        <span className="text-slate-500 text-sm">{formatDateTime(item.timestamp)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Timeline Tab - Actividad en Vivo */}
            {activeTab === 'timeline' && (
              <div className="space-y-6">
                {loadingTimeline ? (
                  <div className="flex items-center justify-center py-12">
                    <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin" />
                  </div>
                ) : activityTimeline ? (
                  <>
                    {/* Stats de Actividad */}
                    {activityTimeline.stats?.note && (
                      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mb-4">
                        <p className="text-amber-400 text-sm flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          {activityTimeline.stats.note}
                          {activityTimeline.latest_activity && (
                            <span className="text-amber-300 font-medium">
                              (Última: {new Date(activityTimeline.latest_activity).toLocaleString('es-AR')})
                            </span>
                          )}
                        </p>
                      </div>
                    )}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div className={`rounded-xl p-4 border ${activityTimeline.stats?.active_now > 0 ? 'bg-red-500/10 border-red-500/30 animate-pulse' : 'bg-slate-800/50 border-slate-700'}`}>
                        <div className={`text-xs uppercase flex items-center gap-2 ${activityTimeline.stats?.active_now > 0 ? 'text-red-400' : 'text-slate-400'}`}>
                          {activityTimeline.stats?.active_now > 0 && <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>}
                          Ahora mismo
                        </div>
                        <div className={`text-3xl font-bold ${activityTimeline.stats?.active_now > 0 ? 'text-red-400' : 'text-slate-500'}`}>
                          {activityTimeline.stats?.active_now || 0}
                        </div>
                      </div>
                      <div className={`rounded-xl p-4 border ${activityTimeline.stats?.active_last_hour > 0 ? 'bg-amber-500/10 border-amber-500/30' : 'bg-slate-800/50 border-slate-700'}`}>
                        <div className={`text-xs uppercase ${activityTimeline.stats?.active_last_hour > 0 ? 'text-amber-400' : 'text-slate-400'}`}>Última hora</div>
                        <div className={`text-3xl font-bold ${activityTimeline.stats?.active_last_hour > 0 ? 'text-amber-400' : 'text-slate-500'}`}>
                          {activityTimeline.stats?.active_last_hour || 0}
                        </div>
                      </div>
                      <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30">
                        <div className="text-emerald-400 text-xs uppercase">
                          {activityTimeline.stats?.active_on_latest_day ? 'Último día' : 'Últ. 24h'}
                        </div>
                        <div className="text-3xl font-bold text-emerald-400">
                          {activityTimeline.stats?.active_on_latest_day || activityTimeline.stats?.active_24h || activityTimeline.stats?.active_today || 0}
                        </div>
                      </div>
                      <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30">
                        <div className="text-blue-400 text-xs uppercase">Nuevos hoy</div>
                        <div className="text-3xl font-bold text-blue-400">{activityTimeline.stats?.new_users_today || 0}</div>
                      </div>
                      <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30">
                        <div className="text-purple-400 text-xs uppercase">Subs hoy</div>
                        <div className="text-3xl font-bold text-purple-400">{activityTimeline.stats?.new_subs_today || 0}</div>
                      </div>
                    </div>

                    {/* Actividad por hora */}
                    {activityTimeline.by_hour?.length > 0 && (
                      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                          <Clock className="w-5 h-5 text-amber-400" />
                          Actividad por Hora 
                          {activityTimeline.hourly_date && (
                            <span className="text-sm font-normal text-slate-400">
                              ({activityTimeline.hourly_date === new Date().toISOString().split('T')[0] 
                                ? 'Hoy' 
                                : new Date(activityTimeline.hourly_date + 'T12:00:00').toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric', month: 'short' })
                              })
                            </span>
                          )}
                          {activityTimeline.showing_most_recent_day && (
                            <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded-full ml-2">
                              Último día con datos
                            </span>
                          )}
                        </h3>
                        <div className="flex gap-2 flex-wrap">
                          {(() => {
                            const isToday = activityTimeline.hourly_date === new Date().toISOString().split('T')[0];
                            const currentHour = new Date().getHours();
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            const maxHourToShow = isToday ? currentHour : 23;
                            
                            return Array.from({ length: 24 }, (_, i) => {
                              const hourData = activityTimeline.by_hour.find((h: any) => parseInt(h.hour) === i);
                              const users = parseInt(hourData?.users) || 0;
                              const maxUsers = Math.max(...activityTimeline.by_hour.map((h: any) => parseInt(h.users) || 0), 1);
                              const height = users > 0 ? Math.max(20, (users / maxUsers) * 100) : 10;
                              const isFutureHour = isToday && i > currentHour;
                              
                              return (
                                <div key={i} className={`flex flex-col items-center ${isFutureHour ? 'opacity-30' : ''}`}>
                                  <div 
                                    className={`w-6 rounded-t transition-all ${
                                      isToday && i === currentHour ? 'bg-red-500' :
                                      users > 0 ? 'bg-emerald-500' : 'bg-slate-700'
                                    }`}
                                    style={{ height: `${height}px` }}
                                    title={`${i}:00 - ${users} usuarios`}
                                  />
                                  <span className={`text-xs mt-1 ${isToday && i === currentHour ? 'text-red-400 font-bold' : 'text-slate-500'}`}>
                                    {i}
                                  </span>
                                </div>
                              );
                            });
                          })()}
                        </div>
                      </div>
                    )}

                    {/* Actividad últimos 7 días */}
                    {activityTimeline.by_day?.length > 0 && (
                      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-blue-400" />
                          Últimos 7 Días
                        </h3>
                        <div className="space-y-2">
                          {activityTimeline.by_day.map((day: any) => {
                            const maxUsers = Math.max(...activityTimeline.by_day.map((d: any) => parseInt(d.users) || 0), 1);
                            const width = (parseInt(day.users) / maxUsers) * 100;
                            const isToday = day.date === new Date().toISOString().split('T')[0];
                            return (
                              <div key={day.date} className="flex items-center gap-4">
                                <div className={`w-20 text-sm ${isToday ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}>
                                  {isToday ? 'Hoy' : new Date(day.date).toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric' })}
                                </div>
                                <div className="flex-1 h-6 bg-slate-700 rounded-lg overflow-hidden">
                                  <div 
                                    className={`h-full ${isToday ? 'bg-emerald-500' : 'bg-blue-500'} transition-all`}
                                    style={{ width: `${width}%` }}
                                  />
                                </div>
                                <div className="w-16 text-right text-white font-medium">{day.users} users</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Actividad reciente en tiempo real */}
                    <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                          <Activity className="w-5 h-5 text-red-400" />
                          Actividad Reciente (24h)
                        </h3>
                        <button 
                          onClick={loadActivityTimeline}
                          className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-1"
                        >
                          <RefreshCw className="w-4 h-4" /> Actualizar
                        </button>
                      </div>
                      <div className="space-y-2 max-h-[400px] overflow-y-auto">
                        {activityTimeline.recent_activity?.map((user: any, idx: number) => (
                          <div key={idx} className={`p-3 rounded-lg ${
                            user.minutes_ago < 15 ? 'bg-emerald-500/10 border border-emerald-500/30' :
                            user.minutes_ago < 60 ? 'bg-amber-500/10 border border-amber-500/30' :
                            'bg-slate-900/50 border border-slate-700'
                          }`}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${
                                  user.minutes_ago < 15 ? 'bg-emerald-500 animate-pulse' :
                                  user.minutes_ago < 60 ? 'bg-amber-500' : 'bg-slate-500'
                                }`} />
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-white font-medium">{user.name}</span>
                                    {user.is_subscriber && (
                                      <span className="px-1.5 py-0.5 bg-cyan-500/20 text-cyan-400 text-xs rounded">
                                        {user.subscription_status === 'trial' ? 'Trial' : 'Premium'}
                                      </span>
                                    )}
                                    {!user.is_subscriber && (
                                      <span className="px-1.5 py-0.5 bg-slate-600/50 text-slate-400 text-xs rounded">
                                        Free
                                      </span>
                                    )}
                                    {user.current_streak > 0 && (
                                      <span className="text-orange-400 text-xs">{user.current_streak}🔥</span>
                                    )}
                                  </div>
                                  <div className="text-slate-400 text-xs">{user.email}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-amber-400 font-bold">{user.xp} XP</div>
                                <div className={`text-xs ${
                                  user.minutes_ago < 15 ? 'text-emerald-400' :
                                  user.minutes_ago < 60 ? 'text-amber-400' : 'text-slate-500'
                                }`}>
                                  {user.minutes_ago < 60 
                                    ? `hace ${user.minutes_ago} min` 
                                    : `hace ${Math.floor(user.minutes_ago / 60)}h`}
                                </div>
                              </div>
                            </div>
                            
                            {/* Quick Conversion Actions for Free Users */}
                            {!user.is_subscriber && user.minutes_ago < 60 && (
                              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-700/50">
                                <span className="text-xs text-pink-400 mr-1">🎯 Convertir:</span>
                                <button
                                  onClick={async () => {
                                    if (!window.confirm(`¿Dar 3 días de trial a ${user.email}?`)) return;
                                    try {
                                      const res = await fetch(`/api/admin.php?action=send_trial_invitation&key=${API_KEY}`, {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ email: user.email, grant_access: true, days: 3 })
                                      });
                                      const data = await res.json();
                                      if (data.success) {
                                        setSuccessMessage(`🎁 Trial 3d enviado a ${user.email}`);
                                        loadActivityTimeline();
                                      } else {
                                        setError(data.error || 'Error al enviar trial');
                                      }
                                    } catch { setError('Error de conexión'); }
                                    setTimeout(() => { setSuccessMessage(null); setError(null); }, 5000);
                                  }}
                                  className="px-2 py-0.5 bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 rounded text-xs transition-colors"
                                  title="Trial corto para probar - alto engagement"
                                >
                                  🎁 3d Trial
                                </button>
                                <button
                                  onClick={async () => {
                                    if (!window.confirm(`¿Dar 7 días de trial a ${user.email}?`)) return;
                                    try {
                                      const res = await fetch(`/api/admin.php?action=send_trial_invitation&key=${API_KEY}`, {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ email: user.email, grant_access: true, days: 7 })
                                      });
                                      const data = await res.json();
                                      if (data.success) {
                                        setSuccessMessage(`🎁 Trial 7d enviado a ${user.email}`);
                                        loadActivityTimeline();
                                      } else {
                                        setError(data.error || 'Error al enviar trial');
                                      }
                                    } catch { setError('Error de conexión'); }
                                    setTimeout(() => { setSuccessMessage(null); setError(null); }, 5000);
                                  }}
                                  className="px-2 py-0.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded text-xs transition-colors"
                                  title="Trial estándar - buena conversión"
                                >
                                  🎁 7d Trial
                                </button>
                                <button
                                  onClick={async () => {
                                    const msg = window.prompt(
                                      `Mensaje personalizado para ${user.name || user.email}:`,
                                      `¡Hola ${user.name?.split(' ')[0] || ''}! Vi que estás practicando en la academia 🚀 ¿Te gustaría desbloquear todo el contenido premium? Por solo $30/mes tenés acceso completo a roadmaps, ejercicios, proyectos y comunidad.`
                                    );
                                    if (!msg) return;
                                    try {
                                      const res = await fetch(`/api/admin.php?action=send_engagement_email&key=${API_KEY}`, {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ email: user.email, message: msg, subject: '¡Tengo algo para vos! 🎁' })
                                      });
                                      const data = await res.json();
                                      if (data.success) {
                                        setSuccessMessage(`📧 Email enviado a ${user.email}`);
                                      } else {
                                        setError(data.error || 'Error al enviar email');
                                      }
                                    } catch { setError('Error de conexión'); }
                                    setTimeout(() => { setSuccessMessage(null); setError(null); }, 5000);
                                  }}
                                  className="px-2 py-0.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded text-xs transition-colors"
                                  title="Enviar email personalizado"
                                >
                                  📧 Email
                                </button>
                                <button
                                  onClick={async () => {
                                    if (!window.confirm(`⚠️ ¿Eliminar TODOS los datos de ${user.email}?\n\nEsto borrará:\n- Progreso (XP, streak, etc)\n- Usuario (si existe)\n- Suscripción (si existe)`)) return;
                                    try {
                                      const res = await fetch(`/api/admin.php?action=delete_user_data&key=${API_KEY}`, {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ email: user.email })
                                      });
                                      const data = await res.json();
                                      if (data.success) {
                                        setSuccessMessage(`🗑️ ${data.message}`);
                                        loadActivityTimeline();
                                        loadData();
                                      } else {
                                        setError(data.error || 'Error al eliminar');
                                      }
                                    } catch { setError('Error de conexión'); }
                                    setTimeout(() => { setSuccessMessage(null); setError(null); }, 5000);
                                  }}
                                  className="px-2 py-0.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded text-xs transition-colors"
                                  title="Eliminar usuario sospechoso"
                                >
                                  🗑️
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                        {(!activityTimeline.recent_activity || activityTimeline.recent_activity.length === 0) && (
                          <div className="text-center py-8 text-slate-400">
                            No hay actividad en las últimas 24 horas
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-center text-slate-500 text-sm">
                      Última actualización: {activityTimeline.generated_at}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <Activity className="w-12 h-12 mx-auto mb-4 text-slate-600" />
                    <p className="text-slate-400">No se pudo cargar la actividad</p>
                    <button 
                      onClick={loadActivityTimeline}
                      className="mt-4 px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30"
                    >
                      Reintentar
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Bootcamps Tab */}
            {activeTab === 'bootcamps' && (
              <BootcampsTab
                bootcampStudents={bootcampStudents}
                bootcampFeedbacks={bootcampFeedbacks}
                loadingFeedbacks={loadingFeedbacks}
                showAddBootcampModal={showAddBootcampModal}
                showFeedbackModal={showFeedbackModal}
                newBootcampStudent={newBootcampStudent}
                editingBootcampStudent={editingBootcampStudent}
                feedbackForm={feedbackForm}
                setShowAddBootcampModal={setShowAddBootcampModal}
                setShowFeedbackModal={setShowFeedbackModal}
                setNewBootcampStudent={setNewBootcampStudent}
                setEditingBootcampStudent={setEditingBootcampStudent}
                setFeedbackForm={setFeedbackForm}
                handleAddBootcampStudent={handleAddBootcampStudent}
                handleUpdateBootcampStudent={() => { if (editingBootcampStudent) handleUpdateBootcampStudent(editingBootcampStudent); }}
                handleDeleteBootcampStudent={handleDeleteBootcampStudent}
                handleToggleDelivery={handleToggleDelivery}
                handleCreateFeedback={handleCreateFeedback}
                handleDeleteFeedback={handleDeleteFeedback}
              />
            )}

            {activeTab === 'activity' && (
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">Toda la Actividad</h3>
                  <div className="text-slate-400 text-sm">
                    {activity.length} eventos
                  </div>
                </div>
                {activity.length === 0 ? (
                  <div className="text-center py-12 text-slate-400">
                    No hay actividad registrada aún.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activity.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-4 bg-slate-900/50 rounded-lg">
                        <div className="p-2 bg-slate-800 rounded-lg">
                          {getActivityIcon(item.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">{item.name || 'Usuario'}</span>
                            <span className="text-slate-500">·</span>
                            <span className="text-slate-400">{getActivityLabel(item.type)}</span>
                          </div>
                          <div className="text-slate-500 text-sm">{item.email}</div>
                        </div>
                        <div className="text-slate-500 text-sm">
                          {formatDateTime(item.timestamp)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">👥 Gestión de Usuarios</h3>
                    <p className="text-slate-400 text-sm">
                      <span className="text-white font-medium">{users.length}</span> usuarios • 
                      <span className="text-emerald-400"> {users.filter(u => u.subscribed).length}</span> con acceso • 
                      <span className="text-purple-400"> {users.filter(u => u.is_trial).length}</span> trial • 
                      <span className="text-orange-400"> {users.filter(u => u.bootcamp_access).length}</span> bootcamp
                    </p>
                    <p className="text-slate-500 text-xs mt-1">Gestiona accesos desde aquí. Los cambios actualizan el acceso real.</p>
                  </div>
                  <button
                    onClick={() => {
                      setTrialUser(null);
                      setShowTrialModal(true);
                    }}
                    disabled={sendingTrial}
                    className="flex items-center gap-2 bg-pink-600 hover:bg-pink-500 disabled:bg-pink-600/50 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    {sendingTrial ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Mail className="w-4 h-4" />
                    )}
                    Enviar Trial Masivo
                  </button>
                </div>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                  <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                    <div className="text-2xl font-bold text-white">{users.length}</div>
                    <div className="text-slate-500 text-xs">Total</div>
                  </div>
                  <div className="bg-emerald-500/10 rounded-lg p-3 border border-emerald-500/30">
                    <div className="text-2xl font-bold text-emerald-400">{users.filter(u => u.subscribed).length}</div>
                    <div className="text-emerald-400/70 text-xs">Con Acceso</div>
                  </div>
                  <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/30">
                    <div className="text-2xl font-bold text-purple-400">{users.filter(u => u.is_trial).length}</div>
                    <div className="text-purple-400/70 text-xs">En Trial</div>
                  </div>
                  <div className="bg-orange-500/10 rounded-lg p-3 border border-orange-500/30">
                    <div className="text-2xl font-bold text-orange-400">{users.filter(u => u.bootcamp_access).length}</div>
                    <div className="text-orange-400/70 text-xs">Bootcamp</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
                    <div className="text-2xl font-bold text-slate-400">{users.filter(u => !u.subscribed && !u.is_trial && !u.bootcamp_access).length}</div>
                    <div className="text-slate-500 text-xs">Sin Acceso</div>
                  </div>
                </div>
                
                {/* Search & Filters */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Buscar por email o nombre..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <select
                    value={userAccessFilter}
                    onChange={(e) => setUserAccessFilter(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"
                  >
                    <option value="all">Todos ({users.length})</option>
                    <option value="with_access">✅ Con acceso ({users.filter(u => u.subscribed).length})</option>
                    <option value="paid">💳 Pagaron ({users.filter(u => u.subscribed && !u.is_trial).length})</option>
                    <option value="oneinfinite">🔄 OneInfinite ({subscribers.filter(s => s.is_oneinfinite || s.payment_type === 'oneinfinite').length})</option>
                    <option value="trial">⏳ En trial ({users.filter(u => u.is_trial).length})</option>
                    <option value="invited">🎁 Invitados ({users.filter(u => u.subscribed && subscribers.some(s => s.email === u.email && s.payment_type === 'invited')).length})</option>
                    <option value="bootcamp">🎓 Bootcamp ({users.filter(u => u.bootcamp_access).length})</option>
                    <option value="expired_trial">💀 Trial expirado ({users.filter(u => u.had_trial && !u.is_trial && !u.subscribed).length})</option>
                    <option value="expired_trial_with_access">🚨 Trial exp. CON acceso ({users.filter(u => u.had_trial && !u.is_trial && u.subscribed && !subscribers.some(s => s.email === u.email && s.status === 'active')).length})</option>
                    <option value="no_access">❌ Sin acceso ({users.filter(u => !u.subscribed && !u.is_trial && !u.bootcamp_access).length})</option>
                    <option value="has_discord">💬 Con Discord ({users.filter(u => subscribers.some(s => s.email === u.email && s.discord_username)).length})</option>
                    <option value="no_discord">🔇 Sin Discord ({users.filter(u => !subscribers.some(s => s.email === u.email && s.discord_username)).length})</option>
                  </select>
                </div>

                {/* Users Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-slate-400 text-sm border-b border-slate-700">
                        <th className="pb-3 font-medium">Usuario</th>
                        <th className="pb-3 font-medium">Accesos</th>
                        <th className="pb-3 font-medium">Discord</th>
                        <th className="pb-3 font-medium">Proveedor</th>
                        <th className="pb-3 font-medium">Logins</th>
                        <th className="pb-3 font-medium">Registrado</th>
                        <th className="pb-3 font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {users
                        .filter(u => {
                          // Search filter
                          const matchesSearch = u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (u.name && u.name.toLowerCase().includes(searchTerm.toLowerCase()));
                          
                          // Access filter
                          let matchesAccess = true;
                          if (userAccessFilter === 'with_access') {
                            matchesAccess = u.subscribed === true;
                          } else if (userAccessFilter === 'paid') {
                            matchesAccess = u.subscribed === true && !u.is_trial;
                          } else if (userAccessFilter === 'oneinfinite') {
                            matchesAccess = subscribers.some(s => s.email === u.email && (s.is_oneinfinite || s.payment_type === 'oneinfinite'));
                          } else if (userAccessFilter === 'trial') {
                            matchesAccess = u.is_trial === true;
                          } else if (userAccessFilter === 'invited') {
                            matchesAccess = u.subscribed && subscribers.some(s => s.email === u.email && s.payment_type === 'invited');
                          } else if (userAccessFilter === 'bootcamp') {
                            matchesAccess = u.bootcamp_access === true;
                          } else if (userAccessFilter === 'no_access') {
                            matchesAccess = !u.subscribed && !u.is_trial && !u.bootcamp_access;
                          } else if (userAccessFilter === 'expired_trial') {
                            matchesAccess = u.had_trial === true && !u.is_trial && !u.subscribed;
                          } else if (userAccessFilter === 'expired_trial_with_access') {
                            // Trial expirado pero todavía tiene acceso activo (deberían pagar)
                            matchesAccess = u.had_trial === true && !u.is_trial && u.subscribed && !subscribers.some(s => s.email === u.email && s.status === 'active');
                          } else if (userAccessFilter === 'has_discord') {
                            matchesAccess = subscribers.some(s => s.email === u.email && s.discord_username);
                          } else if (userAccessFilter === 'no_discord') {
                            matchesAccess = !subscribers.some(s => s.email === u.email && s.discord_username);
                          }
                          
                          return matchesSearch && matchesAccess;
                        })
                        .map((u) => (
                          <tr key={u.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                            <td className="py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
                                  {u.name ? u.name.charAt(0).toUpperCase() : u.email.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <div className="text-white font-medium">{u.name || 'Sin nombre'}</div>
                                  <div className="text-slate-400 text-xs">{u.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4">
                              <div className="flex flex-col gap-1">
                                {/* Estado actual */}
                                {u.is_trial ? (
                                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-purple-500/20 text-purple-400">
                                    ⏳ Trial activo ({u.trial_days_left}d)
                                  </span>
                                ) : u.subscribed ? (
                                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/20 text-emerald-400">
                                    ✓ Con acceso
                                  </span>
                                ) : u.had_trial ? (
                                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-red-500/20 text-red-400" title={u.trial_expired_at ? `Expiró: ${u.trial_expired_at}` : ''}>
                                    ❌ Trial expirado
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-700 text-slate-500">
                                    Sin acceso
                                  </span>
                                )}
                                {/* Bootcamp */}
                                {u.bootcamp_access && (
                                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-orange-500/20 text-orange-400">
                                    🎓 Bootcamp
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="py-4">
                              {/* Discord Status - Clickable to edit */}
                              {subscribers.find(s => s.email === u.email)?.discord_username ? (
                                <button
                                  onClick={() => {
                                    const newUsername = prompt(
                                      `Discord actual: @${subscribers.find(s => s.email === u.email)?.discord_username}\n\nNuevo username (vacío para desvincular):`,
                                      subscribers.find(s => s.email === u.email)?.discord_username || ''
                                    );
                                    if (newUsername !== null) {
                                      handleUpdateDiscord(u.email, newUsername.trim());
                                    }
                                  }}
                                  className="px-2 py-1 rounded text-xs font-medium bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-colors cursor-pointer"
                                  title={`@${subscribers.find(s => s.email === u.email)?.discord_username} - Click para editar`}
                                >
                                  💬 @{subscribers.find(s => s.email === u.email)?.discord_username?.substring(0, 10)}{(subscribers.find(s => s.email === u.email)?.discord_username?.length || 0) > 10 ? '...' : ''}
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    const username = prompt(`Vincular Discord para ${u.email}:\n\nIngresá el username de Discord:`);
                                    if (username && username.trim()) {
                                      handleUpdateDiscord(u.email, username.trim());
                                    }
                                  }}
                                  className="px-2 py-1 rounded text-xs font-medium bg-slate-700 text-slate-500 hover:bg-indigo-500/20 hover:text-indigo-400 transition-colors cursor-pointer"
                                  title="Click para vincular Discord"
                                >
                                  + Discord
                                </button>
                              )}
                            </td>
                            <td className="py-4">
                              <div className="flex flex-col gap-1">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  u.provider === 'google' 
                                    ? 'bg-blue-500/20 text-blue-400' 
                                    : 'bg-slate-500/20 text-slate-400'
                                }`}>
                                  {u.provider === 'google' ? '🔵 Google' : '📧 Email'}
                                </span>
                                {u.provider !== 'google' && !u.email_verified && (
                                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400">
                                    ⚠️ No verificado
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="py-4 text-slate-300">{u.login_count}</td>
                            <td className="py-4 text-slate-400">
                              {new Date(u.created_at).toLocaleDateString('es-AR', {
                                day: '2-digit',
                                month: 'short'
                              })}
                            </td>
                            <td className="py-4">
                              <div className="flex flex-wrap gap-1">
                                <button
                                  onClick={() => handleTogglePermission(u.id, u.email, 'subscribed', !u.subscribed)}
                                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                                    u.subscribed
                                      ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                                      : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                                  }`}
                                  title={u.subscribed ? 'Quitar acceso Academia' : 'Dar acceso Academia'}
                                >
                                  {u.subscribed ? '- Academia' : '+ Academia'}
                                </button>
                                <button
                                  onClick={() => handleTogglePermission(u.id, u.email, 'bootcamp_access', !u.bootcamp_access)}
                                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                                    u.bootcamp_access
                                      ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                                      : 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30'
                                  }`}
                                  title={u.bootcamp_access ? 'Quitar acceso Bootcamp' : 'Dar acceso Bootcamp'}
                                >
                                  {u.bootcamp_access ? '- Bootcamp' : '+ Bootcamp'}
                                </button>
                                {u.provider !== 'google' && !u.email_verified && (
                                  <button
                                    onClick={() => handleResendVerification(u.email)}
                                    className="px-2 py-1 rounded text-xs font-medium bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-colors"
                                    title="Reenviar email de verificación"
                                  >
                                    📧 Verificar
                                  </button>
                                )}
                                {!u.subscribed && (
                                  <button
                                    onClick={() => {
                                      setTrialUser(u);
                                      if (u.is_trial) {
                                        // Si ya tiene trial, preseleccionar los días restantes
                                        setTrialOptions({ ...trialOptions, days: u.trial_days_left || 7 });
                                      }
                                      setShowTrialModal(true);
                                    }}
                                    className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                                      u.is_trial 
                                        ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30' 
                                        : 'bg-pink-500/20 text-pink-400 hover:bg-pink-500/30'
                                    }`}
                                    title={u.is_trial ? 'Editar días de trial' : 'Enviar invitación de trial gratuito'}
                                  >
                                    {u.is_trial ? '✏️ Editar Trial' : '🎁 Trial'}
                                  </button>
                                )}
                                {/* Edit subscriber details button */}
                                <button
                                  onClick={() => {
                                    const sub = subscribers.find(s => s.email.toLowerCase() === u.email.toLowerCase());
                                    setEditingUserEmail(u.email);
                                    setEditSubscriberForm({
                                      payment_type: sub?.payment_type || 'gumroad',
                                      status: sub?.status || 'active',
                                      subscription_end: sub?.subscription_end ? sub.subscription_end.split('T')[0] : new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
                                      secondary_email: sub?.secondary_email || '',
                                      notes: sub?.notes || ''
                                    });
                                    setShowEditSubscriberModal(true);
                                  }}
                                  className="px-2 py-1 rounded text-xs font-medium bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                                  title="Editar suscripción (tipo, fechas, notas)"
                                >
                                  ✏️ Editar
                                </button>
                                <button
                                  onClick={() => handleDeleteUser(u.id, u.email, u.name)}
                                  className="px-2 py-1 rounded text-xs font-medium bg-slate-700 text-slate-400 hover:bg-red-500/30 hover:text-red-400 transition-colors"
                                  title="Eliminar usuario completamente"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  
                  {users.length === 0 && (
                    <div className="text-center py-8 text-slate-400">
                      No hay usuarios registrados aún.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Progress Tab */}
            {activeTab === 'progress' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                    <div className="text-slate-400 text-xs uppercase">Total</div>
                    <div className="text-2xl font-bold text-white">{userProgress.length}</div>
                  </div>
                  <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30">
                    <div className="text-emerald-400 text-xs uppercase">Activos</div>
                    <div className="text-2xl font-bold text-emerald-400">
                      {userProgress.filter(p => p.user_status === 'active').length}
                    </div>
                  </div>
                  <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30">
                    <div className="text-amber-400 text-xs uppercase">En Riesgo</div>
                    <div className="text-2xl font-bold text-amber-400">
                      {userProgress.filter(p => p.user_status === 'at_risk' || p.user_status === 'cooling').length}
                    </div>
                  </div>
                  <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                    <div className="text-red-400 text-xs uppercase">Inactivos 30d+</div>
                    <div className="text-2xl font-bold text-red-400">
                      {userProgress.filter(p => p.user_status === 'churned').length}
                    </div>
                  </div>
                  <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30">
                    <div className="text-purple-400 text-xs uppercase">Engagement Prom.</div>
                    <div className="text-2xl font-bold text-purple-400">
                      {userProgress.length > 0 ? Math.round(userProgress.reduce((a, b) => a + (b.engagement_score || 0), 0) / userProgress.length) : 0}%
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Métricas por Usuario</h3>
                    <p className="text-slate-400 text-sm">XP, Streak, Engagement y Estado</p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <input
                      type="text"
                      placeholder="Buscar email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="px-3 py-1.5 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm w-48"
                    />
                  </div>
                </div>

                {/* Filtros */}
                <div className="flex gap-2 mb-4 flex-wrap">
                  <button
                    onClick={() => setProgressFilter('all')}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      progressFilter === 'all' 
                        ? 'bg-purple-500 text-white' 
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    Todos ({userProgress.length})
                  </button>
                  <button
                    onClick={() => setProgressFilter('active')}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      progressFilter === 'active' 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    Activos ({userProgress.filter(p => p.user_status === 'active').length})
                  </button>
                  <button
                    onClick={() => setProgressFilter('subscribers')}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      progressFilter === 'subscribers' 
                        ? 'bg-cyan-500 text-white' 
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    Suscriptores ({userProgress.filter(p => p.is_subscriber).length})
                  </button>
                </div>

                {/* Progress Cards */}
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {userProgress.length === 0 ? (
                    <div className="text-center py-12 text-slate-400">
                      <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Aún no hay datos de progreso.</p>
                      <p className="text-sm mt-2">Los usuarios que usen la plataforma aparecerán aquí.</p>
                    </div>
                  ) : (
                    userProgress
                      .filter(p => {
                        // Filtro por búsqueda
                        const matchesSearch = p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (p.name && p.name.toLowerCase().includes(searchTerm.toLowerCase()));
                        
                        // Filtro por tipo
                        const matchesFilter = 
                          progressFilter === 'all' ? true :
                          progressFilter === 'active' ? p.user_status === 'active' :
                          progressFilter === 'subscribers' ? p.is_subscriber : true;
                        
                        return matchesSearch && matchesFilter;
                      })
                      .map((p, idx) => (
                        <div key={idx} className={`bg-slate-900/50 rounded-xl p-4 border ${
                          p.user_status === 'active' ? 'border-emerald-500/50' :
                          p.user_status === 'at_risk' ? 'border-amber-500/50' :
                          p.user_status === 'churned' ? 'border-red-500/50' : 'border-slate-700'
                        }`}>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                                p.is_subscriber 
                                  ? 'bg-gradient-to-br from-emerald-500 to-cyan-500' 
                                  : 'bg-gradient-to-br from-slate-600 to-slate-700'
                              }`}>
                                {(p.name || p.email).charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-white font-medium">{p.name || 'Sin nombre'}</span>
                                  {/* Status Badge */}
                                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                                    p.user_status === 'active' ? 'bg-emerald-500/20 text-emerald-400' :
                                    p.user_status === 'cooling' ? 'bg-blue-500/20 text-blue-400' :
                                    p.user_status === 'at_risk' ? 'bg-amber-500/20 text-amber-400' :
                                    p.user_status === 'churned' ? 'bg-red-500/20 text-red-400' :
                                    'bg-slate-700 text-slate-400'
                                  }`}>
                                    {p.user_status === 'active' ? '🟢 Activo' :
                                     p.user_status === 'cooling' ? '🔵 Enfriando' :
                                     p.user_status === 'at_risk' ? '🟡 En riesgo' :
                                     p.user_status === 'churned' ? '🔴 Inactivo' : '⚪ Nuevo'}
                                  </span>
                                  {p.is_subscriber && (
                                    <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-xs rounded-full">
                                      {p.subscription_status === 'trial' ? '🎁 Trial' : '💎 Premium'}
                                    </span>
                                  )}
                                </div>
                                <div className="text-slate-400 text-sm">{p.email}</div>
                              </div>
                            </div>
                            {/* Engagement Score */}
                            <div className="text-right">
                              <div className="text-slate-400 text-xs">Engagement</div>
                              <div className={`text-2xl font-bold ${
                                (p.engagement_score || 0) >= 70 ? 'text-emerald-400' :
                                (p.engagement_score || 0) >= 40 ? 'text-amber-400' : 'text-red-400'
                              }`}>
                                {p.engagement_score || 0}%
                              </div>
                            </div>
                          </div>

                          {/* Métricas principales */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                            <div className="bg-slate-800/50 rounded-lg p-2 text-center">
                              <div className="text-amber-400 font-bold text-lg">{p.xp || 0}</div>
                              <div className="text-slate-500 text-xs">XP Total</div>
                            </div>
                            <div className="bg-slate-800/50 rounded-lg p-2 text-center">
                              <div className="text-orange-400 font-bold text-lg">{p.current_streak || 0}🔥</div>
                              <div className="text-slate-500 text-xs">Streak</div>
                            </div>
                            <div className="bg-slate-800/50 rounded-lg p-2 text-center">
                              <div className="text-purple-400 font-bold text-lg">{p.login_count || 0}</div>
                              <div className="text-slate-500 text-xs">Logins</div>
                            </div>
                            <div className="bg-slate-800/50 rounded-lg p-2 text-center">
                              <div className="text-slate-300 font-bold text-lg">{p.days_inactive || 0}d</div>
                              <div className="text-slate-500 text-xs">Inactivo</div>
                            </div>
                          </div>

                          {/* Progress Bars */}
                          <div className="grid grid-cols-3 gap-3 mb-3">
                            <div>
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-emerald-400">Nv1</span>
                                <span className="text-white">{p.level_1_percent}%</span>
                              </div>
                              <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500" style={{ width: `${p.level_1_percent}%` }} />
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-blue-400">Nv2</span>
                                <span className="text-white">{p.level_2_percent}%</span>
                              </div>
                              <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500" style={{ width: `${p.level_2_percent}%` }} />
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-purple-400">Nv3</span>
                                <span className="text-white">{p.level_3_percent}%</span>
                              </div>
                              <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500" style={{ width: `${p.level_3_percent}%` }} />
                              </div>
                            </div>
                          </div>

                          {/* Stats row */}
                          <div className="flex items-center justify-between text-xs text-slate-400">
                            <div className="flex items-center gap-4">
                              <span>✅ {p.completed_steps || 0} pasos</span>
                              <span>🎯 {p.completed_projects || 0} proyectos</span>
                              <span>📺 {p.watched_videos || 0} videos</span>
                            </div>
                            <div>
                              {p.last_active ? `Última: ${new Date(p.last_active).toLocaleDateString('es-AR', {
                                day: '2-digit', month: 'short'
                              })}` : 'Sin actividad'}
                            </div>
                          </div>
                        </div>
                      ))
                  )}
                </div>

                {/* Discord CTA */}
                <div className="mt-6 p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-6 h-6 text-indigo-400" />
                    <div>
                      <div className="text-white font-medium">¿Usuarios con dudas?</div>
                      <div className="text-slate-400 text-sm">
                        Recordales que pueden preguntar en el canal de Discord: 
                        <a 
                          href="https://discord.gg/jfyqeAMpmk" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-indigo-400 hover:underline ml-1"
                        >
                          #dudas-premium
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            )}

            {/* Metrics Tab - Full Analytics Dashboard */}
            {activeTab === 'metrics' && (
              <MetricsTab 
                analyticsMetrics={analyticsMetrics}
                loadingMetrics={loadingMetrics}
                setSuccessMessage={setSuccessMessage}
                error={error}
                loadRetentionMetrics={loadRetentionMetrics}
              />
            )}

            {/* Referrals Tab */}
            {activeTab === 'referrals' && (
              <div className="space-y-6">
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <Gift className="w-6 h-6 text-purple-400" /> Sistema de Referidos
                    </h2>
                    <button
                      onClick={loadData}
                      className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors flex items-center gap-2"
                    >
                      <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                      Actualizar
                    </button>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-slate-900/50 rounded-xl p-4 border border-purple-500/30">
                      <div className="text-purple-400 text-sm mb-1">Total Referidos</div>
                      <div className="text-3xl font-bold text-white">{referralStats?.total_referrals || 0}</div>
                    </div>
                    <div className="bg-slate-900/50 rounded-xl p-4 border border-emerald-500/30">
                      <div className="text-emerald-400 text-sm mb-1">Trials por Referido</div>
                      <div className="text-3xl font-bold text-white">{referralStats?.referral_trials || 0}</div>
                    </div>
                    <div className="bg-slate-900/50 rounded-xl p-4 border border-amber-500/30">
                      <div className="text-amber-400 text-sm mb-1">Días Bonus Otorgados</div>
                      <div className="text-3xl font-bold text-white">{referralStats?.total_bonus_days || 0}</div>
                    </div>
                    <div className="bg-slate-900/50 rounded-xl p-4 border border-blue-500/30">
                      <div className="text-blue-400 text-sm mb-1">Top Referrers</div>
                      <div className="text-3xl font-bold text-white">{referralStats?.top_referrers?.length || 0}</div>
                    </div>
                  </div>

                  {/* Top Referrers */}
                  {referralStats?.top_referrers && referralStats.top_referrers.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-white mb-4">🏆 Top Referrers</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-slate-900/50">
                            <tr>
                              <th className="text-left text-slate-400 text-xs font-medium p-3">Email</th>
                              <th className="text-left text-slate-400 text-xs font-medium p-3">Código</th>
                              <th className="text-center text-slate-400 text-xs font-medium p-3">Referidos</th>
                              <th className="text-center text-slate-400 text-xs font-medium p-3">Días Bonus</th>
                              <th className="text-center text-slate-400 text-xs font-medium p-3">Desc. Bootcamp</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-700">
                            {referralStats.top_referrers.map((referrer, idx) => (
                              <tr key={idx} className="hover:bg-slate-800/50">
                                <td className="p-3 text-white text-sm">{referrer.email}</td>
                                <td className="p-3 text-purple-400 font-mono text-sm">{referrer.referral_code}</td>
                                <td className="p-3 text-center">
                                  <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm font-bold">
                                    {referrer.referral_count}
                                  </span>
                                </td>
                                <td className="p-3 text-center text-amber-400 text-sm">+{referrer.bonus_days}</td>
                                <td className="p-3 text-center text-blue-400 text-sm">
                                  {referrer.bootcamp_discount > 0 ? `${referrer.bootcamp_discount}%` : '-'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Recent Referrals */}
                  {referralStats?.recent_referrals && referralStats.recent_referrals.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">📋 Últimos Referidos</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-slate-900/50">
                            <tr>
                              <th className="text-left text-slate-400 text-xs font-medium p-3">Usuario Referido</th>
                              <th className="text-left text-slate-400 text-xs font-medium p-3">Referido Por</th>
                              <th className="text-center text-slate-400 text-xs font-medium p-3">Días Bonus</th>
                              <th className="text-center text-slate-400 text-xs font-medium p-3">Estado</th>
                              <th className="text-left text-slate-400 text-xs font-medium p-3">Fecha</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-700">
                            {referralStats.recent_referrals.map((referral, idx) => (
                              <tr key={idx} className="hover:bg-slate-800/50">
                                <td className="p-3 text-white text-sm">{referral.referred_email}</td>
                                <td className="p-3 text-purple-400 text-sm">
                                  {referral.referrer_email || referral.referral_code}
                                </td>
                                <td className="p-3 text-center text-amber-400 text-sm">+{referral.bonus_days}</td>
                                <td className="p-3 text-center">
                                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                                    referral.subscription_status === 'active' 
                                      ? 'bg-emerald-500/20 text-emerald-400' 
                                      : referral.subscription_status === 'trial'
                                        ? 'bg-blue-500/20 text-blue-400'
                                        : 'bg-slate-700 text-slate-400'
                                  }`}>
                                    {referral.subscription_status || 'free'}
                                  </span>
                                </td>
                                <td className="p-3 text-slate-400 text-sm">
                                  {new Date(referral.created_at).toLocaleDateString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Empty State */}
                  {(!referralStats?.top_referrers?.length && !referralStats?.recent_referrals?.length) && (
                    <div className="text-center py-12">
                      <Gift className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">No hay referidos aún</h3>
                      <p className="text-slate-400">
                        Cuando los usuarios empiecen a referir amigos, aparecerán aquí.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Suggestions Tab - Dataset Suggestions */}
            {activeTab === 'suggestions' && (
              <div className="space-y-6">
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      💡 Sugerencias de Datasets
                    </h2>
                    <button
                      onClick={async () => {
                        try {
                          const res = await fetch('/api/dataset-suggestions.php?action=list');
                          const data = await res.json();
                          if (data.success) {
                            setDatasetSuggestions(data.suggestions || []);
                          }
                        } catch (err) {
                          console.error('Error loading suggestions:', err);
                        }
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-lg text-emerald-400 transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Actualizar
                    </button>
                  </div>

                  {datasetSuggestions.length === 0 ? (
                    <div className="text-center py-12">
                      <MessageCircle className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-400 mb-4">No hay sugerencias todavía.</p>
                      <button
                        onClick={async () => {
                          try {
                            const res = await fetch('/api/dataset-suggestions.php?action=list');
                            const data = await res.json();
                            if (data.success) {
                              setDatasetSuggestions(data.suggestions || []);
                            }
                          } catch (err) {
                            console.error('Error loading suggestions:', err);
                          }
                        }}
                        className="text-emerald-400 hover:underline"
                      >
                        Cargar sugerencias
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {datasetSuggestions.map((sug, idx) => (
                        <div 
                          key={sug.id} 
                          className={`p-4 rounded-xl border ${
                            idx === 0 
                              ? 'bg-amber-500/10 border-amber-500/30' 
                              : 'bg-slate-700/50 border-slate-600'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                {idx === 0 && <span className="text-amber-400">🏆</span>}
                                <span className="text-white font-medium text-lg">{sug.suggestion}</span>
                              </div>
                              <div className="text-sm text-slate-400">
                                Sugerido por: <span className="text-slate-300">{sug.created_by}</span>
                              </div>
                              <div className="text-xs text-slate-500 mt-1">
                                {new Date(sug.created_at).toLocaleDateString('es-AR', {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className={`text-2xl font-bold ${idx === 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                                {sug.votes}
                              </div>
                              <div className="text-xs text-slate-500">votos</div>
                            </div>
                          </div>
                          
                          {sug.voters && sug.voters.length > 0 && (
                            <details className="mt-3">
                              <summary className="text-xs text-slate-500 cursor-pointer hover:text-slate-300">
                                Ver {sug.voters.length} votantes
                              </summary>
                              <div className="mt-2 flex flex-wrap gap-1">
                                {sug.voters.map((voter: string) => (
                                  <span 
                                    key={voter}
                                    className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-400"
                                  >
                                    {voter}
                                  </span>
                                ))}
                              </div>
                            </details>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;
// Admin Types - Shared across admin components

export interface AdminUser {
  email: string;
  name?: string;
}

export interface Stats {
  active_subscribers: number;
  total_users: number;
  subscribers_this_month: number;
  cancellations_this_month: number;
  estimated_mrr: number;
  new_users_7days: number;
  conversion_rate: number;
  subscribers_by_month: { month: string; count: number }[];
  active_trials: number;
  expired_trials: number;
  total_with_access: number;
}

export interface Subscriber {
  id: number;
  email: string;
  secondary_email?: string;
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
    | 'invited_permanent'   // Invitado permanente (premium)
    | 'invited_temporary'   // Invitado temporal (premium)
    | 'trial_with_card'     // Trial sin carteles (premium)
    | 'trial_no_card'       // Trial con carteles de pago
    | 'gumroad'             // Pago via Gumroad
    | 'oneinfinite'         // OneInfinite (hasta 1 enero)
    | 'free'                // Free user
    | 'paid'                // Pago directo
    | 'external'            // Pago externo
    // Legacy
    | 'invited' | 'trial_free' | 'trial_manual';
  notes?: string;
  is_oneinfinite: boolean;
  oneinfinite_subscription_id?: string;
  is_trial?: boolean;
  is_expired?: boolean;
  has_access?: boolean;
  effective_status?: string;
  days_left?: number;
  is_oneinfinite_trial?: boolean;
  is_manual_trial?: boolean;
  trial_type?: 'oneinfinite' | 'manual' | null;
  trial_type_label?: string;
  trial_ends_at?: string;
  trial_ends_at_formatted?: string;
  plan_type?: string;
}

export interface ActivityItem {
  type: string;
  email: string;
  name: string;
  timestamp: string;
}

export interface RegisteredUser {
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
  had_trial?: boolean;
  trial_expired_at?: string;
  had_subscription?: boolean;
}

export interface UserProgressData {
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

export interface BootcampStudent {
  id: number;
  email: string;
  name: string;
  edition: number;
  amount_paid: number;
  amount_total: number;
  payment_status: 'paid' | 'partial' | 'pending' | 'invited';
  has_platform_access: boolean;
  deliveries: boolean[];
  notes?: string;
  created_at: string;
  updated_at: string;
}

export const ADMIN_EMAILS = ['iansauradata@gmail.com', 'info@iansaura.com'];

export const generateAdminKey = (email: string): string => {
  const today = new Date().toISOString().split('T')[0];
  const base = `${email}_${today}_iansaura_admin_2024`;
  let hash = 0;
  for (let i = 0; i < base.length; i++) {
    const char = base.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return `adm_${Math.abs(hash).toString(36)}_${today.replace(/-/g, '')}`;
};

// Simple Markdown to HTML parser for feedback preview
export function renderFeedbackMarkdown(text: string): string {
  if (!text) return '<p class="text-slate-500 italic">Escribí algo para ver la preview...</p>';
  
  let html = text;
  
  // Escape HTML first
  html = html.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  
  // Headers
  html = html.replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold text-emerald-400 mt-4 mb-2">$1</h3>');
  html = html.replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold text-emerald-400 mt-4 mb-2">$1</h2>');
  html = html.replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold text-emerald-400 mt-4 mb-2">$1</h1>');
  
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>');
  
  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  
  // Code blocks
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="bg-slate-900 p-3 rounded-lg my-2 overflow-x-auto"><code class="text-emerald-300 text-sm">$2</code></pre>');
  
  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-slate-800 px-1.5 py-0.5 rounded text-emerald-300 text-sm">$1</code>');
  
  // Lists
  html = html.replace(/^- (.*$)/gm, '<li class="ml-4 text-slate-300">• $1</li>');
  html = html.replace(/^\d+\. (.*$)/gm, '<li class="ml-4 text-slate-300">$1</li>');
  
  // Paragraphs
  html = html.replace(/\n\n/g, '</p><p class="text-slate-300 my-2">');
  html = '<p class="text-slate-300 my-2">' + html + '</p>';
  
  // Line breaks
  html = html.replace(/\n/g, '<br>');
  
  return html;
}


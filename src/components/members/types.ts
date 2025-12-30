// Types for Members components
import { useUserProgress } from '../../hooks/useUserProgress';

export type TabType = 'dashboard' | 'roadmap' | 'proyectos' | 'datasets' | 'grabaciones' | 'tienda' | 'practica' | 'especializaciones' | 'interviews';

export interface TabProps {
  progress: ReturnType<typeof useUserProgress>;
}

export interface DashboardTabProps extends TabProps {
  setActiveTab: (tab: TabType) => void;
  userName: string;
  userEmail: string;
  onShowBadge: (level: number, type: '50' | '100') => void;
}

export interface RoadmapTabProps extends TabProps {
  userName: string;
  setActiveTab: (tab: TabType) => void;
  onShowBadge: (level: number, type: '50' | '100') => void;
}

export interface VideosTabProps extends TabProps {}

export interface PracticaTabProps extends TabProps {}

// XP System constants
export const XP_PER_STEP = 10;
export const XP_PER_PROJECT = 50;
export const XP_PER_VIDEO = 5;
export const XP_PER_REFLECTION = 5;




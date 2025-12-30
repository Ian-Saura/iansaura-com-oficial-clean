import React from 'react';
import { Tabs } from '../ui/Tabs';
import { Bootcamp } from '../../types/bootcamp';
import BootcampDetail from './BootcampDetail';

interface BootcampTabsProps {
  bootcamps: Bootcamp[];
  initialId?: string;
  onOpenWaitlist?: (plan: string) => void;
}

export default function BootcampTabs({ bootcamps, initialId, onOpenWaitlist }: BootcampTabsProps) {
  const getTabLabel = (bootcamp: Bootcamp) => {
    if (bootcamp.slug === 'de-8-semanas') {
      return (
        <span className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-sm shadow-sm">
            1
          </span>
          <span className="font-semibold">Bootcamp Fundamentos</span>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-orange-500 to-red-500 text-white animate-pulse">
            🔥 EARLY BIRD
          </span>
        </span>
      );
    }
    if (bootcamp.slug === 'de-nivel-2-intermedio') {
      return (
        <span className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 text-white font-bold text-sm shadow-sm">
            2
          </span>
          <span className="font-semibold">Bootcamp Nivel 2 · Próximamente</span>
        </span>
      );
    }
    return bootcamp.title;
  };

  const tabItems: Array<{
    id: string;
    label: React.ReactNode;
    panel: React.ReactNode;
  }> = bootcamps.map(bootcamp => ({
    id: bootcamp.slug,
    label: getTabLabel(bootcamp),
    panel: <BootcampDetail bootcamp={bootcamp} onOpenWaitlist={onOpenWaitlist} />
  }));

  return (
    <Tabs 
      items={tabItems} 
      initialId={initialId}
      className="w-full"
    />
  );
}

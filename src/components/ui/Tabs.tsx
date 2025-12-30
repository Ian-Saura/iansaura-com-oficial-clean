import React, { useEffect, useId, useRef, useState } from 'react';

interface TabItem {
  id: string;
  label: React.ReactNode;
  panel: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  initialId?: string;
  className?: string;
}

export function Tabs({ items, initialId, className }: TabsProps) {
  const [activeId, setActiveId] = useState<string | undefined>(initialId || items[0]?.id);
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabsLabelId = useId();

  useEffect(() => {
    if (!items.find(i => i.id === activeId) && items[0]) {
      setActiveId(items[0].id);
    }
  }, [items, activeId]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!activeId) return;
    const currentIndex = items.findIndex(i => i.id === activeId);
    if (currentIndex === -1) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setActiveId(items[(currentIndex + 1) % items.length].id);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setActiveId(items[(currentIndex - 1 + items.length) % items.length].id);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActiveId(items[0].id);
    } else if (e.key === 'End') {
      e.preventDefault();
      setActiveId(items[items.length - 1].id);
    }
  };

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        aria-label={tabsLabelId}
        ref={tabsRef}
        className="sticky top-14 z-40 bg-white/95 backdrop-blur border-2 border-gray-300 rounded-2xl p-3 flex gap-4 overflow-x-auto shadow-xl"
        onKeyDown={onKeyDown}
      >
        {items.map(item => (
          <button
            key={item.id}
            role="tab"
            aria-selected={activeId === item.id}
            aria-controls={`panel-${item.id}`}
            id={`tab-${item.id}`}
            type="button"
            onClick={() => setActiveId(item.id)}
            className={`whitespace-nowrap px-8 py-4 rounded-xl text-lg font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 min-w-fit ${
              activeId === item.id
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-110 border-2 border-blue-400'
                : 'bg-white text-gray-800 hover:bg-gray-50 hover:shadow-md border-2 border-gray-300 hover:border-blue-300 hover:text-blue-700'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {items.map(item => (
        <div
          key={item.id}
          role="tabpanel"
          id={`panel-${item.id}`}
          aria-labelledby={`tab-${item.id}`}
          hidden={activeId !== item.id}
          className="mt-8"
        >
          {item.panel}
        </div>
      ))}
    </div>
  );
}

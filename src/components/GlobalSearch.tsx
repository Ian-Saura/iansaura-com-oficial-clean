import React from 'react';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: any) => void;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose, onNavigate }) => {
  if (!isOpen) return null;
  return null; // Placeholder component
};

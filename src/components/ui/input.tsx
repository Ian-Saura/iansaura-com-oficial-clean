import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
  // Base classes that can be overridden
  const baseClasses = 'flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
  
  // Note: Default classes are applied conditionally below
  
  // If className contains background, text color, or border overrides, don't include defaults
  const hasCustomBg = className.includes('bg-');
  const hasCustomText = className.includes('text-');
  const hasCustomBorder = className.includes('border-');
  const hasCustomPlaceholder = className.includes('placeholder:');
  const hasCustomFocus = className.includes('focus-visible:ring-');
  
  let finalClasses = baseClasses;
  
  if (!hasCustomBg) finalClasses += ' bg-white';
  if (!hasCustomText) finalClasses += ' text-gray-900';
  if (!hasCustomBorder) finalClasses += ' border-gray-300';
  if (!hasCustomPlaceholder) finalClasses += ' placeholder:text-gray-500';
  if (!hasCustomFocus) finalClasses += ' focus-visible:ring-blue-500';
  
  return (
    <input
      className={`${finalClasses} ${className}`}
      {...props}
    />
  );
}; 
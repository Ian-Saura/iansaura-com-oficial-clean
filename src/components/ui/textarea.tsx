import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea: React.FC<TextareaProps> = ({ className = '', ...props }) => {
  // Base classes that can be overridden
  const baseClasses = 'flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
  
  // Check for custom overrides
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
    <textarea
      className={`${finalClasses} ${className}`}
      {...props}
    />
  );
}; 
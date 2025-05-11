import React from 'react';
interface ActionButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  icon?: React.ReactNode;
}
export function ActionButton({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  icon
}: ActionButtonProps) {
  const baseClasses = 'flex items-center justify-center px-6 py-2 rounded font-medium transition-all';
  const variantClasses = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    danger: 'bg-red-600 hover:bg-red-700 text-white'
  };
  return <button onClick={onClick} disabled={disabled} className={`${baseClasses} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>;
}
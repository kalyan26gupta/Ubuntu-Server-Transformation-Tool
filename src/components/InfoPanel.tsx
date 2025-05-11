import React from 'react';
import { AlertCircleIcon, InfoIcon } from 'lucide-react';
interface InfoPanelProps {
  type: 'info' | 'warning';
  title: string;
  children: React.ReactNode;
}
export function InfoPanel({
  type,
  title,
  children
}: InfoPanelProps) {
  const typeClasses = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800'
  };
  return <div className={`p-4 rounded-lg border ${typeClasses[type]} mb-6`}>
      <div className="flex items-center mb-2">
        {type === 'info' ? <InfoIcon size={20} className="mr-2" /> : <AlertCircleIcon size={20} className="mr-2" />}
        <h3 className="font-medium">{title}</h3>
      </div>
      <div className="text-sm">{children}</div>
    </div>;
}
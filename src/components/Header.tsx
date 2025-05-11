import React from 'react';
import { ServerIcon, HelpCircleIcon } from 'lucide-react';
export function Header() {
  return <header className="bg-indigo-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <ServerIcon size={28} />
          <h1 className="text-xl font-bold">
            Windows to Ubuntu Server Converter
          </h1>
        </div>
        <button className="flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-800 px-3 py-1 rounded">
          <HelpCircleIcon size={18} />
          <span>Help</span>
        </button>
      </div>
    </header>;
}
import React from 'react';
import { Header } from './components/Header';
import { ConversionWizard } from './components/ConversionWizard';
export function App() {
  return <div className="flex flex-col w-full min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 md:px-8 md:py-10">
        <ConversionWizard />
      </main>
      <footer className="bg-gray-800 text-white py-4 text-center text-sm">
        <p>
          Windows to Ubuntu Server Converter &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>;
}
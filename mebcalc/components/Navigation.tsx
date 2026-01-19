
import React from 'react';
import { AppMode } from '../types';

interface NavigationProps {
  currentMode: AppMode;
  onModeChange: (mode: AppMode) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentMode, onModeChange }) => {
  const tabs = [
    { mode: AppMode.BASIC, label: 'Basit', icon: 'M4 7h16M4 12h16M4 17h16' },
    { mode: AppMode.SCIENTIFIC, label: 'Bilimsel', icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
    { mode: AppMode.CONVERTER, label: 'Dönüştürücü', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
    { mode: AppMode.SMART, label: 'AI Çözücü', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { mode: AppMode.HISTORY, label: 'Geçmiş', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-2 flex justify-around items-center shadow-2xl z-50">
      {tabs.map((tab) => (
        <button
          key={tab.mode}
          onClick={() => onModeChange(tab.mode)}
          className={`
            flex flex-col items-center justify-center w-12 h-12 rounded-2xl transition-all relative
            ${currentMode === tab.mode ? 'text-blue-400 bg-blue-500/10' : 'text-slate-500 hover:text-slate-300'}
          `}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tab.icon}></path>
          </svg>
          {currentMode === tab.mode && (
              <span className="absolute -bottom-1 w-1 h-1 bg-blue-400 rounded-full animate-bounce"></span>
          )}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;

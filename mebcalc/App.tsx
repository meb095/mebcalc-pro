
import React, { useState, useEffect } from 'react';
import { AppMode, HistoryItem } from './types';
import Calculator from './components/Calculator';
import Converter from './components/Converter';
import SmartSolver from './components/SmartSolver';
import History from './components/History';
import Navigation from './components/Navigation';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.BASIC);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('mebcalc_history');
    if (saved) {
      try { setHistory(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, []);

  const addToHistory = (expression: string, result: string) => {
    const newItem: HistoryItem = {
      id: Math.random().toString(36).substring(2, 9),
      expression,
      result,
      timestamp: Date.now()
    };
    const updated = [newItem, ...history].slice(0, 50);
    setHistory(updated);
    localStorage.setItem('mebcalc_history', JSON.stringify(updated));
  };

  const renderContent = () => {
    switch (mode) {
      case AppMode.BASIC:
      case AppMode.SCIENTIFIC:
        return <Calculator mode={mode} onResult={addToHistory} />;
      case AppMode.CONVERTER:
        return <Converter />;
      case AppMode.SMART:
        return <SmartSolver />;
      case AppMode.HISTORY:
        return <History history={history} onClear={() => {setHistory([]); localStorage.removeItem('mebcalc_history');}} onSelect={() => setMode(AppMode.BASIC)} />;
      default:
        return <Calculator mode={AppMode.BASIC} onResult={addToHistory} />;
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto overflow-hidden relative selection:bg-blue-500/30">
      <header className="px-6 pt-10 pb-4 flex justify-between items-center z-10">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            MebCalc <span className="bg-blue-600 px-1.5 py-0.5 rounded text-[10px] uppercase tracking-widest">Pro</span>
          </h1>
          <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest mt-0.5">Premium Engineering Tool</p>
        </div>
        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 p-[1px] shadow-lg shadow-blue-900/20">
          <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
            <div className={`w-1.5 h-1.5 rounded-full ${mode === AppMode.SMART ? 'bg-purple-400 animate-pulse' : 'bg-blue-400'}`}></div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col overflow-y-auto px-5 pb-28 pt-2">
        {renderContent()}
      </main>

      <Navigation currentMode={mode} onModeChange={setMode} />
    </div>
  );
};

export default App;

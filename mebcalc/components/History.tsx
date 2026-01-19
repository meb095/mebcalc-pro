
import React from 'react';
import { HistoryItem } from '../types';

interface HistoryProps {
  history: HistoryItem[];
  onClear: () => void;
  onSelect: (item: HistoryItem) => void;
}

const History: React.FC<HistoryProps> = ({ history, onClear, onSelect }) => {
  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-500 h-full">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-slate-400 font-medium">Geçmiş İşlemler</h2>
        <button onClick={onClear} className="text-xs text-red-400/70 hover:text-red-400 font-medium">Tümünü Sil</button>
      </div>

      {history.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-slate-600 opacity-50 space-y-4">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <p>Henüz işlem yapılmadı</p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item) => (
            <div 
              key={item.id} 
              onClick={() => onSelect(item)}
              className="bg-slate-900/40 p-4 rounded-2xl border border-transparent hover:border-slate-800 transition-all active:scale-98 cursor-pointer group"
            >
              <div className="text-slate-500 text-xs mb-1 mono group-hover:text-slate-400 transition-colors">
                {item.expression} =
              </div>
              <div className="text-2xl font-bold text-slate-200">
                {item.result}
              </div>
              <div className="text-[10px] text-slate-600 mt-2 text-right">
                {new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;

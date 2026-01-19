
import React, { useState } from 'react';

const CATEGORIES = [
  { 
    id: 'length', 
    name: 'Uzunluk', 
    units: [
      { name: 'Metre', factor: 1 },
      { name: 'Kilometre', factor: 1000 },
      { name: 'Santimetre', factor: 0.01 },
      { name: 'Mil', factor: 1609.34 },
      { name: 'İnç', factor: 0.0254 },
      { name: 'Ayak (ft)', factor: 0.3048 }
    ]
  },
  { 
    id: 'weight', 
    name: 'Ağırlık', 
    units: [
      { name: 'Gram', factor: 1 },
      { name: 'Kilogram', factor: 1000 },
      { name: 'Ton', factor: 1000000 },
      { name: 'Pound', factor: 453.592 },
      { name: 'Ons', factor: 28.3495 }
    ]
  },
  { 
    id: 'data', 
    name: 'Dijital Veri', 
    units: [
      { name: 'MB', factor: 1 },
      { name: 'GB', factor: 1024 },
      { name: 'TB', factor: 1048576 },
      { name: 'KB', factor: 0.0009765625 }
    ]
  },
  { 
    id: 'area', 
    name: 'Alan', 
    units: [
      { name: 'Metrekare', factor: 1 },
      { name: 'Dönüm', factor: 1000 },
      { name: 'Hektar', factor: 10000 },
      { name: 'Kilometrekare', factor: 1000000 }
    ]
  }
];

const Converter: React.FC = () => {
  const [activeCat, setActiveCat] = useState(CATEGORIES[0]);
  const [val1, setVal1] = useState('1');
  const [unit1, setUnit1] = useState(activeCat.units[0]);
  const [unit2, setUnit2] = useState(activeCat.units[1]);

  const calculateVal2 = () => {
    const v1 = parseFloat(val1) || 0;
    const baseVal = v1 * unit1.factor;
    return (baseVal / unit2.factor).toLocaleString(undefined, { maximumFractionDigits: 6 });
  };

  return (
    <div className="flex flex-col gap-6 p-2 animate-in fade-in duration-500">
      <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2">
        {CATEGORIES.map(cat => (
          <button 
            key={cat.id}
            onClick={() => {
                setActiveCat(cat);
                setUnit1(cat.units[0]);
                setUnit2(cat.units[1]);
            }}
            className={`px-5 py-2.5 rounded-2xl whitespace-nowrap text-xs font-bold uppercase tracking-wider transition-all ${activeCat.id === cat.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'bg-slate-900/60 text-slate-500'}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="glass p-8 rounded-[40px] space-y-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full -mr-16 -mt-16"></div>
        
        <div className="space-y-4 relative">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Giriş Değeri</label>
          <input 
            type="number"
            inputMode="decimal"
            value={val1}
            onChange={(e) => setVal1(e.target.value)}
            className="w-full bg-transparent text-5xl font-light focus:outline-none text-white placeholder:text-slate-800"
          />
          <div className="relative">
            <select 
              className="bg-slate-800/50 text-slate-300 text-sm p-4 rounded-2xl w-full appearance-none border border-slate-700/50 focus:border-blue-500/50 transition-colors"
              value={unit1.name}
              onChange={(e) => setUnit1(activeCat.units.find(u => u.name === e.target.value)!)}
            >
              {activeCat.units.map(u => <option key={u.name} value={u.name}>{u.name}</option>)}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
            </div>
          </div>
        </div>

        <div className="flex justify-center relative">
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-2xl shadow-lg rotate-0 active:rotate-180 transition-transform duration-500">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path></svg>
            </div>
        </div>

        <div className="space-y-4 relative">
          <label className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em] ml-1">Sonuç</label>
          <div className="w-full text-5xl font-light text-blue-400 break-all">
            {calculateVal2()}
          </div>
          <div className="relative">
            <select 
              className="bg-slate-800/50 text-slate-300 text-sm p-4 rounded-2xl w-full appearance-none border border-slate-700/50 focus:border-blue-500/50 transition-colors"
              value={unit2.name}
              onChange={(e) => setUnit2(activeCat.units.find(u => u.name === e.target.value)!)}
            >
              {activeCat.units.map(u => <option key={u.name} value={u.name}>{u.name}</option>)}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Converter;

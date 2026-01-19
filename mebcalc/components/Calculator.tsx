
import React, { useState } from 'react';
import { AppMode } from '../types';

interface CalculatorProps {
  mode: AppMode;
  onResult: (expression: string, result: string) => void;
}

const Calculator: React.FC<CalculatorProps> = ({ mode, onResult }) => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [isDone, setIsDone] = useState(false);

  const vibrate = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(15);
    }
  };

  const buttons = [
    { label: 'C', type: 'action', color: 'text-red-400' },
    { label: '⌫', type: 'action', color: 'text-blue-400' },
    { label: '%', type: 'action', color: 'text-blue-400' },
    { label: '÷', type: 'operator', color: 'text-blue-400' },
    { label: '7', type: 'number' },
    { label: '8', type: 'number' },
    { label: '9', type: 'number' },
    { label: '×', type: 'operator', color: 'text-blue-400' },
    { label: '4', type: 'number' },
    { label: '5', type: 'number' },
    { label: '6', type: 'number' },
    { label: '-', type: 'operator', color: 'text-blue-400' },
    { label: '1', type: 'number' },
    { label: '2', type: 'number' },
    { label: '3', type: 'number' },
    { label: '+', type: 'operator', color: 'text-blue-400' },
    { label: '+/-', type: 'action' },
    { label: '0', type: 'number' },
    { label: '.', type: 'number' },
    { label: '=', type: 'equal', color: 'bg-blue-600 text-white rounded-2xl' },
  ];

  const scientificButtons = [
    { label: 'sin', type: 'sci' },
    { label: 'cos', type: 'sci' },
    { label: 'tan', type: 'sci' },
    { label: 'log', type: 'sci' },
    { label: 'ln', type: 'sci' },
    { label: '√', type: 'sci' },
    { label: '^', type: 'sci' },
    { label: 'π', type: 'sci' },
    { label: 'e', type: 'sci' },
    { label: '!', type: 'sci' },
  ];

  const handlePress = (btn: string) => {
    vibrate();
    
    if (isDone) {
      if (!['+', '-', '×', '÷', '^', '⌫'].includes(btn)) {
        setExpression('');
        setDisplay('0');
      }
      setIsDone(false);
    }

    if (btn === 'C') {
      setDisplay('0');
      setExpression('');
      return;
    }

    if (btn === '⌫') {
      if (isDone) {
        setDisplay('0');
        return;
      }
      setDisplay(prev => (prev.length <= 1 || prev === 'Hata' ? '0' : prev.slice(0, -1)));
      return;
    }

    if (btn === '=') {
      try {
        let evalExpr = (expression + display)
          .replace(/×/g, '*')
          .replace(/÷/g, '/')
          .replace(/sin/g, 'Math.sin')
          .replace(/cos/g, 'Math.cos')
          .replace(/tan/g, 'Math.tan')
          .replace(/log/g, 'Math.log10')
          .replace(/ln/g, 'Math.log')
          .replace(/√/g, 'Math.sqrt')
          .replace(/\^/g, '**')
          .replace(/π/g, 'Math.PI')
          .replace(/e/g, 'Math.E');
        
        // eslint-disable-next-line no-eval
        const resultValue = Function(`'use strict'; return (${evalExpr})`)();
        const resultStr = Number.isInteger(resultValue) ? resultValue.toString() : resultValue.toFixed(8).replace(/\.?0+$/, '');
        
        onResult(expression + display, resultStr);
        setDisplay(resultStr);
        setExpression('');
        setIsDone(true);
      } catch (err) {
        setDisplay('Hata');
        setTimeout(() => setDisplay('0'), 1500);
      }
      return;
    }

    if (['+', '-', '×', '÷'].includes(btn)) {
      setExpression(prev => prev + display + ' ' + btn + ' ');
      setDisplay('0');
      return;
    }

    if (btn === '+/-') {
      setDisplay(prev => (prev.startsWith('-') ? prev.substring(1) : '-' + prev));
      return;
    }

    if (!isNaN(parseInt(btn)) || btn === '.') {
      setDisplay(prev => (prev === '0' && btn !== '.' ? btn : prev + btn));
    } else {
        setDisplay(prev => (prev === '0' ? btn + '(' : prev + btn + '('));
    }
  };

  const isScientific = mode === AppMode.SCIENTIFIC;

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden">
      <div className={`flex flex-col items-end justify-end px-4 transition-all duration-300 ${isScientific ? 'py-2 min-h-[80px]' : 'py-6 min-h-[120px]'}`}>
        <div className="text-slate-500 text-xs mono truncate w-full text-right h-5 mb-1 opacity-70">
          {expression}
        </div>
        <div className={`font-semibold tracking-tighter overflow-x-auto whitespace-nowrap w-full text-right transition-all duration-300 ${isScientific ? 'text-3xl' : 'text-5xl'}`}>
          {display}
        </div>
      </div>

      <div className="flex flex-col gap-2 flex-1">
        {isScientific && (
          <div className="grid grid-cols-5 gap-1.5 mb-1 animate-in slide-in-from-top duration-300">
            {scientificButtons.map((btn) => (
              <button
                key={btn.label}
                onClick={() => handlePress(btn.label)}
                className="h-10 text-[10px] font-bold uppercase bg-slate-900/40 active:bg-blue-500/30 rounded-lg text-blue-400 transition-all border border-slate-800/30"
              >
                {btn.label}
              </button>
            ))}
          </div>
        )}

        <div className={`grid grid-cols-4 gap-2 pb-4 ${isScientific ? 'flex-1' : ''}`}>
          {buttons.map((btn) => (
            <button
              key={btn.label}
              onClick={() => handlePress(btn.label)}
              className={`
                flex items-center justify-center text-2xl font-medium rounded-2xl transition-all active:scale-90 touch-manipulation
                ${isScientific ? 'h-12 text-xl' : 'h-16'}
                ${btn.color || 'text-slate-100'}
                ${btn.type === 'equal' ? 'shadow-lg shadow-blue-600/20' : 'bg-slate-900/60 active:bg-slate-800'}
              `}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;

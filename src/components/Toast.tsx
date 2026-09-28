import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { CheckCircle2, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage, setToastMessage } = useDashboard();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-slate-900 border border-cyan-500/40 text-slate-100 rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200">
      <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
      <span className="text-xs font-medium">{toastMessage}</span>
      <button 
        onClick={() => setToastMessage(null)}
        className="text-slate-400 hover:text-white p-0.5 rounded cursor-pointer ms-2"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

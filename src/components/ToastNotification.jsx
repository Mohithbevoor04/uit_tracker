import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useProject } from '../context/ProjectContext';

export default function ToastNotification() {
  const { toasts, removeToast } = useProject();

  if (!toasts.length) return null;

  return (
    <div className="fixed top-20 right-6 z-50 flex flex-col space-y-2 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let bgStyle = 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-emerald-100';
        let iconColor = 'text-emerald-600';

        if (toast.type === 'error') {
          Icon = AlertCircle;
          bgStyle = 'bg-rose-50 border-rose-300 text-rose-900 shadow-rose-100';
          iconColor = 'text-rose-600';
        } else if (toast.type === 'info') {
          Icon = Info;
          bgStyle = 'bg-blue-50 border-blue-300 text-blue-900 shadow-blue-100';
          iconColor = 'text-[#00008f]';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start p-4 rounded-lg border shadow-lg transition-all duration-300 animate-slide-in ${bgStyle}`}
          >
            <Icon className={`w-5 h-5 ${iconColor} mt-0.5 flex-shrink-0 mr-3`} />
            <div className="flex-1 text-xs sm:text-sm font-medium leading-relaxed">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-3 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

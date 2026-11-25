import React from 'react';
import { NavLink } from 'react-router-dom';
import { FileSpreadsheet, Plus, Table2, CheckCircle2 } from 'lucide-react';

export default function SubNavTabs() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#f8fafc] border-t border-slate-300 z-40 shadow-inner select-none">
      <div className="max-w-7xl mx-auto px-2 flex items-center justify-between text-xs font-medium text-slate-600">
        {/* Excel Sheets Tab Bar */}
        <div className="flex items-center space-x-1 overflow-x-auto py-1">
          <div className="px-2 text-slate-400 flex items-center">
            <FileSpreadsheet className="w-3.5 h-3.5 mr-1" />
            <span className="text-[11px] font-semibold tracking-wider uppercase">Workbook:</span>
          </div>

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center space-x-1.5 px-3.5 py-1.5 rounded-t border transition-all text-xs ${
                isActive
                  ? 'bg-white text-[#6b3074] font-bold border-slate-300 border-b-white shadow-sm -mb-[2px]'
                  : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 border-transparent'
              }`
            }
          >
            <span>App Launch page</span>
          </NavLink>

          <NavLink
            to="/project-definition"
            className={({ isActive }) =>
              `flex items-center space-x-1.5 px-3.5 py-1.5 rounded-t border transition-all text-xs ${
                isActive
                  ? 'bg-white text-[#00008f] font-bold border-slate-300 border-b-white shadow-sm -mb-[2px]'
                  : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 border-transparent'
              }`
            }
          >
            <span>Project Definition</span>
          </NavLink>

          <NavLink
            to="/add-new-project"
            className={({ isActive }) =>
              `flex items-center space-x-1.5 px-3.5 py-1.5 rounded-t border transition-all text-xs ${
                isActive
                  ? 'bg-white text-emerald-800 font-bold border-slate-300 border-b-white shadow-sm -mb-[2px]'
                  : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 border-transparent'
              }`
            }
          >
            <span>Add new project</span>
          </NavLink>

          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-t text-slate-400 bg-slate-100/50 cursor-not-allowed">
            <span>Sheet5</span>
          </div>

          <button 
            type="button" 
            title="Add new sheet view"
            className="p-1 hover:bg-slate-200 rounded text-slate-500 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Status bar */}
        <div className="hidden md:flex items-center space-x-4 text-[11px] text-slate-500 py-1">
          <span className="flex items-center">
            <CheckCircle2 className="w-3 h-3 text-emerald-600 mr-1" />
            Auto-Sync Ready
          </span>
          <span>100% Zoom</span>
          <span className="bg-slate-200 px-2 py-0.5 rounded text-[10px]">Office 365 Connected</span>
        </div>
      </div>
    </div>
  );
}

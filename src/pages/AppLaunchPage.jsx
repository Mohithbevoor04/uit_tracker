import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FolderKanban, 
  DollarSign, 
  FileText, 
  Users, 
  TrendingUp, 
  FileCheck2, 
  Sparkles, 
  Send,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Calendar,
  Layers,
  Clock,
  Briefcase
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';

export default function AppLaunchPage() {
  const navigate = useNavigate();
  const { projects } = useProject();
  const [activeModal, setActiveModal] = useState(null);

  // The 8 items exactly as in Excel (Image 5)
  const menuItems = [
    {
      id: 'project-definitions',
      title: 'Project Definitions',
      subtitle: 'Manage, search, and configure project master records & scope',
      icon: FolderKanban,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200 group-hover:border-emerald-400',
      badge: `${projects.length} Active`,
      primaryAction: () => navigate('/project-definition'),
      isPrimary: true
    },
    {
      id: 'budgeting',
      title: 'Budgeting',
      subtitle: 'Capex, Opex and SOW budget allocation against actual run-rate',
      icon: DollarSign,
      color: 'bg-blue-50 text-blue-700 border-blue-200 group-hover:border-blue-400',
      badge: 'FY2026 Q4 Open',
      primaryAction: () => setActiveModal('budgeting')
    },
    {
      id: 'accrual-reports',
      title: 'Accrual Reports',
      subtitle: 'Monthly finance accruals, vendor billing & invoice reconciliations',
      icon: FileText,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200 group-hover:border-indigo-400',
      badge: 'Month-End Due',
      primaryAction: () => setActiveModal('accruals')
    },
    {
      id: 'resource-utilization-forecast',
      title: 'Resource Utilization & Forecast',
      subtitle: 'Team allocation %, bench analysis, and forward 90-day demand',
      icon: Users,
      color: 'bg-purple-50 text-[#6b3074] border-purple-200 group-hover:border-purple-400',
      badge: '88.4% Target Met',
      primaryAction: () => setActiveModal('resource')
    },
    {
      id: 'utilization-migration-reports',
      title: 'Utilization & Migration Reports',
      subtitle: 'Legacy to cloud migration trackers and productivity metrics',
      icon: TrendingUp,
      color: 'bg-amber-50 text-amber-700 border-amber-200 group-hover:border-amber-400',
      badge: '9 Active Waves',
      primaryAction: () => setActiveModal('migration')
    },
    {
      id: 'generate-project-wsr',
      title: 'Generate Project WSR',
      subtitle: 'Export automated Weekly Status Reports for AXA SteerCo',
      icon: FileCheck2,
      color: 'bg-teal-50 text-teal-700 border-teal-200 group-hover:border-teal-400',
      badge: 'Week 47 Ready',
      primaryAction: () => setActiveModal('wsr')
    },
    {
      id: 'new-opportunity',
      title: 'New oppurtunity',
      subtitle: 'Log and evaluate upcoming pipeline deals & discovery phases',
      icon: Sparkles,
      color: 'bg-pink-50 text-pink-700 border-pink-200 group-hover:border-pink-400',
      badge: '4 In Pipeline',
      primaryAction: () => setActiveModal('opportunity')
    },
    {
      id: 'proposal-submission',
      title: 'Proposal submission',
      subtitle: 'RFP governance, solution architecture review & final sign-off',
      icon: Send,
      color: 'bg-violet-50 text-violet-700 border-violet-200 group-hover:border-violet-400',
      badge: '2 Pending SOW',
      primaryAction: () => setActiveModal('proposal')
    }
  ];

  // Quick Portfolio KPIs
  const totalSowBudget = projects.reduce((acc, p) => acc + (p.sowValue || 0), 0);
  const totalCost = projects.reduce((acc, p) => acc + (p.totalCost || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
      {/* Excel Sheet Title Banner matching Image 5 */}
      <div className="bg-gradient-to-r from-[#6b3074] via-[#823887] to-[#00008f] rounded-xl shadow-lg p-6 sm:p-8 text-white mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-purple-200 text-xs font-semibold uppercase tracking-wider mb-1">
              <span className="bg-white/20 px-2 py-0.5 rounded text-[11px]">AXA Portal</span>
              <span>•</span>
              <span>App Launch Page</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Project Management
            </h1>
            <p className="mt-2 text-purple-100 max-w-2xl text-sm sm:text-base leading-relaxed">
              Industrial Automation & Cognitive Processing Management Center. Select a workspace below to inspect definitions, cost tracking, or resource forecasts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/project-definition')}
              className="bg-white text-[#6b3074] hover:bg-purple-50 font-bold px-5 py-3 rounded-lg shadow transition-all duration-200 flex items-center space-x-2 text-sm"
            >
              <span>Explore Definitions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Portfolio Stats Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-purple-400/30 text-xs sm:text-sm">
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <span className="text-purple-200 text-[11px] block uppercase font-medium">Total Projects</span>
            <span className="text-xl sm:text-2xl font-bold mt-1 block">{projects.length} Registered</span>
          </div>
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <span className="text-purple-200 text-[11px] block uppercase font-medium">Total SOW Value</span>
            <span className="text-xl sm:text-2xl font-bold mt-1 block">€{(totalSowBudget / 1000).toFixed(0)}k EUR</span>
          </div>
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <span className="text-purple-200 text-[11px] block uppercase font-medium">Total Est. Cost</span>
            <span className="text-xl sm:text-2xl font-bold mt-1 block">€{(totalCost / 1000).toFixed(0)}k EUR</span>
          </div>
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <span className="text-purple-200 text-[11px] block uppercase font-medium">Avg Portfolio Margin</span>
            <span className="text-xl sm:text-2xl font-bold mt-1 block text-emerald-300">
              {totalSowBudget > 0 ? (((totalSowBudget - totalCost) / totalSowBudget) * 100).toFixed(1) : '18.5'}%
            </span>
          </div>
        </div>
      </div>

      {/* Menu Cards Grid - The 8 items */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            System Modules & Workspaces
          </h2>
          <p className="text-xs text-slate-500">
            Click any section below to launch its management console.
          </p>
        </div>
        <span className="text-xs text-slate-400 font-medium bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
          8 Core Modules
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={item.primaryAction}
              className={`group relative bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                item.isPrimary
                  ? 'border-emerald-300 ring-2 ring-emerald-500/10 hover:border-emerald-500 bg-gradient-to-br from-white to-emerald-50/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className={`p-3 rounded-xl border ${item.color} transition-colors`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono font-semibold text-slate-400">0{idx + 1}</span>
                        <h3 className="text-base font-bold text-slate-800 group-hover:text-[#00008f] transition-colors">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-normal max-w-sm">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                    item.isPrimary ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>
                    {item.badge}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-medium group-hover:text-slate-700">
                  {item.isPrimary ? 'Click to open Project Search & Definitions' : 'Open Workspace View'}
                </span>
                <span className="text-slate-400 group-hover:text-[#00008f] group-hover:translate-x-1 transition-all flex items-center font-semibold">
                  Launch <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal / Drawer for Secondary Modules */}
      {activeModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-[#6b3074] text-white p-5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Layers className="w-5 h-5" />
                <h3 className="text-lg font-bold">
                  {menuItems.find(m => m.id === activeModal || m.primaryAction.toString().includes(activeModal))?.title || 'Module Overview'}
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="text-white/80 hover:text-white text-sm bg-white/10 px-2.5 py-1 rounded-md"
              >
                Close ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 text-xs text-purple-900 leading-relaxed">
                This module is integrated with the <strong>Project Definitions & Costing</strong> engine. All financial metrics and team allocations configured in <strong>Project Definition</strong> sync automatically to this report.
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-lg p-3">
                  <span className="text-xs text-slate-500 font-medium">Connected Projects</span>
                  <p className="text-lg font-bold text-slate-800 mt-1">{projects.length} Managed</p>
                </div>
                <div className="border border-slate-200 rounded-lg p-3">
                  <span className="text-xs text-slate-500 font-medium">Active SOW Budget</span>
                  <p className="text-lg font-bold text-slate-800 mt-1">€{totalSowBudget.toLocaleString()} EUR</p>
                </div>
              </div>

              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Recent Synchronized Projects</h4>
                <div className="space-y-2 text-xs">
                  {projects.slice(0, 3).map(p => (
                    <div key={p.id} className="flex justify-between items-center bg-white p-2 rounded border border-slate-200">
                      <div>
                        <span className="font-semibold text-slate-800">{p.projectCode}</span>
                        <span className="text-slate-500 ml-2">{p.projectName}</span>
                      </div>
                      <span className="font-mono font-medium text-emerald-700">€{p.totalCost.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-3">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg border border-slate-200"
                >
                  Dismiss
                </button>
                <button
                  onClick={() => {
                    setActiveModal(null);
                    navigate('/project-definition');
                  }}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#00008f] hover:bg-[#000070] rounded-lg shadow"
                >
                  Go to Project Definitions
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

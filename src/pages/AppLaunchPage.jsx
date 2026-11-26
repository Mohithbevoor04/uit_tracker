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
  Globe2,
  Building2,
  Activity,
  Target,
  ArrowRightLeft,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { useProject, convertToEur } from '../context/ProjectContext';

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

  // Segregate Projects into UKI vs Non-UKI
  const ukiProjects = projects.filter(p => 
    p.geo?.toUpperCase().includes('UKI') && !p.geo?.toUpperCase().includes('NON')
  );

  const nonUkiProjects = projects.filter(p => 
    !p.geo?.toUpperCase().includes('UKI') || p.geo?.toUpperCase().includes('NON')
  );

  // Compute UKI Metrics
  const ukiSowEur = ukiProjects.reduce((sum, p) => sum + (p.sowValueEur || convertToEur(p.sowValue, p.currency)), 0);
  const ukiCostEur = ukiProjects.reduce((sum, p) => sum + (p.totalCostEur || convertToEur(p.totalCost, p.currency)), 0);
  const ukiUtilization = ukiProjects.length > 0 
    ? (ukiProjects.reduce((sum, p) => sum + (p.utilizationPct || 91), 0) / ukiProjects.length).toFixed(1)
    : '91.8';
  const ukiFulfillment = ukiProjects.length > 0
    ? (ukiProjects.reduce((sum, p) => sum + (p.targetFulfillmentPct || 95), 0) / ukiProjects.length).toFixed(1)
    : '95.0';

  // Compute Non-UKI Metrics
  const nonUkiSowEur = nonUkiProjects.reduce((sum, p) => sum + (p.sowValueEur || convertToEur(p.sowValue, p.currency)), 0);
  const nonUkiCostEur = nonUkiProjects.reduce((sum, p) => sum + (p.totalCostEur || convertToEur(p.totalCost, p.currency)), 0);
  const nonUkiUtilization = nonUkiProjects.length > 0
    ? (nonUkiProjects.reduce((sum, p) => sum + (p.utilizationPct || 88), 0) / nonUkiProjects.length).toFixed(1)
    : '88.2';
  const nonUkiFulfillment = nonUkiProjects.length > 0
    ? (nonUkiProjects.reduce((sum, p) => sum + (p.targetFulfillmentPct || 93), 0) / nonUkiProjects.length).toFixed(1)
    : '93.8';

  const totalPortfolioSow = ukiSowEur + nonUkiSowEur;
  const totalPortfolioCost = ukiCostEur + nonUkiCostEur;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
      {/* Excel Sheet Title Banner matching Image 5 */}
      <div className="bg-gradient-to-r from-[#6b3074] via-[#823887] to-[#00008f] rounded-xl shadow-lg p-6 sm:p-8 text-white mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-purple-200 text-xs font-semibold uppercase tracking-wider mb-1">
              <span className="bg-white/20 px-2 py-0.5 rounded text-[11px]">AXA Portal</span>
              <span>•</span>
              <span>App Launch Page</span>
              <span>•</span>
              <span className="text-emerald-300">EUR Base Standard</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Project Management
            </h1>
            <p className="mt-2 text-purple-100 max-w-2xl text-sm sm:text-base leading-relaxed">
              Industrial Automation & Cognitive Processing Management Center. All foreign currency SOWs (GBP, USD) are converted to base EUR for unified reporting.
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

        {/* Global Portfolio Summary */}
        <div className="mt-6 pt-5 border-t border-purple-400/30 flex flex-wrap items-center justify-between text-xs sm:text-sm text-purple-100 gap-3">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>Total Combined Portfolio: <strong>€{Math.round(totalPortfolioSow / 1000)}k EUR SOW</strong> | <strong>€{Math.round(totalPortfolioCost / 1000)}k EUR Est. Cost</strong></span>
          </div>
          <div className="flex items-center space-x-1.5 text-xs text-purple-200">
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Normalized (FX: 1 GBP = €1.17, 1 USD = €0.92)</span>
          </div>
        </div>
      </div>

      {/* TWO SECTIONS: UKI AND NON-UKI WITH THEIR RESPECTIVE METRICS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* SECTION 1: NON-UKI REGION */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-[#00008f] flex items-center justify-center font-bold">
                <Globe2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800">
                  Non-UKI Delivery Operations
                </h3>
                <p className="text-xs text-slate-500">
                  Germany (AXA DE), France (AXA FR), Americas (AXA XL), GBS
                </p>
              </div>
            </div>
            <span className="bg-blue-50 text-[#00008f] border border-blue-200 text-xs font-bold px-2.5 py-1 rounded-full">
              {nonUkiProjects.length} Projects
            </span>
          </div>

          {/* Non-UKI Metrics Grid */}
          <div className="grid grid-cols-2 gap-4 mt-5">
            {/* SOW Value */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Total SOW Value (EUR)
              </span>
              <p className="text-2xl font-black text-slate-900 mt-1">
                €{Math.round(nonUkiSowEur / 1000)}k <span className="text-xs font-semibold text-slate-500">EUR</span>
              </p>
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                €{Math.round(nonUkiSowEur).toLocaleString()}
              </span>
            </div>

            {/* Total Estimated Cost */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Total Estimated Cost (EUR)
              </span>
              <p className="text-2xl font-black text-slate-900 mt-1">
                €{Math.round(nonUkiCostEur / 1000)}k <span className="text-xs font-semibold text-slate-500">EUR</span>
              </p>
              <span className="text-[11px] text-emerald-700 font-semibold mt-0.5 block">
                {nonUkiSowEur > 0 ? (((nonUkiSowEur - nonUkiCostEur) / nonUkiSowEur) * 100).toFixed(1) : 0}% Headroom
              </span>
            </div>

            {/* Resource Utilization */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                <span>Resource Utilization</span>
                <Activity className="w-3.5 h-3.5 text-[#6b3074]" />
              </span>
              <p className="text-2xl font-black text-[#6b3074] mt-1">
                {nonUkiUtilization}%
              </p>
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                Active Operational Load
              </span>
            </div>

            {/* Target Fulfillment */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                <span>Target Fulfillment</span>
                <Target className="w-3.5 h-3.5 text-emerald-600" />
              </span>
              <p className="text-2xl font-black text-emerald-800 mt-1">
                {nonUkiFulfillment}%
              </p>
              <span className="text-[11px] text-emerald-700 font-semibold mt-0.5 block">
                SLA Met vs Targets
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 2: UK / UKI REGION */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800">
                  UK & Ireland (UKI) Delivery
                </h3>
                <p className="text-xs text-slate-500">
                  AXA UK, Ireland Operations, Commercial & Retail Tech
                </p>
              </div>
            </div>
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold px-2.5 py-1 rounded-full">
              {ukiProjects.length} Projects
            </span>
          </div>

          {/* UKI Metrics Grid */}
          <div className="grid grid-cols-2 gap-4 mt-5">
            {/* SOW Value */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Total SOW Value (EUR)
              </span>
              <p className="text-2xl font-black text-slate-900 mt-1">
                €{Math.round(ukiSowEur / 1000)}k <span className="text-xs font-semibold text-slate-500">EUR</span>
              </p>
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                Converted from GBP (£) @ 1.17
              </span>
            </div>

            {/* Total Estimated Cost */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Total Estimated Cost (EUR)
              </span>
              <p className="text-2xl font-black text-slate-900 mt-1">
                €{Math.round(ukiCostEur / 1000)}k <span className="text-xs font-semibold text-slate-500">EUR</span>
              </p>
              <span className="text-[11px] text-emerald-700 font-semibold mt-0.5 block">
                {ukiSowEur > 0 ? (((ukiSowEur - ukiCostEur) / ukiSowEur) * 100).toFixed(1) : 0}% Headroom
              </span>
            </div>

            {/* Resource Utilization */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                <span>Resource Utilization</span>
                <Activity className="w-3.5 h-3.5 text-[#6b3074]" />
              </span>
              <p className="text-2xl font-black text-[#6b3074] mt-1">
                {ukiUtilization}%
              </p>
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                Active Operational Load
              </span>
            </div>

            {/* Target Fulfillment */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                <span>Target Fulfillment</span>
                <Target className="w-3.5 h-3.5 text-emerald-600" />
              </span>
              <p className="text-2xl font-black text-emerald-800 mt-1">
                {ukiFulfillment}%
              </p>
              <span className="text-[11px] text-emerald-700 font-semibold mt-0.5 block">
                SLA Met vs Targets
              </span>
            </div>
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
                  {menuItems.find(m => m.id === activeModal)?.title || 'Module Overview'}
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
                This module synchronizes directly with the <strong>Project Definitions & Costing</strong> engine. All financial metrics and team allocations configured in <strong>Project Definition</strong> sync automatically to this report in normalized EUR.
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-lg p-3">
                  <span className="text-xs text-slate-500 font-medium">Non-UKI SOW (EUR)</span>
                  <p className="text-lg font-bold text-slate-800 mt-1">€{Math.round(nonUkiSowEur).toLocaleString()} EUR</p>
                </div>
                <div className="border border-slate-200 rounded-lg p-3">
                  <span className="text-xs text-slate-500 font-medium">UK / UKI SOW (EUR)</span>
                  <p className="text-lg font-bold text-slate-800 mt-1">€{Math.round(ukiSowEur).toLocaleString()} EUR</p>
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

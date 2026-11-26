import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { Save, FileCheck, CheckCircle2, Link2, Sparkles, AlertCircle, Calendar, TrendingUp } from 'lucide-react';

export default function GeneralInfoTab({ onSave }) {
  const { formData, updateGeneralInfo } = useProject();
  const info = formData.generalInfo;

  return (
    <div className="space-y-6">
      {/* Excel purple section header */}
      <div className="bg-[#6b3074] text-white px-5 py-2.5 rounded font-bold text-sm tracking-wide shadow-sm flex items-center justify-between">
        <span>General Information</span>
        <span className="text-xs font-normal text-purple-200">Mandatory SOW & Scope Parameters</span>
      </div>

      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-5">
        {/* Row 1: Tribe/Geo & Entity & Business */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Tribe / Geo <span className="text-rose-500">*</span>
            </label>
            <select
              value={info.tribeGeo}
              onChange={(e) => updateGeneralInfo('tribeGeo', e.target.value)}
              className="w-full bg-[#e8f0fe] border border-blue-200 rounded px-3 py-2 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#00008f]"
            >
              <option value="Non-UKI">Non-UKI (Generates DAAS-IA-NUKI Code)</option>
              <option value="UKI">UKI (Generates DAAS-IA-UKI Code)</option>
              <option value="Americas">Americas (AXA XL)</option>
              <option value="APAC">APAC (Asia-Pacific)</option>
              <option value="Global">Global Operations</option>
            </select>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Prefix: {info.tribeGeo?.toUpperCase().includes('UKI') && !info.tribeGeo?.toUpperCase().includes('NON') ? 'DAAS-IA-UKI-xxx' : 'DAAS-IA-NUKI-xxx'}
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Entity <span className="text-rose-500">*</span>
            </label>
            <select
              value={info.entity}
              onChange={(e) => updateGeneralInfo('entity', e.target.value)}
              className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#00008f]"
            >
              <option value="AXA Business Services">AXA Business Services</option>
              <option value="AXA Germany (DE)">AXA Germany (DE)</option>
              <option value="AXA France (FR)">AXA France (FR)</option>
              <option value="AXA UK & Ireland">AXA UK & Ireland</option>
              <option value="AXA XL Global">AXA XL Global</option>
              <option value="AXA Belgium">AXA Belgium</option>
              <option value="AXA Spain">AXA Spain</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Business <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={info.business}
              onChange={(e) => updateGeneralInfo('business', e.target.value)}
              placeholder="e.g. CFS, GI, Life & Health"
              className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#00008f]"
            />
          </div>
        </div>

        {/* Row 2: Description */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Description <span className="text-rose-500">*</span>
          </label>
          <textarea
            rows={3}
            value={info.description}
            onChange={(e) => updateGeneralInfo('description', e.target.value)}
            placeholder="Describe project objectives, scope, deliverable milestones, and automation business impact..."
            className="w-full bg-white border border-slate-300 rounded p-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00008f]"
          />
          <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1">
            <span>Detailed scope will be indexed for cognitive search and audit trails.</span>
            <span>{info.description.length} characters</span>
          </div>
        </div>

        {/* Row 3: Project Dates (Start & End Date for Timeline) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1 text-[#00008f]" />
              <span>Project Start Date <span className="text-rose-500">*</span></span>
            </label>
            <input
              type="date"
              value={info.startDate}
              onChange={(e) => updateGeneralInfo('startDate', e.target.value)}
              className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#00008f]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1 text-[#00008f]" />
              <span>Project End Date <span className="text-rose-500">*</span></span>
            </label>
            <input
              type="date"
              value={info.endDate}
              onChange={(e) => updateGeneralInfo('endDate', e.target.value)}
              className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#00008f]"
            />
          </div>
        </div>

        {/* Row 4: Project Type & Tool Stack (RPA & AI) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Project Type <span className="text-rose-500">*</span>
            </label>
            <select
              value={info.projectType}
              onChange={(e) => updateGeneralInfo('projectType', e.target.value)}
              className="w-full bg-[#e8f0fe] border border-blue-200 rounded px-3 py-2 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#00008f]"
            >
              <option value="Staff Aug">Staff Aug</option>
              <option value="Fixed Price">Fixed Price</option>
              <option value="Time & Material">Time & Material</option>
              <option value="Milestone-Based">Milestone-Based</option>
              <option value="Internal R&D">Internal R&D</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Tool Stack: RPA
            </label>
            <select
              value={info.toolStackRPA}
              onChange={(e) => updateGeneralInfo('toolStackRPA', e.target.value)}
              className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#00008f]"
            >
              <option value="UiPath">UiPath</option>
              <option value="Blue Prism">Blue Prism</option>
              <option value="Automation Anywhere">Automation Anywhere</option>
              <option value="Power Automate">Power Automate</option>
              <option value="Custom Python Scripts">Custom Python Scripts</option>
              <option value="None / Not Applicable">None / Not Applicable</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Tool Stack: AI
            </label>
            <select
              value={info.toolStackAI}
              onChange={(e) => updateGeneralInfo('toolStackAI', e.target.value)}
              className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#00008f]"
            >
              <option value="Azure AI">Azure AI Services</option>
              <option value="Gemini / Vertex AI">Gemini / Vertex AI</option>
              <option value="OpenAI GPT-4o">OpenAI GPT-4o Enterprise</option>
              <option value="LangChain / LlamaIndex">LangChain / Custom RAG</option>
              <option value="Custom ML Pipeline">Custom ML Pipeline</option>
              <option value="None / Not Applicable">None / Not Applicable</option>
            </select>
          </div>
        </div>

        {/* Row 5: FTE Benefits, SOW Status & SOW Link */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-1 text-[#00008f]" />
              <span>FTE Benefits <span className="text-rose-500">*</span></span>
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={info.fteBenefit !== undefined ? info.fteBenefit : ''}
                onChange={(e) => updateGeneralInfo('fteBenefit', e.target.value)}
                placeholder="e.g. 4.5"
                className="w-full bg-[#e8f0fe] border border-blue-200 rounded px-3 py-2 text-sm text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-[#00008f]"
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs font-bold text-slate-500">
                FTE
              </span>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">Expected / realized operational capacity benefit</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              SOW Status <span className="text-rose-500">*</span>
            </label>
            <select
              value={info.sowStatus}
              onChange={(e) => updateGeneralInfo('sowStatus', e.target.value)}
              className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#00008f]"
            >
              <option value="Signed">Signed</option>
              <option value="In Review">In Review</option>
              <option value="Draft">Draft</option>
              <option value="Pending Approval">Pending Approval</option>
              <option value="SOW Not Required">SOW Not Required</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              SOW Link
            </label>
            <div className="flex">
              <input
                type="text"
                value={info.sowLink}
                onChange={(e) => updateGeneralInfo('sowLink', e.target.value)}
                placeholder="https://axa365.sharepoint.com/..."
                className="flex-1 bg-white border border-slate-300 rounded-l px-3 py-2 text-sm text-slate-800 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#00008f]"
              />
              <a
                href={info.sowLink || '#'}
                target="_blank"
                rel="noreferrer"
                className="bg-slate-100 hover:bg-slate-200 border border-l-0 border-slate-300 px-3 py-2 rounded-r flex items-center text-slate-600 text-xs font-semibold"
                title="Open Link"
              >
                <Link2 className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Save & Notification Bar */}
        <div className="bg-[#f0f9ff] border border-blue-200 rounded-lg p-4 mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[#00008f]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">
                Automatic Project Code & ID Generation
              </p>
              <p className="text-xs text-slate-500 font-medium">
                Saves project with format <strong>{info.tribeGeo?.toUpperCase().includes('UKI') && !info.tribeGeo?.toUpperCase().includes('NON') ? 'DAAS-IA-UKI-xxx' : 'DAAS-IA-NUKI-xxx'}</strong> and notifies stakeholders.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onSave}
            className="bg-[#00008f] hover:bg-[#000070] text-white px-6 py-2.5 rounded font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>SAVE</span>
          </button>
        </div>
      </div>
    </div>
  );
}

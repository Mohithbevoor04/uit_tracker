import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { Users, UserCheck, ShieldCheck, Briefcase } from 'lucide-react';

export default function ResourceLoadingTab() {
  const { formData, updateResourceLoading } = useProject();
  const res = formData.resourceLoading;

  return (
    <div className="space-y-8">
      {/* SECTION 1: Resource Loading (Purple header from Image 1) */}
      <div>
        <div className="bg-[#6b3074] text-white px-5 py-2.5 rounded font-bold text-sm tracking-wide shadow-sm flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Resource Loading</span>
          </div>
          <span className="text-xs font-normal text-purple-200">
            Core Delivery Team Structure (3 Columns)
          </span>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* COLUMN 1 */}
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold text-[#00008f] uppercase tracking-wider pb-2 border-b border-slate-200">
                Management & Analysis
              </h4>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Tribe Lead
                </label>
                <input
                  type="text"
                  value={res.tribeLead}
                  onChange={(e) => updateResourceLoading('tribeLead', e.target.value)}
                  placeholder="e.g. Marc Dupont"
                  className="w-full bg-[#f8fafc] border border-slate-300 rounded px-3 py-2 text-sm text-slate-800 font-medium focus:ring-2 focus:ring-[#00008f]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Project Manager
                </label>
                <input
                  type="text"
                  value={res.projectManager}
                  onChange={(e) => updateResourceLoading('projectManager', e.target.value)}
                  placeholder="e.g. Sophie Keller"
                  className="w-full bg-[#f8fafc] border border-slate-300 rounded px-3 py-2 text-sm text-slate-800 font-medium focus:ring-2 focus:ring-[#00008f]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Business Analyst
                </label>
                <input
                  type="text"
                  value={res.businessAnalyst}
                  onChange={(e) => updateResourceLoading('businessAnalyst', e.target.value)}
                  placeholder="e.g. Alexander Weber"
                  className="w-full bg-[#f8fafc] border border-slate-300 rounded px-3 py-2 text-sm text-slate-800 font-medium focus:ring-2 focus:ring-[#00008f]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Tech Lead
                </label>
                <input
                  type="text"
                  value={res.techLead}
                  onChange={(e) => updateResourceLoading('techLead', e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-[#f8fafc] border border-slate-300 rounded px-3 py-2 text-sm text-slate-800 font-medium focus:ring-2 focus:ring-[#00008f]"
                />
              </div>
            </div>

            {/* COLUMN 2 */}
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold text-[#00008f] uppercase tracking-wider pb-2 border-b border-slate-200">
                Architecture & Development
              </h4>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  IA Solution Architect
                </label>
                <input
                  type="text"
                  value={res.iaSolutionArchitect}
                  onChange={(e) => updateResourceLoading('iaSolutionArchitect', e.target.value)}
                  placeholder="e.g. Elena Rostova"
                  className="w-full bg-[#f8fafc] border border-slate-300 rounded px-3 py-2 text-sm text-slate-800 font-medium focus:ring-2 focus:ring-[#00008f]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  AI Solution Architect
                </label>
                <input
                  type="text"
                  value={res.aiSolutionArchitect}
                  onChange={(e) => updateResourceLoading('aiSolutionArchitect', e.target.value)}
                  placeholder="e.g. David Chen"
                  className="w-full bg-[#f8fafc] border border-slate-300 rounded px-3 py-2 text-sm text-slate-800 font-medium focus:ring-2 focus:ring-[#00008f]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  IA Developer 1
                </label>
                <input
                  type="text"
                  value={res.iaDeveloper1}
                  onChange={(e) => updateResourceLoading('iaDeveloper1', e.target.value)}
                  placeholder="e.g. Lucas Muller"
                  className="w-full bg-[#f8fafc] border border-slate-300 rounded px-3 py-2 text-sm text-slate-800 font-medium focus:ring-2 focus:ring-[#00008f]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  IA Developer 2
                </label>
                <input
                  type="text"
                  value={res.iaDeveloper2}
                  onChange={(e) => updateResourceLoading('iaDeveloper2', e.target.value)}
                  placeholder="e.g. Priya Nair"
                  className="w-full bg-[#f8fafc] border border-slate-300 rounded px-3 py-2 text-sm text-slate-800 font-medium focus:ring-2 focus:ring-[#00008f]"
                />
              </div>
            </div>

            {/* COLUMN 3 */}
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold text-[#00008f] uppercase tracking-wider pb-2 border-b border-slate-200">
                Data Science & QA Testing
              </h4>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  AI Data Scientist 1
                </label>
                <input
                  type="text"
                  value={res.aiDataScientist1}
                  onChange={(e) => updateResourceLoading('aiDataScientist1', e.target.value)}
                  placeholder="e.g. Ananya Patel"
                  className="w-full bg-[#f8fafc] border border-slate-300 rounded px-3 py-2 text-sm text-slate-800 font-medium focus:ring-2 focus:ring-[#00008f]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  AI Data Scientist 2
                </label>
                <input
                  type="text"
                  value={res.aiDataScientist2}
                  onChange={(e) => updateResourceLoading('aiDataScientist2', e.target.value)}
                  placeholder="e.g. Matteo Rossi"
                  className="w-full bg-[#f8fafc] border border-slate-300 rounded px-3 py-2 text-sm text-slate-800 font-medium focus:ring-2 focus:ring-[#00008f]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Tester 1
                </label>
                <input
                  type="text"
                  value={res.tester1}
                  onChange={(e) => updateResourceLoading('tester1', e.target.value)}
                  placeholder="e.g. Camille Laurent"
                  className="w-full bg-[#f8fafc] border border-slate-300 rounded px-3 py-2 text-sm text-slate-800 font-medium focus:ring-2 focus:ring-[#00008f]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Tester 2
                </label>
                <input
                  type="text"
                  value={res.tester2}
                  onChange={(e) => updateResourceLoading('tester2', e.target.value)}
                  placeholder="e.g. Daniel Schmidt"
                  className="w-full bg-[#f8fafc] border border-slate-300 rounded px-3 py-2 text-sm text-slate-800 font-medium focus:ring-2 focus:ring-[#00008f]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Project Specs (Grey header from Image 1 & 2) */}
      <div>
        <div className="bg-[#8b95a5] text-white px-5 py-2.5 rounded font-bold text-sm tracking-wide shadow-sm flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Project Specs</span>
          </div>
          <span className="text-xs font-normal text-slate-100">
            Governance, SteerCo & Sign-off Authorities
          </span>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {/* PS&C */}
            <div className="flex flex-col sm:flex-row sm:items-center">
              <label className="w-44 text-xs font-bold text-slate-700 bg-blue-100/70 border border-blue-200 px-3 py-2 rounded-l sm:rounded-r-none">
                PS&C
              </label>
              <input
                type="text"
                value={res.psAndC}
                onChange={(e) => updateResourceLoading('psAndC', e.target.value)}
                placeholder="e.g. AXA Commercial Operations"
                className="flex-1 bg-white border border-slate-300 rounded-r sm:rounded-l-none px-3 py-1.5 text-sm text-slate-800 font-medium focus:ring-1 focus:ring-[#00008f]"
              />
            </div>

            {/* Transformation Lead */}
            <div className="flex flex-col sm:flex-row sm:items-center">
              <label className="w-44 text-xs font-bold text-slate-700 bg-blue-100/70 border border-blue-200 px-3 py-2 rounded-l sm:rounded-r-none">
                Transformation Lead
              </label>
              <input
                type="text"
                value={res.transformationLead}
                onChange={(e) => updateResourceLoading('transformationLead', e.target.value)}
                placeholder="e.g. Olivier Renard"
                className="flex-1 bg-white border border-slate-300 rounded-r sm:rounded-l-none px-3 py-1.5 text-sm text-slate-800 font-medium focus:ring-1 focus:ring-[#00008f]"
              />
            </div>

            {/* Partner PM */}
            <div className="flex flex-col sm:flex-row sm:items-center">
              <label className="w-44 text-xs font-bold text-slate-700 bg-blue-100/70 border border-blue-200 px-3 py-2 rounded-l sm:rounded-r-none">
                Partner PM
              </label>
              <input
                type="text"
                value={res.partnerPM}
                onChange={(e) => updateResourceLoading('partnerPM', e.target.value)}
                placeholder="e.g. Christian Becker"
                className="flex-1 bg-white border border-slate-300 rounded-r sm:rounded-l-none px-3 py-1.5 text-sm text-slate-800 font-medium focus:ring-1 focus:ring-[#00008f]"
              />
            </div>

            {/* Business */}
            <div className="flex flex-col sm:flex-row sm:items-center">
              <label className="w-44 text-xs font-bold text-slate-700 bg-blue-100/70 border border-blue-200 px-3 py-2 rounded-l sm:rounded-r-none">
                Business
              </label>
              <input
                type="text"
                value={res.business}
                onChange={(e) => updateResourceLoading('business', e.target.value)}
                placeholder="e.g. Claims & Underwriting Tech"
                className="flex-1 bg-white border border-slate-300 rounded-r sm:rounded-l-none px-3 py-1.5 text-sm text-slate-800 font-medium focus:ring-1 focus:ring-[#00008f]"
              />
            </div>

            {/* SOW Sign Authority (From Image 2 line 50) */}
            <div className="flex flex-col sm:flex-row sm:items-center md:col-span-2">
              <label className="w-44 text-xs font-bold text-slate-700 bg-blue-100/70 border border-blue-200 px-3 py-2 rounded-l sm:rounded-r-none">
                SOW Sign Authority
              </label>
              <input
                type="text"
                value={res.sowSignAuthority}
                onChange={(e) => updateResourceLoading('sowSignAuthority', e.target.value)}
                placeholder="e.g. VP Global Technology Delivery"
                className="flex-1 bg-white border border-slate-300 rounded-r sm:rounded-l-none px-3 py-1.5 text-sm text-slate-800 font-medium focus:ring-1 focus:ring-[#00008f]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { GitBranch, Clock, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ProjectExtensionTab() {
  const { formData, setFormData, addToast } = useProject();
  const ext = formData.projectExtension;

  const [reason, setReason] = useState(ext.extensionReason);
  const [days, setDays] = useState(ext.extensionDays);
  const [budget, setBudget] = useState(ext.additionalBudget);
  const [targetDate, setTargetDate] = useState(ext.targetEndDate);

  const handleRequestExtension = (e) => {
    e.preventDefault();
    setFormData(prev => ({
      ...prev,
      projectExtension: {
        ...prev.projectExtension,
        hasExtension: true,
        extensionReason: reason,
        extensionDays: Number(days),
        additionalBudget: Number(budget),
        targetEndDate: targetDate,
        approvalStatus: 'Submitted - Pending Finance Sign-off'
      }
    }));
    addToast('Project Extension Request successfully logged! Notification sent to SteerCo.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* SECTION HEADER matching Excel tab: "Project Extenstion" */}
      <div className="bg-[#6b3074] text-white px-5 py-2.5 rounded font-bold text-sm tracking-wide shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <GitBranch className="w-4 h-4" />
          <span>Project Extension & Change Requests (PCR)</span>
        </div>
        <span className="text-xs font-normal text-purple-200">
          Scope Alterations, Duration Extension & SOW Addendum
        </span>
      </div>

      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-6">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start space-x-3 text-xs text-amber-900">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold">Governance Rule:</strong> Any schedule extension exceeding 30 calendar days or budget alteration over €20,000 EUR requires explicit sign-off from both Partner PM and AXA Technology Authority.
          </div>
        </div>

        <form onSubmit={handleRequestExtension} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Reason for Extension / Scope Modification <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded p-3 text-sm text-slate-800 focus:ring-2 focus:ring-[#00008f]"
              placeholder="Detail reasons for duration alteration, unexpected dependencies, or expanded requirements..."
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Additional Duration (Days)
              </label>
              <input
                type="number"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-sm text-slate-800 font-mono font-medium focus:ring-2 focus:ring-[#00008f]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Additional Budget ({formData.projectCosting.currency})
              </label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-sm text-slate-800 font-mono font-bold focus:ring-2 focus:ring-[#00008f]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Target Extended End Date
              </label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-sm text-slate-800 font-medium focus:ring-2 focus:ring-[#00008f]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <div className="text-xs text-slate-500 font-medium">
              Current Status: <span className="font-bold text-[#6b3074]">{ext.approvalStatus}</span>
            </div>

            <button
              type="submit"
              className="bg-[#6b3074] hover:bg-[#582660] text-white px-6 py-2.5 rounded font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center space-x-2"
            >
              <span>Submit Extension Request</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

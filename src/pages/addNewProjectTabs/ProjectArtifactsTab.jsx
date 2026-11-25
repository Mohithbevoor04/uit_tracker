import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { FileText, Download, Upload, CheckCircle2, FileCheck, ExternalLink, ShieldCheck } from 'lucide-react';

export default function ProjectArtifactsTab() {
  const { formData, addToast } = useProject();
  const artifacts = formData.projectArtifacts;

  const handleUploadMock = () => {
    addToast('Document upload simulated: New artifact uploaded to SharePoint document library.', 'info');
  };

  return (
    <div className="space-y-6">
      {/* SECTION HEADER */}
      <div className="bg-[#6b3074] text-white px-5 py-2.5 rounded font-bold text-sm tracking-wide shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileCheck className="w-4 h-4" />
          <span>Project Artifacts & Audit Documentation</span>
        </div>
        <span className="text-xs font-normal text-purple-200">
          SOWs, Architecture Blueprints, Rate Cards & Sign-offs
        </span>
      </div>

      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Registered Documents & Governance Repository
            </h4>
            <p className="text-xs text-slate-500">
              All documents are archived with immutable SharePoint checksums.
            </p>
          </div>

          <button
            type="button"
            onClick={handleUploadMock}
            className="flex items-center space-x-2 bg-[#00008f] hover:bg-[#000070] text-white px-4 py-2 rounded text-xs font-bold shadow transition-all self-start sm:self-auto"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload New Artifact</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {artifacts.map((doc) => (
            <div
              key={doc.id}
              className="border border-slate-200 rounded-lg p-4 bg-slate-50 hover:bg-white hover:border-purple-300 transition-all flex items-start justify-between group shadow-sm"
            >
              <div className="flex items-start space-x-3">
                <div className="p-2.5 bg-purple-100 text-[#6b3074] rounded-lg">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-800 group-hover:text-[#00008f] transition-colors">
                    {doc.name}
                  </h5>
                  <div className="flex items-center space-x-2 text-[11px] text-slate-500 mt-1">
                    <span className="font-semibold text-slate-700">{doc.type}</span>
                    <span>•</span>
                    <span>{doc.size}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Uploaded by {doc.uploadedBy} on {doc.date}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end space-y-2">
                <span className="inline-flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  Verified
                </span>
                <button
                  type="button"
                  onClick={() => addToast(`Downloading ${doc.name} from SharePoint...`, 'info')}
                  className="text-slate-400 hover:text-[#00008f] p-1"
                  title="Download File"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

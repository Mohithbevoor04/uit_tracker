import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Save, 
  ArrowLeft, 
  Layers, 
  Calendar, 
  DollarSign, 
  Users, 
  FileCheck2, 
  GitBranch 
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';

// Tab components
import GeneralInfoTab from './addNewProjectTabs/GeneralInfoTab';
import ResourceLoadingTab from './addNewProjectTabs/ResourceLoadingTab';
import ProjectCostingTab from './addNewProjectTabs/ProjectCostingTab';
import ProjectScheduleTab from './addNewProjectTabs/ProjectScheduleTab';
import ProjectArtifactsTab from './addNewProjectTabs/ProjectArtifactsTab';
import ProjectExtensionTab from './addNewProjectTabs/ProjectExtensionTab';

export default function AddNewProjectPage() {
  const navigate = useNavigate();
  const { saveProject, formData } = useProject();

  // Active sub-tab state (Exact 6 tabs from Excel)
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General Information', icon: Layers },
    { id: 'resource', label: 'Resource Loading', icon: Users },
    { id: 'costing', label: 'Project Costing', icon: DollarSign },
    { id: 'schedule', label: 'Project Schedule', icon: Calendar },
    { id: 'artifacts', label: 'Project Artifacts', icon: FileCheck2 },
    { id: 'extension', label: 'Project Extenstion', icon: GitBranch },
  ];

  const handleSave = () => {
    saveProject();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28">
      {/* Top Breadcrumb & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-200 gap-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/project-definition')}
            className="p-2 bg-white border border-slate-300 rounded-lg text-slate-600 hover:text-[#00008f] hover:border-slate-400 transition-colors shadow-sm"
            title="Back to Project Search"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                Master Form
              </span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-slate-500 text-xs">SharePoint Excel Sync Active</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
              Add New Project Definition
            </h1>
          </div>
        </div>

        {/* Global Save Button at top */}
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={handleSave}
            className="bg-[#00008f] hover:bg-[#000070] text-white px-5 py-2.5 rounded-lg font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>SAVE PROJECT</span>
          </button>
        </div>
      </div>

      {/* Excel Navigation Tabs Ribbon (The 6 original tabs) */}
      <div className="bg-slate-200 p-1 rounded-xl flex items-center space-x-1 overflow-x-auto shadow-inner mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[145px] py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 whitespace-nowrap ${
                isActive
                  ? 'bg-[#6b3074] text-white shadow-md'
                  : 'text-slate-700 hover:bg-slate-300/70 hover:text-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="transition-all duration-200">
        {activeTab === 'general' && <GeneralInfoTab onSave={handleSave} />}
        {activeTab === 'resource' && <ResourceLoadingTab />}
        {activeTab === 'costing' && <ProjectCostingTab />}
        {activeTab === 'schedule' && <ProjectScheduleTab />}
        {activeTab === 'artifacts' && <ProjectArtifactsTab />}
        {activeTab === 'extension' && <ProjectExtensionTab />}
      </div>
    </div>
  );
}

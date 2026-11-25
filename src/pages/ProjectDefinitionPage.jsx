import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  RotateCcw, 
  Plus, 
  FileText, 
  ArrowRight, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Building2,
  Globe2,
  Trash2,
  ExternalLink,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';

export default function ProjectDefinitionPage() {
  const navigate = useNavigate();
  const { projects, deleteProject, setFormData } = useProject();

  // Search filter states exactly from Image 4
  const [recentSearch, setRecentSearch] = useState('');
  const [savedSearch, setSavedSearch] = useState('');
  
  const [businessUnit, setBusinessUnit] = useState('DAAS-IA');
  const [geo, setGeo] = useState('Non-UKI');
  const [partner, setPartner] = useState('AXA DE');
  const [status, setStatus] = useState('Closed');
  
  const [projectMatchCriteria, setProjectMatchCriteria] = useState('Begins with');
  const [projectQuery, setProjectQuery] = useState('');

  const [hasSearched, setHasSearched] = useState(false);
  const [isFilterActive, setIsFilterActive] = useState(false);

  // Handle Search Execution
  const filteredProjects = useMemo(() => {
    if (!isFilterActive) {
      // By default or before search, show all or filtered by default
      return projects;
    }

    return projects.filter(project => {
      // Business Unit check
      if (businessUnit && businessUnit !== 'All' && !project.businessUnit?.toLowerCase().includes(businessUnit.toLowerCase())) {
        return false;
      }
      // Geo check
      if (geo && geo !== 'All' && !project.geo?.toLowerCase().includes(geo.toLowerCase())) {
        return false;
      }
      // Partner check
      if (partner && partner !== 'All' && !project.partner?.toLowerCase().includes(partner.toLowerCase())) {
        return false;
      }
      // Status check
      if (status && status !== 'All' && project.status?.toLowerCase() !== status.toLowerCase()) {
        return false;
      }
      // Project name / code match check
      if (projectQuery.trim()) {
        const target = (project.projectCode + ' ' + project.projectName).toLowerCase();
        const term = projectQuery.trim().toLowerCase();
        if (projectMatchCriteria === 'Begins with') {
          if (!project.projectCode.toLowerCase().startsWith(term) && !project.projectName.toLowerCase().startsWith(term)) {
            return false;
          }
        } else if (projectMatchCriteria === 'Equals') {
          if (project.projectCode.toLowerCase() !== term && project.projectName.toLowerCase() !== term) {
            return false;
          }
        } else {
          // Contains
          if (!target.includes(term)) {
            return false;
          }
        }
      }
      return true;
    });
  }, [projects, businessUnit, geo, partner, status, projectMatchCriteria, projectQuery, isFilterActive]);

  const handleSearch = () => {
    setIsFilterActive(true);
    setHasSearched(true);
  };

  const handleClear = () => {
    setBusinessUnit('');
    setGeo('');
    setPartner('');
    setStatus('All');
    setProjectQuery('');
    setRecentSearch('');
    setSavedSearch('');
    setIsFilterActive(false);
    setHasSearched(false);
  };

  const handleApplyPreset = (type, val) => {
    if (!val) return;
    if (val === 'non_uki_closed') {
      setBusinessUnit('DAAS-IA');
      setGeo('Non-UKI');
      setPartner('AXA DE');
      setStatus('Closed');
    } else if (val === 'all_open') {
      setBusinessUnit('DAAS-IA');
      setGeo('All');
      setPartner('All');
      setStatus('Open');
    } else if (val === 'high_value') {
      setBusinessUnit('DAAS-IA');
      setGeo('All');
      setPartner('All');
      setStatus('All');
    }
    setIsFilterActive(true);
    setHasSearched(true);
  };

  const handleEditProject = (project) => {
    if (project.fullDetails) {
      setFormData(project.fullDetails);
    }
    navigate('/add-new-project');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
      {/* Excel Sheet Header Bar matching Image 4 */}
      <div className="bg-[#6b3074] text-white rounded-t-xl px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded bg-white/20 flex items-center justify-center font-bold">
            PS
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wide">Project Search</h1>
            <p className="text-xs text-purple-200">
              Find an Existing Value or create new project records
            </p>
          </div>
        </div>

        {/* The "Add a New Value" button / tab with Plus icon requested by user */}
        <div className="mt-4 sm:mt-0 flex items-center space-x-2">
          <button
            onClick={() => navigate('/add-new-project')}
            className="group flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg font-bold text-sm shadow-md transition-all duration-200 hover:shadow-lg active:scale-95"
          >
            <div className="bg-white/20 p-1 rounded-full group-hover:rotate-90 transition-transform duration-200">
              <Plus className="w-4 h-4" />
            </div>
            <span>Add a New Value</span>
          </button>
        </div>
      </div>

      {/* Main Search Panel container */}
      <div className="bg-white rounded-b-xl border border-t-0 border-slate-200 shadow-sm p-6 mb-8">
        {/* Sub-header navigation row */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-6">
          <div className="flex items-center space-x-6 text-sm font-semibold">
            <span className="text-[#00008f] border-b-2 border-[#00008f] pb-3 -mb-3 flex items-center">
              <Filter className="w-4 h-4 mr-1.5" />
              Find an Existing Value
            </span>
            <button
              onClick={() => navigate('/add-new-project')}
              className="text-slate-500 hover:text-emerald-700 pb-3 -mb-3 flex items-center transition-colors"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Add a New Value
            </button>
          </div>

          <div className="text-xs text-slate-400">
            Form Code: <span className="font-mono font-medium text-slate-600">FRM-AXA-PRJ-01</span>
          </div>
        </div>

        {/* Dropdown presets row (Recent Searches & Saved Searches) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Recent Searches
            </label>
            <div className="relative">
              <select
                value={recentSearch}
                onChange={(e) => {
                  setRecentSearch(e.target.value);
                  handleApplyPreset('recent', e.target.value);
                }}
                className="w-full bg-white border border-slate-300 rounded-md py-2 px-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00008f] focus:border-transparent"
              >
                <option value="">-- Select from Recent Searches --</option>
                <option value="non_uki_closed">DAAS-IA | Non-UKI | AXA DE | Closed</option>
                <option value="all_open">DAAS-IA | All Geos | Open Status</option>
                <option value="high_value">High Value Portfolio (&gt; €300k)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Saved Searches
            </label>
            <div className="relative">
              <select
                value={savedSearch}
                onChange={(e) => {
                  setSavedSearch(e.target.value);
                  handleApplyPreset('saved', e.target.value);
                }}
                className="w-full bg-white border border-slate-300 rounded-md py-2 px-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00008f] focus:border-transparent"
              >
                <option value="">-- Select from Saved Searches --</option>
                <option value="non_uki_closed">DAAS-IA Non-UKI Delivery Pipeline</option>
                <option value="all_open">Active Q4 Claims Deployments</option>
                <option value="high_value">Industrial Automation Germany Cohort</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search Input Criteria Fields matching Image 4 */}
        <div className="bg-[#f8fafc] border border-slate-200 rounded-lg p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 max-w-4xl">
            {/* Business Unit */}
            <div className="flex flex-col sm:flex-row sm:items-center">
              <label className="w-36 text-xs font-bold text-slate-700 bg-blue-100/70 border border-blue-200 px-3 py-2 rounded-l sm:rounded-r-none">
                Business Unit
              </label>
              <input
                type="text"
                value={businessUnit}
                onChange={(e) => setBusinessUnit(e.target.value)}
                placeholder="e.g. DAAS-IA"
                className="flex-1 bg-white border border-slate-300 rounded-r sm:rounded-l-none px-3 py-1.5 text-sm text-slate-800 font-medium focus:ring-1 focus:ring-[#00008f] focus:border-[#00008f]"
              />
            </div>

            {/* Geo */}
            <div className="flex flex-col sm:flex-row sm:items-center">
              <label className="w-36 text-xs font-bold text-slate-700 bg-blue-100/70 border border-blue-200 px-3 py-2 rounded-l sm:rounded-r-none">
                Geo
              </label>
              <input
                type="text"
                value={geo}
                onChange={(e) => setGeo(e.target.value)}
                placeholder="e.g. Non-UKI"
                className="flex-1 bg-white border border-slate-300 rounded-r sm:rounded-l-none px-3 py-1.5 text-sm text-slate-800 font-medium focus:ring-1 focus:ring-[#00008f] focus:border-[#00008f]"
              />
            </div>

            {/* Partner */}
            <div className="flex flex-col sm:flex-row sm:items-center">
              <label className="w-36 text-xs font-bold text-slate-700 bg-blue-100/70 border border-blue-200 px-3 py-2 rounded-l sm:rounded-r-none">
                Partner
              </label>
              <input
                type="text"
                value={partner}
                onChange={(e) => setPartner(e.target.value)}
                placeholder="e.g. AXA DE"
                className="flex-1 bg-white border border-slate-300 rounded-r sm:rounded-l-none px-3 py-1.5 text-sm text-slate-800 font-medium focus:ring-1 focus:ring-[#00008f] focus:border-[#00008f]"
              />
            </div>

            {/* Status */}
            <div className="flex flex-col sm:flex-row sm:items-center">
              <label className="w-36 text-xs font-bold text-slate-700 bg-blue-100/70 border border-blue-200 px-3 py-2 rounded-l sm:rounded-r-none">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="flex-1 bg-white border border-slate-300 rounded-r sm:rounded-l-none px-3 py-1.5 text-sm text-slate-800 font-medium focus:ring-1 focus:ring-[#00008f] focus:border-[#00008f]"
              >
                <option value="All">All Statuses</option>
                <option value="Closed">Closed</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>

            {/* Project Filter (Begins with + text input) */}
            <div className="flex flex-col sm:flex-row sm:items-center md:col-span-2">
              <label className="w-36 text-xs font-bold text-slate-700 bg-blue-100/70 border border-blue-200 px-3 py-2 rounded-l sm:rounded-r-none">
                Project
              </label>
              <div className="flex-1 flex flex-col sm:flex-row">
                <select
                  value={projectMatchCriteria}
                  onChange={(e) => setProjectMatchCriteria(e.target.value)}
                  className="sm:w-36 bg-slate-100 border border-slate-300 px-3 py-1.5 text-xs text-slate-700 font-semibold focus:outline-none"
                >
                  <option value="Begins with">Begins with</option>
                  <option value="Contains">Contains</option>
                  <option value="Equals">Equals</option>
                </select>
                <input
                  type="text"
                  value={projectQuery}
                  onChange={(e) => setProjectQuery(e.target.value)}
                  placeholder="Enter project code or name (e.g. DAAS or Claims)"
                  className="flex-1 bg-white border border-slate-300 rounded-r px-3 py-1.5 text-sm text-slate-800 font-medium focus:ring-1 focus:ring-[#00008f] focus:border-[#00008f]"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons: Search & Clear (Image 4 bottom) */}
          <div className="flex items-center space-x-4 mt-6 pt-4 border-t border-slate-200">
            <button
              onClick={handleSearch}
              className="bg-[#00008f] hover:bg-[#000070] text-white px-7 py-2 rounded font-bold text-xs shadow transition-all duration-150 flex items-center space-x-2"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
            </button>

            <button
              onClick={handleClear}
              className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-2 rounded font-semibold text-xs transition-colors flex items-center space-x-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Quick redirect prompt banner */}
        <div className="mt-6 p-3.5 bg-purple-50 rounded-lg border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-purple-900 gap-2">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#6b3074]" />
            <span>Need to onboard a new engagement? Click <strong>Add a New Value</strong> to launch the project definition wizard.</span>
          </div>
          <button
            onClick={() => navigate('/add-new-project')}
            className="font-bold text-[#6b3074] hover:text-[#522059] flex items-center space-x-1 underline"
          >
            <span>Proceed to Add New Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Search Results Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center">
              <span>Search Results</span>
              <span className="ml-2 bg-blue-100 text-[#00008f] text-xs font-bold px-2 py-0.5 rounded-full">
                {filteredProjects.length} found
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              {isFilterActive ? 'Showing filtered projects based on your search criteria.' : 'Showing all registered portfolio projects.'}
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-500">Click any row to open or edit</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-4">Project Code</th>
                <th className="py-3 px-4">Project Name</th>
                <th className="py-3 px-4">Business Unit</th>
                <th className="py-3 px-4">Geo</th>
                <th className="py-3 px-4">Partner</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">SOW Value</th>
                <th className="py-3 px-4">Total Cost</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan="10" className="py-12 text-center text-slate-400">
                    <div className="max-w-sm mx-auto text-center space-y-2">
                      <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
                      <p className="font-semibold text-slate-600">No projects found matching the criteria.</p>
                      <p className="text-xs text-slate-400">Try adjusting your filters, or click "Clear" to reset the search.</p>
                      <button
                        onClick={handleClear}
                        className="mt-2 text-xs font-bold text-[#00008f] underline"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProjects.map((p) => {
                  let statusBadge = 'bg-slate-100 text-slate-700 border-slate-200';
                  if (p.status === 'Closed') statusBadge = 'bg-rose-50 text-rose-700 border-rose-200';
                  if (p.status === 'Open') statusBadge = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                  if (p.status === 'In Progress') statusBadge = 'bg-blue-50 text-blue-700 border-blue-200';

                  return (
                    <tr
                      key={p.id}
                      onClick={() => handleEditProject(p)}
                      className="hover:bg-blue-50/50 cursor-pointer transition-colors group"
                    >
                      <td className="py-3 px-4 font-mono font-bold text-[#00008f] flex items-center space-x-1.5">
                        <span>{p.projectCode}</span>
                        <ExternalLink className="w-3 h-3 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </td>
                      <td className="py-3 px-4 font-medium max-w-xs truncate" title={p.projectName}>
                        {p.projectName}
                      </td>
                      <td className="py-3 px-4 text-slate-600">{p.businessUnit}</td>
                      <td className="py-3 px-4 text-slate-600">{p.geo}</td>
                      <td className="py-3 px-4 text-slate-600 font-medium">{p.partner}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold border ${statusBadge}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{p.projectType}</td>
                      <td className="py-3 px-4 font-mono font-semibold text-slate-800">
                        {p.currency === 'USD' ? '$' : p.currency === 'GBP' ? '£' : '€'}
                        {(p.sowValue || 0).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 font-mono font-semibold text-emerald-700">
                        {p.currency === 'USD' ? '$' : p.currency === 'GBP' ? '£' : '€'}
                        {(p.totalCost || 0).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleEditProject(p)}
                            className="p-1 hover:bg-slate-200 rounded text-slate-600 hover:text-[#00008f]"
                            title="Edit / View Project"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteProject(p.id)}
                            className="p-1 hover:bg-rose-100 rounded text-slate-400 hover:text-rose-600"
                            title="Delete Project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

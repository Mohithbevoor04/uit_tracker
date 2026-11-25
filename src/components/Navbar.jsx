import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Building2, 
  Search, 
  Bell, 
  Layers, 
  ChevronRight, 
  Home, 
  FolderGit2, 
  PlusCircle,
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';

export default function Navbar() {
  const location = useLocation();
  const { projects } = useProject();

  const getBreadcrumb = () => {
    switch (location.pathname) {
      case '/':
        return 'App Launch Page';
      case '/project-definition':
        return 'Project Definitions';
      case '/add-new-project':
        return 'Add New Project';
      default:
        return 'Project Management';
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      {/* Top corporate ribbon */}
      <div className="bg-[#00008f] text-white px-4 py-1.5 text-xs flex justify-between items-center tracking-wide font-medium">
        <div className="flex items-center space-x-3">
          <span className="font-black bg-white text-[#00008f] px-1.5 py-0.5 rounded text-[10px] tracking-widest">AXA</span>
          <span className="opacity-90">AXA Global Business Services | Industrial Automation & Cognitive Delivery</span>
        </div>
        <div className="flex items-center space-x-4 opacity-90">
          <span>Environment: Production 2.4</span>
          <span className="h-3 w-px bg-blue-300 opacity-50"></span>
          <span>Logged in: Delivery Lead</span>
        </div>
      </div>

      {/* Main app header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-lg bg-[#6b3074] flex items-center justify-center text-white shadow-md group-hover:bg-[#582660] transition-colors">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800 leading-tight">
                  Project Management App
                </h1>
                <p className="text-xs text-slate-500 font-medium">
                  Portfolio Planning, Costing & Resource Management
                </p>
              </div>
            </Link>

            {/* Breadcrumb path */}
            <div className="hidden md:flex items-center space-x-2 text-sm text-slate-500 pl-4 border-l border-slate-200">
              <Link to="/" className="hover:text-[#00008f] flex items-center">
                <Home className="w-3.5 h-3.5 mr-1" />
                Hub
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-xs">
                {getBreadcrumb()}
              </span>
            </div>
          </div>

          {/* Quick Action Navigation links */}
          <nav className="flex items-center space-x-1 sm:space-x-3">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                location.pathname === '/'
                  ? 'bg-purple-100 text-[#6b3074] font-semibold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Launch Page</span>
            </Link>

            <Link
              to="/project-definition"
              className={`px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                location.pathname === '/project-definition'
                  ? 'bg-blue-100 text-[#00008f] font-semibold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Project Definition</span>
              <span className="bg-slate-200 text-slate-700 text-[10px] px-1.5 py-0.2 rounded-full font-bold ml-1">
                {projects.length}
              </span>
            </Link>

            <Link
              to="/add-new-project"
              className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-medium transition-all shadow-sm flex items-center space-x-1.5 ${
                location.pathname === '/add-new-project'
                  ? 'bg-[#6b3074] text-white shadow-purple-200 shadow-md ring-2 ring-purple-300'
                  : 'bg-[#00008f] hover:bg-[#000070] text-white'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Project</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

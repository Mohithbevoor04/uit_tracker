import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProjectProvider } from './context/ProjectContext';
import Navbar from './components/Navbar';
import SubNavTabs from './components/SubNavTabs';
import ToastNotification from './components/ToastNotification';

// Pages
import AppLaunchPage from './pages/AppLaunchPage';
import ProjectDefinitionPage from './pages/ProjectDefinitionPage';
import AddNewProjectPage from './pages/AddNewProjectPage';

export default function App() {
  return (
    <ProjectProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#f1f4f9] text-slate-800 flex flex-col font-sans">
          {/* Top AXA Header */}
          <Navbar />

          {/* Interactive Floating Toasts */}
          <ToastNotification />

          {/* Main Workspace View */}
          <main className="flex-1">
            <Routes>
              {/* Image 5: Project Management App Launch Page */}
              <Route path="/" element={<AppLaunchPage />} />

              {/* Image 4: Project Search / Definition Directory */}
              <Route path="/project-definition" element={<ProjectDefinitionPage />} />

              {/* Image 3, 1, 2: Add New Project with General Info, Resource Loading, Costing */}
              <Route path="/add-new-project" element={<AddNewProjectPage />} />

              {/* Fallback to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Excel / SharePoint Bottom Sheet Tabs */}
          <SubNavTabs />
        </div>
      </BrowserRouter>
    </ProjectProvider>
  );
}

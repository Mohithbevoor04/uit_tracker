import React, { createContext, useContext, useState, useEffect } from 'react';

const ProjectContext = createContext(null);

const INITIAL_PROJECTS = [
  {
    id: 'PRJ-2026-001',
    projectCode: 'DAAS-IA-001',
    projectName: 'Claims Automation Engine DE',
    businessUnit: 'DAAS-IA',
    geo: 'Non-UKI',
    partner: 'AXA DE',
    status: 'Closed',
    projectType: 'Staff Aug',
    sowStatus: 'Signed',
    currency: 'EUR',
    sowValue: 245000,
    totalCost: 218400,
    pm: 'Sophie Keller',
    techLead: 'Rahul Sharma',
    updatedAt: '2026-11-20'
  },
  {
    id: 'PRJ-2026-002',
    projectCode: 'DAAS-IA-002',
    projectName: 'Cognitive Document Processing GBS',
    businessUnit: 'DAAS-IA',
    geo: 'Non-UKI',
    partner: 'AXA DE',
    status: 'In Progress',
    projectType: 'Time & Material',
    sowStatus: 'Signed',
    currency: 'EUR',
    sowValue: 380000,
    totalCost: 310500,
    pm: 'Christian Becker',
    techLead: 'Elena Rostova',
    updatedAt: '2026-11-22'
  },
  {
    id: 'PRJ-2026-003',
    projectCode: 'DAAS-IA-003',
    projectName: 'Fraud Detection AI Pipeline',
    businessUnit: 'DAAS-IA',
    geo: 'UKI',
    partner: 'AXA UK',
    status: 'Open',
    projectType: 'Fixed Price',
    sowStatus: 'Signed',
    currency: 'GBP',
    sowValue: 420000,
    totalCost: 390000,
    pm: 'David Chen',
    techLead: 'Ananya Patel',
    updatedAt: '2026-11-18'
  },
  {
    id: 'PRJ-2026-004',
    projectCode: 'DAAS-IA-004',
    projectName: 'Underwriting RPA Bot Suite',
    businessUnit: 'DAAS-IA',
    geo: 'Non-UKI',
    partner: 'AXA FR',
    status: 'Open',
    projectType: 'Staff Aug',
    sowStatus: 'In Review',
    currency: 'EUR',
    sowValue: 195000,
    totalCost: 172000,
    pm: 'Sophie Keller',
    techLead: 'Lucas Muller',
    updatedAt: '2026-11-15'
  },
  {
    id: 'PRJ-2026-005',
    projectCode: 'DAAS-IA-005',
    projectName: 'Bilingual Policy Bot Assistant',
    businessUnit: 'DAAS-IA',
    geo: 'Americas',
    partner: 'AXA XL',
    status: 'Closed',
    projectType: 'Milestone',
    sowStatus: 'Signed',
    currency: 'USD',
    sowValue: 510000,
    totalCost: 480000,
    pm: 'Alexander Weber',
    techLead: 'David Chen',
    updatedAt: '2026-11-10'
  }
];

const INITIAL_RATE_TABLE = [
  { id: 1, role: 'Tribe Lead', rateCard: 650, durationDays: 60, allocationPct: 25 },
  { id: 2, role: 'Project Manager', rateCard: 550, durationDays: 120, allocationPct: 100 },
  { id: 3, role: 'Business Analyst', rateCard: 450, durationDays: 90, allocationPct: 100 },
  { id: 4, role: 'IA Solution Architect', rateCard: 600, durationDays: 80, allocationPct: 50 },
  { id: 5, role: 'IA Developer', rateCard: 400, durationDays: 120, allocationPct: 100 },
  { id: 6, role: 'AI Engineer', rateCard: 500, durationDays: 100, allocationPct: 100 },
  { id: 7, role: 'Sr. AI Architect', rateCard: 700, durationDays: 60, allocationPct: 50 },
  { id: 8, role: 'Tester', rateCard: 350, durationDays: 60, allocationPct: 100 }
];

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('axa_projects');
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  const [toasts, setToasts] = useState([]);

  // Form State for "Add New Project"
  const [formData, setFormData] = useState({
    // General Information
    generalInfo: {
      tribeGeo: 'Non-UKI',
      entity: 'AXA Business Services',
      business: 'CFS',
      description: 'Industrial Automation and Cognitive Processing framework to streamline cross-entity underwriting and claims settlements with SLA tracking.',
      projectType: 'Staff Aug',
      toolStackRPA: 'UiPath',
      toolStackAI: 'Azure AI',
      sowStatus: 'Signed',
      sowLink: 'https://axa365.sharepoint.com/:x:/r/sites/IndustrialAutomation-AXAGBS2/sow_signed_2026.pdf'
    },
    // Resource Loading
    resourceLoading: {
      tribeLead: 'Marc Dupont',
      projectManager: 'Sophie Keller',
      businessAnalyst: 'Alexander Weber',
      techLead: 'Rahul Sharma',
      iaSolutionArchitect: 'Elena Rostova',
      aiSolutionArchitect: 'David Chen',
      iaDeveloper1: 'Lucas Muller',
      iaDeveloper2: 'Priya Nair',
      aiDataScientist1: 'Ananya Patel',
      aiDataScientist2: 'Matteo Rossi',
      tester1: 'Camille Laurent',
      tester2: 'Daniel Schmidt',
      // Project Specs
      psAndC: 'AXA Commercial Operations',
      transformationLead: 'Olivier Renard',
      partnerPM: 'Christian Becker',
      business: 'Claims & Underwriting Tech',
      sowSignAuthority: 'VP Global Technology Delivery'
    },
    // Project Costing
    projectCosting: {
      currency: 'EUR',
      sowValue: 285000,
      talentCost: 0,
      infraCost: 14500,
      licenseCost: 22000,
      bauCost: 8500,
      rateTable: INITIAL_RATE_TABLE
    },
    // Project Schedule
    projectSchedule: [
      { id: 1, phase: 'Phase 1: Inception & Architecture Blueprint', startDate: '2026-12-01', endDate: '2026-12-20', status: 'Completed', owner: 'Elena Rostova' },
      { id: 2, phase: 'Phase 2: RPA Bot Core Workflow Build', startDate: '2027-01-05', endDate: '2027-02-28', status: 'In Progress', owner: 'Lucas Muller' },
      { id: 3, phase: 'Phase 3: AI Cognitive Document Parser', startDate: '2027-02-15', endDate: '2027-03-31', status: 'Not Started', owner: 'David Chen' },
      { id: 4, phase: 'Phase 4: SIT & Business Acceptance (UAT)', startDate: '2027-04-01', endDate: '2027-04-30', status: 'Not Started', owner: 'Camille Laurent' },
      { id: 5, phase: 'Phase 5: Production Deployment & Hypercare', startDate: '2027-05-01', endDate: '2027-05-30', status: 'Not Started', owner: 'Sophie Keller' }
    ],
    // Project Artifacts
    projectArtifacts: [
      { id: 1, name: 'SOW_IndustrialAutomation_Signed.pdf', type: 'Statement of Work', size: '2.4 MB', uploadedBy: 'Christian Becker', date: '2026-11-15', verified: true },
      { id: 2, name: 'Architecture_Design_Document_v2.docx', type: 'Technical Spec', size: '4.8 MB', uploadedBy: 'Elena Rostova', date: '2026-11-19', verified: true },
      { id: 3, name: 'Rate_Card_Matrix_2026.xlsx', type: 'Financial Agreement', size: '512 KB', uploadedBy: 'Sophie Keller', date: '2026-11-21', verified: true },
      { id: 4, name: 'UAT_Signoff_Criteria.pdf', type: 'Quality Assurance', size: '1.1 MB', uploadedBy: 'Camille Laurent', date: '2026-11-23', verified: false }
    ],
    // Project Extension
    projectExtension: {
      hasExtension: false,
      extensionReason: 'Additional scope for multilingual NLP parsing (French & German policies)',
      extensionDays: 45,
      additionalBudget: 42000,
      approvalStatus: 'Pending Review',
      requestedBy: 'Sophie Keller',
      targetEndDate: '2027-07-15'
    }
  });

  // Calculate talent cost automatically from rate table
  useEffect(() => {
    const calculatedTalent = formData.projectCosting.rateTable.reduce((acc, row) => {
      const cost = (Number(row.rateCard) || 0) * (Number(row.durationDays) || 0) * ((Number(row.allocationPct) || 100) / 100);
      return acc + cost;
    }, 0);

    setFormData(prev => ({
      ...prev,
      projectCosting: {
        ...prev.projectCosting,
        talentCost: calculatedTalent
      }
    }));
  }, [formData.projectCosting.rateTable]);

  // Persist projects to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('axa_projects', JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to save projects to localStorage:', e);
    }
  }, [projects]);

  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Save new project function
  const saveProject = () => {
    const newIdNum = projects.length + 1;
    const projectCode = `DAAS-IA-${String(newIdNum).padStart(3, '0')}`;
    const projectId = `PRJ-AXA-2026-${String(newIdNum).padStart(3, '0')}`;
    
    const totalCost = Number(formData.projectCosting.talentCost) + 
      Number(formData.projectCosting.infraCost) + 
      Number(formData.projectCosting.licenseCost) + 
      Number(formData.projectCosting.bauCost);

    const newProject = {
      id: projectId,
      projectCode,
      projectName: formData.generalInfo.description.slice(0, 45) || `Project ${projectCode}`,
      businessUnit: 'DAAS-IA',
      geo: formData.generalInfo.tribeGeo,
      partner: formData.resourceLoading.partnerPM ? `AXA (${formData.resourceLoading.partnerPM.split(' ')[0]})` : 'AXA DE',
      status: 'Open',
      projectType: formData.generalInfo.projectType,
      sowStatus: formData.generalInfo.sowStatus,
      currency: formData.projectCosting.currency,
      sowValue: Number(formData.projectCosting.sowValue) || 0,
      totalCost,
      pm: formData.resourceLoading.projectManager || 'Unassigned',
      techLead: formData.resourceLoading.techLead || 'Unassigned',
      updatedAt: new Date().toISOString().slice(0, 10),
      fullDetails: { ...formData }
    };

    setProjects(prev => [newProject, ...prev]);
    
    // Notification as shown in the Excel prompt: "After saving, create a project ID and notify"
    addToast(`Project successfully created! Assigned Project ID: ${projectId}. Stakeholders & Finance team notified.`, 'success');
    return newProject;
  };

  const updateGeneralInfo = (field, value) => {
    setFormData(prev => ({
      ...prev,
      generalInfo: { ...prev.generalInfo, [field]: value }
    }));
  };

  const updateResourceLoading = (field, value) => {
    setFormData(prev => ({
      ...prev,
      resourceLoading: { ...prev.resourceLoading, [field]: value }
    }));
  };

  const updateProjectCosting = (field, value) => {
    setFormData(prev => ({
      ...prev,
      projectCosting: { ...prev.projectCosting, [field]: value }
    }));
  };

  const updateRateTableRow = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      projectCosting: {
        ...prev.projectCosting,
        rateTable: prev.projectCosting.rateTable.map(row => 
          row.id === id ? { ...row, [field]: value } : row
        )
      }
    }));
  };

  const addRateTableRow = () => {
    const newId = Date.now();
    setFormData(prev => ({
      ...prev,
      projectCosting: {
        ...prev.projectCosting,
        rateTable: [
          ...prev.projectCosting.rateTable,
          { id: newId, role: 'New Role', rateCard: 400, durationDays: 30, allocationPct: 100 }
        ]
      }
    }));
  };

  const removeRateTableRow = (id) => {
    setFormData(prev => ({
      ...prev,
      projectCosting: {
        ...prev.projectCosting,
        rateTable: prev.projectCosting.rateTable.filter(row => row.id !== id)
      }
    }));
  };

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    addToast(`Project ${id} has been removed.`, 'info');
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      formData,
      toasts,
      addToast,
      removeToast,
      saveProject,
      deleteProject,
      updateGeneralInfo,
      updateResourceLoading,
      updateProjectCosting,
      updateRateTableRow,
      addRateTableRow,
      removeRateTableRow,
      setFormData
    }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}

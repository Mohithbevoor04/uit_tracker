import React, { createContext, useContext, useState, useEffect } from 'react';

const ProjectContext = createContext(null);

// Exchange rates to EUR base
export const CURRENCY_RATES_TO_EUR = {
  EUR: 1.0,
  GBP: 1.17, // 1 GBP = 1.17 EUR
  USD: 0.92, // 1 USD = 0.92 EUR
  CHF: 1.05, // 1 CHF = 1.05 EUR
  INR: 0.011 // 1 INR = 0.011 EUR
};

export const convertToEur = (amount, currency = 'EUR') => {
  const rate = CURRENCY_RATES_TO_EUR[currency] || 1.0;
  return (Number(amount) || 0) * rate;
};

// Department Categorization for Roles
export const getRoleDepartment = (roleName = '') => {
  const r = roleName.toLowerCase();
  if (
    r.includes('project manager') || 
    r.includes('business analyst') || 
    r.includes('pm') || 
    r.includes('ba')
  ) {
    return 'CNT';
  }
  if (
    r.includes('ai') || 
    r.includes('data scientist') || 
    r.includes('machine learning') ||
    r.includes('nlp')
  ) {
    return 'AI';
  }
  // All remaining roles (IA Solution Architect, IA Developer, Tester, etc.) belong to Industrial Automation
  return 'Industrial Automation';
};

// Utility to generate months between two dates
export const getMonthsBetweenDates = (startDateStr, endDateStr) => {
  if (!startDateStr || !endDateStr) return ['2026-12', '2027-01', '2027-02', '2027-03', '2027-04'];
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);
  const months = [];
  
  const current = new Date(start.getFullYear(), start.getMonth(), 1);
  const last = new Date(end.getFullYear(), end.getMonth(), 1);

  while (current <= last) {
    const year = current.getFullYear();
    const month = String(current.getMonth() + 1).padStart(2, '0');
    months.push(`${year}-${month}`);
    current.setMonth(current.getMonth() + 1);
  }

  return months.length > 0 ? months : ['2026-12', '2027-01', '2027-02', '2027-03', '2027-04'];
};

export const formatMonthLabel = (monthKey) => {
  const [year, month] = monthKey.split('-');
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleString('default', { month: 'short', year: 'numeric' });
};

// Initial Projects with strict DAAS-IA-UKI and DAAS-IA-NUKI codes & FTE data
const INITIAL_PROJECTS = [
  {
    id: 'PRJ-2026-001',
    projectCode: 'DAAS-IA-NUKI-001',
    projectName: 'Claims Automation Engine DE',
    businessUnit: 'DAAS-IA',
    geo: 'Non-UKI',
    partner: 'AXA DE',
    status: 'Closed', // Completed
    projectType: 'Staff Aug',
    sowStatus: 'Signed',
    currency: 'EUR',
    sowValue: 245000,
    sowValueEur: 245000,
    totalCost: 218400,
    totalCostEur: 218400,
    startDate: '2026-06-01',
    endDate: '2026-11-30',
    pm: 'Sophie Keller',
    techLead: 'Rahul Sharma',
    totalFte: 4.5,
    fteBenefited: 4.5,
    inflightFte: 0,
    departmentCosts: {
      cnt: 73500,
      ai: 56000,
      ia: 88900
    },
    targetFulfillmentPct: 96.5,
    utilizationPct: 89.2,
    updatedAt: '2026-11-20'
  },
  {
    id: 'PRJ-2026-002',
    projectCode: 'DAAS-IA-NUKI-002',
    projectName: 'Cognitive Document Processing GBS',
    businessUnit: 'DAAS-IA',
    geo: 'Non-UKI',
    partner: 'AXA DE',
    status: 'In Progress', // Inflight
    projectType: 'Time & Material',
    sowStatus: 'Signed',
    currency: 'EUR',
    sowValue: 380000,
    sowValueEur: 380000,
    totalCost: 310500,
    totalCostEur: 310500,
    startDate: '2026-09-01',
    endDate: '2027-03-31',
    pm: 'Christian Becker',
    techLead: 'Elena Rostova',
    totalFte: 6.0,
    fteBenefited: 2.0,
    inflightFte: 4.0,
    departmentCosts: {
      cnt: 94000,
      ai: 112500,
      ia: 104000
    },
    targetFulfillmentPct: 92.0,
    utilizationPct: 86.4,
    updatedAt: '2026-11-22'
  },
  {
    id: 'PRJ-2026-003',
    projectCode: 'DAAS-IA-UKI-001',
    projectName: 'Fraud Detection AI Pipeline',
    businessUnit: 'DAAS-IA',
    geo: 'UKI',
    partner: 'AXA UK',
    status: 'Open', // Inflight
    projectType: 'Fixed Price',
    sowStatus: 'Signed',
    currency: 'GBP',
    sowValue: 420000,
    sowValueEur: 491400,
    totalCost: 390000,
    totalCostEur: 456300,
    startDate: '2026-11-01',
    endDate: '2027-05-31',
    pm: 'David Chen',
    techLead: 'Ananya Patel',
    totalFte: 5.5,
    fteBenefited: 1.5,
    inflightFte: 4.0,
    departmentCosts: {
      cnt: 110000 * 1.17,
      ai: 210000 * 1.17,
      ia: 70000 * 1.17
    },
    targetFulfillmentPct: 95.0,
    utilizationPct: 91.8,
    updatedAt: '2026-11-18'
  },
  {
    id: 'PRJ-2026-004',
    projectCode: 'DAAS-IA-NUKI-003',
    projectName: 'Underwriting RPA Bot Suite',
    businessUnit: 'DAAS-IA',
    geo: 'Non-UKI',
    partner: 'AXA FR',
    status: 'Open', // Inflight
    projectType: 'Staff Aug',
    sowStatus: 'In Review',
    currency: 'EUR',
    sowValue: 195000,
    sowValueEur: 195000,
    totalCost: 172000,
    totalCostEur: 172000,
    startDate: '2026-12-01',
    endDate: '2027-04-30',
    pm: 'Sophie Keller',
    techLead: 'Lucas Muller',
    totalFte: 3.5,
    fteBenefited: 0.5,
    inflightFte: 3.0,
    departmentCosts: {
      cnt: 58000,
      ai: 32000,
      ia: 82000
    },
    targetFulfillmentPct: 88.5,
    utilizationPct: 84.0,
    updatedAt: '2026-11-15'
  },
  {
    id: 'PRJ-2026-005',
    projectCode: 'DAAS-IA-NUKI-004',
    projectName: 'Bilingual Policy Bot Assistant',
    businessUnit: 'DAAS-IA',
    geo: 'Americas',
    partner: 'AXA XL',
    status: 'Closed', // Completed
    projectType: 'Milestone',
    sowStatus: 'Signed',
    currency: 'USD',
    sowValue: 510000,
    sowValueEur: 469200,
    totalCost: 480000,
    totalCostEur: 441600,
    startDate: '2026-04-01',
    endDate: '2026-10-31',
    pm: 'Alexander Weber',
    techLead: 'David Chen',
    totalFte: 5.0,
    fteBenefited: 5.0,
    inflightFte: 0,
    departmentCosts: {
      cnt: 130000 * 0.92,
      ai: 195000 * 0.92,
      ia: 115000 * 0.92
    },
    targetFulfillmentPct: 98.2,
    utilizationPct: 93.5,
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

// Pre-seeded initial month allocations for the 5-month project (Dec 2026 - Apr 2027)
const INITIAL_MONTHLY_ALLOCATIONS = {
  1: { '2026-12': 12, '2027-01': 12, '2027-02': 12, '2027-03': 12, '2027-04': 12 }, // 60 days
  2: { '2026-12': 24, '2027-01': 24, '2027-02': 24, '2027-03': 24, '2027-04': 24 }, // 120 days
  3: { '2026-12': 18, '2027-01': 18, '2027-02': 18, '2027-03': 18, '2027-04': 18 }, // 90 days
  4: { '2026-12': 16, '2027-01': 16, '2027-02': 16, '2027-03': 16, '2027-04': 16 }, // 80 days
  5: { '2026-12': 24, '2027-01': 24, '2027-02': 24, '2027-03': 24, '2027-04': 24 }, // 120 days
  6: { '2026-12': 20, '2027-01': 20, '2027-02': 20, '2027-03': 20, '2027-04': 20 }, // 100 days
  7: { '2026-12': 12, '2027-01': 12, '2027-02': 12, '2027-03': 12, '2027-04': 12 }, // 60 days
  8: { '2026-12': 12, '2027-01': 12, '2027-02': 12, '2027-03': 12, '2027-04': 12 }  // 60 days
};

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('axa_projects_v3');
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  const [toasts, setToasts] = useState([]);

  // Form State for "Add New Project"
  const [formData, setFormData] = useState({
    generalInfo: {
      tribeGeo: 'Non-UKI',
      entity: 'AXA Business Services',
      business: 'CFS',
      description: 'Industrial Automation and Cognitive Processing framework to streamline cross-entity underwriting and claims settlements with SLA tracking.',
      projectType: 'Staff Aug',
      startDate: '2026-12-01',
      endDate: '2027-04-30',
      toolStackRPA: 'UiPath',
      toolStackAI: 'Azure AI',
      sowStatus: 'Signed',
      sowLink: 'https://axa365.sharepoint.com/:x:/r/sites/IndustrialAutomation-AXAGBS2/sow_signed_2026.pdf',
      fteBenefit: 4.5,
      totalFte: 6.2,
      inflightFte: 2.2
    },
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
      psAndC: 'AXA Commercial Operations',
      transformationLead: 'Olivier Renard',
      partnerPM: 'Christian Becker',
      business: 'Claims & Underwriting Tech',
      sowSignAuthority: 'VP Global Technology Delivery'
    },
    projectCosting: {
      currency: 'EUR',
      sowValue: 285000,
      talentCost: 0,
      infraCost: 14500,
      licenseCost: 22000,
      bauCost: 8500,
      rateTable: INITIAL_RATE_TABLE,
      costToCnt: 0,
      costToAi: 0,
      costToIa: 0
    },
    // Month-by-Month Allocation State
    monthlyAllocations: INITIAL_MONTHLY_ALLOCATIONS,
    projectSchedule: [
      { id: 1, phase: 'Phase 1: Inception & Architecture Blueprint', startDate: '2026-12-01', endDate: '2026-12-20', status: 'Completed', owner: 'Elena Rostova' },
      { id: 2, phase: 'Phase 2: RPA Bot Core Workflow Build', startDate: '2027-01-05', endDate: '2027-02-28', status: 'In Progress', owner: 'Lucas Muller' },
      { id: 3, phase: 'Phase 3: AI Cognitive Document Parser', startDate: '2027-02-15', endDate: '2027-03-31', status: 'Not Started', owner: 'David Chen' },
      { id: 4, phase: 'Phase 4: SIT & Business Acceptance (UAT)', startDate: '2027-04-01', endDate: '2027-04-30', status: 'Not Started', owner: 'Camille Laurent' },
      { id: 5, phase: 'Phase 5: Production Deployment & Hypercare', startDate: '2027-05-01', endDate: '2027-05-30', status: 'Not Started', owner: 'Sophie Keller' }
    ],
    projectArtifacts: [
      { id: 1, name: 'SOW_IndustrialAutomation_Signed.pdf', type: 'Statement of Work', size: '2.4 MB', uploadedBy: 'Christian Becker', date: '2026-11-15', verified: true },
      { id: 2, name: 'Architecture_Design_Document_v2.docx', type: 'Technical Spec', size: '4.8 MB', uploadedBy: 'Elena Rostova', date: '2026-11-19', verified: true },
      { id: 3, name: 'Rate_Card_Matrix_2026.xlsx', type: 'Financial Agreement', size: '512 KB', uploadedBy: 'Sophie Keller', date: '2026-11-21', verified: true },
      { id: 4, name: 'UAT_Signoff_Criteria.pdf', type: 'Quality Assurance', size: '1.1 MB', uploadedBy: 'Camille Laurent', date: '2026-11-23', verified: false }
    ],
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

  // Automatically calculate Talent Cost and Departmental Costs (CNT, AI, IA)
  useEffect(() => {
    let totalTalent = 0;
    let cntCost = 0;
    let aiCost = 0;
    let iaCost = 0;

    formData.projectCosting.rateTable.forEach((row) => {
      const cost = (Number(row.rateCard) || 0) * (Number(row.durationDays) || 0) * ((Number(row.allocationPct) || 100) / 100);
      totalTalent += cost;
      
      const dept = getRoleDepartment(row.role);
      if (dept === 'CNT') {
        cntCost += cost;
      } else if (dept === 'AI') {
        aiCost += cost;
      } else {
        iaCost += cost;
      }
    });

    setFormData(prev => ({
      ...prev,
      projectCosting: {
        ...prev.projectCosting,
        talentCost: totalTalent,
        costToCnt: cntCost,
        costToAi: aiCost,
        costToIa: iaCost
      }
    }));
  }, [formData.projectCosting.rateTable]);

  // Persist projects to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('axa_projects_v3', JSON.stringify(projects));
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

  // Update Month-by-Month Allocation cell
  const updateMonthlyAllocation = (roleId, monthKey, days) => {
    setFormData(prev => ({
      ...prev,
      monthlyAllocations: {
        ...prev.monthlyAllocations,
        [roleId]: {
          ...(prev.monthlyAllocations[roleId] || {}),
          [monthKey]: Number(days) || 0
        }
      }
    }));
  };

  // Save new project function with strict code format (DAAS-IA-UKI / DAAS-IA-NUKI)
  const saveProject = () => {
    const isUki = formData.generalInfo.tribeGeo?.toUpperCase().includes('UKI') && 
                  !formData.generalInfo.tribeGeo?.toUpperCase().includes('NON');
    
    // Count existing projects in that category to determine sequence
    const categoryCount = projects.filter(p => {
      const pUki = p.geo?.toUpperCase().includes('UKI') && !p.geo?.toUpperCase().includes('NON');
      return isUki ? pUki : !pUki;
    }).length + 1;

    const prefix = isUki ? 'DAAS-IA-UKI' : 'DAAS-IA-NUKI';
    const projectCode = `${prefix}-${String(categoryCount).padStart(3, '0')}`;
    const projectId = `PRJ-AXA-2026-${String(projects.length + 1).padStart(3, '0')}`;
    const curr = formData.projectCosting.currency;
    
    const totalCostLocal = Number(formData.projectCosting.talentCost) + 
      Number(formData.projectCosting.infraCost) + 
      Number(formData.projectCosting.licenseCost) + 
      Number(formData.projectCosting.bauCost);

    const sowValueLocal = Number(formData.projectCosting.sowValue) || 0;
    const sowValueEur = convertToEur(sowValueLocal, curr);
    const totalCostEur = convertToEur(totalCostLocal, curr);

    const newProject = {
      id: projectId,
      projectCode,
      projectName: formData.generalInfo.description.slice(0, 45) || `Project ${projectCode}`,
      businessUnit: 'DAAS-IA',
      geo: formData.generalInfo.tribeGeo,
      partner: formData.resourceLoading.partnerPM ? `AXA (${formData.resourceLoading.partnerPM.split(' ')[0]})` : (isUki ? 'AXA UK' : 'AXA DE'),
      status: 'Open', // Inflight
      projectType: formData.generalInfo.projectType,
      sowStatus: formData.generalInfo.sowStatus,
      startDate: formData.generalInfo.startDate,
      endDate: formData.generalInfo.endDate,
      currency: curr,
      sowValue: sowValueLocal,
      sowValueEur: Math.round(sowValueEur),
      totalCost: totalCostLocal,
      totalCostEur: Math.round(totalCostEur),
      totalFte: Number(formData.generalInfo.totalFte) || 5.0,
      fteBenefited: Number(formData.generalInfo.fteBenefit) || 0,
      inflightFte: Number(formData.generalInfo.totalFte) || 5.0,
      departmentCosts: {
        cnt: Math.round(convertToEur(formData.projectCosting.costToCnt, curr)),
        ai: Math.round(convertToEur(formData.projectCosting.costToAi, curr)),
        ia: Math.round(convertToEur(formData.projectCosting.costToIa, curr))
      },
      targetFulfillmentPct: 94.0,
      utilizationPct: 88.5,
      pm: formData.resourceLoading.projectManager || 'Unassigned',
      techLead: formData.resourceLoading.techLead || 'Unassigned',
      updatedAt: new Date().toISOString().slice(0, 10),
      fullDetails: { ...formData }
    };

    setProjects(prev => [newProject, ...prev]);
    
    addToast(`Project created with code ${projectCode}! Assigned ID: ${projectId}. Stakeholders & Finance notified.`, 'success');
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
      updateMonthlyAllocation,
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

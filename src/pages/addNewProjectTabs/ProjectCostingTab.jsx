import React, { useMemo } from 'react';
import { 
  useProject, 
  getRoleDepartment, 
  convertToEur, 
  CURRENCY_RATES_TO_EUR,
  getMonthsBetweenDates,
  formatMonthLabel
} from '../../context/ProjectContext';
import { 
  Calculator, 
  Plus, 
  Trash2, 
  DollarSign, 
  TrendingUp, 
  AlertCircle,
  HelpCircle,
  Layers,
  Cpu,
  Bot,
  ArrowRightLeft,
  CalendarRange,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Info,
  AlertTriangle
} from 'lucide-react';

export default function ProjectCostingTab() {
  const { 
    formData, 
    updateGeneralInfo,
    updateProjectCosting, 
    updateRateTableRow, 
    addRateTableRow, 
    removeRateTableRow,
    updateMonthlyAllocation
  } = useProject();

  const costing = formData.projectCosting;
  const { startDate, endDate } = formData.generalInfo;
  const monthlyAllocations = formData.monthlyAllocations || {};

  // Currency symbols
  const getSymbol = (curr) => {
    switch (curr) {
      case 'USD': return '$';
      case 'GBP': return '£';
      case 'INR': return '₹';
      case 'CHF': return 'Fr ';
      default: return '€';
    }
  };

  const symbol = getSymbol(costing.currency);
  const isForeignCurrency = costing.currency !== 'EUR';
  const exchangeRate = CURRENCY_RATES_TO_EUR[costing.currency] || 1.0;

  // Financial totals calculation
  const totalCost = Number(costing.talentCost) + 
    Number(costing.infraCost) + 
    Number(costing.licenseCost) + 
    Number(costing.bauCost);

  // Departmental Cost Calculations
  let cntCost = 0;
  let aiCost = 0;
  let iaCost = 0;

  costing.rateTable.forEach((row) => {
    const cost = (Number(row.rateCard) || 0) * (Number(row.durationDays) || 0) * ((Number(row.allocationPct) || 100) / 100);
    const dept = getRoleDepartment(row.role);
    if (dept === 'CNT') {
      cntCost += cost;
    } else if (dept === 'AI') {
      aiCost += cost;
    } else {
      iaCost += cost;
    }
  });

  const sowValueEur = convertToEur(costing.sowValue, costing.currency);
  const totalCostEur = convertToEur(totalCost, costing.currency);

  // Month-by-Month Allocation calculations
  const months = useMemo(() => {
    return getMonthsBetweenDates(startDate, endDate);
  }, [startDate, endDate]);

  const handleAutoDistribute = (roleId, totalDays) => {
    if (!months.length || !totalDays) return;
    const baseDays = Math.floor(totalDays / months.length);
    const remainder = totalDays % months.length;

    months.forEach((m, idx) => {
      const allocated = baseDays + (idx < remainder ? 1 : 0);
      updateMonthlyAllocation(roleId, m, allocated);
    });
  };

  const handleAutoDistributeAll = () => {
    costing.rateTable.forEach((row) => {
      handleAutoDistribute(row.id, row.durationDays);
    });
  };

  const monthTotals = useMemo(() => {
    const totals = {};
    months.forEach((m) => {
      totals[m] = costing.rateTable.reduce((sum, row) => {
        const val = monthlyAllocations[row.id]?.[m] || 0;
        return sum + Number(val);
      }, 0);
    });
    return totals;
  }, [months, costing.rateTable, monthlyAllocations]);

  const totalRequiredDays = costing.rateTable.reduce((sum, r) => sum + (Number(r.durationDays) || 0), 0);
  const totalAllocatedAll = Object.values(monthTotals).reduce((sum, val) => sum + val, 0);

  return (
    <div className="space-y-8">
      {/* SECTION HEADER matching Image 2 */}
      <div className="bg-[#6b3074] text-white px-5 py-2.5 rounded font-bold text-sm tracking-wide shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calculator className="w-4 h-4" />
          <span>Project Costing & Rate Structure</span>
        </div>
        <span className="text-xs font-normal text-purple-200">
          Base Currency (EUR Standard) • CNT, AI & Industrial Automation Split
        </span>
      </div>

      {/* Currency Conversion Alert Banner if non-EUR */}
      {isForeignCurrency && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-800">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold">
                Currency Conversion Active: {costing.currency} to EUR (€)
              </p>
              <p className="text-amber-700">
                SOW Value: <strong>{symbol}{Number(costing.sowValue).toLocaleString()} {costing.currency}</strong> converts to <strong>€{Math.round(sowValueEur).toLocaleString()} EUR</strong> (FX: 1 {costing.currency} = {exchangeRate} EUR).
              </p>
            </div>
          </div>
          <span className="bg-white text-amber-800 border border-amber-300 px-3 py-1 rounded font-mono font-bold self-start sm:self-auto">
            1 {costing.currency} = €{exchangeRate}
          </span>
        </div>
      )}

      {/* Top Cost Breakdown Cards / Inputs */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
          <span>Cost Categories & Commitments</span>
          <span className="text-slate-400 font-normal">All values in {costing.currency}</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Currency */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Currency
            </label>
            <select
              value={costing.currency}
              onChange={(e) => updateProjectCosting('currency', e.target.value)}
              className="w-full bg-[#e8f0fe] border border-blue-200 rounded px-3 py-2 text-sm text-slate-800 font-bold focus:ring-2 focus:ring-[#00008f]"
            >
              <option value="EUR">EUR (€) - Euro (Base Standard)</option>
              <option value="GBP">GBP (£) - British Pound (FX: 1.17)</option>
              <option value="USD">USD ($) - US Dollar (FX: 0.92)</option>
              <option value="CHF">CHF (Fr) - Swiss Franc (FX: 1.05)</option>
              <option value="INR">INR (₹) - Indian Rupee (FX: 0.011)</option>
            </select>
          </div>

          {/* SOW Value */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>SOW Value</span>
              {isForeignCurrency && (
                <span className="text-[10px] text-purple-700 font-mono font-bold">
                  ≈ €{Math.round(sowValueEur).toLocaleString()} EUR
                </span>
              )}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center font-bold text-slate-400 text-sm">
                {symbol}
              </span>
              <input
                type="number"
                value={costing.sowValue}
                onChange={(e) => updateProjectCosting('sowValue', Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded pl-8 pr-3 py-2 text-sm text-slate-800 font-bold focus:ring-2 focus:ring-[#00008f]"
              />
            </div>
          </div>

          {/* Talent Cost (Auto-calculated from table) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Talent Cost</span>
              <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                Auto-calculated
              </span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center font-bold text-emerald-600 text-sm">
                {symbol}
              </span>
              <input
                type="text"
                readOnly
                value={Number(costing.talentCost).toLocaleString()}
                className="w-full bg-slate-100 border border-slate-300 rounded pl-8 pr-3 py-2 text-sm text-emerald-800 font-bold cursor-not-allowed"
              />
            </div>
          </div>

          {/* Infra Cost */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Infra Cost
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center font-bold text-slate-400 text-sm">
                {symbol}
              </span>
              <input
                type="number"
                value={costing.infraCost}
                onChange={(e) => updateProjectCosting('infraCost', Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded pl-8 pr-3 py-2 text-sm text-slate-800 font-medium focus:ring-2 focus:ring-[#00008f]"
              />
            </div>
          </div>

          {/* License Cost */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              License Cost
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center font-bold text-slate-400 text-sm">
                {symbol}
              </span>
              <input
                type="number"
                value={costing.licenseCost}
                onChange={(e) => updateProjectCosting('licenseCost', Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded pl-8 pr-3 py-2 text-sm text-slate-800 font-medium focus:ring-2 focus:ring-[#00008f]"
              />
            </div>
          </div>

          {/* BAU Cost */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              BAU Cost
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center font-bold text-slate-400 text-sm">
                {symbol}
              </span>
              <input
                type="number"
                value={costing.bauCost}
                onChange={(e) => updateProjectCosting('bauCost', Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded pl-8 pr-3 py-2 text-sm text-slate-800 font-medium focus:ring-2 focus:ring-[#00008f]"
              />
            </div>
          </div>
        </div>

        {/* DEPARTMENTAL SEGREGATION RIBBON (Replacing Gross Margin) */}
        <div className="mt-6 pt-5 border-t border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center">
              <Layers className="w-4 h-4 mr-1 text-[#00008f]" />
              <span>Departmental Cost Allocation</span>
            </h5>
            <span className="text-[11px] text-slate-400">Replacing commercial gross margin</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Cost to CNT Team */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-800 uppercase">Cost to CNT Team</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">PM & BA</span>
              </div>
              <p className="text-xl font-extrabold text-emerald-900 mt-1">
                {symbol}{cntCost.toLocaleString()}
              </p>
              {isForeignCurrency && (
                <p className="text-[11px] font-mono text-emerald-700 mt-0.5">
                  ≈ €{Math.round(convertToEur(cntCost, costing.currency)).toLocaleString()} EUR
                </p>
              )}
            </div>

            {/* Cost to AI Team */}
            <div className="bg-purple-50/70 border border-purple-200 rounded-lg p-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#6b3074] uppercase">Cost to AI Team</span>
                <span className="text-[10px] bg-purple-100 text-[#6b3074] font-semibold px-2 py-0.5 rounded">AI Eng & Arch</span>
              </div>
              <p className="text-xl font-extrabold text-purple-950 mt-1">
                {symbol}{aiCost.toLocaleString()}
              </p>
              {isForeignCurrency && (
                <p className="text-[11px] font-mono text-purple-700 mt-0.5">
                  ≈ €{Math.round(convertToEur(aiCost, costing.currency)).toLocaleString()} EUR
                </p>
              )}
            </div>

            {/* Cost to Industrial Automation Team */}
            <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#00008f] uppercase">Cost to IA Team</span>
                <span className="text-[10px] bg-blue-100 text-[#00008f] font-semibold px-2 py-0.5 rounded">Developers & QA</span>
              </div>
              <p className="text-xl font-extrabold text-blue-950 mt-1">
                {symbol}{iaCost.toLocaleString()}
              </p>
              {isForeignCurrency && (
                <p className="text-[11px] font-mono text-blue-700 mt-0.5">
                  ≈ €{Math.round(convertToEur(iaCost, costing.currency)).toLocaleString()} EUR
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* DETAILED RATE CARD TABLE */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Role Rate Card & Allocation Matrix
            </h4>
            <p className="text-xs text-slate-500">
              Formula: Cost per Role = Rate Card × Duration in Days × (Percentage of Allocation ÷ 100)
            </p>
          </div>

          <button
            type="button"
            onClick={addRateTableRow}
            className="flex items-center space-x-1.5 bg-[#00008f] hover:bg-[#000070] text-white px-3.5 py-1.5 rounded text-xs font-bold shadow-sm transition-all self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Role Row</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-4 w-40">ROLE</th>
                <th className="py-3 px-3 w-28">Department</th>
                <th className="py-3 px-4 w-32">Rate Card ({symbol}/day)</th>
                <th className="py-3 px-4 w-32">Duration (Days)</th>
                <th className="py-3 px-4 w-32">Allocation %</th>
                <th className="py-3 px-4 w-36 text-right">Cost per Role</th>
                <th className="py-3 px-3 w-16 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {costing.rateTable.map((row) => {
                const cost = (Number(row.rateCard) || 0) * (Number(row.durationDays) || 0) * ((Number(row.allocationPct) || 100) / 100);
                const dept = getRoleDepartment(row.role);

                let deptBadge = 'bg-blue-100 text-[#00008f] border-blue-200';
                if (dept === 'AI') deptBadge = 'bg-purple-100 text-[#6b3074] border-purple-200';
                if (dept === 'CNT') deptBadge = 'bg-emerald-100 text-emerald-800 border-emerald-200';

                return (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-4 font-semibold text-slate-800">
                      <input
                        type="text"
                        value={row.role}
                        onChange={(e) => updateRateTableRow(row.id, 'role', e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded px-2.5 py-1 text-xs font-medium text-slate-800 focus:ring-1 focus:ring-[#00008f]"
                      />
                    </td>

                    <td className="py-2.5 px-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${deptBadge}`}>
                        {dept}
                      </span>
                    </td>

                    <td className="py-2.5 px-4">
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 font-bold text-xs">
                          {symbol}
                        </span>
                        <input
                          type="number"
                          value={row.rateCard}
                          onChange={(e) => updateRateTableRow(row.id, 'rateCard', Number(e.target.value))}
                          className="w-full bg-white border border-slate-300 rounded pl-6 pr-2 py-1 text-xs font-mono font-medium text-slate-800 focus:ring-1 focus:ring-[#00008f]"
                        />
                      </div>
                    </td>

                    <td className="py-2.5 px-4">
                      <div className="flex items-center space-x-1">
                        <input
                          type="number"
                          value={row.durationDays}
                          onChange={(e) => updateRateTableRow(row.id, 'durationDays', Number(e.target.value))}
                          className="w-full bg-white border border-slate-300 rounded px-2.5 py-1 text-xs font-mono font-medium text-slate-800 focus:ring-1 focus:ring-[#00008f]"
                        />
                        <span className="text-[11px] text-slate-400">days</span>
                      </div>
                    </td>

                    <td className="py-2.5 px-4">
                      <div className="flex items-center space-x-1">
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={row.allocationPct}
                          onChange={(e) => updateRateTableRow(row.id, 'allocationPct', Number(e.target.value))}
                          className="w-full bg-white border border-slate-300 rounded px-2.5 py-1 text-xs font-mono font-medium text-slate-800 focus:ring-1 focus:ring-[#00008f]"
                        />
                        <span className="text-[11px] text-slate-400">%</span>
                      </div>
                    </td>

                    <td className="py-2.5 px-4 text-right font-mono font-bold text-emerald-700 text-sm">
                      {symbol}{cost.toLocaleString()}
                    </td>

                    <td className="py-2.5 px-3 text-center">
                      <button
                        type="button"
                        onClick={() => removeRateTableRow(row.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                        title="Remove role"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-[#f0fdf4] border-t-2 border-emerald-300 font-extrabold text-xs">
                <td colSpan="5" className="py-3 px-4 text-slate-800 uppercase tracking-wider text-right">
                  Total Talent Pool Cost
                </td>
                <td className="py-3 px-4 text-right font-mono text-base text-emerald-800">
                  {symbol}{Number(costing.talentCost).toLocaleString()}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* EMBEDDED BELOW PROJECT COSTING: MONTH-BY-MONTH RESOURCE ALLOCATION TIMELINE */}
      <div className="space-y-4 pt-2">
        <div className="bg-[#6b3074] text-white px-5 py-2.5 rounded font-bold text-sm tracking-wide shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <CalendarRange className="w-4 h-4" />
            <span>Month-by-Month Resource Allocation Timeline</span>
          </div>
          <span className="text-xs font-normal text-purple-200">
            Manual Allocation Grid & Duration Reconciliation
          </span>
        </div>

        {/* Timeline Dates & Auto Controls Card */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-[#00008f]" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Project Timeline:</span>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-xs text-slate-500 font-medium">Start:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => updateGeneralInfo('startDate', e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-800 font-semibold focus:ring-1 focus:ring-[#00008f]"
              />
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-xs text-slate-500 font-medium">End:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => updateGeneralInfo('endDate', e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-800 font-semibold focus:ring-1 focus:ring-[#00008f]"
              />
            </div>

            <span className="text-xs font-bold text-[#00008f] bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
              {months.length} Months Duration
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={handleAutoDistributeAll}
              className="flex items-center space-x-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1.5 rounded text-xs font-bold transition-all shadow-sm"
              title="Evenly distribute days for all roles across project months"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Auto-Balance All Roles</span>
            </button>
          </div>
        </div>

        {/* Dynamic Month-by-Month Allocation Matrix */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Resource Days Loaded by Month
              </h4>
              <p className="text-xs text-slate-500">
                Sum of monthly allocated days must reconcile against the Planned Duration from the rate table above.
              </p>
            </div>

            <div className="flex items-center space-x-3 text-xs">
              <span className="text-slate-500">
                Planned: <strong className="text-slate-800">{totalRequiredDays} days</strong>
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500">
                Allocated: <strong className={totalAllocatedAll === totalRequiredDays ? 'text-emerald-700 font-bold' : 'text-amber-600 font-bold'}>
                  {totalAllocatedAll} days
                </strong>
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4 min-w-[170px]">Role / Department</th>
                  <th className="py-3 px-3 text-center min-w-[100px]">Planned Days</th>
                  {months.map((m) => (
                    <th key={m} className="py-3 px-3 text-center min-w-[90px] bg-slate-50 border-x border-slate-200">
                      {formatMonthLabel(m)}
                    </th>
                  ))}
                  <th className="py-3 px-3 text-center min-w-[100px]">Total Allocated</th>
                  <th className="py-3 px-4 min-w-[160px]">Reconciliation Status</th>
                  <th className="py-3 px-3 text-center min-w-[90px]">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {costing.rateTable.map((row) => {
                  const dept = getRoleDepartment(row.role);
                  const roleAllocations = monthlyAllocations[row.id] || {};
                  
                  const rowTotalAllocated = months.reduce((sum, m) => {
                    return sum + (Number(roleAllocations[m]) || 0);
                  }, 0);

                  const plannedDays = Number(row.durationDays) || 0;
                  const diff = rowTotalAllocated - plannedDays;

                  let deptColor = 'bg-blue-50 text-[#00008f] border-blue-200';
                  if (dept === 'AI') deptColor = 'bg-purple-50 text-[#6b3074] border-purple-200';
                  if (dept === 'CNT') deptColor = 'bg-emerald-50 text-emerald-800 border-emerald-200';

                  return (
                    <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-800">{row.role}</div>
                        <span className={`inline-block text-[10px] font-bold px-1.5 py-0.2 rounded border mt-0.5 ${deptColor}`}>
                          {dept}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-center font-mono font-bold text-slate-700 bg-slate-50/50">
                        {plannedDays} d
                      </td>

                      {months.map((m) => {
                        const val = roleAllocations[m] !== undefined ? roleAllocations[m] : '';
                        return (
                          <td key={m} className="py-2 px-2 text-center border-x border-slate-100">
                            <input
                              type="number"
                              min="0"
                              max="31"
                              value={val}
                              onChange={(e) => updateMonthlyAllocation(row.id, m, e.target.value)}
                              placeholder="0"
                              className="w-16 bg-white border border-slate-300 rounded px-1.5 py-1 text-xs text-center font-mono font-semibold text-slate-800 focus:ring-1 focus:ring-[#00008f] focus:border-[#00008f]"
                            />
                          </td>
                        );
                      })}

                      <td className="py-3 px-3 text-center font-mono font-bold text-slate-900">
                        {rowTotalAllocated} d
                      </td>

                      <td className="py-3 px-4">
                        {diff === 0 ? (
                          <span className="inline-flex items-center text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                            Reconciled ({rowTotalAllocated}/{plannedDays})
                          </span>
                        ) : diff > 0 ? (
                          <span className="inline-flex items-center text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                            <AlertTriangle className="w-3.5 h-3.5 mr-1 text-rose-600" />
                            Overallocated (+{diff}d)
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                            <Clock className="w-3.5 h-3.5 mr-1 text-amber-600" />
                            Remaining ({Math.abs(diff)}d left)
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-3 text-center">
                        <button
                          type="button"
                          onClick={() => handleAutoDistribute(row.id, plannedDays)}
                          className="text-[10px] font-bold text-[#00008f] hover:underline"
                          title="Distribute planned days evenly across months"
                        >
                          Auto-split
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>

              <tfoot>
                <tr className="bg-[#f8fafc] border-t-2 border-slate-300 font-extrabold text-xs">
                  <td className="py-3 px-4 text-slate-800 uppercase tracking-wider">
                    Total Monthly Burn
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-slate-700">
                    {totalRequiredDays} d
                  </td>
                  {months.map((m) => (
                    <td key={m} className="py-3 px-3 text-center font-mono text-emerald-700 border-x border-slate-200">
                      {monthTotals[m] || 0} d
                    </td>
                  ))}
                  <td className="py-3 px-3 text-center font-mono text-emerald-800 text-sm">
                    {totalAllocatedAll} d
                  </td>
                  <td colSpan="2" className="py-3 px-4">
                    {totalAllocatedAll === totalRequiredDays ? (
                      <span className="text-emerald-700 font-bold flex items-center">
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        100% Reconciled
                      </span>
                    ) : (
                      <span className="text-amber-700 font-bold flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        {Math.abs(totalRequiredDays - totalAllocatedAll)} Days Variance
                      </span>
                    )}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

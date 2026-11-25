import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { 
  Calculator, 
  Plus, 
  Trash2, 
  DollarSign, 
  TrendingUp, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';

export default function ProjectCostingTab() {
  const { 
    formData, 
    updateProjectCosting, 
    updateRateTableRow, 
    addRateTableRow, 
    removeRateTableRow 
  } = useProject();

  const costing = formData.projectCosting;

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

  // Financial totals calculation
  const totalCost = Number(costing.talentCost) + 
    Number(costing.infraCost) + 
    Number(costing.licenseCost) + 
    Number(costing.bauCost);

  const variance = Number(costing.sowValue) - totalCost;
  const marginPct = costing.sowValue > 0 ? ((variance / Number(costing.sowValue)) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      {/* SECTION HEADER matching Image 2 */}
      <div className="bg-[#6b3074] text-white px-5 py-2.5 rounded font-bold text-sm tracking-wide shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calculator className="w-4 h-4" />
          <span>Project Costing</span>
        </div>
        <span className="text-xs font-normal text-purple-200">
          Financial SOW vs Talent, Infra & License Costing Model
        </span>
      </div>

      {/* Top Cost Breakdown Cards / Inputs matching Image 2 lines 56-62 */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
          <span>Cost Categories & Financial Commitments</span>
          <span className="text-slate-400 font-normal">All values in selected currency</span>
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
              <option value="EUR">EUR (€) - Euro</option>
              <option value="USD">USD ($) - US Dollar</option>
              <option value="GBP">GBP (£) - British Pound</option>
              <option value="INR">INR (₹) - Indian Rupee</option>
              <option value="CHF">CHF (Fr) - Swiss Franc</option>
            </select>
          </div>

          {/* SOW Value */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              SOW Value
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

        {/* Financial Summary Ribbon */}
        <div className="mt-6 pt-5 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
            <span className="text-[11px] font-semibold text-slate-500 uppercase">Total Project Cost</span>
            <p className="text-xl font-extrabold text-slate-900 mt-0.5">
              {symbol}{totalCost.toLocaleString()}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
            <span className="text-[11px] font-semibold text-slate-500 uppercase">Estimated Gross Margin</span>
            <p className={`text-xl font-extrabold mt-0.5 ${variance >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
              {symbol}{variance.toLocaleString()}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
            <span className="text-[11px] font-semibold text-slate-500 uppercase">Margin Percentage</span>
            <p className={`text-xl font-extrabold mt-0.5 ${Number(marginPct) >= 15 ? 'text-emerald-700' : 'text-amber-600'}`}>
              {marginPct}%
            </p>
          </div>
        </div>
      </div>

      {/* DETAILED RATE CARD TABLE matching Image 2 lines 65-74 */}
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
                <th className="py-3 px-4 w-44">ROLE</th>
                <th className="py-3 px-4 w-36">Rate Card ({symbol}/day)</th>
                <th className="py-3 px-4 w-36">Duration in Days</th>
                <th className="py-3 px-4 w-36">Percentage of Allocation</th>
                <th className="py-3 px-4 w-40 text-right">Cost per Role</th>
                <th className="py-3 px-4 w-16 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {costing.rateTable.map((row) => {
                const cost = (Number(row.rateCard) || 0) * (Number(row.durationDays) || 0) * ((Number(row.allocationPct) || 100) / 100);

                return (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    {/* Role name */}
                    <td className="py-2.5 px-4 font-semibold text-slate-800">
                      <input
                        type="text"
                        value={row.role}
                        onChange={(e) => updateRateTableRow(row.id, 'role', e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded px-2.5 py-1 text-xs font-medium text-slate-800 focus:ring-1 focus:ring-[#00008f]"
                      />
                    </td>

                    {/* Rate Card */}
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

                    {/* Duration in Days */}
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

                    {/* Percentage of Allocation */}
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

                    {/* Cost per Role (Calculated) */}
                    <td className="py-2.5 px-4 text-right font-mono font-bold text-emerald-700 text-sm">
                      {symbol}{cost.toLocaleString()}
                    </td>

                    {/* Delete action */}
                    <td className="py-2.5 px-4 text-center">
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
              {/* Total Cost Row matching Image 2 line 73 */}
              <tr className="bg-[#f0fdf4] border-t-2 border-emerald-300 font-extrabold text-xs">
                <td colSpan="4" className="py-3 px-4 text-slate-800 uppercase tracking-wider text-right">
                  Total Cost (Talent Pool Sum)
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
    </div>
  );
}

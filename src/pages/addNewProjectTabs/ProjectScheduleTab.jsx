import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { Calendar, Clock, CheckCircle2, AlertCircle, Plus, User, Layers } from 'lucide-react';

export default function ProjectScheduleTab() {
  const { formData } = useProject();
  const schedule = formData.projectSchedule;

  return (
    <div className="space-y-6">
      {/* SECTION HEADER */}
      <div className="bg-[#6b3074] text-white px-5 py-2.5 rounded font-bold text-sm tracking-wide shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>Project Schedule & Delivery Milestones</span>
        </div>
        <span className="text-xs font-normal text-purple-200">
          Gantt Trackers, Sprint Deadlines & SteerCo Milestones
        </span>
      </div>

      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-6">
        <div className="flex justify-between items-center pb-3 border-b border-slate-200">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Delivery Roadmap (5 Planned Phases)
            </h4>
            <p className="text-xs text-slate-500">
              Phased timeline aligned with AXA Agile delivery standards
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {schedule.map((item, idx) => {
            let statusBadge = 'bg-slate-100 text-slate-700 border-slate-200';
            let barColor = 'bg-slate-300';
            let pct = 0;

            if (item.status === 'Completed') {
              statusBadge = 'bg-emerald-50 text-emerald-800 border-emerald-200';
              barColor = 'bg-emerald-600';
              pct = 100;
            } else if (item.status === 'In Progress') {
              statusBadge = 'bg-blue-50 text-blue-800 border-blue-200';
              barColor = 'bg-[#00008f]';
              pct = 55;
            } else {
              statusBadge = 'bg-amber-50 text-amber-800 border-amber-200';
              barColor = 'bg-slate-200';
              pct = 0;
            }

            return (
              <div key={item.id} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors bg-slate-50/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-full bg-purple-100 text-[#6b3074] text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <div>
                      <h5 className="text-sm font-bold text-slate-800">{item.phase}</h5>
                      <span className="text-xs text-slate-500 flex items-center mt-0.5">
                        <User className="w-3 h-3 mr-1" />
                        Phase Lead: {item.owner}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-xs font-medium">
                    <div className="text-slate-600">
                      <span className="font-semibold text-slate-800">{item.startDate}</span> to{' '}
                      <span className="font-semibold text-slate-800">{item.endDate}</span>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${statusBadge}`}>
                      {item.status}
                    </span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${barColor} transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

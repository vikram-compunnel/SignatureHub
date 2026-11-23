import React, { useState } from 'react';
import { ChangeHistoryItem, StaffIssue } from '../types';
import { CheckCircle2, RotateCcw, AlertTriangle, Send, ShieldAlert, Sparkles, UserCheck } from 'lucide-react';

interface ReportsHistoryViewProps {
  history: ChangeHistoryItem[];
  staffIssues: StaffIssue[];
  onRestore: (id: string) => void;
}

export const ReportsHistoryView: React.FC<ReportsHistoryViewProps> = ({
  history,
  staffIssues,
  onRestore,
}) => {
  const [notification, setNotification] = useState('');
  const [pendingIssues, setPendingIssues] = useState<StaffIssue[]>(staffIssues);

  const handleSendListToHR = () => {
    setNotification('Summary email with 3 missing directory items dispatched to hr-directory-team@compunnel.com!');
    setTimeout(() => setNotification(''), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 py-6">
      {/* Title section from Wireframe 5 */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Reports and change history</h1>
        <p className="text-slate-600 mt-2 text-base">
          Real-time service operational health, M365 directory sync data quality, and tamper-proof audit trails
        </p>
      </div>

      {notification && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {notification}
        </div>
      )}

      {/* 4 KPI CARDS (From Wireframe 5) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: ADD-IN ACTIVE */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            ADD-IN ACTIVE
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">1,482</span>
            <span className="text-sm font-medium text-slate-500">of 1,500</span>
          </div>
          <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> 98.8% deployment compliance
          </p>
        </div>

        {/* Card 2: NO MATCHING RULE */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            NO MATCHING RULE
          </span>
          <div className="mt-2">
            <span className="text-3xl font-extrabold text-slate-900">0</span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">Default corporate fallback ready</p>
        </div>

        {/* Card 3: ACTIVE NOTES */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            ACTIVE NOTES
          </span>
          <div className="mt-2">
            <span className="text-3xl font-extrabold text-blue-600">47</span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">Self-expiring leave & notice notes</p>
        </div>

        {/* Card 4: MISSING STAFF DETAILS */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            MISSING STAFF DETAILS
          </span>
          <div className="mt-2">
            <span className="text-3xl font-extrabold text-amber-600">{pendingIssues.length}</span>
          </div>
          <p className="text-xs text-amber-600 font-medium mt-1">Flagged for HR correction</p>
        </div>
      </div>

      {/* Main 2-Column Section from Wireframe 5 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Change History Table (Col 1-8) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">CHANGE HISTORY</h3>
            <span className="text-xs text-slate-400">Audit trail (last 30 days)</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-bold text-slate-500">
                  <th className="pb-3">When</th>
                  <th className="pb-3">Who</th>
                  <th className="pb-3">What changed</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {history.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-all">
                    <td className="py-3 text-slate-500 font-medium whitespace-nowrap">{item.when}</td>
                    <td className="py-3 font-semibold text-slate-900 whitespace-nowrap">{item.who}</td>
                    <td className="py-3 text-slate-700">{item.whatChanged}</td>
                    <td className="py-3 text-right">
                      {item.canRestore ? (
                        <button
                          onClick={() => {
                            onRestore(item.id);
                            setNotification(`Version restored to state before "${item.whatChanged}"`);
                            setTimeout(() => setNotification(''), 4000);
                          }}
                          className="px-2.5 py-1 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 ml-auto shadow-2xs"
                        >
                          <RotateCcw className="w-3 h-3 text-slate-500" />
                          Restore
                        </button>
                      ) : (
                        <span className="text-slate-400 text-xs">View</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: People to fix / Send to HR (Col 9-12) (From Wireframe 5) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="pb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">PEOPLE TO FIX</h3>
            <p className="text-xs text-slate-500 mt-1">
              Staff with missing title, phone or department, sent to HR to correct in the directory.
            </p>
          </div>

          <div className="space-y-2.5">
            {pendingIssues.map((issue) => (
              <div
                key={issue.id}
                className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs space-y-1"
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900">{issue.name}</span>
                  <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-semibold">
                    {issue.department}
                  </span>
                </div>
                <p className="text-amber-800 font-medium">Missing: {issue.missingField}</p>
                <p className="text-[11px] text-slate-400 font-mono">{issue.email}</p>
              </div>
            ))}
          </div>

          <button
            onClick={handleSendListToHR}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-xs shadow-xs transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-3.5 h-3.5" />
            Send list to HR
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Layers, ShieldCheck, Mail, FileText, BarChart3, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: 'admin' | 'employee';
  setUserRole: (role: 'admin' | 'employee') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
}) => {
  const tabs = [
    { id: 'overview', label: '1. Architecture & Overview', icon: Layers },
    { id: 'templates', label: '2. Templates & Rules', icon: ShieldCheck, adminOnly: true },
    { id: 'note', label: '3. Employee: My Note', icon: FileText },
    { id: 'outlook', label: '4. Outlook Experience', icon: Mail },
    { id: 'reports', label: '5. Reports & History', icon: BarChart3, adminOnly: true },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
      {/* Top corporate banner */}
      <div className="bg-slate-900 text-slate-300 text-xs px-6 py-1.5 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <span className="font-semibold tracking-wide text-white flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            COMPUNNEL DIGITAL
          </span>
          <span className="text-slate-500">•</span>
          <span>Internal Product Initiative: SignatureHub v1.0</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[11px] font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            CodeTwo Replacement ($7,500/yr Saved)
          </span>
          <span className="text-slate-400">Target Renewal: Dec 2, 2026</span>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20 font-bold text-xl">
            S
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-lg tracking-tight">SignatureHub</span>
              <span className="bg-blue-50 text-blue-700 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-blue-200">
                M365 Cloud
              </span>
            </div>
            <p className="text-xs text-slate-500 -mt-0.5">Centrally Managed Outlook Email Signatures</p>
          </div>
        </div>

        {/* Tab switcher */}
        <nav className="flex space-x-1 bg-slate-100 p-1 rounded-xl">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  isActive
                    ? 'bg-white text-blue-700 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Persona toggle */}
        <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 p-1 rounded-lg text-xs">
          <span className="text-slate-400 text-[11px] px-1 font-medium">Role:</span>
          <button
            onClick={() => setUserRole('admin')}
            className={`px-2.5 py-1 rounded font-medium transition-all ${
              userRole === 'admin'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            IT / Admin
          </button>
          <button
            onClick={() => setUserRole('employee')}
            className={`px-2.5 py-1 rounded font-medium transition-all ${
              userRole === 'employee'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Employee
          </button>
        </div>
      </div>
    </header>
  );
};

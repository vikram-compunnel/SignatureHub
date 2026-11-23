import React from 'react';
import { ArrowRight, CheckCircle2, Shield, Users, Database, Mail, Laptop, RefreshCw } from 'lucide-react';

export const OverviewView: React.FC<{ onNavigateToTemplates: () => void; onNavigateToEmployee: () => void }> = ({
  onNavigateToTemplates,
  onNavigateToEmployee,
}) => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 py-6">
      {/* Title section from Wireframe 1 */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">How the platform works, end to end</h1>
        <p className="text-slate-600 mt-2 text-base">
          IT, Marketing and Legal control the official signature. Employees only add a short note above it.
        </p>
      </div>

      {/* Main Architecture Diagram from Wireframe 1 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Source & Roles Left Column */}
        <div className="md:col-span-3 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <Database className="w-3.5 h-3.5 text-blue-500" />
              Source
            </div>
            <p className="mt-2 text-sm font-semibold text-slate-800">Staff directory</p>
            <p className="text-xs text-slate-500 mt-1">Name, title, department, phone, office, M365 Azure AD sync</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <Shield className="w-3.5 h-3.5 text-indigo-500" />
              Admins
            </div>
            <p className="mt-2 text-sm font-semibold text-slate-800">IT, Marketing, Legal & HR</p>
            <p className="text-xs text-slate-500 mt-1">Centrally govern templates, rules, banners, and audit history</p>
            <button
              onClick={onNavigateToTemplates}
              className="mt-3 text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              Configure rules <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <Users className="w-3.5 h-3.5 text-emerald-500" />
              Employees
            </div>
            <p className="mt-2 text-sm font-semibold text-slate-800">Add a personal note</p>
            <p className="text-xs text-slate-500 mt-1">Leave notices and context with automatic expiration dates</p>
            <button
              onClick={onNavigateToEmployee}
              className="mt-3 text-xs font-semibold text-emerald-600 hover:text-emerald-800 flex items-center gap-1"
            >
              Try My Note <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Center: Signature Service (Blue Box from Wireframe 1) */}
        <div className="md:col-span-6 bg-gradient-to-b from-blue-50/60 to-indigo-50/60 rounded-3xl border-2 border-blue-400/80 p-6 flex flex-col justify-between shadow-sm relative">
          <div className="flex items-center justify-between pb-3 border-b border-blue-200/80">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              SIGNATURE SERVICE (WE BUILD AND RUN)
            </span>
            <span className="text-[11px] bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded-full">
              Automated Microservice
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 my-4">
            <div className="bg-white p-4 rounded-xl border border-blue-200/70 shadow-xs hover:shadow-sm transition-all">
              <p className="font-semibold text-slate-800 text-sm">Directory sync</p>
              <p className="text-xs text-slate-500 mt-1">Azure AD Graph API Delta sync every 15 mins</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-blue-200/70 shadow-xs hover:shadow-sm transition-all">
              <p className="font-semibold text-slate-800 text-sm">Templates and rules</p>
              <p className="text-xs text-slate-500 mt-1">Top-to-bottom rule evaluator with priority matching</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-blue-200/70 shadow-xs hover:shadow-sm transition-all">
              <p className="font-semibold text-slate-800 text-sm">Employee notes with expiry</p>
              <p className="text-xs text-slate-500 mt-1">Self-expiring leave notices & compliant snippets</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-blue-200/70 shadow-xs hover:shadow-sm transition-all">
              <p className="font-semibold text-slate-800 text-sm">Change history and restore</p>
              <p className="text-xs text-slate-500 mt-1">Full audit logs with single-click instant rollback</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-blue-200/70 shadow-xs hover:shadow-sm transition-all">
              <p className="font-semibold text-slate-800 text-sm">Reports and data quality</p>
              <p className="text-xs text-slate-500 mt-1">Flag missing attributes directly to HR before send</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-blue-200/70 shadow-xs hover:shadow-sm transition-all">
              <p className="font-semibold text-slate-800 text-sm">Fallback signature</p>
              <p className="text-xs text-slate-500 mt-1">Fail-safe corporate default if cloud sync is offline</p>
            </div>
          </div>

          <div className="text-xs text-blue-900 bg-blue-100/70 p-3 rounded-xl border border-blue-200 flex items-center justify-between">
            <span>Guaranteed signature immutability: Transport layer enforcement</span>
            <span className="font-semibold text-blue-800">Zero sender tampering</span>
          </div>
        </div>

        {/* Right Output Column */}
        <div className="md:col-span-3 space-y-4 flex flex-col justify-between">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-300 transition-all">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <Laptop className="w-3.5 h-3.5 text-indigo-500" />
              Outlook Add-In
            </div>
            <p className="mt-2 text-sm font-semibold text-slate-800">Multi-Platform Client</p>
            <p className="text-xs text-slate-500 mt-1">
              Windows, Mac, Web, iPhone, Android. Rolled out centrally by IT from Microsoft 365 Admin Center.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-xs bg-emerald-50/30">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
              <Mail className="w-3.5 h-3.5 text-emerald-600" />
              Email Sent
            </div>
            <p className="mt-2 text-sm font-semibold text-slate-900">Standardized Delivery</p>
            <p className="text-xs text-slate-600 mt-1">
              Employee personal note, official locked signature, marketing campaign banner, and legal disclaimer.
            </p>
            <div className="mt-3 py-1.5 px-2 bg-emerald-100/70 text-emerald-800 rounded text-[11px] font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
              100% Brand & Legal Compliant
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs text-slate-600">
            <span className="font-semibold text-slate-900 block mb-1">CodeTwo Migration Status</span>
            Replace yearly $7,500 renewal with in-house proprietary platform owned by Compunnel.
          </div>
        </div>
      </div>

      {/* STEP BY STEP FOOTER BOX (From Wireframe 1) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-4">STEP BY STEP PROCESS</h3>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {[
            { step: '1', title: 'Directory Sync', desc: 'Directory details sync to the SignatureHub service.' },
            { step: '2', title: 'Admins Publish', desc: 'Admins publish templates, banners, and rules.' },
            { step: '3', title: 'Employee Note', desc: 'Employee optionally saves a note with start and end dates.' },
            { step: '4', title: 'Outlook Compose', desc: 'User opens new email; Outlook add-in asks the service.' },
            { step: '5', title: 'Auto-Insert', desc: 'Personal note and locked official signature are inserted.' },
            { step: '6', title: 'Fail-Safe', desc: 'If service is offline, fallback default signature is used.' },
          ].map((item) => (
            <div key={item.step} className="flex flex-col items-start space-y-2">
              <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                {item.step}
              </span>
              <p className="font-semibold text-xs text-slate-900">{item.title}</p>
              <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

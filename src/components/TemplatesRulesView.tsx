import React, { useState } from 'react';
import { Rule, SignatureTemplate, Employee } from '../types';
import { Plus, ArrowUpDown, Search, CheckCircle2, Shield, AlertTriangle, Eye, Layers } from 'lucide-react';

interface TemplatesRulesViewProps {
  rules: Rule[];
  templates: SignatureTemplate[];
  employees: Employee[];
  onAddRule: (rule: Rule) => void;
  onPublishPilot: () => void;
}

export const TemplatesRulesView: React.FC<TemplatesRulesViewProps> = ({
  rules,
  templates,
  employees,
  onAddRule,
  onPublishPilot,
}) => {
  const [selectedSubTab, setSelectedSubTab] = useState('templates');
  const [selectedPersonId, setSelectedPersonId] = useState(employees[0]?.id || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewRuleModal, setShowNewRuleModal] = useState(false);
  const [newRuleName, setNewRuleName] = useState('');
  const [newRuleWho, setNewRuleWho] = useState('Marketing');
  const [newRuleAppliesTo, setNewRuleAppliesTo] = useState<Rule['appliesTo']>('External');

  const selectedPerson = employees.find((e) => e.id === selectedPersonId) || employees[0];

  // Rule evaluator simulation
  const evaluatedRule = rules.find((r) => {
    if (r.who.toLowerCase().includes(selectedPerson.department.toLowerCase())) return true;
    if (r.who === 'All staff') return true;
    return false;
  }) || rules[rules.length - 1];

  const activeTemplate = templates.find((t) => t.name === evaluatedRule?.template) || templates[0];

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleName.trim()) return;
    const created: Rule = {
      id: `rule-${Date.now()}`,
      order: rules.length + 1,
      name: newRuleName,
      who: newRuleWho,
      appliesTo: newRuleAppliesTo,
      template: activeTemplate.name,
      status: 'Pilot',
    };
    onAddRule(created);
    setNewRuleName('');
    setShowNewRuleModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 py-6">
      {/* Header matching Wireframe 2 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Templates and rules</h1>
          <p className="text-sm text-slate-500 mt-1">
            Authoritative rules engine evaluated top-to-bottom for every outgoing email
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowNewRuleModal(true)}
            className="px-4 py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl text-sm font-semibold shadow-xs flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4 text-slate-500" />
            New rule
          </button>
          <button
            onClick={onPublishPilot}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-xs transition-all flex items-center gap-1.5"
          >
            <Shield className="w-4 h-4" />
            Publish to pilot group
          </button>
        </div>
      </div>

      {/* Main 3-Column Layout from Wireframe 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sub-nav (Col 1-2) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-2 shadow-xs space-y-1 text-sm font-medium">
          {[
            { id: 'templates', label: 'Templates and rules' },
            { id: 'banners', label: 'Banners' },
            { id: 'reports', label: 'Reports' },
            { id: 'history', label: 'Change history' },
            { id: 'roles', label: 'Roles' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedSubTab(item.id)}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all ${
                selectedSubTab === item.id
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Center: Rules Table (Col 3-8) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                RULES, CHECKED TOP TO BOTTOM (SAMPLE CONTENT)
              </h2>
              <span className="text-xs text-slate-400">First matching rule applies</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-bold text-slate-500">
                    <th className="pb-3 w-12">Order</th>
                    <th className="pb-3">Rule</th>
                    <th className="pb-3">Who</th>
                    <th className="pb-3">Applies to</th>
                    <th className="pb-3">Template</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {rules.map((rule) => (
                    <tr
                      key={rule.id}
                      className={`hover:bg-slate-50/80 transition-all ${
                        evaluatedRule.id === rule.id ? 'bg-blue-50/60 font-medium' : ''
                      }`}
                    >
                      <td className="py-3 text-slate-400 font-mono font-semibold">{rule.order}</td>
                      <td className="py-3 text-slate-900 font-medium">
                        {rule.name}
                        {evaluatedRule.id === rule.id && (
                          <span className="ml-2 text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold">
                            MATCH
                          </span>
                        )}
                      </td>
                      <td className="py-3 text-slate-600">[{rule.who}]</td>
                      <td className="py-3 text-slate-600">{rule.appliesTo}</td>
                      <td className="py-3 text-slate-500 max-w-[140px] truncate" title={rule.template}>
                        {rule.template}
                      </td>
                      <td className="py-3 text-right">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            rule.status === 'Live'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {rule.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Test rule simulator (From Wireframe 2) */}
          <div className="border-t border-slate-100 pt-5">
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Test: pick a person to see which rule and template they get
            </label>
            <div className="relative">
              <select
                value={selectedPersonId}
                onChange={(e) => setSelectedPersonId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              >
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} — {emp.title} ({emp.department})
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-3 p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-center justify-between">
              <span>
                Simulated match for <strong className="font-semibold">{selectedPerson.name}</strong>:
              </span>
              <span className="font-bold text-blue-700 bg-white px-2 py-1 rounded border border-blue-200">
                Rule #{evaluatedRule.order}: {evaluatedRule.name}
              </span>
            </div>
          </div>
        </div>

        {/* Right Preview Panel (Col 9-12) (From Wireframe 2) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-blue-600" />
              TEMPLATE PREVIEW (LOCKED FOR EMPLOYEES)
            </span>
            <span className="text-[10px] text-slate-400 font-semibold bg-slate-100 px-2 py-0.5 rounded">
              Immutable
            </span>
          </div>

          {/* Locked Signature Visual Output */}
          <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 space-y-3 font-sans">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-lg bg-blue-600 text-white flex flex-col items-center justify-center font-bold text-xs tracking-tighter shrink-0 shadow-xs">
                <span>COMP</span>
                <span className="text-[9px] -mt-1 text-blue-200">DIGITAL</span>
              </div>
              <div className="space-y-0.5">
                <p className="font-bold text-slate-900 text-sm leading-tight">{selectedPerson.name}</p>
                <p className="text-xs text-slate-600 font-medium">
                  {selectedPerson.title} | {selectedPerson.department}
                </p>
                <p className="text-xs text-blue-600">
                  {selectedPerson.phone} • {selectedPerson.email}
                </p>
                <p className="text-[11px] text-slate-500">{selectedPerson.office}</p>
              </div>
            </div>

            {/* Campaign Banner if template has banner */}
            {activeTemplate.hasBanner && (
              <div className="mt-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-xs font-medium px-3 py-2 rounded-lg text-center shadow-xs">
                {activeTemplate.bannerText}
              </div>
            )}

            {/* Legal Disclaimer */}
            <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-200/80 leading-relaxed">
              [Legal disclaimer text, edited only by Legal]: {activeTemplate.disclaimer}
            </div>
          </div>

          <p className="text-xs text-slate-500 italic text-center">
            Empty staff details are automatically hidden with no blank gaps.
          </p>
        </div>
      </div>

      {/* New Rule Modal */}
      {showNewRuleModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Create New Signature Rule</h3>
            <form onSubmit={handleCreateRule} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Rule Name</label>
                <input
                  type="text"
                  placeholder="e.g. Consulting & Client Facing"
                  value={newRuleName}
                  onChange={(e) => setNewRuleName(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Target Audience (Who)</label>
                <input
                  type="text"
                  placeholder="e.g. Consulting, Sales, or All staff"
                  value={newRuleWho}
                  onChange={(e) => setNewRuleWho(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Applies To</label>
                <select
                  value={newRuleAppliesTo}
                  onChange={(e) => setNewRuleAppliesTo(e.target.value as Rule['appliesTo'])}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                >
                  <option value="External, new mail">External, new mail</option>
                  <option value="External">External</option>
                  <option value="Internal, replies">Internal, replies</option>
                  <option value="Everything else">Everything else</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowNewRuleModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700"
                >
                  Save Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

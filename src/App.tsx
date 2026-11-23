import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { OverviewView } from './components/OverviewView';
import { TemplatesRulesView } from './components/TemplatesRulesView';
import { EmployeeNoteView } from './components/EmployeeNoteView';
import { OutlookComposeView } from './components/OutlookComposeView';
import { ReportsHistoryView } from './components/ReportsHistoryView';
import {
  INITIAL_EMPLOYEES,
  INITIAL_RULES,
  INITIAL_TEMPLATES,
  INITIAL_HISTORY,
  INITIAL_STAFF_ISSUES,
} from './mockData';
import { Employee, Rule, SignatureTemplate, ChangeHistoryItem } from './types';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [userRole, setUserRole] = useState<'admin' | 'employee'>('admin');
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [rules, setRules] = useState<Rule[]>(INITIAL_RULES);
  const [templates, setTemplates] = useState<SignatureTemplate[]>(INITIAL_TEMPLATES);
  const [history, setHistory] = useState<ChangeHistoryItem[]>(INITIAL_HISTORY);
  const [toastMessage, setToastMessage] = useState<string>('');

  const currentEmployee = employees[0]; // Vikram Rajput
  const currentTemplate = templates[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleAddRule = (newRule: Rule) => {
    setRules((prev) => [newRule, ...prev]);
    setHistory((prev) => [
      {
        id: `hist-${Date.now()}`,
        when: 'Just now',
        who: 'Admin (IT)',
        role: 'Admin',
        whatChanged: `Created new rule: "${newRule.name}"`,
        canRestore: true,
      },
      ...prev,
    ]);
    showToast(`New rule "${newRule.name}" added to policy engine.`);
  };

  const handlePublishPilot = () => {
    setRules((prev) =>
      prev.map((r) => (r.status === 'Pilot' ? { ...r, status: 'Live' } : r))
    );
    setHistory((prev) => [
      {
        id: `hist-${Date.now()}`,
        when: 'Just now',
        who: 'Admin (IT)',
        role: 'Admin',
        whatChanged: 'Published pilot rules to live production groups',
        canRestore: true,
      },
      ...prev,
    ]);
    showToast('Rules published to live Microsoft 365 Exchange transport pilot group!');
  };

  const handleUpdateNote = (note: Employee['note']) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === currentEmployee.id ? { ...emp, note } : emp))
    );
    if (note) {
      setHistory((prev) => [
        {
          id: `hist-${Date.now()}`,
          when: 'Just now',
          who: currentEmployee.name,
          role: 'Employee',
          whatChanged: `Updated My Note: "${note.text.slice(0, 35)}..."`,
          canRestore: false,
        },
        ...prev,
      ]);
    }
  };

  const handleRestore = (historyId: string) => {
    setHistory((prev) =>
      prev.map((h) => (h.id === historyId ? { ...h, canRestore: false } : h))
    );
    showToast('Previous configuration version restored successfully.');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
      />

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-lg border border-slate-700 flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      <main className="flex-1 px-4 sm:px-6 py-4">
        {activeTab === 'overview' && (
          <OverviewView
            onNavigateToTemplates={() => setActiveTab('templates')}
            onNavigateToEmployee={() => setActiveTab('note')}
          />
        )}
        {activeTab === 'templates' && (
          <TemplatesRulesView
            rules={rules}
            templates={templates}
            employees={employees}
            onAddRule={handleAddRule}
            onPublishPilot={handlePublishPilot}
          />
        )}
        {activeTab === 'note' && (
          <EmployeeNoteView
            employee={currentEmployee}
            template={currentTemplate}
            onUpdateNote={handleUpdateNote}
          />
        )}
        {activeTab === 'outlook' && (
          <OutlookComposeView
            employee={currentEmployee}
            template={currentTemplate}
            onEditNoteClick={() => setActiveTab('note')}
          />
        )}
        {activeTab === 'reports' && (
          <ReportsHistoryView
            history={history}
            staffIssues={INITIAL_STAFF_ISSUES}
            onRestore={handleRestore}
          />
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-4 px-6 text-center text-xs text-slate-500">
        Compunnel Digital • SignatureHub Enterprise Email Signature Governance • Microsoft 365 Architecture
      </footer>
    </div>
  );
};

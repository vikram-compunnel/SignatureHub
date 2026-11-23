import React, { useState } from 'react';
import { Employee, SignatureTemplate } from '../types';
import { CheckCircle2, AlertCircle, Calendar, ShieldCheck, Trash2, Save } from 'lucide-react';

interface EmployeeNoteViewProps {
  employee: Employee;
  template: SignatureTemplate;
  onUpdateNote: (note: Employee['note']) => void;
}

export const EmployeeNoteView: React.FC<EmployeeNoteViewProps> = ({
  employee,
  template,
  onUpdateNote,
}) => {
  const [noteText, setNoteText] = useState(
    employee.note?.text || 'I am on leave from Nov 28 to Dec 02. For urgent matters please contact colleague@compunnel.com.'
  );
  const [startDate, setStartDate] = useState(employee.note?.startDate || '2026-11-28');
  const [endDate, setEndDate] = useState(employee.note?.endDate || '2026-12-02');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Company rules check as user types (from Wireframe 3)
  const isWithinLength = noteText.length <= 200;
  const isPlainTextOnly = !/<[^>]*>/g.test(noteText);
  const hasNoMedicalReason = !/sick|surgery|hospital|medical|illness|doctor/i.test(noteText);
  const hasEndDate = endDate.trim().length > 0;
  const isCompliant = isWithinLength && isPlainTextOnly && hasNoMedicalReason && hasEndDate;

  const handleSave = () => {
    if (!isCompliant) return;
    onUpdateNote({
      text: noteText,
      startDate,
      endDate,
      isActive: true,
    });
    setFeedbackMsg('Note successfully saved and active until ' + endDate + '!');
    setTimeout(() => setFeedbackMsg(''), 4000);
  };

  const handleRemove = () => {
    onUpdateNote(undefined);
    setNoteText('');
    setFeedbackMsg('Note removed.');
    setTimeout(() => setFeedbackMsg(''), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 py-6">
      {/* Title section from Wireframe 3 */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">My note</h1>
        <p className="text-slate-600 mt-2 text-base">
          Add a short note above the official signature, such as a leave notice. You cannot change the signature itself.
        </p>
      </div>

      {feedbackMsg && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {feedbackMsg}
        </div>
      )}

      {/* Main 2-Column Layout from Wireframe 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Form Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-bold text-slate-800">Note (max 200 characters)</label>
              <span
                className={`text-xs font-mono font-medium ${
                  noteText.length > 200 ? 'text-red-600 font-bold' : 'text-slate-400'
                }`}
              >
                {noteText.length} / 200
              </span>
            </div>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              rows={4}
              placeholder="e.g. I am on leave from [start date] to [end date]. For urgent matters please contact [colleague]."
              className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Show from</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Remove on (required)
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                required
              />
            </div>
          </div>

          {/* Company Rules Checked as you type (From Wireframe 3) */}
          <div className="border-t border-slate-100 pt-4 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              COMPANY RULES, CHECKED AS YOU TYPE
            </span>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2">
                {isPlainTextOnly ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                )}
                <span className={isPlainTextOnly ? 'text-slate-600' : 'text-red-600 font-semibold'}>
                  Plain text only (no raw HTML or script tags)
                </span>
              </div>
              <div className="flex items-center gap-2">
                {hasNoMedicalReason ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                )}
                <span className={hasNoMedicalReason ? 'text-slate-600' : 'text-red-600 font-semibold'}>
                  No personal/medical reasons for leave (HR privacy policy)
                </span>
              </div>
              <div className="flex items-center gap-2">
                {hasEndDate ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                )}
                <span className={hasEndDate ? 'text-slate-600' : 'text-amber-600 font-semibold'}>
                  End date is required for automatic clean-up
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={!isCompliant}
              className={`px-6 py-2.5 rounded-xl font-semibold text-sm shadow-xs flex items-center gap-2 transition-all ${
                isCompliant
                  ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Save className="w-4 h-4" />
              Save note
            </button>
            <button
              onClick={handleRemove}
              className="px-4 py-2.5 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl font-semibold text-sm transition-all"
            >
              Remove note
            </button>
          </div>
        </div>

        {/* Right Preview Card (From Wireframe 3) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              PREVIEW OF YOUR EMAIL
            </span>
            <span className="text-xs text-blue-600 font-semibold">Live Composite</span>
          </div>

          <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-4">
            {/* Note bubble from Wireframe 3 */}
            {noteText.trim() ? (
              <div className="p-3 bg-blue-50 border border-blue-200 text-blue-900 rounded-xl text-xs font-medium leading-relaxed">
                {noteText}
              </div>
            ) : (
              <div className="p-3 bg-slate-100/60 border border-dashed border-slate-300 text-slate-400 rounded-xl text-xs italic">
                (No custom note active — official signature will be sent directly)
              </div>
            )}

            {/* Official Signature */}
            <div className="pt-2 border-t border-slate-200 space-y-1">
              <p className="font-bold text-slate-900 text-sm">{employee.name}</p>
              <p className="text-xs text-slate-600 font-medium">
                {employee.title} | {employee.department}
              </p>
              <p className="text-xs text-blue-600">{employee.phone} | {employee.office}</p>
              <p className="text-[11px] text-slate-400 pt-1">Official signature and disclaimer (locked)</p>
            </div>
          </div>

          <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
            Your note disappears by itself on the end date. We remind you before it expires.
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Employee, SignatureTemplate } from '../types';
import { Send, Lock, CheckSquare, Square, Edit3, Shield, Mail, Paperclip } from 'lucide-react';

interface OutlookComposeViewProps {
  employee: Employee;
  template: SignatureTemplate;
  onEditNoteClick: () => void;
}

export const OutlookComposeView: React.FC<OutlookComposeViewProps> = ({
  employee,
  template,
  onEditNoteClick,
}) => {
  const [recipient, setRecipient] = useState('client-contact@acmecorp.com');
  const [subject, setSubject] = useState('Re: Compunnel AI Solutions Implementation Q1 2027');
  const [messageBody, setMessageBody] = useState(
    'Hi team,\n\nThank you for the productive discussion earlier today. Please find the implementation timeline attached. Let me know if you have any questions.\n\nBest regards,'
  );
  const [useSignature, setUseSignature] = useState(true);

  return (
    <div className="max-w-6xl mx-auto space-y-6 py-6">
      {/* Title section from Wireframe 4 */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">What the user sees in Outlook</h1>
        <p className="text-slate-600 mt-2 text-base">
          Interactive simulation of the Outlook compose canvas and the SignatureHub side add-in pane
        </p>
      </div>

      {/* Main 2-Column Layout from Wireframe 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Outlook Compose Window (Col 1-8) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-300 shadow-md overflow-hidden">
          {/* Outlook-style top ribbon */}
          <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs">
                <Send className="w-3.5 h-3.5" />
                Send
              </button>
              <button className="text-slate-600 hover:bg-slate-200/70 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1">
                <Paperclip className="w-3.5 h-3.5" />
                Attach File
              </button>
            </div>
            <span className="text-xs font-medium text-slate-500">Outlook for Microsoft 365</span>
          </div>

          <div className="p-6 space-y-4">
            {/* Headers */}
            <div className="space-y-3 pb-3 border-b border-slate-100">
              <div className="flex items-center text-sm">
                <span className="w-16 font-semibold text-slate-500">To:</span>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-blue-500 font-mono"
                />
              </div>
              <div className="flex items-center text-sm">
                <span className="w-16 font-semibold text-slate-500">Subject:</span>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-blue-500 font-medium"
                />
              </div>
            </div>

            {/* Email Message typed by user */}
            <div>
              <textarea
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
                rows={5}
                className="w-full text-slate-800 text-sm leading-relaxed p-2 focus:outline-hidden resize-y font-sans border border-transparent hover:border-slate-200 rounded-lg"
              />
            </div>

            {/* Injected Signature Area */}
            {useSignature && (
              <div className="pt-4 border-t border-slate-200 space-y-3">
                {/* 1. Employee Note (Bubble from Wireframe 4) */}
                {employee.note && employee.note.isActive && (
                  <div className="flex items-start gap-2 bg-blue-50 border border-blue-200/80 rounded-xl p-3 text-xs text-blue-900 shadow-2xs">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                      1
                    </span>
                    <div className="space-y-0.5">
                      <span className="font-semibold text-blue-950 block">Employee note, added automatically:</span>
                      <p>{employee.note.text}</p>
                    </div>
                  </div>
                )}

                {/* 2. Official Locked Signature */}
                <div className="flex items-start gap-2 bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                    2
                  </span>
                  <div className="space-y-2 w-full">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{employee.name}</p>
                        <p className="text-slate-600 font-medium">
                          {employee.title} | {employee.department}
                        </p>
                        <p className="text-blue-600">{employee.phone} | {employee.office}</p>
                      </div>
                      <div className="w-10 h-10 rounded bg-blue-600 text-white flex flex-col items-center justify-center font-bold text-[10px]">
                        <span>COMP</span>
                      </div>
                    </div>

                    {/* Marketing Banner */}
                    {template.hasBanner && (
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-[11px] font-medium px-3 py-1.5 rounded-lg text-center">
                        {template.bannerText}
                      </div>
                    )}

                    {/* Legal disclaimer */}
                    <p className="text-[10px] text-slate-400 pt-1 leading-relaxed border-t border-slate-200">
                      [Legal disclaimer text]: {template.disclaimer}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Signature Add-in Pane (Col 9-12) (From Wireframe 4) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Shield className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              SIGNATURE ADD-IN PANE
            </h3>
          </div>

          <div className="space-y-3.5 text-xs">
            {/* Item 3: Official Signature Locked */}
            <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                3
              </span>
              <div className="flex items-center justify-between w-full">
                <span className="font-semibold text-slate-800">Official signature</span>
                <span className="text-[10px] text-slate-500 font-medium flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-slate-200">
                  <Lock className="w-3 h-3 text-slate-400" /> locked
                </span>
              </div>
            </div>

            {/* Item 4: My note active until */}
            <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                4
              </span>
              <div>
                <span className="font-semibold text-slate-800 block">My note status:</span>
                <span className="text-slate-500 text-[11px]">
                  {employee.note?.isActive
                    ? `Active until ${employee.note.endDate}`
                    : 'No active leave note'}
                </span>
              </div>
            </div>

            {/* Item 5: Use my signatures Checkbox */}
            <div className="flex items-center gap-2.5 p-2.5 bg-blue-50/60 rounded-xl border border-blue-200">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                5
              </span>
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-800">
                <input
                  type="checkbox"
                  checked={useSignature}
                  onChange={(e) => setUseSignature(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                Use my signatures
              </label>
            </div>
          </div>

          <button
            onClick={onEditNoteClick}
            className="w-full py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <Edit3 className="w-3.5 h-3.5 text-slate-500" />
            Edit my note
          </button>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 leading-relaxed">
            Works the same in Windows, Mac, web, iPhone and Android. If the service is down, a default signature is used.
          </div>
        </div>
      </div>
    </div>
  );
};

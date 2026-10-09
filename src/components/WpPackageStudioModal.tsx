import React, { useState } from 'react';
import { VirtualFile } from '../data/wpVirtualFiles';
import { FolderGit2, Plus, Download, Check, Save, FileCode, X, Sparkles } from 'lucide-react';

interface WpPackageStudioProps {
  files: VirtualFile[];
  onUpdateFile: (path: string, newContent: string) => void;
  onAddFile: (newFile: VirtualFile) => void;
  onDownloadPackage: (pkg: 'theme' | 'core' | 'docs' | 'all') => void;
  onClose?: () => void;
  isModal?: boolean;
}

export const WpPackageStudio: React.FC<WpPackageStudioProps> = ({
  files,
  onUpdateFile,
  onAddFile,
  onDownloadPackage,
  onClose,
  isModal = false
}) => {
  const [selectedPkg, setSelectedPkg] = useState<'core' | 'theme' | 'docs'>('core');
  const pkgFiles = files.filter((f) => f.package === selectedPkg);
  const [activeFilePath, setActiveFilePath] = useState<string>(
    pkgFiles[0]?.path || 'hackersshikkhok-core/hackersshikkhok-core.php'
  );
  const [newFileName, setNewFileName] = useState('');
  const [showNewFileForm, setShowNewFileForm] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const activeFile =
    files.find((f) => f.path === activeFilePath) ||
    pkgFiles[0] ||
    files[0];

  const handlePkgSwitch = (pkg: 'core' | 'theme' | 'docs') => {
    setSelectedPkg(pkg);
    const first = files.find((f) => f.package === pkg);
    if (first) setActiveFilePath(first.path);
  };

  const handleCreateFile = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newFileName.trim().replace(/^\/+/, '');
    if (!trimmed) return;

    const prefix =
      selectedPkg === 'core'
        ? 'hackersshikkhok-core/'
        : selectedPkg === 'theme'
        ? 'hackersshikkhok-theme/'
        : 'hackersshikkhok-docs/';

    const fullPath = trimmed.startsWith(prefix) ? trimmed : `${prefix}${trimmed}`;
    const ext = fullPath.split('.').pop()?.toLowerCase() || 'php';
    const language: VirtualFile['language'] =
      ext === 'css'
        ? 'css'
        : ext === 'js'
        ? 'javascript'
        : ext === 'json'
        ? 'json'
        : ext === 'md'
        ? 'markdown'
        : 'php';

    const starterContent =
      language === 'php'
        ? `<?php\ndeclare(strict_types=1);\n\nnamespace HackersShikkhok\\${selectedPkg === 'core' ? 'Core' : 'Theme'};\n\nif ( ! defined( 'ABSPATH' ) ) {\n    exit;\n}\n\n// Added via HackersShikkhok Live Zip Studio\n`
        : language === 'css'
        ? `/* Added via HackersShikkhok Live Zip Studio */\n`
        : language === 'javascript'
        ? `// Added via HackersShikkhok Live Zip Studio\n(function(){\n  'use strict';\n})();\n`
        : `# New Documentation Module\n`;

    const created: VirtualFile = {
      path: fullPath,
      package: selectedPkg,
      language,
      content: starterContent,
      updatedAt: new Date().toISOString().slice(0, 10)
    };

    onAddFile(created);
    setActiveFilePath(fullPath);
    setNewFileName('');
    setShowNewFileForm(false);
  };

  const triggerSaveIndicator = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 1800);
  };

  const coreCount = files.filter((f) => f.package === 'core').length;
  const themeCount = files.filter((f) => f.package === 'theme').length;
  const docsCount = files.filter((f) => f.package === 'docs').length;

  return (
    <div
      className={`${
        isModal
          ? 'fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 md:p-6'
          : ''
      }`}
    >
      <div
        className={`bg-[#0b1120] border border-[#00f5d4]/30 rounded-2xl w-full ${
          isModal ? 'max-w-7xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden' : 'p-5 md:p-6'
        }`}
      >
        {/* Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 md:px-6 border-b border-slate-800 bg-[#050811]/70">
          <div className="flex items-center gap-2.5">
            <FolderGit2 className="w-5 h-5 text-[#00f5d4]" />
            <div>
              <h2 className="text-base md:text-lg font-bold text-white">
                WordPress Theme + Core Plugin + Docs Live Auto-Rezip Studio
              </h2>
              <p className="text-xs text-slate-400">
                যেকোনো PHP/CSS/JS ফাইল আপডেট বা নতুন ফাইল যুক্ত করলেই ডাউনলোড বাটনে সাথে সাথে নতুন `.zip` তৈরি হবে
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onDownloadPackage('theme')}
              className="px-3.5 py-2 rounded-lg bg-[#00f5d4] hover:bg-[#00f5d4]/90 text-[#050811] font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              🛡️ Theme Zip ({themeCount} files) 📥
            </button>
            <button
              onClick={() => onDownloadPackage('core')}
              className="px-3.5 py-2 rounded-lg bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              ⚙️ Plugin Zip ({coreCount} files) 🔌
            </button>
            <button
              onClick={() => onDownloadPackage('docs')}
              className="px-3.5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-[#050811] font-extrabold text-xs flex items-center gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(16,185,129,0.3)]"
            >
              📚 Dev Docs Zip ({docsCount}) 📥
            </button>
            <button
              onClick={() => onDownloadPackage('all')}
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              📦 Complete All Zip
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-slate-900 hover:bg-rose-950/60 text-slate-400 hover:text-rose-300 border border-slate-800 cursor-pointer"
                aria-label="Close Studio"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Package Selector Tabs + Add File */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 md:px-6 py-3 bg-[#0b1120] border-b border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handlePkgSwitch('core')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                selectedPkg === 'core'
                  ? 'bg-[#7c3aed] text-white'
                  : 'bg-[#050811] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              ⚙️ hackersshikkhok-core ({coreCount} Files)
            </button>
            <button
              onClick={() => handlePkgSwitch('theme')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                selectedPkg === 'theme'
                  ? 'bg-[#00f5d4] text-[#050811] font-bold'
                  : 'bg-[#050811] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              🛡️ hackersshikkhok-theme ({themeCount} Files)
            </button>
            <button
              onClick={() => handlePkgSwitch('docs')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                selectedPkg === 'docs'
                  ? 'bg-emerald-500 text-[#050811] font-bold'
                  : 'bg-[#050811] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              📚 hackersshikkhok-docs ({docsCount} Files)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowNewFileForm((s) => !s)}
              className="px-3 py-1.5 rounded-lg bg-[#050811] hover:bg-slate-900 text-[#00f5d4] border border-[#00f5d4]/40 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> নতুন ফাইল যুক্ত করুন (+ Add File)
            </button>
          </div>
        </div>

        {showNewFileForm && (
          <form
            onSubmit={handleCreateFile}
            className="px-6 py-3 bg-[#050811] border-b border-slate-800 flex flex-wrap items-center gap-2"
          >
            <span className="text-xs font-mono text-slate-400">
              {selectedPkg === 'core'
                ? 'hackersshikkhok-core/'
                : selectedPkg === 'theme'
                ? 'hackersshikkhok-theme/'
                : 'hackersshikkhok-docs/'}
            </span>
            <input
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="includes/Custom/MyNewFeature.php বা assets/css/custom.css"
              className="flex-1 min-w-[240px] px-3 py-1.5 bg-[#0b1120] border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-[#00f5d4]"
            />
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-[#00f5d4] text-[#050811] font-bold text-xs cursor-pointer"
            >
              Create &amp; Sync to ZIP
            </button>
          </form>
        )}

        {/* File Tree + Live Editor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 min-h-[440px] overflow-hidden">
          <div className="lg:col-span-4 border-r border-slate-800 bg-[#050811]/80 overflow-y-auto max-h-[480px] p-3 space-y-1">
            {pkgFiles.map((file) => {
              const shortName = file.path.replace(/^hackersshikkhok-(core|theme|docs)\//, '');
              return (
                <button
                  key={file.path}
                  onClick={() => setActiveFilePath(file.path)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                    activeFile?.path === file.path
                      ? 'bg-[#00f5d4]/15 text-[#00f5d4] border border-[#00f5d4]/40 font-semibold'
                      : 'text-slate-300 hover:bg-slate-900/80'
                  }`}
                >
                  <span className="truncate flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    {shortName}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase">{file.language}</span>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-8 flex flex-col bg-[#050811]">
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-slate-900/70 border-b border-slate-800">
              <div className="text-xs font-mono text-[#00f5d4] truncate">{activeFile?.path}</div>
              <div className="flex items-center gap-2">
                {savedNotice && (
                  <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Synced to Live ZIP Memory!
                  </span>
                )}
                <button
                  onClick={triggerSaveIndicator}
                  className="px-3 py-1 rounded bg-[#00f5d4]/20 hover:bg-[#00f5d4]/30 text-[#00f5d4] border border-[#00f5d4]/40 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" /> Save &amp; Sync ZIP
                </button>
              </div>
            </div>

            <textarea
              value={activeFile?.content || ''}
              onChange={(e) => activeFile && onUpdateFile(activeFile.path, e.target.value)}
              spellCheck={false}
              className="w-full flex-1 min-h-[390px] p-4 bg-[#050811] text-emerald-300 font-mono text-xs leading-relaxed focus:outline-none resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

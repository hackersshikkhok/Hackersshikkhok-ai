import React, { useState, useMemo } from 'react';
import { CODE_LIBRARY_SNIPPETS, CodeSnippetItem } from '../data/platformData';
import { Play, RotateCcw, Maximize2, Minimize2, Copy, Download, RefreshCw, ShieldCheck, Check } from 'lucide-react';

export const LiveDemoPlayground: React.FC = () => {
  const [selectedSnippet, setSelectedSnippet] = useState<CodeSnippetItem>(CODE_LIBRARY_SNIPPETS[0]);
  const [html, setHtml] = useState(CODE_LIBRARY_SNIPPETS[0].htmlCode);
  const [css, setCss] = useState(CODE_LIBRARY_SNIPPETS[0].cssCode);
  const [js, setJs] = useState(CODE_LIBRARY_SNIPPETS[0].jsCode);
  const [activeEditorTab, setActiveEditorTab] = useState<'html' | 'css' | 'js'>('html');
  const [runVersion, setRunVersion] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSelectSnippet = (snippet: CodeSnippetItem) => {
    setSelectedSnippet(snippet);
    setHtml(snippet.htmlCode);
    setCss(snippet.cssCode);
    setJs(snippet.jsCode);
    setRunVersion((v) => v + 1);
  };

  const handleReset = () => {
    setHtml(selectedSnippet.htmlCode);
    setCss(selectedSnippet.cssCode);
    setJs(selectedSnippet.jsCode);
    setRunVersion((v) => v + 1);
  };

  const srcDoc = useMemo(() => {
    return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src data: https:;">
<style>${css}</style>
</head>
<body>
${html}
<script>
try {
  ${js}
} catch (err) {
  console.error('Sandbox runtime error:', err);
}
</script>
</body>
</html>`;
  }, [html, css, js, runVersion]);

  const currentEditorValue =
    activeEditorTab === 'html' ? html : activeEditorTab === 'css' ? css : js;

  const handleEditorChange = (val: string) => {
    if (activeEditorTab === 'html') setHtml(val);
    else if (activeEditorTab === 'css') setCss(val);
    else setJs(val);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentEditorValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleDownloadBundle = () => {
    const blob = new Blob([srcDoc], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedSnippet.id}-sandbox-demo.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={`bg-[#0b1120] border border-[#00f5d4]/25 rounded-2xl p-5 md:p-6 ${
        isFullscreen ? 'fixed inset-3 z-50 overflow-y-auto shadow-2xl' : ''
      }`}
    >
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00f5d4]">
            <ShieldCheck className="w-4 h-4" />
            <span>SANDBOXED LIVE DEMO ENGINE · ORIGIN ISOLATED · NO COOKIE/PARENT DOM ACCESS</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">
            লাইভ কোড ডেমো ও স্যান্ডবক্স প্লেগ্রাউন্ড (HTML / CSS / JS)
          </h2>
        </div>

        {/* Action Buttons: Run, Reset, Refresh, Copy, Download, Fullscreen */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setRunVersion((v) => v + 1)}
            className="px-3.5 py-2 rounded-lg bg-[#00f5d4] hover:bg-[#00f5d4]/90 text-[#050811] font-bold text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" /> Run
          </button>
          <button
            onClick={() => setRunVersion((v) => v + 1)}
            className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
          <button
            onClick={handleReset}
            className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
          <button
            onClick={handleCopy}
            className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-[#00f5d4] border border-[#00f5d4]/30 text-xs flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button
            onClick={handleDownloadBundle}
            className="px-3 py-2 rounded-lg bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> Download
          </button>
          <button
            onClick={() => setIsFullscreen((f) => !f)}
            className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs flex items-center gap-1.5 cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
        </div>
      </div>

      {/* Preset Code Library Selector */}
      <div className="flex flex-wrap items-center gap-2 py-3 border-b border-slate-800/70">
        <span className="text-xs text-slate-400 mr-1">কোড লাইব্রেরি প্রিসেট:</span>
        {CODE_LIBRARY_SNIPPETS.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSelectSnippet(item)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              selectedSnippet.id === item.id
                ? 'bg-[#00f5d4]/20 text-[#00f5d4] border border-[#00f5d4]/50 font-semibold'
                : 'bg-[#050811] text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            {item.titleBn} · {item.version}
          </button>
        ))}
      </div>

      {/* Split Workspace: Code Editor Left, Sandboxed Iframe Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-5">
        <div className="lg:col-span-6 flex flex-col bg-[#050811] border border-slate-800 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/80 border-b border-slate-800">
            <div className="flex items-center gap-2">
              {(['html', 'css', 'js'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveEditorTab(tab)}
                  className={`px-3 py-1 rounded text-xs font-mono uppercase cursor-pointer ${
                    activeEditorTab === tab
                      ? 'bg-[#00f5d4] text-[#050811] font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              {selectedSnippet.language} · {selectedSnippet.difficulty}
            </span>
          </div>

          <textarea
            value={currentEditorValue}
            onChange={(e) => handleEditorChange(e.target.value)}
            spellCheck={false}
            className="w-full h-[360px] p-4 bg-[#050811] text-emerald-300 font-mono text-xs leading-relaxed focus:outline-none resize-none"
          />

          <div className="px-4 py-2.5 bg-slate-900/50 border-t border-slate-800 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
            <span>Security Note: {selectedSnippet.securityNotes}</span>
            <span className="font-mono text-[#00f5d4]">{selectedSnippet.downloads} downloads</span>
          </div>
        </div>

        {/* Sandboxed Iframe Output */}
        <div className="lg:col-span-6 flex flex-col bg-[#050811] border border-slate-800 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/80 border-b border-slate-800">
            <span className="text-xs font-mono text-slate-300">
              iframe[sandbox=&quot;allow-scripts&quot;] · Isolated Preview
            </span>
            <span className="text-[11px] font-mono text-emerald-400">CSP Locked</span>
          </div>
          <iframe
            key={runVersion}
            title="HackersShikkhok Sandboxed Code Preview"
            sandbox="allow-scripts"
            referrerPolicy="no-referrer"
            srcDoc={srcDoc}
            className="w-full h-[396px] border-0 bg-[#050811]"
          />
        </div>
      </div>
    </div>
  );
};

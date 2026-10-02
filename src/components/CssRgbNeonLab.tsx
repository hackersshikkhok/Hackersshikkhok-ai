import React, { useState } from 'react';
import { CSS_NEON_GENERATORS } from '../data/platformData';
import { Copy, Download, RotateCcw, Check, Sparkles, Code2, Eye } from 'lucide-react';

export const CssRgbNeonLab: React.FC = () => {
  const [activeGen, setActiveGen] = useState(CSS_NEON_GENERATORS[0].id);
  const [primaryColor, setPrimaryColor] = useState('#00f5d4');
  const [secondaryColor, setSecondaryColor] = useState('#7c3aed');
  const [accentColor, setAccentColor] = useState('#f43f5e');
  const [bgColor, setBgColor] = useState('#0b1120');
  const [textColor, setTextColor] = useState('#e2e8f0');
  const [animSpeed, setAnimSpeed] = useState(4);
  const [borderWidth, setBorderWidth] = useState(2);
  const [borderRadius, setBorderRadius] = useState(16);
  const [glowIntensity, setGlowIntensity] = useState(24);
  const [animType, setAnimType] = useState<'pulse' | 'rotate-hue' | 'static-neon'>('pulse');
  const [activeCodeTab, setActiveCodeTab] = useState<'css' | 'html' | 'js'>('css');
  const [copied, setCopied] = useState(false);

  const handleReset = () => {
    setPrimaryColor('#00f5d4');
    setSecondaryColor('#7c3aed');
    setAccentColor('#f43f5e');
    setBgColor('#0b1120');
    setTextColor('#e2e8f0');
    setAnimSpeed(4);
    setBorderWidth(2);
    setBorderRadius(16);
    setGlowIntensity(24);
    setAnimType('pulse');
  };

  const generatedHtml = `<div class="hs-neon-element" data-generator="${activeGen}">
  <div class="hs-neon-kicker">HACKERSSHIKKHOK · 2040 NEON LAB</div>
  <h3 class="hs-neon-heading">${CSS_NEON_GENERATORS.find((g) => g.id === activeGen)?.name || 'Cyber Element'}</h3>
  <p class="hs-neon-body">Hardware-accelerated CSS variable component with reduced-motion fallback.</p>
  <button type="button" class="hs-neon-cta">Activate Module</button>
</div>`;

  const generatedCss = `:root {
  --hs-gen-primary: ${primaryColor};
  --hs-gen-secondary: ${secondaryColor};
  --hs-gen-accent: ${accentColor};
  --hs-gen-bg: ${bgColor};
  --hs-gen-text: ${textColor};
  --hs-gen-radius: ${borderRadius}px;
  --hs-gen-border: ${borderWidth}px;
  --hs-gen-glow: ${glowIntensity}px;
  --hs-gen-speed: ${animSpeed}s;
}

.hs-neon-element {
  background: var(--hs-gen-bg);
  color: var(--hs-gen-text);
  border-radius: var(--hs-gen-radius);
  border: var(--hs-gen-border) solid var(--hs-gen-primary);
  padding: 28px;
  max-width: 420px;
  box-shadow:
    0 0 var(--hs-gen-glow) ${primaryColor}55,
    inset 0 0 calc(var(--hs-gen-glow) / 2) ${secondaryColor}33;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
  ${animType === 'pulse' ? 'animation: hsNeonPulse var(--hs-gen-speed) infinite alternate ease-in-out;' : ''}
  ${animType === 'rotate-hue' ? 'animation: hsHueShift var(--hs-gen-speed) infinite linear;' : ''}
}

.hs-neon-cta {
  margin-top: 16px;
  padding: 10px 20px;
  border-radius: calc(var(--hs-gen-radius) / 2);
  border: 1px solid var(--hs-gen-primary);
  background: linear-gradient(135deg, var(--hs-gen-primary), var(--hs-gen-secondary));
  color: #050811;
  font-weight: 700;
  cursor: pointer;
}

@keyframes hsNeonPulse {
  0% { box-shadow: 0 0 calc(var(--hs-gen-glow) * 0.6) ${primaryColor}44; }
  100% { box-shadow: 0 0 calc(var(--hs-gen-glow) * 1.4) ${secondaryColor}aa; }
}

@media (prefers-reduced-motion: reduce) {
  .hs-neon-element {
    animation: none !important;
  }
}`;

  const generatedJs = `// Optional interactive tilt & click handler for ${activeGen}
document.querySelectorAll('.hs-neon-cta').forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.textContent = 'Module Active ✓';
  });
});`;

  const currentCode =
    activeCodeTab === 'css' ? generatedCss : activeCodeTab === 'html' ? generatedHtml : generatedJs;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleDownload = () => {
    const ext = activeCodeTab === 'css' ? 'css' : activeCodeTab === 'html' ? 'html' : 'js';
    const blob = new Blob([currentCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hs-${activeGen}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const activeGenObj = CSS_NEON_GENERATORS.find((g) => g.id === activeGen) || CSS_NEON_GENERATORS[0];

  return (
    <div className="bg-[#0b1120] border border-[#00f5d4]/20 rounded-2xl p-5 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
        <div>
          <div className="text-xs font-mono text-[#00f5d4] tracking-wider">
            CSS / RGB / NEON CODE LAB · 15 REAL-TIME GENERATORS
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
            ১৫টি ইন্টারঅ্যাক্টিভ CSS / RGB / নিয়ন জেনারেটর ল্যাব
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> রিসেট (Reset)
          </button>
          <button
            onClick={handleCopy}
            className="px-3.5 py-2 rounded-lg bg-[#00f5d4]/15 hover:bg-[#00f5d4]/25 text-[#00f5d4] border border-[#00f5d4]/40 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'কপি হয়েছে!' : 'কোড কপি'}
          </button>
          <button
            onClick={handleDownload}
            className="px-3.5 py-2 rounded-lg bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> ডাউনলোড
          </button>
        </div>
      </div>

      {/* 15 Generator Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto py-4 border-b border-slate-800/60">
        {CSS_NEON_GENERATORS.map((gen, idx) => (
          <button
            key={gen.id}
            onClick={() => setActiveGen(gen.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer ${
              activeGen === gen.id
                ? 'bg-[#00f5d4] text-[#050811] font-bold shadow-[0_0_15px_rgba(0,245,212,0.35)]'
                : 'bg-[#050811] text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            {idx + 1}. {gen.nameBn}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Controls Column */}
        <div className="lg:col-span-4 space-y-4 bg-[#050811] p-4 rounded-xl border border-slate-800/90">
          <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            কাস্টমাইজেশন কন্ট্রোল (Instant Live Controls)
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="text-xs text-slate-400 block mb-1">Primary Color</span>
              <div className="flex items-center gap-2 bg-[#0b1120] p-1.5 rounded-lg border border-slate-800">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-7 h-7 rounded cursor-pointer bg-transparent border-0"
                />
                <span className="text-xs font-mono text-slate-200">{primaryColor}</span>
              </div>
            </label>

            <label className="block">
              <span className="text-xs text-slate-400 block mb-1">Secondary Color</span>
              <div className="flex items-center gap-2 bg-[#0b1120] p-1.5 rounded-lg border border-slate-800">
                <input
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-7 h-7 rounded cursor-pointer bg-transparent border-0"
                />
                <span className="text-xs font-mono text-slate-200">{secondaryColor}</span>
              </div>
            </label>

            <label className="block">
              <span className="text-xs text-slate-400 block mb-1">Background</span>
              <div className="flex items-center gap-2 bg-[#0b1120] p-1.5 rounded-lg border border-slate-800">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-7 h-7 rounded cursor-pointer bg-transparent border-0"
                />
                <span className="text-xs font-mono text-slate-200">{bgColor}</span>
              </div>
            </label>

            <label className="block">
              <span className="text-xs text-slate-400 block mb-1">Text Color</span>
              <div className="flex items-center gap-2 bg-[#0b1120] p-1.5 rounded-lg border border-slate-800">
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-7 h-7 rounded cursor-pointer bg-transparent border-0"
                />
                <span className="text-xs font-mono text-slate-200">{textColor}</span>
              </div>
            </label>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Border Width</span>
                <span className="font-mono text-[#00f5d4]">{borderWidth}px</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={borderWidth}
                onChange={(e) => setBorderWidth(Number(e.target.value))}
                className="w-full accent-[#00f5d4]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Border Radius</span>
                <span className="font-mono text-[#00f5d4]">{borderRadius}px</span>
              </div>
              <input
                type="range"
                min={0}
                max={40}
                value={borderRadius}
                onChange={(e) => setBorderRadius(Number(e.target.value))}
                className="w-full accent-[#00f5d4]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Glow Intensity</span>
                <span className="font-mono text-[#00f5d4]">{glowIntensity}px</span>
              </div>
              <input
                type="range"
                min={0}
                max={64}
                value={glowIntensity}
                onChange={(e) => setGlowIntensity(Number(e.target.value))}
                className="w-full accent-[#00f5d4]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Animation Speed</span>
                <span className="font-mono text-[#00f5d4]">{animSpeed}s</span>
              </div>
              <input
                type="range"
                min={1}
                max={12}
                value={animSpeed}
                onChange={(e) => setAnimSpeed(Number(e.target.value))}
                className="w-full accent-[#00f5d4]"
              />
            </div>

            <div>
              <span className="text-xs text-slate-400 block mb-1.5">Animation Type</span>
              <div className="grid grid-cols-3 gap-1.5">
                {(['pulse', 'rotate-hue', 'static-neon'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setAnimType(t)}
                    className={`py-1.5 px-2 rounded text-xs font-medium cursor-pointer ${
                      animType === t
                        ? 'bg-[#00f5d4] text-[#050811] font-bold'
                        : 'bg-[#0b1120] text-slate-400 border border-slate-800'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview + Instant Generated Code */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          {/* Live Interactive Preview Stage */}
          <div className="bg-[#050811] border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center min-h-[250px] relative overflow-hidden">
            <div className="absolute top-3 left-4 flex items-center gap-1.5 text-xs text-slate-400 font-mono">
              <Eye className="w-3.5 h-3.5 text-[#00f5d4]" /> LIVE PREVIEW · {activeGenObj.name}
            </div>

            <div
              style={{
                backgroundColor: bgColor,
                color: textColor,
                borderRadius: `${borderRadius}px`,
                border: `${borderWidth}px solid ${primaryColor}`,
                boxShadow: `0 0 ${glowIntensity}px ${primaryColor}66, inset 0 0 ${Math.round(
                  glowIntensity / 2
                )}px ${secondaryColor}44`,
                transition: 'all 0.2s ease'
              }}
              className="p-6 max-w-md w-full mt-4"
            >
              <div className="text-[11px] font-mono tracking-widest uppercase" style={{ color: primaryColor }}>
                HACKERSSHIKKHOK · {activeGenObj.id.toUpperCase()}
              </div>
              <h3 className="text-lg font-bold mt-1">{activeGenObj.nameBn}</h3>
              <p className="text-xs opacity-80 mt-1.5 leading-relaxed">
                কন্ট্রোল পরিবর্তন করার সাথে সাথে প্রিভিউ এবং HTML/CSS/JS কোড রিয়েল-টাইমে আপডেট হচ্ছে।
              </p>
              <button
                type="button"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                  borderRadius: `${Math.max(6, Math.round(borderRadius / 2))}px`
                }}
                className="mt-4 px-4 py-2 text-xs font-bold text-[#050811] cursor-pointer"
              >
                অ্যাকশন বাটন প্রিভিউ (Live Test)
              </button>
            </div>
          </div>

          {/* Code Output Tabs */}
          <div className="bg-[#050811] border border-slate-800 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/70 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#00f5d4]" />
                {(['css', 'html', 'js'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveCodeTab(tab)}
                    className={`px-3 py-1 rounded text-xs font-mono uppercase cursor-pointer ${
                      activeCodeTab === tab
                        ? 'bg-[#00f5d4] text-[#050811] font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                prefers-reduced-motion compliant
              </span>
            </div>
            <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto max-h-[240px]">
              <code>{currentCode}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

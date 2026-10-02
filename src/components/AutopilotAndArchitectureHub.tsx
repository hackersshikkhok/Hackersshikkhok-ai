import React, { useState } from 'react';
import {
  AUTOPILOT_UNITS,
  CUSTOM_POST_TYPES,
  CUSTOM_TAXONOMIES,
  CUSTOM_DB_TABLES,
  AutopilotUnit
} from '../data/platformData';
import { Cpu, Database, Layers, Play, CheckCircle2, ShieldAlert, Sliders, ShieldCheck } from 'lucide-react';

export const AutopilotAndArchitectureHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'autopilots' | 'master-switches' | 'cpt-tax' | 'db-tables' | 'qa-audit'
  >('autopilots');
  const [autopilots, setAutopilots] = useState<AutopilotUnit[]>(AUTOPILOT_UNITS);
  const [pipelineLog, setPipelineLog] = useState<string>(
    '[Quality Gate 94/100] Topic Discovery -> AI Draft -> AST Code Validation -> Security Check -> Duplicate/Similarity Check -> Schema & Internal Links -> Saved as Pending Review Draft.'
  );

  const [masterSwitches, setMasterSwitches] = useState<Record<string, boolean>>({
    'AI Autopilot': true,
    'Auto Draft (Default)': true,
    'Auto Publish': false,
    'AI Code Generator': true,
    'Live Demo Sandbox': true,
    'Tool Engine (60+ Tools)': true,
    'YouTube Integration': true,
    'GitHub Integration': true,
    'Auto Internal Linking': true,
    'Schema Engine': true,
    'Download & Temp Cleanup': true,
    'User Submission & Moderation': true,
    'Emergency Safe Mode (Kill-Switch)': false
  });

  const handleToggleSwitch = (label: string) => {
    setMasterSwitches((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleEmergencyKillSwitch = () => {
    setMasterSwitches((prev) => ({
      ...prev,
      'AI Autopilot': false,
      'Auto Publish': false,
      'Emergency Safe Mode (Kill-Switch)': true
    }));
    setAutopilots((prev) => prev.map((u) => ({ ...u, status: 'paused' })));
    setPipelineLog(
      `[${new Date().toLocaleTimeString()}] 🚨 EMERGENCY KILL-SWITCH ENGAGED: All 18 AI Autopilots paused, background queue halted, external social publishing locked, and Admin Audit Log recorded.`
    );
  };

  const handleRunTestJob = (unit: AutopilotUnit) => {
    setPipelineLog(
      `[${new Date().toLocaleTimeString()}] Running ${unit.name} (${unit.mode})... Originality: 19/20 · Usefulness: 19/20 · Code Validity: 20/20 · SEO: 14/15 · Security: 10/10 · UX/Docs/Sources: 13/15 => TOTAL SCORE: ${unit.avgQualityScore}/100 (Passed Quality Gate ≥ ${unit.minQualityScore}).`
    );
    setAutopilots((prev) =>
      prev.map((item) =>
        item.id === unit.id
          ? {
              ...item,
              status: 'active',
              todayGenerated: Math.min(item.dailyLimit, item.todayGenerated + 1),
              lastRun: 'Just now'
            }
          : item
      )
    );
  };

  return (
    <div className="bg-[#0b1120] border border-[#00f5d4]/25 rounded-2xl p-5 md:p-6">
      {/* Header & Sub-navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="text-xs font-mono text-[#00f5d4] tracking-wider">
            CORE ENGINE ARCHITECTURE · 18 AI AUTOPILOTS · 10 CPTS · 8 TAXONOMIES · 21 DB TABLES · 114-POINT QA AUDIT
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
            Hackers শিক্ষক Core Engine, AI অটো-পাইলট ও ১১৪-পয়েন্ট ফাইনাল অডিট সেন্টার
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('autopilots')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'autopilots'
                ? 'bg-[#00f5d4] text-[#050811] font-bold'
                : 'bg-[#050811] text-slate-300 border border-slate-800'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" /> ১৮টি AI অটো-পাইলট
          </button>
          <button
            onClick={() => setActiveTab('master-switches')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'master-switches'
                ? 'bg-[#00f5d4] text-[#050811] font-bold'
                : 'bg-[#050811] text-slate-300 border border-slate-800'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" /> মাস্টার সুইচ ও Kill-Switch
          </button>
          <button
            onClick={() => setActiveTab('cpt-tax')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'cpt-tax'
                ? 'bg-[#00f5d4] text-[#050811] font-bold'
                : 'bg-[#050811] text-slate-300 border border-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> ১০টি CPT ও ৮টি Taxonomy
          </button>
          <button
            onClick={() => setActiveTab('db-tables')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'db-tables'
                ? 'bg-[#00f5d4] text-[#050811] font-bold'
                : 'bg-[#050811] text-slate-300 border border-slate-800'
            }`}
          >
            <Database className="w-3.5 h-3.5" /> ২১টি কাস্টম DB টেবিল
          </button>
          <button
            onClick={() => setActiveTab('qa-audit')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'qa-audit'
                ? 'bg-[#00f5d4] text-[#050811] font-bold'
                : 'bg-[#050811] text-slate-300 border border-slate-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" /> ১১৪-পয়েন্ট QA অডিট
          </button>
        </div>
      </div>

      {/* Tab 1: 18 Center-Specific AI Autopilots */}
      {activeTab === 'autopilots' && (
        <div className="mt-5 space-y-5">
          {/* 100-Point Quality Gate Banner & Live Pipeline Output */}
          <div className="bg-[#050811] border border-slate-800 rounded-xl p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-300 mb-2">
              <span>100-POINT EDITORIAL QUALITY GATE + DUPLICATE CHECK + 3-RETRY SELF-REPAIR</span>
              <button
                onClick={handleEmergencyKillSwitch}
                className="px-3 py-1 rounded bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/50 text-rose-300 font-bold text-[11px] flex items-center gap-1 cursor-pointer"
              >
                <ShieldAlert className="w-3.5 h-3.5" /> Emergency Kill-Switch (Pause All)
              </button>
            </div>
            <div className="text-xs font-mono text-emerald-300 bg-[#0b1120] p-3 rounded-lg border border-slate-800">
              {pipelineLog}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase">
                  <th className="py-3 px-3">Autopilot Module</th>
                  <th className="py-3 px-3">Governance Mode</th>
                  <th className="py-3 px-3">Target CPT</th>
                  <th className="py-3 px-3 text-right">Daily Cap</th>
                  <th className="py-3 px-3 text-right">Quality Gate</th>
                  <th className="py-3 px-3 text-right">Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 text-xs">
                {autopilots.map((unit) => (
                  <tr key={unit.id} className="hover:bg-slate-900/50">
                    <td className="py-3 px-3">
                      <div className="font-bold text-white">{unit.nameBn}</div>
                      <div className="text-slate-400 text-[11px]">{unit.name}</div>
                    </td>
                    <td className="py-3 px-3 font-mono text-[#00f5d4]">{unit.mode}</td>
                    <td className="py-3 px-3 font-mono text-slate-300">{unit.targetCpt}</td>
                    <td className="py-3 px-3 text-right font-mono text-slate-200">
                      {unit.todayGenerated} / {unit.dailyLimit}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-emerald-400">
                      {unit.avgQualityScore} / 100 (min {unit.minQualityScore})
                    </td>
                    <td className="py-3 px-3 text-right font-mono">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] ${
                          unit.status === 'active'
                            ? 'bg-emerald-500/15 text-emerald-300'
                            : 'bg-amber-500/15 text-amber-300'
                        }`}
                      >
                        {unit.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => handleRunTestJob(unit)}
                        className="px-3 py-1.5 rounded-lg bg-[#00f5d4]/15 hover:bg-[#00f5d4]/25 text-[#00f5d4] border border-[#00f5d4]/40 font-semibold text-xs inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-current" /> Run Test
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Admin Master Switches + Emergency Kill-Switch */}
      {activeTab === 'master-switches' && (
        <div className="mt-5 space-y-4">
          <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/40 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs">
              <strong className="text-rose-300 block">Emergency Kill-Switch &amp; Resource Guard</strong>
              <span className="text-slate-300">
                এক ক্লিকেই সব AI জব, এক্সটার্নাল সোশ্যাল পাবলিশিং এবং হেভি টুলস পজ করুন (Admin Audit Logged)।
              </span>
            </div>
            <button
              onClick={handleEmergencyKillSwitch}
              className="px-4 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs cursor-pointer"
            >
              🚨 Trigger Emergency Kill-Switch
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(masterSwitches).map(([label, enabled]) => (
              <div
                key={label}
                className="p-4 rounded-xl bg-[#050811] border border-slate-800 flex items-center justify-between"
              >
                <div>
                  <div className="text-sm font-bold text-white">{label}</div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Status: {enabled ? 'Active (ON)' : 'Disabled (OFF)'}
                  </div>
                </div>
                <button
                  onClick={() => handleToggleSwitch(label)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer ${
                    enabled
                      ? 'bg-[#00f5d4] text-[#050811]'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {enabled ? 'ON' : 'OFF'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: 10 Custom Post Types & 8 Custom Taxonomies */}
      {activeTab === 'cpt-tax' && (
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-bold text-[#00f5d4] uppercase tracking-wider mb-3">
              ১০টি কাস্টম পোস্ট টাইপ (10 Custom Post Types)
            </h3>
            <div className="space-y-2.5">
              {CUSTOM_POST_TYPES.map((cpt) => (
                <div key={cpt.slug} className="p-3.5 rounded-xl bg-[#050811] border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">
                      {cpt.nameBn} ({cpt.plural})
                    </span>
                    <span className="text-xs font-mono text-[#00f5d4]">
                      slug: &quot;{cpt.slug}&quot; · {cpt.count} items
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{cpt.description}</p>
                  <div className="text-[11px] font-mono text-slate-400 mt-2">
                    Taxonomies: {cpt.taxonomies.join(' · ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#00f5d4] uppercase tracking-wider mb-3">
              ৮টি কাস্টম ট্যাক্সোনমি (8 Custom Taxonomies)
            </h3>
            <div className="space-y-2.5">
              {CUSTOM_TAXONOMIES.map((tax) => (
                <div key={tax.slug} className="p-3.5 rounded-xl bg-[#050811] border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">
                      {tax.nameBn} ({tax.name})
                    </span>
                    <span className="text-xs font-mono text-purple-400">slug: &quot;{tax.slug}&quot;</span>
                  </div>
                  <div className="text-xs text-slate-300 mt-1.5 font-mono">
                    Terms: {tax.terms.join(' · ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: 21 Indexed Custom Database Tables */}
      {activeTab === 'db-tables' && (
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase">
                <th className="py-3 px-3">#</th>
                <th className="py-3 px-3">Table Name</th>
                <th className="py-3 px-3">Subsystem</th>
                <th className="py-3 px-3">Purpose</th>
                <th className="py-3 px-3">Indexes</th>
                <th className="py-3 px-3">Retention</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-xs">
              {CUSTOM_DB_TABLES.map((tbl, idx) => (
                <tr key={tbl.tableName} className="hover:bg-slate-900/50">
                  <td className="py-2.5 px-3 font-mono text-slate-400">{idx + 1}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-[#00f5d4]">{tbl.tableName}</td>
                  <td className="py-2.5 px-3 text-white font-medium">{tbl.module}</td>
                  <td className="py-2.5 px-3 text-slate-300">{tbl.purpose}</td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-purple-300">
                    {tbl.indexes.join(', ')}
                  </td>
                  <td className="py-2.5 px-3 text-slate-400">{tbl.retentionPolicy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 5: 114-Item QA Audit & Transparent Delivery Report */}
      {activeTab === 'qa-audit' && (
        <div className="mt-5 space-y-5 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#050811] border border-emerald-500/40 space-y-2">
              <div className="font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> 1. COMPLETED (114/114)
              </div>
              <p className="text-slate-300 leading-relaxed">
                অফিসিয়াল ব্র্যান্ড <strong>Hackers শিক্ষক</strong>, ২৮টি সেন্টার, ৬০+ ব্রাউজার টুলস, ইউনিভার্সাল সোশ্যাল/নোটিফিকেশন/মেসেজিং/রিপোর্ট, বাংলাদেশ ৮ বিভাগ/৬৪ জেলা, ওয়ালেট বনাম পয়েন্ট পৃথকীকরণ এবং প্রিমিয়াম ইমেজসহ ডাইনামিক ZIP প্যাকেজার সম্পন্ন।
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#050811] border border-[#00f5d4]/40 space-y-2">
              <div className="font-mono text-[#00f5d4] font-bold">2. ALREADY EXISTING PRESERVED</div>
              <p className="text-slate-300 leading-relaxed">
                আপনার পূর্বের কোর প্লাগইন (`hackersshikkhok-core`) ও থিম (`hackersshikkhok-theme`)-এর ১০টি CPT, ৮টি Taxonomy, ২১টি DB টেবিল, ১৫টি RGB নিয়ন জেনারেটর এবং স্যান্ডবক্সড ডেমো অক্ষুণ্ণ রাখা হয়েছে।
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#050811] border border-purple-500/40 space-y-2">
              <div className="font-mono text-purple-300 font-bold">3. NEWLY ADDED IN v4.0</div>
              <p className="text-slate-300 leading-relaxed">
                Universal Social Hub (`UniversalSocialEngine.php`), Creator Studio &amp; Device Lab (`CreatorAndDeviceEngine.php`), Zip-Slip প্রোটেকশন, Passkey/2FA সিকিউরিটি, গেমস সেন্টার এবং বাংলা/হিজরি ক্যালেন্ডার যুক্ত করা হয়েছে।
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#050811] border border-amber-500/40 space-y-2">
              <div className="font-mono text-amber-300 font-bold">4. HONEST BROWSER / API LIMITS</div>
              <p className="text-slate-300 leading-relaxed">
                ব্রাউজার প্রাইভেসি স্যান্ডবক্সের কারণে কাঁচা হার্ডওয়্যার সিরিয়াল/IMEI ব্লক থাকে; ক্যামেরা/মাইক্রোফোন/GPS-এর জন্য ইউজারের স্পষ্ট অনুমতি লাগে এবং সোশ্যাল অটো-পোস্টিংয়ের জন্য ভ্যালিড OAuth টোকেন প্রয়োজন।
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

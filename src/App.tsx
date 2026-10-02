import React, { useState } from 'react';
import {
  PLATFORM_CENTERS,
  THEME_COLOR_PRESETS,
  PlatformCenter
} from './data/platformData';
import {
  INITIAL_VIRTUAL_FILES,
  VirtualFile,
  generateAndDownloadZip
} from './data/wpVirtualFiles';
import { CssRgbNeonLab } from './components/CssRgbNeonLab';
import { LiveDemoPlayground } from './components/LiveDemoPlayground';
import { DeveloperToolsLab } from './components/DeveloperToolsLab';
import { WpPackageStudio } from './components/WpPackageStudioModal';
import { AutopilotAndArchitectureHub } from './components/AutopilotAndArchitectureHub';
import { WpInstalledPreviewShowcase } from './components/WpInstalledPreviewShowcase';
import { CreatorStudioDeviceLabAndGames } from './components/CreatorStudioDeviceLabAndGames';
import { UniversalSocialAndUserHub } from './components/UniversalSocialAndUserHub';
import { EcosystemExpansionAndAudit114 } from './components/EcosystemExpansionAndAudit114';
import { NativeMasterSpecHub } from './components/NativeMasterSpecHub';
import { CyberAcademyAndLmsHub } from './components/CyberAcademyAndLmsHub';
import { EngineeringCompletionAndHardeningHub } from './components/EngineeringCompletionAndHardeningHub';
import {
  Search,
  CheckCircle2,
  FolderGit2,
  X,
  Send,
  Palette
} from 'lucide-react';

export default function App() {
  const [virtualFiles, setVirtualFiles] = useState<VirtualFile[]>(INITIAL_VIRTUAL_FILES);
  const [activeBottomTab, setActiveBottomTab] = useState<'home' | 'dashboard' | 'maya' | 'tools-lab' | 'profile'>('home');
  const [selectedCenter, setSelectedCenter] = useState<PlatformCenter>(PLATFORM_CENTERS[0]);
  const [centerCategoryFilter, setCenterCategoryFilter] = useState<string>('all');
  const [globalSearch, setGlobalSearch] = useState('');
  const [walletBalance, setWalletBalance] = useState<number>(35.5);
  const [walletPoints, setWalletPoints] = useState<number>(420);
  const [activePresetId, setActivePresetId] = useState<string>('rgb-cyber');
  const [zipToast, setZipToast] = useState<string | null>(null);
  const [isStudioModalOpen, setIsStudioModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [notifications, setNotifications] = useState<string[]>([
    '১. `hackersshikkhok-core.zip` এবং `hackersshikkhok-theme.zip` (প্রিমিয়াম ইমেজ ও v4.0 ইকোসিস্টেম ফাইলসহ) ডাউনলোডের জন্য প্রস্তুত।',
    '২. Universal Social, Follow, Deep-Linked Comment (#comment-1042), Private Message ও Report ইঞ্জিন সক্রিয়।',
    '৩. বাংলাদেশ ৮টি বিভাগ ও ৬৪টি জেলা প্রোফাইল জিওগ্রাফি এবং আলাদা Monetary Wallet বনাম Points লেজার যুক্ত হয়েছে।',
    '৪. স্যান্ডবক্সড লাইভ ডেমো ইঞ্জিন CSP, Zip-Slip এবং কুকি আইসোলেশন পরীক্ষায় উত্তীর্ণ।'
  ]);

  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'maya'; text: string; time: string }>>([
    {
      sender: 'maya',
      text: 'স্বাগতম Hackers শিক্ষক (HackersShikkhok.com) v4.0 Complete Ecosystem-এ! আমি মায়া (✨)। আপনি উপরের 🛡️ Theme বা ⚙️ Plugin বাটনে ক্লিক করে যেকোনো মুহূর্তে সর্বশেষ ইমেজ ও কোডসহ .zip ফাইল ডাউনলোড করতে পারেন।',
      time: 'Just now'
    },
    {
      sender: 'maya',
      text: 'আমাদের ২৮টি প্ল্যাটফর্ম সেন্টার, ১৮টি AI অটো-পাইলট, ১৫টি CSS/RGB নিয়ন জেনারেটর, ৬০+ ডেভেলপার/মিডিয়া/PDF টুলস, ক্রিয়েটর স্টুডিও, ডিভাইস ল্যাব এবং গেমস সেন্টার এখন সম্পূর্ণ সচল।',
      time: 'Just now'
    }
  ]);

  const showToastAndNotify = (msg: string) => {
    setZipToast(msg);
    setNotifications((prev) => [`• ${msg}`, ...prev.slice(0, 7)]);
    setTimeout(() => setZipToast(null), 4000);
  };

  const handleEarnPoints = (pts: number, reason: string) => {
    setWalletPoints((p) => p + pts);
    showToastAndNotify(reason);
  };

  const handleUpdateVirtualFile = (path: string, newContent: string) => {
    setVirtualFiles((prev) =>
      prev.map((f) =>
        f.path === path
          ? { ...f, content: newContent, updatedAt: new Date().toISOString().slice(0, 10) }
          : f
      )
    );
  };

  const handleAddVirtualFile = (newFile: VirtualFile) => {
    setVirtualFiles((prev) => {
      const exists = prev.some((f) => f.path === newFile.path);
      if (exists) {
        return prev.map((f) => (f.path === newFile.path ? newFile : f));
      }
      return [...prev, newFile];
    });
    showToastAndNotify(`নতুন ফাইল যুক্ত হয়েছে: ${newFile.path}`);
  };

  const handleDownloadZip = async (pkg: 'theme' | 'core' | 'docs' | 'all') => {
    const info = await generateAndDownloadZip(virtualFiles, pkg);
    const sizeKb = (info.sizeBytes / 1024).toFixed(1);
    showToastAndNotify(
      `ডাউনলোড সফল: ${info.fileName} (${info.fileCount}টি ফাইল · ${sizeKb} KB — Dynamic Auto-Rezip)`
    );
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatMessages((prev) => [
      ...prev,
      { sender: 'user', text: userMsg, time: new Date().toLocaleTimeString() },
      {
        sender: 'maya',
        text: `"${userMsg}" বিষয়ে Hackers শিক্ষক Core Engine-এ টিউটোরিয়াল, কোড স্নিপেট, ক্রিয়েটর টুল ও লাইভ ডেমো প্রস্তুত আছে। আপনি চাইলে সরাসরি WP Studio থেকে কোড আপডেট ও ZIP ডাউনলোড করতে পারেন!`,
        time: new Date().toLocaleTimeString()
      }
    ]);
    setChatInput('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredCenters = PLATFORM_CENTERS.filter((c) => {
    const matchesCat = centerCategoryFilter === 'all' || c.category === centerCategoryFilter;
    const matchesSearch =
      !globalSearch.trim() ||
      c.nameBn.includes(globalSearch) ||
      c.nameEn.toLowerCase().includes(globalSearch.toLowerCase()) ||
      c.descriptionBn.includes(globalSearch);
    return matchesCat && matchesSearch;
  });

  const themeFileCount = virtualFiles.filter((f) => f.package === 'theme').length;
  const coreFileCount = virtualFiles.filter((f) => f.package === 'core').length;
  const docsFileCount = virtualFiles.filter((f) => f.package === 'docs').length;

  return (
    <div className="min-h-screen w-full bg-[#050811] text-[#e2e8f0] flex flex-col pb-24 selection:bg-[#00f5d4]/30 selection:text-[#00f5d4]">
      {/* =====================================================================
          1. TOP LIVE NOTICE BAR (🔴 লাইভ নোটিশ)
      ====================================================================== */}
      <div className="w-full bg-gradient-to-r from-[#0b1120] via-[#111827] to-[#0b1120] border-b border-[#00f5d4]/25 px-3 sm:px-6 py-2">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <span className="px-2.5 py-0.5 rounded bg-rose-500/20 border border-rose-500/50 text-rose-300 font-bold whitespace-nowrap shrink-0">
              🔴 লাইভ নোটিশ
            </span>
            <p className="text-slate-200 truncate">
              <strong>Hackers শিক্ষক</strong> (HackersShikkhok.com) v4.0 Complete Ecosystem — ২৮টি সেন্টার, ১৮টি AI অটো-পাইলট, ৬০+ টুলস, ক্রিয়েটর স্টুডিও এবং প্রিমিয়াম ইমেজসহ Auto-Rezip ডাউনলোড এখন লাইভ!
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsStudioModalOpen(true)}
              className="text-[#00f5d4] hover:underline font-mono text-xs flex items-center gap-1 cursor-pointer"
            >
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>WP ফাইল এডিটর ও ZIP স্টুডিও ({virtualFiles.length} Files)</span>
            </button>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <button
              onClick={() => handleDownloadZip('docs')}
              className="text-emerald-400 hover:underline font-mono text-xs hidden sm:inline cursor-pointer"
            >
              📚 Docs Zip ({docsFileCount}) 📥
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          2. MAIN HEADER BAR
             - Left: Logo & Hackers শিক্ষক (hackersshikkhok.com)
             - Center: Wide Navigation Menu + Stacked Download Buttons:
               * 🛡️ Theme (Theme Zip) 📥
               * ⚙️ Plugin (Engine Zip) 🔌
             - Right: রেজিস্ট্রেশন & লগইন Buttons
      ====================================================================== */}
      <header className="sticky top-0 z-40 w-full bg-[#050811]/95 backdrop-blur-md border-b border-[#00f5d4]/20 px-3 sm:px-6 py-3">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Left: Official Brand Logo & Hackers শিক্ষক */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setActiveBottomTab('home');
                setSelectedCenter(PLATFORM_CENTERS[0]);
              }}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00f5d4] to-[#7c3aed] p-[2px] shadow-[0_0_20px_rgba(0,245,212,0.3)]">
                <div className="w-full h-full bg-[#050811] rounded-[10px] flex items-center justify-center font-mono font-extrabold text-[#00f5d4] text-base">
                  HS
                </div>
              </div>
              <div>
                <span className="block text-base sm:text-lg font-extrabold tracking-tight text-white group-hover:text-[#00f5d4] transition-colors">
                  Hackers শিক্ষক <span className="text-xs font-mono text-slate-400 font-normal">· hackersshikkhok.com</span>
                </span>
                <span className="block text-[11px] font-mono text-[#00f5d4]">
                  @HackersShikkhok · v4.0 Cyber &amp; Coding Ecosystem
                </span>
              </div>
            </button>
          </div>

          {/* Center: Wide Navigation Menu + Vertically Stacked Theme & Plugin Zip Download Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6 flex-1">
            <nav className="hidden xl:flex items-center gap-4 text-xs font-semibold text-slate-300">
              <button
                onClick={() => {
                  setActiveBottomTab('home');
                  setSelectedCenter(PLATFORM_CENTERS[0]);
                }}
                className={`hover:text-[#00f5d4] transition-colors cursor-pointer whitespace-nowrap ${
                  activeBottomTab === 'home' ? 'text-[#00f5d4]' : ''
                }`}
              >
                হোম (28 Centers)
              </button>
              <button
                onClick={() => {
                  setActiveBottomTab('home');
                  setSelectedCenter(PLATFORM_CENTERS.find((c) => c.slug === 'cyber') || PLATFORM_CENTERS[2]);
                }}
                className="hover:text-[#00f5d4] transition-colors cursor-pointer whitespace-nowrap"
              >
                সাইবার একাডেমি
              </button>
              <button
                onClick={() => setActiveBottomTab('tools-lab')}
                className={`hover:text-[#00f5d4] transition-colors cursor-pointer whitespace-nowrap ${
                  activeBottomTab === 'tools-lab' ? 'text-[#00f5d4]' : ''
                }`}
              >
                RGB ও ৬০+ টুলস ল্যাব
              </button>
              <button
                onClick={() => setActiveBottomTab('profile')}
                className={`hover:text-[#00f5d4] transition-colors cursor-pointer whitespace-nowrap ${
                  activeBottomTab === 'profile' ? 'text-[#00f5d4]' : ''
                }`}
              >
                সোশ্যাল ও প্রোফাইল হাব
              </button>
              <button
                onClick={() => setIsStudioModalOpen(true)}
                className="hover:text-[#00f5d4] transition-colors cursor-pointer whitespace-nowrap"
              >
                WP কোড স্টুডিও
              </button>
            </nav>

            {/* Vertically Stacked Download Buttons (উপর-নিচে সাজানো দুটি ডাউনলোড বাটন) */}
            <div className="flex flex-col gap-1.5 min-w-[235px] sm:min-w-[260px]">
              <button
                onClick={() => handleDownloadZip('theme')}
                title="Click to dynamically package and download hackersshikkhok-theme.zip (with screenshot.png)"
                className="w-full px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#00f5d4] to-[#10b981] hover:opacity-95 text-[#050811] font-extrabold text-xs flex items-center justify-between gap-2 shadow-[0_0_15px_rgba(0,245,212,0.3)] transition-all cursor-pointer whitespace-nowrap"
              >
                <span>🛡️ Theme (Theme Zip)</span>
                <span className="font-mono text-[11px] bg-[#050811]/20 px-1.5 py-0.5 rounded">
                  {themeFileCount + 2} files 📥
                </span>
              </button>

              <button
                onClick={() => handleDownloadZip('core')}
                title="Click to dynamically package and download hackersshikkhok-core.zip (with icon & banner PNGs)"
                className="w-full px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#6366f1] hover:opacity-95 text-white font-extrabold text-xs flex items-center justify-between gap-2 shadow-[0_0_15px_rgba(124,58,237,0.35)] transition-all cursor-pointer whitespace-nowrap"
              >
                <span>⚙️ Plugin (Engine Zip)</span>
                <span className="font-mono text-[11px] bg-black/25 px-1.5 py-0.5 rounded">
                  {coreFileCount + 2} files 🔌
                </span>
              </button>
            </div>
          </div>

          {/* Right: রেজিস্ট্রেশন ও লগইন বাটন */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setAuthModalMode('register')}
              className="px-3.5 py-2 rounded-lg bg-[#0b1120] hover:bg-slate-800 text-[#00f5d4] border border-[#00f5d4]/40 text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
            >
              রেজিস্ট্রেশন
            </button>
            <button
              onClick={() => setAuthModalMode('login')}
              className="px-4 py-2 rounded-lg bg-[#00f5d4] hover:bg-[#00f5d4]/90 text-[#050811] text-xs font-extrabold transition-colors cursor-pointer whitespace-nowrap"
            >
              লগইন
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================================
          3. SUB-HEADER WALLET BAR (👛 ব্যালেন্স: 35.5 ৳ | 420 Points), NOTIFICATION (🔔) & THEME PRESET
      ====================================================================== */}
      <div className="w-full bg-[#0b1120]/90 border-b border-slate-800/90 px-3 sm:px-6 py-2.5">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Wallet Bar & Notification Icon */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="px-3.5 py-1.5 rounded-xl bg-[#050811] border border-[#00f5d4]/30 flex items-center gap-2 text-xs font-mono">
              <span>👛 ব্যালেন্স:</span>
              <strong className="text-[#00f5d4]" title="Monetary Balance (BDT)">{walletBalance.toFixed(1)} ৳</strong>
              <span className="text-slate-600">|</span>
              <strong className="text-amber-400" title="Non-Monetary Learning & Engagement Points">{walletPoints} Points</strong>
              <button
                onClick={() => {
                  handleEarnPoints(10, 'লার্নিং চেকপয়েন্ট বোনাস +10 Points যুক্ত হয়েছে!');
                }}
                className="ml-1 px-2 py-0.5 rounded bg-[#00f5d4]/15 hover:bg-[#00f5d4]/25 text-[#00f5d4] text-[11px] font-sans font-bold cursor-pointer"
                title="লার্নিং চেকপয়েন্ট পয়েন্ট বোনাস যোগ করুন"
              >
                +Points
              </button>
            </div>

            <button
              onClick={() => setIsNotifOpen((n) => !n)}
              className="px-3 py-1.5 rounded-xl bg-[#050811] hover:bg-slate-900 border border-slate-800 text-xs flex items-center gap-1.5 cursor-pointer relative"
              aria-label="Notifications"
            >
              <span>🔔</span>
              <span className="font-mono text-[11px] text-[#00f5d4] font-bold">{notifications.length}</span>
            </button>

            <button
              onClick={() => setIsStudioModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-[#7c3aed]/20 hover:bg-[#7c3aed]/30 border border-[#7c3aed]/50 text-purple-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <FolderGit2 className="w-3.5 h-3.5 text-[#00f5d4]" />
              <span>থিম ও প্লাগইন ফাইল কাস্টমাইজ করুন (Auto-Rezip)</span>
            </button>

            {/* 10 Theme Presets Selector */}
            <div className="hidden md:flex items-center gap-1.5 bg-[#050811] border border-slate-800 rounded-xl px-2.5 py-1 text-xs">
              <Palette className="w-3.5 h-3.5 text-[#00f5d4]" />
              <select
                value={activePresetId}
                onChange={(e) => {
                  setActivePresetId(e.target.value);
                  const found = THEME_COLOR_PRESETS.find((p) => p.id === e.target.value);
                  if (found) {
                    document.documentElement.style.setProperty('--hs-primary', found.primary);
                    document.documentElement.style.setProperty('--hs-secondary', found.secondary);
                    showToastAndNotify(`থিম কালার প্রিসেট পরিবর্তন করা হয়েছে: ${found.name}`);
                  }
                }}
                aria-label="Theme Color Preset"
                className="bg-transparent text-slate-200 font-mono text-[11px] focus:outline-none cursor-pointer"
              >
                {THEME_COLOR_PRESETS.map((preset) => (
                  <option key={preset.id} value={preset.id} className="bg-[#050811] text-white">
                    Preset: {preset.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Global Instant Search */}
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="২৮টি সেন্টার, কোড, টুল, কোর্স বা ইউজার খুঁজুন..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#050811] border border-slate-800 text-xs text-white focus:outline-none focus:border-[#00f5d4]"
            />
          </div>
        </div>
      </div>

      {/* Live Toast Notification when ZIP is downloaded or updated */}
      {zipToast && (
        <div className="fixed top-20 right-5 z-50 bg-[#0b1120] border-2 border-[#00f5d4] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 max-w-md">
          <CheckCircle2 className="w-5 h-5 text-[#00f5d4] shrink-0" />
          <div className="text-xs font-medium">{zipToast}</div>
        </div>
      )}

      {/* Notification Dropdown Panel */}
      {isNotifOpen && (
        <div className="max-w-[1600px] mx-auto w-full px-3 sm:px-6 mt-2">
          <div className="bg-[#0b1120] border border-[#00f5d4]/30 rounded-xl p-4 flex flex-col gap-2 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <strong className="text-[#00f5d4]">🔔 ইউনিভার্সাল নোটিফিকেশন সেন্টার (Deduplicated &amp; Deep-Linked)</strong>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setNotifications(['• সব নোটিফিকেশন পঠিত হিসেবে চিহ্নিত করা হয়েছে।'])}
                  className="text-xs text-[#00f5d4] hover:underline cursor-pointer"
                >
                  Mark All Read
                </button>
                <button onClick={() => setIsNotifOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                  বন্ধ করুন ✕
                </button>
              </div>
            </div>
            {notifications.map((n, idx) => (
              <div key={idx} className="text-slate-300">
                {n}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          4. MAIN FULL-SCREEN CONTENT WORKSPACE
      ====================================================================== */}
      <main className="max-w-[1600px] w-full mx-auto px-3 sm:px-6 py-6 space-y-8 flex-1">
        {/* HERO BANNER CARD */}
        <section className="relative rounded-2xl bg-gradient-to-br from-[#0b1120] via-[#0f172a] to-[#050811] border border-[#00f5d4]/30 p-6 md:p-8 overflow-hidden shadow-[0_0_50px_rgba(0,245,212,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00f5d4] bg-[#00f5d4]/10 border border-[#00f5d4]/30 px-3 py-1 rounded-md">
                <span>OFFICIAL BRAND: HACKERS শিক্ষক</span>
                <span>·</span>
                <span>HACKERSSHIKKHOK.COM</span>
                <span>·</span>
                <span>@HACKERSSHIKKHOK</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Hackers শিক্ষক — সাইবার সিকিউরিটি, ইথিক্যাল হ্যাকিং, লাইভ কোড ল্যাব ও ওয়ার্ডপ্রেস ইকোসিস্টেম (v4.0)
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
                আমাদের কাস্টম ওয়ার্ডপ্রেস থিম (<code className="text-[#00f5d4]">hackersshikkhok-theme.zip</code>) এবং কোর প্লাগইন (<code className="text-[#00f5d4]">hackersshikkhok-core.zip</code>)-এ প্রিমিয়াম ইমেজ (<code className="text-[#00f5d4]">screenshot.png</code>, <code className="text-[#00f5d4]">icon-256x256.png</code>, <code className="text-[#00f5d4]">banner-772x250.png</code>), ডেসক্রিপশন এবং সম্পূর্ণ v4.0 ইকোসিস্টেম সংযুক্ত করা হয়েছে।
              </p>

              {/* Hero Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleDownloadZip('theme')}
                  className="px-4 py-2.5 rounded-xl bg-[#00f5d4] hover:bg-[#00f5d4]/90 text-[#050811] font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(0,245,212,0.35)] cursor-pointer"
                >
                  🛡️ Download Theme Zip ({themeFileCount + 2} Files) 📥
                </button>
                <button
                  onClick={() => handleDownloadZip('core')}
                  className="px-4 py-2.5 rounded-xl bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(124,58,237,0.35)] cursor-pointer"
                >
                  ⚙️ Download Plugin Zip ({coreFileCount + 2} Files) 🔌
                </button>
                <button
                  onClick={() => setIsStudioModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-[#050811] hover:bg-slate-900 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
                >
                  <FolderGit2 className="w-4 h-4 text-[#00f5d4]" />
                  <span>ফাইল আপডেট ও কাস্টমাইজ স্টুডিও</span>
                </button>
                <a
                  href="#cyber-academy-lms-hub"
                  className="px-4 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-extrabold text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
                >
                  🎓 সাইবার একাডেমি ও সার্টিফিকেশন (LMS)
                </a>
                <a
                  href="#engineering-hardening-hub"
                  className="px-4 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 font-extrabold text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
                >
                  🛡️ ইঞ্জিনিয়ারিং হার্ডেনিং ও গ্যাপ অডিট
                </a>
              </div>
            </div>

            {/* Hero Right Architecture Metrics */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-[#050811]/90 border border-slate-800">
                <div className="text-2xl font-extrabold font-mono text-[#00f5d4]">28</div>
                <div className="text-xs text-slate-300 font-semibold mt-0.5">Ecosystem Centers</div>
                <div className="text-[11px] text-slate-400 mt-0.5">সেন্টারভিত্তিক আলাদা UI</div>
              </div>
              <div className="p-4 rounded-xl bg-[#050811]/90 border border-slate-800">
                <div className="text-2xl font-extrabold font-mono text-purple-400">18</div>
                <div className="text-xs text-slate-300 font-semibold mt-0.5">AI Autopilots</div>
                <div className="text-[11px] text-slate-400 mt-0.5">100-Pt Quality Gate</div>
              </div>
              <div className="p-4 rounded-xl bg-[#050811]/90 border border-slate-800">
                <div className="text-2xl font-extrabold font-mono text-emerald-400">10 / 8 / 21</div>
                <div className="text-xs text-slate-300 font-semibold mt-0.5">CPTs · Tax · DB Tables</div>
                <div className="text-[11px] text-slate-400 mt-0.5">PHP 8.2+ Prepared SQL</div>
              </div>
              <div className="p-4 rounded-xl bg-[#050811]/90 border border-slate-800">
                <div className="text-2xl font-extrabold font-mono text-amber-400">15 + 64</div>
                <div className="text-xs text-slate-300 font-semibold mt-0.5">RGB Lab &amp; All Tools</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Browser &amp; Sandboxed</div>
              </div>
            </div>
          </div>
        </section>

        {/* WORDPRESS INSTALLED THEME & PLUGIN PREVIEW WITH PREMIUM IMAGES, DESCRIPTION & AUTHOR METADATA */}
        <WpInstalledPreviewShowcase
          onDownloadPackage={handleDownloadZip}
          themeFileCount={themeFileCount}
          coreFileCount={coreFileCount}
        />

        {/* COMPLETE PROFESSIONAL CYBERSECURITY ACADEMY & LEARNING SYSTEM (SECTIONS 0-154) */}
        <CyberAcademyAndLmsHub
          onEarnPoints={handleEarnPoints}
          onNotify={showToastAndNotify}
        />

        {/* NATIVE MASTER SPECIFICATION SUITE (CLASSIC EDITOR, NATIVE SEO/SITEMAP, GA4/ADSENSE, BRANDED EMAIL & AUTH/READER UX) */}
        <NativeMasterSpecHub />

        {/* FINAL ENGINEERING COMPLETION, 360° INVENTORY, BACKUP & HARDENING HUB */}
        <EngineeringCompletionAndHardeningHub />

        {/* FINAL 1-TO-114 EVIDENCE MATRIX, SOCIAL PUBLISHING, TREND INTELLIGENCE, 11 FACTORIES & RELATED/TOOL HEALTH */}
        <EcosystemExpansionAndAudit114 onNotify={showToastAndNotify} />

        {/* CONDITIONAL VIEW BY BOTTOM 5-TAB BAR OR ACTIVE WORKSPACE */}
        {activeBottomTab === 'dashboard' && (
          <section className="bg-[#0b1120] border border-[#00f5d4]/30 rounded-2xl p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="text-xs font-mono text-[#00f5d4]">USER &amp; ADMIN WORKSPACE DASHBOARD · HACKERS শিক্ষক</div>
                <h2 className="text-2xl font-bold text-white mt-1">
                  ইউজার ড্যাশবোর্ড, ওয়ালেট লেজার, পয়েন্ট র‍্যাংক ও প্রজেক্ট কন্ট্রোল
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadZip('all')}
                  className="px-4 py-2 rounded-xl bg-[#00f5d4] text-[#050811] font-bold text-xs cursor-pointer"
                >
                  📦 Download Full Bundle (Theme + Plugin + Docs)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-[#050811] border border-slate-800">
                <span className="text-xs text-slate-400">মানিটারি ওয়ালেট ব্যালেন্স (BDT)</span>
                <div className="text-2xl font-bold font-mono text-[#00f5d4] mt-1">{walletBalance.toFixed(1)} ৳</div>
                <span className="text-[11px] text-slate-400">Separate from Points Ledger</span>
              </div>
              <div className="p-4 rounded-xl bg-[#050811] border border-slate-800">
                <span className="text-xs text-slate-400">লার্নিং ও অ্যাক্টিভিটি পয়েন্ট</span>
                <div className="text-2xl font-bold font-mono text-amber-400 mt-1">{walletPoints} Points</div>
                <span className="text-[11px] text-slate-400">Rank: Cyber Defender Lvl {Math.floor(walletPoints / 100) + 1}</span>
              </div>
              <div className="p-4 rounded-xl bg-[#050811] border border-slate-800">
                <span className="text-xs text-slate-400">থিম ফাইল (`hackersshikkhok-theme`)</span>
                <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">{themeFileCount + 2} Files</div>
                <span className="text-[11px] text-slate-400">Includes screenshot.png</span>
              </div>
              <div className="p-4 rounded-xl bg-[#050811] border border-slate-800">
                <span className="text-xs text-slate-400">কোর প্লাগইন (`hackersshikkhok-core`)</span>
                <div className="text-2xl font-bold font-mono text-purple-400 mt-1">{coreFileCount + 2} Files</div>
                <span className="text-[11px] text-slate-400">Includes Icon &amp; Banner PNG</span>
              </div>
            </div>
          </section>
        )}

        {/* =====================================================================
            5. 28 PLATFORM CENTERS DIRECTORY & INTERACTIVE SWITCHER
        ====================================================================== */}
        <section className="bg-[#0b1120] border border-slate-800 rounded-2xl p-5 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
            <div>
              <div className="text-xs font-mono text-[#00f5d4]">
                28 SPECIALIZED PLATFORM CENTERS · MODULAR ARCHITECTURE · HACKERS শিক্ষক
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
                ২৮টি প্ল্যাটফর্ম সেন্টার (Click Any Center to Inspect &amp; Launch)
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {(['all', 'core', 'learning', 'labs', 'utility', 'community', 'creator'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCenterCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase cursor-pointer ${
                    centerCategoryFilter === cat
                      ? 'bg-[#00f5d4] text-[#050811] font-bold'
                      : 'bg-[#050811] text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of 28 Centers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-5">
            {filteredCenters.map((center, index) => {
              const isSelected = selectedCenter.id === center.id;
              return (
                <button
                  key={center.id}
                  onClick={() => setSelectedCenter(center)}
                  className={`text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#00f5d4]/10 border-[#00f5d4] shadow-[0_0_20px_rgba(0,245,212,0.15)]'
                      : 'bg-[#050811] border-slate-800/90 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
                      <span>
                        {String(index + 1).padStart(2, '0')}. {center.route}
                      </span>
                      <span className="text-[#00f5d4]">{center.featuredMetric}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white mt-1.5">{center.nameBn}</h3>
                    <div className="text-xs text-slate-400 font-medium">{center.nameEn}</div>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {center.descriptionBn}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-3 mt-3 border-t border-slate-800/80">
                    <span>{center.itemCount} Resources</span>
                    <span>{center.autopilotEnabled ? '🤖 Autopilot Active' : '⚡ Core Direct'}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Selected Center Spotlight Bar */}
          <div className="mt-5 p-4 rounded-xl bg-[#050811] border border-[#00f5d4]/30 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-[#00f5d4]">
                ACTIVE CENTER INSPECTOR · {selectedCenter.route}
              </div>
              <h3 className="text-lg font-bold text-white mt-0.5">
                {selectedCenter.nameBn} — {selectedCenter.nameEn}
              </h3>
              <p className="text-xs text-slate-300 mt-1">{selectedCenter.descriptionBn}</p>
            </div>
            <div className="flex items-center gap-2">
              {selectedCenter.slug === 'wp-studio' && (
                <button
                  onClick={() => setIsStudioModalOpen(true)}
                  className="px-4 py-2 rounded-lg bg-[#00f5d4] text-[#050811] font-bold text-xs cursor-pointer"
                >
                  Open Full-Screen Code Studio
                </button>
              )}
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200">
                {selectedCenter.featuredMetric}
              </span>
            </div>
          </div>
        </section>

        {/* =====================================================================
            6. CREATOR STUDIO, DEVICE DIAGNOSTIC LAB, GAMES CENTER & BD/HIJRI CALENDAR
        ====================================================================== */}
        <CreatorStudioDeviceLabAndGames
          onEarnPoints={handleEarnPoints}
          onNotify={showToastAndNotify}
        />

        {/* =====================================================================
            7. UNIVERSAL SOCIAL, BD 64-DISTRICT PROFILE, MESSAGES, COMMENTS, REPORTS & PASSKEYS
        ====================================================================== */}
        <UniversalSocialAndUserHub
          walletBalance={walletBalance}
          walletPoints={walletPoints}
          onAddPoints={handleEarnPoints}
          onNotify={showToastAndNotify}
        />

        {/* =====================================================================
            8. 15 INTERACTIVE CSS / RGB / NEON CODE LAB GENERATORS
        ====================================================================== */}
        <CssRgbNeonLab />

        {/* =====================================================================
            9. SANDBOXED LIVE DEMO PLAYGROUND (HTML / CSS / JS)
        ====================================================================== */}
        <LiveDemoPlayground />

        {/* =====================================================================
            10. 60+ UNIVERSAL DEVELOPER, MEDIA, PDF & CYBER TOOLS LAB
        ====================================================================== */}
        <DeveloperToolsLab />

        {/* =====================================================================
            11. 18 AI AUTOPILOTS, KILL-SWITCH, 10 CPTS, 8 TAXONOMIES, 21 DB TABLES & 114-ITEM QA AUDIT
        ====================================================================== */}
        <AutopilotAndArchitectureHub />

        {/* =====================================================================
            12. EMBEDDED LIVE WORDPRESS THEME + CORE PLUGIN FILE STUDIO
        ====================================================================== */}
        <WpPackageStudio
          files={virtualFiles}
          onUpdateFile={handleUpdateVirtualFile}
          onAddFile={handleAddVirtualFile}
          onDownloadPackage={handleDownloadZip}
        />

        {/* =====================================================================
            12B. COMPLETE MULTI-COLUMN BRANDED FOOTER (SECTION 12 MASTER SPEC)
        ====================================================================== */}
        <footer className="rounded-2xl border border-[#00f5d4]/30 bg-[#070b16] p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00f5d4]/15 border border-[#00f5d4] font-mono font-extrabold text-[#00f5d4]">
                  HS
                </div>
                <div>
                  <div className="text-lg font-extrabold text-white">Hackers শিক্ষক</div>
                  <div className="text-xs font-mono text-[#00f5d4]">
                    https://hackersshikkhok.com · @HackersShikkhok
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                সাইবার সিকিউরিটি শিক্ষা, ইথিক্যাল হ্যাকিং, কোডিং টিউটোরিয়াল, স্যান্ডবক্সড লাইভ ডেমো,
                ৬০+ ডেভেলপার ও মিডিয়া টুলস, ক্রিয়েটর স্টুডিও এবং নেটিভ ওয়ার্ডপ্রেস ইকোসিস্টেম।
              </p>
              <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                <span className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-[#00f5d4]">
                  ✉️ admin@hackersshikkhok.com
                </span>
                <span className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-purple-300">
                  ▶️ YouTube: @HackersShikkhok
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-extrabold text-white uppercase tracking-wider">
                প্ল্যাটফর্ম ক্যাটাগরি
              </div>
              <ul className="space-y-1.5 text-slate-400">
                <li>• সাইবার সিকিউরিটি ও ডিফেন্স ল্যাব</li>
                <li>• ওয়েব ও ওয়ার্ডপ্রেস ডেভেলপমেন্ট</li>
                <li>• এইচটিএমএল, সিএসএস, জাভাস্ক্রিপ্ট ও পাইথন</li>
                <li>• ট্রাবলশুটিং ও ফিক্স গাইড</li>
                <li>• একাডেমি কোর্স ও সার্টিফিকেশন</li>
              </ul>
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-extrabold text-white uppercase tracking-wider">
                জনপ্রিয় টুলস ও ল্যাব
              </div>
              <ul className="space-y-1.5 text-slate-400">
                <li>• ১৫টি CSS / RGB / Neon জেনারেটর</li>
                <li>• স্যান্ডবক্সড HTML/CSS/JS লাইভ ডেমো</li>
                <li>• JSON / Regex / SHA-256 / Base64 টুলস</li>
                <li>• ২৪-মডিউল ডিভাইস ডায়াগনস্টিক ল্যাব</li>
                <li>• ৭-এডিটর ক্রিয়েটর স্টুডিও ও গেমস সেন্টার</li>
              </ul>
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-extrabold text-white uppercase tracking-wider">
                লিগ্যাল, পলিসি ও ডাউনলোড
              </div>
              <ul className="space-y-1.5 text-slate-400">
                <li>• Privacy Policy &amp; Cookie Isolation</li>
                <li>• Terms of Use &amp; Ethical Charter</li>
                <li>• AdSense &amp; DMCA Compliance</li>
                <li>
                  <button
                    onClick={() => handleDownloadZip('theme')}
                    className="text-[#00f5d4] hover:underline font-bold cursor-pointer"
                  >
                    🛡️ Download hackersshikkhok-theme.zip
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleDownloadZip('core')}
                    className="text-purple-300 hover:underline font-bold cursor-pointer"
                  >
                    ⚙️ Download hackersshikkhok-core.zip
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800/90 pt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <div>
              © {new Date().getFullYear()} <strong className="text-white">Hackers শিক্ষক</strong>{' '}
              (HackersShikkhok.com). Developed by Hackers শিক্ষক. All rights reserved.
            </div>
            <div className="font-mono text-[11px] text-emerald-300">
              Native Core v4.0.0 · Zero Third-Party Plugin Dependency · PHP 8.2+ Ready
            </div>
          </div>
        </footer>
      </main>

      {/* =====================================================================
          13. FLOATING CHAT BUTTON (💬 ৩) & SCROLL-TO-TOP BUTTON (↑)
      ====================================================================== */}
      <div className="fixed bottom-20 right-4 z-40 flex flex-col items-end gap-2.5">
        <button
          onClick={() => setIsChatOpen((o) => !o)}
          className="px-4 py-2.5 rounded-full bg-gradient-to-r from-[#00f5d4] to-[#7c3aed] text-[#050811] font-extrabold text-xs shadow-[0_0_25px_rgba(0,245,212,0.45)] flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform"
        >
          <span>💬 ৩</span>
          <span className="hidden sm:inline">লাইভ চ্যাট</span>
        </button>

        <button
          onClick={scrollToTop}
          title="উপরে যান (Scroll to Top)"
          className="w-10 h-10 rounded-full bg-[#0b1120] hover:bg-slate-800 text-[#00f5d4] border border-[#00f5d4]/40 flex items-center justify-center font-bold shadow-lg cursor-pointer"
        >
          ↑
        </button>
      </div>

      {/* Floating Maya / Support Chat Drawer */}
      {isChatOpen && (
        <div className="fixed bottom-36 right-4 z-50 w-80 sm:w-96 bg-[#0b1120] border-2 border-[#00f5d4]/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          <div className="px-4 py-3 bg-gradient-to-r from-[#050811] to-[#111827] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base">✨</span>
              <div>
                <div className="text-xs font-bold text-white">মায়া (Hackers শিক্ষক Companion)</div>
                <div className="text-[10px] font-mono text-[#00f5d4]">💬 ৩টি নতুন মেসেজ · Online</div>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3.5 space-y-2.5 max-h-64 overflow-y-auto bg-[#050811]/90 text-xs">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`p-2.5 rounded-xl ${
                  msg.sender === 'maya'
                    ? 'bg-[#0b1120] border border-slate-800 text-slate-200'
                    : 'bg-[#00f5d4]/15 border border-[#00f5d4]/30 text-white ml-6'
                }`}
              >
                <p className="leading-relaxed">{msg.text}</p>
                <span className="block text-[10px] font-mono text-slate-500 mt-1">{msg.time}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendChat} className="p-2.5 bg-[#0b1120] border-t border-slate-800 flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="আপনার প্রশ্ন বা কোড সহায়তা লিখুন..."
              className="flex-1 px-3 py-1.5 rounded-lg bg-[#050811] border border-slate-800 text-xs text-white focus:outline-none focus:border-[#00f5d4]"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-lg bg-[#00f5d4] text-[#050811] font-bold text-xs flex items-center gap-1 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* =====================================================================
          14. BOTTOM 5-TAB NAVIGATION BAR
              (হোম, ড্যাশবোর্ড, মাঝখানে গ্লোয়িং ✨ মায়া বাটন, টুলস ল্যাব, প্রোফাইল)
      ====================================================================== */}
      <nav
        aria-label="Bottom 5-Tab Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 bg-[#050811]/95 backdrop-blur-lg border-t border-[#00f5d4]/25 px-2 sm:px-6 py-2"
      >
        <div className="max-w-3xl mx-auto grid grid-cols-5 items-center gap-1 text-center">
          <button
            onClick={() => {
              setActiveBottomTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeBottomTab === 'home'
                ? 'text-[#00f5d4] bg-[#00f5d4]/10'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🏠 হোম
          </button>

          <button
            onClick={() => {
              setActiveBottomTab('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeBottomTab === 'dashboard'
                ? 'text-[#00f5d4] bg-[#00f5d4]/10'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            📊 ড্যাশবোর্ড
          </button>

          {/* Center Glowing ✨ মায়া Button */}
          <div className="flex justify-center">
            <button
              onClick={() => {
                setActiveBottomTab('maya');
                setIsChatOpen(true);
              }}
              className="hs-glow-btn px-4 py-2 rounded-full bg-gradient-to-r from-[#00f5d4] via-[#7c3aed] to-[#f43f5e] text-[#050811] font-extrabold text-xs sm:text-sm tracking-wide cursor-pointer whitespace-nowrap"
            >
              ✨ মায়া
            </button>
          </div>

          <button
            onClick={() => {
              setActiveBottomTab('tools-lab');
            }}
            className={`py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeBottomTab === 'tools-lab'
                ? 'text-[#00f5d4] bg-[#00f5d4]/10'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🧪 টুলস ল্যাব
          </button>

          <button
            onClick={() => {
              setActiveBottomTab('profile');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeBottomTab === 'profile'
                ? 'text-[#00f5d4] bg-[#00f5d4]/10'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            👤 প্রোফাইল
          </button>
        </div>
      </nav>

      {/* Modal: Full-Screen WP Package Code Studio */}
      {isStudioModalOpen && (
        <WpPackageStudio
          files={virtualFiles}
          onUpdateFile={handleUpdateVirtualFile}
          onAddFile={handleAddVirtualFile}
          onDownloadPackage={handleDownloadZip}
          onClose={() => setIsStudioModalOpen(false)}
          isModal
        />
      )}

      {/* Modal: Registration / Login */}
      {authModalMode && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1120] border border-[#00f5d4]/40 rounded-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">
                {authModalMode === 'login'
                  ? 'Hackers শিক্ষক — মেম্বার লগইন (Passkey / 2FA Ready)'
                  : 'Hackers শিক্ষক — নতুন অ্যাকাউন্ট রেজিস্ট্রেশন'}
              </h3>
              <button
                onClick={() => setAuthModalMode(null)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">ইউজারনেম বা ইমেইল</label>
                <input
                  type="text"
                  defaultValue="developer@hackersshikkhok.com"
                  className="w-full px-3 py-2 rounded-lg bg-[#050811] border border-slate-800 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">পাসওয়ার্ড</label>
                <input
                  type="password"
                  defaultValue="••••••••••••"
                  className="w-full px-3 py-2 rounded-lg bg-[#050811] border border-slate-800 text-white"
                />
              </div>
              <button
                onClick={() => {
                  setAuthModalMode(null);
                  showToastAndNotify('স্বাগতম Hackers শিক্ষক মেম্বার! আপনার সেশন ও ওয়ালেট সক্রিয় রয়েছে।');
                }}
                className="w-full py-2.5 rounded-lg bg-[#00f5d4] text-[#050811] font-extrabold cursor-pointer"
              >
                {authModalMode === 'login' ? 'লগইন সম্পন্ন করুন' : 'রেজিস্ট্রেশন সম্পন্ন করুন'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

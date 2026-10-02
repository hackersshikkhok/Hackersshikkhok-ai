import React, { useState } from 'react';
import {
  THEME_SCREENSHOT_IMG,
  PLUGIN_BANNER_IMG,
  PLUGIN_ICON_IMG
} from '../data/wpVirtualFiles';
import { Download, CheckCircle2, Info, X } from 'lucide-react';

interface WpInstalledPreviewShowcaseProps {
  onDownloadPackage: (pkg: 'theme' | 'core' | 'docs' | 'all') => void;
  themeFileCount: number;
  coreFileCount: number;
}

export const WpInstalledPreviewShowcase: React.FC<WpInstalledPreviewShowcaseProps> = ({
  onDownloadPackage,
  themeFileCount,
  coreFileCount
}) => {
  const [detailsModal, setDetailsModal] = useState<'theme' | 'plugin' | null>(null);

  return (
    <section className="bg-[#0b1120] border border-[#00f5d4]/30 rounded-2xl p-5 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="text-xs font-mono text-[#00f5d4] tracking-wider">
            WORDPRESS ADMIN APPEARANCE &amp; PLUGINS PREVIEW · OFFICIAL BRAND: Hackers শিক্ষক
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
            ওয়ার্ডপ্রেসে ইনস্টল করার পর থিম ও প্লাগইন যেমন দেখাবে (ইমেজ ও সম্পূর্ণ ডিটেইলস সহ)
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            থিমের ভেতর <code className="text-[#00f5d4]">screenshot.png (1200×900)</code> এবং প্লাগইনের ভেতর <code className="text-[#00f5d4]">icon-256x256.png</code> ও <code className="text-[#00f5d4]">banner-772x250.png</code> সংযুক্ত করা হয়েছে—যাতে ওয়েবসাইটে ইনস্টল করার পর প্রিমিয়াম ইমেজ, ডেসক্রিপশন ও ডেভেলপার ডিটেইলস প্রদর্শিত হয়।
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onDownloadPackage('theme')}
            className="px-4 py-2.5 rounded-xl bg-[#00f5d4] hover:bg-[#00f5d4]/90 text-[#050811] font-extrabold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(0,245,212,0.3)] cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>🛡️ Download Theme Zip (ইমেজ সহ)</span>
          </button>
          <button
            onClick={() => onDownloadPackage('core')}
            className="px-4 py-2.5 rounded-xl bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-extrabold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(124,58,237,0.35)] cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>⚙️ Download Plugin Zip (ইমেজ সহ)</span>
          </button>
        </div>
      </div>

      {/* Two-Column WordPress Admin Preview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. WORDPRESS THEME PREVIEW CARD */}
        <div className="bg-[#050811] border border-[#00f5d4]/30 rounded-2xl overflow-hidden flex flex-col justify-between shadow-lg">
          <div>
            <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs">
              <span className="font-mono text-[#00f5d4] font-semibold">
                WordPress Admin → Appearance → Themes (screenshot.png)
              </span>
              <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Active Theme
              </span>
            </div>

            <div className="relative aspect-[4/3] w-full bg-[#0b1120] overflow-hidden border-b border-slate-800 group">
              <img
                src={THEME_SCREENSHOT_IMG}
                alt="Hackers শিক্ষক 2040 Cyber & Coding Hub Theme screenshot.png"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/65 to-transparent flex flex-col justify-end p-5">
                <div className="text-[11px] font-mono text-[#00f5d4] tracking-wider uppercase">
                  OFFICIAL WORDPRESS THEME · v4.0.0 · 1200×900 SCREENSHOT.PNG
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
                  Hackers শিক্ষক 2040 Cyber &amp; Coding Hub Theme
                </h3>
                <p className="text-xs text-slate-200 mt-1">
                  Developed by <strong className="text-[#00f5d4]">Hackers শিক্ষক</strong> ·{' '}
                  <a
                    href="https://hackersshikkhok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-[#00f5d4]"
                  >
                    https://hackersshikkhok.com
                  </a>
                </p>
              </div>
            </div>

            <div className="p-5 space-y-3 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-slate-400">Theme Name: </span>
                  <strong className="text-white">Hackers শিক্ষক 2040 Cyber &amp; Coding Hub Theme</strong>
                </div>
                <span className="font-mono text-[#00f5d4]">Version 4.0.0</span>
              </div>

              <div className="text-slate-300 leading-relaxed bg-[#0b1120] p-3.5 rounded-xl border border-slate-800/90">
                <strong className="text-[#00f5d4] block mb-1">ডেসক্রিপশন (Theme Description):</strong>
                Hackers শিক্ষক (HackersShikkhok.com | YouTube: @HackersShikkhok)-এর অফিসিয়াল ২০৪০ ফিউচারিস্টিক সাইবার-নিয়ন ও কোডিং হাব ওয়ার্ডপ্রেস থিম (v4.0.0)। এই থিমে রয়েছে লাইভ নোটিশ বার (🔴 লাইভ নোটিশ), ওয়ালেট ও পয়েন্ট বার (👛 ব্যালেন্স ও পয়েন্ট), ২৮টি প্ল্যাটফর্ম সেন্টার লেআউট, ১০টি থিম কালার প্রিসেট, ১০টি কার্ড স্টাইল, ১৫টি ইন্টারঅ্যাক্টিভ CSS/RGB/Neon জেনারেটর ইউআই, স্যান্ডবক্সড লাইভ কোড ডেমো ভিউ, ৬০+ ডেভেলপার ও মিডিয়া টুলস সেন্টার, ক্রিয়েটর স্টুডিও, ডিভাইস ল্যাব, গেমস সেন্টার এবং নিচে ৫-ট্যাবের নেভিগেশন বার।
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono text-slate-300 pt-1">
                <div className="bg-[#0b1120] px-3 py-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block">Author:</span>
                  <strong className="text-white">Developed by Hackers শিক্ষক</strong>
                </div>
                <div className="bg-[#0b1120] px-3 py-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block">Theme &amp; Download URI:</span>
                  <a
                    href="https://hackersshikkhok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00f5d4] hover:underline font-bold"
                  >
                    https://hackersshikkhok.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="px-5 py-3.5 bg-slate-900/60 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
            <button
              onClick={() => setDetailsModal('theme')}
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Info className="w-3.5 h-3.5 text-[#00f5d4]" /> Theme Details দেখুন
            </button>
            <button
              onClick={() => onDownloadPackage('theme')}
              className="px-4 py-2 rounded-lg bg-[#00f5d4] hover:bg-[#00f5d4]/90 text-[#050811] font-extrabold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> Download hackersshikkhok-theme.zip ({themeFileCount + 2} files)
            </button>
          </div>
        </div>

        {/* 2. WORDPRESS CORE PLUGIN PREVIEW CARD */}
        <div className="bg-[#050811] border border-[#7c3aed]/40 rounded-2xl overflow-hidden flex flex-col justify-between shadow-lg">
          <div>
            <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs">
              <span className="font-mono text-purple-300 font-semibold">
                WordPress Admin → Plugins → Installed Plugins
              </span>
              <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Active Plugin
              </span>
            </div>

            <div className="relative aspect-[16/9] w-full bg-[#0b1120] overflow-hidden border-b border-slate-800 group">
              <img
                src={PLUGIN_BANNER_IMG}
                alt="Hackers শিক্ষক Core Engine Plugin Banner"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/70 to-transparent flex items-end p-5 gap-4">
                <img
                  src={PLUGIN_ICON_IMG}
                  alt="Hackers শিক্ষক Core Plugin 256x256 Icon"
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-[#00f5d4] shadow-[0_0_20px_rgba(0,245,212,0.4)] object-cover shrink-0"
                />
                <div>
                  <div className="text-[11px] font-mono text-[#00f5d4] tracking-wider uppercase">
                    CORE ENGINE PLUGIN · v4.0.0 · ICON + BANNER EMBEDDED
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
                    Hackers শিক্ষক Core Engine (v4.0 Complete Ecosystem)
                  </h3>
                  <p className="text-xs text-slate-200 mt-1">
                    Developed by <strong className="text-[#00f5d4]">Hackers শিক্ষক</strong> ·{' '}
                    <a
                      href="https://hackersshikkhok.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-[#00f5d4]"
                    >
                      https://hackersshikkhok.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-3 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-slate-400">Plugin Name: </span>
                  <strong className="text-white">Hackers শিক্ষক Core Engine</strong>
                </div>
                <span className="font-mono text-purple-300">Requires PHP 8.2+ · WP 6.4+</span>
              </div>

              <div className="text-slate-300 leading-relaxed bg-[#0b1120] p-3.5 rounded-xl border border-slate-800/90">
                <strong className="text-[#00f5d4] block mb-1">ডেসক্রিপশন (Plugin Description):</strong>
                Hackers শিক্ষক (HackersShikkhok.com)-এর অফিসিয়াল মাস্টার কোর ইঞ্জিন প্লাগইন (v4.0.0)। এতে রয়েছে ২৮টি প্ল্যাটফর্ম সেন্টার, ইউনিভার্সাল সোশ্যাল ও ইন্টারেকশন ইঞ্জিন (Follow, Like, Favorite/Save, Share, Deep-linked Comments, Private Messaging, Block, Report, Deduplicated Notifications), আলাদা Points/Level/Badges ও Monetary Wallet Ledger, ১৮টি সেন্টার-ভিত্তিক AI অটো-পাইলট, ১১টি ইউনিভার্সাল ফ্যাক্টরি, Global Emergency Kill Switch, ১০টি CPTs, ৮টি Taxonomies, ২১টি DB টেবিল, ৬০+ টুলস, ক্রিয়েটর স্টুডিও, ডিভাইস ল্যাব এবং গেমস সেন্টার।
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono text-slate-300 pt-1">
                <div className="bg-[#0b1120] px-3 py-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block">Developer Credit:</span>
                  <strong className="text-white">Developed by Hackers শিক্ষক</strong>
                </div>
                <div className="bg-[#0b1120] px-3 py-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block">Plugin &amp; Download Link:</span>
                  <a
                    href="https://hackersshikkhok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00f5d4] hover:underline font-bold"
                  >
                    https://hackersshikkhok.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="px-5 py-3.5 bg-slate-900/60 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
            <button
              onClick={() => setDetailsModal('plugin')}
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Info className="w-3.5 h-3.5 text-purple-400" /> View Plugin Details
            </button>
            <button
              onClick={() => onDownloadPackage('core')}
              className="px-4 py-2 rounded-lg bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-extrabold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> Download hackersshikkhok-core.zip ({coreFileCount + 2} files)
            </button>
          </div>
        </div>
      </div>

      {/* WordPress Theme / Plugin Full Details Popup Modal */}
      {detailsModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1120] border-2 border-[#00f5d4]/40 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl">
            <div className="relative h-48 sm:h-56 w-full bg-[#050811]">
              <img
                src={detailsModal === 'theme' ? THEME_SCREENSHOT_IMG : PLUGIN_BANNER_IMG}
                alt="Package Banner"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setDetailsModal(null)}
                className="absolute top-3 right-3 p-2 rounded-lg bg-black/70 text-white hover:bg-black cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-[#0b1120]/50 to-transparent flex items-end p-5 gap-4">
                <img
                  src={PLUGIN_ICON_IMG}
                  alt="Icon"
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-xl border-2 border-[#00f5d4] object-cover"
                />
                <div>
                  <span className="text-xs font-mono text-[#00f5d4]">
                    {detailsModal === 'theme' ? 'WORDPRESS THEME DETAILS' : 'WORDPRESS PLUGIN DETAILS'}
                  </span>
                  <h3 className="text-xl font-extrabold text-white">
                    {detailsModal === 'theme'
                      ? 'Hackers শিক্ষক 2040 Cyber & Coding Hub Theme (v4.0.0)'
                      : 'Hackers শিক্ষক Core Engine Plugin (v4.0.0)'}
                  </h3>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-200 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#050811] p-3.5 rounded-xl border border-slate-800 font-mono">
                <div>
                  <span className="text-slate-400 block text-[10px]">DEVELOPED BY</span>
                  <strong className="text-[#00f5d4]">Hackers শিক্ষক</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">VERSION</span>
                  <strong className="text-white">4.0.0 (Master)</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">REQUIRES</span>
                  <strong className="text-white">WP 6.4+ · PHP 8.2+</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">DOWNLOAD LINK</span>
                  <a
                    href="https://hackersshikkhok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00f5d4] underline font-bold"
                  >
                    hackersshikkhok.com
                  </a>
                </div>
              </div>

              <div className="space-y-2 leading-relaxed">
                <h4 className="text-sm font-bold text-white">সম্পূর্ণ বিবরণ (Full Details):</h4>
                <p>
                  <strong>Hackers শিক্ষক (HackersShikkhok.com | YouTube: @HackersShikkhok)</strong>-এর জন্য নির্মিত এই প্যাকেজটিতে প্রিমিয়াম ইমেজ থাম্বনেইল (<code>screenshot.png</code>, <code>icon-256x256.png</code>, <code>banner-772x250.png</code>), সম্পূর্ণ বাংলা ও ইংরেজি ডেসক্রিপশন এবং ডেভেলপার ক্রেডিট (<strong>Developed by Hackers শিক্ষক</strong>) সংযুক্ত রয়েছে।
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-300">
                  <li>২৮টি বিশেষায়িত প্ল্যাটফর্ম সেন্টার এবং ৫-ট্যাব বটম নেভিগেশন বার (হোম, ড্যাশবোর্ড, ✨ মায়া, টুলস ল্যাব, প্রোফাইল)।</li>
                  <li>ইউনিভার্সাল সোশ্যাল ও ইন্টারেকশন সিস্টেম: Follow, Like, Favorite/Save, Share, Deep-linked Comments, Private Messaging, Block/Mute, Report Queue এবং Deduplicated Notification Engine।</li>
                  <li>১৮টি সেন্টার-ভিত্তিক AI অটো-পাইলট, ১১টি ইউনিভার্সাল ফ্যাক্টরি, ট্রেন্ড ইন্টেলিজেন্স, ১০০-পয়েন্ট কোয়ালিটি গেট এবং Global Emergency Stop Kill Switch।</li>
                  <li>১৫টি ইন্টারঅ্যাক্টিভ CSS / RGB / নিয়ন জেনারেটর, ৬০+ ডেভেলপার ও মিডিয়া টুলস, ব্রাউজার-ভিত্তিক ক্রিয়েটর স্টুডিও, ডিভাইস ল্যাব এবং গেমস সেন্টার।</li>
                  <li>অফিসিয়াল ওয়েবসাইট ও ডাউনলোড লিংক: <a href="https://hackersshikkhok.com" target="_blank" rel="noopener noreferrer" className="text-[#00f5d4] underline">https://hackersshikkhok.com</a></li>
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  onClick={() => setDetailsModal(null)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 font-semibold cursor-pointer"
                >
                  বন্ধ করুন
                </button>
                <button
                  onClick={() => {
                    onDownloadPackage(detailsModal === 'theme' ? 'theme' : 'core');
                    setDetailsModal(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-[#00f5d4] text-[#050811] font-extrabold flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  {detailsModal === 'theme'
                    ? 'Download hackersshikkhok-theme.zip'
                    : 'Download hackersshikkhok-core.zip'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

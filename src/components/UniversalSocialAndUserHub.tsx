import React, { useState } from 'react';
import { BANGLADESH_DIVISIONS_DISTRICTS } from '../data/platformData';
import {
  UserCheck,
  Heart,
  Bookmark,
  Share2,
  MessageSquare,
  Flag,
  Bell,
  Shield,
  KeyRound,
  Wallet,
  Award,
  MapPin,
  Lock,
  Send,
  CheckCircle2,
  Ban,
  Download
} from 'lucide-react';

interface UniversalSocialAndUserHubProps {
  walletBalance: number;
  walletPoints: number;
  onAddPoints: (pts: number, reason: string) => void;
  onNotify: (msg: string) => void;
}

export const UniversalSocialAndUserHub: React.FC<UniversalSocialAndUserHubProps> = ({
  walletBalance,
  walletPoints,
  onAddPoints,
  onNotify
}) => {
  const [activeSubTab, setActiveSubTab] = useState<
    'profile-geo' | 'follow-feed' | 'saved-favorites' | 'messages' | 'comments-qa' | 'reports-mod' | 'wallet-points' | 'security-passkey'
  >('profile-geo');

  // Profile & Bangladesh Geo State (8 Divisions / 64 Districts)
  const divisions = Object.keys(BANGLADESH_DIVISIONS_DISTRICTS);
  const [selectedDivision, setSelectedDivision] = useState<string>(divisions[0]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>(BANGLADESH_DIVISIONS_DISTRICTS[divisions[0]][0]);
  const [geoPrivacy, setGeoPrivacy] = useState<'Public' | 'Approximate' | 'Followers Only' | 'Private'>('Public');
  const [bioPrivacy, setBioPrivacy] = useState<'Public' | 'Members Only' | 'Followers Only' | 'Private'>('Public');

  // Follow & Block System State
  const [creators, setCreators] = useState([
    { id: 'cr-1', name: 'Hackers শিক্ষক Core Team', role: 'Verified Creator · Instructor', followers: 14820, isFollowing: true, isBlocked: false, isMuted: false },
    { id: 'cr-2', name: 'Tanvir Cyber Researcher', role: 'Security Researcher · OWASP Lab', followers: 4310, isFollowing: false, isBlocked: false, isMuted: false },
    { id: 'cr-3', name: 'Nusrat WP Architect', role: 'Developer · Plugin Engineer', followers: 6190, isFollowing: true, isBlocked: false, isMuted: false },
    { id: 'cr-4', name: 'Arif Linux & Cloud Mentor', role: 'Instructor · DevOps', followers: 3290, isFollowing: false, isBlocked: false, isMuted: false }
  ]);

  // Saved / Favorited Items State
  const [savedFilter, setSavedFilter] = useState<string>('All');
  const [savedItems, setSavedItems] = useState([
    { id: 'sv-1', title: '2040 Cyber Neon Glass Card with Animated Conic Border', type: 'Code', liked: true, likes: 342, shares: 88 },
    { id: 'sv-2', title: 'WordPress REST API Transient Rate Limiter & Nonce Guard (PHP 8.2+)', type: 'Tutorial', liked: true, likes: 275, shares: 64 },
    { id: 'sv-3', title: 'JPG / PNG / WebP Converter & EXIF Privacy Cleaner', type: 'Tool', liked: false, likes: 512, shares: 145 },
    { id: 'sv-4', title: 'Ethical Hacking & Defensive OWASP Top 10 Master Track', type: 'Course', liked: true, likes: 890, shares: 310 }
  ]);

  // Deep-linked Comments State (#comment-{id})
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1041,
      author: 'Nusrat WP Architect',
      role: 'Verified Creator',
      text: '@Hackers শিক্ষক নতুন v4.0 ইকোসিস্টেমে Universal Notification এবং Zip-Slip প্রোটেকশন অসাধারণ কাজ করছে!',
      likes: 24,
      liked: false,
      time: '14 mins ago'
    },
    {
      id: 1042,
      author: 'Tanvir Cyber Researcher',
      role: 'Researcher',
      text: 'WebAuthn Passkey ও স্যান্ডবক্সড iframe-এ কুকি আইসোলেশন টেস্ট করেছি—100% নিরাপদ।',
      likes: 19,
      liked: true,
      time: '8 mins ago'
    }
  ]);

  // Private Messaging Inbox State
  const [msgInput, setMsgInput] = useState('');
  const [conversations, setConversations] = useState([
    {
      id: 'conv-1',
      partner: 'Nusrat WP Architect',
      unread: 2,
      blocked: false,
      messages: [
        { from: 'Nusrat WP Architect', text: 'হ্যালো! আমাদের নতুন WP Plugin Boilerplate প্রজেক্টের কোড রিভিউ কি সম্পন্ন হয়েছে?', time: '10:20 AM' },
        { from: 'You', text: 'হ্যাঁ, Quality Gate-এ 95/100 পেয়েছে এবং ZIP ডাউনলোডের জন্য প্রস্তুত।', time: '10:24 AM' }
      ]
    }
  ]);

  // Universal Report / Moderation Queue
  const [reports, setReports] = useState([
    { id: 'rep-901', target: 'Comment #1038', reason: 'Spam / Promotional Link', status: 'Under Review', reporter: 'tanvir_sec' },
    { id: 'rep-902', target: 'External Tool Submission #44', reason: 'Unsafe Code Pattern Detected', status: 'Resolved', reporter: 'Auto-Guard' },
    { id: 'rep-903', target: 'Forum Thread #812', reason: 'Duplicate Question', status: 'New', reporter: 'nusrat_wp' }
  ]);
  const [newReportTarget, setNewReportTarget] = useState('');
  const [newReportReason, setNewReportReason] = useState('Spam');

  // Passkey / 2FA Security State
  const [passkeys, setPasskeys] = useState([
    { id: 'pk-1', name: 'Windows 11 Hello Hardware Passkey (WebAuthn)', created: '2026-09-15', lastUsed: 'Today' },
    { id: 'pk-2', name: 'Android Pixel Biometric Passkey (Public Key Credential)', created: '2026-09-22', lastUsed: 'Yesterday' }
  ]);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  // Monetary Wallet Withdrawal State (Separate from Points)
  const [withdrawAmount, setWithdrawAmount] = useState('20');
  const [ledgerHistory, setLedgerHistory] = useState([
    { id: 'TX-8821', type: 'Credit (Creator Verification Bonus)', amountBdt: '+25.0 ৳', status: 'Approved', date: '2026-09-28' },
    { id: 'TX-8822', type: 'Credit (Approved Tutorial Royalty)', amountBdt: '+10.5 ৳', status: 'Approved', date: '2026-09-30' }
  ]);

  const userLevel = Math.max(1, Math.floor(walletPoints / 100) + 1);
  const nextLevelProgress = walletPoints % 100;

  const handleToggleFollow = (id: string) => {
    setCreators((prev) =>
      prev.map((c) => {
        if (c.id !== id || c.isBlocked) return c;
        const nextFollow = !c.isFollowing;
        onNotify(
          nextFollow
            ? `আপনি ${c.name}-কে ফলো করেছেন (Deduplicated Notification Sent)`
            : `${c.name}-কে আনফলো করা হয়েছে`
        );
        return {
          ...c,
          isFollowing: nextFollow,
          followers: nextFollow ? c.followers + 1 : c.followers - 1
        };
      })
    );
  };

  const handleToggleBlock = (id: string) => {
    setCreators((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const nextBlocked = !c.isBlocked;
        onNotify(nextBlocked ? `${c.name}-কে ব্লক করা হয়েছে (মেসেজ ও ফলো সীমাবদ্ধ)` : `${c.name}-কে আনব্লক করা হয়েছে`);
        return { ...c, isBlocked: nextBlocked, isFollowing: nextBlocked ? false : c.isFollowing };
      })
    );
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    const newId = 1043 + comments.length;
    setComments((prev) => [
      ...prev,
      {
        id: newId,
        author: 'Hackers শিক্ষক Member',
        role: 'Developer · Lvl ' + userLevel,
        text: commentInput.trim(),
        likes: 1,
        liked: true,
        time: 'Just now'
      }
    ]);
    setCommentInput('');
    onAddPoints(5, 'সহায়ক কমেন্ট যোগ করার জন্য +5 Points অর্জিত হয়েছে!');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgInput.trim()) return;
    setConversations((prev) =>
      prev.map((conv, idx) =>
        idx === 0
          ? {
              ...conv,
              unread: 0,
              messages: [...conv.messages, { from: 'You', text: msgInput.trim(), time: 'Just now' }]
            }
          : conv
      )
    );
    setMsgInput('');
    onNotify('প্রাইভেট মেসেজ নিরাপদে পাঠানো হয়েছে।');
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReportTarget.trim()) return;
    setReports((prev) => [
      {
        id: `rep-${904 + prev.length}`,
        target: newReportTarget.trim(),
        reason: newReportReason,
        status: 'New',
        reporter: 'current_user'
      },
      ...prev
    ]);
    setNewReportTarget('');
    onNotify('রিপোর্ট মডারেশন কিউতে জমা হয়েছে (Status: New)।');
  };

  const handleRegisterPasskey = () => {
    const newPk = {
      id: `pk-${Date.now()}`,
      name: `Passkey Credential #${passkeys.length + 1} (WebAuthn Public Key — Zero Raw Biometrics)`,
      created: new Date().toISOString().slice(0, 10),
      lastUsed: 'Just now'
    };
    setPasskeys((prev) => [...prev, newPk]);
    onNotify('নতুন WebAuthn Passkey ক্রেডেনশিয়াল নিবন্ধিত হয়েছে!');
  };

  return (
    <section className="bg-[#0b1120] border border-[#00f5d4]/25 rounded-2xl p-5 md:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="text-xs font-mono text-[#00f5d4]">
            UNIVERSAL USER, SOCIAL, INTERACTION, MESSAGING, WALLET &amp; PASSKEY ENGINE
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
            Hackers শিক্ষক — ইউনিভার্সাল প্রোফাইল, ফলো, বুকমার্ক, মেসেজিং, ওয়ালেট ও সিকিউরিটি হাব
          </h2>
        </div>

        {/* Level & Points Badge (Strictly separate from Monetary Balance) */}
        <div className="flex items-center gap-3 bg-[#050811] px-4 py-2 rounded-xl border border-slate-800">
          <div>
            <div className="text-xs font-bold text-[#00f5d4]">Level {userLevel} · Cyber Architect</div>
            <div className="w-36 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1">
              <div className="h-full bg-gradient-to-r from-[#00f5d4] to-[#7c3aed]" style={{ width: `${nextLevelProgress}%` }} />
            </div>
          </div>
          <div className="text-right font-mono text-xs">
            <div className="text-amber-400 font-bold">{walletPoints} XP Points</div>
            <div className="text-[10px] text-slate-400">Points ≠ টাকা</div>
          </div>
        </div>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800/70">
        {[
          { id: 'profile-geo', label: '👤 প্রোফাইল ও বাংলাদেশ জিও (8 Div / 64 Dist)' },
          { id: 'follow-feed', label: '🤝 ফলো, আনফলো ও ব্লক সিস্টেম' },
          { id: 'saved-favorites', label: '🔖 সেভড ও ফেভারিট আইটেম + শেয়ার' },
          { id: 'comments-qa', label: '💬 নেস্টেড কমেন্ট (#comment-id)' },
          { id: 'messages', label: '✉️ প্রাইভেট মেসেজিং ইনবক্স' },
          { id: 'reports-mod', label: '🚩 রিপোর্ট ও মডারেশন কিউ' },
          { id: 'wallet-points', label: '👛 ওয়ালেট (৳) বনাম পয়েন্টস ও ব্যাজ' },
          { id: 'security-passkey', label: '🔐 Passkey (WebAuthn), 2FA ও প্রাইভেসি' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveSubTab(t.id as typeof activeSubTab)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
              activeSubTab === t.id
                ? 'bg-[#00f5d4] text-[#050811] font-bold'
                : 'bg-[#050811] text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB 1: Profile + Bangladesh 8 Divisions & 64 Districts + Field Privacy */}
      {activeSubTab === 'profile-geo' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-[#050811] border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00f5d4] to-[#7c3aed] flex items-center justify-center text-[#050811] font-extrabold text-xl font-mono">
                HS
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Hackers শিক্ষক Verified Creator</h3>
                <p className="text-xs text-slate-400">@hackersshikkhok · Role: Verified Creator &amp; Administrator</p>
                <div className="text-[11px] font-mono text-[#00f5d4] mt-1">
                  Joined: 2026 · Verified Status: Active ✓
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs pt-2 border-t border-slate-800">
              <div className="text-slate-400 font-semibold">অর্জিত ব্যাজসমূহ (Earned Badges):</div>
              <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                {[
                  '🛡️ Cyber Learner',
                  '⚡ Tool Creator',
                  '🎓 Course Completer',
                  '🤝 Community Helper',
                  '💻 WP Core Developer',
                  '🔬 Security Researcher'
                ].map((b) => (
                  <span key={b} className="px-2.5 py-1 rounded bg-[#0b1120] border border-[#00f5d4]/30 text-slate-200">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#050811] border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#00f5d4] flex items-center gap-1.5">
                <MapPin className="w-4 h-4" /> বাংলাদেশ জিও সিস্টেম (৮টি বিভাগ ও ৬৪টি জেলা) + ফিল্ড প্রাইভেসি
              </h3>
              <span className="text-[11px] font-mono text-slate-400">Granular Privacy Control</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">বিভাগ (Division — 8 Divisions)</label>
                <select
                  value={selectedDivision}
                  onChange={(e) => {
                    const div = e.target.value;
                    setSelectedDivision(div);
                    setSelectedDistrict(BANGLADESH_DIVISIONS_DISTRICTS[div][0]);
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-[#0b1120] border border-slate-700 text-white"
                >
                  {divisions.map((div) => (
                    <option key={div} value={div}>
                      {div}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">জেলা (District — 64 Districts)</label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0b1120] border border-slate-700 text-white"
                >
                  {BANGLADESH_DIVISIONS_DISTRICTS[selectedDivision].map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">লোকেশন প্রাইভেসি (Geo Privacy)</label>
                <select
                  value={geoPrivacy}
                  onChange={(e) => setGeoPrivacy(e.target.value as typeof geoPrivacy)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0b1120] border border-slate-700 text-[#00f5d4] font-semibold"
                >
                  <option value="Public">Public (সবার জন্য উন্মুক্ত)</option>
                  <option value="Approximate">Approximate (শুধু বিভাগ দেখাবে)</option>
                  <option value="Followers Only">Followers Only (শুধু ফলোয়ারদের জন্য)</option>
                  <option value="Private">Private (শুধু নিজে দেখবেন)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">প্রোফাইল অ্যাক্টিভিটি প্রাইভেসি (Field Privacy)</label>
                <select
                  value={bioPrivacy}
                  onChange={(e) => setBioPrivacy(e.target.value as typeof bioPrivacy)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0b1120] border border-slate-700 text-[#00f5d4] font-semibold"
                >
                  <option value="Public">Public</option>
                  <option value="Members Only">Members Only</option>
                  <option value="Followers Only">Followers Only</option>
                  <option value="Private">Private</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-800 text-xs">
              <span className="text-slate-400">
                নির্বাচিত লোকেশন: <strong className="text-white">{selectedDistrict}, {selectedDivision}</strong> ({geoPrivacy})
              </span>
              <button
                onClick={() => onNotify(`প্রোফাইল ও জিও প্রাইভেসি (${selectedDistrict}, ${geoPrivacy}) সংরক্ষিত হয়েছে!`)}
                className="px-4 py-2 rounded-lg bg-[#00f5d4] text-[#050811] font-bold cursor-pointer"
              >
                প্রোফাইল আপডেট করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Universal Follow / Unfollow / Block System */}
      {activeSubTab === 'follow-feed' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {creators.map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-xl bg-[#050811] border border-slate-800 flex flex-wrap items-center justify-between gap-3"
            >
              <div>
                <div className="text-sm font-bold text-white">{c.name}</div>
                <div className="text-xs text-slate-400">{c.role}</div>
                <div className="text-[11px] font-mono text-[#00f5d4] mt-1">
                  {c.followers.toLocaleString()} Followers · {c.isBlocked ? '🚫 Blocked' : 'Active'}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleFollow(c.id)}
                  disabled={c.isBlocked}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                    c.isFollowing
                      ? 'bg-slate-800 text-[#00f5d4] border border-[#00f5d4]/40'
                      : 'bg-[#00f5d4] text-[#050811]'
                  } ${c.isBlocked ? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  {c.isFollowing ? 'Following ✓' : '+ Follow'}
                </button>
                <button
                  onClick={() => handleToggleBlock(c.id)}
                  className="px-2.5 py-1.5 rounded-lg bg-rose-950/50 hover:bg-rose-900/60 text-rose-300 border border-rose-800/60 text-xs cursor-pointer"
                >
                  {c.isBlocked ? 'Unblock' : 'Block'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: Universal Favorite / Save / Bookmark & Share System */}
      {activeSubTab === 'saved-favorites' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {['All', 'Code', 'Tutorial', 'Tool', 'Course'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSavedFilter(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer ${
                    savedFilter === cat
                      ? 'bg-[#00f5d4] text-[#050811] font-bold'
                      : 'bg-[#050811] text-slate-300 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <span className="text-xs font-mono text-slate-400">
              Self-share spam protection active · Native Share + Copy Link
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {savedItems
              .filter((item) => savedFilter === 'All' || item.type === savedFilter)
              .map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-[#050811] border border-slate-800 flex flex-col justify-between gap-3"
                >
                  <div>
                    <div className="text-[11px] font-mono text-[#00f5d4]">{item.type}</div>
                    <h4 className="text-sm font-bold text-white mt-0.5">{item.title}</h4>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-xs">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setSavedItems((prev) =>
                            prev.map((s) =>
                              s.id === item.id
                                ? { ...s, liked: !s.liked, likes: s.liked ? s.likes - 1 : s.likes + 1 }
                                : s
                            )
                          )
                        }
                        className={`px-2.5 py-1 rounded bg-[#0b1120] border border-slate-800 flex items-center gap-1 cursor-pointer ${
                          item.liked ? 'text-rose-400 border-rose-500/40' : 'text-slate-300'
                        }`}
                      >
                        <Heart className="w-3.5 h-3.5" /> {item.likes}
                      </button>

                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText(`https://hackersshikkhok.com/item/${item.id}`);
                          onNotify(`লিংক কপি হয়েছে (https://hackersshikkhok.com/item/${item.id})`);
                        }}
                        className="px-2.5 py-1 rounded bg-[#0b1120] border border-slate-800 text-slate-300 hover:text-[#00f5d4] flex items-center gap-1 cursor-pointer"
                      >
                        <Share2 className="w-3.5 h-3.5" /> Share ({item.shares})
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        setSavedItems((prev) => prev.filter((s) => s.id !== item.id));
                        onNotify('বুকমার্ক তালিকা থেকে সরানো হয়েছে।');
                      }}
                      className="text-xs text-slate-400 hover:text-rose-400 cursor-pointer"
                    >
                      Remove Bookmark
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* TAB 4: Deep-Linked Comments (#comment-{id}) */}
      {activeSubTab === 'comments-qa' && (
        <div className="space-y-4">
          <form onSubmit={handleAddComment} className="flex gap-2">
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="কমেন্ট বা @mention লিখুন (প্রতিটি কমেন্টে ইউনিক #comment-id ডিপ-লিংক তৈরি হবে)..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-[#050811] border border-slate-800 text-xs text-white focus:outline-none focus:border-[#00f5d4]"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#00f5d4] text-[#050811] font-bold text-xs cursor-pointer"
            >
              কমেন্ট পোস্ট করুন
            </button>
          </form>

          <div className="space-y-2.5">
            {comments.map((c) => (
              <div
                key={c.id}
                id={`comment-${c.id}`}
                className="p-3.5 rounded-xl bg-[#050811] border border-slate-800 text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <strong className="text-white">{c.author}</strong>{' '}
                    <span className="text-slate-400">· {c.role} · {c.time}</span>
                  </div>
                  <a
                    href={`#comment-${c.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigator.clipboard?.writeText(`https://hackersshikkhok.com/#comment-${c.id}`);
                      onNotify(`Deep-link কপি হয়েছে: #comment-${c.id}`);
                    }}
                    className="font-mono text-[#00f5d4] hover:underline"
                  >
                    #comment-{c.id}
                  </a>
                </div>
                <p className="text-slate-200">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: Private Messaging Inbox */}
      {activeSubTab === 'messages' && (
        <div className="bg-[#050811] border border-slate-800 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
            <div>
              <strong className="text-white">Conversation with {conversations[0].partner}</strong>
              <span className="block text-slate-400">End-to-end permission validated · Block &amp; rate-limit protected</span>
            </div>
            <span className="font-mono text-[#00f5d4]">Inbox Active</span>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto text-xs">
            {conversations[0].messages.map((m, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl ${
                  m.from === 'You'
                    ? 'bg-[#00f5d4]/15 border border-[#00f5d4]/30 text-white ml-8'
                    : 'bg-[#0b1120] border border-slate-800 text-slate-200 mr-8'
                }`}
              >
                <div className="font-bold text-[11px] text-[#00f5d4]">{m.from} · {m.time}</div>
                <div className="mt-0.5">{m.text}</div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={msgInput}
              onChange={(e) => setMsgInput(e.target.value)}
              placeholder="প্রাইভেট মেসেজ লিখুন..."
              className="flex-1 px-3.5 py-2 rounded-lg bg-[#0b1120] border border-slate-800 text-xs text-white"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#00f5d4] text-[#050811] font-bold text-xs cursor-pointer"
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* TAB 6: Universal Report / Flag & Moderation Queue */}
      {activeSubTab === 'reports-mod' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <form onSubmit={handleSubmitReport} className="lg:col-span-5 bg-[#050811] border border-slate-800 rounded-xl p-4 space-y-3 text-xs">
            <h4 className="font-bold text-white">নতুন রিপোর্ট / ফ্ল্যাগ জমা দিন (Universal Report Engine)</h4>
            <div>
              <label className="block text-slate-400 mb-1">Content / User / Tool / Comment ID</label>
              <input
                type="text"
                value={newReportTarget}
                onChange={(e) => setNewReportTarget(e.target.value)}
                placeholder="যেমন: Comment #1042 বা Tool #12"
                className="w-full px-3 py-2 rounded-lg bg-[#0b1120] border border-slate-800 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">রিপোর্টের কারণ (Reason)</label>
              <select
                value={newReportReason}
                onChange={(e) => setNewReportReason(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0b1120] border border-slate-800 text-white"
              >
                <option value="Spam">Spam</option>
                <option value="Abuse / Harassment">Abuse / Harassment</option>
                <option value="Misleading Information">Misleading Information</option>
                <option value="Malicious / Unsafe Content">Malicious / Unsafe Content</option>
                <option value="Copyright / Privacy Issue">Copyright / Privacy Issue</option>
                <option value="Broken Content">Broken Content</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-bold cursor-pointer"
            >
              রিপোর্ট জমা দিন
            </button>
          </form>

          <div className="lg:col-span-7 bg-[#050811] border border-slate-800 rounded-xl p-4 space-y-2.5 text-xs">
            <h4 className="font-bold text-white">অ্যাডমিন ও মডারেটর রিপোর্ট কিউ (New / Under Review / Resolved)</h4>
            {reports.map((r) => (
              <div key={r.id} className="p-3 rounded-lg bg-[#0b1120] border border-slate-800 flex items-center justify-between">
                <div>
                  <strong className="text-white">{r.target}</strong> · <span className="text-rose-300">{r.reason}</span>
                  <div className="text-[11px] font-mono text-slate-400">ID: {r.id} · Reporter: {r.reporter}</div>
                </div>
                <span className="font-mono text-[#00f5d4] font-bold">{r.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: Strictly Separated Wallet (BDT) vs Points/Badges */}
      {activeSubTab === 'wallet-points' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 text-xs">
          <div className="bg-[#050811] border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-[#00f5d4]">১. Monetary Wallet Balance (৳ BDT — Atomic Ledger)</h4>
              <span className="font-mono text-lg font-extrabold text-white">{walletBalance.toFixed(1)} ৳</span>
            </div>
            <p className="text-slate-400">
              সার্ভার-সাইড অ্যাটমিক লেজার দ্বারা সুরক্ষিত। ক্লায়েন্ট-সাইড থেকে কোনো ইউজার ব্যালেন্স পরিবর্তন করতে পারবে না।
            </p>
            <div className="space-y-1.5">
              {ledgerHistory.map((tx) => (
                <div key={tx.id} className="p-2.5 rounded bg-[#0b1120] border border-slate-800 flex justify-between font-mono">
                  <span>{tx.id} · {tx.type}</span>
                  <strong className="text-emerald-400">{tx.amountBdt} ({tx.status})</strong>
                </div>
              ))}
            </div>
            <div className="flex gap-2 pt-2">
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="w-28 px-3 py-1.5 rounded bg-[#0b1120] border border-slate-800 text-white font-mono"
              />
              <button
                onClick={() => {
                  setLedgerHistory((prev) => [
                    {
                      id: `TX-${8823 + prev.length}`,
                      type: 'Withdrawal Request (Pending Admin Review)',
                      amountBdt: `-${withdrawAmount} ৳`,
                      status: 'Pending',
                      date: 'Just now'
                    },
                    ...prev
                  ]);
                  onNotify(`উইথড্রয়াল রিকোয়েস্ট (${withdrawAmount} ৳) অ্যাডমিন রিভিউয়ের জন্য জমা হয়েছে।`);
                }}
                className="px-4 py-1.5 rounded bg-[#00f5d4] text-[#050811] font-bold cursor-pointer"
              >
                Request Withdrawal
              </button>
            </div>
          </div>

          <div className="bg-[#050811] border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-amber-400">২. Learning Points, XP, Levels &amp; Badges (Non-Monetary)</h4>
              <span className="font-mono text-lg font-extrabold text-amber-400">{walletPoints} Points</span>
            </div>
            <p className="text-slate-300">
              <strong>নীতিমালা:</strong> কখনোই <code>Points = টাকা</code> ধরা হয় না। কোর্স, কুইজ, সহায়ক উত্তর, গেম স্কোর ও কমিউনিটি কন্ট্রিবিউশনের মাধ্যমে পয়েন্ট ও লেভেল বৃদ্ধি পায়।
            </p>
            <div className="p-3 rounded-lg bg-[#0b1120] border border-slate-800 font-mono space-y-1">
              <div>Current Level: Level {userLevel} (Next Level at {userLevel * 100} Points)</div>
              <div>Active Badges: 6 Verified Skill Badges</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: Passkey (WebAuthn), 2FA & Account Data Export */}
      {activeSubTab === 'security-passkey' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 text-xs">
          <div className="bg-[#050811] border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-[#00f5d4] flex items-center gap-1.5">
                <KeyRound className="w-4 h-4" /> WebAuthn Passkeys (Zero Raw Biometrics Stored)
              </h4>
              <button
                onClick={handleRegisterPasskey}
                className="px-3 py-1.5 rounded-lg bg-[#00f5d4] text-[#050811] font-bold cursor-pointer"
              >
                + Register Passkey
              </button>
            </div>
            <div className="space-y-2">
              {passkeys.map((pk) => (
                <div key={pk.id} className="p-3 rounded-lg bg-[#0b1120] border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">{pk.name}</div>
                    <div className="text-[11px] font-mono text-slate-400">Created: {pk.created} · Last used: {pk.lastUsed}</div>
                  </div>
                  <button
                    onClick={() => {
                      setPasskeys((prev) => prev.filter((p) => p.id !== pk.id));
                      onNotify('Passkey ডিভাইস রিভোক করা হয়েছে।');
                    }}
                    className="text-rose-400 hover:underline cursor-pointer"
                  >
                    Revoke
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#050811] border border-slate-800 rounded-xl p-4 space-y-3">
            <h4 className="font-bold text-white">2FA, Session Management &amp; User Data Privacy</h4>
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#0b1120] border border-slate-800">
              <span>Two-Factor Authentication (TOTP + Backup Codes)</span>
              <button
                onClick={() => setTwoFactorEnabled((v) => !v)}
                className={`px-3 py-1 rounded font-mono font-bold cursor-pointer ${
                  twoFactorEnabled ? 'bg-[#00f5d4] text-[#050811]' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {twoFactorEnabled ? 'ENABLED' : 'DISABLED'}
              </button>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={() => onNotify('আপনার সম্পূর্ণ প্রোফাইল ও প্রজেক্ট ডাটা JSON আকারে এক্সপোর্ট প্রস্তুত হয়েছে।')}
                className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold cursor-pointer"
              >
                📥 Export Account Data (JSON)
              </button>
              <button
                onClick={() => onNotify('অন্যান্য সকল সেশন সফলভাবে লগআউট/রিভোক করা হয়েছে।')}
                className="px-3.5 py-2 rounded-lg bg-rose-950/60 hover:bg-rose-900/70 text-rose-200 border border-rose-800/50 font-semibold cursor-pointer"
              >
                Revoke Other Sessions
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

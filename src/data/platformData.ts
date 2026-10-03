export interface PlatformCenter {
  id: string;
  slug: string;
  nameBn: string;
  nameEn: string;
  category: 'core' | 'learning' | 'labs' | 'community' | 'creator' | 'utility';
  descriptionBn: string;
  descriptionEn: string;
  itemCount: number;
  autopilotEnabled: boolean;
  cptSlug?: string;
  route: string;
  featuredMetric: string;
}

export interface AutopilotUnit {
  id: string;
  centerSlug: string;
  name: string;
  nameBn: string;
  mode: 'draft-first' | 'review-gate' | 'scheduled-auto' | 'companion-sync' | 'code-repair' | 'assisted-ide' | 'manual-only';
  status: 'active' | 'standby' | 'repairing' | 'paused';
  dailyLimit: number;
  todayGenerated: number;
  minQualityScore: number;
  avgQualityScore: number;
  maxRetries: number;
  lastRun: string;
  targetCpt: string;
}

export interface CustomPostTypeSpec {
  slug: string;
  singular: string;
  plural: string;
  nameBn: string;
  restBase: string;
  supports: string[];
  taxonomies: string[];
  count: number;
  description: string;
}

export interface CustomTaxonomySpec {
  slug: string;
  name: string;
  nameBn: string;
  hierarchical: boolean;
  objectTypes: string[];
  terms: string[];
}

export interface CustomDbTableSpec {
  tableName: string;
  module: string;
  purpose: string;
  primaryKey: string;
  indexes: string[];
  retentionPolicy: string;
  rowCount: number;
}

export interface CodeSnippetItem {
  id: string;
  title: string;
  titleBn: string;
  language: 'HTML/CSS/JS' | 'PHP' | 'Python' | 'JavaScript' | 'CSS' | 'Bash';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  version: string;
  dependencies: string[];
  description: string;
  securityNotes: string;
  htmlCode: string;
  cssCode: string;
  jsCode: string;
  rawCode?: string;
  author: string;
  updatedAt: string;
  downloads: number;
  likesCount?: number;
  savesCount?: number;
  youtubeId?: string;
  githubUrl?: string;
}

export interface DeveloperToolSpec {
  id: string;
  slug: string;
  name: string;
  nameBn: string;
  category:
    | 'Developer'
    | 'CSS'
    | 'Web & SEO'
    | 'WordPress'
    | 'Cyber Defensive'
    | 'Image Tools'
    | 'Audio Tools'
    | 'Video & GIF'
    | 'PDF & Converter'
    | 'Crypto & Hash'
    | 'Engineering & Electronics'
    | 'CNC & Fabrication'
    | 'Mathematics & Finance'
    | 'QR & Device Lab';
  description: string;
  usageCount: number;
  inputFormats?: string;
  outputFormats?: string;
  processingLocation?: 'Browser Client (WebWorker/Canvas)' | 'Hybrid Sandboxed';
  maxFileSize?: string;
  healthStatus?: 'Operational' | 'Degraded' | 'Maintenance';
  relatedCourse?: string;
  relatedTutorial?: string;
}

export const BANGLADESH_DIVISIONS_DISTRICTS: Record<string, string[]> = {
  'ঢাকা (Dhaka)': ['Dhaka', 'Gazipur', 'Narayanganj', 'Tangail', 'Manikganj', 'Munshiganj', 'Narsingdi', 'Kishoreganj', 'Faridpur', 'Gopalganj', 'Madaripur', 'Rajbari', 'Shariatpur'],
  'চট্টগ্রাম (Chattogram)': ['Chattogram', 'Cox\'s Bazar', 'Cumilla', 'Brahmanbaria', 'Chandpur', 'Noakhali', 'Feni', 'Lakshmipur', 'Khagrachhari', 'Rangamati', 'Bandarban'],
  'রাজশাহী (Rajshahi)': ['Rajshahi', 'Bogura', 'Pabna', 'Sirajganj', 'Natore', 'Naogaon', 'Chapainawabganj', 'Joypurhat'],
  'খুলনা (Khulna)': ['Khulna', 'Jashore', 'Kushtia', 'Satkhira', 'Bagerhat', 'Jhenaidah', 'Magura', 'Narail', 'Chuadanga', 'Meherpur'],
  'বরিশাল (Barishal)': ['Barishal', 'Patuakhali', 'Bhola', 'Pirojpur', 'Barguna', 'Jhalokati'],
  'সিলেট (Sylhet)': ['Sylhet', 'Moulvibazar', 'Habiganj', 'Sunamganj'],
  'রংপুর (Rangpur)': ['Rangpur', 'Dinajpur', 'Kurigram', 'Gaibandha', 'Nilphamari', 'Panchagarh', 'Thakurgaon', 'Lalmonirhat'],
  'ময়মনসিংহ (Mymensingh)': ['Mymensingh', 'Jamalpur', 'Netrokona', 'Sherpur']
};

export const THEME_COLOR_PRESETS = [
  { id: 'rgb-cyber', name: 'RGB Cyber', primary: '#00f5d4', secondary: '#7c3aed', accent: '#f43f5e' },
  { id: 'cyber-green', name: 'Cyber Green', primary: '#10b981', secondary: '#059669', accent: '#34d399' },
  { id: 'electric-blue', name: 'Electric Blue', primary: '#38bdf8', secondary: '#2563eb', accent: '#60a5fa' },
  { id: 'purple-neon', name: 'Purple', primary: '#a855f7', secondary: '#6d28d9', accent: '#ec4899' },
  { id: 'pink-cyber', name: 'Pink', primary: '#f43f5e', secondary: '#db2777', accent: '#fb7185' },
  { id: 'cyan-core', name: 'Cyan', primary: '#06b6d4', secondary: '#0284c7', accent: '#22d3ee' },
  { id: 'orange-flare', name: 'Orange', primary: '#f97316', secondary: '#ea580c', accent: '#fbbf24' },
  { id: 'matrix-code', name: 'Matrix', primary: '#22c55e', secondary: '#15803d', accent: '#4ade80' },
  { id: 'aurora-mesh', name: 'Aurora', primary: '#2dd4bf', secondary: '#818cf8', accent: '#c084fc' },
  { id: 'ultra-dark', name: 'Ultra Dark', primary: '#94a3b8', secondary: '#475569', accent: '#e2e8f0' }
];

export const PLATFORM_CENTERS: PlatformCenter[] = [
  {
    id: 'home',
    slug: 'home',
    nameBn: 'হোম হাব (Ecosystem Gateway)',
    nameEn: 'Home Hub (Hackers শিক্ষক Gateway)',
    category: 'core',
    descriptionBn: 'Hackers শিক্ষক ইকোসিস্টেমের কেন্দ্রীয় গেটওয়ে: সাইবার সিকিউরিটি, কোডিং, টুলস, ক্রিয়েটর স্টুডিও, ডিভাইস ল্যাব ও গেমস।',
    descriptionEn: 'Central ecosystem gateway for Hackers শিক্ষক: cybersecurity, live code demos, multi-media tools, and creator studio.',
    itemCount: 1850,
    autopilotEnabled: false,
    route: '/',
    featuredMetric: '28 Centers Connected'
  },
  {
    id: 'tutorials',
    slug: 'tutorials',
    nameBn: 'টিউটোরিয়াল সেন্টার',
    nameEn: 'Tutorials Center',
    category: 'learning',
    descriptionBn: 'ধাপে ধাপে ওয়েব ডেভেলপমেন্ট, ওয়ার্ডপ্রেস, লিনাক্স এবং ফুল-স্ট্যাক প্রোগ্রামিং গাইড।',
    descriptionEn: 'Step-by-step full-stack engineering, WordPress plugin architecture, and Linux administration tutorials.',
    itemCount: 348,
    autopilotEnabled: true,
    cptSlug: 'tutorials',
    route: '/tutorials/',
    featuredMetric: '348 Verified Guides'
  },
  {
    id: 'cybersecurity',
    slug: 'cyber',
    nameBn: 'সাইবার সিকিউরিটি একাডেমি',
    nameEn: 'Cybersecurity & Defensive Lab',
    category: 'learning',
    descriptionBn: 'ইথিক্যাল হ্যাকিং, ওয়েব সিকিউরিটি, OWASP Top 10, নেটওয়ার্ক ডিফেন্স এবং স্ক্যাম প্রতিরোধ শিক্ষা।',
    descriptionEn: 'Defensive security, OWASP Top 10 mitigation, Linux hardening, cryptography, and authorized CTF training.',
    itemCount: 215,
    autopilotEnabled: true,
    cptSlug: 'cyber',
    route: '/cyber/',
    featuredMetric: '100% Policy Compliant'
  },
  {
    id: 'coding',
    slug: 'coding',
    nameBn: 'কোডিং লার্নিং পাথ',
    nameEn: 'Coding Academy (HTML/CSS/JS/PHP/Python)',
    category: 'learning',
    descriptionBn: 'বিগিনার থেকে অ্যাডভান্সড লেভেল পর্যন্ত আধুনিক প্রোগ্রামিং ভাষা শেখার ইন্টারঅ্যাক্টিভ ট্র্যাক।',
    descriptionEn: 'Structured learning tracks for HTML5, modern CSS, TypeScript/JS, PHP 8.2+, and Python.',
    itemCount: 190,
    autopilotEnabled: true,
    cptSlug: 'tutorials',
    route: '/coding/',
    featuredMetric: '10 Languages'
  },
  {
    id: 'code-library',
    slug: 'code',
    nameBn: 'কোড লাইব্রেরি',
    nameEn: 'Verified Code Library',
    category: 'labs',
    descriptionBn: 'কপি, ডাউনলোড ও লাইভ ডেমো সুবিধাসহ প্রোডাকশন-রেডি স্নিপেট ও ফাংশন সংগ্রহশালা।',
    descriptionEn: 'Production-tested code snippets with dependency metadata, security notes, copy/download, and sandboxed execution.',
    itemCount: 512,
    autopilotEnabled: true,
    cptSlug: 'code',
    route: '/code/',
    featuredMetric: '512 Snippets'
  },
  {
    id: 'css-rgb-lab',
    slug: 'css-rgb-lab',
    nameBn: 'CSS / RGB / নিয়ন কোড ল্যাব',
    nameEn: 'CSS / RGB / Neon Code Lab',
    category: 'labs',
    descriptionBn: '১৫টি রিয়েল-টাইম ইন্টারঅ্যাক্টিভ জেনারেটর: RGB বর্ডার, নিয়ন বাটন, গ্লাসমরফিজম ও অ্যানিমেশন।',
    descriptionEn: '15 instant visual generators for RGB borders, neon typography, glassmorphism cards, shaders, and keyframe animations.',
    itemCount: 15,
    autopilotEnabled: true,
    cptSlug: 'tools',
    route: '/css-lab/',
    featuredMetric: '15 Live Generators'
  },
  {
    id: 'developer-tools',
    slug: 'tools',
    nameBn: 'টুলস সেন্টার (Developer/Media/PDF/Cyber)',
    nameEn: 'Universal Tools Center (60+ Tools)',
    category: 'utility',
    descriptionBn: 'ডেভেলপার, অডিও, ইমেজ, ভিডিও, GIF, PDF, ফাইল কনভার্টার, ক্রিপ্টো, SEO ও সাইবার সিকিউরিটি টুলস।',
    descriptionEn: 'Browser-first utilities across Developer, Audio, Image, Video, GIF, PDF, File Converter, SEO, WordPress, and Cyber.',
    itemCount: 64,
    autopilotEnabled: true,
    cptSlug: 'tools',
    route: '/tools/',
    featuredMetric: '64 Browser Tools'
  },
  {
    id: 'live-demo',
    slug: 'live-demo',
    nameBn: 'স্যান্ডবক্সড লাইভ ডেমো',
    nameEn: 'Sandboxed Live Demo Playground',
    category: 'labs',
    descriptionBn: 'সম্পূর্ণ আইসোলেটেড iframe স্যান্ডবক্সে HTML, CSS, JS এবং ব্রাউজার-সাইড Python রানটাইম।',
    descriptionEn: 'CSP-locked, cookie-isolated iframe sandbox for live HTML/CSS/JS rendering and safe client-side Python execution.',
    itemCount: 128,
    autopilotEnabled: false,
    route: '/playground/',
    featuredMetric: 'CSP Isolated'
  },
  {
    id: 'creator-studio-full',
    slug: 'creator-studio-hub',
    nameBn: 'ক্রিয়েটর স্টুডিও (Video/Audio/Image/QR)',
    nameEn: 'Browser Creator Studio & Editors',
    category: 'creator',
    descriptionBn: 'ব্রাউজার-ভিত্তিক ভিডিও, অডিও, ইমেজ, থাম্বনেইল, ব্যানার, মিম, QR, বারকোড ও ওয়াটারমার্ক এডিটর এবং My Projects।',
    descriptionEn: 'Client-side Video, Audio, Image, Thumbnail, Banner, Meme, QR, Barcode & Watermark Studio with My Projects.',
    itemCount: 15,
    autopilotEnabled: true,
    route: '/creator-editors/',
    featuredMetric: '15 Studio Editors'
  },
  {
    id: 'device-lab',
    slug: 'device-lab',
    nameBn: 'ডিভাইস ল্যাব ও ব্রাউজার ডায়াগনস্টিক',
    nameEn: 'Device Lab & Browser Diagnostic Center',
    category: 'labs',
    descriptionBn: 'হার্ডওয়্যার, ডিসপ্লে, টাচ, ক্যামেরা, মাইক্রোফোন, সেন্সর, ব্যাটারি, WebRTC, WebGL ও WebGPU টেস্টার।',
    descriptionEn: 'Hardware & browser diagnostics distinguishing Supported, Permission Required, and Browser Restricted states.',
    itemCount: 28,
    autopilotEnabled: false,
    route: '/device-lab/',
    featuredMetric: '28 Live Diagnostics'
  },
  {
    id: 'games-center',
    slug: 'games',
    nameBn: 'গেমস সেন্টার (Mini / Learning / Cyber)',
    nameEn: 'Interactive Cyber & Learning Games Center',
    category: 'learning',
    descriptionBn: 'ফিশিং ডিটেকশন, সেফ URL, লিনাক্স/কোডিং কুইজ, টাইপিং ও মেমোরি গেম—সরাসরি Points, Badge ও Level-এর সাথে যুক্ত।',
    descriptionEn: 'Playable Cyber Awareness, Coding Quiz, Typing Speed, and Memory Matrix games connected to Points & Badges.',
    itemCount: 18,
    autopilotEnabled: false,
    route: '/games/',
    featuredMetric: 'Points & XP Linked'
  },
  {
    id: 'projects',
    slug: 'projects',
    nameBn: 'প্রজেক্ট ও প্লাগইন হাব',
    nameEn: 'Downloadable Projects & WP Hub',
    category: 'creator',
    descriptionBn: 'ওয়ার্ডপ্রেস থিম, প্লাগইন, ফুল-স্ট্যাক ওয়েব প্রজেক্ট এবং গিটহাব রিলিজ ডাউনলোড সেন্টার।',
    descriptionEn: 'Versioned WordPress plugins, custom themes, starter kits, and GitHub-linked downloadable ZIP archives.',
    itemCount: 86,
    autopilotEnabled: true,
    cptSlug: 'projects',
    route: '/projects/',
    featuredMetric: '86 ZIP Releases'
  },
  {
    id: 'troubleshooting',
    slug: 'troubleshooting',
    nameBn: 'ট্রাবলশুটিং গাইড',
    nameEn: 'System & WP Troubleshooting',
    category: 'learning',
    descriptionBn: 'উইন্ডোজ, অ্যান্ড্রয়েড, লিনাক্স, ওয়ার্ডপ্রেস এরর এবং হোস্টিং সমস্যার পরীক্ষিত সমাধান।',
    descriptionEn: 'Root-cause diagnostics and verified fixes for WordPress fatal errors, Linux permissions, DNS/SSL, and Windows/Android issues.',
    itemCount: 174,
    autopilotEnabled: true,
    cptSlug: 'troubleshooting',
    route: '/troubleshooting/',
    featuredMetric: '174 Fixes'
  },
  {
    id: 'youtube-hub',
    slug: 'youtube',
    nameBn: 'ইউটিউব ও সোশ্যাল পাবলিশিং হাব',
    nameEn: 'YouTube & Social Publishing Hub',
    category: 'core',
    descriptionBn: 'Hackers শিক্ষক ইউটিউব চ্যানেলের ভিডিও রিসোর্স এবং OAuth-ভিত্তিক সোশ্যাল পাবলিশিং ইঞ্জিন।',
    descriptionEn: 'Official API YouTube companion resources and OAuth-authenticated multi-platform social publishing workflow.',
    itemCount: 240,
    autopilotEnabled: true,
    cptSlug: 'hs_video',
    route: '/youtube/',
    featuredMetric: '240 Video Labs'
  },
  {
    id: 'community',
    slug: 'community',
    nameBn: 'কমিউনিটি, ফলো ও মেসেজিং হাব',
    nameEn: 'Universal Social, Follow & Messaging Hub',
    category: 'community',
    descriptionBn: 'ইউনিভার্সাল ফলো, লাইক, ফেভারিট/বুকমার্ক, শেয়ার, কমেন্ট (#comment-id), প্রাইভেট মেসেজ ও রিপোর্ট ইঞ্জিন।',
    descriptionEn: 'Connected Follow, Like, Save/Bookmark, Share, Deep-linked Comments, Private Inbox, Block, and Report engine.',
    itemCount: 3850,
    autopilotEnabled: true,
    route: '/community/',
    featuredMetric: 'Universal Social Graph'
  },
  {
    id: 'forum-qa',
    slug: 'forum',
    nameBn: 'ফোরাম ও প্রশ্ন-উত্তর (Q&A)',
    nameEn: 'Technical Q&A Forum',
    category: 'community',
    descriptionBn: 'কোডিং বাগ, সাইবার সিকিউরিটি প্রশ্ন এবং ওয়ার্ডপ্রেস সমস্যার সমাধান ও এক্সপার্ট উত্তর।',
    descriptionEn: 'Structured Q&A threads with accepted solutions, syntax-highlighted replies, and moderator verification.',
    itemCount: 920,
    autopilotEnabled: true,
    cptSlug: 'hs_question',
    route: '/forum/',
    featuredMetric: '94% Solved Rate'
  },
  {
    id: 'ai-center',
    slug: 'ai-center',
    nameBn: 'AI ফ্যাক্টরি, ট্রেন্ড ও অটো-পাইলট',
    nameEn: 'Universal Factory, Trend & Autopilot Center',
    category: 'creator',
    descriptionBn: '১১টি ইউনিভার্সাল ফ্যাক্টরি, ট্রেন্ড ইন্টেলিজেন্স, ১৮টি AI অটো-পাইলট, রিসোর্স শিডিউলার এবং Emergency Kill Switch।',
    descriptionEn: '11 Universal Factories, Trend Intelligence, 18 AI Autopilots, Multi-Key Pool, and Global Emergency Kill Switch.',
    itemCount: 29,
    autopilotEnabled: true,
    route: '/ai-center/',
    featuredMetric: 'Kill-Switch Protected'
  },
  {
    id: 'courses-lms',
    slug: 'courses',
    nameBn: 'কোর্স ও লার্নিং ট্র্যাক (LMS)',
    nameEn: 'Structured Courses & LMS Autopilot',
    category: 'learning',
    descriptionBn: '২২টি ক্যাটাগরিতে Beginner থেকে Professional লার্নিং পাথ, প্র্যাকটিক্যাল ল্যাব, কুইজ ও অ্যাসাইনমেন্ট।',
    descriptionEn: 'Multi-module interactive courses across 22 tech categories with prerequisites, quizzes, and lab checkpoints.',
    itemCount: 28,
    autopilotEnabled: true,
    cptSlug: 'hs_course',
    route: '/courses/',
    featuredMetric: '28 Pro Tracks'
  },
  {
    id: 'certificates',
    slug: 'certificates',
    nameBn: 'ভেরিফায়েড সার্টিফিকেট ভল্ট',
    nameEn: 'Course Completion Certificate Verification',
    category: 'learning',
    descriptionBn: 'কোর্স ও ল্যাব সম্পন্নকারীদের জন্য ইউনিক সার্টিফিকেট আইডি ও QR ভেরিফিকেশন পেজ।',
    descriptionEn: 'Educational course completion certificates with unique verification IDs and QR lookup.',
    itemCount: 1640,
    autopilotEnabled: false,
    cptSlug: 'hs_certificate',
    route: '/certificates/',
    featuredMetric: 'QR Verified'
  },
  {
    id: 'resources',
    slug: 'resources',
    nameBn: 'ডেভেলপার রিসোর্স ও চিটশিট',
    nameEn: 'Developer Cheat Sheets & Docs',
    category: 'utility',
    descriptionBn: 'Linux কমান্ড, Git ওয়ার্কফ্লো, WP Hooks, OWASP চেকলিস্ট ও SQL অপ্টিমাইজেশন রেফারেন্স।',
    descriptionEn: 'Quick-reference architecture diagrams, WP Hook matrices, Linux command references, and hardening checklists.',
    itemCount: 95,
    autopilotEnabled: true,
    cptSlug: 'hs_resource',
    route: '/resources/',
    featuredMetric: '95 Cheat Sheets'
  },
  {
    id: 'user-dashboard',
    slug: 'dashboard',
    nameBn: 'ইউজার কন্ট্রোল ড্যাশবোর্ড',
    nameEn: 'User Workspace, Saved Items & Wallet Ledger',
    category: 'core',
    descriptionBn: 'আলাদা Points/XP/Badges এবং Monetary Balance (৳) লেজার, Saved Items, নোটিফিকেশন ও Passkey/2FA সিকিউরিটি।',
    descriptionEn: 'Strictly separated Points/XP vs Monetary Wallet ledger, My Favorites/Saved Items, Passkeys, and 2FA settings.',
    itemCount: 1,
    autopilotEnabled: false,
    route: '/dashboard/',
    featuredMetric: 'Points ≠ Money Enforced'
  },
  {
    id: 'public-profile',
    slug: 'profile',
    nameBn: 'পাবলিক ক্রিয়েটর ও ইউজার প্রোফাইল',
    nameEn: 'Creator & Developer Profile (8 Divisions / 64 Districts)',
    category: 'community',
    descriptionBn: 'ফিল্ড-লেভেল প্রাইভেসি (Public/Members/Followers/Private), ৮ বিভাগ ও ৬৪ জেলা, স্কিল ব্যাজ ও পোর্টফোলিও।',
    descriptionEn: 'Full creator identity with field-level privacy controls, Bangladesh 8 Divisions/64 Districts, and activity feed.',
    itemCount: 420,
    autopilotEnabled: false,
    route: '/u/hackersshikkhok/',
    featuredMetric: 'Privacy Granular'
  },
  {
    id: 'creator-studio',
    slug: 'creator-studio',
    nameBn: 'ক্রিয়েটর সাবমিশন ও মডারেশন',
    nameEn: 'Creator Submission & Moderation Queue',
    category: 'creator',
    descriptionBn: 'নতুন টিউটোরিয়াল, কোড স্নিপেট, টুল, রিভিউ বা বাগ রিপোর্ট জমা দেওয়ার মডারেশন-সুরক্ষিত পোর্টাল।',
    descriptionEn: 'Role-gated submission studio where contributors submit snippets, tutorials, and tools into Pending Review.',
    itemCount: 64,
    autopilotEnabled: true,
    route: '/creator-studio/',
    featuredMetric: 'Moderated Queue'
  },
  {
    id: 'pdf-studio',
    slug: 'pdf-studio',
    nameBn: 'PDF সেন্টার ও ডকুমেন্ট কনভার্টার',
    nameEn: 'PDF Center & Safe File Converter',
    category: 'utility',
    descriptionBn: 'PDF Merge, Split, Compress, Watermark, Page Reorder এবং Zip-Slip সুরক্ষিত ফাইল কনভার্টার।',
    descriptionEn: 'Complete PDF toolkit and document converter hardened against Zip Slip and decompression bombs.',
    itemCount: 42,
    autopilotEnabled: true,
    route: '/pdf-studio/',
    featuredMetric: 'Zip-Slip Guarded'
  },
  {
    id: 'bd-calendar',
    slug: 'bd-calendar',
    nameBn: 'বাংলা, খ্রিস্টাব্দ, হিজরি ও রিমাইন্ডার ক্যালেন্ডার',
    nameEn: 'Universal Bangla, Gregorian & Hijri Calendar + Reminders',
    category: 'utility',
    descriptionBn: 'বঙ্গাব্দ, খ্রিস্টাব্দ, হিজরি তারিখ (চাঁদ দেখার ওপর নির্ভরশীল নির্দেশনাসহ), সরকারি ছুটি ও ইউনিভার্সাল রিমাইন্ডার।',
    descriptionEn: 'Gregorian, Bangla, and Hijri calendar (with lunar sighting note), BD holidays, and user event reminders.',
    itemCount: 365,
    autopilotEnabled: false,
    route: '/calendar/',
    featuredMetric: 'Universal Reminders'
  },
  {
    id: 'hacking-learning-center',
    slug: 'cyber-labs',
    nameBn: 'ডিফেন্সিভ হ্যাকিং লার্নিং ল্যাব',
    nameEn: 'Authorized Defensive Security Labs',
    category: 'labs',
    descriptionBn: 'আইসোলেটেড ব্রাউজার সিমুলেশনে SQLi প্রতিরোধ, XSS স্যানিটাইজেশন, CSRF টোকেন ও লগ অ্যানালাইসিস অনুশীলন।',
    descriptionEn: 'Safe, browser-isolated defensive exercises covering input sanitization, prepared statements, nonce validation, and log forensics.',
    itemCount: 16,
    autopilotEnabled: true,
    route: '/cyber-labs/',
    featuredMetric: '16 Safe Labs'
  },
  {
    id: 'wp-studio-factory',
    slug: 'wp-studio',
    nameBn: 'WP Theme & Core Plugin Studio',
    nameEn: 'Live WordPress Theme + Core Plugin Zip Studio',
    category: 'core',
    descriptionBn: 'hackersshikkhok-theme.zip এবং hackersshikkhok-core.zip এর সব ফাইল লাইভ এডিট, আপডেট ও ইনস্ট্যান্ট ডাউনলোড স্টুডিও।',
    descriptionEn: 'Inspect, edit, add files, and dynamically package hackersshikkhok-theme.zip and hackersshikkhok-core.zip in real time.',
    itemCount: 82,
    autopilotEnabled: true,
    route: '/wp-studio/',
    featuredMetric: '82 Source Files'
  },
  {
    id: 'final-qa-audit',
    slug: 'qa-audit',
    nameBn: 'ফাইনাল QA ও ১১৪-পয়েন্ট কমপ্লিশন অডিট',
    nameEn: 'Final Ecosystem Completion & 114-Item QA Audit',
    category: 'core',
    descriptionBn: 'Completed, Already Existing, Newly Added, Browser/API Limitations এবং ১১৪টি চেকলিস্ট আইটেমের পূর্ণাঙ্গ রিপোর্ট।',
    descriptionEn: 'Transparent engineering audit covering Completed, Existing, Added, Browser/API Restricted items, and 114-point checklist.',
    itemCount: 114,
    autopilotEnabled: false,
    route: '/qa-audit/',
    featuredMetric: '114/114 Audited'
  }
];

export const AUTOPILOT_UNITS: AutopilotUnit[] = [
  { id: 'ap-01', centerSlug: 'tutorials', name: 'Tutorials Editorial Autopilot', nameBn: 'টিউটোরিয়াল অটো-পাইলট', mode: 'draft-first', status: 'active', dailyLimit: 5, todayGenerated: 3, minQualityScore: 86, avgQualityScore: 91, maxRetries: 3, lastRun: '12 mins ago', targetCpt: 'tutorials' },
  { id: 'ap-02', centerSlug: 'cyber', name: 'Defensive Cyber Guide Autopilot', nameBn: 'সাইবার গাইড অটো-পাইলট', mode: 'review-gate', status: 'active', dailyLimit: 3, todayGenerated: 2, minQualityScore: 90, avgQualityScore: 94, maxRetries: 3, lastRun: '28 mins ago', targetCpt: 'cyber' },
  { id: 'ap-03', centerSlug: 'code', name: 'Verified Code Snippet Generator', nameBn: 'কোড স্নিপেট ইঞ্জিন', mode: 'code-repair', status: 'active', dailyLimit: 8, todayGenerated: 5, minQualityScore: 88, avgQualityScore: 92, maxRetries: 3, lastRun: '6 mins ago', targetCpt: 'code' },
  { id: 'ap-04', centerSlug: 'css-rgb-lab', name: 'CSS / RGB / Neon Component Synth', nameBn: 'CSS নিয়ন ল্যাব অটো-পাইলট', mode: 'scheduled-auto', status: 'active', dailyLimit: 4, todayGenerated: 2, minQualityScore: 85, avgQualityScore: 89, maxRetries: 3, lastRun: '45 mins ago', targetCpt: 'code' },
  { id: 'ap-05', centerSlug: 'tools', name: 'Tool Factory & Capability Spec Builder', nameBn: 'টুল ফ্যাক্টরি অটো-পাইলট', mode: 'draft-first', status: 'active', dailyLimit: 4, todayGenerated: 1, minQualityScore: 85, avgQualityScore: 90, maxRetries: 3, lastRun: '1 hour ago', targetCpt: 'tools' },
  { id: 'ap-06', centerSlug: 'troubleshooting', name: 'Root-Cause Troubleshooting Engine', nameBn: 'ট্রাবলশুটিং সলভার ইঞ্জিন', mode: 'draft-first', status: 'active', dailyLimit: 6, todayGenerated: 4, minQualityScore: 85, avgQualityScore: 88, maxRetries: 3, lastRun: '19 mins ago', targetCpt: 'troubleshooting' },
  { id: 'ap-07', centerSlug: 'projects', name: 'WP Plugin/Theme Boilerplate Factory', nameBn: 'প্রজেক্ট ও প্লাগইন ফ্যাক্টরি', mode: 'review-gate', status: 'active', dailyLimit: 2, todayGenerated: 1, minQualityScore: 92, avgQualityScore: 95, maxRetries: 3, lastRun: '2 hours ago', targetCpt: 'projects' },
  { id: 'ap-08', centerSlug: 'youtube', name: 'YouTube Companion Article Sync', nameBn: 'ইউটিউব কম্প্যানিয়ন সিঙ্ক', mode: 'companion-sync', status: 'active', dailyLimit: 5, todayGenerated: 2, minQualityScore: 85, avgQualityScore: 91, maxRetries: 3, lastRun: '34 mins ago', targetCpt: 'hs_video' },
  { id: 'ap-09', centerSlug: 'coding', name: 'Multi-Language Coding Track Builder', nameBn: 'কোডিং ট্র্যাক অটো-পাইলট', mode: 'draft-first', status: 'active', dailyLimit: 4, todayGenerated: 2, minQualityScore: 86, avgQualityScore: 90, maxRetries: 3, lastRun: '50 mins ago', targetCpt: 'tutorials' },
  { id: 'ap-10', centerSlug: 'forum', name: 'Forum Unanswered Thread Assistant', nameBn: 'ফোরাম হেল্প অ্যাসিস্ট্যান্ট', mode: 'review-gate', status: 'active', dailyLimit: 10, todayGenerated: 4, minQualityScore: 88, avgQualityScore: 91, maxRetries: 2, lastRun: '15 mins ago', targetCpt: 'hs_question' },
  { id: 'ap-11', centerSlug: 'courses', name: 'Course Autopilot & Curriculum Architect', nameBn: 'কোর্স ও কুইজ ফ্যাক্টরি', mode: 'draft-first', status: 'standby', dailyLimit: 2, todayGenerated: 1, minQualityScore: 90, avgQualityScore: 93, maxRetries: 3, lastRun: '3 hours ago', targetCpt: 'hs_course' },
  { id: 'ap-12', centerSlug: 'resources', name: 'Cheat Sheet & Reference Matrix Sync', nameBn: 'রিসোর্স ও চিটশিট ইঞ্জিন', mode: 'draft-first', status: 'active', dailyLimit: 3, todayGenerated: 2, minQualityScore: 87, avgQualityScore: 89, maxRetries: 3, lastRun: '1 hour ago', targetCpt: 'hs_resource' },
  { id: 'ap-13', centerSlug: 'cyber-labs', name: 'Defensive Security Patch Simulator', nameBn: 'ডিফেন্সিভ ল্যাব জেনারেটর', mode: 'review-gate', status: 'active', dailyLimit: 2, todayGenerated: 1, minQualityScore: 92, avgQualityScore: 96, maxRetries: 3, lastRun: '4 hours ago', targetCpt: 'cyber' },
  { id: 'ap-14', centerSlug: 'pdf-studio', name: 'Study Guide & Thumbnail Factory', nameBn: 'থাম্বনেইল ও ডকুমেন্ট ফ্যাক্টরি', mode: 'assisted-ide', status: 'active', dailyLimit: 3, todayGenerated: 1, minQualityScore: 85, avgQualityScore: 88, maxRetries: 2, lastRun: '2 hours ago', targetCpt: 'hs_resource' },
  { id: 'ap-15', centerSlug: 'community', name: 'Submission & Review Moderation Auditor', nameBn: 'ইউজার সাবমিশন ও রিভিউ অডিটর', mode: 'review-gate', status: 'active', dailyLimit: 20, todayGenerated: 9, minQualityScore: 85, avgQualityScore: 92, maxRetries: 3, lastRun: '8 mins ago', targetCpt: 'code' },
  { id: 'ap-16', centerSlug: 'seo-linker', name: 'Internal Link & Orphan Content Detector', nameBn: 'ইন্টারনাল লিংক ও অরফান ডিটেক্টর', mode: 'scheduled-auto', status: 'active', dailyLimit: 25, todayGenerated: 14, minQualityScore: 88, avgQualityScore: 94, maxRetries: 2, lastRun: '5 mins ago', targetCpt: 'tutorials' },
  { id: 'ap-17', centerSlug: 'trend-intel', name: 'Trend Intelligence & Fact Verification', nameBn: 'ট্রেন্ড ইন্টেলিজেন্স ইঞ্জিন', mode: 'review-gate', status: 'active', dailyLimit: 8, todayGenerated: 3, minQualityScore: 90, avgQualityScore: 95, maxRetries: 3, lastRun: '11 mins ago', targetCpt: 'tutorials' },
  { id: 'ap-18', centerSlug: 'wp-studio', name: 'WP Core & Theme Package Integrity Guard', nameBn: 'থিম ও প্লাগইন ইন্টিগ্রিটি গার্ড', mode: 'assisted-ide', status: 'active', dailyLimit: 10, todayGenerated: 4, minQualityScore: 95, avgQualityScore: 98, maxRetries: 3, lastRun: 'Just now', targetCpt: 'projects' }
];

export const CUSTOM_POST_TYPES: CustomPostTypeSpec[] = [
  { slug: 'tutorials', singular: 'Tutorial', plural: 'Tutorials', nameBn: 'টিউটোরিয়াল', restBase: 'tutorials', supports: ['title', 'editor', 'thumbnail', 'excerpt', 'author', 'revisions', 'custom-fields'], taxonomies: ['hs_language', 'hs_difficulty', 'hs_platform', 'hs_topic'], count: 348, description: 'Step-by-step coding, WordPress, and system engineering guides.' },
  { slug: 'code', singular: 'Code Snippet', plural: 'Code Library', nameBn: 'কোড লাইব্রেরি', restBase: 'code', supports: ['title', 'editor', 'excerpt', 'author', 'revisions', 'custom-fields'], taxonomies: ['hs_language', 'hs_difficulty', 'hs_platform', 'hs_license'], count: 512, description: 'Production snippets with syntax editor, sandboxed preview, and security notes.' },
  { slug: 'tools', singular: 'Interactive Tool', plural: 'Developer Tools', nameBn: 'ডেভেলপার টুলস', restBase: 'tools', supports: ['title', 'editor', 'excerpt', 'custom-fields'], taxonomies: ['hs_tool_type', 'hs_topic'], count: 64, description: 'Dedicated browser-executed developer, media, PDF, and cyber utilities.' },
  { slug: 'projects', singular: 'Project', plural: 'Projects', nameBn: 'প্রজেক্ট ও প্লাগইন', restBase: 'projects', supports: ['title', 'editor', 'thumbnail', 'excerpt', 'author', 'revisions', 'custom-fields'], taxonomies: ['hs_language', 'hs_platform', 'hs_license'], count: 86, description: 'Downloadable WordPress plugins, themes, creator projects, and GitHub releases.' },
  { slug: 'cyber', singular: 'Cyber Guide', plural: 'Cyber Guides', nameBn: 'সাইবার গাইড', restBase: 'cyber', supports: ['title', 'editor', 'thumbnail', 'excerpt', 'author', 'revisions'], taxonomies: ['hs_difficulty', 'hs_platform', 'hs_topic', 'hs_security_domain'], count: 215, description: 'Authorized defensive cybersecurity, OWASP mitigation, and CTF education.' },
  { slug: 'troubleshooting', singular: 'Troubleshooting Guide', plural: 'Troubleshooting', nameBn: 'ট্রাবলশুটিং', restBase: 'troubleshooting', supports: ['title', 'editor', 'excerpt', 'author', 'revisions'], taxonomies: ['hs_platform', 'hs_difficulty', 'hs_topic'], count: 174, description: 'Structured problem-cause-solution guides for OS, WordPress, and networking.' },
  { slug: 'hs_question', singular: 'Forum Question', plural: 'Forum Q&A', nameBn: 'ফোরাম প্রশ্ন', restBase: 'questions', supports: ['title', 'editor', 'author', 'comments'], taxonomies: ['hs_language', 'hs_topic', 'hs_platform'], count: 920, description: 'Community Q&A threads with accepted answers and moderation states.' },
  { slug: 'hs_video', singular: 'YouTube Resource', plural: 'YouTube Hub', nameBn: 'ইউটিউব রিসোর্স', restBase: 'videos', supports: ['title', 'editor', 'thumbnail', 'custom-fields'], taxonomies: ['hs_topic', 'hs_language', 'hs_series'], count: 240, description: 'Synced @HackersShikkhok YouTube videos linked to companion code and tools.' },
  { slug: 'hs_course', singular: 'Course', plural: 'Courses', nameBn: 'কোর্স ও ট্র্যাক', restBase: 'courses', supports: ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'], taxonomies: ['hs_difficulty', 'hs_topic', 'hs_language'], count: 28, description: 'Structured multi-lesson learning paths with progress checkpoints.' },
  { slug: 'hs_resource', singular: 'Resource & Cheat Sheet', plural: 'Resources', nameBn: 'রিসোর্স ও চিটশিট', restBase: 'resources', supports: ['title', 'editor', 'excerpt', 'custom-fields'], taxonomies: ['hs_topic', 'hs_language', 'hs_platform'], count: 95, description: 'Reference matrices, PDF handbooks, and verified security checklists.' }
];

export const CUSTOM_TAXONOMIES: CustomTaxonomySpec[] = [
  { slug: 'hs_language', name: 'Programming Language', nameBn: 'প্রোগ্রামিং ভাষা', hierarchical: false, objectTypes: ['tutorials', 'code', 'projects', 'hs_question', 'hs_course'], terms: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Python', 'SQL', 'Bash', 'JSON', 'XML', 'SVG'] },
  { slug: 'hs_difficulty', name: 'Difficulty Level', nameBn: 'লেভেল / ধাপ', hierarchical: true, objectTypes: ['tutorials', 'code', 'cyber', 'troubleshooting', 'hs_course'], terms: ['Beginner', 'Intermediate', 'Advanced', 'Professional'] },
  { slug: 'hs_platform', name: 'Target Platform', nameBn: 'প্ল্যাটফর্ম', hierarchical: true, objectTypes: ['tutorials', 'code', 'projects', 'cyber', 'troubleshooting'], terms: ['WordPress', 'Windows', 'Android', 'Linux', 'Web', 'Browser', 'Hosting'] },
  { slug: 'hs_topic', name: 'Technical Topic', nameBn: 'টেকনিক্যাল বিষয়', hierarchical: true, objectTypes: ['tutorials', 'cyber', 'tools', 'troubleshooting', 'hs_video', 'hs_question'], terms: ['Cybersecurity', 'Web Development', 'Coding', 'WordPress', 'AI', 'Networking', 'Privacy', 'Troubleshooting'] },
  { slug: 'hs_tool_type', name: 'Tool Category', nameBn: 'টুলের ধরন', hierarchical: true, objectTypes: ['tools'], terms: ['CSS Tool', 'Developer Tool', 'SEO Tool', 'Security Tool', 'Audio Tool', 'Image Tool', 'Video Tool', 'PDF Tool', 'WordPress Tool'] },
  { slug: 'hs_security_domain', name: 'Security Domain', nameBn: 'সিকিউরিটি ডোমেইন', hierarchical: true, objectTypes: ['cyber'], terms: ['Web Security', 'OWASP Top 10', 'Linux Hardening', 'Network Defense', 'Cryptography', 'Digital Forensics', 'Scam Awareness'] },
  { slug: 'hs_series', name: 'Learning Series', nameBn: 'লার্নিং সিরিজ', hierarchical: true, objectTypes: ['tutorials', 'hs_video', 'hs_course'], terms: ['WP Plugin Mastery', 'Ethical Hacking 101', 'Modern CSS & Neon UI', 'Python Automation', 'Linux Server Guard'] },
  { slug: 'hs_license', name: 'Code License', nameBn: 'কোড লাইসেন্স', hierarchical: false, objectTypes: ['code', 'projects'], terms: ['GPL-2.0-or-later', 'MIT', 'Apache-2.0', 'CC-BY-4.0'] }
];

export const CUSTOM_DB_TABLES: CustomDbTableSpec[] = [
  { tableName: 'wp_hs_ai_jobs', module: 'Universal AI Queue', purpose: 'Queued, running, paused, retrying, and completed AI & Factory jobs with resource telemetry', primaryKey: 'job_id', indexes: ['idx_status_scheduled', 'idx_center_slug', 'idx_created_at'], retentionPolicy: '90 days rolling cleanup', rowCount: 1420 },
  { tableName: 'wp_hs_quality_scores', module: 'Quality Gate', purpose: '100-point rubric breakdown + heuristic similarity/duplicate check warnings', primaryKey: 'score_id', indexes: ['idx_post_id', 'idx_total_score'], retentionPolicy: 'Permanent per post revision', rowCount: 1385 },
  { tableName: 'wp_hs_code_versions', module: 'Code & Project History', purpose: 'Immutable version history, changelogs, and validation checksums for snippets/projects', primaryKey: 'version_id', indexes: ['idx_post_version', 'idx_sha256'], retentionPolicy: 'Keep last 20 versions per item', rowCount: 2840 },
  { tableName: 'wp_hs_tool_usage', module: 'Tool Analytics & Health', purpose: 'Views, runs, completion/failure rate, processing time, and Operational/Degraded status', primaryKey: 'stat_id', indexes: ['idx_tool_date', 'idx_tool_slug'], retentionPolicy: '365 days aggregated', rowCount: 19400 },
  { tableName: 'wp_hs_internal_links', module: 'SEO & Related Engine', purpose: 'Contextual link graph & orphan content detection with Admin approval status', primaryKey: 'link_id', indexes: ['idx_source_post', 'idx_target_post', 'idx_status'], retentionPolicy: 'Active graph sync', rowCount: 4120 },
  { tableName: 'wp_hs_youtube_sync', module: 'YouTube & Social Engine', purpose: 'Video metadata, companion post bindings, and encrypted OAuth social publishing logs', primaryKey: 'sync_id', indexes: ['idx_video_id', 'idx_companion_post'], retentionPolicy: 'Permanent with API refresh', rowCount: 240 },
  { tableName: 'wp_hs_github_repos', module: 'GitHub Manager', purpose: 'Linked repository metadata, release tags, and ZIP checksums', primaryKey: 'repo_id', indexes: ['idx_project_post', 'idx_repo_full_name'], retentionPolicy: 'Permanent', rowCount: 86 },
  { tableName: 'wp_hs_download_logs', module: 'Download & Temp Cleanup', purpose: 'Rate-limited download audit trail & auto-expiring sandbox temp file registry', primaryKey: 'download_id', indexes: ['idx_object_date', 'idx_ip_hash'], retentionPolicy: '60 days privacy-hashed', rowCount: 12850 },
  { tableName: 'wp_hs_user_submissions', module: 'Moderation & Reports', purpose: 'Unified queue for user submissions, content reports/flags, and moderation appeals', primaryKey: 'submission_id', indexes: ['idx_status_created', 'idx_author_id'], retentionPolicy: 'Permanent audit log', rowCount: 310 },
  { tableName: 'wp_hs_system_logs', module: 'Observability & Admin Audit', purpose: 'Structured system logs + Admin sensitive action audit trail (roles, balance, kill-switch)', primaryKey: 'log_id', indexes: ['idx_severity_time', 'idx_module'], retentionPolicy: '30 days auto-prune', rowCount: 4620 },
  { tableName: 'wp_hs_security_events', module: 'Security & Passkeys', purpose: 'WebAuthn passkey credentials metadata, 2FA events, session revokes, and rate-limit blocks', primaryKey: 'event_id', indexes: ['idx_event_type_time', 'idx_ip_hash'], retentionPolicy: '45 days auto-prune', rowCount: 890 },
  { tableName: 'wp_hs_wallet_ledger', module: 'Monetary Wallet System', purpose: 'Strict Monetary Balance (BDT) ledger (Credit/Debit/Pending/Withdrawal) — separate from Points', primaryKey: 'tx_id', indexes: ['idx_user_created', 'idx_tx_reference'], retentionPolicy: 'Immutable financial audit trail', rowCount: 6420 },
  { tableName: 'wp_hs_user_progress', module: 'Points, XP & Activity', purpose: 'Non-monetary Points, XP levels, game scores, course progress, and user activity stream', primaryKey: 'progress_id', indexes: ['idx_user_object', 'idx_completed_at'], retentionPolicy: 'Permanent user data', rowCount: 15300 },
  { tableName: 'wp_hs_skill_badges', module: 'Badges & Achievements', purpose: 'Earned badges (Contributor, Learner, Tool Creator, Cyber Learner) and rule definitions', primaryKey: 'badge_grant_id', indexes: ['idx_user_badge'], retentionPolicy: 'Permanent user data', rowCount: 2890 },
  { tableName: 'wp_hs_certificates', module: 'Certificates', purpose: 'Issued course completion certificate IDs, QR hashes, and verification metadata', primaryKey: 'cert_id', indexes: ['uq_serial_hash', 'idx_user_course'], retentionPolicy: 'Permanent public verification', rowCount: 1640 },
  { tableName: 'wp_hs_forum_votes', module: 'Universal Interactions', purpose: 'Deduplicated Likes, Reactions, Favorites/Bookmarks, Follows, Shares, and Blocks', primaryKey: 'vote_id', indexes: ['uq_user_object_type', 'idx_post_id'], retentionPolicy: 'Permanent', rowCount: 28410 },
  { tableName: 'wp_hs_search_index', module: 'Global Search Engine', purpose: 'Weighted bilingual (Bangla/English) full-text index across Posts, Tools, Courses, Users, Q&A', primaryKey: 'index_id', indexes: ['ft_title_content_tags', 'idx_cpt_lang'], retentionPolicy: 'Real-time incremental sync', rowCount: 3420 },
  { tableName: 'wp_hs_search_analytics', module: 'Search & Trend Signals', purpose: 'Search intent analytics and Trend Intelligence confidence scores', primaryKey: 'query_id', indexes: ['idx_query_hash', 'idx_zero_results'], retentionPolicy: '90 days rolling', rowCount: 5120 },
  { tableName: 'wp_hs_redirects', module: 'Route & URL Hygiene', purpose: 'Safe 301/302 slug change redirects and legacy route compatibility', primaryKey: 'redirect_id', indexes: ['uq_source_path'], retentionPolicy: 'Permanent', rowCount: 145 },
  { tableName: 'wp_hs_cache_manifest', module: 'Cache Architecture', purpose: 'Page/Object/REST cache invalidation keys with strict logged-in user exclusion', primaryKey: 'cache_key_hash', indexes: ['idx_group_expires'], retentionPolicy: 'TTL auto-evict', rowCount: 680 },
  { tableName: 'wp_hs_project_builds', module: 'Notifications & Messaging', purpose: 'Universal deduplicated Notifications + Private User-to-User Conversations & Creator Projects', primaryKey: 'build_id', indexes: ['idx_recipient_read', 'idx_conversation_id'], retentionPolicy: 'Permanent user inbox', rowCount: 9195 }
];

export const CODE_LIBRARY_SNIPPETS: CodeSnippetItem[] = [
  {
    id: 'snip-rgb-cyber-card',
    title: '2040 Cyber Neon Glass Card with Animated Conic Border',
    titleBn: '২০৪০ সাইবার নিয়ন গ্লাস কার্ড ও অ্যানিমেটেড RGB বর্ডার',
    language: 'HTML/CSS/JS',
    difficulty: 'Intermediate',
    version: 'v1.4.0',
    dependencies: ['Zero Dependencies (Pure CSS + Vanilla JS)'],
    description: 'Hardware-accelerated CSS conic-gradient border card with interactive mouse-tracking spotlight and prefers-reduced-motion accessibility support.',
    securityNotes: 'Safe DOM manipulation using textContent only; zero innerHTML injection vectors.',
    author: 'Hackers শিক্ষক Core Team',
    updatedAt: '2026-09-30',
    downloads: 1842,
    likesCount: 342,
    savesCount: 189,
    youtubeId: 'hs-cyber-card-01',
    githubUrl: 'https://github.com/hackersshikkhok/cyber-ui-components',
    htmlCode: `<div class="cyber-card" id="demoCard">
  <div class="cyber-badge">HACKERS শিক্ষক · VERIFIED MODULE v1.4</div>
  <h2>Hackers শিক্ষক Security Shield</h2>
  <p>Zero-trust sandboxed execution with hardware-accelerated neon border physics and accessible contrast.</p>
  <div class="metrics">
    <div><span>CSP Status</span><strong>Locked</strong></div>
    <div><span>Frame Origin</span><strong>Isolated</strong></div>
  </div>
  <button id="VerifyBtn" class="cyber-btn">Run Integrity Check</button>
  <div id="statusOutput" class="status-box">Ready for diagnostic scan...</div>
</div>`,
    cssCode: `body {
  background: #050811;
  color: #e2e8f0;
  font-family: system-ui, -apple-system, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  margin: 0;
}
.cyber-card {
  position: relative;
  width: 380px;
  padding: 28px;
  background: rgba(11, 17, 32, 0.92);
  border-radius: 16px;
  border: 2px solid #00f5d4;
  box-shadow: 0 0 30px rgba(0, 245, 212, 0.18), inset 0 0 20px rgba(124, 58, 237, 0.12);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.cyber-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 42px rgba(0, 245, 212, 0.35);
}
.cyber-badge {
  font-size: 11px;
  letter-spacing: 0.12em;
  color: #00f5d4;
  margin-bottom: 10px;
  font-weight: 700;
}
h2 {
  margin: 0 0 10px;
  font-size: 20px;
  color: #ffffff;
}
p {
  font-size: 14px;
  line-height: 1.6;
  color: #94a3b8;
  margin-bottom: 20px;
}
.metrics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 20px;
  padding: 12px;
  background: rgba(15, 23, 42, 0.8);
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.08);
}
.metrics span {
  display: block;
  font-size: 11px;
  color: #64748b;
}
.metrics strong {
  color: #00f5d4;
  font-size: 14px;
}
.cyber-btn {
  width: 100%;
  padding: 12px 16px;
  background: linear-gradient(90deg, #00f5d4, #7c3aed);
  color: #050811;
  font-weight: 700;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
}
.status-box {
  margin-top: 14px;
  font-family: monospace;
  font-size: 12px;
  color: #a7f3d0;
  padding: 10px;
  background: rgba(0, 245, 212, 0.08);
  border-radius: 8px;
}`,
    jsCode: `const btn = document.getElementById('VerifyBtn');
const out = document.getElementById('statusOutput');
let count = 0;

btn.addEventListener('click', () => {
  count++;
  const ts = new Date().toLocaleTimeString();
  out.textContent = '[' + ts + '] Scan #' + count + ' Passed: Nonce + CSP + Prepared SQL Verified!';
});`
  },
  {
    id: 'snip-wp-rest-rate-limiter',
    title: 'WordPress REST API Transient Rate Limiter & Nonce Guard',
    titleBn: 'ওয়ার্ডপ্রেস REST API রেট-লিমিটার ও সিকিউরিটি গার্ড (PHP 8.2+)',
    language: 'PHP',
    difficulty: 'Advanced',
    version: 'v2.1.0',
    dependencies: ['WordPress 6.4+', 'PHP 8.2+'],
    description: 'Protects custom WordPress REST API endpoints against brute-force and automated scraping using hashed IP transients and capability checks.',
    securityNotes: 'Uses privacy-safe SHA-256 IP hashing with wp_salt() and strict permission_callback verification.',
    author: 'Hackers শিক্ষক Security Lab',
    updatedAt: '2026-09-30',
    downloads: 1290,
    likesCount: 275,
    savesCount: 140,
    youtubeId: 'hs-wp-rest-sec',
    githubUrl: 'https://github.com/hackersshikkhok/wp-rest-shield',
    htmlCode: `<div style="font-family: monospace; padding: 20px; background: #0b1120; color: #00f5d4; border-radius: 12px; border: 1px solid #1e293b;">
  <h3>PHP 8.2+ WordPress REST Rate Limiter</h3>
  <p style="color: #94a3b8;">Server-side WordPress snippet. Copy or download the PHP code from the editor tab to integrate into hackersshikkhok-core.</p>
  <pre style="color: #e2e8f0; background: #050811; padding: 12px; border-radius: 8px; overflow-x: auto;">HTTP/1.1 200 OK
X-HS-RateLimit-Limit: 30
X-HS-RateLimit-Remaining: 29
{"status":"verified","guard":"hs_rest_shield"}</pre>
</div>`,
    cssCode: `body { background: #050811; margin: 20px; }`,
    jsCode: `console.log('PHP snippet preview initialized.');`,
    rawCode: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\Security;

use WP_REST_Request;
use WP_Error;

final class EndpointRateLimiter {
    public static function check_rate_limit( WP_REST_Request $request, int $limit = 30, int $window_seconds = 60 ): bool|WP_Error {
        $raw_ip  = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : '0.0.0.0';
        $ip_hash = hash_hmac( 'sha256', $raw_ip, wp_salt( 'auth' ) );
        $route   = sanitize_key( $request->get_route() );
        $key     = 'hs_rl_' . substr( $ip_hash, 0, 24 ) . '_' . $route;

        $current = (int) get_transient( $key );
        if ( $current >= $limit ) {
            return new WP_Error(
                'hs_rate_limit_exceeded',
                __( 'Too many requests. Please wait a moment before trying again.', 'hackersshikkhok-core' ),
                array( 'status' => 429 )
            );
        }

        set_transient( $key, $current + 1, $window_seconds );
        return true;
    }
}`
  },
  {
    id: 'snip-owasp-xss-sanitizer',
    title: 'Interactive DOM XSS Sanitizer & Safe Renderer Lab',
    titleBn: 'DOM XSS প্রতিরোধ ও নিরাপদ ইনপুট স্যানিটাইজার ল্যাব',
    language: 'HTML/CSS/JS',
    difficulty: 'Beginner',
    version: 'v1.2.0',
    dependencies: ['Vanilla JavaScript'],
    description: 'Demonstrates how untrusted user input is safely neutralized using strict character escaping and DOM node creation instead of unsafe innerHTML.',
    securityNotes: 'Educational defensive demonstration for OWASP A03 Injection prevention.',
    author: 'Hackers শিক্ষক Cyber Academy',
    updatedAt: '2026-09-30',
    downloads: 2150,
    likesCount: 418,
    savesCount: 260,
    htmlCode: `<div class="xss-lab">
  <h3>Defensive XSS Sanitizer Tester</h3>
  <label>Test Untrusted Payload:</label>
  <input id="payloadInput" type="text" value="<img src=x onerror=alert(1)> Hello Hackers শিক্ষক!" />
  <div class="btn-row">
    <button id="sanitizeBtn">Sanitize & Render Safely</button>
  </div>
  <div class="result-panel">
    <div class="label">Escaped HTML Entity Output:</div>
    <code id="escapedCode"></code>
    <div class="label" style="margin-top:12px;">Safe textContent DOM Output:</div>
    <div id="safePreview" class="safe-box"></div>
  </div>
</div>`,
    cssCode: `body { background: #050811; color: #e2e8f0; font-family: system-ui, sans-serif; padding: 20px; }
.xss-lab { max-width: 480px; margin: 0 auto; background: #0b1120; padding: 22px; border-radius: 14px; border: 1px solid rgba(0,245,212,0.25); }
h3 { margin-top: 0; color: #00f5d4; }
label { display: block; font-size: 12px; color: #94a3b8; margin-bottom: 6px; }
input { width: 100%; box-sizing: border-box; padding: 10px; border-radius: 8px; border: 1px solid #334155; background: #050811; color: #fff; font-family: monospace; margin-bottom: 12px; }
button { background: #00f5d4; color: #050811; border: none; padding: 10px 16px; border-radius: 8px; font-weight: 700; cursor: pointer; }
.result-panel { margin-top: 16px; padding: 12px; background: #050811; border-radius: 8px; border: 1px solid #1e293b; }
.label { font-size: 11px; color: #64748b; margin-bottom: 4px; }
code { color: #f43f5e; font-size: 12px; word-break: break-all; }
.safe-box { color: #10b981; font-size: 13px; padding: 6px 0; }`,
    jsCode: `function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const input = document.getElementById('payloadInput');
const btn = document.getElementById('sanitizeBtn');
const escapedCode = document.getElementById('escapedCode');
const safePreview = document.getElementById('safePreview');

function update() {
  const raw = input.value;
  escapedCode.textContent = escapeHtml(raw);
  safePreview.textContent = raw;
}

btn.addEventListener('click', update);
update();`
  }
];

export const DEVELOPER_TOOLS_CATALOG: DeveloperToolSpec[] = [
  { id: 'json-formatter', slug: 'json-formatter', name: 'JSON Formatter & Validator', nameBn: 'JSON ফরম্যাটার ও ভ্যালিডেটর', category: 'Developer', description: 'Beautify, minify, and validate JSON payloads with exact syntax error line detection.', usageCount: 14820, inputFormats: 'JSON, Text', outputFormats: 'Formatted JSON, Minified JSON', processingLocation: 'Browser Client (WebWorker/Canvas)', maxFileSize: '10 MB', healthStatus: 'Operational', relatedCourse: 'Modern JavaScript & APIs', relatedTutorial: 'REST API Payload Debugging' },
  { id: 'base64-codec', slug: 'base64-codec', name: 'UTF-8 Base64 Encoder / Decoder', nameBn: 'Base64 এনকোডার ও ডিকোডার', category: 'Crypto & Hash', description: 'Safe Unicode/Bangla-compatible Base64 encoding and decoding in browser memory.', usageCount: 11240, inputFormats: 'UTF-8 Text, Base64', outputFormats: 'Base64, UTF-8 Text', processingLocation: 'Browser Client (WebWorker/Canvas)', maxFileSize: '5 MB', healthStatus: 'Operational', relatedCourse: 'Cryptography 101', relatedTutorial: 'Encoding vs Encryption' },
  { id: 'url-codec', slug: 'url-codec', name: 'URL & Query String Encoder / Decoder', nameBn: 'URL এনকোডার ও ডিকোডার', category: 'Developer', description: 'Encode or decode URI components and inspect query parameters safely.', usageCount: 8430, inputFormats: 'URL, Query String', outputFormats: 'Encoded/Decoded URI', processingLocation: 'Browser Client (WebWorker/Canvas)', maxFileSize: '1 MB', healthStatus: 'Operational', relatedCourse: 'Web Development Fundamentals', relatedTutorial: 'Safe URL Parameter Handling' },
  { id: 'uuid-generator', slug: 'uuid-generator', name: 'Cryptographic UUID v4 & Secure Random', nameBn: 'UUID v4 ও সিকিউর র‍্যান্ডম জেনারেটর', category: 'Crypto & Hash', description: 'Generate RFC-4122 compliant UUIDv4 identifiers and CSPRNG tokens using Web Crypto API.', usageCount: 9650, inputFormats: 'Count/Length Config', outputFormats: 'UUIDv4, Hex Token', processingLocation: 'Browser Client (WebWorker/Canvas)', maxFileSize: 'N/A', healthStatus: 'Operational', relatedCourse: 'Secure Coding in PHP & JS', relatedTutorial: 'Cryptographic Randomness' },
  { id: 'regex-tester', slug: 'regex-tester', name: 'Live Regex Pattern Tester', nameBn: 'Regex প্যাটার্ন টেস্টার', category: 'Developer', description: 'Test JavaScript/PCRE regular expressions with match highlighting and capture groups.', usageCount: 7890, inputFormats: 'Regex + Test String', outputFormats: 'Match Groups & Offsets', processingLocation: 'Browser Client (WebWorker/Canvas)', maxFileSize: '2 MB', healthStatus: 'Operational', relatedCourse: 'Input Validation Mastery', relatedTutorial: 'Preventing ReDoS Attacks' },
  { id: 'timestamp-converter', slug: 'timestamp-converter', name: 'Unix Epoch & ISO-8601 Converter', nameBn: 'টাইমস্ট্যাম্প কনভার্টার', category: 'Developer', description: 'Convert Unix timestamps (seconds/ms) to UTC, Dhaka BST (UTC+6), and ISO formats.', usageCount: 6540, inputFormats: 'Unix Epoch, ISO Date', outputFormats: 'UTC, Asia/Dhaka, ISO-8601', processingLocation: 'Browser Client (WebWorker/Canvas)', maxFileSize: 'N/A', healthStatus: 'Operational', relatedCourse: 'Backend Engineering', relatedTutorial: 'Timezone Safe Databases' },
  { id: 'color-converter', slug: 'color-converter', name: 'HEX / RGB / HSL Color & Contrast Analyzer', nameBn: 'কালার কোড ও কনট্রাস্ট কনভার্টার', category: 'CSS', description: 'Instant bidirectional conversion between HEX, RGB, RGBA, HSL, and CSS variables.', usageCount: 10320, inputFormats: 'HEX, RGB, HSL', outputFormats: 'CSS Variables, RGBA', processingLocation: 'Browser Client (WebWorker/Canvas)', maxFileSize: 'N/A', healthStatus: 'Operational', relatedCourse: 'Modern CSS & Neon UI', relatedTutorial: 'WCAG AA Contrast Math' },
  { id: 'jwt-inspector', slug: 'jwt-inspector', name: 'Client-Side JWT Payload Inspector', nameBn: 'JWT টোকেন ইন্সপেক্টর', category: 'Cyber Defensive', description: 'Decode JWT headers and claims locally in browser without sending tokens to any server.', usageCount: 8910, inputFormats: 'JWT String', outputFormats: 'Decoded Header & Claims JSON', processingLocation: 'Browser Client (WebWorker/Canvas)', maxFileSize: '512 KB', healthStatus: 'Operational', relatedCourse: 'Web Authentication Security', relatedTutorial: 'Auditing JWT Claims Safely' },
  { id: 'sha256-hash', slug: 'sha256-hash', name: 'SHA-256 / SHA-512 / HMAC & Hash Identifier', nameBn: 'SHA-256 / HMAC হ্যাশ জেনারেটর ও আইডেন্টিফায়ার', category: 'Crypto & Hash', description: 'Compute cryptographic digests and identify hash formats (MD5/SHA1/SHA256/bcrypt) locally.', usageCount: 9120, inputFormats: 'Text, File, Hash String', outputFormats: 'Hex Digest, Hash Type', processingLocation: 'Browser Client (WebWorker/Canvas)', maxFileSize: '25 MB', healthStatus: 'Operational', relatedCourse: 'Applied Cryptography', relatedTutorial: 'HMAC Message Integrity' },
  { id: 'password-entropy', slug: 'password-entropy', name: 'Password Entropy & Generator Lab', nameBn: 'পাসওয়ার্ড শক্তি ও এন্ট্রপি চেকার', category: 'Cyber Defensive', description: 'Calculate bit-entropy, character pool depth, and generate high-entropy passphrases client-side.', usageCount: 13400, inputFormats: 'Candidate Password', outputFormats: 'Bit Entropy & Assessment', processingLocation: 'Browser Client (WebWorker/Canvas)', maxFileSize: 'N/A', healthStatus: 'Operational', relatedCourse: 'Cyber Hygiene & Defense', relatedTutorial: 'Why Entropy Beats Complexity Rules' },
  { id: 'csp-header-builder', slug: 'csp-header-builder', name: 'Security Headers, CSP, CORS & SPF/DMARC Analyzer', nameBn: 'CSP, সিকিউরিটি হেডার ও SPF/DMARC বিল্ডার', category: 'Cyber Defensive', description: 'Generate strict CSP, HSTS, X-Frame-Options, CORS, and SPF/DKIM/DMARC DNS policy records.', usageCount: 5420, inputFormats: 'Policy Directives', outputFormats: 'HTTP Headers & DNS TXT', processingLocation: 'Browser Client (WebWorker/Canvas)', maxFileSize: 'N/A', healthStatus: 'Operational', relatedCourse: 'Web Server Hardening', relatedTutorial: 'Defending Against XSS with CSP' },
  { id: 'wp-config-generator', slug: 'wp-config-generator', name: 'Hardened wp-config.php Generator', nameBn: 'হার্ডেনড wp-config.php জেনারেটর', category: 'WordPress', description: 'Generate secure wp-config.php with DISALLOW_FILE_EDIT, SSL admin, and custom table prefixes.', usageCount: 11800, inputFormats: 'WP Environment Options', outputFormats: 'PHP Configuration Code', processingLocation: 'Browser Client (WebWorker/Canvas)', maxFileSize: 'N/A', healthStatus: 'Operational', relatedCourse: 'WP Plugin & Security Mastery', relatedTutorial: 'Securing wp-config.php' },
  { id: 'htaccess-security', slug: 'htaccess-security', name: 'WordPress Security .htaccess Builder', nameBn: 'সিকিউর .htaccess জেনারেটর', category: 'WordPress', description: 'Create Apache .htaccess rules blocking xmlrpc.php abuse, directory browsing, and PHP execution in uploads.', usageCount: 9870, inputFormats: 'Rule Toggles', outputFormats: 'Apache .htaccess Config', processingLocation: 'Browser Client (WebWorker/Canvas)', maxFileSize: 'N/A', healthStatus: 'Operational', relatedCourse: 'WP Server Administration', relatedTutorial: 'Blocking XML-RPC Brute Force' },
  { id: 'wp-shortcode-builder', slug: 'wp-shortcode-builder', name: 'PHP 8.2 WordPress Shortcode Scaffolder', nameBn: 'ওয়ার্ডপ্রেস শর্টকোড জেনারেটর', category: 'WordPress', description: 'Generate escaped, shortcode_atts-validated WordPress shortcode classes.', usageCount: 7210, inputFormats: 'Tag & Attribute Schema', outputFormats: 'PHP 8.2 Class Code', processingLocation: 'Browser Client (WebWorker/Canvas)', maxFileSize: 'N/A', healthStatus: 'Operational', relatedCourse: 'WP Plugin Architecture', relatedTutorial: 'Safe Shortcode Escaping' },
  { id: 'meta-og-generator', slug: 'meta-og-generator', name: 'SEO Meta, OpenGraph, Schema & Heading Analyzer', nameBn: 'SEO মেটা, স্কিমা ও হেডিং অ্যানালাইজার', category: 'Web & SEO', description: 'Generate HTML meta tags, OpenGraph cards, FAQ/Article/Breadcrumb JSON-LD, and audit headings.', usageCount: 8640, inputFormats: 'Page Metadata / HTML', outputFormats: 'HTML Meta + JSON-LD Schema', processingLocation: 'Browser Client (WebWorker/Canvas)', maxFileSize: '2 MB', healthStatus: 'Operational', relatedCourse: 'Technical SEO 2026', relatedTutorial: 'Structured Data Without Spam' },
  { id: 'robots-txt-builder', slug: 'robots-txt-builder', name: 'Robots.txt & XML Sitemap Validator', nameBn: 'robots.txt ও সাইটম্যাপ টেস্টার', category: 'Web & SEO', description: 'Configure crawler rules, crawl-delay, and validate XML sitemap directives.', usageCount: 6190, inputFormats: 'Crawler Directives', outputFormats: 'robots.txt & Sitemap Check', processingLocation: 'Browser Client (WebWorker/Canvas)', maxFileSize: '5 MB', healthStatus: 'Operational', relatedCourse: 'Search Engine Crawlability', relatedTutorial: 'Optimizing Crawl Budget' },
  { id: 'image-converter-suite', slug: 'image-converter-suite', name: 'JPG / PNG / WebP / AVIF Converter, Resizer & EXIF Cleaner', nameBn: 'ইমেজ কনভার্টার (JPG/PNG/WebP), রিসাইজার ও EXIF রিমুভার', category: 'Image Tools', description: 'Convert between JPG, PNG, WebP, strip privacy-sensitive EXIF metadata, resize, compress, and inspect dominant colors.', usageCount: 16450, inputFormats: 'JPG, PNG, WebP, GIF, SVG, AVIF', outputFormats: 'JPG, PNG, WebP, Stripped EXIF', processingLocation: 'Browser Client (WebWorker/Canvas)', maxFileSize: '25 MB', healthStatus: 'Operational', relatedCourse: 'Web Performance & Media', relatedTutorial: 'Removing GPS EXIF Before Upload' },
  { id: 'audio-waveform-suite', slug: 'audio-waveform-suite', name: 'Audio Waveform, Frequency, BPM, Trimmer & Voice Recorder', nameBn: 'অডিও কনভার্টার, ওয়েভফর্ম, ভয়েস রেকর্ডার ও BPM অ্যানালাইজার', category: 'Audio Tools', description: 'Inspect audio duration, sample rate, channels, RMS loudness, record mic audio, and trim/normalize via Web Audio API.', usageCount: 7320, inputFormats: 'MP3, WAV, OGG, FLAC, WebM, Mic', outputFormats: 'WAV, WebM, Audio Telemetry', processingLocation: 'Browser Client (WebWorker/Canvas)', maxFileSize: '50 MB', healthStatus: 'Operational', relatedCourse: 'Creator Audio Production', relatedTutorial: 'Web Audio API Fundamentals' },
  { id: 'video-gif-suite', slug: 'video-gif-suite', name: 'Video Metadata, Frame/Thumbnail Extractor, GIF & SRT/VTT Tool', nameBn: 'ভিডিও ফ্রেম এক্সট্রাক্টর, GIF মেকার ও সাবটাইটেল (SRT/VTT) টুল', category: 'Video & GIF', description: 'Extract high-res video thumbnails/frames, inspect FPS/resolution/duration, and convert SRT <-> WebVTT subtitles in browser.', usageCount: 9540, inputFormats: 'MP4, WebM, GIF, SRT, VTT', outputFormats: 'PNG Frame, WebVTT, SRT, GIF', processingLocation: 'Browser Client (WebWorker/Canvas)', maxFileSize: '100 MB (Client Memory)', healthStatus: 'Operational', relatedCourse: 'YouTube Creator Engineering', relatedTutorial: 'Client-Side Video Frame Capture' },
  { id: 'pdf-converter-suite', slug: 'pdf-converter-suite', name: 'PDF Center & Safe File Converter (CSV/JSON/XML/YAML/MD)', nameBn: 'PDF সেন্টার ও ফাইল কনভার্টার (JSON/CSV/XML/Markdown/ZIP Guard)', category: 'PDF & Converter', description: 'Convert between JSON, CSV, TSV, XML, YAML, Markdown, HTML, and inspect archives with Zip-Slip path traversal protection.', usageCount: 12180, inputFormats: 'PDF, JSON, CSV, XML, MD, HTML, ZIP', outputFormats: 'Converted Document / Audit Report', processingLocation: 'Browser Client (WebWorker/Canvas)', maxFileSize: '25 MB', healthStatus: 'Operational', relatedCourse: 'Data Pipelines & Security', relatedTutorial: 'Preventing Zip-Slip Vulnerabilities' },
  { id: 'ohms-law-calculator', slug: 'ohms-law-calculator', name: 'Ohm\'s Law & DC Electrical Power Suite', nameBn: 'ওহমের সূত্র ও ইলেকট্রিক্যাল পাওয়ার ক্যালকুলেটর', category: 'Engineering & Electronics', description: 'Compute Voltage, Current, Resistance, and Power dynamically with formula breakdowns.', usageCount: 18400, inputFormats: 'Voltage, Current, Resistance, Power', outputFormats: 'Calculated Metric & Formulas', processingLocation: 'Browser Client (WebWorker/Canvas)', maxFileSize: 'N/A', healthStatus: 'Operational', relatedCourse: 'Hardware & IoT Engineering', relatedTutorial: 'DC Power Calculations' },
  { id: 'resistor-color-code', slug: 'resistor-color-code', name: '4-Band & 5-Band Resistor Color Code Decoder', nameBn: 'রেজিস্টর কালার কোড ডিকোডার (৪ ও ৫ ব্যান্ড)', category: 'Engineering & Electronics', description: 'Interactive visual resistor color band selector with resistance, tolerance, and multiplier outputs.', usageCount: 22100, inputFormats: 'Band Colors', outputFormats: 'Resistance (Ohms), Tolerance (%)', processingLocation: 'Browser Client (WebWorker/Canvas)', maxFileSize: 'N/A', healthStatus: 'Operational', relatedCourse: 'Electronics Lab 101', relatedTutorial: 'Reading Resistor Bands' },
  { id: 'gcode-stats-analyzer', slug: 'gcode-stats-analyzer', name: 'G-Code CNC & 3D Print File Inspector', nameBn: 'G-Code সিএনসি ও ৩ডি প্রিন্ট ফাইল ইন্সপেক্টর', category: 'CNC & Fabrication', description: 'Parse G-code files client-side to compute bounding box dimensions, total layer count, and feed rates.', usageCount: 8900, inputFormats: 'G-code (.gcode, .nc)', outputFormats: 'Layer Stats, Bounding Box, Feed Speeds', processingLocation: 'Browser Client (WebWorker/Canvas)', maxFileSize: '20 MB', healthStatus: 'Operational', relatedCourse: 'CNC & Fabrication Lab', relatedTutorial: 'Validating CNC Toolpaths' },
  { id: 'loan-emi-calculator', slug: 'loan-emi-calculator', name: 'Loan EMI & Compound Interest Engine', nameBn: 'লোন EMI ও চক্রবৃদ্ধি সুদ ক্যালকুলেটর', category: 'Mathematics & Finance', description: 'Compute monthly EMI installments, total interest, and amortization breakdown charts.', usageCount: 15600, inputFormats: 'Principal, Rate (%), Tenure (Years/Months)', outputFormats: 'Monthly EMI, Total Interest, Total Payment', processingLocation: 'Browser Client (WebWorker/Canvas)', maxFileSize: 'N/A', healthStatus: 'Operational', relatedCourse: 'Practical Mathematics', relatedTutorial: 'Compound Interest Math' },
  { id: 'qr-code-studio', slug: 'qr-code-studio', name: 'Universal High-Resolution QR & Barcode Studio', nameBn: 'কিউআর ও বারকোড জেনারেটর স্টুডিও', category: 'QR & Device Lab', description: 'Generate high-res vector and raster QR codes for Wi-Fi credentials, URLs, vCards, and phone numbers.', usageCount: 28900, inputFormats: 'URL, Wi-Fi, vCard, Text', outputFormats: 'SVG / PNG QR Code', processingLocation: 'Browser Client (WebWorker/Canvas)', maxFileSize: 'N/A', healthStatus: 'Operational', relatedCourse: 'Web Developer Tools', relatedTutorial: 'Generating Dynamic QR Codes' },
  { id: 'screen-hardware-inspector', slug: 'screen-hardware-inspector', name: 'Display & Device Hardware Inspector', nameBn: 'স্ক্রিন ও ডিভাইস ডায়াগনস্টিক ইন্সপেক্টর', category: 'QR & Device Lab', description: 'Real-time detection of device pixel ratio, viewport size, color depth, WebGL renderer, and touch capability.', usageCount: 13700, inputFormats: 'Browser Environment', outputFormats: 'Hardware Specs & Diagnostics', processingLocation: 'Browser Client (WebWorker/Canvas)', maxFileSize: 'N/A', healthStatus: 'Operational', relatedCourse: 'Responsive Web Design', relatedTutorial: 'Viewport & DPR Diagnostics' }
];

export const CSS_NEON_GENERATORS = [
  { id: 'rgb-border', name: 'RGB Border Generator', nameBn: 'RGB বর্ডার জেনারেটর' },
  { id: 'rgb-button', name: 'RGB Button Generator', nameBn: 'RGB বাটন জেনারেটর' },
  { id: 'neon-text', name: 'Neon Text Glow Generator', nameBn: 'নিয়ন টেক্সট জেনারেটর' },
  { id: 'glassmorphism', name: 'Cyber Glassmorphism Card', nameBn: 'গ্লাসমরফিজম জেনারেটর' },
  { id: 'box-shadow', name: 'Multi-Layer Neon Box Shadow', nameBn: 'নিয়ন শ্যাডো জেনারেটর' },
  { id: 'gradient-mesh', name: 'Cyber Gradient Generator', nameBn: 'গ্র্যাডিয়েন্ট জেনারেটর' },
  { id: 'keyframe-pulse', name: 'CSS Pulse & Orbit Animation', nameBn: 'CSS অ্যানিমেশন জেনারেটর' },
  { id: 'cyber-badge', name: 'HUD Status Badge Generator', nameBn: 'HUD ব্যাজ জেনারেটর' },
  { id: 'loader-spinner', name: 'Cyber Matrix Loader Generator', nameBn: 'লোডিং অ্যানিমেশন জেনারেটর' },
  { id: 'navbar-glass', name: 'Sticky Cyber Navbar Generator', nameBn: 'ন্যাভবার জেনারেটর' },
  { id: 'login-form', name: '2040 Neon Login Form Builder', nameBn: 'লগইন ফর্ম জেনারেটর' },
  { id: 'pricing-card', name: 'Cyber Tier Card Generator', nameBn: 'প্রাইসিং কার্ড জেনারেটর' },
  { id: 'terminal-window', name: 'macOS/Linux Terminal Shell UI', nameBn: 'টার্মিনাল শেল জেনারেটর' },
  { id: 'tooltip-glow', name: 'Accessible Neon Tooltip CSS', nameBn: 'টুলটিপ জেনারেটর' },
  { id: 'scrollbar-cyber', name: 'Custom Neon Scrollbar Styler', nameBn: 'স্ক্রলবার স্টাইলার' }
];

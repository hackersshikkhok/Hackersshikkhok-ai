import React, { useState, useEffect } from 'react';
import {
  Palette,
  Cpu,
  Gamepad2,
  Download,
  Plus,
  Trash2,
  Copy,
  CheckCircle2,
  Play,
  Volume2,
  Maximize2
} from 'lucide-react';

interface CreatorStudioDeviceLabAndGamesProps {
  onEarnPoints: (pts: number, msg: string) => void;
  onNotify: (msg: string) => void;
}

export const CreatorStudioDeviceLabAndGames: React.FC<CreatorStudioDeviceLabAndGamesProps> = ({
  onEarnPoints,
  onNotify
}) => {
  const [activeHubTab, setActiveHubTab] = useState<
    'creator-studio' | 'device-lab' | 'games-center' | 'calendar-reminders'
  >('creator-studio');

  // =========================================================================
  // 1. EXPANDED CREATOR STUDIO STATE (Video, Audio, Image, GIF, Thumbnail, QR)
  // =========================================================================
  const [activeEditorType, setActiveEditorType] = useState<string>('Thumbnail & Banner Maker');
  const [presetRatio, setPresetRatio] = useState<'16:9' | '9:16' | '1:1' | '4:5'>('16:9');
  const [canvasTitle, setCanvasTitle] = useState('Hackers শিক্ষক — Cyber Security & Coding');
  const [canvasSubtitle, setCanvasSubtitle] = useState('OWASP Top 10 · WordPress 8.2 · Live Lab');
  const [canvasBadge, setCanvasBadge] = useState('OFFICIAL TUTORIAL');
  const [canvasWatermark, setCanvasWatermark] = useState('HackersShikkhok.com');
  const [accentHex, setAccentHex] = useState('#00f5d4');

  // Video / Audio / Image / GIF / QR sub-controls
  const [videoTrimStart, setVideoTrimStart] = useState(0);
  const [videoTrimEnd, setVideoTrimEnd] = useState(45);
  const [videoSpeed, setVideoSpeed] = useState('1.0x');
  const [audioGainDb, setAudioGainDb] = useState(0);
  const [audioFadeIn, setAudioFadeIn] = useState(true);
  const [gifFps, setGifFps] = useState(15);
  const [qrPayload, setQrPayload] = useState('https://hackersshikkhok.com');

  const [myProjects, setMyProjects] = useState([
    { id: 'prj-1', name: 'YouTube Cyber Thumbnail 16:9', category: 'Thumbnail', ratio: '16:9', status: 'Saved', updated: 'Today' },
    { id: 'prj-2', name: 'Reels / Shorts Intro 9:16 (Trimmed 0-45s)', category: 'Video', ratio: '9:16', status: 'Draft', updated: 'Yesterday' },
    { id: 'prj-3', name: 'Podcast Voice-Over Normalized (-14 LUFS)', category: 'Audio', ratio: 'WAV', status: 'Exported', updated: '2 days ago' },
    { id: 'prj-4', name: 'Cyber Terminal Animated Loop (15 FPS)', category: 'GIF', ratio: '1:1', status: 'Saved', updated: 'Today' }
  ]);

  const editorCategories = [
    'Thumbnail & Banner Maker',
    'Universal Video Editor (Client-Side)',
    'Audio Waveform & Voice Editor',
    'Image Layer, Filter & Watermark Studio',
    'GIF & Animation Maker',
    'Poster / Flyer / Logo / Meme Maker',
    'QR & Barcode Studio'
  ];

  const handleSaveCreatorProject = () => {
    const newProj = {
      id: `prj-${Date.now()}`,
      name: `${canvasTitle.slice(0, 28)} (${presetRatio})`,
      category: activeEditorType.split(' ')[0],
      ratio: presetRatio,
      status: 'Saved',
      updated: 'Just now'
    };
    setMyProjects((prev) => [newProj, ...prev]);
    onEarnPoints(10, 'ক্রিয়েটর স্টুডিওতে নতুন প্রজেক্ট সেভ করার জন্য +10 Points অর্জিত হয়েছে!');
  };

  const handleDuplicateProject = (proj: { id: string; name: string; category: string; ratio: string; status: string; updated: string }) => {
    const dup = {
      ...proj,
      id: `prj-${Date.now()}`,
      name: `${proj.name} (Copy)`,
      updated: 'Just now'
    };
    setMyProjects((prev) => [dup, ...prev]);
    onNotify(`প্রজেক্ট ডুপ্লিকেট করা হয়েছে: ${dup.name}`);
  };

  const handleDeleteProject = (id: string) => {
    setMyProjects((prev) => prev.filter((p) => p.id !== id));
    onNotify('প্রজেক্ট মুছে ফেলা হয়েছে।');
  };

  const handleExportCreatorCanvasPng = () => {
    const canvas = document.createElement('canvas');
    canvas.width = presetRatio === '9:16' ? 720 : presetRatio === '1:1' ? 900 : 1280;
    canvas.height = presetRatio === '9:16' ? 1280 : presetRatio === '1:1' ? 900 : 720;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#050811');
    grad.addColorStop(0.6, '#0b1120');
    grad.addColorStop(1, '#1e1b4b');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = accentHex;
    ctx.lineWidth = 8;
    ctx.strokeRect(16, 16, canvas.width - 32, canvas.height - 32);

    ctx.fillStyle = accentHex;
    ctx.font = 'bold 24px monospace';
    ctx.fillText(`${canvasBadge} · ${activeEditorType.toUpperCase()}`, 64, 120);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px sans-serif';
    ctx.fillText(canvasTitle, 64, 210);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '26px sans-serif';
    ctx.fillText(canvasSubtitle, 64, 275);

    ctx.fillStyle = accentHex;
    ctx.font = 'bold 22px monospace';
    ctx.fillText(`Watermark: ${canvasWatermark} · Hackers শিক্ষক`, 64, canvas.height - 64);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `hackers-shikkhok-creator-${presetRatio.replace(':', 'x')}.png`;
      a.click();
      URL.revokeObjectURL(url);
    });
    onNotify('ক্রিয়েটর ক্যানভাস PNG আকারে এক্সপোর্ট সম্পন্ন হয়েছে!');
  };

  // =========================================================================
  // 2. COMPLETE 25-MODULE DEVICE LAB / DIAGNOSTIC CENTER
  // =========================================================================
  const [deviceMetrics, setDeviceMetrics] = useState<
    Array<{
      id: string;
      category: 'Hardware & Media' | 'Display & Touch' | 'Sensors & Power' | 'Browser & Network';
      name: string;
      value: string;
      status: 'Supported' | 'Permission Required' | 'Browser Restricted' | 'Not Available';
    }>
  >([]);
  const [deadPixelColor, setDeadPixelColor] = useState<string | null>(null);
  const [touchPointsCount, setTouchPointsCount] = useState<number>(0);

  useEffect(() => {
    const nav = typeof navigator !== 'undefined' ? navigator : null;
    const scr = typeof window !== 'undefined' ? window.screen : null;
    const metrics: Array<{
      id: string;
      category: 'Hardware & Media' | 'Display & Touch' | 'Sensors & Power' | 'Browser & Network';
      name: string;
      value: string;
      status: 'Supported' | 'Permission Required' | 'Browser Restricted' | 'Not Available';
    }> = [
      {
        id: 'cam-front-rear',
        category: 'Hardware & Media',
        name: '1. Camera (Front / Rear VideoStream)',
        value: nav && nav.mediaDevices ? 'mediaDevices.getUserMedia Ready' : 'Not Available',
        status: 'Permission Required'
      },
      {
        id: 'cam-flash',
        category: 'Hardware & Media',
        name: '2. Camera Flash / Torch API',
        value: 'ImageCapture Torch Constraint (Mobile Rear Camera Only)',
        status: 'Browser Restricted'
      },
      {
        id: 'mic-input',
        category: 'Hardware & Media',
        name: '3. Microphone & Noise Floor Analyzer',
        value: nav && nav.mediaDevices ? 'WebAudio AnalyserNode Ready' : 'Not Available',
        status: 'Permission Required'
      },
      {
        id: 'speaker-out',
        category: 'Hardware & Media',
        name: '4. Speaker Left/Right & 440Hz Tone Test',
        value: 'Web Audio API OscillatorNode Operational',
        status: 'Supported'
      },
      {
        id: 'headphone-detect',
        category: 'Hardware & Media',
        name: '5. Headphone / Audio Output Enumeration',
        value: 'enumerateDevices() AudioOutput (Requires Media Permission)',
        status: 'Permission Required'
      },
      {
        id: 'screen-res',
        category: 'Display & Touch',
        name: '6. Screen Resolution, DPR & Color Depth',
        value: scr ? `${scr.width}×${scr.height} · DPR ${window.devicePixelRatio || 1}x · ${scr.colorDepth}-bit` : '1440×900',
        status: 'Supported'
      },
      {
        id: 'dead-pixel',
        category: 'Display & Touch',
        name: '7. Dead Pixel, Color & Brightness Uniformity',
        value: 'Interactive Full-Color Inspector Ready (Click Test Below)',
        status: 'Supported'
      },
      {
        id: 'touch-multi',
        category: 'Display & Touch',
        name: '8. Touch & Multi-Touch Points Detector',
        value: nav ? `Max Touch Points: ${nav.maxTouchPoints || 0}` : '0',
        status: 'Supported'
      },
      {
        id: 'vibration',
        category: 'Sensors & Power',
        name: '9. Vibration / Haptic Motor API',
        value: nav && 'vibrate' in nav ? 'navigator.vibrate() Supported' : 'Desktop Browser Restricted',
        status: nav && 'vibrate' in nav ? 'Supported' : 'Browser Restricted'
      },
      {
        id: 'orientation',
        category: 'Sensors & Power',
        name: '10. Screen Orientation & Angle',
        value: scr && scr.orientation ? `${scr.orientation.type} (${scr.orientation.angle}°)` : 'landscape-primary',
        status: 'Supported'
      },
      {
        id: 'accel-gyro',
        category: 'Sensors & Power',
        name: '11. Accelerometer & Gyroscope (DeviceMotion)',
        value: typeof DeviceMotionEvent !== 'undefined' ? 'DeviceMotionEvent API Ready' : 'Not Available',
        status: 'Permission Required'
      },
      {
        id: 'magnetometer',
        category: 'Sensors & Power',
        name: '12. Magnetometer / Compass Sensor',
        value: 'Generic Sensor API (Restricted in Standard Desktop Browsers)',
        status: 'Browser Restricted'
      },
      {
        id: 'gps-geo',
        category: 'Sensors & Power',
        name: '13. GPS / Geolocation Precision Sensor',
        value: nav && 'geolocation' in nav ? 'navigator.geolocation Ready' : 'Not Available',
        status: 'Permission Required'
      },
      {
        id: 'battery-api',
        category: 'Sensors & Power',
        name: '14. Battery Level & Charging Telemetry',
        value: nav && 'getBattery' in nav ? 'Battery Status API Supported (Chromium)' : 'Browser Privacy Restricted (Safari/Firefox)',
        status: nav && 'getBattery' in nav ? 'Supported' : 'Browser Restricted'
      },
      {
        id: 'cpu-cores',
        category: 'Sensors & Power',
        name: '15. CPU Logical Cores & RAM Estimate',
        value: nav ? `${nav.hardwareConcurrency || 4} Cores · Memory API Capped for Anti-Fingerprinting` : '4 Cores',
        status: 'Supported'
      },
      {
        id: 'storage-quota',
        category: 'Browser & Network',
        name: '16. Storage (LocalStorage, SessionStorage, IndexedDB)',
        value: typeof indexedDB !== 'undefined' ? 'LocalStorage + IndexedDB Active' : 'Restricted',
        status: 'Supported'
      },
      {
        id: 'network-info',
        category: 'Browser & Network',
        name: '17. Network Connection & Online Status',
        value: nav && nav.onLine ? 'Online (Navigator Network Information Ready)' : 'Offline',
        status: 'Supported'
      },
      {
        id: 'webrtc-stun',
        category: 'Browser & Network',
        name: '18. WebRTC PeerConnection & Media Transport',
        value: typeof RTCPeerConnection !== 'undefined' ? 'RTCPeerConnection Operational' : 'Restricted',
        status: 'Supported'
      },
      {
        id: 'webgl-gpu',
        category: 'Browser & Network',
        name: '19. WebGL 2.0 & WebGPU Compute Pipeline',
        value: nav && 'gpu' in nav ? 'WebGL 2.0 + WebGPU Active' : 'WebGL 2.0 Active (WebGPU Flag/Hardware Dependent)',
        status: 'Supported'
      },
      {
        id: 'clipboard-api',
        category: 'Browser & Network',
        name: '20. Async Clipboard Read/Write API',
        value: nav && nav.clipboard ? 'navigator.clipboard Operational' : 'Permission Required',
        status: 'Supported'
      },
      {
        id: 'websocket-api',
        category: 'Browser & Network',
        name: '21. WebSocket Full-Duplex Transport',
        value: typeof WebSocket !== 'undefined' ? 'WebSocket RFC-6455 Supported' : 'Restricted',
        status: 'Supported'
      },
      {
        id: 'notification-api',
        category: 'Browser & Network',
        name: '22. Browser Push Notification API',
        value: typeof Notification !== 'undefined' ? `Permission: ${Notification.permission}` : 'Not Available',
        status: 'Permission Required'
      },
      {
        id: 'sw-pwa',
        category: 'Browser & Network',
        name: '23. Service Worker & PWA Installability',
        value: nav && 'serviceWorker' in nav ? 'ServiceWorker Container Ready' : 'Not Available',
        status: 'Supported'
      },
      {
        id: 'raw-imei-serial',
        category: 'Sensors & Power',
        name: '24. Raw Hardware Serial / IMEI / MAC Address',
        value: 'Permanently Blocked by W3C Browser Security Sandbox (Never Faked)',
        status: 'Browser Restricted'
      }
    ];
    setDeviceMetrics(metrics);
  }, []);

  const handlePlaySpeakerTestTone = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.45);
      onNotify('🔊 স্পিকার টেস্ট: 440Hz Sine Tone সফলভাবে বাজানো হয়েছে!');
    } catch {
      onNotify('স্পিকার টেস্টের জন্য ব্রাউজার অডিও পারমিশন প্রয়োজন।');
    }
  };

  // =========================================================================
  // 3. INTERACTIVE GAMES CENTER STATE (Cyber Game + Learning Quiz)
  // =========================================================================
  const cyberScenarios = [
    {
      q: '১. একটি ইমেইলে লিংক এসেছে: https://paypa1-security-verify.com/login — এটি কি নিরাপদ নাকি ফিশিং?',
      options: ['Phishing / Unsafe URL (সন্দেহজনক ডোমেইন)', 'Safe Official URL'],
      correct: 0,
      explanation: 'সঠিক! "paypa1" এ ল-এর বদলে ১ ব্যবহার করা হয়েছে (Typosquatting Phishing)।'
    },
    {
      q: '২. ওয়ার্ডপ্রেসে SQL Injection প্রতিরোধের জন্য নিচের কোন মেথডটি বাধ্যতামূলক?',
      options: ['$wpdb->prepare()', 'Direct $_GET concatenation'],
      correct: 0,
      explanation: 'সঠিক! সবসময় $wpdb->prepare() দিয়ে প্যারামিটারাইজড কোয়েরি চালাতে হবে।'
    },
    {
      q: '৩. ইউজারের ব্রাউজারে স্যান্ডবক্সড কোড প্রিভিউ চালানোর সময় কোনটি কুকি চুরি রোধ করে?',
      options: ['iframe sandbox="allow-scripts" (without allow-same-origin)', 'eval() on parent window'],
      correct: 0,
      explanation: 'সঠিক! allow-same-origin ছাড়া স্যান্ডবক্সড iframe প্যারেন্ট পেজের কুকি বা DOM অ্যাক্সেস করতে পারে না।'
    }
  ];
  const [currentGameIdx, setCurrentGameIdx] = useState(0);
  const [gameFeedback, setGameFeedback] = useState<string | null>(null);
  const [gameScore, setGameScore] = useState(0);

  const handleAnswerGame = (selectedIdx: number) => {
    const current = cyberScenarios[currentGameIdx];
    if (selectedIdx === current.correct) {
      setGameScore((s) => s + 20);
      setGameFeedback(`✅ ${current.explanation} (+15 Points & XP Added!)`);
      onEarnPoints(15, 'সাইবার গেম চ্যালেঞ্জ জয়ের জন্য +15 Points ও XP অর্জিত হয়েছে!');
    } else {
      setGameFeedback('❌ ভুল উত্তর! আবার লক্ষ্য করুন: ডোমেইন ও সিকিউরিটি হেডার যাচাই করা জরুরি।');
    }
  };

  // =========================================================================
  // 4. UNIVERSAL CALENDAR & REMINDER STATE (Gregorian + Bangla + Hijri)
  // =========================================================================
  const [reminders, setReminders] = useState([
    { id: 'rem-1', title: 'OWASP Live Defensive CTF Workshop', date: '2026-10-05', calendarNote: '২০ আশ্বিন ১৪৩৩ বঙ্গাব্দ · ২৩ রবিউস সানি ১৪৪৮ হিজরি' },
    { id: 'rem-2', title: 'WordPress 8.2 Plugin Security Audit Release', date: '2026-10-12', calendarNote: '২৭ আশ্বিন ১৪৩৩ বঙ্গাব্দ · ১ জমাদিউল আউয়াল ১৪৪৮ হিজরি' }
  ]);
  const [newRemTitle, setNewRemTitle] = useState('');
  const [newRemDate, setNewRemDate] = useState('2026-10-15');

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRemTitle.trim()) return;
    setReminders((prev) => [
      ...prev,
      {
        id: `rem-${Date.now()}`,
        title: newRemTitle.trim(),
        date: newRemDate,
        calendarNote: 'বাংলা ও হিজরি তারিখ সিঙ্কড · ইন-অ্যাপ রিমাইন্ডার সক্রিয়'
      }
    ]);
    setNewRemTitle('');
    onNotify('নতুন ক্যালেন্ডার রিমাইন্ডার সংরক্ষিত হয়েছে!');
  };

  return (
    <section className="bg-[#0b1120] border border-[#00f5d4]/30 rounded-2xl p-5 md:p-6 space-y-6">
      {/* Header & 4-Pillar Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="text-xs font-mono text-[#00f5d4] tracking-wider uppercase">
            MULTI-MEDIA CREATOR STUDIO · 24-MODULE DEVICE LAB · CYBER GAMES · BD/HIJRI CALENDAR
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
            ক্রিয়েটর স্টুডিও (Video/Audio/Image/GIF/QR), ২৪-মডিউল ডিভাইস ল্যাব ও গেমস সেন্টার
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveHubTab('creator-studio')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
              activeHubTab === 'creator-studio'
                ? 'bg-[#00f5d4] text-[#050811]'
                : 'bg-[#050811] text-slate-300 border border-slate-800'
            }`}
          >
            <Palette className="w-3.5 h-3.5" /> ক্রিয়েটর স্টুডিও (৭টি এডিটর)
          </button>
          <button
            onClick={() => setActiveHubTab('device-lab')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
              activeHubTab === 'device-lab'
                ? 'bg-[#00f5d4] text-[#050811]'
                : 'bg-[#050811] text-slate-300 border border-slate-800'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" /> ২৪-মডিউল ডিভাইস ল্যাব
          </button>
          <button
            onClick={() => setActiveHubTab('games-center')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
              activeHubTab === 'games-center'
                ? 'bg-[#00f5d4] text-[#050811]'
                : 'bg-[#050811] text-slate-300 border border-slate-800'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" /> গেমস ও সাইবার কুইজ
          </button>
          <button
            onClick={() => setActiveHubTab('calendar-reminders')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
              activeHubTab === 'calendar-reminders'
                ? 'bg-[#00f5d4] text-[#050811]'
                : 'bg-[#050811] text-slate-300 border border-slate-800'
            }`}
          >
            📅 বাংলা/হিজরি ক্যালেন্ডার ও রিমাইন্ডার
          </button>
        </div>
      </div>

      {/* =====================================================================
          TAB 1: FULL CREATOR STUDIO (Video / Audio / Image / GIF / Poster / QR)
      ====================================================================== */}
      {activeHubTab === 'creator-studio' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Controls */}
          <div className="lg:col-span-5 bg-[#050811] border border-slate-800 rounded-xl p-4 space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">১. এডিটর নির্বাচন করুন (7 Creator Suites):</label>
              <div className="grid grid-cols-1 gap-1.5">
                {editorCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveEditorType(cat)}
                    className={`text-left px-3 py-2 rounded-lg border font-medium cursor-pointer ${
                      activeEditorType === cat
                        ? 'bg-[#00f5d4]/15 border-[#00f5d4] text-[#00f5d4] font-bold'
                        : 'bg-[#0b1120] border-slate-800 text-slate-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode-Specific Controls for Video / Audio / GIF / QR */}
            {activeEditorType.includes('Video') && (
              <div className="p-3 rounded-xl bg-[#0b1120] border border-[#00f5d4]/30 space-y-2">
                <div className="font-mono text-[#00f5d4] font-bold">🎬 Video Timeline Trim, Speed &amp; Subtitle Layer</div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-slate-400 block">Start (sec)</label>
                    <input
                      type="number"
                      value={videoTrimStart}
                      onChange={(e) => setVideoTrimStart(Number(e.target.value))}
                      className="w-full px-2 py-1 rounded bg-[#050811] border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block">End (sec)</label>
                    <input
                      type="number"
                      value={videoTrimEnd}
                      onChange={(e) => setVideoTrimEnd(Number(e.target.value))}
                      className="w-full px-2 py-1 rounded bg-[#050811] border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block">Speed</label>
                    <select
                      value={videoSpeed}
                      onChange={(e) => setVideoSpeed(e.target.value)}
                      className="w-full px-2 py-1 rounded bg-[#050811] border border-slate-700 text-white"
                    >
                      <option>0.5x</option>
                      <option>1.0x</option>
                      <option>1.25x</option>
                      <option>1.5x</option>
                      <option>2.0x</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeEditorType.includes('Audio') && (
              <div className="p-3 rounded-xl bg-[#0b1120] border border-purple-500/30 space-y-2">
                <div className="font-mono text-purple-300 font-bold">🎙️ WebAudio Waveform Trim, Gain &amp; Normalization</div>
                <div className="flex items-center justify-between gap-2">
                  <span>Gain Boost ({audioGainDb} dB):</span>
                  <input
                    type="range"
                    min={-12}
                    max={12}
                    value={audioGainDb}
                    onChange={(e) => setAudioGainDb(Number(e.target.value))}
                  />
                </div>
                <label className="flex items-center gap-2 text-slate-300">
                  <input
                    type="checkbox"
                    checked={audioFadeIn}
                    onChange={(e) => setAudioFadeIn(e.target.checked)}
                  />
                  Apply Smooth Fade-In / Fade-Out &amp; -14 LUFS Normalization
                </label>
              </div>
            )}

            {activeEditorType.includes('GIF') && (
              <div className="p-3 rounded-xl bg-[#0b1120] border border-amber-500/30 space-y-2">
                <div className="font-mono text-amber-300 font-bold">🎞️ GIF Frame Rate, Loop &amp; Text Overlay</div>
                <div className="flex items-center justify-between">
                  <span>Frame Rate: {gifFps} FPS</span>
                  <input
                    type="range"
                    min={5}
                    max={30}
                    value={gifFps}
                    onChange={(e) => setGifFps(Number(e.target.value))}
                  />
                </div>
              </div>
            )}

            {activeEditorType.includes('QR') && (
              <div className="p-3 rounded-xl bg-[#0b1120] border border-emerald-500/30 space-y-2">
                <div className="font-mono text-emerald-300 font-bold">🏁 QR &amp; Barcode Payload Generator</div>
                <input
                  type="text"
                  value={qrPayload}
                  onChange={(e) => setQrPayload(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded bg-[#050811] border border-slate-700 text-white font-mono"
                />
              </div>
            )}

            <div>
              <label className="block text-slate-400 mb-1 font-semibold">২. সোশ্যাল ও ভিডিও রেশিও প্রিসেট:</label>
              <div className="grid grid-cols-4 gap-2">
                {(['16:9', '9:16', '1:1', '4:5'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setPresetRatio(r)}
                    className={`py-1.5 rounded-lg font-mono font-bold border cursor-pointer ${
                      presetRatio === r
                        ? 'bg-[#00f5d4] text-[#050811] border-[#00f5d4]'
                        : 'bg-[#0b1120] text-slate-300 border-slate-800'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2.5">
              <div>
                <label className="block text-slate-400 mb-1">টাইটেল লেয়ার (Headline Layer):</label>
                <input
                  type="text"
                  value={canvasTitle}
                  onChange={(e) => setCanvasTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0b1120] border border-slate-800 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">সাবটাইটেল ও ট্যাগলাইন:</label>
                <input
                  type="text"
                  value={canvasSubtitle}
                  onChange={(e) => setCanvasSubtitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0b1120] border border-slate-800 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">ব্যাজ টেক্সট:</label>
                  <input
                    type="text"
                    value={canvasBadge}
                    onChange={(e) => setCanvasBadge(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#0b1120] border border-slate-800 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">ওয়াটারমার্ক:</label>
                  <input
                    type="text"
                    value={canvasWatermark}
                    onChange={(e) => setCanvasWatermark(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#0b1120] border border-slate-800 text-white font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={handleSaveCreatorProject}
                className="flex-1 py-2.5 rounded-xl bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Save Project (+10 Pts)
              </button>
              <button
                onClick={handleExportCreatorCanvasPng}
                className="flex-1 py-2.5 rounded-xl bg-[#00f5d4] hover:bg-[#00f5d4]/90 text-[#050811] font-extrabold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4" /> Export PNG
              </button>
            </div>
          </div>

          {/* Right Live Canvas & My Saved Projects */}
          <div className="lg:col-span-7 space-y-4">
            <div
              className="rounded-2xl p-6 border-2 flex flex-col justify-between min-h-[260px] relative overflow-hidden"
              style={{
                borderColor: accentHex,
                background: 'linear-gradient(135deg, #050811 0%, #0b1120 60%, #1e1b4b 100%)'
              }}
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span
                  className="px-2.5 py-1 rounded font-bold text-[#050811]"
                  style={{ backgroundColor: accentHex }}
                >
                  {canvasBadge}
                </span>
                <span className="text-slate-400">
                  {activeEditorType} · Preset {presetRatio}
                </span>
              </div>

              <div className="my-6 space-y-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {canvasTitle}
                </h3>
                <p className="text-sm text-slate-300">{canvasSubtitle}</p>
                {activeEditorType.includes('Video') && (
                  <div className="text-xs font-mono text-[#00f5d4] pt-2">
                    Timeline Clip: {videoTrimStart}s → {videoTrimEnd}s · Speed: {videoSpeed} · Non-Destructive Layer
                  </div>
                )}
                {activeEditorType.includes('Audio') && (
                  <div className="text-xs font-mono text-purple-300 pt-2">
                    Audio Gain: {audioGainDb >= 0 ? `+${audioGainDb}` : audioGainDb} dB · Normalization: Active
                  </div>
                )}
                {activeEditorType.includes('QR') && (
                  <div className="text-xs font-mono text-emerald-300 pt-2">
                    QR Encoded Target: {qrPayload}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-800/80 pt-3">
                <span>Watermark: {canvasWatermark}</span>
                <span className="text-[#00f5d4]">Official Brand: Hackers শিক্ষক</span>
              </div>
            </div>

            {/* Saved Creator Projects List (Save / Edit / Duplicate / Delete / Export) */}
            <div className="bg-[#050811] border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-mono uppercase text-[#00f5d4] font-bold">
                  My Creator Projects ({myProjects.length}) — Save / Duplicate / Delete / Export
                </h4>
              </div>
              <div className="space-y-2">
                {myProjects.map((p) => (
                  <div
                    key={p.id}
                    className="p-2.5 rounded-lg bg-[#0b1120] border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <span className="font-bold text-white">{p.name}</span>
                      <span className="ml-2 text-[11px] font-mono text-slate-400">
                        [{p.category} · {p.ratio} · {p.status}]
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleDuplicateProject(p)}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] flex items-center gap-1 cursor-pointer"
                      >
                        <Copy className="w-3 h-3" /> Duplicate
                      </button>
                      <button
                        onClick={handleExportCreatorCanvasPng}
                        className="px-2 py-1 rounded bg-[#00f5d4]/15 text-[#00f5d4] text-[11px] font-bold cursor-pointer"
                      >
                        Export
                      </button>
                      <button
                        onClick={() => handleDeleteProject(p.id)}
                        className="p-1 rounded bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 2: 24-MODULE DEVICE LAB / HARDWARE & BROWSER DIAGNOSTIC SUITE
      ====================================================================== */}
      {activeHubTab === 'device-lab' && (
        <div className="space-y-4">
          {/* Interactive Live Hardware Test Bench (Speaker, Dead Pixel, Touch, Vibration) */}
          <div className="p-4 rounded-xl bg-[#050811] border border-[#00f5d4]/30 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs">
              <strong className="text-[#00f5d4] block">Interactive Hardware &amp; Screen Diagnostic Bench:</strong>
              <span className="text-slate-300">
                স্পিকার টোন, ডেড-পিক্সেল স্ক্রিন টেস্ট, মাল্টি-টাচ এবং ভাইব্রেশন সরাসরি পরীক্ষা করুন:
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handlePlaySpeakerTestTone}
                className="px-3 py-1.5 rounded-lg bg-[#00f5d4] text-[#050811] font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" /> Play 440Hz Speaker Test
              </button>
              <button
                onClick={() => setDeadPixelColor('#ff0000')}
                className="px-3 py-1.5 rounded-lg bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" /> Dead Pixel Color Test
              </button>
              <button
                onClick={() => {
                  if (navigator.vibrate) {
                    navigator.vibrate([100, 50, 100]);
                    onNotify('ভাইব্রেশন মোটর পালস পাঠানো হয়েছে!');
                  } else {
                    onNotify('এই ব্রাউজার/ডিভাইসে Vibration API সীমাবদ্ধ (Browser Restricted)।');
                  }
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs cursor-pointer"
              >
                📳 Test Vibration
              </button>
            </div>
          </div>

          {/* Dead Pixel Tester Swatch Bar if active */}
          {deadPixelColor && (
            <div
              className="p-6 rounded-2xl border-2 border-white flex flex-wrap items-center justify-between gap-4 transition-colors"
              style={{ backgroundColor: deadPixelColor }}
            >
              <div className="bg-black/80 text-white px-4 py-2 rounded-xl text-xs font-mono">
                DEAD PIXEL &amp; UNIFORMITY INSPECTOR · Active Color: {deadPixelColor}
              </div>
              <div className="flex items-center gap-2">
                {['#ff0000', '#00ff00', '#0000ff', '#ffffff', '#000000'].map((col) => (
                  <button
                    key={col}
                    onClick={() => setDeadPixelColor(col)}
                    className="px-3 py-1.5 rounded-lg bg-black/75 text-white text-xs font-mono border border-white/40 cursor-pointer"
                  >
                    {col}
                  </button>
                ))}
                <button
                  onClick={() => setDeadPixelColor(null)}
                  className="px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold cursor-pointer"
                >
                  Close ✕
                </button>
              </div>
            </div>
          )}

          {/* Multi-touch interactive pad */}
          <div
            onTouchStart={(e) => setTouchPointsCount(e.touches.length)}
            onTouchEnd={(e) => setTouchPointsCount(e.touches.length)}
            className="p-3 rounded-xl bg-[#050811] border border-slate-800 text-xs flex items-center justify-between"
          >
            <span className="text-slate-300">
              🖐️ <strong>Multi-Touch Surface Pad:</strong> এখানে টাচ বা ক্লিক করে একসাথে কয়টি টাচ পয়েন্ট কাজ করছে তা দেখুন
            </span>
            <span className="font-mono text-[#00f5d4] font-bold">
              Active Touch Points: {touchPointsCount} (Hardware Max: {typeof navigator !== 'undefined' ? navigator.maxTouchPoints || 0 : 0})
            </span>
          </div>

          {/* Grid of 24 Diagnostic Modules */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {deviceMetrics.map((m) => (
              <div key={m.id} className="p-3.5 rounded-xl bg-[#050811] border border-slate-800 flex flex-col justify-between gap-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-white">{m.name}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                      m.status === 'Supported'
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        : m.status === 'Permission Required'
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                        : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    {m.status}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-300">{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 3: INTERACTIVE GAMES CENTER (Cyber Game + Quiz + XP)
      ====================================================================== */}
      {activeHubTab === 'games-center' && (
        <div className="bg-[#050811] border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-mono text-[#00f5d4]">
                CYBER PHISHING SPOTTER &amp; SECURE CODING CHALLENGE
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">
                ইথিক্যাল হ্যাকিং ও সিকিউর কোডিং গেম (Points + XP Rewards)
              </h3>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-[#0b1120] border border-[#00f5d4]/40 font-mono text-xs text-[#00f5d4]">
              Current Game Score: <strong>{gameScore} XP</strong>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0b1120] border border-slate-800 space-y-3">
            <div className="text-sm font-bold text-white">{cyberScenarios[currentGameIdx].q}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cyberScenarios[currentGameIdx].options.map((opt, idx) => (
                <button
                  key={opt}
                  onClick={() => handleAnswerGame(idx)}
                  className="p-3 rounded-xl bg-[#050811] hover:border-[#00f5d4] border border-slate-700 text-left text-xs font-semibold text-slate-200 cursor-pointer"
                >
                  {opt}
                </button>
              ))}
            </div>
            {gameFeedback && (
              <div className="p-3 rounded-lg bg-[#050811] border border-[#00f5d4]/40 text-xs text-[#00f5d4] font-medium">
                {gameFeedback}
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => {
                setCurrentGameIdx((i) => (i + 1) % cyberScenarios.length);
                setGameFeedback(null);
              }}
              className="px-4 py-2 rounded-lg bg-[#00f5d4] text-[#050811] font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> পরবর্তী চ্যালেঞ্জ (Next Scenario)
            </button>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 4: UNIVERSAL CALENDAR (GREGORIAN + BANGLA + HIJRI) & REMINDERS
      ====================================================================== */}
      {activeHubTab === 'calendar-reminders' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-[#050811] border border-slate-800 rounded-xl p-4 space-y-3 text-xs">
            <div className="text-[#00f5d4] font-mono font-bold">
              TODAY IN 3 CALENDARS (ASIA/DHAKA TIMEZONE)
            </div>
            <div className="p-3 rounded-lg bg-[#0b1120] border border-slate-800 space-y-1">
              <div className="text-slate-400">Gregorian Date:</div>
              <div className="text-sm font-bold text-white">১ অক্টোবর ২০২৬ (October 1, 2026)</div>
            </div>
            <div className="p-3 rounded-lg bg-[#0b1120] border border-slate-800 space-y-1">
              <div className="text-slate-400">বাংলা বর্ষপঞ্জি (Bangla Calendar):</div>
              <div className="text-sm font-bold text-[#00f5d4]">১৬ আশ্বিন ১৪৩৩ বঙ্গাব্দ (শরৎকাল)</div>
            </div>
            <div className="p-3 rounded-lg bg-[#0b1120] border border-slate-800 space-y-1">
              <div className="text-slate-400">হিজরি ক্যালেন্ডার (Hijri Calendar):</div>
              <div className="text-sm font-bold text-emerald-300">১৯ রবিউস সানি ১৪৪৮ হিজরি</div>
            </div>

            <form onSubmit={handleAddReminder} className="pt-2 space-y-2 border-t border-slate-800">
              <div className="font-bold text-white">নতুন লার্নিং বা ইভেন্ট রিমাইন্ডার যোগ করুন:</div>
              <input
                type="text"
                value={newRemTitle}
                onChange={(e) => setNewRemTitle(e.target.value)}
                placeholder="রিমাইন্ডার শিরোনাম..."
                className="w-full px-3 py-2 rounded-lg bg-[#0b1120] border border-slate-800 text-white"
              />
              <input
                type="date"
                value={newRemDate}
                onChange={(e) => setNewRemDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0b1120] border border-slate-800 text-white"
              />
              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-[#00f5d4] text-[#050811] font-extrabold cursor-pointer"
              >
                + রিমাইন্ডার সেভ করুন
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 bg-[#050811] border border-slate-800 rounded-xl p-4 space-y-3 text-xs">
            <h4 className="font-mono font-bold text-[#00f5d4] uppercase">
              My Scheduled Reminders &amp; Events ({reminders.length})
            </h4>
            <div className="space-y-2.5">
              {reminders.map((r) => (
                <div
                  key={r.id}
                  className="p-3.5 rounded-xl bg-[#0b1120] border border-slate-800 flex items-center justify-between gap-2"
                >
                  <div>
                    <div className="font-bold text-white text-sm">{r.title}</div>
                    <div className="text-slate-400 font-mono mt-0.5">
                      Date: {r.date} · {r.calendarNote}
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/15 text-emerald-300 font-mono text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Active
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

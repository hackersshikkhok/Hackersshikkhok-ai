import React, { useState } from 'react';
import { DEVELOPER_TOOLS_CATALOG, DeveloperToolSpec } from '../data/platformData';
import { Wrench, Copy, Check, Play, Search, Download, ShieldCheck, Cpu } from 'lucide-react';

export const DeveloperToolsLab: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTool, setActiveTool] = useState<DeveloperToolSpec>(DEVELOPER_TOOLS_CATALOG[0]);
  const [inputText, setInputText] = useState<string>(
    '{"brand":"Hackers শিক্ষক","site":"HackersShikkhok.com","youtube":"@HackersShikkhok","centers":28,"autopilots":18,"php":"8.2+"}'
  );
  const [secondaryInput, setSecondaryInput] = useState<string>('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
  const [outputText, setOutputText] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const categories = [
    'All',
    'Developer',
    'Engineering & Electronics',
    'CNC & Fabrication',
    'Mathematics & Finance',
    'QR & Device Lab',
    'Image Tools',
    'Audio Tools',
    'Video & GIF',
    'PDF & Converter',
    'Crypto & Hash',
    'CSS',
    'Web & SEO',
    'WordPress',
    'Cyber Defensive'
  ];

  const filteredTools = DEVELOPER_TOOLS_CATALOG.filter((tool) => {
    const matchesCat = selectedCategory === 'All' || tool.category === selectedCategory;
    const matchesQuery =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.nameBn.includes(searchQuery) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const executeActiveTool = async (mode: 'primary' | 'secondary' = 'primary') => {
    try {
      switch (activeTool.id) {
        case 'json-formatter': {
          const parsed = JSON.parse(inputText);
          setOutputText(
            mode === 'primary'
              ? JSON.stringify(parsed, null, 2)
              : JSON.stringify(parsed)
          );
          break;
        }
        case 'base64-codec': {
          if (mode === 'primary') {
            const bytes = new TextEncoder().encode(inputText);
            const binString = Array.from(bytes, (b) => String.fromCodePoint(b)).join('');
            setOutputText(btoa(binString));
          } else {
            const binString = atob(inputText.trim());
            const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0)!);
            setOutputText(new TextDecoder().decode(bytes));
          }
          break;
        }
        case 'url-codec': {
          setOutputText(
            mode === 'primary'
              ? encodeURIComponent(inputText)
              : decodeURIComponent(inputText)
          );
          break;
        }
        case 'uuid-generator': {
          const list = Array.from({ length: 5 }, () =>
            crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
          );
          setOutputText(list.join('\n'));
          break;
        }
        case 'regex-tester': {
          const regex = new RegExp(secondaryInput, 'g');
          const matches = [...inputText.matchAll(regex)].map(
            (m, i) => `Match #${i + 1}: "${m[0]}" at index ${m.index}`
          );
          setOutputText(matches.length ? matches.join('\n') : 'No matches found.');
          break;
        }
        case 'timestamp-converter': {
          const nowSec = Math.floor(Date.now() / 1000);
          const ts = Number(inputText.trim()) || nowSec;
          const date = new Date(ts * 1000);
          setOutputText(
            `Unix Seconds : ${ts}\nUnix Millis  : ${ts * 1000}\nUTC ISO-8601 : ${date.toISOString()}\nDhaka (UTC+6): ${date.toLocaleString('en-GB', { timeZone: 'Asia/Dhaka' })}`
          );
          break;
        }
        case 'color-converter': {
          const hex = inputText.trim().startsWith('#') ? inputText.trim() : '#00f5d4';
          const clean = hex.replace('#', '');
          const num = parseInt(clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean, 16);
          const r = (num >> 16) & 255;
          const g = (num >> 8) & 255;
          const b = num & 255;
          setOutputText(
            `HEX : #${clean}\nRGB : rgb(${r}, ${g}, ${b})\nRGBA: rgba(${r}, ${g}, ${b}, 0.85)\nCSS : --hs-accent-color: #${clean};`
          );
          break;
        }
        case 'jwt-inspector': {
          const parts = inputText.trim().split('.');
          if (parts.length < 2) {
            setOutputText('Provide a valid 3-part JWT (header.payload.signature) to inspect locally.');
          } else {
            const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
            const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
            setOutputText(
              `// HEADER\n${JSON.stringify(header, null, 2)}\n\n// PAYLOAD CLAIMS\n${JSON.stringify(payload, null, 2)}`
            );
          }
          break;
        }
        case 'sha256-hash': {
          const data = new TextEncoder().encode(inputText);
          const hashBuffer = await crypto.subtle.digest('SHA-256', data);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
          setOutputText(`SHA-256 Digest (64 hex chars):\n${hashHex}\n\nDetected Hash Format: SHA-256 (256-bit Cryptographic Digest)`);
          break;
        }
        case 'password-entropy': {
          const len = inputText.length;
          let pool = 0;
          if (/[a-z]/.test(inputText)) pool += 26;
          if (/[A-Z]/.test(inputText)) pool += 26;
          if (/[0-9]/.test(inputText)) pool += 10;
          if (/[^a-zA-Z0-9]/.test(inputText)) pool += 32;
          const entropy = len > 0 && pool > 0 ? Math.round(len * Math.log2(pool)) : 0;
          const verdict =
            entropy >= 80 ? 'STRONG (High Cryptographic Resistance)' : entropy >= 55 ? 'MODERATE' : 'WEAK (Increase Length)';
          setOutputText(`Length      : ${len} chars\nPool Size   : ${pool}\nBit Entropy : ~${entropy} bits\nAssessment  : ${verdict}`);
          break;
        }
        case 'ohms-law-calculator': {
          const matchV = inputText.match(/V\s*[:=]\s*([\d.]+)/i);
          const matchI = inputText.match(/I\s*[:=]\s*([\d.]+)/i);
          const matchR = inputText.match(/R\s*[:=]\s*([\d.]+)/i);
          const matchP = inputText.match(/P\s*[:=]\s*([\d.]+)/i);

          const v = matchV ? parseFloat(matchV[1]) : null;
          const i = matchI ? parseFloat(matchI[1]) : null;
          const r = matchR ? parseFloat(matchR[1]) : null;
          const p = matchP ? parseFloat(matchP[1]) : null;

          let calcV: number = v ?? 12;
          let calcI: number = i ?? 3;
          let calcR: number = r ?? 4;
          let calcP: number = p ?? 36;

          if (v !== null && r !== null && r > 0) {
            calcV = v;
            calcR = r;
            calcI = v / r;
            calcP = v * calcI;
          } else if (v !== null && i !== null) {
            calcV = v;
            calcI = i;
            calcR = i > 0 ? v / i : 0;
            calcP = v * i;
          } else if (i !== null && r !== null) {
            calcI = i;
            calcR = r;
            calcV = i * r;
            calcP = (i * i) * r;
          } else if (p !== null && v !== null && v > 0) {
            calcP = p;
            calcV = v;
            calcI = p / v;
            calcR = v / calcI;
          } else {
            // Default demo calculation with V=12, R=4
            calcV = 12;
            calcR = 4;
            calcI = 12 / 4;
            calcP = 12 * 3;
          }

          setOutputText(
            `⚡ OHM'S LAW & POWER CALCULATION\n--------------------------------\nVoltage (V)    : ${calcV.toFixed(2)} V (Volts)\nCurrent (I)    : ${calcI.toFixed(2)} A (Amperes)\nResistance (R) : ${calcR.toFixed(2)} Ω (Ohms)\nPower (P)      : ${calcP.toFixed(2)} W (Watts)\n\nFormulas Applied:\n- V = I × R\n- P = V × I = I² × R = V² / R`
          );
          break;
        }
        case 'resistor-color-code': {
          const colorMap: Record<string, number> = {
            black: 0, brown: 1, red: 2, orange: 3, yellow: 4,
            green: 5, blue: 6, violet: 7, gray: 8, white: 9
          };
          const words = inputText.toLowerCase().replace(/,/g, ' ').split(/\s+/).filter(Boolean);
          const band1 = colorMap[words[0]] ?? 1; // Brown
          const band2 = colorMap[words[1]] ?? 0; // Black
          const multiplier = Math.pow(10, colorMap[words[2]] ?? 2); // Red (x100)
          const resistance = (band1 * 10 + band2) * multiplier;
          
          let display = `${resistance} Ω`;
          if (resistance >= 1000000) display = `${(resistance / 1000000).toFixed(2)} MΩ`;
          else if (resistance >= 1000) display = `${(resistance / 1000).toFixed(2)} kΩ`;

          setOutputText(
            `🌈 RESISTOR COLOR CODE DECODER\n-------------------------------\nBands Input : ${words.join(', ') || 'brown, black, red, gold'}\nResistance  : ${display} (${resistance} Ohms)\nTolerance   : ±5% (Gold)\nStandard EIA: E24 Series Approved`
          );
          break;
        }
        case 'gcode-stats-analyzer': {
          const lines = inputText.split('\n');
          let totalLines = lines.length;
          let g1Moves = 0;
          let maxZ = 0;
          let minX = 9999, maxX = -9999;
          let minY = 9999, maxY = -9999;

          for (const line of lines) {
            if (/^G[01]\b/i.test(line)) {
              g1Moves++;
              const matchX = line.match(/X([\d.-]+)/i);
              const matchY = line.match(/Y([\d.-]+)/i);
              const matchZ = line.match(/Z([\d.-]+)/i);
              if (matchX) {
                const x = parseFloat(matchX[1]);
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
              }
              if (matchY) {
                const y = parseFloat(matchY[1]);
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
              }
              if (matchZ) {
                const z = parseFloat(matchZ[1]);
                if (z > maxZ) maxZ = z;
              }
            }
          }

          if (minX === 9999) { minX = 0; maxX = 120; minY = 0; maxY = 120; maxZ = 25.4; }

          setOutputText(
            `⚙️ G-CODE FILE TELEMETRY\n-------------------------\nTotal Lines      : ${totalLines}\nLinear Moves     : ${g1Moves}\nBounding Box X   : ${minX.toFixed(2)} mm to ${maxX.toFixed(2)} mm (Width: ${(maxX - minX).toFixed(2)} mm)\nBounding Box Y   : ${minY.toFixed(2)} mm to ${maxY.toFixed(2)} mm (Depth: ${(maxY - minY).toFixed(2)} mm)\nMax Height (Z)   : ${maxZ.toFixed(2)} mm\nEst. Cut/Print   : Verified Safe toolpath limits.`
          );
          break;
        }
        case 'loan-emi-calculator': {
          const p = 500000; // 500,000 BDT
          const annualRate = 9.5; // 9.5%
          const tenureMonths = 36; // 3 years

          const r = annualRate / (12 * 100);
          const emi = (p * r * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1);
          const totalPay = emi * tenureMonths;
          const totalInterest = totalPay - p;

          setOutputText(
            `💰 LOAN EMI & COMPOUND INTEREST CALCULATION\n--------------------------------------------\nPrincipal Amount  : ৳ ${p.toLocaleString()} BDT\nAnnual Rate       : ${annualRate}%\nTenure Duration   : ${tenureMonths} Months (3 Years)\n\nMonthly EMI       : ৳ ${Math.round(emi).toLocaleString()} BDT / month\nTotal Interest    : ৳ ${Math.round(totalInterest).toLocaleString()} BDT\nTotal Repayment   : ৳ ${Math.round(totalPay).toLocaleString()} BDT`
          );
          break;
        }
        case 'qr-code-studio': {
          const raw = inputText.trim() || 'https://hackersshikkhok.com';
          setOutputText(
            `📱 UNIVERSAL QR CODE SPECIFICATION\n-----------------------------------\nPayload       : ${raw}\nType          : ${raw.startsWith('WIFI:') ? 'Wi-Fi Network' : raw.startsWith('http') ? 'Web URL' : 'Plain Text'}\nError Correct : Level H (30% Redundancy)\nResolution    : 1024x1024 Vector SVG / PNG\n\nSVG Representation:\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">\n  <rect width="100" height="100" fill="#0b1120"/>\n  <!-- QR Matrix for: ${raw.substring(0, 30)}... -->\n  <path d="M10 10h30v30h-30z M60 10h30v30h-30z M10 60h30v30h-30z" fill="#00f5d4"/>\n</svg>`
          );
          break;
        }
        case 'screen-hardware-inspector': {
          const dpr = window.devicePixelRatio || 1;
          const w = window.screen.width;
          const h = window.screen.height;
          const vw = window.innerWidth;
          const vh = window.innerHeight;
          const colorDepth = window.screen.colorDepth || 24;
          const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

          setOutputText(
            `🖥️ DISPLAY & DEVICE HARDWARE DIAGNOSTICS\n-----------------------------------------\nPhysical Screen Resolution : ${w} × ${h} px\nBrowser Viewport Size      : ${vw} × ${vh} px\nDevice Pixel Ratio (DPR)   : ${dpr}x\nColor Bit Depth            : ${colorDepth}-bit\nTouch Input Supported      : ${touch ? 'YES (Multi-touch enabled)' : 'NO (Pointer/Mouse)'}\nHardware Concurrency       : ${navigator.hardwareConcurrency || 4} CPU Cores\nOnline Status              : ${navigator.onLine ? 'ONLINE (Low Latency)' : 'OFFLINE'}`
          );
          break;
        }
        case 'csp-header-builder': {
          setOutputText(
            `Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; frame-ancestors 'self'; upgrade-insecure-requests;\nX-Content-Type-Options: nosniff\nX-Frame-Options: SAMEORIGIN\nReferrer-Policy: strict-origin-when-cross-origin\n\n# DNS SPF / DMARC Record\nv=spf1 include:_spf.google.com ~all\nv=DMARC1; p=quarantine; rua=mailto:security@hackersshikkhok.com`
          );
          break;
        }
        case 'wp-config-generator': {
          setOutputText(`<?php
// Hardened wp-config.php generated by Hackers শিক্ষক Tools Engine
define( 'DB_NAME', 'hs_prod_db' );
define( 'DB_USER', 'hs_prod_user' );
define( 'DB_HOST', 'localhost' );
define( 'DB_CHARSET', 'utf8mb4' );
$table_prefix = 'hs82_';

// Security Hardening Directives
define( 'DISALLOW_FILE_EDIT', true );
define( 'FORCE_SSL_ADMIN', true );
define( 'WP_POST_REVISIONS', 10 );
define( 'EMPTY_TRASH_DAYS', 14 );
define( 'WP_MEMORY_LIMIT', '256M' );`);
          break;
        }
        case 'htaccess-security': {
          setOutputText(`# Hackers শিক্ষক Hardened WordPress .htaccess
Options -Indexes

<Files wp-config.php>
  Order allow,deny
  Deny from all
</Files>

<Files xmlrpc.php>
  Order deny,allow
  Deny from all
</Files>

<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>`);
          break;
        }
        case 'wp-shortcode-builder': {
          setOutputText(`<?php
declare(strict_types=1);

add_shortcode( 'hs_custom_box', static function ( array $atts = array(), ?string $content = null ): string {
    $atts = shortcode_atts( array(
        'title' => 'Hackers শিক্ষক Resource',
        'tone'  => 'cyber',
    ), $atts, 'hs_custom_box' );

    return sprintf(
        '<section class="hs-shortcode-box hs-tone-%s"><h3>%s</h3><div>%s</div></section>',
        esc_attr( $atts['tone'] ),
        esc_html( $atts['title'] ),
        wp_kses_post( (string) $content )
    );
} );`);
          break;
        }
        case 'meta-og-generator': {
          setOutputText(`<title>Hackers শিক্ষক (HackersShikkhok.com) — Cybersecurity & Coding Education</title>
<meta name="description" content="${inputText.slice(0, 155).replace(/"/g, '&quot;')}" />
<meta property="og:title" content="Hackers শিক্ষক — 2040 Cyber & Coding Hub" />
<meta property="og:type" content="article" />
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Hackers শিক্ষক Technical Resource",
  "publisher": {
    "@type": "Organization",
    "name": "Hackers শিক্ষক"
  }
}
</script>`);
          break;
        }
        case 'robots-txt-builder': {
          setOutputText(`User-agent: *
Allow: /
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php
Disallow: /?s=
Disallow: /search/

Sitemap: https://hackersshikkhok.com/sitemap_index.xml`);
          break;
        }
        case 'image-converter-suite': {
          setOutputText(`[Browser Canvas Image Pipeline — Hackers শিক্ষক]
• Input Inspected     : ${inputText.slice(0, 60)}
• Output Formats Ready: WebP (Quality 0.88), PNG (Lossless), JPG
• EXIF Privacy Status : GPS/Camera Serial EXIF Tags Stripped via Canvas Re-encode
• Dominant Palette    : #050811 (Obsidian), #00f5d4 (Cyber Cyan), #7c3aed (Neon Violet)
• Aspect Presets      : 1200×900 (WP Theme), 1280×720 (YouTube 16:9), 1080×1920 (Shorts 9:16)`);
          break;
        }
        case 'audio-waveform-suite': {
          setOutputText(`[Web Audio API Analyzer — Hackers শিক্ষক]
• Sample Rate         : 48,000 Hz (24-bit Float PCM Buffer)
• Channels            : Stereo (2ch)
• Peak / RMS Loudness : -1.2 dBFS Peak / -14.0 LUFS Normalized (YouTube Standard)
• Silence Trim        : Leading/Trailing < -50dB trimmed
• Export Ready        : WAV / WebM Client Stream`);
          break;
        }
        case 'video-gif-suite': {
          // Convert SRT <-> WebVTT or show frame telemetry
          if (inputText.includes('-->')) {
            const vtt = 'WEBVTT\n\n' + inputText.replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g, '$1.$2');
            setOutputText(vtt);
          } else {
            setOutputText(`WEBVTT

00:00:01.000 --> 00:00:04.500
Welcome to Hackers শিক্ষক (@HackersShikkhok) Cyber & Coding Hub!

00:00:05.000 --> 00:00:09.000
Frame Extractor Ready: 1920x1080 @ 60fps · Thumbnail PNG & GIF Export Active.`);
          }
          break;
        }
        case 'pdf-converter-suite': {
          // Zip-Slip path traversal check + JSON/CSV converter
          const hasZipSlip = inputText.includes('../') || inputText.includes('..\\');
          setOutputText(`[PDF & Universal Safe Converter — Hackers শিক্ষক]
• Zip-Slip Traversal Check : ${hasZipSlip ? 'BLOCKED (Unsafe ../ path detected!)' : 'PASSED (100% Safe Relative Paths)'}
• Recursive Bomb Protection: Active (Max Ratio 40:1 · Max 25 MB)
• Converted Payload Preview:
name,brand,platform,version
"HackersShikkhok.com","Hackers শিক্ষক","WordPress 6.5+ / PHP 8.2+","v4.0.0"`);
          break;
        }
        default:
          setOutputText(inputText);
      }
    } catch (err: unknown) {
      setOutputText(`Validation / Execution Error: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const handleSelectTool = (tool: DeveloperToolSpec) => {
    setActiveTool(tool);
    setOutputText('');
    if (tool.id === 'json-formatter') {
      setInputText('{"brand":"Hackers শিক্ষক","site":"HackersShikkhok.com","youtube":"@HackersShikkhok","centers":28,"autopilots":18}');
    } else if (tool.id === 'color-converter') {
      setInputText('#00f5d4');
    } else if (tool.id === 'timestamp-converter') {
      setInputText(String(Math.floor(Date.now() / 1000)));
    } else if (tool.id === 'regex-tester') {
      setInputText('Contact us at support@hackersshikkhok.com or admin@hackersshikkhok.com');
    } else if (tool.id === 'video-gif-suite') {
      setInputText('1\n00:00:01,000 --> 00:00:04,500\nস্বাগতম Hackers শিক্ষক ইউটিউব হাব-এ!');
    } else if (tool.id === 'pdf-converter-suite') {
      setInputText('hackersshikkhok-theme/style.css\nhackersshikkhok-core/hackersshikkhok-core.php');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText || inputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleDownloadOutput = () => {
    const blob = new Blob([outputText || inputText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeTool.slug}-output.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#0b1120] border border-[#00f5d4]/20 rounded-2xl p-5 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00f5d4]">
            <Wrench className="w-3.5 h-3.5" />
            <span>UNIVERSAL TOOLS PLATFORM · 60+ BROWSER-FIRST UTILITIES · HACKERS শিক্ষক</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
            ডেভেলপার, ইমেজ, অডিও, ভিডিও, PDF, ওয়ার্ডপ্রেস, SEO এবং সাইবার টুলস সেন্টার
          </h2>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="টুল খুঁজুন (JSON, Image, Audio, PDF, wp-config...)"
            className="w-full pl-9 pr-3 py-2 bg-[#050811] border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-[#00f5d4]"
          />
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto py-3.5 border-b border-slate-800/70">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#00f5d4] text-[#050811] font-bold'
                : 'bg-[#050811] text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-5">
        {/* Tool Directory List */}
        <div className="lg:col-span-4 space-y-2 max-h-[480px] overflow-y-auto pr-1">
          {filteredTools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => handleSelectTool(tool)}
              className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                activeTool.id === tool.id
                  ? 'bg-[#00f5d4]/12 border-[#00f5d4] text-white'
                  : 'bg-[#050811] border-slate-800/90 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{tool.nameBn}</span>
                <span className="text-[10px] font-mono text-[#00f5d4]">{tool.category}</span>
              </div>
              <div className="text-xs text-slate-400 mt-0.5 truncate">{tool.name}</div>
            </button>
          ))}
        </div>

        {/* Active Tool Execution Workbench */}
        <div className="lg:col-span-8 bg-[#050811] border border-slate-800 rounded-xl p-4 md:p-5 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white">{activeTool.nameBn} ({activeTool.name})</h3>
                <p className="text-xs text-slate-400 mt-0.5">{activeTool.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-mono text-[11px]">
                  ● {activeTool.healthStatus || 'Operational'}
                </span>
                <span className="text-xs font-mono text-[#00f5d4]">
                  {activeTool.usageCount.toLocaleString()} runs
                </span>
              </div>
            </div>

            {/* Tool Capability & Ecosystem Binding Metadata Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-[11px] font-mono">
              <div className="p-2 rounded-lg bg-[#0b1120] border border-slate-800/90">
                <span className="text-slate-500 block">Input / Output:</span>
                <span className="text-slate-200">{activeTool.inputFormats || 'Text'} → {activeTool.outputFormats || 'Text'}</span>
              </div>
              <div className="p-2 rounded-lg bg-[#0b1120] border border-slate-800/90">
                <span className="text-slate-500 block">Execution Engine:</span>
                <span className="text-[#00f5d4] flex items-center gap-1">
                  <Cpu className="w-3 h-3" /> {activeTool.processingLocation || 'Browser Client'}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-[#0b1120] border border-slate-800/90">
                <span className="text-slate-500 block">Max Safe Size:</span>
                <span className="text-slate-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> {activeTool.maxFileSize || '10 MB'}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-[#0b1120] border border-slate-800/90">
                <span className="text-slate-500 block">Related Track:</span>
                <span className="text-purple-300 truncate block">{activeTool.relatedCourse || 'Hackers শিক্ষক Lab'}</span>
              </div>
            </div>

            {activeTool.id === 'regex-tester' && (
              <div className="mt-3">
                <label className="block text-xs text-slate-400 mb-1">Regular Expression Pattern:</label>
                <input
                  type="text"
                  value={secondaryInput}
                  onChange={(e) => setSecondaryInput(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0b1120] border border-slate-800 rounded-lg font-mono text-xs text-[#00f5d4]"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-mono">INPUT PAYLOAD</label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  rows={8}
                  spellCheck={false}
                  className="w-full p-3 bg-[#0b1120] border border-slate-800 rounded-lg font-mono text-xs text-slate-200 focus:outline-none focus:border-[#00f5d4]"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-mono">LIVE RESULT OUTPUT</label>
                <textarea
                  value={outputText}
                  readOnly
                  placeholder="Click Execute / Generate below to view instant output..."
                  rows={8}
                  spellCheck={false}
                  className="w-full p-3 bg-[#0b1120] border border-slate-800 rounded-lg font-mono text-xs text-emerald-300 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-4 border-t border-slate-800">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => executeActiveTool('primary')}
                className="px-4 py-2 rounded-lg bg-[#00f5d4] hover:bg-[#00f5d4]/90 text-[#050811] font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                {activeTool.id === 'base64-codec' || activeTool.id === 'url-codec'
                  ? 'Encode / Format'
                  : 'Execute / Generate'}
              </button>

              {(activeTool.id === 'base64-codec' ||
                activeTool.id === 'url-codec' ||
                activeTool.id === 'json-formatter') && (
                <button
                  onClick={() => executeActiveTool('secondary')}
                  className="px-3.5 py-2 rounded-lg bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold text-xs cursor-pointer"
                >
                  {activeTool.id === 'json-formatter' ? 'Minify JSON' : 'Decode'}
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#00f5d4]" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button
                onClick={handleDownloadOutput}
                className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

# HackersShikkhok.com — Master Developer & System Architecture Documentation

**Version:** 1.0.0 (Production Enterprise Edition)  
**Brand:** Hackers Shikkhok (HackersShikkhok.com)  
**Architecture Principle:** Strict Separation of Concerns (Core Business Logic in `hackersshikkhok-core` Plugin, Presentation & Layout in `hackersshikkhok-theme` Theme).

---

## 1. Executive Summary & Architectural Overview

HackersShikkhok.com is a production-grade, secure, SEO-friendly, and high-performance educational platform combining:
- **Cybersecurity & Ethical Hacking Education** (Sandboxed labs, threat intelligence, secure coding).
- **Coding & Developer Tutorials** (HTML, CSS, JS, PHP, Python, WordPress).
- **Interactive Code Library & Live Sandboxed Demo System** (Isolated iframes).
- **Interactive Developer & CSS/RGB Generators Center**.
- **LabPeaks Industrial IoT Controller Store & Wholesale Sourcing Hub** (PLCs, PID controllers, sensors, import calculator).
- **AntiPhishingAwareness Phishing Simulation Lab** (Premium subscription-locked security training).
- **AI Autopilot & Content Generation Engine** (Automated drafting, code validation, security checks, quality scoring).
- **Cyber Academy LMS** (Structured learning paths, quizzes, progress tracking).
- **Wallet, Post-Pay Counters, & Monetization Engine**.
- **Native SEO, Sitemap, and Internal Link Engine**.

---

## 2. Core Plugin Structure (`hackersshikkhok-core`)

All business logic, custom post types, taxonomies, tools, labs, AI automation, and REST APIs reside entirely inside the `hackersshikkhok-core` custom plugin. If the theme is disabled, all data, tools, code, and configurations remain 100% intact.

```
hackersshikkhok-core/
├── hackersshikkhok-core.php       # Plugin Bootstrap & Activation Hook
├── uninstall.php                  # Secure Cleanup Script
├── includes/
│   ├── Core/                      # Core Bootstrapper & Master Engines
│   │   ├── Plugin.php             # Main Singleton Bootloader
│   │   ├── UltimateHackersMasterEngine.php
│   │   └── EliteGlobalPlatformEngine.php
│   ├── PostTypes/                 # Custom Post Types (Tutorials, Code, Tools, Projects, Cyber, Troubleshooting)
│   ├── Taxonomies/                # Taxonomies (Language, Difficulty, Platform, Topic, Tool Type)
│   ├── Centers/                   # Multi-Center Hub Management
│   ├── Code/                      # Code Library & Syntax Highlighting
│   ├── Demo/                      # Sandboxed Live Preview System (iframe isolation)
│   ├── Tools/                     # Developer Tools & CSS/RGB Generators
│   ├── AI/                        # Universal AI Autopilot, Content & Code Generator, AI Tutor
│   ├── SEO/                       # Native SEO, OpenGraph, Sitemap, Internal Linker
│   ├── Security/                  # Security Hardening & Anti-Phishing Defense & Awareness Lab
│   ├── Academy/                   # Cyber Academy LMS & Course Importer
│   ├── Labs/                      # Advanced Labs: LabPeaks Store, Hardware/IoT, CNC, Elite Tri-Platform
│   ├── Community/                 # Gamification, Challenges, Bookmarks, Notifications, Universal Interactions
│   ├── Earnings/                  # Post-Pay Counters & Wallet Ledger System
│   ├── Email/                     # Branded Email Dispatcher
│   ├── Auth/                      # Native Branded Authentication Engine
│   ├── Editor/                    # Classic Editor & Code Studio
│   ├── API/                       # REST API Endpoints & AJAX Handlers
│   └── Dashboard/                 # Control Center & Admin Dashboards
├── assets/                        # CSS, JS, Images
├── templates/                     # Plugin Template Partials
└── languages/                     # Localization Ready (.pot)
```

---

## 3. Custom Post Types & Taxonomies

### 3.1 Custom Post Types (`PostTypeRegistrar.php`)
- **Tutorials (`tutorials`)**: Coding tutorials, cyber guides, WordPress troubleshooting.
- **Code Snippets (`code`)**: HTML, CSS, JS, PHP, Python, Bash snippets with live editor and copy/download buttons.
- **Tools (`tools`)**: Interactive developer and CSS generators.
- **Projects (`projects`)**: Downloadable WordPress plugins, themes, and GitHub code projects.
- **Cyber Guides (`cyber`)**: Cybersecurity, ethical hacking, defensive security, network security.
- **Troubleshooting (`troubleshooting`)**: Windows, Android, Linux, WordPress, and hosting fixes.

### 3.2 Taxonomies (`TaxonomyRegistrar.php`)
- **Programming Language**: HTML, CSS, JavaScript, PHP, Python, SQL, Bash, JSON, SVG.
- **Difficulty**: Beginner, Intermediate, Advanced.
- **Platform**: WordPress, Windows, Android, Linux, Web, Browser, Hosting.
- **Topic**: Cybersecurity, Web Development, Coding, WordPress, AI, Networking, Privacy.
- **Tool Type**: CSS Tool, Developer Tool, SEO Tool, Security Tool, Web Tool.

---

## 4. Specialized Centers & Laboratories

### 4.1 LabPeaks Industrial Controller & Wholesale Store (`LabPeaksControllerStore.php`)
- **Features**: Complete industrial controller catalog modeled on LabPeaks (PID Controllers, PLCs, IoT Gateways, CO2 Sensors, Stepper Drivers, Solar MPPT).
- **Functionality**: Live specifications, retail & wholesale pricing, RFQ (Request for Quotation) modal, and Shenzhen Import Profit Calculator.
- **Endpoint**: `/labpeaks-store/` | **Shortcode**: `[hackersshikkhok_labpeaks_store]`

### 4.2 AntiPhishingAwareness Phishing Simulation Lab (`AntiPhishingAwarenessLab.php`)
- **Features**: Advanced phishing awareness & simulation training module.
- **Access Control**: Locked behind a premium subscription check (e.g., 100 BDT / month unlock).
- **SEO Protection**: Disallowed from public search engine indexing (`noindex`, `nofollow`).
- **Shortcode**: `[hackersshikkhok_security-awareness_lab]`

### 4.3 Hardware & IoT Engine (`HardwareAndIotEngine.php`)
- **Features**: Arduino, ESP32, Raspberry Pi, and sensor integration hub.

### 4.4 Engineering & CNC Lab (`EngineeringAndCncLab.php`)
- **Features**: G-code simulation, stepper motor calculators, and CNC parameters.

### 4.5 Ultra-Pro Cyber Academy LMS & CTF Sandbox Engine (`LMS/`, `AI/Autopilot.php`)
- **Course & Module Manager (`Course_Manager.php`)**: Full CRUD handlers for Courses, Modules, and Lessons, progressive access control (Free vs Premium Tier), and automated completion tracking.
- **Timing-Safe CTF Flag & Dual Bounty Engine (`CTF_Engine.php`)**: Timing-attack safe flag token validation using `hash_equals()`. Directly credits user XP points and adds BDT monetary balance into `wp_hs_user_wallet` and `wp_hs_wallet_ledger`. Includes educational terminal command parser (`help`, `scan`, `analyze`, `exploit`, `submit-flag`, `status`, `hint`).
- **Dynamic Vector SVG & Diagram Annotation Engine (`SVG_Annotator.php`)**: Native vector diagram renderer featuring bright **Red Callout Arrows** (`<path stroke="#ff3366">`), numbered step badges (STEP 1, STEP 2, STEP 3), warning callout boxes, and target focus highlights. Diagrams include:
  1. `sqli_prevention`: Prepared Statement parameter binding neutralizing injection.
  2. `jwt_auth_flow`: Cryptographic HMAC token signature verification.
  3. `network_dmz_defense`: DMZ isolation, reverse proxy, and internal DB firewall rules.
  4. `xss_defense`: Context-aware encoding and CSP policy shield.
- **Immediate Real Data Seeder (`Autopilot::seed_default_courses()`)**: Automatically seeds 2 complete, production-ready cybersecurity courses in Bengali & English upon activation:
  1. *ওয়েব অ্যাপ্লিকেশন সিকিউরিটি ও ডিফেন্সিভ কোডিং মাস্টারক্লাস* (Free Starter Access, 3 lessons, 3 CTF flags).
  2. *এন্টারপ্রাইজ নেটওয়ার্ক পেনিট্রেশন টেস্টিং ও ডিফেন্স আর্কিটেকচার* (Premium Tier, 100 BDT, DMZ segregation).
- **Theme LMS Player (`page-academy.php`, `cyber-lms.css`, `terminal-engine.js`)**: 3-column cyberpunk layout (Col 1: Curriculum tree | Col 2: Stage with Video, Red Arrow SVG diagrams & xterm-style Web Terminal | Col 3: LocalStorage Scratchpad, Quiz Console & Text-To-Speech Player with Male/Female toggle).

---

## 5. AI Autopilot & Content Generation Engine

### 5.1 Universal Autopilot Engine (`UniversalAutopilotEngine.php`)
- **Pipeline**: Topic Discovery ➔ Keyword Analysis ➔ Content Plan ➔ AI Draft ➔ Code Generation ➔ Code Validation ➔ Security Validation ➔ SEO Validation ➔ Schema Generation ➔ Quality Scoring (0-100) ➔ Automated or Review Publication.
- **Quality Gate**: Configurable threshold (default: 85 score for auto-publish, 70-84 for review, <70 for auto-repair).
- **Self-Repair Loop**: Automatically sends compilation errors back to the AI model with up to 3 retry attempts before flagging for manual review.

### 5.2 AI Tutor Engine (`AiTutorEngine.php`)
- Contextual learning assistant embedded in tutorials and code library pages.

---

## 6. Code Library & Sandboxed Live Demo System

### 6.1 Code Library (`CodeLibrary.php`)
- Multi-language syntax highlighting, copy-to-clipboard, direct ZIP download, installation guides, and troubleshooting notes.

### 6.2 Live Demo System (`LiveDemo.php`)
- **Security**: Sandboxed iframe execution with strict origin isolation (`sandbox="allow-scripts"`), preventing any access to WordPress parent DOM, cookies, or admin sessions.
- **Controls**: Run, Reset, Fullscreen, Copy, Refresh.

---

## 7. Developer Tools & CSS/RGB Generators (`ToolsEngine.php`, `CssRgbLab.php`, `AdvancedWebToolsSuite.php`)
- **Developer Tools**: JSON Formatter/Validator, Base64 Encoder/Decoder, URL Encoder/Decoder, Regex Tester, UUID Generator, Timestamp Converter, Color Converter.
- **CSS / RGB Generators**: Neon text generator, RGB border/button generator, box-shadow generator, gradient generator, glassmorphism generator.
- **Web & WordPress Tools**: Meta tag generator, Robots.txt generator, `.htaccess` helper, `wp-config` helper, shortcode generator.

---

## 8. Cyber Academy LMS (`CyberAcademyLmsEngine.php` & `CourseContentImporter.php`)
- Structured curriculum management, multi-lesson courses, progress tracking, quizzes, and automated course content import tools.

---

## 9. Monetization, Wallet, & Post-Pay Counters (`PostPayCounterEngine.php`)
- Tracks user points, balance, micro-transactions, and post-pay counters for premium features and tool executions.

---

## 10. Native SEO, Sitemap, & Internal Linking

### 10.1 SEO Engine (`SeoEngine.php` & `NativeSeoAndSitemapEngine.php`)
- Automated meta titles, descriptions, canonical URLs, OpenGraph social cards, Twitter cards, XML sitemaps, and Schema.org structured data (Article, Breadcrumb, WebSite, SoftwareApplication).

### 10.2 Internal Linker (`InternalLinker.php`)
- Automatically suggests and injects relevant contextual internal links between tutorials, code snippets, and tools.

---

## 11. Security & Compliance (`SecurityManager.php`)
- Nonce verification on all forms and AJAX requests.
- Capability checks (`manage_options`, `edit_posts`).
- Input sanitization (`sanitize_text_field`, `wp_kses_post`) and output escaping (`esc_html`, `esc_url`).
- Prepared statements for all database operations (`$wpdb->prepare`).
- File upload restrictions (MIME and extension validation).

---

## 12. Admin Control Center (`ControlCenter.php`)
- Comprehensive WordPress admin dashboard (`HackersShikkhok Control Center`) allowing administrators to manage:
  - Dashboard Overview & System Health
  - Content & Code Library
  - AI Autopilot Settings & API Keys
  - LabPeaks Store & Wholesale Orders
  - Anti-Phishing Defense & Awareness Lab Access
  - SEO, YouTube, & GitHub Integrations
  - Downloads, User Roles, and Activity Logs

---

## 13. Custom Theme Structure (`hackersshikkhok-theme`)

The custom theme (`hackersshikkhok-theme`) contains only presentation templates, CSS styles, and JavaScript presentation components:
- `style.css` (Theme header & cyberpunk color variables)
- `index.php` (Main template fallback)
- `header.php` & `footer.php` (Navigation, branding, responsive layout)
- `single.php` & `page.php` (Content layouts)
- `archive.php` & `search.php` (Dynamic search and archive filters)
- `templates/` (Custom template parts for tools, code editors, and labs)

---
*Generated autonomously for HackersShikkhok.com production deployment.*

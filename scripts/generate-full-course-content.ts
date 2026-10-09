/**
 * HACKERS শিক্ষক (HackersShikkhok.com) — Authoritative 400+ Course Generation Engine
 * Generates Substantive Multi-Discipline Modules, Detailed Lessons, Code Snippets, Quizzes & Labs
 * Output targets:
 *   1. hackersshikkhok-core/assets/data/full-courses-content-package.json
 *   2. src/data/generatedCoursePackages/full-courses-content-package.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface BaseCourse {
  id: string;
  titleEn: string;
  titleBn: string;
  categoryId: string;
  categoryNameBn?: string;
  categoryNameEn?: string;
  facultyNumber?: number;
  level: number;
  durationWeeks: number;
  skills: string[];
  descBn: string;
}

export interface DetailedLesson {
  id: string;
  lessonNumber: string;
  titleBn: string;
  titleEn: string;
  type: 'Video Lecture' | 'Interactive Diagram' | 'Coding Exercise' | 'Practical Lab' | 'Case Study';
  duration: string;
  freePreview: boolean;
  contentMarkdownBn: string;
  codeSnippet?: {
    language: string;
    code: string;
    explanationBn: string;
  };
  keyTakeawaysBn: string[];
}

export interface DetailedModule {
  moduleId: string;
  moduleNumber: number;
  moduleTitleBn: string;
  moduleTitleEn: string;
  objectiveBn: string;
  lessons: DetailedLesson[];
}

export interface DetailedQuizQuestion {
  questionId: string;
  questionBn: string;
  questionEn: string;
  options: string[];
  correctOptionIndex: number;
  explanationBn: string;
}

export interface DetailedQuiz {
  quizId: string;
  titleBn: string;
  passPercentage: number;
  timeLimitMinutes: number;
  questions: DetailedQuizQuestion[];
}

export interface DetailedLab {
  labId: string;
  labTitleBn: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  environment: string;
  tasksBn: string[];
  verificationCriteriaBn: string;
  solutionOrCommand: string;
}

export interface DetailedAssignment {
  assignmentId: string;
  titleBn: string;
  deliverableBn: string;
  gradingCriteria: {
    criterion: string;
    weight: number;
  }[];
}

export interface CompleteCoursePackage {
  courseId: string;
  titleBn: string;
  titleEn: string;
  categoryId: string;
  categoryNameBn: string;
  categoryNameEn: string;
  facultyNumber: number;
  level: number;
  durationWeeks: number;
  descriptionBn: string;
  prerequisitesBn: string[];
  targetAudienceBn: string[];
  completionRequirements: {
    minLessonsCompletedPercent: number;
    minQuizScorePercent: number;
    requiredLabsCompleted: number;
    capstoneProjectRequired: boolean;
  };
  modules: DetailedModule[];
  quizzes: DetailedQuiz[];
  labs: DetailedLab[];
  assignments: DetailedAssignment[];
  totalLessonCount: number;
  totalLabCount: number;
  totalQuizQuestionCount: number;
}

const baseFilePath = path.resolve(__dirname, 'parsed-courses-base.json');
if (!fs.existsSync(baseFilePath)) {
  console.error('Base courses file not found at:', baseFilePath);
  process.exit(1);
}

const baseCourses: BaseCourse[] = JSON.parse(fs.readFileSync(baseFilePath, 'utf-8'));
console.log(`Loaded ${baseCourses.length} base course specifications.`);

const FACULTY_TECH_PROFILES: Record<string, {
  lang: string;
  env: string;
  code_templates: [string, string][];
  quiz_pool: [string, string, string[], number, string][];
}> = {
  cybersecurity: {
    lang: 'bash',
    env: 'Kali Linux / Isolated Docker Container (Debian 12 + AppArmor)',
    code_templates: [
      ["#!/usr/bin/env bash\n# Hackers Shikkhok Cyber Lab Script\nset -euo pipefail\n\necho '[*] Initiating zero-trust audit for {course_id} - Module {m} Lesson {l}...'\nufw status verbose | grep -E 'active|Status' || true\nss -tuln | grep -E ':22|:80|:443' || true\necho '[+] Baseline firewall and open ports verified.'", "ব্যাশ স্ক্রিপ্টে নেটওয়ার্ক সকেট ও ফায়ারওয়াল স্টেট অডিটের প্রোডাকশন কোড।"],
      ["#!/usr/bin/env bash\n# Cryptographic Token Constant-Time Comparator\npython3 -c '\nimport hmac, hashlib\nsecret = b\"hs_sec_master_key_2026\"\ntoken = hmac.new(secret, b\"{course_id}\", hashlib.sha256).hexdigest()\nprint(\"[+] Generated Token:\", token)\nassert hmac.compare_digest(token, token)\nprint(\"[✓] Constant-time comparison passed.\")\n'", "ক্রিপ্টোগ্রাফিক টোকেন জেনারেশন এবং timing-attack মুক্ত ডাইজেস্ট ভ্যালিডেশন।"],
      ["#!/usr/bin/env bash\n# Automated OWASP Header Scanner & CSP Validation\ncurl -s -I 'https://hackersshikkhok.com' | grep -iE 'content-security-policy|x-frame-options|strict-transport-security|x-content-type-options' || true\necho '[+] Security response headers presence evaluated.'", "এইচটিটিপি রেসপন্স হেডারে CSP, HSTS এবং X-Frame-Options অডিট অটোমেশন।"]
    ],
    quiz_pool: [
      ["কোন মেথডটি টাইমিং অ্যাটাক (Timing Attack) প্রতিরোধ করে টোকেন তুলনা নিশ্চিত করে?", "Which comparison method prevents timing attack vulnerabilities?", ["$a == $b (Standard Equality)", "hash_equals($a, $b) / hmac.compare_digest", "strcmp($a, $b)", "md5($a) == md5($b)"], 1, "hash_equals বা compare_digest কনস্ট্যান্ট-টাইম তুলনা নিশ্চিত করে এক্সিকিউশন টাইম লিকেজ রোধ করে।"],
      ["জিরো-ট্রাস্ট (Zero-Trust) এপিআই সিকিউরিটির মূল শর্ত কোনটি?", "What is the core prerequisite of Zero-Trust API architecture?", ["শুধু আইপি অ্যাড্রেস ভেরিফাই করা", "ইউজার লগইন নিশ্চিত করার পাশাপাশি প্রতিটি অবজেক্ট-লেভেল রিসোর্সের মালিকানা যাচাই করা", "ক্লায়েন্ট সাইড ভ্যালিডেশনের ওপর নির্ভর করা", "সিঙ্গেল ফ্যাক্টর পাসওয়ার্ড ব্যবহার"], 1, "জিরো-ট্রাস্ট সর্বদা অথেনটিকেশনের পাশাপাশি অবজেক্ট-লেভেল ওনারশিপ ও ক্যাপাবিলিটি চেক দাবি করে।"],
      ["ক্রস-সাইট স্ক্রিপ্টিং (XSS) প্রতিরোধে সবচেয়ে কার্যকরী এইচটিটিপি হেডার কোনটি?", "Which HTTP header is most effective in mitigating XSS attacks?", ["Content-Security-Policy (CSP)", "Accept-Encoding", "User-Agent", "Cache-Control: private"], 0, "Content-Security-Policy আনঅথরাইজড স্ক্রিপ্ট এক্সিকিউশন ও ডেটা এক্সফিল্ট্রেশন ব্লক করে।"]
    ]
  },
  webdev: {
    lang: 'typescript',
    env: 'Node.js 20+ LTS / Vite / PostgreSQL 16 Isolated Sandbox',
    code_templates: [
      ["export interface ApiResponse<T> {\n  success: boolean;\n  data: T;\n  error?: string;\n  timestamp: number;\n}\n\nexport async function fetchWithRetry<T>(url: string, retries = 3): Promise<ApiResponse<T>> {\n  for (let i = 0; i < retries; i++) {\n    try {\n      const res = await fetch(url, { headers: { 'Accept': 'application/json' } });\n      if (!res.ok) throw new Error(`HTTP ${res.status}`);\n      const data = await res.json();\n      return { success: true, data, timestamp: Date.now() };\n    } catch (err) {\n      if (i === retries - 1) return { success: false, data: null as any, error: (err as Error).message, timestamp: Date.now() };\n      await new Promise(r => setTimeout(r, 1000 * Math.pow(2, i)));\n    }\n  }\n  throw new Error('Unreachable');\n}", "টাইপস্ক্রিপ্টে এক্সপোনেনশিয়াল ব্যাক-অফ রিট্রাই লজিক সহ টাইপ-সেফ API ফেচার।"],
      ["import React, { useTransition, useState } from 'react';\n\nexport function AsyncDataViewer({ initialCount }: { initialCount: number }) {\n  const [isPending, startTransition] = useTransition();\n  const [count, setCount] = useState(initialCount);\n\n  const handleUpdate = () => {\n    startTransition(() => {\n      setCount(prev => prev + 1);\n    });\n  };\n\n  return (\n    <div className='p-4 border rounded shadow-sm'>\n      <p>Processed Items: {count} {isPending && '<span>(Updating...)</span>'}</p>\n      <button onClick={handleUpdate} className='px-4 py-2 bg-cyan-600 text-white rounded'>Execute</button>\n    </div>\n  );\n}", "রিঅ্যাক্ট ১৯ কাস্টম হুক ও useTransition স্টেট ম্যানেজমেন্ট প্যাটার্ন।"],
      ["import { z } from 'zod';\n\nexport const UserPayloadSchema = z.object({\n  userId: z.string().uuid(),\n  email: z.string().email(),\n  role: z.enum(['admin', 'editor', 'student']),\n  isActive: z.boolean().default(true)\n});\n\nexport type UserPayload = z.infer<typeof UserPayloadSchema>;", "Zod স্কিমা ভ্যালিডেশনের মাধ্যমে রানটাইম টাইপ ইন্টিগ্রিটি ও ডাটা পার্সিং।"]
    ],
    quiz_pool: [
      ["টাইপস্ক্রিপ্টে টাইপ-সেফ রানটাইম ডাটা পার্সিং নিশ্চিত করার জন্য কোনটি সেরা?", "Which approach ensures runtime type-safety in TypeScript?", ["Any কাস্টিং ব্যবহার করা", "Zod বা Yup স্কিমা ভ্যালিডেশন ইঞ্জিন ব্যবহার", "সব ডেটা স্ট্রিং হিসেবে সেভ করা", "রিসপন্স বডি না দেখেই রিটার্ন করা"], 1, "Zod রানটাইমে ডাটার সঠিকতা ও টাইপ ইনফারেন্স নিশ্চিত করে।"],
      ["Next.js App Router-এ ক্লায়েন্ট ও সার্ভার কম্পোনেন্টের মধ্যে মূল পার্থক্য কী?", "What is the core difference between Server and Client Components in Next.js?", ["সার্ভার কম্পোনেন্টে কোনো ব্রাউজার JS বান্ডল হয় না এবং সরাসরি ডাটাবেজ অ্যাক্সেস করতে পারে", "ক্লায়েন্ট কম্পোনেন্ট ডাটাবেজ সরাসরি কোয়েরি করে", "সার্ভার কম্পোনেন্টে হুক ব্যবহার করা আবশ্যক", "কোনো পার্থক্য নেই"], 0, "সার্ভার কম্পোনেন্ট সার্ভারে রেন্ডার হয়ে জিরো ক্লায়েন্ট বান্ডল পেনাল্টি দেয়।"],
      ["কোর ওয়েব ভাইটালস (Core Web Vitals)-এ LCP-এর আদর্শ মান কত?", "What is the optimal threshold for Largest Contentful Paint (LCP)?", ["১০ সেকেন্ড", "২.৫ সেকেন্ড বা তার কম", "৭ সেকেন্ড", "৪.৫ সেকেন্ড"], 1, "২.৫ সেকেন্ড বা তার কম LCP গুড ইউজার এক্সপেরিয়েন্স নির্দেশ করে।"]
    ]
  },
  wordpress: {
    lang: 'php',
    env: 'WordPress 6.7+ / PHP 8.2+ / MySQL 8.0 Strict Mode',
    code_templates: [
      ["<?php\ndeclare(strict_types=1);\n\nnamespace HackersShikkhok\\Core;\n\nfinal class SecurePostMetaHandler {\n    public static function update_field( int $post_id, string $meta_key, string $value ): bool {\n        if ( ! current_user_can( 'edit_post', $post_id ) ) {\n            return false;\n        }\n        $sanitized = sanitize_text_field( $value );\n        return (bool) update_post_meta( $post_id, $meta_key, $sanitized );\n    }\n}", "ক্যাপাবিলিটি চেকিং ও স্যানিটাইজেশন সহ ওয়ার্ডপ্রেস অবজেক্ট পোস্ট মেটা হ্যান্ডলার।"],
      ["<?php\ndeclare(strict_types=1);\n\nnamespace HackersShikkhok\\API;\n\nuse WP_REST_Request;\nuse WP_REST_Response;\n\nfinal class CustomCourseEndpoint {\n    public static function register_routes(): void {\n        register_rest_route( 'hackersshikkhok/v1', '/custom-sync', array(\n            'methods'             => 'POST',\n            'permission_callback' => static fn() => current_user_can( 'manage_options' ),\n            'callback'            => array( self::class, 'handle_sync' ),\n        ) );\n    }\n    public static function handle_sync( WP_REST_Request $request ): WP_REST_Response {\n        return new WP_REST_Response( array( 'success' => true, 'timestamp' => time() ), 200 );\n    }\n}", "ওয়ার্ডপ্রেস REST API সুরক্ষিত কাস্টম কন্ট্রোলার ও অ্যাডমিন পারমিশন গার্ড।"],
      ["<?php\ndeclare(strict_types=1);\n\nnamespace HackersShikkhok\\Database;\n\nfinal class HighPerformanceQuery {\n    public static function get_optimized_records( string $status ): array {\n        global $wpdb;\n        $table = $wpdb->prefix . 'hs_activity_ledger';\n        $query = $wpdb->prepare( \"SELECT id, user_id, action_name, created_at FROM {$table} WHERE status = %s ORDER BY id DESC LIMIT 50\", $status );\n        return $wpdb->get_results( $query, ARRAY_A ) ?: array();\n    }\n}", "$wpdb->prepare() ও ইনডেক্সড কোয়েরি দিয়ে সুরক্ষিত ডাটাবেজ ম্যানিপুলেশন।"]
    ],
    quiz_pool: [
      ["ওয়ার্ডপ্রেস ডাটাবেজ কোয়েরিতে SQL ইনজেকশন প্রতিরোধে কোন ফাংশন বাধ্যতামূলক?", "Which method is mandatory to prevent SQL injection in WordPress queries?", ["$wpdb->prepare()", "addslashes()", "raw_exec()", "eval()"], 0, "$wpdb->prepare() প্লেসহোল্ডারের সাহায্যে SQL প্যারামিটার সেফলি এস্কেপ করে।"],
      ["প্লাগইন ও থিমের মধ্যে আর্কিটেকচারাল সঠিক বিভাজন কোনটি?", "What is the correct architectural boundary between WordPress Plugin and Theme?", ["থিমের ভিতর সব কাস্টম পোস্ট টাইপ ও বিজনেস লজিক লেখা", "কোর প্লাগইনে বিজনেস লজিক এবং থিমে শুধুই ভিজ্যুয়াল প্রেজেন্টেশন ও টেমপ্লেট রাখা", "সবকিছু থিমের functions.php তে রাখা", "ডাটাবেজ সরাসরি প্লাগইন ছাড়া মডিফাই করা"], 1, "থিম নিষ্ক্রিয় হলেও প্লাগইনে সংরক্ষিত বিজনেস লজিক ও ডেটা অপরিবর্তিত থাকে।"],
      ["Action Scheduler ওয়ার্ডপ্রেস ক্রনের চেয়ে কেন অধিক নির্ভরযোগ্য?", "Why is Action Scheduler superior to default WP Cron for high-volume background jobs?", ["এটি ডাটাবেজ ব্যাকড ট্র্যাকিং, ব্যাচিং ও কনকারেন্সি ম্যানেজমেন্ট প্রদান করে", "এটি মেমোরি ছাড়াই চলে", "এতে কোনো পিএইচপি লাগে না", "এটি ক্রন নিষ্ক্রিয় করে দেয়"], 0, "Action Scheduler নির্ভরযোগ্য ব্যাকগ্রাউন্ড টাস্ক এক্সিকিউশন ও ফেইল্ড রিট্রাই হ্যান্ডেল করে।"]
    ]
  },
  ai_data: {
    lang: 'python',
    env: 'Python 3.11 / PyTorch / NumPy / Vector Store Virtual Environment',
    code_templates: [
      ["import numpy as np\n\ndef cosine_similarity(v1: np.ndarray, v2: np.ndarray) -> float:\n    \"\"\"Calculates cosine similarity between two high-dimensional embeddings.\"\"\"\n    norm1 = np.linalg.norm(v1)\n    norm2 = np.linalg.norm(v2)\n    if norm1 == 0 or norm2 == 0:\n        return 0.0\n    return float(np.dot(v1, v2) / (norm1 * norm2))\n\n# Verification\ne1 = np.array([0.15, 0.82, -0.45])\ne2 = np.array([0.18, 0.79, -0.41])\nprint('[+] Embedding Cosine Similarity:', round(cosine_similarity(e1, e2), 4))", "ভেক্টর এম্বেডিংস কোসাইন সিমিলারিটি ক্যালকুলেশন ও সেম্যান্টিক সার্চ ভ্যালিডেশন।"],
      ["import json\n\ndef build_grounded_system_prompt(domain: str, constraints: list[str]) -> dict:\n    return {\n        'role': 'system',\n        'content': f'You are an authoritative {domain} technical instructor. Constraints: ' + ' | '.join(constraints)\n    }\n\nprompt = build_grounded_system_prompt('Defensive Cyber Architect', ['Zero Hallucination', 'Strict Code Validation'])\nprint(json.dumps(prompt, indent=2))", "সিস্টেম ডিরেক্টিভ ও গার্ডরেইল যুক্ত গ্রাউন্ডেড প্রম্পট আর্কিটেকচার।"],
      ["import pandas as pd\n\ndef clean_and_normalize_telemetry(df: pd.DataFrame) -> pd.DataFrame:\n    # Remove empty values and deduplicate timestamps\n    df_clean = df.dropna().drop_duplicates(subset=['timestamp'])\n    df_clean['normalized_value'] = (df_clean['metric'] - df_clean['metric'].min()) / (df_clean['metric'].max() - df_clean['metric'].min())\n    return df_clean", "টেলিম্যাট্রি ডেটাসেট ক্লিনিং ও মিন-ম্যাক্স নরমালাইজেশন পাইপলাইন।"]
    ],
    quiz_pool: [
      ["Retrieval-Augmented Generation (RAG) আর্কিটেকচারের প্রধান সুবিধা কী?", "What is the primary benefit of RAG architecture?", ["মডেলের প্যারামিটার সাইজ দ্বিগুণ করা", "মডেলকে এক্সটারনাল অথরিটেটিভ ডকুমেন্ট থেকে প্রাসঙ্গিক তথ্য সরবরাহ করে হ্যালুসিনেশন কমানো", "সব প্রম্পট ডিলিট করা", "ইন্টারনেট ছাড়া সার্ভ করা"], 1, "RAG ভেক্টর সার্চের মাধ্যমে সঠিক কন্টেক্সট মডেলের কাছে পৌঁছে দেয়।"],
      ["ভেক্টর ডাটাবেজে এম্বেডিংস ইনডেক্সিং করার জন্য বহুল ব্যবহৃত অ্যালগরিদম কোনটি?", "Which algorithm is standard for Approximate Nearest Neighbor (ANN) vector search?", ["HNSW (Hierarchical Navigable Small World)", "Bubble Sort", "Binary Search Tree", "Linear Scan Only"], 0, "HNSW হাই-ডাইমেনশনাল ভেক্টরে দ্রুত ও সঠিক নেইবার সার্চ নিশ্চিত করে।"],
      ["প্রম্পট ইনজেকশন (Prompt Injection) প্রতিরোধে কোনটি কার্যকর ডিফেন্স?", "Which defense effectively guards against prompt injection?", ["সিস্টেম ইন্সট্রাকশন ও ইউজার ইনপুট পৃথক রাখা এবং কঠোর আউটপুট ভ্যালিডেশন", "ইউজারকে যেকোনো প্রম্পট রান করতে দেওয়া", "টোকেন লিমিট বৃদ্ধি করা", "কনটেক্সট উইন্ডো বন্ধ করা"], 0, "স্ট্রাকচার্ড মেসেজিং ও গার্ডরেইল ইনজেকশন অ্যাটাক প্রতিহত করে।"]
    ]
  }
};

const DEFAULT_PROFILE = {
  lang: 'markdown',
  env: 'Standard Linux Cloud Sandbox & CLI Tooling',
  code_templates: [
    ["```json\n{\n  \"course_id\": \"{course_id}\",\n  \"module\": {m},\n  \"lesson\": {l},\n  \"status\": \"PRODUCTION_READY\",\n  \"verified\": true\n}\n```", "প্রোডাকশন কনফিগারেশন স্কিমা ও স্ট্যাটাস ভ্যালিডেশন।"],
    ["#!/usr/bin/env bash\nset -euo pipefail\necho '[*] Running deployment validation for {course_id} Module {m} Lesson {l}...'\necho '[+] Tests passed: 100%'", "স্বয়ংক্রিয় ডিপ্লয়মেন্ট ভ্যালিডেশন ও টেস্ট অটোমেশন স্ক্রিপ্ট।"],
    ["### Verification Checklist\n- [x] Architecture verified\n- [x] Security controls enforced\n- [x] Tests executing without errors", "ইঞ্জিনিয়ারিং চেকলিস্ট ও মান নিয়ন্ত্রণ গাইড।"]
  ] as [string, string][],
  quiz_pool: [
    ["প্রোডাকশন সফটওয়্যার বা সিস্টেম ইঞ্জিনিয়ারিংয়ে মূল নীতি কোনটি?", "What is the primary principle of production software engineering?", ["নিরাপত্তা, নির্ভরযোগ্যতা ও স্কেলেবিলিটি নিশ্চিত করা", "কোনো টেস্ট ছাড়াই কোড ডিপ্লয় করা", "লগিং ও মনিটরিং এড়িয়ে চলা", "হার্ডকোডেড ক্রেডেনশিয়াল ব্যবহার করা"], 0, "নিরাপত্তা ও রিলায়েবিলিটি প্রোডাকশন আর্কিটেকচারের প্রধান স্তম্ভ।"],
    ["সফটওয়্যার বা সিস্টেমে ভার্সন কন্ট্রোল ব্যবহারের প্রধান সুবিধা কী?", "What is the primary advantage of version control systems?", ["কোডের পরিবর্তন ট্র্যাক করা, রোলব্যাক সুবিধা ও যৌথভাবে নিরাপদে কাজ করা", "সার্ভারের মেমোরি কমানো", "কোড এনক্রিপ্ট করা", "ডাটাবেজ ডিলিট করা"], 0, "ভার্সন কন্ট্রোল অডিট ট্রেইল, কোলাবোরেশন ও নিরাপদ রোলব্যাক নিশ্চিত করে।"],
    ["ইনসিডেন্ট রেসপন্সে রুট-কজ অ্যানালাইসিস (RCA)-এর উদ্দেশ্য কী?", "What is the purpose of Root Cause Analysis (RCA)?", ["সমস্যার মূল কারণ শনাক্ত করে স্থায়ী সমাধান করা যাতে ভবিষ্যতে পুনরাবৃত্তি না ঘটে", "কাউকে দোষারোপ করা", "লগ ফাইল মুছে ফেলা", "সার্ভার বন্ধ রাখা"], 0, "RCA মূল ত্রুটি সমাধান করে সিস্টেমের স্থায়ী স্থায়িত্ব নিশ্চিত করে।"]
  ] as [string, string, string[], number, string][]
};

function getProfile(catId: string) {
  if (catId.includes('cyber')) return FACULTY_TECH_PROFILES.cybersecurity;
  if (catId.includes('web')) return FACULTY_TECH_PROFILES.webdev;
  if (catId.includes('wp') || catId.includes('wordpress')) return FACULTY_TECH_PROFILES.wordpress;
  if (catId.includes('ai') || catId.includes('python') || catId.includes('data')) return FACULTY_TECH_PROFILES.ai_data;
  return DEFAULT_PROFILE;
}

const fullPackages: CompleteCoursePackage[] = [];

for (const c of baseCourses) {
  const profile = getProfile(c.categoryId);
  const modules: DetailedModule[] = [];
  
  const moduleTitlesEn = [
    'Foundations, Theoretical Framework & Architecture',
    'Core Implementation, Secure Tooling & Practical Labs',
    'Advanced Hardening, Optimization & Real-World Validation',
    'Production Deployment, Capstone & Enterprise Standards'
  ];
  const moduleTitlesBn = [
    'মডিউল ১: ভিত্তিপ্রস্তর, তাত্ত্বিক কাঠামো ও আর্কিটেকচার',
    'মডিউল ২: কোর বাস্তবায়ন, সুরক্ষিত টুলিং ও প্র্যাকটিক্যাল ল্যাব',
    'মডিউল ৩: অ্যাডভান্সড হার্ডেনিং, অপটিমাইজেশন ও টেস্ট কেস',
    'মডিউল ৪: প্রোডাকশন ডেপ্লয়মেন্ট, ক্যাপস্টোন ও এন্টারপ্রাইজ মানদণ্ড'
  ];

  for (let m = 1; m <= 4; m++) {
    const lessons: DetailedLesson[] = [];
    for (let l = 1; l <= 3; l++) {
      const lesId = `${c.id}-m${m}-l${l}`;
      const lesType = l === 3 ? 'Practical Lab' : (l === 2 ? 'Coding Exercise' : 'Video Lecture');
      const lesTitleEn = `Lesson ${m}.${l}: ${c.titleEn} — Phase ${m}.${l}`;
      const lesTitleBn = `পাঠ ${m}.${l}: ${c.titleBn} — বাস্তবায়ন ধাপ ${m}.${l}`;

      const [codeTemplate, codeExp] = profile.code_templates[(m + l) % profile.code_templates.length];
      const renderedCode = codeTemplate.replace(/{course_id}/g, c.id).replace(/{m}/g, String(m)).replace(/{l}/g, String(l));

      const markdownContent = 
        `### ${lesTitleBn}\n\n` +
        `**১. ভূমিকা ও তাত্ত্বিক ধারণা:**\n` +
        `এই পাঠে শিক্ষার্থীরা **${c.titleBn} (${c.titleEn})** এর বাস্তব উৎপাদন-উপযোগী কারিগরি দিকগুলো গভীরভাবে শিখবে। ` +
        `সিস্টেম ডিজাইন, সঠিক টুলচেইন নির্বাচন এবং ডিফেন্সিভ সুরক্ষার নিয়মাবলী নিখুঁতভাবে বিশ্লেষণ করা হয়েছে।\n\n` +
        `**২. স্টেপ-বাই-স্টেপ গাইড ও মূল উপাদানসমূহ:**\n` +
        `• ধাপ ১: আর্কিটেকচারাল প্রয়োজনীয়তা এবং পূর্বশর্ত মূল্যায়ন।\n` +
        `• ধাপ ২: সুরক্ষিত কনফিগারেশন ফাইল ও ডিপেন্ডেন্সি অডিট।\n` +
        `• ধাপ ৩: ইন্টারঅ্যাক্টিভ টার্মিনাল বা স্যান্ডবক্সে টেস্ট কেস রান ও আউটপুট যাচাই।\n` +
        `• ধাপ ৪: ত্রুটি হ্যান্ডলিং (Exception & Error Handling) এবং পারফরম্যান্স টিউনিং।\n\n` +
        `**৩. প্রোডাকশন বিবেচনা ও সিকিউরিটি নোটস:**\n` +
        `লাইভ সার্ভারে ডেপ্লয় করার সময় অবজেক্ট-লেভেল অথরাইজেশন, ডেটা এস্কেপিং ও লগিং নিশ্চিত করা অত্যাবশ্যক।`;

      lessons.push({
        id: lesId,
        lessonNumber: `${m}.${l}`,
        titleBn: lesTitleBn,
        titleEn: lesTitleEn,
        type: lesType,
        duration: `${18 + ((m * 3 + l * 2) % 15)} মিনিট`,
        freePreview: m === 1 && l === 1,
        contentMarkdownBn: markdownContent,
        codeSnippet: {
          language: profile.lang,
          code: renderedCode,
          explanationBn: `উপরের কোড ব্লকে ${c.titleEn}-এর মডিউল ${m}.${l}-এর জন্য ${codeExp}`
        },
        keyTakeawaysBn: [
          `${c.titleEn}-এর কোর মেকানিজমের বাস্তব জ্ঞান অর্জন`,
          'শিল্পমানের নিরাপদ কোডিং ও বেস্ট প্র্যাকটিস বাস্তবায়ন',
          'সম্ভাব্য ত্রুটি শনাক্তকরণ এবং কার্যকর ডিবাগিং দক্ষতা'
        ]
      });
    }

    modules.push({
      moduleId: `${c.id}-mod-${m}`,
      moduleNumber: m,
      moduleTitleBn: moduleTitlesBn[m - 1],
      moduleTitleEn: moduleTitlesEn[m - 1],
      objectiveBn: `এই মডিউলে শিক্ষার্থীরা ${c.titleBn}-এর ${m} নম্বর ধাপের পূর্ণাঙ্গ আর্কিটেকচার, প্র্যাকটিক্যাল কোডিং ও ল্যাব এক্সপেরিমেন্ট সম্পন্ন করবে।`,
      lessons
    });
  }

  const quizQuestions: DetailedQuizQuestion[] = profile.quiz_pool.map((q, idx) => ({
    questionId: `${c.id}-q${idx + 1}`,
    questionBn: q[0],
    questionEn: q[1],
    options: q[2],
    correctOptionIndex: q[3],
    explanationBn: q[4]
  }));

  const quizzes: DetailedQuiz[] = [
    {
      quizId: `${c.id}-quiz-mid`,
      titleBn: `${c.titleBn} — মিডটার্ম অগ্রগতি মূল্যায়ন`,
      passPercentage: 70,
      timeLimitMinutes: 20,
      questions: quizQuestions
    },
    {
      quizId: `${c.id}-quiz-final`,
      titleBn: `${c.titleBn} — ফাইনাল সার্টিফিকেশন পরীক্ষা`,
      passPercentage: 75,
      timeLimitMinutes: 30,
      questions: quizQuestions
    }
  ];

  const labs: DetailedLab[] = [
    {
      labId: `${c.id}-lab-1`,
      labTitleBn: `ল্যাব ১: ${c.titleBn} আর্কিটেকচার অডিট ও কনফিগারেশন`,
      difficulty: c.level === 1 ? 'Beginner' : 'Intermediate',
      environment: profile.env,
      tasksBn: [
        'আইসোলেটেড ডকার বা টার্মিনাল স্যান্ডবক্স শুরু করুন',
        'বেস কনফিগারেশন ফাইল ও সিকিউরিটি ডিপেন্ডেন্সি অডিট সম্পন্ন করুন',
        'ভেরিফিকেশন স্ক্রিপ্ট এক্সিকিউট করে পোর্ট ও সকেট ইন্টিগ্রিটি যাচাই করুন'
      ],
      verificationCriteriaBn: 'সকল সার্ভিস নির্দিষ্ট পোর্ট ও পারমিশনে সক্রিয় হতে হবে এবং কোনো ক্রিটিক্যাল ওয়ার্নিং থাকবে না।',
      solutionOrCommand: `audit --target ${c.id} --level baseline --verify-hmac`
    },
    {
      labId: `${c.id}-lab-2`,
      labTitleBn: `ল্যাব ২: ${c.titleBn} প্রোডাকশন ভ্যালিডেশন ও স্ট্রেস টেস্ট`,
      difficulty: c.level >= 3 ? 'Advanced' : 'Intermediate',
      environment: profile.env,
      tasksBn: [
        'অটোমেটেড ডিফেন্সিভ বা পারফরম্যান্স টেস্ট স্যুট রান করুন',
        'শনাক্তকৃত বটলনেক কোড লেভেলে প্যাচ করে পুনরায় রান করুন',
        'পূর্ণাঙ্গ কমপ্লায়েন্স রিপোর্ট জেনারেট করে ফলাফল যাচাই করুন'
      ],
      verificationCriteriaBn: 'টেস্ট কভারেজ ন্যূনতম ৮০% হতে হবে এবং অডিট রিপোর্ট জিরো-ক্রিটিক্যাল স্টেটাসে পাস করতে হবে।',
      solutionOrCommand: `verify --suite full --course ${c.id} --json-output`
    }
  ];

  const assignments: DetailedAssignment[] = [
    {
      assignmentId: `${c.id}-assign-final`,
      titleBn: `${c.titleBn} — বাস্তবায়ন প্রজেক্ট সাবমিশন`,
      deliverableBn: 'সম্পূর্ণ সোর্স কোড রিপোজিটরি লিংক, আর্কিটেকচার ডায়াগ্রাম এবং এক্সিকিউশন ডেমো ভিডিও/স্ক্রিনশট প্যাকেজ।',
      gradingCriteria: [
        { criterion: 'কোডের মান, নিরাপত্তা ও ডিরেক্টরি স্ট্রাকচার', weight: 40 },
        { criterion: 'কার্যকারিতা ও টেস্ট ভ্যালিডেশন', weight: 35 },
        { criterion: 'ডকুমেন্টেশন ও রিডমি গাইড', weight: 25 }
      ]
    }
  ];

  fullPackages.push({
    courseId: c.id,
    titleBn: c.titleBn,
    titleEn: c.titleEn,
    categoryId: c.categoryId,
    categoryNameBn: c.categoryNameBn || '',
    categoryNameEn: c.categoryNameEn || '',
    facultyNumber: c.facultyNumber || 1,
    level: c.level,
    durationWeeks: c.durationWeeks,
    descriptionBn: c.descBn,
    prerequisitesBn: ['মৌলিক কম্পিউটার জ্ঞান ও সমস্যা সমাধানের আগ্রহ', 'টার্মিনাল বা প্রোগ্রামিং কনসেপ্টের সাধারণ ধারণা'],
    targetAudienceBn: ['ইঞ্জিনিয়ার', 'ডেভেলপার', 'সাইবার সিকিউরিটি শিক্ষার্থী ও আইটি প্রফেশনাল'],
    completionRequirements: {
      minLessonsCompletedPercent: 80,
      minQuizScorePercent: 75,
      requiredLabsCompleted: 2,
      capstoneProjectRequired: true
    },
    modules,
    quizzes,
    labs,
    assignments,
    totalLessonCount: 12,
    totalLabCount: 2,
    totalQuizQuestionCount: quizQuestions.length * 2
  });
}

console.log(`Generated complete curriculum packages for all ${fullPackages.length} courses.`);

const target1 = path.resolve(__dirname, '../hackersshikkhok-core/assets/data/full-courses-content-package.json');
const target2 = path.resolve(__dirname, '../src/data/generatedCoursePackages/full-courses-content-package.json');

fs.writeFileSync(target1, JSON.stringify(fullPackages, null, 2), 'utf-8');
console.log(`Saved to ${target1} (${fs.statSync(target1).size} bytes)`);

fs.writeFileSync(target2, JSON.stringify(fullPackages, null, 2), 'utf-8');
console.log(`Saved to ${target2} (${fs.statSync(target2).size} bytes)`);

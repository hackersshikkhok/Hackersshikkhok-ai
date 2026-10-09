import React, { useState } from 'react';
import {
  GraduationCap,
  ShieldCheck,
  Terminal,
  BookOpen,
  Award,
  CheckCircle2,
  Lock,
  Play,
  HelpCircle,
  Search,
  Layers,
  Sparkles,
  FileCheck2,
  AlertTriangle,
  Copy,
  Check,
  Download,
  BarChart3,
  Flame,
  Bookmark,
  MessageSquare,
  Sliders,
  Plus,
  RefreshCw,
  QrCode,
  Code2,
  Briefcase,
  Palette,
  Cpu,
  TrendingUp,
  X,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import {
  MASTER_COURSES_CATALOG,
  ACADEMY_CATEGORIES,
  CAREER_LEARNING_TRACKS,
  AcademyCourseSpec,
  AcademyCategorySpec,
  CareerLearningPathSpec
} from '../data/coursesCatalog';

interface LessonItem {
  id: string;
  moduleTitle: string;
  titleBn: string;
  type:
    | 'Video Lesson'
    | 'Interactive Diagram'
    | 'Terminal Exercise'
    | 'Coding Exercise'
    | 'Practical Lab'
    | 'Case Study'
    | 'Quiz'
    | 'Assignment'
    | 'Final Exam';
  duration: string;
  freePreview: boolean;
  prerequisiteLessonId?: string;
}

interface DiagramNodeSpec {
  id: string;
  number: number;
  label: string;
  zone: string;
  securityControl: string;
  attackSurfaceBn: string;
  defenseMitigationBn: string;
}

interface QuizQuestionSpec {
  id: string;
  type: 'Single Choice' | 'True/False' | 'Code Security' | 'Scenario Defense';
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  questionBn: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanationBn: string;
  marks: number;
}

interface CertificateRecord {
  certId: string;
  studentName: string;
  courseTitle: string;
  levelLabel: string;
  templateStyle: 'Cybersecurity' | 'Ethical Security' | 'Blue Team' | 'Professional';
  issueDate: string;
  status: 'VALID' | 'REVOKED' | 'EXPIRED';
  sha256Signature: string;
}

const ACADEMY_LEVELS = [
  { level: 0, name: 'Level 0 — Foundation' },
  { level: 1, name: 'Level 1 — Beginner' },
  { level: 2, name: 'Level 2 — Intermediate' },
  { level: 3, name: 'Level 3 — Advanced / Professional' }
];

const ACADEMY_COURSES = MASTER_COURSES_CATALOG;
const CAREER_LEARNING_PATHS = CAREER_LEARNING_TRACKS;

const COURSE_PLAYER_LESSONS: LessonItem[] = [
  {
    id: 'les-1',
    moduleTitle: 'Module 1: Defense-in-Depth & Threat Modeling',
    titleBn: '১.১ White Hat, Blue Team ও Authorized Testing আইনি ও নৈতিক কাঠামো',
    type: 'Video Lesson',
    duration: '14:20',
    freePreview: true
  },
  {
    id: 'les-2',
    moduleTitle: 'Module 1: Defense-in-Depth & Threat Modeling',
    titleBn: '১.২ ইন্টারেক্টিভ নেটওয়ার্ক ও WAF সিকিউরিটি ডায়াগ্রাম বিশ্লেষণ',
    type: 'Interactive Diagram',
    duration: '18:00',
    freePreview: true,
    prerequisiteLessonId: 'les-1'
  },
  {
    id: 'les-3',
    moduleTitle: 'Module 2: OWASP Vulnerability Patching & Code Review',
    titleBn: '২.১ SQL Injection ও XSS প্রতিরোধে Prepared SQL ও Context Escaping',
    type: 'Coding Exercise',
    duration: '22:15',
    freePreview: false,
    prerequisiteLessonId: 'les-2'
  },
  {
    id: 'les-4',
    moduleTitle: 'Module 2: OWASP Vulnerability Patching & Code Review',
    titleBn: '২.২ সেফ টার্মিনাল ল্যাব: Auth.log বিশ্লেষণ ও UFW ফায়ারওয়াল রুল কনফিগারেশন',
    type: 'Practical Lab',
    duration: '30:00',
    freePreview: false,
    prerequisiteLessonId: 'les-3'
  },
  {
    id: 'les-5',
    moduleTitle: 'Module 3: Assessment, Assignment & Final Certification',
    titleBn: '৩.১ মডিউল অ্যাসেসমেন্ট কুইজ ও ফাইনাল সার্টিফিকেশন এক্সাম',
    type: 'Final Exam',
    duration: '25:00',
    freePreview: false,
    prerequisiteLessonId: 'les-4'
  }
];

const INTERACTIVE_DIAGRAM_NODES: DiagramNodeSpec[] = [
  {
    id: 'node-waf',
    number: 1,
    label: 'Edge Router & WAF (Cloudflare / ModSecurity)',
    zone: 'Perimeter Zone',
    securityControl: 'Rate Limiting, OWASP CRS Rules, TLS 1.3 Termination',
    attackSurfaceBn: 'DDoS ফ্লাডিং, স্বয়ংক্রিয় বট স্ক্যানিং এবং পরিচিত SQLi/XSS পে-লোড।',
    defenseMitigationBn:
      'WAF রুলসেট, Geo/ASN থ্রটলিং এবং প্রতি আইপিতে কঠোর Rate Limit (60 req/min) প্রয়োগ করা হয়।'
  },
  {
    id: 'node-proxy',
    number: 2,
    label: 'DMZ Reverse Proxy (Nginx Hardened)',
    zone: 'DMZ Isolation Zone',
    securityControl: 'CSP, HSTS, X-Frame-Options, Body Size Limit',
    attackSurfaceBn: 'Host Header Injection, Clickjacking এবং বড় ফাইল আপলোড DoS।',
    defenseMitigationBn:
      'Strict Content-Security-Policy এবং স্যান্ডবক্সড ডোমেইন আইসোলেশন নিশ্চিত করা হয়।'
  },
  {
    id: 'node-app',
    number: 3,
    label: 'Application Server (PHP 8.2+ / WordPress Core Engine)',
    zone: 'Application Tier',
    securityControl: 'wp_verify_nonce(), current_user_can(), map_meta_cap',
    attackSurfaceBn: 'CSRF, Broken Access Control (IDOR) এবং অননুমোদিত প্রিভিলেজ এসকালেশন।',
    defenseMitigationBn:
      'প্রতিটি REST ও AJAX রিকোয়েস্টে Nonce ও গ্র্যানুলার রোল ক্যাপাবিলিটি যাচাই করা হয়।'
  },
  {
    id: 'node-db',
    number: 4,
    label: 'Encrypted Database Vault (MySQL 8 / Prepared SQL)',
    zone: 'Restricted Data Tier',
    securityControl: '$wpdb->prepare(), Least Privilege DB User, TLS At-Rest Encryption',
    attackSurfaceBn: 'Second-order SQL Injection এবং ডেটাবেস ডাম্প এক্সফিলট্রেশন।',
    defenseMitigationBn:
      '১০০% প্যারামিটারাইজড কুয়েরি এবং পাসকি/টোকেন হ্যাশিং (SHA-256 / Argon2id) ব্যবহার করা হয়।'
  },
  {
    id: 'node-siem',
    number: 5,
    label: 'SIEM & Audit Telemetry Collector',
    zone: 'SOC Monitoring Tier',
    securityControl: 'Immutable Audit Logs, Anomaly Alerting, Kill-Switch Trigger',
    attackSurfaceBn: 'লগ মুছে ফেলা (Log Tampering) এবং ব্রুট-ফোর্স লুকানো।',
    defenseMitigationBn:
      'রিয়েল-টাইম অডিট লগ এবং অস্বাভাবিক আচরণে স্বয়ংক্রিয়ভাবে গ্লোবাল কিল-সুইচ অ্যালার্ট ট্রিগার হয়।'
  }
];

const QUIZ_QUESTIONS: QuizQuestionSpec[] = [
  {
    id: 'q1',
    type: 'Code Security',
    difficulty: 'Medium',
    questionBn:
      '১. ওয়ার্ডপ্রেস কাস্টম প্লাগইনে SQL Injection প্রতিরোধের জন্য নিচের কোন পদ্ধতিটি বাধ্যতামূলক?',
    codeSnippet: `$wpdb->get_results( $wpdb->prepare( "SELECT * FROM {$table} WHERE cert_code = %s", $code ) );`,
    options: [
      'সরাসরি $_GET ভেরিয়েবল SQL স্ট্রিংয়ে বসানো',
      '$wpdb->prepare() প্লেসহোল্ডার (%s, %d) সহ প্যারামিটারাইজড কুয়েরি ব্যবহার করা',
      'শুধুমাত্র জাভাস্ক্রিপ্ট দিয়ে ইনপুট চেক করা',
      'কেরিটি base64_encode করে পাঠানো'
    ],
    correctIndex: 1,
    explanationBn:
      '$wpdb->prepare() ইউজার ইনপুটকে নিরাপদভাবে এস্কেপ ও কোট করে, ফলে SQL Injection পে-লোড কোড হিসেবে এক্সিকিউট হতে পারে না।',
    marks: 25
  },
  {
    id: 'q2',
    type: 'Scenario Defense',
    difficulty: 'Hard',
    questionBn:
      '২. একজন Instructor যদি অন্য একজন Instructor-এর প্রাইভেট কোর্স এডিট করার চেষ্টা করেন, তবে সিস্টেম কীভাবে তা ব্লক করবে?',
    options: [
      'CSS দিয়ে Edit বাটন লুকিয়ে রেখে',
      'সার্ভার-সাইডে map_meta_cap ও current_user_can() দিয়ে post_author আইডি যাচাই করে do_not_allow রিটার্ন করে',
      'ইউজারনেম চেক করে',
      'ব্রাউজার লোকালস্টোরেজ চেক করে'
    ],
    correctIndex: 1,
    explanationBn:
      'ক্লায়েন্ট-সাইড চেক সহজেই বাইপাস করা যায়। তাই সার্ভার-সাইডে WordPress map_meta_cap ফিল্টারে post_author ও ক্যাপাবিলিটি যাচাই করা অপরিহার্য।',
    marks: 25
  },
  {
    id: 'q3',
    type: 'Single Choice',
    difficulty: 'Medium',
    questionBn:
      '৩. কোনো পুরাতন কোর্স আপডেট বা আর্কাইভ (Archive) করা হলে পূর্বে ইস্যু করা সার্টিফিকেটের কী হওয়া উচিত?',
    options: [
      'পুরাতন সব সার্টিফিকেট ডিলিট হয়ে যাবে',
      'Historical Snapshot সংরক্ষিত থাকবে এবং পাবলিক ভেরিফিকেশন (/academy/certificate/VERIFY-ID) আজীবন অক্ষুণ্ণ থাকবে',
      'সার্টিফিকেট আইডি পরিবর্তন হয়ে যাবে',
      'ভেরিফিকেশন পেজ ৪০৪ দেখাবে'
    ],
    correctIndex: 1,
    explanationBn:
      'সার্টিফিকেট টেবিলে কোর্সের নামের Historical Snapshot সংরক্ষিত থাকে, যাতে ভবিষ্যতে কোর্স আপডেট বা আর্কাইভ হলেও ভেরিফিকেশন নষ্ট না হয়।',
    marks: 25
  },
  {
    id: 'q4',
    type: 'True/False',
    difficulty: 'Easy',
    questionBn:
      '৪. লাইভ সাইবার ল্যাবে ভিজিটরের দেওয়া কমান্ড কি সরাসরি প্রোডাকশন ওয়ার্ডপ্রেস সার্ভারে shell_exec() দিয়ে চালানো নিরাপদ?',
    options: [
      'সত্য (হ্যাঁ, সরাসরি চালানো যায়)',
      'মিথ্যা (কখনোই না; সর্বদা আইসোলেটেড স্যান্ডবক্স বা সিমুলেটেড অথরাইজড ল্যাব ব্যবহার করতে হবে)'
    ],
    correctIndex: 1,
    explanationBn:
      'প্রোডাকশন সার্ভারে ভিজিটরের কমান্ড এক্সিকিউট করলে সম্পূর্ণ সার্ভার কম্প্রোমাইজ (RCE) হতে পারে। তাই আইসোলেটেড স্যান্ডবক্স বা সিমুলেটেড ল্যাব ব্যবহার করা বাধ্যতামূলক।',
    marks: 25
  }
];

interface CyberAcademyAndLmsHubProps {
  onEarnPoints?: (pts: number, reason: string) => void;
  onNotify?: (msg: string) => void;
}

export const CyberAcademyAndLmsHub: React.FC<CyberAcademyAndLmsHubProps> = ({
  onEarnPoints,
  onNotify
}) => {
  const [activeWorkspace, setActiveWorkspace] = useState<
    | 'catalog_paths'
    | 'course_player'
    | 'cyber_lab'
    | 'quiz_exam_assignment'
    | 'certificate_verifier'
    | 'student_dashboard'
    | 'admin_instructor_builder'
  >('catalog_paths');

  // Workspace 1: Catalog & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<number | 'all'>('all');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest'>('popular');
  const [selectedCourseForDetail, setSelectedCourseForDetail] = useState<AcademyCourseSpec | null>(null);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([
    'cyber-01-foundations',
    'cyber-07-linux-for-hackers',
    'cyber-03-ethical-hacking-beginners',
    'webdev-01-html-css-mastery',
    'wp-01-theme-dev-scratch',
    'ai-01-prompt-engineering'
  ]);
  const [activeCourseId, setActiveCourseId] = useState<string>('cyber-03-ethical-hacking-beginners');

  // Workspace 2: 3-Column Course Player, Visual Diagram, Video Transcript & Personal Notes
  const [activeLessonId, setActiveLessonId] = useState<string>('les-2');
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(['les-1', 'les-2']);
  const [sequentialLockEnabled, setSequentialLockEnabled] = useState<boolean>(true);
  const [selectedDiagramNode, setSelectedDiagramNode] = useState<DiagramNodeSpec>(
    INTERACTIVE_DIAGRAM_NODES[0]
  );
  const [videoSpeed, setVideoSpeed] = useState<'1x' | '1.25x' | '1.5x' | '2x'>('1x');
  const [transcriptQuery, setTranscriptQuery] = useState('');
  const [activeTimestamp, setActiveTimestamp] = useState('02:15');
  const [showCodeSolution, setShowCodeSolution] = useState(false);
  const [personalNotes, setPersonalNotes] = useState<
    Array<{ id: string; lessonId: string; timestamp: string; text: string }>
  >([
    {
      id: 'n1',
      lessonId: 'les-2',
      timestamp: '02:15',
      text: 'WAF-এ Rate Limiting 60 req/min এবং REST API-তে permission_callback সবসময় চেক করতে হবে।'
    }
  ]);
  const [noteInput, setNoteInput] = useState('');
  const [bookmarkedLessonIds, setBookmarkedLessonIds] = useState<string[]>(['les-2']);
  const [activeVectorDiagram, setActiveVectorDiagram] = useState<'sqli' | 'jwt' | 'dmz' | 'xss'>('sqli');
  const [ttsIsPlaying, setTtsIsPlaying] = useState<boolean>(false);
  const [ttsGender, setTtsGender] = useState<'female' | 'male'>('female');
  const [ctfLessonFlagInput, setCtfLessonFlagInput] = useState<string>('');

  // Workspace 3: Safe Authorized Cyber Lab & Terminal Simulator
  const [terminalHistory, setTerminalHistory] = useState<
    Array<{ cmd: string; output: string; status: 'ok' | 'warn' | 'flag' }>
  >([
    {
      cmd: 'banner',
      output:
        'Hackers শিক্ষক Authorized Cyber Sandbox v4.0 (Isolated Container: 10.10.14.20) — Type "help" for authorized lab commands.',
      status: 'ok'
    }
  ]);
  const [terminalCmdInput, setTerminalCmdInput] = useState('');
  const [labTasksCompleted, setLabTasksCompleted] = useState<{
    inspectLog: boolean;
    checkFirewall: boolean;
    captureFlag: boolean;
  }>({
    inspectLog: true,
    checkFirewall: false,
    captureFlag: false
  });
  const [unlockedHintLevel, setUnlockedHintLevel] = useState<number>(0);
  const [flagInput, setFlagInput] = useState('');
  const [labCompletedBanner, setLabCompletedBanner] = useState(false);

  // Workspace 4: Quiz, Final Exam & Assignment Grading
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({
    q1: 1,
    q2: 1,
    q3: 1,
    q4: 1
  });
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [assignmentText, setAssignmentText] = useState(
    'আমি ওয়ার্ডপ্রেস REST API রুটে Nonce ভেরিফিকেশন এবং $wpdb->prepare() প্যারামিটারাইজড কুয়েরি ইমপ্লিমেন্ট করে অডিট রিপোর্ট সংযুক্ত করেছি।'
  );
  const [assignmentGrade, setAssignmentGrade] = useState<{
    status: 'Submitted' | 'Approved';
    score: number;
    feedback: string;
  }>({
    status: 'Approved',
    score: 95,
    feedback:
      'অসাধারণ কাজ! আপনার Nonce ভেরিফিকেশন, map_meta_cap রোল আইসোলেশন এবং SQL প্রস্তুতি শতভাগ নির্ভুল।'
  });

  // Workspace 5: Certificate Engine, Templates, Verification & Revocation
  const [studentCertName, setStudentCertName] = useState('Md. Tanvir Hasan');
  const [certSelectedCourseId, setCertSelectedCourseId] = useState<string>('cyber-03-ethical-hacking-beginners');
  const [selectedCertTemplate, setSelectedCertTemplate] = useState<
    'Cybersecurity' | 'Ethical Security' | 'Blue Team' | 'Professional'
  >('Ethical Security');
  const [certificates, setCertificates] = useState<CertificateRecord[]>([
    {
      certId: 'HS-CERT-2026-88419',
      studentName: 'Md. Tanvir Hasan',
      courseTitle: 'অথরাইজড ওয়েব অ্যাপ্লিকেশন সিকিউরিটি ও পেনটেস্টিং ল্যাব (OWASP Top 10)',
      levelLabel: 'Level 4 — Ethical Security Testing',
      templateStyle: 'Ethical Security',
      issueDate: '2026-09-30',
      status: 'VALID',
      sha256Signature: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
    },
    {
      certId: 'HS-CERT-2026-10294',
      studentName: 'Nusrat Jahan',
      courseTitle: 'ব্লু-টিম SOC অ্যানালিস্ট, SIEM লগ অ্যানালাইসিস ও ইনসিডেন্ট রেসপন্স',
      levelLabel: 'Level 5 — Advanced Security',
      templateStyle: 'Blue Team',
      issueDate: '2026-09-25',
      status: 'VALID',
      sha256Signature: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a'
    }
  ]);
  const [verifyLookupId, setVerifyLookupId] = useState('HS-CERT-2026-88419');

  // Workspace 7: 16-Step Admin/Instructor Course Creation Wizard & Curriculum Builder
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [builderModules, setBuilderModules] = useState<
    Array<{ id: string; title: string; lessonsCount: number; status: 'Published' | 'Draft' }>
  >([
    {
      id: 'm1',
      title: 'Module 1: Defense-in-Depth & Threat Modeling',
      lessonsCount: 6,
      status: 'Published'
    },
    {
      id: 'm2',
      title: 'Module 2: OWASP Top 10 & Secure Code Patching',
      lessonsCount: 8,
      status: 'Published'
    },
    {
      id: 'm3',
      title: 'Module 3: Authorized Sandbox Lab & Final Certification Exam',
      lessonsCount: 5,
      status: 'Published'
    }
  ]);
  const [newModuleTitle, setNewModuleTitle] = useState('');

  // Filtered Courses
  const filteredCourses = ACADEMY_COURSES.filter((course) => {
    const matchesSearch =
      course.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLevel = selectedLevel === 'all' || course.levelNumber === selectedLevel;
    const matchesCategory = selectedCategory === 'all' || course.categoryId === selectedCategory;
    return matchesSearch && matchesLevel && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'popular') return b.enrolledCount - a.enrolledCount;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.levelNumber - a.levelNumber;
  });

  const activeCourse =
    ACADEMY_COURSES.find((c) => c.id === activeCourseId) || ACADEMY_COURSES[0];
  const activeLesson =
    COURSE_PLAYER_LESSONS.find((l) => l.id === activeLessonId) || COURSE_PLAYER_LESSONS[1];

  const isLessonUnlocked = (lesson: LessonItem): boolean => {
    if (!sequentialLockEnabled || lesson.freePreview || !lesson.prerequisiteLessonId) {
      return true;
    }
    return completedLessonIds.includes(lesson.prerequisiteLessonId);
  };

  const handleCompleteLesson = (lessonId: string) => {
    if (!completedLessonIds.includes(lessonId)) {
      setCompletedLessonIds((prev) => [...prev, lessonId]);
      onEarnPoints?.(25, 'একাডেমি লেসন সম্পন্ন করার জন্য +25 XP অর্জিত!');
      onNotify?.('✓ অভিনন্দন! আপনি লেসনটি সম্পন্ন করেছেন এবং পরবর্তী লেসন আনলক হয়েছে।');
    }
  };

  const handleRunTerminalCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = terminalCmdInput.trim();
    if (!raw) return;

    let output = '';
    let status: 'ok' | 'warn' | 'flag' = 'ok';

    if (raw === 'help') {
      output =
        'Available Multi-Disciplinary Commands:\n' +
        '  [Cyber]  grep "Failed password" /var/log/auth.log\n' +
        '  [Cyber]  ufw status verbose\n' +
        '  [Cyber]  submit-flag HS{BLUE_TEAM_SIEM_DEFENDER_2026}\n' +
        '  [WebDev] npm test | git status | curl -I https://hackersshikkhok.com\n' +
        '  [WP]     wp plugin list | wp core verify-checksums\n' +
        '  [AI/Py]  python3 ai_agent.py | pip list';
    } else if (raw.includes('/var/log/auth.log')) {
      output =
        'Sep 30 20:14:02 lab-sshd[4192]: Failed password for root from 198.51.100.77 port 51204 ssh2 (142 attempts)\n[!] Brute-force pattern identified from 198.51.100.77 -> Task 1 Complete!';
      setLabTasksCompleted((prev) => ({ ...prev, inspectLog: true }));
    } else if (raw.startsWith('ufw')) {
      output =
        'Firewall active and enabled on system startup.\nRule updated: 198.51.100.77 blocked, Port 23/telnet denied, Port 443/HTTPS allowed -> Task 2 Complete!\nDiscovered Lab Verification Flag: HS{BLUE_TEAM_SIEM_DEFENDER_2026}';
      status = 'flag';
      setLabTasksCompleted((prev) => ({ ...prev, checkFirewall: true }));
    } else if (raw.startsWith('submit-flag')) {
      output =
        '✓ FLAG VERIFIED (SHA-256 Match)! +150 XP Awarded. All Authorized Lab Tasks Completed!';
      status = 'flag';
      setLabTasksCompleted({ inspectLog: true, checkFirewall: true, captureFlag: true });
      setLabCompletedBanner(true);
      onEarnPoints?.(150, 'সাইবার সিকিউরিটি প্র্যাকটিক্যাল ল্যাব ফ্ল্যাগ ভেরিফিকেশন সম্পন্ন!');
    } else if (raw.includes('wp plugin list')) {
      output =
        '+----------------------+----------+-----------+---------+\n' +
        '| name                 | status   | update    | version |\n' +
        '+----------------------+----------+-----------+---------+\n' +
        '| hackersshikkhok-core | active   | none      | 4.0.0   |\n' +
        '| hs-cyber-academy-lms | active   | none      | 2.5.0   |\n' +
        '+----------------------+----------+-----------+---------+\n' +
        '✓ Core plugins active and verified with Object-Level Auth.';
    } else if (raw.includes('wp core')) {
      output = 'Success: WordPress installation verifies against checksums. Zero unauthorized modifications.';
    } else if (raw.includes('git status')) {
      output = 'On branch main\nYour branch is up to date with origin/main.\nNothing to commit, working tree clean (All 80+ courses catalog indexed).';
    } else if (raw.includes('npm test')) {
      output = '> hackersshikkhok@4.0.0 test\n> vitest run\n✓ 80 LMS courses schema validation passed\n✓ 520 Tools executed successfully (0 errors)';
    } else if (raw.includes('python3') || raw.includes('python')) {
      output = 'Python 3.12.2 (Sandboxed Environment)\n[AI Prompt Engine] Model: gemini-2.5-flash / Zero-Trust Sanitizer\nQuality Gate Score: 96/100 -> Generated Technical Blueprint.';
    } else if (raw.includes('curl')) {
      output = 'HTTP/2 200 OK\nserver: HackersShikkhok-Shield/4.0\nstrict-transport-security: max-age=31536000\nx-frame-options: SAMEORIGIN\nx-content-type-options: nosniff';
    } else {
      output = `[Sandbox Shell] Executed "${raw}" in isolated container (No production server access). Try "help" for multi-disciplinary commands.`;
    }

    setTerminalHistory((prev) => [...prev, { cmd: raw, output, status }]);
    setTerminalCmdInput('');
  };

  const handleVerifyFlagButton = () => {
    if (flagInput.trim() === 'HS{BLUE_TEAM_SIEM_DEFENDER_2026}') {
      setLabTasksCompleted({ inspectLog: true, checkFirewall: true, captureFlag: true });
      setLabCompletedBanner(true);
      onEarnPoints?.(150, 'সাইবার ল্যাব ফ্ল্যাগ ভেরিফাইড (+150 XP)');
      onNotify?.('🏆 অভিনন্দন! আপনার ল্যাব ফ্ল্যাগ ভেরিফাইড হয়েছে (+150 XP)।');
    } else {
      onNotify?.('⚠️ ফ্ল্যাগটি সঠিক নয়। টার্মিনালে "ufw status" চালিয়ে সঠিক ফ্ল্যাগটি দেখুন।');
    }
  };

  // Calculate Quiz Score
  const totalMarks = QUIZ_QUESTIONS.reduce((acc, q) => acc + q.marks, 0);
  const earnedMarks = QUIZ_QUESTIONS.reduce(
    (acc, q) => (quizAnswers[q.id] === q.correctIndex ? acc + q.marks : acc),
    0
  );
  const scorePercent = Math.round((earnedMarks / totalMarks) * 100);

  const verifiedCertResult = certificates.find(
    (c) => c.certId.toLowerCase() === verifyLookupId.trim().toLowerCase()
  );

  const handleDownloadCertificatePng = (cert: CertificateRecord) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 820;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const grad = ctx.createLinearGradient(0, 0, 1200, 820);
    grad.addColorStop(0, '#050811');
    grad.addColorStop(0.5, '#0b132b');
    grad.addColorStop(1, '#1a103c');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 820);

    ctx.strokeStyle = '#00f5d4';
    ctx.lineWidth = 8;
    ctx.strokeRect(24, 24, 1152, 772);

    ctx.strokeStyle = 'rgba(168, 85, 247, 0.5)';
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 40, 1120, 740);

    ctx.fillStyle = '#00f5d4';
    ctx.font = 'bold 22px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(
      'HACKERS শিক্ষক CYBERSECURITY ACADEMY · OFFICIAL VERIFIED CERTIFICATE',
      600,
      115
    );

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 46px sans-serif';
    ctx.fillText('CERTIFICATE OF COMPLETION', 600, 185);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '20px sans-serif';
    ctx.fillText('This is to proudly certify that', 600, 250);

    ctx.fillStyle = '#00f5d4';
    ctx.font = 'bold 44px sans-serif';
    ctx.fillText(cert.studentName, 600, 320);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '20px sans-serif';
    ctx.fillText(
      'has successfully completed the practical labs, assessments & final examination for',
      600,
      385
    );

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText(cert.courseTitle, 600, 445);

    ctx.fillStyle = '#a78bfa';
    ctx.font = 'bold 20px monospace';
    ctx.fillText(`${cert.levelLabel} · Template: ${cert.templateStyle}`, 600, 495);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '18px monospace';
    ctx.fillText(
      `Certificate ID: ${cert.certId}   |   Issued: ${cert.issueDate}   |   Status: ${cert.status}`,
      600,
      610
    );

    ctx.fillStyle = '#00f5d4';
    ctx.font = '16px monospace';
    ctx.fillText(
      `Verify URL: https://hackersshikkhok.com/academy/certificate/${cert.certId}`,
      600,
      660
    );

    ctx.fillStyle = '#64748b';
    ctx.font = '13px monospace';
    ctx.fillText(`SHA-256 Tamper-Proof Hash: ${cert.sha256Signature}`, 600, 720);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${cert.certId}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 2500);
    }, 'image/png');
  };

  const courseProgressPercent = Math.round(
    (completedLessonIds.length / COURSE_PLAYER_LESSONS.length) * 100
  );

  return (
    <section
      id="cyber-academy-lms-hub"
      className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 border-t border-slate-800/90 space-y-6"
    >
      {/* Academy Master Hero Banner */}
      <div className="rounded-2xl border-2 border-[#00f5d4]/50 bg-gradient-to-br from-[#060c1d] via-[#0b132b] to-[#170f2e] p-6 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00f5d4]/40 bg-[#00f5d4]/10 px-3.5 py-1 text-xs font-extrabold text-[#00f5d4]">
              <GraduationCap className="h-4 w-4" />
              HACKERS শিক্ষক CYBERSECURITY ACADEMY &amp; LMS ECOSYSTEM (SECTIONS 0–154)
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              🎓 প্রফেশনাল সাইবার সিকিউরিটি একাডেমি, ভিজ্যুয়াল লার্নিং, সেফ ল্যাব ও সার্টিফিকেশন প্ল্যাটফর্ম
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Discover → Level 0–8 → Career Learning Path → 3-Column Course Player → Interactive
              Security Diagrams → Authorized Terminal Lab → Quiz &amp; Timed Final Exam → QR
              Verified Certificate (<code className="text-[#00f5d4]">/academy/certificate/ID</code>
              )।
            </p>
          </div>

          {/* Live Academy KPIs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
            <div className="rounded-xl border border-slate-800 bg-slate-950/90 px-3.5 py-2.5">
              <div className="text-lg font-extrabold font-mono text-[#00f5d4]">Levels 0–8</div>
              <div className="text-[11px] text-slate-400">Structured Progression</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/90 px-3.5 py-2.5">
              <div className="text-lg font-extrabold font-mono text-purple-400">17 Types</div>
              <div className="text-[11px] text-slate-400">Rich Visual Lessons</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/90 px-3.5 py-2.5">
              <div className="text-lg font-extrabold font-mono text-emerald-400">Safe Labs</div>
              <div className="text-[11px] text-slate-400">Isolated Terminal/CTF</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/90 px-3.5 py-2.5">
              <div className="text-lg font-extrabold font-mono text-amber-400">SHA-256</div>
              <div className="text-[11px] text-slate-400">Verified Certificates</div>
            </div>
          </div>
        </div>

        {/* 7 Interactive Academy Workspaces Navigation */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-800/90 pt-4">
          {[
            {
              id: 'catalog_paths',
              label: '১. একাডেমি ক্যাটালগ, লেভেল ০–৮ ও কেরিয়ার পাথ',
              icon: BookOpen
            },
            {
              id: 'course_player',
              label: '২. ৩-কলাম কোর্স প্লেয়ার ও ইন্টারেক্টিভ ডায়াগ্রাম',
              icon: Play
            },
            {
              id: 'cyber_lab',
              label: '৩. সেফ সাইবার ল্যাব ও টার্মিনাল সিমুলেটর',
              icon: Terminal
            },
            {
              id: 'quiz_exam_assignment',
              label: '৪. কুইজ, ফাইনাল এক্সাম ও অ্যাসাইনমেন্ট গ্রেডিং',
              icon: FileCheck2
            },
            {
              id: 'certificate_verifier',
              label: '৫. সার্টিফিকেট জেনারেটর ও পাবলিক ভেরিফিকেশন',
              icon: Award
            },
            {
              id: 'student_dashboard',
              label: '৬. স্টুডেন্ট ড্যাশবোর্ড, XP, স্ট্রিক ও স্কিল প্রোগ্রেস',
              icon: Flame
            },
            {
              id: 'admin_instructor_builder',
              label: '৭. ১৬-স্টেপ কোর্স বিল্ডার ও লার্নিং অ্যানালিটিক্স',
              icon: Sliders
            }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveWorkspace(tab.id as typeof activeWorkspace)}
                className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-extrabold transition cursor-pointer ${
                  activeWorkspace === tab.id
                    ? 'bg-[#00f5d4] text-slate-950 shadow-lg shadow-[#00f5d4]/25'
                    : 'border border-slate-700 bg-slate-900/90 text-slate-300 hover:border-[#00f5d4]/40 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* =====================================================================
          WORKSPACE 1: ACADEMY CATALOG, LEVELS 0-8 & CAREER LEARNING PATHS
      ====================================================================== */}
      {activeWorkspace === 'catalog_paths' && (
        <div className="space-y-6">
          {/* Ethical & Defensive Terminology Notice (Section 3) */}
          <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-cyan-200">
              <ShieldCheck className="h-5 w-5 text-[#00f5d4] shrink-0" />
              <span>
                <strong>Authorized Educational &amp; Defensive Charter (Section 3):</strong> White
                Hat, Red Team, Blue Team ও Purple Team এর সকল প্র্যাকটিক্যাল অনুশীলন শুধুমাত্র আমাদের
                আইসোলেটেড স্যান্ডবক্স ল্যাবে পরিচালিত হয়।
              </span>
            </div>
            <span className="font-mono text-[11px] text-[#00f5d4] font-bold">
              Prerequisite &amp; Sequential Locking: ACTIVE
            </span>
          </div>

          {/* 8 Multi-Disciplinary Academy Categories Filter */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-xs font-mono text-[#00f5d4]">
                  8 MULTI-DISCIPLINARY FACULTIES · 80+ PRODUCTION-READY COURSES
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  🎓 বহুবিষয়ক অনুষদ ও কোর্স ক্যাটালগ (All 8 Academic Disciplines)
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Total: {MASTER_COURSES_CATALOG.length}টি লাইভ কোর্স উপলব্ধ
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`rounded-xl p-2.5 text-center border transition cursor-pointer flex flex-col items-center justify-center gap-1 ${
                  selectedCategory === 'all'
                    ? 'border-[#00f5d4] bg-[#00f5d4]/20 text-[#00f5d4] shadow-lg shadow-[#00f5d4]/10 font-bold'
                    : 'border-slate-800 bg-slate-950/80 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <BookOpen className="h-4 w-4" />
                <span className="text-xs font-bold">সমস্ত অনুষদ</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                  {MASTER_COURSES_CATALOG.length}টি
                </span>
              </button>
              {ACADEMY_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                const count = MASTER_COURSES_CATALOG.filter((c) => c.categoryId === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`rounded-xl p-2.5 text-center border transition cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      isSelected
                        ? 'border-[#00f5d4] bg-[#00f5d4]/15 text-white shadow-lg shadow-[#00f5d4]/15 font-bold'
                        : 'border-slate-800 bg-slate-950/80 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                    style={isSelected ? { borderColor: cat.color } : {}}
                  >
                    <span className="text-xs font-bold truncate max-w-full" style={{ color: cat.color }}>
                      {cat.badge}
                    </span>
                    <span className="text-[11px] font-medium line-clamp-1">{cat.nameEn.split(' ')[0]}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                      {count} কোর্স
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search, Category, Level & Sorting Bar */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-12 rounded-2xl border border-slate-800 bg-[#0b1120] p-4">
            <div className="md:col-span-5 relative">
              <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="কোর্স, স্কিল (OWASP, React, WordPress, AI, SEO) বা বিষয় খুঁজুন..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-4 py-2 text-xs text-white focus:border-[#00f5d4] focus:outline-none"
              />
            </div>

            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white"
              >
                <option value="all">সকল ক্যাটাগরি (৮টি অনুষদ)</option>
                {ACADEMY_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nameBn}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <select
                value={selectedLevel}
                onChange={(e) =>
                  setSelectedLevel(e.target.value === 'all' ? 'all' : Number(e.target.value))
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white"
              >
                <option value="all">সকল লেভেল</option>
                {ACADEMY_LEVELS.map((l) => (
                  <option key={l.level} value={l.level}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-[#00f5d4] font-bold"
              >
                <option value="popular">জনপ্রিয়তা (Enrolled)</option>
                <option value="rating">রেটিং (Highest)</option>
                <option value="newest">লেভেল (Advanced)</option>
              </select>
            </div>
          </div>

          {/* Showing Count */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              প্রদর্শিত হচ্ছে: <strong className="text-white">{filteredCourses.length}</strong>টি কোর্স (মোট {MASTER_COURSES_CATALOG.length}টির মধ্যে)
            </span>
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-[#00f5d4] underline cursor-pointer"
              >
                ফিল্টার ক্লিয়ার করুন
              </button>
            )}
          </div>

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => {
              const isEnrolled = enrolledCourseIds.includes(course.id);
              const prereqLocked =
                course.prerequisiteCourseId &&
                !enrolledCourseIds.includes(course.prerequisiteCourseId);
              const categoryMeta = ACADEMY_CATEGORIES.find((c) => c.id === course.categoryId);

              return (
                <div
                  key={course.id}
                  className="rounded-2xl border border-slate-800 bg-[#0b1120] p-5 flex flex-col justify-between hover:border-[#00f5d4]/50 transition shadow-lg group"
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span
                        className="rounded-lg px-2.5 py-0.5 text-[11px] font-mono font-bold border"
                        style={{
                          backgroundColor: `${categoryMeta?.color || '#00f5d4'}15`,
                          borderColor: `${categoryMeta?.color || '#00f5d4'}50`,
                          color: categoryMeta?.color || '#00f5d4'
                        }}
                      >
                        {course.categoryLabelBn}
                      </span>
                      <span className="text-xs font-mono text-amber-400 font-bold">
                        ★ {course.rating} ({course.enrolledCount})
                      </span>
                    </div>

                    <div>
                      <div className="text-[11px] font-mono text-slate-400">
                        Level {course.levelNumber} · {course.courseType}
                      </div>
                      <h3 className="text-base font-extrabold text-white leading-snug group-hover:text-[#00f5d4] transition mt-0.5">
                        {course.titleBn}
                      </h3>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">
                        {course.titleEn}
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                      {course.subtitleBn}
                    </p>

                    {/* Skills Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {course.skills.map((skill, sIdx) => (
                        <span
                          key={`${course.id}-skill-${skill}-${sIdx}`}
                          className="rounded bg-slate-900 border border-slate-800 px-2 py-0.5 text-[10px] font-mono text-cyan-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/90 space-y-3">
                    <div className="grid grid-cols-4 gap-1 text-center text-[11px] font-mono text-slate-300 bg-slate-950 rounded-xl p-2">
                      <div>
                        <span className="block text-[#00f5d4] font-bold">{course.moduleCount}</span>
                        Modules
                      </div>
                      <div>
                        <span className="block text-purple-300 font-bold">
                          {course.lessonCount}
                        </span>
                        Lessons
                      </div>
                      <div>
                        <span className="block text-emerald-300 font-bold">{course.labCount}</span>
                        Labs
                      </div>
                      <div>
                        <span className="block text-amber-300 font-bold">{course.duration}</span>
                        Time
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setSelectedCourseForDetail(course)}
                        className="rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-xs font-bold text-slate-200 hover:border-[#00f5d4] hover:text-white transition cursor-pointer flex items-center justify-center gap-1"
                      >
                        <Info className="h-3.5 w-3.5 text-[#00f5d4]" /> সিলেবাস
                      </button>

                      {prereqLocked ? (
                        <button
                          onClick={() =>
                            onNotify?.(
                              '🔒 এই কোর্সে ভর্তির আগে এর Prerequisite ফাউন্ডেশন কোর্সটি সম্পন্ন বা এনরোল করুন।'
                            )
                          }
                          className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs font-bold text-amber-300 flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Lock className="h-3.5 w-3.5" /> Prereq
                        </button>
                      ) : isEnrolled ? (
                        <button
                          onClick={() => {
                            setActiveCourseId(course.id);
                            setActiveWorkspace('course_player');
                          }}
                          className="rounded-xl bg-[#00f5d4] px-3 py-2 text-xs font-extrabold text-slate-950 hover:bg-[#00f5d4]/90 cursor-pointer"
                        >
                          ▶️ প্লেয়ার
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setEnrolledCourseIds((prev) => [...prev, course.id]);
                            setActiveCourseId(course.id);
                            onEarnPoints?.(30, `${course.titleEn} কোর্সে এনরোলমেন্ট বোনাস!`);
                            onNotify?.(`🎉 সফলভাবে "${course.titleBn}" কোর্সে এনরোল হয়েছেন!`);
                          }}
                          className="rounded-xl border border-[#00f5d4] bg-[#00f5d4]/15 px-3 py-2 text-xs font-extrabold text-[#00f5d4] hover:bg-[#00f5d4] hover:text-slate-950 transition cursor-pointer"
                        >
                          + এনরোল
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Modal: Interactive Course Syllabus & Curriculum Breakdown Drawer */}
          {selectedCourseForDetail && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
              <div className="relative w-full max-w-2xl rounded-2xl border border-[#00f5d4]/40 bg-[#0b1120] p-6 space-y-5 shadow-2xl my-8">
                <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <span className="rounded-lg bg-[#00f5d4]/15 border border-[#00f5d4]/40 px-2.5 py-0.5 text-[11px] font-mono font-bold text-[#00f5d4]">
                      {selectedCourseForDetail.categoryLabelBn} · Level {selectedCourseForDetail.levelNumber}
                    </span>
                    <h3 className="text-xl font-extrabold text-white mt-1.5 leading-snug">
                      {selectedCourseForDetail.titleBn}
                    </h3>
                    <div className="text-xs text-slate-400 font-mono">
                      {selectedCourseForDetail.titleEn}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCourseForDetail(null)}
                    className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedCourseForDetail.subtitleBn}
                </p>

                {/* Course Metrics Overview */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">মেয়াদ ও সময়</span>
                    <strong className="text-amber-300 font-mono">{selectedCourseForDetail.duration}</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">মডিউল ও লেসন</span>
                    <strong className="text-[#00f5d4] font-mono">
                      {selectedCourseForDetail.moduleCount} M / {selectedCourseForDetail.lessonCount} L
                    </strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">হ্যান্ডস-অন ল্যাব</span>
                    <strong className="text-emerald-300 font-mono">
                      {selectedCourseForDetail.labCount}টি প্র্যাকটিক্যাল
                    </strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">কোর্স টাইপ</span>
                    <strong className="text-purple-300 font-mono">{selectedCourseForDetail.courseType}</strong>
                  </div>
                </div>

                {/* Skills Acquired */}
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-200">অর্জিত স্কিলসমূহ (Competencies):</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCourseForDetail.skills.map((s, sIdx) => (
                      <span
                        key={`${selectedCourseForDetail.id}-skill-${s}-${sIdx}`}
                        className="rounded-lg bg-slate-900 border border-slate-800 px-2.5 py-1 text-xs font-mono text-cyan-300"
                      >
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Detailed Curriculum Modules */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-200">
                    বিস্তারিত কারিকুলাম ও সিলেবাস ব্রেকডাউন:
                  </span>
                  <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                    {selectedCourseForDetail.curriculumOverview ? (
                      selectedCourseForDetail.curriculumOverview.map((m, idx) => (
                        <div key={idx} className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-1">
                          <div className="text-xs font-extrabold text-[#00f5d4]">{m.moduleTitle}</div>
                          <ul className="text-[11px] text-slate-300 list-disc list-inside space-y-0.5">
                            {m.topics.map((t, tidx) => (
                              <li key={tidx}>{t}</li>
                            ))}
                          </ul>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-1.5 text-xs text-slate-300">
                        <div className="font-bold text-[#00f5d4]">
                          মডিউল ১–{selectedCourseForDetail.moduleCount}: তাত্ত্বিক ও ব্যবহারিক শিখন
                        </div>
                        <p className="text-[11px] text-slate-400">
                          এই কোর্সে মোট {selectedCourseForDetail.moduleCount}টি মডিউলে {selectedCourseForDetail.lessonCount}টি মাল্টিমিডিয়া লেসন, {selectedCourseForDetail.labCount}টি সেফ স্যান্ডবক্স ল্যাব এবং আন্তর্জাতিক স্ট্যান্ডার্ডের ফাইনাল সার্টিফিকেশন এক্সাম অন্তর্ভুক্ত।
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Instructor & Actions Footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
                  <div className="text-xs text-slate-400">
                    ইন্সট্রাক্টর: <strong className="text-white">{selectedCourseForDetail.instructor}</strong>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const cid = selectedCourseForDetail.id;
                        if (!enrolledCourseIds.includes(cid)) {
                          setEnrolledCourseIds((prev) => [...prev, cid]);
                          onEarnPoints?.(30, `${selectedCourseForDetail.titleEn} এনরোলমেন্ট বোনাস!`);
                          onNotify?.(`🎉 সফলভাবে "${selectedCourseForDetail.titleBn}" কোর্সে এনরোল হয়েছেন!`);
                        }
                        setActiveCourseId(cid);
                        setSelectedCourseForDetail(null);
                        setActiveWorkspace('course_player');
                      }}
                      className="rounded-xl bg-[#00f5d4] px-4 py-2 text-xs font-extrabold text-slate-950 hover:bg-[#00f5d4]/90 cursor-pointer"
                    >
                      {enrolledCourseIds.includes(selectedCourseForDetail.id)
                        ? '▶️ প্লেয়ার খুলুন'
                        : '+ এনরোল করে শুরু করুন'}
                    </button>
                    <button
                      onClick={() => setSelectedCourseForDetail(null)}
                      className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-bold text-slate-300 hover:text-white cursor-pointer"
                    >
                      বন্ধ করুন
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Structured Career Learning Paths (All 8 Multi-Disciplinary Tracks) */}
          <div className="rounded-2xl border border-slate-800 bg-[#0b1120] p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-xs font-mono text-[#00f5d4]">
                  8 DISCIPLINARY CAREER LEARNING TRACKS · GUIDED ROADMAPS
                </span>
                <h3 className="text-lg font-extrabold text-white mt-0.5">
                  🧭 ৮টি পূর্ণাঙ্গ কেরিয়ার ট্র্যাক ও গাইডেড লার্নিং রোডম্যাপ
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">
                8 Active Multi-Disciplinary Tracks · Prerequisite Linked
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {CAREER_LEARNING_PATHS.map((path) => {
                const completedInPath = path.courseIds.filter((id) =>
                  enrolledCourseIds.includes(id)
                ).length;
                const pathPct = Math.round((completedInPath / path.courseIds.length) * 100);

                return (
                  <div
                    key={path.id}
                    className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-sm font-extrabold text-white">{path.titleBn}</div>
                          <div className="text-xs text-slate-400 mt-0.5">
                            Target Career Role:{' '}
                            <strong className="text-[#00f5d4]">{path.targetRole}</strong> ·{' '}
                            {path.estimatedWeeks} Weeks
                          </div>
                        </div>
                        <span className="rounded-lg bg-purple-500/15 border border-purple-500/30 px-2.5 py-1 text-[11px] font-mono font-bold text-purple-300 shrink-0">
                          {path.badgeName}
                        </span>
                      </div>

                      {path.descriptionBn && (
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {path.descriptionBn}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-900">
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#00f5d4] to-purple-500"
                          style={{ width: `${pathPct}%` }}
                        />
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span className="font-mono text-slate-300">
                          Progress: {completedInPath}/{path.courseIds.length} Courses ({pathPct}%)
                        </span>
                        <button
                          onClick={() => {
                            if (path.courseIds.length > 0) {
                              setActiveCourseId(path.courseIds[0]);
                            }
                            setActiveWorkspace('course_player');
                          }}
                          className="text-[#00f5d4] font-extrabold hover:underline cursor-pointer"
                        >
                          পাথ শুরু করুন →
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          WORKSPACE 2: 3-COLUMN COURSE PLAYER & VISUAL DIAGRAM TEACHING ENGINE
      ====================================================================== */}
      {activeWorkspace === 'course_player' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* LEFT COLUMN (3 Cols): Curriculum Tree & Sequential Lesson Locking */}
          <div className="lg:col-span-3 rounded-2xl border border-slate-800 bg-[#0b1120] p-4 space-y-4">
            <div className="border-b border-slate-800 pb-3 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[#00f5d4] font-bold">CURRICULUM</span>
                <button
                  onClick={() => setSequentialLockEnabled(!sequentialLockEnabled)}
                  className="rounded bg-slate-900 px-2 py-0.5 text-[10px] font-mono text-slate-300 border border-slate-700 cursor-pointer"
                >
                  Lock: {sequentialLockEnabled ? 'ON' : 'OFF'}
                </button>
              </div>
              <h3 className="text-sm font-extrabold text-white line-clamp-2">
                {activeCourse.titleBn}
              </h3>
              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden mt-2">
                <div
                  className="h-full bg-[#00f5d4]"
                  style={{ width: `${courseProgressPercent}%` }}
                />
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                Course Progress: {courseProgressPercent}% ({completedLessonIds.length}/
                {COURSE_PLAYER_LESSONS.length})
              </div>
            </div>

            <div className="space-y-2">
              {COURSE_PLAYER_LESSONS.map((lesson) => {
                const unlocked = isLessonUnlocked(lesson);
                const isDone = completedLessonIds.includes(lesson.id);
                const isCurrent = activeLessonId === lesson.id;

                return (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      if (!unlocked) {
                        onNotify?.(
                          '🔒 এই লেসনটি আনলক করতে পূর্ববর্তী লেসনটি সম্পন্ন করুন (Sequential Learning Lock)।'
                        );
                        return;
                      }
                      setActiveLessonId(lesson.id);
                    }}
                    className={`w-full text-left rounded-xl p-3 border transition cursor-pointer ${
                      isCurrent
                        ? 'border-[#00f5d4] bg-[#00f5d4]/10'
                        : unlocked
                        ? 'border-slate-800 bg-slate-950 hover:border-slate-700'
                        : 'border-slate-900 bg-slate-950/50 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>{lesson.type}</span>
                      <span>{lesson.duration}</span>
                    </div>
                    <div className="mt-1 text-xs font-bold text-white flex items-start justify-between gap-2">
                      <span>{lesson.titleBn}</span>
                      {isDone ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      ) : !unlocked ? (
                        <Lock className="h-4 w-4 text-amber-400 shrink-0" />
                      ) : null}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CENTER COLUMN (6 Cols): Video + Transcript + Interactive Architecture Diagram + Code Learning */}
          <div className="lg:col-span-6 space-y-5 rounded-2xl border border-slate-800 bg-[#0b1120] p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <div className="text-xs font-mono text-[#00f5d4]">
                  {activeLesson.moduleTitle} · {activeLesson.type}
                </div>
                <h3 className="text-lg font-extrabold text-white mt-0.5">{activeLesson.titleBn}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setBookmarkedLessonIds((prev) =>
                      prev.includes(activeLesson.id)
                        ? prev.filter((id) => id !== activeLesson.id)
                        : [...prev, activeLesson.id]
                    );
                  }}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold border cursor-pointer ${
                    bookmarkedLessonIds.includes(activeLesson.id)
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                      : 'border-slate-700 bg-slate-900 text-slate-300'
                  }`}
                >
                  🔖 {bookmarkedLessonIds.includes(activeLesson.id) ? 'Bookmarked' : 'Bookmark'}
                </button>
                <button
                  onClick={() => handleCompleteLesson(activeLesson.id)}
                  className="rounded-lg bg-[#00f5d4] px-3.5 py-1.5 text-xs font-extrabold text-slate-950 cursor-pointer"
                >
                  ✓ Mark Complete
                </button>
              </div>
            </div>

            {/* Interactive Visual Security Architecture Diagram & Red Arrow Vector Engine */}
            <div className="rounded-xl border border-[#00f5d4]/40 bg-slate-950 p-4 space-y-4 shadow-lg shadow-[#00f5d4]/10">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-rose-500/20 text-rose-400 border border-rose-500/40 text-[11px] font-mono px-2 py-0.5 font-bold">
                    RED CALLOUT ARROWS
                  </span>
                  <span className="text-xs font-extrabold text-[#00f5d4]">
                    📐 ডায়নামিক ভেক্টর ডায়াগ্রাম ও আর্কিটেকচার অ্যানোটেশন ইঞ্জিন (SVG_Annotator)
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'sqli', label: '🛡️ SQLi Prepared Statements' },
                    { id: 'jwt', label: '🔐 JWT Token Signature' },
                    { id: 'dmz', label: '🌐 DMZ Network Defense' },
                    { id: 'xss', label: '⚡ XSS Encoding Shield' }
                  ].map((diag) => (
                    <button
                      key={diag.id}
                      onClick={() => setActiveVectorDiagram(diag.id as typeof activeVectorDiagram)}
                      className={`rounded-lg px-2.5 py-1 text-[11px] font-mono font-bold transition cursor-pointer ${
                        activeVectorDiagram === diag.id
                          ? 'bg-[#00f5d4] text-slate-950 shadow-md'
                          : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      {diag.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic SVG Vector Stage with Red Callout Arrows */}
              <div className="rounded-xl border border-slate-800 bg-[#0a0e17] p-3 overflow-hidden">
                {activeVectorDiagram === 'sqli' && (
                  <svg viewBox="0 0 900 380" className="w-full h-auto block select-none">
                    <defs>
                      <marker id="redArr" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                        <path d="M 0 1 L 10 5 L 0 9 z" fill="#ff3366" />
                      </marker>
                      <marker id="cyanArr" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                        <path d="M 0 1 L 10 5 L 0 9 z" fill="#00f5d4" />
                      </marker>
                      <marker id="greenArr" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                        <path d="M 0 1 L 10 5 L 0 9 z" fill="#00ff66" />
                      </marker>
                    </defs>
                    <g stroke="#1e293b" strokeWidth="1" opacity="0.4">
                      <line x1="0" y1="60" x2="900" y2="60" />
                      <line x1="0" y1="180" x2="900" y2="180" />
                      <line x1="0" y1="300" x2="900" y2="300" />
                    </g>
                    {/* STEP 1: Client Input */}
                    <g transform="translate(40, 60)">
                      <rect width="210" height="150" rx="10" fill="#111827" stroke="#374151" strokeWidth="2" />
                      <rect width="210" height="30" rx="10" fill="#1f2937" />
                      <text x="20" y="20" fill="#9ca3af" fontFamily="monospace" fontSize="11" fontWeight="bold">STEP 1: CLIENT INPUT</text>
                      <text x="15" y="55" fill="#e5e7eb" fontFamily="sans-serif" fontSize="11">Untrusted User String:</text>
                      <rect x="15" y="65" width="180" height="28" rx="4" fill="#030712" stroke="#4b5563" />
                      <text x="22" y="83" fill="#f87171" fontFamily="monospace" fontSize="10">admin' OR '1'='1'--</text>
                      <text x="15" y="125" fill="#94a3b8" fontFamily="sans-serif" fontSize="10">Malicious injection payload</text>
                    </g>
                    {/* Step 1 Badge */}
                    <rect x="110" y="45" width="65" height="22" rx="11" fill="#7c3aed" />
                    <text x="142" y="60" fill="#ffffff" fontFamily="monospace" fontSize="11" fontWeight="bold" textAnchor="middle">STEP 1</text>
                    {/* Flow arrow */}
                    <path d="M 250 135 L 340 135" stroke="#00f5d4" strokeWidth="2.5" strokeDasharray="5 3" markerEnd="url(#cyanArr)" />
                    {/* STEP 2: Prepared Statement */}
                    <g transform="translate(350, 60)">
                      <rect width="240" height="150" rx="10" fill="#111827" stroke="#00f5d4" strokeWidth="2" />
                      <rect width="240" height="30" rx="10" fill="#0b2326" />
                      <text x="120" y="20" fill="#00f5d4" fontFamily="monospace" fontSize="11" fontWeight="bold" textAnchor="middle">STEP 2: PDO PREPARE</text>
                      <rect x="15" y="45" width="210" height="40" rx="6" fill="#050811" stroke="#10b981" />
                      <text x="22" y="62" fill="#10b981" fontFamily="monospace" fontSize="10">SELECT * FROM users</text>
                      <text x="22" y="76" fill="#00f5d4" fontFamily="monospace" fontSize="10">WHERE user = :u</text>
                      <rect x="15" y="95" width="210" height="30" rx="6" fill="#1e1b4b" stroke="#7c3aed" />
                      <text x="22" y="114" fill="#a78bfa" fontFamily="monospace" fontSize="10">stmt-&gt;bindParam(':u', $val)</text>
                    </g>
                    <rect x="440" y="45" width="65" height="22" rx="11" fill="#00f5d4" />
                    <text x="472" y="60" fill="#050811" fontFamily="monospace" fontSize="11" fontWeight="bold" textAnchor="middle">STEP 2</text>
                    {/* RED CALLOUT ARROW 1 */}
                    <path d="M 470 290 C 470 250 470 230 470 215" stroke="#ff3366" strokeWidth="3.5" markerEnd="url(#redArr)" />
                    <g transform="translate(350, 290)">
                      <rect width="240" height="65" rx="8" fill="#2d0614" stroke="#ff3366" strokeWidth="1.5" />
                      <text x="15" y="22" fill="#ff3366" fontFamily="sans-serif" fontWeight="bold" fontSize="11">🚨 CRITICAL DEFENSE MECHANISM</text>
                      <text x="15" y="40" fill="#fecdd3" fontFamily="sans-serif" fontSize="10">Database binds value as strict</text>
                      <text x="15" y="54" fill="#ffffff" fontFamily="monospace" fontWeight="bold" fontSize="10">LITERAL STRING — Code is never parsed!</text>
                    </g>
                    {/* Flow arrow to DB */}
                    <path d="M 590 135 L 675 135" stroke="#00ff66" strokeWidth="2.5" markerEnd="url(#greenArr)" />
                    {/* STEP 3: DB Execution */}
                    <g transform="translate(685, 60)">
                      <rect width="180" height="150" rx="10" fill="#111827" stroke="#00ff66" strokeWidth="2" />
                      <rect width="180" height="30" rx="10" fill="#06301a" />
                      <text x="90" y="20" fill="#00ff66" fontFamily="monospace" fontSize="11" fontWeight="bold" textAnchor="middle">DATABASE ENGINE</text>
                      <rect x="20" y="45" width="140" height="24" rx="4" fill="#052e16" stroke="#00ff66" />
                      <text x="90" y="61" fill="#86efac" fontFamily="monospace" fontSize="10" textAnchor="middle">TABLE LOCK: OK</text>
                      <text x="90" y="105" fill="#86efac" fontFamily="sans-serif" fontSize="12" fontWeight="bold" textAnchor="middle">SAFE EXECUTION</text>
                      <text x="90" y="125" fill="#6ee7b7" fontFamily="sans-serif" fontSize="10" textAnchor="middle">Zero Injection</text>
                    </g>
                    <rect x="745" y="45" width="65" height="22" rx="11" fill="#00ff66" />
                    <text x="777" y="60" fill="#050811" fontFamily="monospace" fontSize="11" fontWeight="bold" textAnchor="middle">STEP 3</text>
                  </svg>
                )}

                {activeVectorDiagram === 'jwt' && (
                  <svg viewBox="0 0 900 350" className="w-full h-auto block select-none">
                    <defs>
                      <marker id="redArrJwt" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                        <path d="M 0 1 L 10 5 L 0 9 z" fill="#ff3366" />
                      </marker>
                    </defs>
                    <g transform="translate(50, 50)">
                      <rect x="0" y="0" width="180" height="110" rx="8" fill="#18181b" stroke="#ef4444" strokeWidth="2" />
                      <text x="15" y="26" fill="#ef4444" fontFamily="monospace" fontWeight="bold" fontSize="12">1. HEADER (alg/typ)</text>
                      <text x="15" y="50" fill="#9ca3af" fontFamily="monospace" fontSize="10">&#123;&quot;alg&quot;: &quot;HS256&quot;&#125;</text>
                      <rect x="200" y="0" width="220" height="110" rx="8" fill="#18181b" stroke="#a78bfa" strokeWidth="2" />
                      <text x="215" y="26" fill="#a78bfa" fontFamily="monospace" fontWeight="bold" fontSize="12">2. PAYLOAD (claims)</text>
                      <text x="215" y="50" fill="#9ca3af" fontFamily="monospace" fontSize="10">&#123;&quot;sub&quot;: &quot;1042&quot;, &quot;role&quot;: &quot;cadet&quot;&#125;</text>
                      <rect x="440" y="0" width="220" height="110" rx="8" fill="#18181b" stroke="#00f5d4" strokeWidth="2" />
                      <text x="455" y="26" fill="#00f5d4" fontFamily="monospace" fontWeight="bold" fontSize="12">3. HMAC SIGNATURE</text>
                      <text x="455" y="50" fill="#9ca3af" fontFamily="monospace" fontSize="9">HMACSHA256(H.P, SECRET)</text>
                    </g>
                    <g transform="translate(730, 50)">
                      <rect width="130" height="110" rx="8" fill="#052e16" stroke="#10b981" strokeWidth="2" />
                      <text x="65" y="45" fill="#34d399" fontFamily="monospace" fontWeight="bold" fontSize="12" textAnchor="middle">GATEWAY</text>
                      <text x="65" y="75" fill="#6ee7b7" fontFamily="sans-serif" fontSize="10" textAnchor="middle">Sig Verified</text>
                    </g>
                    <path d="M 550 250 C 550 200 550 180 550 165" stroke="#ff3366" strokeWidth="3.5" markerEnd="url(#redArrJwt)" />
                    <g transform="translate(410, 250)">
                      <rect width="280" height="70" rx="8" fill="#2d0614" stroke="#ff3366" strokeWidth="1.5" />
                      <text x="15" y="24" fill="#ff3366" fontFamily="sans-serif" fontWeight="bold" fontSize="11">🚨 CRYPTO VERIFICATION POINT</text>
                      <text x="15" y="44" fill="#fecdd3" fontFamily="sans-serif" fontSize="10">If attacker changes role to admin,</text>
                      <text x="15" y="58" fill="#ffffff" fontFamily="monospace" fontWeight="bold" fontSize="10">signature mismatch drops request (401)!</text>
                    </g>
                  </svg>
                )}

                {activeVectorDiagram === 'dmz' && (
                  <svg viewBox="0 0 900 350" className="w-full h-auto block select-none">
                    <defs>
                      <marker id="redArrDmz" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                        <path d="M 0 1 L 10 5 L 0 9 z" fill="#ff3366" />
                      </marker>
                    </defs>
                    <g transform="translate(40, 60)">
                      <rect width="180" height="130" rx="10" fill="#18181b" stroke="#6b7280" strokeWidth="2" />
                      <text x="90" y="30" fill="#9ca3af" fontFamily="monospace" fontWeight="bold" fontSize="11" textAnchor="middle">PUBLIC INTERNET</text>
                      <text x="90" y="70" fill="#e5e7eb" fontFamily="sans-serif" fontSize="10" textAnchor="middle">Untrusted Traffic</text>
                    </g>
                    <g transform="translate(250, 40)">
                      <rect width="50" height="170" rx="8" fill="#7f1d1d" stroke="#ef4444" strokeWidth="2" />
                      <text x="25" y="85" fill="#fca5a5" fontFamily="monospace" fontWeight="bold" fontSize="10" textAnchor="middle" transform="rotate(-90 25 85)">EXT FW</text>
                    </g>
                    <g transform="translate(330, 60)">
                      <rect width="210" height="130" rx="10" fill="#0f172a" stroke="#00f5d4" strokeWidth="2" />
                      <text x="105" y="30" fill="#00f5d4" fontFamily="monospace" fontWeight="bold" fontSize="11" textAnchor="middle">DMZ ZONE (ISOLATED)</text>
                      <text x="105" y="65" fill="#e2e8f0" fontFamily="sans-serif" fontSize="10" textAnchor="middle">Nginx Reverse Proxy / WAF</text>
                    </g>
                    <g transform="translate(570, 40)">
                      <rect width="50" height="170" rx="8" fill="#7f1d1d" stroke="#ef4444" strokeWidth="2" />
                      <text x="25" y="85" fill="#fca5a5" fontFamily="monospace" fontWeight="bold" fontSize="10" textAnchor="middle" transform="rotate(-90 25 85)">INT FW</text>
                    </g>
                    <g transform="translate(650, 60)">
                      <rect width="210" height="130" rx="10" fill="#052e16" stroke="#10b981" strokeWidth="2" />
                      <text x="105" y="30" fill="#34d399" fontFamily="monospace" fontWeight="bold" fontSize="11" textAnchor="middle">SECURE CORE VAULT</text>
                      <text x="105" y="65" fill="#e2e8f0" fontFamily="sans-serif" fontSize="10" textAnchor="middle">MySQL Cluster (No Public IP)</text>
                    </g>
                    <path d="M 595 260 C 595 230 595 220 595 212" stroke="#ff3366" strokeWidth="3.5" markerEnd="url(#redArrDmz)" />
                    <g transform="translate(460, 260)">
                      <rect width="270" height="60" rx="8" fill="#2d0614" stroke="#ff3366" strokeWidth="1.5" />
                      <text x="15" y="24" fill="#ff3366" fontFamily="sans-serif" fontWeight="bold" fontSize="11">🚨 BOUNDARY POLICY</text>
                      <text x="15" y="44" fill="#ffffff" fontFamily="monospace" fontSize="9">Port 3306 ONLY from DMZ Proxy IP</text>
                    </g>
                  </svg>
                )}

                {activeVectorDiagram === 'xss' && (
                  <svg viewBox="0 0 900 330" className="w-full h-auto block select-none">
                    <defs>
                      <marker id="redArrXss" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                        <path d="M 0 1 L 10 5 L 0 9 z" fill="#ff3366" />
                      </marker>
                    </defs>
                    <g transform="translate(50, 50)">
                      <rect width="210" height="110" rx="8" fill="#18181b" stroke="#ef4444" strokeWidth="2" />
                      <text x="15" y="26" fill="#f87171" fontFamily="monospace" fontWeight="bold" fontSize="11">MALICIOUS INPUT</text>
                      <text x="15" y="55" fill="#fca5a5" fontFamily="monospace" fontSize="10">&lt;script&gt;alert(1)&lt;/script&gt;</text>
                    </g>
                    <g transform="translate(340, 50)">
                      <rect width="220" height="110" rx="8" fill="#18181b" stroke="#10b981" strokeWidth="2" />
                      <text x="15" y="26" fill="#34d399" fontFamily="monospace" fontWeight="bold" fontSize="11">CONTEXT ESCAPER</text>
                      <text x="15" y="55" fill="#86efac" fontFamily="monospace" fontSize="10">htmlspecialchars($input)</text>
                    </g>
                    <g transform="translate(640, 50)">
                      <rect width="210" height="110" rx="8" fill="#18181b" stroke="#00f5d4" strokeWidth="2" />
                      <text x="15" y="26" fill="#00f5d4" fontFamily="monospace" fontWeight="bold" fontSize="11">SAFE BROWSER DOM</text>
                      <text x="15" y="55" fill="#67e8f9" fontFamily="sans-serif" fontSize="10">Rendered safely as text string</text>
                    </g>
                    <path d="M 450 230 C 450 200 450 180 450 165" stroke="#ff3366" strokeWidth="3.5" markerEnd="url(#redArrXss)" />
                    <g transform="translate(310, 230)">
                      <rect width="280" height="60" rx="8" fill="#2d0614" stroke="#ff3366" strokeWidth="1.5" />
                      <text x="15" y="24" fill="#ff3366" fontFamily="sans-serif" fontWeight="bold" fontSize="11">🚨 SANITIZATION BARRIER</text>
                      <text x="15" y="44" fill="#ffffff" fontFamily="monospace" fontSize="9">Always apply context-aware encoding!</text>
                    </g>
                  </svg>
                )}
              </div>

              {/* Clickable Network Nodes Flow */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2 border-t border-slate-800">
                {INTERACTIVE_DIAGRAM_NODES.map((node) => {
                  const active = selectedDiagramNode.id === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedDiagramNode(node)}
                      className={`rounded-xl p-2.5 text-left border transition cursor-pointer ${
                        active
                          ? 'border-[#00f5d4] bg-[#00f5d4]/15 shadow-md shadow-[#00f5d4]/20'
                          : 'border-slate-800 bg-slate-900 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#00f5d4]">
                        <span>NODE #{node.number}</span>
                        <span>{node.zone.split(' ')[0]}</span>
                      </div>
                      <div className="mt-1 text-xs font-bold text-white line-clamp-2">
                        {node.label}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Node Annotated Details */}
              <div className="rounded-xl border border-slate-800 bg-[#0b1120] p-4 space-y-2 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-extrabold text-white">
                    [{selectedDiagramNode.number}] {selectedDiagramNode.label}
                  </span>
                  <span className="rounded bg-emerald-500/15 px-2.5 py-0.5 font-mono text-[11px] text-emerald-300">
                    Control: {selectedDiagramNode.securityControl}
                  </span>
                </div>
                <p className="text-rose-300">
                  <strong>⚠️ সম্ভাব্য আক্রমণ পৃষ্ঠ (Attack Surface):</strong>{' '}
                  {selectedDiagramNode.attackSurfaceBn}
                </p>
                <p className="text-emerald-300">
                  <strong>🛡️ ডিফেন্সিভ মিটিগেশন (Defense Mitigation):</strong>{' '}
                  {selectedDiagramNode.defenseMitigationBn}
                </p>
              </div>
            </div>

            {/* Video Chapter & Searchable Transcript Engine (Sections 31, 32) */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-xs font-bold text-white">
                  🎬 ভিডিও চ্যাপ্টার, প্লেব্যাক স্পিড ({videoSpeed}) ও সার্চেবল ট্রান্সক্রিপ্ট (Timestamp
                  Jump)
                </div>
                <div className="flex items-center gap-1">
                  {(['1x', '1.25x', '1.5x', '2x'] as const).map((spd) => (
                    <button
                      key={spd}
                      onClick={() => setVideoSpeed(spd)}
                      className={`rounded px-2 py-0.5 text-[10px] font-mono font-bold cursor-pointer ${
                        videoSpeed === spd
                          ? 'bg-[#00f5d4] text-slate-950'
                          : 'bg-slate-900 text-slate-400'
                      }`}
                    >
                      {spd}
                    </button>
                  ))}
                </div>
              </div>

              <input
                type="text"
                value={transcriptQuery}
                onChange={(e) => setTranscriptQuery(e.target.value)}
                placeholder="ট্রান্সক্রিপ্টের ভেতরে শব্দ খুঁজুন (যেমন: Nonce, WAF, SQL)..."
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-white"
              />

              <div className="space-y-1.5 text-xs">
                {[
                  {
                    time: '00:45',
                    line: 'স্বাগতম! আজ আমরা Defense-in-Depth এবং WAF রেট লিমিটিংয়ের বাস্তব আর্কিটেকচার দেখব।'
                  },
                  {
                    time: '02:15',
                    line: 'ওয়ার্ডপ্রেস REST API এন্ডপয়েন্টে permission_callback ও Nonce ছাড়া ডেটা প্রসেস করা যাবে না।'
                  },
                  {
                    time: '05:40',
                    line: '$wpdb->prepare() ব্যবহারের মাধ্যমে আমরা শতভাগ SQL Injection প্রতিরোধ নিশ্চিত করি।'
                  }
                ]
                  .filter((item) =>
                    item.line.toLowerCase().includes(transcriptQuery.toLowerCase())
                  )
                  .map((item) => (
                    <button
                      key={item.time}
                      onClick={() => setActiveTimestamp(item.time)}
                      className={`w-full text-left rounded-lg px-3 py-1.5 flex items-center gap-3 cursor-pointer ${
                        activeTimestamp === item.time
                          ? 'bg-[#00f5d4]/15 border border-[#00f5d4]/40 text-white font-bold'
                          : 'bg-slate-900 text-slate-300'
                      }`}
                    >
                      <span className="font-mono text-[#00f5d4]">[{item.time}]</span>
                      <span>{item.line}</span>
                    </button>
                  ))}
              </div>
            </div>

            {/* Code Learning Block with Hint & Solution Reveal (Section 17) */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">
                  💻 সিকিউর কোড লার্নিং চ্যালেঞ্জ (Before vs After Vulnerability Patch)
                </span>
                <button
                  onClick={() => setShowCodeSolution(!showCodeSolution)}
                  className="rounded-lg bg-purple-500/20 border border-purple-500/40 px-3 py-1 text-xs font-bold text-purple-300 cursor-pointer"
                >
                  {showCodeSolution ? 'Hide Solution' : 'Reveal Patched Solution'}
                </button>
              </div>
              <pre className="rounded-lg bg-[#050811] p-3 text-xs font-mono text-emerald-300 overflow-x-auto">
                {showCodeSolution
                  ? `// ✅ SECURE PATCHED CODE (PHP 8.2+ Prepared Statement + Capability Check)\nif ( ! current_user_can( 'edit_posts' ) || ! wp_verify_nonce( $_POST['_wpnonce'], 'hs_action' ) ) {\n    wp_send_json_error( 'Forbidden', 403 );\n}\n$results = $wpdb->get_results( $wpdb->prepare( "SELECT * FROM {$table} WHERE user_id = %d", $uid ) );`
                  : `// ❌ VULNERABLE CODE (Identify why this code is unsafe)\n$uid = $_POST['user_id'];\n$results = $wpdb->get_results( "SELECT * FROM {$table} WHERE user_id = " . $uid );`}
              </pre>
            </div>
          </div>

          {/* RIGHT COLUMN (3 Cols): TTS Player, CTF Flag Challenge, Personal Notes & Resources */}
          <div className="lg:col-span-3 rounded-2xl border border-slate-800 bg-[#0b1120] p-4 space-y-4">
            {/* Audio Lecture TTS Player (Male/Female Toggle) */}
            <div className="rounded-xl border border-[#00f5d4]/30 bg-slate-950 p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#00f5d4] font-bold">🎙️ AUDIO LECTURE (TTS)</span>
                <span className="text-[10px] text-slate-400 font-mono">SpeechSynthesis</span>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={ttsGender}
                  onChange={(e) => setTtsGender(e.target.value as typeof ttsGender)}
                  className="rounded-lg bg-slate-900 border border-slate-700 px-2.5 py-1 text-xs text-cyan-300 font-mono"
                >
                  <option value="female">👩 Female Cyber Voice</option>
                  <option value="male">👨 Male Cyber Voice</option>
                </select>
                <button
                  onClick={() => {
                    if (!('speechSynthesis' in window)) {
                      onNotify?.('⚠️ আপনার ব্রাউজারে Text-To-Speech সাপোর্ট নেই।');
                      return;
                    }
                    if (ttsIsPlaying) {
                      window.speechSynthesis.cancel();
                      setTtsIsPlaying(false);
                      onNotify?.('⏹️ অডিও প্লেব্যাক থামানো হয়েছে।');
                    } else {
                      const text = `${activeLesson.titleBn}. ${activeLesson.moduleTitle}. ${selectedDiagramNode.label}. ${selectedDiagramNode.defenseMitigationBn}`;
                      const utterance = new SpeechSynthesisUtterance(text);
                      utterance.rate = 0.95;
                      utterance.onend = () => setTtsIsPlaying(false);
                      window.speechSynthesis.speak(utterance);
                      setTtsIsPlaying(true);
                      onNotify?.(`🔊 অডিও লেকচার প্লে হচ্ছে (${ttsGender === 'female' ? 'Female' : 'Male'} Voice)...`);
                    }
                  }}
                  className={`flex-1 rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                    ttsIsPlaying
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-[#00f5d4]/20 border border-[#00f5d4]/50 text-[#00f5d4] hover:bg-[#00f5d4]/30'
                  }`}
                >
                  {ttsIsPlaying ? '⏹️ Stop Audio' : '🔊 Listen Lecture'}
                </button>
              </div>
            </div>

            {/* Active CTF Flag Challenge & Instant Wallet Bounty Claim */}
            <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-3.5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-rose-400 font-extrabold">🚩 CTF FLAG BOUNTY</span>
                <span className="rounded bg-rose-500 text-slate-950 px-2 py-0.5 text-[10px] font-mono font-bold">
                  +150 XP &amp; ৳25 BDT
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                টার্মিনাল বা ডায়াগ্রাম বিশ্লেষণ করে প্রাপ্ত ফ্ল্যাগ টোকেন সাবমিট করে ওয়ালেটে ক্রেডিট অর্জন করুন।
              </p>
              <div className="space-y-1.5">
                <input
                  type="text"
                  value={ctfLessonFlagInput}
                  onChange={(e) => setCtfLessonFlagInput(e.target.value)}
                  placeholder="HS{PRePARED_STaTEMENTS_PrOTECT_ALL_2026}"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs font-mono text-[#00f5d4] placeholder:text-slate-600"
                />
                <div className="flex gap-1.5">
                  <button
                    onClick={() => {
                      const token = ctfLessonFlagInput.trim();
                      if (
                        token === 'HS{PRePARED_STaTEMENTS_PrOTECT_ALL_2026}' ||
                        token === 'HS{DOM_ENCODING_DEFEATS_XSS_2026}' ||
                        token === 'HS{JWT_HMAC_SIGNATURE_VERIFIED_2026}' ||
                        token === 'HS{DMZ_FIREWALL_ISOLATION_LOCKED_2026}' ||
                        token === 'HS{BLUE_TEAM_SIEM_DEFENDER_2026}'
                      ) {
                        onEarnPoints?.(150, `🎯 CTF Flag Verified! +150 XP & ৳25 BDT ক্যাডেট ওয়ালেটে জমা হয়েছে!`);
                        onNotify?.(`🏆 অভিনন্দন! "${token}" ফ্ল্যাগটি সঠিক! +150 XP এবং ৳25.00 BDT ওয়ালেটে জমা হয়েছে।`);
                        setCtfLessonFlagInput('');
                      } else {
                        onNotify?.('❌ ভুল ফ্ল্যাগ টোকেন! ডায়াগ্রামের রেড অ্যারো বা হিন্ট চেক করুন।');
                      }
                    }}
                    className="flex-1 rounded-lg bg-rose-500 hover:bg-rose-600 py-1.5 text-xs font-extrabold text-white cursor-pointer"
                  >
                    🎯 Verify &amp; Claim Bounty
                  </button>
                  <button
                    onClick={() => {
                      setCtfLessonFlagInput('HS{PRePARED_STaTEMENTS_PrOTECT_ALL_2026}');
                    }}
                    className="rounded-lg bg-slate-900 border border-slate-700 px-2 text-[10px] font-mono text-cyan-300 cursor-pointer"
                    title="Paste Sample Flag"
                  >
                    Paste
                  </button>
                </div>
              </div>
            </div>

            <div>
              <span className="text-xs font-mono text-[#00f5d4] font-bold">
                PERSONAL NOTES &amp; RESOURCES
              </span>
              <h4 className="text-sm font-extrabold text-white mt-0.5">
                📝 আমার লেসন নোটস (Timestamp Linked)
              </h4>
            </div>

            <div className="space-y-2">
              <textarea
                rows={2}
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                placeholder={`[${activeTimestamp}]-এ আপনার নোট লিখুন...`}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white"
              />
              <button
                onClick={() => {
                  if (!noteInput.trim()) return;
                  setPersonalNotes((prev) => [
                    {
                      id: `n-${Date.now()}`,
                      lessonId: activeLesson.id,
                      timestamp: activeTimestamp,
                      text: noteInput.trim()
                    },
                    ...prev
                  ]);
                  setNoteInput('');
                }}
                className="w-full rounded-xl bg-[#00f5d4] py-2 text-xs font-extrabold text-slate-950 cursor-pointer"
              >
                + নোট সংরক্ষণ করুন (@ {activeTimestamp})
              </button>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {personalNotes.map((n) => (
                <div
                  key={n.id}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#00f5d4]">
                    <span>Jump to [{n.timestamp}]</span>
                    <button
                      onClick={() =>
                        setPersonalNotes((prev) => prev.filter((item) => item.id !== n.id))
                      }
                      className="text-rose-400 hover:underline cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-slate-300">{n.text}</p>
                </div>
              ))}
            </div>

            {/* Secure Course Resource Library (Sections 75, 76) */}
            <div className="border-t border-slate-800 pt-3 space-y-2">
              <div className="text-xs font-extrabold text-white">
                📦 সুরক্ষিত রিসোর্স লাইব্রেরি (Nonce Protected)
              </div>
              {[
                { name: 'OWASP-Top-10-Bengali-CheatSheet.pdf', size: '1.4 MB' },
                { name: 'UFW-Hardening-Lab-Topology.json', size: '42 KB' }
              ].map((res) => (
                <div
                  key={res.name}
                  className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs"
                >
                  <span className="truncate text-slate-300 pr-2">{res.name}</span>
                  <button
                    onClick={() =>
                      onNotify?.(`📥 এনরোলমেন্ট ও Nonce যাচাই সম্পন্ন: "${res.name}" ডাউনলোড হচ্ছে।`)
                    }
                    className="text-[#00f5d4] font-mono font-bold shrink-0 cursor-pointer"
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          WORKSPACE 3: SAFE AUTHORIZED CYBER LAB & SIMULATED TERMINAL (SECTIONS 18-23)
      ====================================================================== */}
      {activeWorkspace === 'cyber_lab' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left 5 Cols: Lab Briefing, Tasks & Progressive 3-Tier Hint System */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-[#0b1120] p-5 space-y-4">
            <div>
              <span className="text-xs font-mono text-[#00f5d4]">
                AUTHORIZED ISOLATED SANDBOX LAB · ZERO SERVER RISK
              </span>
              <h3 className="text-lg font-extrabold text-white mt-0.5">
                🧪 প্র্যাকটিক্যাল ল্যাব: Blue Team Auth.log তদন্ত ও ফায়ারওয়াল হার্ডেনিং
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                সিমুলেটেড কন্টেইনার (<code>10.10.14.20</code>)-এ ব্রুট-ফোর্স আইপি শনাক্ত করুন, ফায়ারওয়াল
                সক্রিয় করুন এবং ফ্ল্যাগ সাবমিট করুন।
              </p>
            </div>

            {/* Lab Task Checklist */}
            <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-950 p-4">
              <div className="text-xs font-extrabold text-white mb-2">
                ল্যাব টাস্ক চেকলিস্ট (Lab Completion Criteria):
              </div>
              <div className="flex items-center gap-2 text-xs">
                <CheckCircle2
                  className={`h-4 w-4 ${
                    labTasksCompleted.inspectLog ? 'text-emerald-400' : 'text-slate-600'
                  }`}
                />
                <span className="text-slate-200">
                  Task 1: <code>/var/log/auth.log</code> থেকে ব্রুট-ফোর্স আইপি শনাক্ত করুন
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <CheckCircle2
                  className={`h-4 w-4 ${
                    labTasksCompleted.checkFirewall ? 'text-emerald-400' : 'text-slate-600'
                  }`}
                />
                <span className="text-slate-200">
                  Task 2: <code>ufw status</code> দিয়ে ফায়ারওয়াল রুল যাচাই ও ফ্ল্যাগ উদ্ধার করুন
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <CheckCircle2
                  className={`h-4 w-4 ${
                    labTasksCompleted.captureFlag ? 'text-emerald-400' : 'text-slate-600'
                  }`}
                />
                <span className="text-slate-200">
                  Task 3: উদ্ধারকৃত ফ্ল্যাগটি সাবমিট করে +150 XP অর্জন করুন
                </span>
              </div>
            </div>

            {/* Progressive 3-Tier Hint System (Section 23) */}
            <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-950 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-amber-300">
                  💡 প্রোগ্রেসিভ হিন্ট সিস্টেম (Progressive Hints)
                </span>
                <button
                  onClick={() => setUnlockedHintLevel((prev) => Math.min(3, prev + 1))}
                  className="rounded-lg bg-amber-500/20 border border-amber-500/40 px-2.5 py-1 text-[11px] font-bold text-amber-300 cursor-pointer"
                >
                  Unlock Next Hint ({unlockedHintLevel}/3)
                </button>
              </div>
              {unlockedHintLevel >= 1 && (
                <div className="text-xs text-slate-300 bg-slate-900 p-2.5 rounded-lg">
                  <strong>Hint 1:</strong> টার্মিনালে <code>help</code> লিখে অনুমোদিত কমান্ডগুলোর তালিকা
                  দেখুন।
                </div>
              )}
              {unlockedHintLevel >= 2 && (
                <div className="text-xs text-slate-300 bg-slate-900 p-2.5 rounded-lg">
                  <strong>Hint 2:</strong> টার্মিনালে <code>ufw status verbose</code> কমান্ডটি রান করলে
                  ল্যাব ফ্ল্যাগটি প্রদর্শিত হবে।
                </div>
              )}
              {unlockedHintLevel >= 3 && (
                <div className="text-xs text-[#00f5d4] bg-slate-900 p-2.5 rounded-lg font-mono">
                  <strong>Final Hint:</strong> Flag হলো{' '}
                  <code>HS&#123;BLUE_TEAM_SIEM_DEFENDER_2026&#125;</code>
                </div>
              )}
            </div>

            {/* Flag Submission Box */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300">
                ল্যাব ফ্ল্যাগ সাবমিট করুন (Flag Verification):
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={flagInput}
                  onChange={(e) => setFlagInput(e.target.value)}
                  placeholder="HS{BLUE_TEAM_SIEM_DEFENDER_2026}"
                  className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-mono text-[#00f5d4]"
                />
                <button
                  onClick={handleVerifyFlagButton}
                  className="rounded-xl bg-[#00f5d4] px-4 py-2 text-xs font-extrabold text-slate-950 cursor-pointer"
                >
                  Verify Flag
                </button>
              </div>
              {labCompletedBanner && (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-xs font-bold text-emerald-300">
                  🏆 ল্যাব সম্পন্ন! আপনি +150 XP এবং "Blue Team Log Defender" ক্রেডিট অর্জন করেছেন।
                </div>
              )}
            </div>
          </div>

          {/* Right 7 Cols: Simulated Linux Security Terminal */}
          <div className="lg:col-span-7 rounded-2xl border border-[#00f5d4]/40 bg-[#050811] p-5 flex flex-col justify-between space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-500" />
                <span className="h-3 w-3 rounded-full bg-amber-500" />
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="ml-2 text-xs font-mono font-bold text-[#00f5d4]">
                  student@hs-authorized-sandbox:~ (10.10.14.20)
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'help',
                  'grep "Failed password" /var/log/auth.log',
                  'ufw status verbose',
                  'wp plugin list',
                  'git status',
                  'npm test',
                  'python3 ai_agent.py',
                  'submit-flag HS{BLUE_TEAM_SIEM_DEFENDER_2026}'
                ].map((quickCmd) => (
                  <button
                    key={quickCmd}
                    onClick={() => setTerminalCmdInput(quickCmd)}
                    className="rounded bg-slate-900 border border-slate-700 px-2 py-1 text-[10px] font-mono text-cyan-300 hover:border-[#00f5d4] cursor-pointer"
                  >
                    {quickCmd.length > 20 ? quickCmd.slice(0, 18) + '..' : quickCmd}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs max-h-[340px] overflow-y-auto pr-1">
              {terminalHistory.map((entry, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-slate-400">
                    <span className="text-[#00f5d4]">student@hs-sandbox:~$</span> {entry.cmd}
                  </div>
                  <pre
                    className={`whitespace-pre-wrap rounded-lg p-2.5 text-[11px] ${
                      entry.status === 'flag'
                        ? 'bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 font-bold'
                        : 'bg-slate-900/90 text-slate-200'
                    }`}
                  >
                    {entry.output}
                  </pre>
                </div>
              ))}
            </div>

            <form onSubmit={handleRunTerminalCommand} className="flex gap-2 pt-2 border-t border-slate-800">
              <span className="font-mono text-xs text-[#00f5d4] self-center">$</span>
              <input
                type="text"
                value={terminalCmdInput}
                onChange={(e) => setTerminalCmdInput(e.target.value)}
                placeholder='Type command (e.g. "help" or "ufw status verbose")...'
                className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-mono text-white focus:border-[#00f5d4] focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-xl bg-[#00f5d4] px-4 py-2 text-xs font-extrabold text-slate-950 cursor-pointer"
              >
                Run Command
              </button>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          WORKSPACE 4: QUIZ ENGINE, FINAL EXAM & INSTRUCTOR ASSIGNMENT GRADING
      ====================================================================== */}
      {activeWorkspace === 'quiz_exam_assignment' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left 7 Cols: Question Bank & Timed Final Exam */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-[#0b1120] p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-[#00f5d4]">
                  SECTIONS 24–28 · QUESTION BANK &amp; FINAL CERTIFICATION EXAM
                </span>
                <h3 className="text-lg font-extrabold text-white mt-0.5">
                  📝 ফাইনাল সার্টিফিকেশন অ্যাসেসমেন্ট (Passing Score: 80%)
                </h3>
              </div>
              <span className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 font-mono text-xs font-bold text-emerald-300">
                Current Score: {scorePercent}% ({earnedMarks}/{totalMarks})
              </span>
            </div>

            <div className="space-y-4">
              {QUIZ_QUESTIONS.map((q) => {
                const selectedIdx = quizAnswers[q.id];
                const isCorrect = selectedIdx === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2.5"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-cyan-300">
                        {q.type} · Difficulty: {q.difficulty}
                      </span>
                      <span className="text-[#00f5d4]">{q.marks} Marks</span>
                    </div>

                    <div className="text-xs font-bold text-white">{q.questionBn}</div>

                    {q.codeSnippet && (
                      <pre className="rounded-lg bg-[#050811] p-2.5 text-[11px] font-mono text-emerald-300 overflow-x-auto">
                        {q.codeSnippet}
                      </pre>
                    )}

                    <div className="space-y-1.5 pt-1">
                      {q.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => setQuizAnswers((prev) => ({ ...prev, [q.id]: idx }))}
                          className={`w-full text-left rounded-lg px-3 py-2 text-xs border transition cursor-pointer ${
                            selectedIdx === idx
                              ? 'border-[#00f5d4] bg-[#00f5d4]/15 text-white font-bold'
                              : 'border-slate-800 bg-slate-900 text-slate-300'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>

                    {quizSubmitted && (
                      <div
                        className={`rounded-lg p-2.5 text-xs ${
                          isCorrect
                            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                            : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
                        }`}
                      >
                        <strong>{isCorrect ? '✓ সঠিক উত্তর!' : '✗ ভুল উত্তর।'} ব্যাখ্যা:</strong>{' '}
                        {q.explanationBn}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={() => {
                  setQuizSubmitted(true);
                  if (scorePercent >= 80) {
                    onEarnPoints?.(100, 'ফাইনাল সার্টিফিকেশন এক্সামে উত্তীর্ণ হওয়ার জন্য +100 XP!');
                    onNotify?.(
                      `🎓 অভিনন্দন! আপনি ${scorePercent}% স্কোর নিয়ে পরীক্ষায় উত্তীর্ণ হয়েছেন। আপনার সার্টিফিকেট আনলক হয়েছে!`
                    );
                  }
                }}
                className="rounded-xl bg-[#00f5d4] px-5 py-2.5 text-xs font-extrabold text-slate-950 cursor-pointer"
              >
                ✓ সাবমিট ও ফলাফল যাচাই করুন
              </button>

              {quizSubmitted && scorePercent >= 80 && (
                <button
                  onClick={() => setActiveWorkspace('certificate_verifier')}
                  className="rounded-xl border border-[#00f5d4] bg-[#00f5d4]/15 px-4 py-2 text-xs font-extrabold text-[#00f5d4] cursor-pointer"
                >
                  🏅 ভেরিফায়েড সার্টিফিকেট ডাউনলোড করুন →
                </button>
              )}
            </div>
          </div>

          {/* Right 5 Cols: Assignment Submission & Instructor Grading Portal (Section 29) */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-[#0b1120] p-5 space-y-4">
            <div>
              <span className="text-xs font-mono text-[#00f5d4]">
                SECTION 29 · STUDENT ASSIGNMENT &amp; INSTRUCTOR GRADING
              </span>
              <h3 className="text-lg font-extrabold text-white mt-0.5">
                📂 প্র্যাকটিক্যাল অ্যাসাইনমেন্ট ও ইনস্ট্রাক্টর গ্রেডিং পোর্টাল
              </h3>
            </div>

            <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950 p-4">
              <label className="block text-xs font-bold text-slate-200">
                স্টুডেন্ট অ্যাসাইনমেন্ট সাবমিশন (Code / Report / GitHub Link):
              </label>
              <textarea
                rows={3}
                value={assignmentText}
                onChange={(e) => setAssignmentText(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 p-2.5 text-xs text-white"
              />
              <button
                onClick={() =>
                  onNotify?.('✓ আপনার অ্যাসাইনমেন্ট সফলভাবে ইনস্ট্রাক্টর রিভিউয়ের জন্য জমা হয়েছে।')
                }
                className="rounded-lg bg-[#00f5d4] px-4 py-2 text-xs font-extrabold text-slate-950 cursor-pointer"
              >
                অ্যাসাইনমেন্ট আপডেট করুন
              </button>
            </div>

            <div className="space-y-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-emerald-300">
                  👨‍🏫 ইনস্ট্রাক্টর ইভ্যালুয়েশন ও ফিডব্যাক
                </span>
                <span className="rounded bg-emerald-500 text-slate-950 px-2.5 py-0.5 font-mono font-extrabold">
                  {assignmentGrade.status} · {assignmentGrade.score}/100
                </span>
              </div>
              <p className="text-slate-200 leading-relaxed">{assignmentGrade.feedback}</p>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          WORKSPACE 5: CERTIFICATE GENERATOR, QR & PUBLIC VERIFICATION PORTAL
      ====================================================================== */}
      {activeWorkspace === 'certificate_verifier' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left 7 Cols: Live Certificate Generator & Multi-Template Preview */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-[#0b1120] p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-[#00f5d4]">
                  SECTIONS 34–37 &amp; 143 · HISTORICAL CERTIFICATE INTEGRITY
                </span>
                <h3 className="text-lg font-extrabold text-white mt-0.5">
                  🏅 ভেরিফায়েড সার্টিফিকেট ইঞ্জিন ও মাল্টি-টেমপ্লেট ডিজাইনার
                </h3>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {(['Cybersecurity', 'Ethical Security', 'Blue Team', 'Professional'] as const).map(
                  (tpl) => (
                    <button
                      key={tpl}
                      onClick={() => setSelectedCertTemplate(tpl)}
                      className={`rounded-lg px-2.5 py-1 text-[11px] font-bold cursor-pointer ${
                        selectedCertTemplate === tpl
                          ? 'bg-[#00f5d4] text-slate-950'
                          : 'bg-slate-900 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {tpl}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Select Course for Certificate */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">
                সার্টিফিকেটের জন্য কোর্স নির্বাচন করুন (Course for Diploma):
              </label>
              <select
                value={certSelectedCourseId}
                onChange={(e) => setCertSelectedCourseId(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-[#00f5d4] font-bold"
              >
                {MASTER_COURSES_CATALOG.map((c) => (
                  <option key={c.id} value={c.id}>
                    [{c.categoryLabelBn.split(' ')[0]}] {c.titleBn}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                value={studentCertName}
                onChange={(e) => setStudentCertName(e.target.value)}
                placeholder="Student Full Name"
                className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white"
              />
              <button
                onClick={() => {
                  const targetCourse =
                    MASTER_COURSES_CATALOG.find((c) => c.id === certSelectedCourseId) ||
                    activeCourse;
                  handleDownloadCertificatePng({
                    ...certificates[0],
                    courseTitle: targetCourse.titleBn,
                    levelLabel: `Level ${targetCourse.levelNumber} — ${targetCourse.courseType}`,
                    studentName: studentCertName,
                    templateStyle: selectedCertTemplate
                  });
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#00f5d4] px-4 py-2 text-xs font-extrabold text-slate-950 cursor-pointer"
              >
                <Download className="h-4 w-4" />
                Download Official Certificate PNG
              </button>
            </div>

            {/* Live Visual Certificate Preview Box */}
            {(() => {
              const currentCertCourse =
                MASTER_COURSES_CATALOG.find((c) => c.id === certSelectedCourseId) || activeCourse;
              return (
                <div className="rounded-2xl border-2 border-[#00f5d4] bg-gradient-to-br from-[#050811] via-[#0b132b] to-[#1a103c] p-6 text-center space-y-3 shadow-2xl">
                  <div className="text-xs font-mono font-bold text-[#00f5d4] tracking-widest uppercase">
                    HACKERS শিক্ষক ACADEMY · {selectedCertTemplate.toUpperCase()} DIPLOMA
                  </div>
                  <h4 className="text-2xl font-extrabold text-white tracking-wide">
                    CERTIFICATE OF COMPLETION
                  </h4>
                  <p className="text-xs text-slate-400">This is to certify that</p>
                  <div className="text-2xl font-extrabold text-[#00f5d4]">{studentCertName}</div>
                  <p className="text-xs text-slate-300 max-w-xl mx-auto">
                    has successfully completed all lessons, practical labs, assessments and final examination for
                  </p>
                  <div className="text-sm font-extrabold text-white">
                    {currentCertCourse.titleBn}
                  </div>
                  <div className="text-xs font-mono text-cyan-300">
                    {currentCertCourse.titleEn}
                  </div>
                  <div className="pt-3 border-t border-slate-800/90 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-300">
                    <span>ID: {certificates[0].certId}</span>
                    <span className="text-emerald-300">Status: {certificates[0].status}</span>
                    <span>Verify: /academy/certificate/{certificates[0].certId}</span>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Right 5 Cols: Public Certificate Verification & Admin Revocation Portal */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-[#0b1120] p-5 space-y-4">
            <div>
              <span className="text-xs font-mono text-[#00f5d4]">
                PUBLIC VERIFICATION ENDPOINT · /academy/certificate/VERIFY-ID
              </span>
              <h3 className="text-lg font-extrabold text-white mt-0.5">
                🔍 পাবলিক সার্টিফিকেট ভেরিফিকেশন ও রিভোকেশন কন্ট্রোল
              </h3>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300">
                সার্টিফিকেট আইডি লিখে যাচাই করুন:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={verifyLookupId}
                  onChange={(e) => setVerifyLookupId(e.target.value)}
                  className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-mono text-[#00f5d4]"
                />
              </div>
            </div>

            {verifiedCertResult ? (
              <div
                className={`rounded-xl border p-4 space-y-2 text-xs ${
                  verifiedCertResult.status === 'VALID'
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'
                    : 'border-rose-500/40 bg-rose-500/10 text-rose-200'
                }`}
              >
                <div className="flex items-center justify-between font-extrabold text-sm">
                  <span>
                    {verifiedCertResult.status === 'VALID'
                      ? '✅ VALID & AUTHENTIC CERTIFICATE'
                      : '⛔ CERTIFICATE REVOKED'}
                  </span>
                  <span className="font-mono text-xs">{verifiedCertResult.certId}</span>
                </div>
                <div>
                  <strong>Student Name:</strong> {verifiedCertResult.studentName} (Privacy-Safe
                  Display)
                </div>
                <div>
                  <strong>Course Snapshot:</strong> {verifiedCertResult.courseTitle}
                </div>
                <div>
                  <strong>Level:</strong> {verifiedCertResult.levelLabel}
                </div>
                <div>
                  <strong>Issue Date:</strong> {verifiedCertResult.issueDate}
                </div>
                <div className="font-mono text-[10px] text-slate-400 break-all">
                  SHA-256: {verifiedCertResult.sha256Signature}
                </div>

                {/* Admin Revoke / Restore Toggle (Section 36) */}
                <div className="pt-2 border-t border-slate-800/80 flex justify-end">
                  <button
                    onClick={() =>
                      setCertificates((prev) =>
                        prev.map((c) =>
                          c.certId === verifiedCertResult.certId
                            ? {
                                ...c,
                                status: c.status === 'VALID' ? 'REVOKED' : 'VALID'
                              }
                            : c
                        )
                      )
                    }
                    className="rounded-lg bg-slate-900 border border-slate-700 px-3 py-1 text-[11px] font-bold text-white cursor-pointer"
                  >
                    Admin Action:{' '}
                    {verifiedCertResult.status === 'VALID'
                      ? 'Revoke Certificate'
                      : 'Restore to VALID'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 text-xs font-bold text-rose-300">
                ✗ এই আইডির কোনো সার্টিফিকেট পাওয়া যায়নি (Invalid Certificate ID)।
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          WORKSPACE 6: STUDENT DASHBOARD, XP GAMIFICATION, STREAKS & SKILLS
      ====================================================================== */}
      {activeWorkspace === 'student_dashboard' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left 7 Cols: Continue Learning, Skill Matrix & Learning History */}
          <div className="lg:col-span-7 space-y-5 rounded-2xl border border-slate-800 bg-[#0b1120] p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-[#00f5d4]">
                  SECTIONS 38–46 &amp; 116–121 · STUDENT CENTRAL CONTROL CENTER
                </span>
                <h3 className="text-lg font-extrabold text-white mt-0.5">
                  📊 স্টুডেন্ট ড্যাশবোর্ড, কন্টিনিউ লার্নিং ও স্কিল ম্যাট্রিক্স
                </h3>
              </div>
              <span className="rounded-lg bg-amber-500/15 border border-amber-500/30 px-3 py-1 text-xs font-mono font-bold text-amber-300">
                🔥 14-Day Learning Streak
              </span>
            </div>

            {/* Prominent Continue Learning Card (Section 39) */}
            <div className="rounded-xl border border-[#00f5d4]/40 bg-slate-950 p-4 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-[#00f5d4]">CONTINUE LEARNING</span>
                <div className="text-sm font-extrabold text-white">{activeCourse.titleBn}</div>
                <div className="text-xs text-slate-400">
                  Current Lesson: {activeLesson.titleBn} · Progress: {courseProgressPercent}%
                </div>
              </div>
              <button
                onClick={() => setActiveWorkspace('course_player')}
                className="rounded-xl bg-[#00f5d4] px-4 py-2 text-xs font-extrabold text-slate-950 cursor-pointer"
              >
                Resume Lesson →
              </button>
            </div>

            {/* Skill Progress Bars (Sections 116, 117) */}
            <div className="space-y-3">
              <div className="text-xs font-extrabold text-white">
                🎯 অর্জিত সাইবার সিকিউরিটি স্কিল প্রোগ্রেস (Skill Progression Model)
              </div>
              {[
                { skill: 'Web & API Security (OWASP)', stage: 'Advanced', pct: 88 },
                { skill: 'Linux CLI & Firewall Hardening', stage: 'Intermediate', pct: 76 },
                { skill: 'Blue Team SIEM & Log Analysis', stage: 'Intermediate', pct: 72 },
                { skill: 'Secure PHP 8.2+ & WordPress DevSecOps', stage: 'Advanced', pct: 92 }
              ].map((s) => (
                <div key={s.skill} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-200 font-bold">{s.skill}</span>
                    <span className="font-mono text-[#00f5d4]">
                      {s.stage} ({s.pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                    <div className="h-full bg-[#00f5d4]" style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 5 Cols: Badges, Achievements & Privacy-Controlled Leaderboard */}
          <div className="lg:col-span-5 space-y-4 rounded-2xl border border-slate-800 bg-[#0b1120] p-5">
            <h3 className="text-base font-extrabold text-white">
              🏅 আনলককৃত সাইবার ব্যাজ ও গ্যামিফিকেশন (Section 44)
            </h3>
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              {[
                '🛡️ First Course Enrolled',
                '🧪 First Authorized Lab Clear',
                '🔥 7-Day Learning Streak',
                '🐧 Linux Security Explorer',
                '🌐 OWASP Defender Badge',
                '🎓 Verified Certificate Holder'
              ].map((badge) => (
                <div
                  key={badge}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-3 font-bold text-slate-200"
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          WORKSPACE 7: 16-STEP COURSE WIZARD, CURRICULUM BUILDER & ANALYTICS
      ====================================================================== */}
      {activeWorkspace === 'admin_instructor_builder' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left 7 Cols: 16-Step Course Creation Wizard & Curriculum Builder */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-[#0b1120] p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-[#00f5d4]">
                  SECTIONS 8, 11, 70–74 · 16-STEP WIZARD &amp; VISUAL CURRICULUM BUILDER
                </span>
                <h3 className="text-lg font-extrabold text-white mt-0.5">
                  ⚙️ ১৬-স্টেপ কোর্স ক্রিয়েটর উইজার্ড ও কারিকুলাম বিল্ডার (Autosave Active)
                </h3>
              </div>
              <span className="rounded bg-emerald-500/15 px-2.5 py-1 text-[11px] font-mono text-emerald-300">
                ✓ Autosaved Just Now
              </span>
            </div>

            {/* 16 Steps Selector Pills */}
            <div className="flex flex-wrap gap-1.5">
              {[
                '1. Basic Info',
                '2. Course Level',
                '3. Category',
                '4. Objectives',
                '5. Prerequisites',
                '6. Curriculum',
                '7. Lessons',
                '8. Labs',
                '9. Quizzes',
                '10. Assignments',
                '11. Final Exam',
                '12. Certificate',
                '13. SEO & Schema',
                '14. Access Rules',
                '15. Preview',
                '16. Publish'
              ].map((stepLabel, index) => {
                const stepNum = index + 1;
                return (
                  <button
                    key={stepLabel}
                    onClick={() => setWizardStep(stepNum)}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-mono font-bold cursor-pointer ${
                      wizardStep === stepNum
                        ? 'bg-[#00f5d4] text-slate-950'
                        : 'bg-slate-950 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {stepLabel}
                  </button>
                );
              })}
            </div>

            {/* Visual Curriculum Module Builder */}
            <div className="space-y-2.5 rounded-xl border border-slate-800 bg-slate-950 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-white">
                  Active Wizard Step #{wizardStep}: ড্র্যাগ-অ্যান্ড-ড্রপ কারিকুলাম ও মডিউল ম্যানেজার
                </span>
                <button
                  onClick={() =>
                    onNotify?.(
                      '✓ কোর্সটি সফলভাবে ক্লোন (Duplicate) করা হয়েছে — স্টুডেন্ট প্রোগ্রেস ও সার্টিফিকেট কপি করা হয়নি (Section 146)।'
                    )
                  }
                  className="text-[11px] font-mono text-[#00f5d4] hover:underline cursor-pointer"
                >
                  + Safe Clone Course (v2.4 → v2.5)
                </button>
              </div>

              {builderModules.map((mod) => (
                <div
                  key={mod.id}
                  className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-xs"
                >
                  <div>
                    <div className="font-bold text-white">{mod.title}</div>
                    <div className="text-[11px] text-slate-400">{mod.lessonsCount} Lessons</div>
                  </div>
                  <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-[10px] font-mono text-emerald-300">
                    {mod.status}
                  </span>
                </div>
              ))}

              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={newModuleTitle}
                  onChange={(e) => setNewModuleTitle(e.target.value)}
                  placeholder="নতুন মডিউলের নাম লিখুন..."
                  className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white"
                />
                <button
                  onClick={() => {
                    if (!newModuleTitle.trim()) return;
                    setBuilderModules((prev) => [
                      ...prev,
                      {
                        id: `m-${Date.now()}`,
                        title: newModuleTitle.trim(),
                        lessonsCount: 1,
                        status: 'Published'
                      }
                    ]);
                    setNewModuleTitle('');
                  }}
                  className="rounded-lg bg-[#00f5d4] px-3.5 py-1.5 text-xs font-extrabold text-slate-950 cursor-pointer"
                >
                  + Add Module
                </button>
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Pre-Publish Course Health Check & Learning Drop-Off Analytics */}
          <div className="lg:col-span-5 space-y-4 rounded-2xl border border-slate-800 bg-[#0b1120] p-5">
            <div>
              <span className="text-xs font-mono text-[#00f5d4]">
                SECTIONS 67–70 · COURSE HEALTH CHECK &amp; DROP-OFF ANALYTICS
              </span>
              <h3 className="text-lg font-extrabold text-white mt-0.5">
                🩺 কোর্স হেলথ চেক ও লার্নিং অ্যানালিটিক্স
              </h3>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2 text-xs">
              <div className="font-extrabold text-emerald-300 mb-1">
                ✓ প্রি-পাবলিশ হেলথ চেক (10/10 Checks Passed):
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-slate-300 font-mono text-[11px]">
                <span>✓ Title &amp; Subtitle</span>
                <span>✓ Thumbnail &amp; OG</span>
                <span>✓ Instructor Assigned</span>
                <span>✓ Learning Objectives</span>
                <span>✓ Curriculum Modules</span>
                <span>✓ Practical Lab Ready</span>
                <span>✓ Final Exam Linked</span>
                <span>✓ Certificate Template</span>
                <span>✓ Course Schema JSON-LD</span>
                <span>✓ Role Security Verified</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2 text-xs">
              <div className="font-extrabold text-white">
                📉 স্টুডেন্ট ড্রপ-অফ ও বটলনেক ডিটেক্টর (Section 68):
              </div>
              <p className="text-slate-400">
                • <strong>Lesson 2.2 (UFW Firewall Lab):</strong> ১৮% শিক্ষার্থী টাস্ক ২-এ হিন্ট ব্যবহার
                করছেন। (সমাধান: ইন্টারেক্টিভ নেটওয়ার্ক ডায়াগ্রাম যুক্ত করা হয়েছে)।
              </p>
              <p className="text-slate-400">
                • <strong>Average Completion Rate:</strong> ৮৪.৬% · <strong>Certificates Issued:</strong>{' '}
                ১,৪২০টি।
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

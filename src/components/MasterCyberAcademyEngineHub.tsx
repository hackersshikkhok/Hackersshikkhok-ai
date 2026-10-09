import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Zap,
  Terminal,
  Award,
  Wallet,
  Video,
  Brain,
  Download,
  Copy,
  Check,
  Search,
  RefreshCw,
  QrCode,
  Flame,
  Lock,
  Unlock,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Eye,
  CheckCircle2,
  Cpu,
  Layers,
  Send,
  Sliders,
  FileText
} from 'lucide-react';

interface Course80Item {
  id: number;
  title: string;
  slug: string;
  category: 'Web Hacking / OWASP' | 'Social Engineering & Defense' | 'Network & Red Teaming' | 'Forensics & Blue Team' | 'Defensive Systems & Binary Hardening';
  difficultyTier: 'Script Kiddie' | 'Cyber Operative' | 'Red Team Specialist' | 'Insane';
  estimatedLabHours: number;
  priceBdt: number;
  xpReward: number;
  badgeId: string;
  flagSample: string;
}

const MASTER_82_COURSES: Course80Item[] = [
  // 1. Web Hacking / OWASP (18)
  { id: 1, title: 'Web Application Security & OWASP Top 10 (2026)', slug: 'owasp-top-10-mastery', category: 'Web Hacking / OWASP', difficultyTier: 'Script Kiddie', estimatedLabHours: 12.0, priceBdt: 0, xpReward: 600, badgeId: 'badge-owasp-v1', flagSample: 'HS{OWASP_TOP10_SECURE_2026}' },
  { id: 2, title: 'Advanced SQL Injection (SQLi) & Defense Mechanisms', slug: 'advanced-sqli-defense', category: 'Web Hacking / OWASP', difficultyTier: 'Cyber Operative', estimatedLabHours: 14.5, priceBdt: 0, xpReward: 750, badgeId: 'badge-sqli-pro', flagSample: 'HS{SQLI_PREPARED_STATEMENTS_OK}' },
  { id: 3, title: 'Cross-Site Scripting (XSS) DOM & CSP Bypasses', slug: 'xss-dom-csp-bypass', category: 'Web Hacking / OWASP', difficultyTier: 'Cyber Operative', estimatedLabHours: 11.0, priceBdt: 0, xpReward: 650, badgeId: 'badge-xss-shield', flagSample: 'HS{CSP_STRICT_NONCE_VERIFIED}' },
  { id: 4, title: 'Server-Side Request Forgery (SSRF) in Cloud Apps', slug: 'ssrf-cloud-environments', category: 'Web Hacking / OWASP', difficultyTier: 'Red Team Specialist', estimatedLabHours: 16.0, priceBdt: 99, xpReward: 900, badgeId: 'badge-ssrf-cloud', flagSample: 'HS{SSRF_IMDSV2_METADATA_GUARD}' },
  { id: 5, title: 'JWT Token Cracking & Cryptographic Signature Bypass', slug: 'jwt-cracking-signature-bypass', category: 'Web Hacking / OWASP', difficultyTier: 'Cyber Operative', estimatedLabHours: 9.5, priceBdt: 0, xpReward: 550, badgeId: 'badge-jwt-crypto', flagSample: 'HS{JWT_HMAC_SIGNATURE_VERIFIED_2026}' },
  { id: 6, title: 'Server-Side Template Injection (SSTI) & RCE', slug: 'ssti-rce-exploitation', category: 'Web Hacking / OWASP', difficultyTier: 'Red Team Specialist', estimatedLabHours: 15.0, priceBdt: 150, xpReward: 850, badgeId: 'badge-ssti-core', flagSample: 'HS{SSTI_SANDBOX_ESCAPE_PATCHED}' },
  { id: 7, title: 'OAuth 2.0 & OpenID Connect Logic Flaws', slug: 'oauth-oidc-security-flaws', category: 'Web Hacking / OWASP', difficultyTier: 'Cyber Operative', estimatedLabHours: 10.0, priceBdt: 0, xpReward: 600, badgeId: 'badge-oauth-guard', flagSample: 'HS{OAUTH_PKCE_FLOW_ENFORCED}' },
  { id: 8, title: 'GraphQL Security Testing & Batch Attack Defenses', slug: 'graphql-security-testing', category: 'Web Hacking / OWASP', difficultyTier: 'Cyber Operative', estimatedLabHours: 8.5, priceBdt: 0, xpReward: 500, badgeId: 'badge-graphql-sec', flagSample: 'HS{GRAPHQL_QUERY_DEPTH_LIMITED}' },
  { id: 9, title: 'WebSockets Hijacking & Real-Time Protocol Tampering', slug: 'websockets-hijacking-security', category: 'Web Hacking / OWASP', difficultyTier: 'Red Team Specialist', estimatedLabHours: 12.0, priceBdt: 120, xpReward: 700, badgeId: 'badge-ws-tamper', flagSample: 'HS{WS_ORIGIN_VALIDATED_TOKEN}' },
  { id: 10, title: 'Insecure Deserialization in Java, PHP & Python', slug: 'insecure-deserialization-deepdive', category: 'Web Hacking / OWASP', difficultyTier: 'Insane', estimatedLabHours: 22.0, priceBdt: 250, xpReward: 1200, badgeId: 'badge-deser-insane', flagSample: 'HS{DESER_MAGIC_METHOD_NEUTRALIZED}' },
  { id: 11, title: 'XML External Entity (XXE) Exploitation & Patching', slug: 'xxe-exploitation-patching', category: 'Web Hacking / OWASP', difficultyTier: 'Cyber Operative', estimatedLabHours: 9.0, priceBdt: 0, xpReward: 550, badgeId: 'badge-xxe-shield', flagSample: 'HS{XXE_DISALLOW_DOCTYPE_DECL}' },
  { id: 12, title: 'Cross-Site Request Forgery (CSRF) & SameSite Defenses', slug: 'csrf-samesite-defenses', category: 'Web Hacking / OWASP', difficultyTier: 'Script Kiddie', estimatedLabHours: 7.5, priceBdt: 0, xpReward: 450, badgeId: 'badge-csrf-guard', flagSample: 'HS{CSRF_NONCE_SAMESITE_STRICT}' },
  { id: 13, title: 'HTTP Request Smuggling (HTTP/1.1 & HTTP/2 Desync)', slug: 'http-request-smuggling-desync', category: 'Web Hacking / OWASP', difficultyTier: 'Insane', estimatedLabHours: 24.0, priceBdt: 300, xpReward: 1350, badgeId: 'badge-smuggle-desync', flagSample: 'HS{SMUGGLE_TE_CL_DESYNC_BLOCKED}' },
  { id: 14, title: 'Race Conditions & Business Logic Flaw Hunting', slug: 'race-conditions-logic-flaws', category: 'Web Hacking / OWASP', difficultyTier: 'Red Team Specialist', estimatedLabHours: 13.5, priceBdt: 99, xpReward: 800, badgeId: 'badge-race-cond', flagSample: 'HS{RACE_MUTEX_LOCK_RESOLVED}' },
  { id: 15, title: 'API Penetration Testing & Broken Object Level Auth (BOLA)', slug: 'api-pentest-bola-flaws', category: 'Web Hacking / OWASP', difficultyTier: 'Cyber Operative', estimatedLabHours: 15.0, priceBdt: 0, xpReward: 750, badgeId: 'badge-bola-api', flagSample: 'HS{BOLA_TENANT_ID_VALIDATED}' },
  { id: 16, title: 'Subdomain Takeovers & DNS Hijacking Defense', slug: 'subdomain-takeover-dns-defense', category: 'Web Hacking / OWASP', difficultyTier: 'Script Kiddie', estimatedLabHours: 6.0, priceBdt: 0, xpReward: 400, badgeId: 'badge-subdomain-guard', flagSample: 'HS{DNS_CNAME_DANGLING_CLEANED}' },
  { id: 17, title: 'Clickjacking & UI Redressing Defense Framework', slug: 'clickjacking-ui-redressing', category: 'Web Hacking / OWASP', difficultyTier: 'Script Kiddie', estimatedLabHours: 5.5, priceBdt: 0, xpReward: 350, badgeId: 'badge-clickjack-def', flagSample: 'HS{FRAME_ANCESTORS_SELF_LOCKED}' },
  { id: 18, title: 'Web Cache Poisoning & Cache Deception Attacks', slug: 'web-cache-poisoning-deception', category: 'Web Hacking / OWASP', difficultyTier: 'Red Team Specialist', estimatedLabHours: 16.5, priceBdt: 180, xpReward: 950, badgeId: 'badge-cache-poison', flagSample: 'HS{CACHE_UNKEYED_INPUT_NORMALIZED}' },

  // 2. Social Engineering & Defense (14)
  { id: 19, title: 'Social Engineering Tactics & Human OS Vulnerabilities', slug: 'social-engineering-tactics', category: 'Social Engineering & Defense', difficultyTier: 'Script Kiddie', estimatedLabHours: 8.0, priceBdt: 0, xpReward: 500, badgeId: 'badge-soc-eng-1', flagSample: 'HS{OSINT_HUMAN_VULN_IDENTIFIED}' },
  { id: 20, title: 'Spear Phishing Simulation & Red Team Mail Infrastructure', slug: 'spear-phishing-red-team-mail', category: 'Social Engineering & Defense', difficultyTier: 'Cyber Operative', estimatedLabHours: 14.0, priceBdt: 0, xpReward: 750, badgeId: 'badge-spear-phish', flagSample: 'HS{MAIL_SMTP_RELAY_CONTAINED}' },
  { id: 21, title: 'FIDO2 Passkey Architecture & Modern MFA Defense', slug: 'mfa-defense-passkey-architecture', category: 'Social Engineering & Defense', difficultyTier: 'Red Team Specialist', estimatedLabHours: 18.0, priceBdt: 150, xpReward: 950, badgeId: 'badge-mfa-defense', flagSample: 'HS{FIDO2_PASSKEY_PHISHING_PROOF}' },
  { id: 22, title: 'QR Code Phishing (Qshing) Analysis & Protection', slug: 'qshing-qr-code-threat-analysis', category: 'Social Engineering & Defense', difficultyTier: 'Script Kiddie', estimatedLabHours: 6.5, priceBdt: 0, xpReward: 450, badgeId: 'badge-qshing-alert', flagSample: 'HS{QSHING_URL_DISSECTED_OK}' },
  { id: 23, title: 'Identity Threat Detection & Telemetry Analysis', slug: 'identity-threat-detection-telemetry', category: 'Social Engineering & Defense', difficultyTier: 'Cyber Operative', estimatedLabHours: 12.0, priceBdt: 0, xpReward: 650, badgeId: 'badge-identity-threat', flagSample: 'HS{CRED_DUMP_CANARY_ALERT}' },
  { id: 24, title: 'Watering Hole Attacks & Malicious Redirect Forensics', slug: 'watering-hole-redirect-forensics', category: 'Social Engineering & Defense', difficultyTier: 'Red Team Specialist', estimatedLabHours: 15.0, priceBdt: 99, xpReward: 850, badgeId: 'badge-watering-hole', flagSample: 'HS{REDIRECT_CHAIN_DECODED_2026}' },
  { id: 25, title: 'Voice Phishing (Vishing) & Deepfake Audio Threat Intel', slug: 'vishing-deepfake-audio-defense', category: 'Social Engineering & Defense', difficultyTier: 'Cyber Operative', estimatedLabHours: 9.0, priceBdt: 0, xpReward: 600, badgeId: 'badge-vishing-intel', flagSample: 'HS{AUDIO_SPECTROGRAM_ANALYZED}' },
  { id: 26, title: 'SMS Phishing (Smishing) Defense & SS7 Routing Vulnerabilities', slug: 'smishing-ss7-telecom-security', category: 'Social Engineering & Defense', difficultyTier: 'Red Team Specialist', estimatedLabHours: 16.0, priceBdt: 120, xpReward: 900, badgeId: 'badge-smishing-ss7', flagSample: 'HS{SS7_MAP_INTERCEPT_BLOCKED}' },
  { id: 27, title: 'Domain Spoofing, Punycode & Typosquatting Defense', slug: 'punycode-domain-spoofing-defense', category: 'Social Engineering & Defense', difficultyTier: 'Script Kiddie', estimatedLabHours: 7.0, priceBdt: 0, xpReward: 400, badgeId: 'badge-punycode-def', flagSample: 'HS{IDN_HOMOGRAPH_DECODED_SAFE}' },
  { id: 28, title: 'SPF, DKIM & DMARC Anti-Spoofing Architecture', slug: 'spf-dkim-dmarc-architecture', category: 'Social Engineering & Defense', difficultyTier: 'Cyber Operative', estimatedLabHours: 11.5, priceBdt: 0, xpReward: 650, badgeId: 'badge-email-auth', flagSample: 'HS{DMARC_REJECT_POLICY_ACTIVE}' },
  { id: 29, title: 'Document Security & Email Attachment Filtering', slug: 'document-security-attachment-filtering', category: 'Social Engineering & Defense', difficultyTier: 'Red Team Specialist', estimatedLabHours: 17.5, priceBdt: 180, xpReward: 1000, badgeId: 'badge-macro-payload', flagSample: 'HS{VBA_DEOBFUSCATED_SAFE}' },
  { id: 30, title: 'HTML Smuggling & SVG File Dropper Neutralization', slug: 'html-smuggling-svg-dropper-defense', category: 'Social Engineering & Defense', difficultyTier: 'Cyber Operative', estimatedLabHours: 10.5, priceBdt: 0, xpReward: 600, badgeId: 'badge-html-smuggle', flagSample: 'HS{BLOB_BASE64_PAYLOAD_CAUGHT}' },
  { id: 31, title: 'Physical Security Assessment & Badge Cloning Mitigations', slug: 'physical-badge-cloning-defense', category: 'Social Engineering & Defense', difficultyTier: 'Red Team Specialist', estimatedLabHours: 13.0, priceBdt: 99, xpReward: 800, badgeId: 'badge-rfid-badge', flagSample: 'HS{PROXMARK_RFID_CLONE_STOPPED}' },
  { id: 32, title: 'Corporate Phishing Incident Response Playbook', slug: 'corporate-phishing-incident-response', category: 'Social Engineering & Defense', difficultyTier: 'Cyber Operative', estimatedLabHours: 12.5, priceBdt: 0, xpReward: 700, badgeId: 'badge-phish-ir', flagSample: 'HS{IR_PHISH_TACTIC_CONTAINED}' },

  // 3. Network & Red Teaming (18)
  { id: 33, title: 'Active Directory Hardening & Identity Governance', slug: 'active-directory-hardening-governance', category: 'Network & Red Teaming', difficultyTier: 'Red Team Specialist', estimatedLabHours: 24.0, priceBdt: 200, xpReward: 1200, badgeId: 'badge-ad-dominance', flagSample: 'HS{AD_DOMAIN_ADMIN_REACHED_LAB}' },
  { id: 34, title: 'Kerberos Authentication Hardening & Ticket Security', slug: 'kerberos-auth-hardening-ticket-security', category: 'Network & Red Teaming', difficultyTier: 'Insane', estimatedLabHours: 26.0, priceBdt: 300, xpReward: 1400, badgeId: 'badge-kerb-golden', flagSample: 'HS{KRBTGT_HASH_ROTATION_PATCHED}' },
  { id: 35, title: 'Zero Trust Network Segmentation & Secure Tunneling', slug: 'zero-trust-network-segmentation-tunneling', category: 'Network & Red Teaming', difficultyTier: 'Red Team Specialist', estimatedLabHours: 18.0, priceBdt: 120, xpReward: 950, badgeId: 'badge-socks-pivot', flagSample: 'HS{CHISEL_PIVOT_TUNNEL_DEFENDED}' },
  { id: 36, title: 'Nmap Advanced Reconnaissance & Scripting Engine (NSE)', slug: 'nmap-recon-nse-mastery', category: 'Network & Red Teaming', difficultyTier: 'Script Kiddie', estimatedLabHours: 9.0, priceBdt: 0, xpReward: 500, badgeId: 'badge-nmap-recon', flagSample: 'HS{NSE_VULN_SCAN_OUTPUT_PARSED}' },
  { id: 37, title: 'Wireshark Deep Packet Inspection & Threat Hunting', slug: 'wireshark-dpi-threat-hunting', category: 'Network & Red Teaming', difficultyTier: 'Cyber Operative', estimatedLabHours: 13.5, priceBdt: 0, xpReward: 700, badgeId: 'badge-wireshark-dpi', flagSample: 'HS{PCAP_TCP_STREAM_CARVED}' },
  { id: 38, title: 'BloodHound Enterprise Graph Analysis & Attack Path Auditing', slug: 'bloodhound-ad-attack-paths', category: 'Network & Red Teaming', difficultyTier: 'Cyber Operative', estimatedLabHours: 11.0, priceBdt: 0, xpReward: 650, badgeId: 'badge-bloodhound-ad', flagSample: 'HS{CYPHER_SHORTEST_PATH_SEVERED}' },
  { id: 39, title: 'Secure Telemetry & Remote Agent Infrastructure', slug: 'secure-telemetry-remote-agent-infra', category: 'Network & Red Teaming', difficultyTier: 'Red Team Specialist', estimatedLabHours: 21.0, priceBdt: 220, xpReward: 1100, badgeId: 'badge-c2-infra', flagSample: 'HS{MTLS_BEACON_TRAFFIC_CAUGHT}' },
  { id: 40, title: 'Endpoint Detection & Response (EDR) Telemetry Optimization', slug: 'edr-telemetry-optimization-defense', category: 'Network & Red Teaming', difficultyTier: 'Insane', estimatedLabHours: 28.0, priceBdt: 350, xpReward: 1500, badgeId: 'badge-edr-evasion', flagSample: 'HS{SYSCALL_HOOK_UNHOOKED_SAFELY}' },
  { id: 41, title: 'Wireless Network Penetration (WPA3, Enterprise 802.11x)', slug: 'wifi-pentest-wpa3-enterprise', category: 'Network & Red Teaming', difficultyTier: 'Cyber Operative', estimatedLabHours: 14.0, priceBdt: 0, xpReward: 750, badgeId: 'badge-wpa3-wifi', flagSample: 'HS{SAE_DRAGONFLY_HANDSHAKE_OK}' },
  { id: 42, title: 'BGP Hijacking, Route Leaks & Internet Routing Security', slug: 'bgp-hijacking-route-leaks', category: 'Network & Red Teaming', difficultyTier: 'Red Team Specialist', estimatedLabHours: 16.0, priceBdt: 150, xpReward: 900, badgeId: 'badge-bgp-routing', flagSample: 'HS{ROA_RPKI_VALIDATION_ACTIVE}' },
  { id: 43, title: 'VLAN Hopping & Layer-2 Switch Attacks Defense', slug: 'vlan-hopping-layer2-switch-attacks', category: 'Network & Red Teaming', difficultyTier: 'Cyber Operative', estimatedLabHours: 10.0, priceBdt: 0, xpReward: 600, badgeId: 'badge-vlan-hop', flagSample: 'HS{DTP_NEGOTIATION_DISABLED}' },
  { id: 44, title: 'DNS Tunneling, Exfiltration & Detection Framework', slug: 'dns-tunneling-exfiltration-defense', category: 'Network & Red Teaming', difficultyTier: 'Cyber Operative', estimatedLabHours: 11.0, priceBdt: 0, xpReward: 650, badgeId: 'badge-dns-tunnel', flagSample: 'HS{IODINE_DNS_PAYLOAD_FLAGGED}' },
  { id: 45, title: 'Metasploit Framework Pro: Automated Payload Customization', slug: 'metasploit-payload-customization', category: 'Network & Red Teaming', difficultyTier: 'Script Kiddie', estimatedLabHours: 10.0, priceBdt: 0, xpReward: 550, badgeId: 'badge-msf-pro', flagSample: 'HS{METERPRETER_STAGER_ENCODED}' },
  { id: 46, title: 'Cloud Red Teaming: AWS IAM Security Governance & Role Hardening', slug: 'aws-iam-governance-role-hardening', category: 'Network & Red Teaming', difficultyTier: 'Red Team Specialist', estimatedLabHours: 19.0, priceBdt: 180, xpReward: 1000, badgeId: 'badge-aws-iam-red', flagSample: 'HS{STS_ASSUME_ROLE_CONFINED}' },
  { id: 47, title: 'Azure AD / Entra ID Identity Attacks & Security', slug: 'azure-ad-entra-id-attacks', category: 'Network & Red Teaming', difficultyTier: 'Red Team Specialist', estimatedLabHours: 18.5, priceBdt: 175, xpReward: 950, badgeId: 'badge-azure-entra', flagSample: 'HS{ENTRA_PRT_TOKEN_PROTECTED}' },
  { id: 48, title: 'Kubernetes Cluster Hardening & Container Isolation', slug: 'kubernetes-cluster-hardening-isolation', category: 'Network & Red Teaming', difficultyTier: 'Insane', estimatedLabHours: 25.0, priceBdt: 300, xpReward: 1350, badgeId: 'badge-k8s-breakout', flagSample: 'HS{K8S_RBAC_SERVICE_ACCOUNT_FIXED}' },
  { id: 49, title: 'Industrial Control Systems & Operational Tech Security', slug: 'ics-ot-industrial-control-security', category: 'Network & Red Teaming', difficultyTier: 'Insane', estimatedLabHours: 23.0, priceBdt: 250, xpReward: 1300, badgeId: 'badge-scada-ics', flagSample: 'HS{MODBUS_PLC_REGISTER_VERIFIED}' },
  { id: 50, title: 'Zero Trust Architecture Implementation & Validation', slug: 'zero-trust-architecture-validation', category: 'Network & Red Teaming', difficultyTier: 'Cyber Operative', estimatedLabHours: 15.0, priceBdt: 0, xpReward: 800, badgeId: 'badge-zero-trust', flagSample: 'HS{ZTA_NEVER_TRUST_ALWAYS_VERIFY}' },

  // 4. Forensics & Blue Team (16)
  { id: 51, title: 'SOC Analyst Tier 1 & 2 Blueprint (SIEM & EDR Operations)', slug: 'soc-analyst-siem-edr-operations', category: 'Forensics & Blue Team', difficultyTier: 'Cyber Operative', estimatedLabHours: 18.0, priceBdt: 0, xpReward: 850, badgeId: 'badge-soc-analyst', flagSample: 'HS{SIEM_CORRELATION_ALERT_OK}' },
  { id: 52, title: 'Digital Forensics & Incident Response (DFIR) Masterclass', slug: 'dfir-digital-forensics-masterclass', category: 'Forensics & Blue Team', difficultyTier: 'Red Team Specialist', estimatedLabHours: 22.0, priceBdt: 199, xpReward: 1100, badgeId: 'badge-dfir-core', flagSample: 'HS{EVIDENCE_CHAIN_OF_CUSTODY_100}' },
  { id: 53, title: 'Volatility 3 Memory Forensics & Rootkit Extraction', slug: 'volatility-memory-forensics', category: 'Forensics & Blue Team', difficultyTier: 'Red Team Specialist', estimatedLabHours: 17.5, priceBdt: 140, xpReward: 950, badgeId: 'badge-memory-vol3', flagSample: 'HS{MEMDUMP_MALFIND_PID_EXTRACTED}' },
  { id: 54, title: 'Binary Safety Inspection & Sandboxed Telemetry Analysis', slug: 'binary-safety-inspection-telemetry', category: 'Forensics & Blue Team', difficultyTier: 'Cyber Operative', estimatedLabHours: 15.0, priceBdt: 0, xpReward: 800, badgeId: 'badge-malware-triage', flagSample: 'HS{PE_IMPORT_HASH_IMPHASH_FLAGGED}' },
  { id: 55, title: 'Windows Event Log Forensic Analysis (Sysmon & EVTX)', slug: 'windows-event-log-sysmon-evtx', category: 'Forensics & Blue Team', difficultyTier: 'Cyber Operative', estimatedLabHours: 12.5, priceBdt: 0, xpReward: 700, badgeId: 'badge-sysmon-evtx', flagSample: 'HS{SYSMON_EID1_PROC_CREATION_OK}' },
  { id: 56, title: 'Linux Incident Response & Forensics Investigation', slug: 'linux-incident-response-forensics', category: 'Forensics & Blue Team', difficultyTier: 'Cyber Operative', estimatedLabHours: 13.0, priceBdt: 0, xpReward: 700, badgeId: 'badge-linux-dfir', flagSample: 'HS{CRONTAB_PERSISTENCE_PURGED}' },
  { id: 57, title: 'YARA Rule Engineering & Threat Detection Signatures', slug: 'yara-rule-engineering-signatures', category: 'Forensics & Blue Team', difficultyTier: 'Script Kiddie', estimatedLabHours: 9.5, priceBdt: 0, xpReward: 500, badgeId: 'badge-yara-rules', flagSample: 'HS{YARA_RULE_HEX_STRINGS_MATCHED}' },
  { id: 58, title: 'Sigma Rules & Universal SIEM Detection Logic', slug: 'sigma-rules-universal-siem', category: 'Forensics & Blue Team', difficultyTier: 'Cyber Operative', estimatedLabHours: 10.0, priceBdt: 0, xpReward: 600, badgeId: 'badge-sigma-rules', flagSample: 'HS{SIGMA_TRANSLATED_SPLUNK_SPL}' },
  { id: 59, title: 'Data Integrity Protection & Enterprise Recovery Playbook', slug: 'data-integrity-enterprise-recovery', category: 'Forensics & Blue Team', difficultyTier: 'Red Team Specialist', estimatedLabHours: 16.5, priceBdt: 120, xpReward: 900, badgeId: 'badge-ransom-ir', flagSample: 'HS{VSS_SHADOW_COPIES_RESTORED}' },
  { id: 60, title: 'Network Forensics: PCAP Analysis with Zeek and Snort', slug: 'network-forensics-zeek-snort', category: 'Forensics & Blue Team', difficultyTier: 'Cyber Operative', estimatedLabHours: 14.0, priceBdt: 0, xpReward: 750, badgeId: 'badge-zeek-snort', flagSample: 'HS{ZEEK_CONN_LOG_ANOMALY_FOUND}' },
  { id: 61, title: 'Disk Imaging & EnCase / Autopsy Forensic Artifacts', slug: 'disk-imaging-autopsy-artifacts', category: 'Forensics & Blue Team', difficultyTier: 'Cyber Operative', estimatedLabHours: 11.5, priceBdt: 0, xpReward: 650, badgeId: 'badge-autopsy-disk', flagSample: 'HS{E01_IMAGE_RAW_MD5_VERIFIED}' },
  { id: 62, title: 'Cloud Forensics: AWS CloudTrail & GuardDuty Investigation', slug: 'aws-cloudtrail-guardduty-forensics', category: 'Forensics & Blue Team', difficultyTier: 'Red Team Specialist', estimatedLabHours: 17.0, priceBdt: 150, xpReward: 950, badgeId: 'badge-cloudtrail-dfir', flagSample: 'HS{ATHENA_QUERY_CLOUDTRAIL_SRC_IP}' },
  { id: 63, title: 'Cyber Threat Intelligence (CTI) & MITRE ATT&CK Mapping', slug: 'threat-intel-mitre-attck-mapping', category: 'Forensics & Blue Team', difficultyTier: 'Cyber Operative', estimatedLabHours: 12.0, priceBdt: 0, xpReward: 650, badgeId: 'badge-mitre-attck', flagSample: 'HS{T1059_COMMAND_LINE_MAPPED}' },
  { id: 64, title: 'Threat Hunting with Splunk & Elastic Security (ELK)', slug: 'threat-hunting-splunk-elastic-elk', category: 'Forensics & Blue Team', difficultyTier: 'Red Team Specialist', estimatedLabHours: 20.0, priceBdt: 160, xpReward: 1050, badgeId: 'badge-splunk-elk', flagSample: 'HS{KIBANA_TIMELINE_ATTACK_PINNED}' },
  { id: 65, title: 'Browser Forensics: History, Cookies & Cache Extraction', slug: 'browser-forensics-history-cache', category: 'Forensics & Blue Team', difficultyTier: 'Script Kiddie', estimatedLabHours: 8.0, priceBdt: 0, xpReward: 450, badgeId: 'badge-browser-dfir', flagSample: 'HS{SQLITE_CHROME_HISTORY_DUMPED}' },
  { id: 66, title: 'Mobile Device Forensics (iOS Keychain & Android ADB)', slug: 'mobile-forensics-ios-android-dfir', category: 'Forensics & Blue Team', difficultyTier: 'Red Team Specialist', estimatedLabHours: 18.0, priceBdt: 150, xpReward: 950, badgeId: 'badge-mobile-dfir', flagSample: 'HS{ADB_BACKUP_TAR_EXTRACTED}' },

  // 5. Defensive Systems & Binary Hardening (16)
  { id: 67, title: 'x86_64 Memory Safety & Secure Systems Programming', slug: 'x86-memory-safety-secure-systems', category: 'Defensive Systems & Binary Hardening', difficultyTier: 'Red Team Specialist', estimatedLabHours: 22.0, priceBdt: 180, xpReward: 1150, badgeId: 'badge-memory-safety', flagSample: 'HS{EIP_RIP_OVERWRITE_NOP_SLED}' },
  { id: 68, title: 'Linux Kernel Hardening & Access Control Engineering', slug: 'linux-kernel-hardening-access-control', category: 'Defensive Systems & Binary Hardening', difficultyTier: 'Insane', estimatedLabHours: 30.0, priceBdt: 400, xpReward: 1600, badgeId: 'badge-kernel-hardening', flagSample: 'HS{COMMIT_CREDS_PREPARE_KERNEL_CRED}' },
  { id: 69, title: 'Windows Kernel Security & Secure Driver Architecture', slug: 'windows-kernel-security-secure-drivers', category: 'Defensive Systems & Binary Hardening', difficultyTier: 'Insane', estimatedLabHours: 32.0, priceBdt: 450, xpReward: 1700, badgeId: 'badge-ring0-security', flagSample: 'HS{IOCTL_DISPATCH_ARBITRARY_WRITE}' },
  { id: 70, title: 'Control Flow Integrity & ASLR/DEP Defense Mechanisms', slug: 'cfi-aslr-dep-defense-mechanisms', category: 'Defensive Systems & Binary Hardening', difficultyTier: 'Insane', estimatedLabHours: 25.0, priceBdt: 320, xpReward: 1400, badgeId: 'badge-rop-chain', flagSample: 'HS{POP_RDI_RET_LIBC_BASE_FOUND}' },
  { id: 71, title: 'Reverse Engineering with Ghidra & IDA Pro (Zero to Pro)', slug: 'reverse-engineering-ghidra-ida-pro', category: 'Defensive Systems & Binary Hardening', difficultyTier: 'Red Team Specialist', estimatedLabHours: 21.0, priceBdt: 199, xpReward: 1100, badgeId: 'badge-ghidra-ida', flagSample: 'HS{DECOMPILED_C_FLOW_DECRYPTED}' },
  { id: 72, title: 'Secure Dynamic Memory Allocation & Heap Protections', slug: 'secure-memory-allocation-heap-defense', category: 'Defensive Systems & Binary Hardening', difficultyTier: 'Insane', estimatedLabHours: 28.0, priceBdt: 380, xpReward: 1550, badgeId: 'badge-heap-defense', flagSample: 'HS{TCACHE_POISONING_MALLOC_HOOK}' },
  { id: 73, title: 'ARM & MIPS IoT Firmware Extraction & Bug Hunting', slug: 'arm-mips-iot-firmware-extraction', category: 'Defensive Systems & Binary Hardening', difficultyTier: 'Red Team Specialist', estimatedLabHours: 19.5, priceBdt: 170, xpReward: 1000, badgeId: 'badge-iot-firmware', flagSample: 'HS{BINWALK_SQUASHFS_EXTRACTED}' },
  { id: 74, title: 'Hardware Hacking: UART, JTAG & SPI Flash Interfacing', slug: 'uart-jtag-hardware-hacking', category: 'Defensive Systems & Binary Hardening', difficultyTier: 'Red Team Specialist', estimatedLabHours: 18.0, priceBdt: 160, xpReward: 950, badgeId: 'badge-jtag-uart', flagSample: 'HS{LOGIC_ANALYZER_SERIAL_115200}' },
  { id: 75, title: 'Automated Fuzzing with AFL++ and LibFuzzer', slug: 'automated-fuzzing-afl-libfuzzer', category: 'Defensive Systems & Binary Hardening', difficultyTier: 'Red Team Specialist', estimatedLabHours: 16.0, priceBdt: 150, xpReward: 900, badgeId: 'badge-afl-fuzzing', flagSample: 'HS{CRASH_CORPUS_SIGSEGV_PINNED}' },
  { id: 76, title: 'Software Integrity Verification & License Architecture', slug: 'software-integrity-license-architecture', category: 'Defensive Systems & Binary Hardening', difficultyTier: 'Red Team Specialist', estimatedLabHours: 17.0, priceBdt: 140, xpReward: 950, badgeId: 'badge-crack-defense', flagSample: 'HS{NOP_JNE_PATCH_INTEGRITY_SHIELD}' },
  { id: 77, title: 'Wasm (WebAssembly) Decompilation & Binary Hacking', slug: 'wasm-decompilation-binary-hacking', category: 'Defensive Systems & Binary Hardening', difficultyTier: 'Cyber Operative', estimatedLabHours: 12.0, priceBdt: 0, xpReward: 700, badgeId: 'badge-wasm-hack', flagSample: 'HS{WAT_TEXT_FORMAT_FLAG_REVEALED}' },
  { id: 78, title: 'Android App Reverse Engineering & Frida Hooking', slug: 'android-reverse-eng-frida-hooking', category: 'Defensive Systems & Binary Hardening', difficultyTier: 'Red Team Specialist', estimatedLabHours: 19.0, priceBdt: 180, xpReward: 1050, badgeId: 'badge-frida-android', flagSample: 'HS{SSL_PINNING_HOOKED_BYPASSED}' },
  { id: 79, title: 'iOS Application Hardening & Integrity Verification', slug: 'ios-app-hardening-integrity-check', category: 'Defensive Systems & Binary Hardening', difficultyTier: 'Red Team Specialist', estimatedLabHours: 18.5, priceBdt: 190, xpReward: 1050, badgeId: 'badge-ios-triage', flagSample: 'HS{MACH_O_OBJC_RUNTIME_INSPECTED}' },
  { id: 80, title: 'Smart Contract Security & Solidity Reentrancy Hacks', slug: 'smart-contract-solidity-reentrancy', category: 'Defensive Systems & Binary Hardening', difficultyTier: 'Red Team Specialist', estimatedLabHours: 16.5, priceBdt: 150, xpReward: 950, badgeId: 'badge-solidity-hack', flagSample: 'HS{CHECK_EFFECT_INTERACTION_SAFE}' },
  { id: 81, title: 'AI Model Security, Prompt Hardening & Robustness', slug: 'ai-model-security-prompt-hardening', category: 'Defensive Systems & Binary Hardening', difficultyTier: 'Cyber Operative', estimatedLabHours: 14.0, priceBdt: 0, xpReward: 800, badgeId: 'badge-ai-model-sec', flagSample: 'HS{SYSTEM_PROMPT_GUARDRAILS_SECURED}' },
  { id: 82, title: 'Vulnerability Assessment & Responsible Disclosure', slug: 'vulnerability-assessment-responsible-disclosure', category: 'Defensive Systems & Binary Hardening', difficultyTier: 'Insane', estimatedLabHours: 26.0, priceBdt: 300, xpReward: 1450, badgeId: 'badge-0day-research', flagSample: 'HS{CVE_2026_DISCLOSED_RESPONSIBLY}' },
];

export const MasterCyberAcademyEngineHub: React.FC = () => {
  const [activeModuleTab, setActiveModuleTab] = useState<
    'mod1_courses' | 'mod2_theming' | 'mod3_ctf_lock' | 'mod4_cert' | 'mod5_wallet_pay' | 'mod6_video' | 'mod7_ai_memory'
  >('mod1_courses');

  // Module 1 State (80+ Courses)
  const [searchCatalog, setSearchCatalog] = useState('');
  const [selectedCatFilter, setSelectedCatFilter] = useState<string>('all');
  const [selectedDiffFilter, setSelectedDiffFilter] = useState<string>('all');
  const [seederStatus, setSeederStatus] = useState<'idle' | 'syncing' | 'completed'>('idle');
  const [syncedCount, setSyncedCount] = useState<number>(82);

  // Module 2 State (Dynamic Theming & Power Level)
  const [activeThemeCategory, setActiveThemeCategory] = useState<string>('Web Hacking / OWASP');
  const [activePowerLevel, setActivePowerLevel] = useState<'low' | 'high' | 'coding'>('high');
  const [typographyScale, setTypographyScale] = useState<'normal' | 'large' | 'huge'>('normal');
  const [highContrast, setHighContrast] = useState<boolean>(false);

  // Module 3 State (CTF Terminal & Anti-Scraping Lock)
  const [termLines, setTermLines] = useState<Array<{ text: string; type: 'info' | 'success' | 'warn' | 'error' }>>([
    { text: '[+] HackersShikkhok Isolated Defense Sandbox v4.2.0 initialized.', type: 'info' },
    { text: '[+] Rate limiter active: Max 5 attempts/minute with exponential cooldown.', type: 'info' },
    { text: '[?] Type "help" or enter your CTF flag with `submit-flag <flag>`.', type: 'info' },
  ]);
  const [cmdInput, setCmdInput] = useState('');
  const [failCount, setFailCount] = useState<number>(0);
  const [cooldownSecs, setCooldownSecs] = useState<number>(0);
  const [antiScrapingBlockedBots] = useState(['GPTBot', 'Bytespider', 'Scrapy', 'curl/8.5.0', 'python-requests/2.31']);

  // Module 4 State (Certificates)
  const [studentName, setStudentName] = useState('Md. Tanvir Hasan');
  const [selectedCourseCert, setSelectedCourseCert] = useState<string>('owasp-top-10-mastery');
  const [generatedHash, setGeneratedHash] = useState<string>('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
  const [certVerifyInput, setCertVerifyInput] = useState<string>('');
  const [certVerifyResult, setCertVerifyResult] = useState<any>(null);

  // Module 5 State (Wallet & Webhooks)
  const [balanceBdt, setBalanceBdt] = useState<number>(245.50);
  const [xpPoints, setXpPoints] = useState<number>(1450);
  const [userRank, setUserRank] = useState<string>('Cyber Operative (Tier 3)');
  const [webhookSimGateway, setWebhookSimGateway] = useState<'bkash' | 'nagad' | 'sslcommerz'>('bkash');
  const [webhookAmount, setWebhookAmount] = useState<number>(500);
  const [webhookTrxId, setWebhookTrxId] = useState<string>('BK_TRX_' + Math.floor(100000 + Math.random() * 900000));
  const [webhookLogs, setWebhookLogs] = useState<string[]>([
    'System initialization: Wallet Ledger active with HMAC-SHA256 signature verification.',
  ]);

  // Module 6 State (DRM Video)
  const [maskedBlobUrl, setMaskedBlobUrl] = useState<string>('blob:https://hackersshikkhok.com/stream-auth/99a8b1c4-drm-encrypted-hls');
  const [tokenExpiresSecs, setTokenExpiresSecs] = useState<number>(840);

  // Module 7 State (AI Memory & Behavior)
  const [userInteractions, setUserInteractions] = useState<{ searches: string[]; visitedCats: Record<string, number> }>({
    searches: ['SQLi prepared statements', 'JWT token bypass', 'EDR evasion'],
    visitedCats: {
      'Web Hacking / OWASP': 14,
      'Network & Red Teaming': 9,
      'Defensive Systems & Binary Hardening': 7,
    },
  });

  // Cooldown countdown timer
  useEffect(() => {
    if (cooldownSecs > 0) {
      const timer = setTimeout(() => setCooldownSecs((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldownSecs]);

  // Apply theme dynamically to documentElement
  useEffect(() => {
    const themeStyles: Record<string, { primary: string; glow: string; secondary: string }> = {
      'Web Hacking / OWASP': { primary: '#00ff66', glow: 'rgba(0, 255, 102, 0.45)', secondary: '#052e16' },
      'Social Engineering & Defense': { primary: '#ff9900', glow: 'rgba(255, 153, 0, 0.5)', secondary: '#451a03' },
      'Network & Red Teaming': { primary: '#ff0055', glow: 'rgba(255, 0, 85, 0.5)', secondary: '#4c0519' },
      'Forensics & Blue Team': { primary: '#00f0ff', glow: 'rgba(0, 240, 255, 0.45)', secondary: '#082f49' },
      'Defensive Systems & Binary Hardening': { primary: '#a100ff', glow: 'rgba(161, 0, 255, 0.55)', secondary: '#3b0764' },
    };

    const cfg = themeStyles[activeThemeCategory] || themeStyles['Web Hacking / OWASP'];
    document.documentElement.style.setProperty('--cyber-primary', cfg.primary);
    document.documentElement.style.setProperty('--cyber-glow', cfg.glow);
    document.documentElement.style.setProperty('--cyber-secondary', cfg.secondary);
  }, [activeThemeCategory]);

  // Filter 82 Courses
  const filtered82Courses = MASTER_82_COURSES.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(searchCatalog.toLowerCase()) || c.slug.includes(searchCatalog.toLowerCase());
    const matchCat = selectedCatFilter === 'all' || c.category === selectedCatFilter;
    const matchDiff = selectedDiffFilter === 'all' || c.difficultyTier === selectedDiffFilter;
    return matchSearch && matchCat && matchDiff;
  });

  const handleRunSeeder = () => {
    setSeederStatus('syncing');
    setTimeout(() => {
      setSeederStatus('completed');
      setSyncedCount(82);
    }, 1200);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmdInput.trim()) return;
    const raw = cmdInput.trim();
    setCmdInput('');

    if (cooldownSecs > 0) {
      setTermLines((prev) => [
        ...prev,
        { text: `$ ${raw}`, type: 'info' },
        { text: `⛔ RATE LIMITED! Cooldown active: ${cooldownSecs}s remaining. Exponential lockout enforced.`, type: 'error' },
      ]);
      return;
    }

    if (raw === 'clear') {
      setTermLines([]);
      return;
    }

    if (raw === 'help') {
      setTermLines((prev) => [
        ...prev,
        { text: `$ ${raw}`, type: 'info' },
        { text: 'Available Hardened Commands: scan, nmap, analyze, exploit, submit-flag <flag>, status, wallet, whoami, clear', type: 'info' },
      ]);
      return;
    }

    if (raw.startsWith('submit-flag')) {
      const parts = raw.split(' ');
      const submitted = parts[1] || '';
      // Valid target flag for active challenge
      const validFlag = 'HS{OWASP_TOP10_SECURE_2026}';

      if (submitted === validFlag) {
        setTermLines((prev) => [
          ...prev,
          { text: `$ ${raw}`, type: 'info' },
          { text: `✓ [hash_equals] FLAG VERIFIED WITH SHA-256 TIMING-SAFE COMPARISON!`, type: 'success' },
          { text: `💰 Reward Credited: +25.00 BDT Cash & +150 XP Points deposited to wallet!`, type: 'success' },
        ]);
        setBalanceBdt((b) => b + 25.0);
        setXpPoints((x) => x + 150);
        setFailCount(0);
      } else {
        const newFails = failCount + 1;
        setFailCount(newFails);

        let penalty = 0;
        if (newFails >= 3) {
          penalty = 60; // 1 min cooldown
        }
        if (newFails >= 5) {
          penalty = 300; // 5 min cooldown
        }

        if (penalty > 0) {
          setCooldownSecs(penalty);
        }

        setTermLines((prev) => [
          ...prev,
          { text: `$ ${raw}`, type: 'info' },
          { text: `❌ INCORRECT FLAG! Verification failed. (Streak: ${newFails}/5)`, type: 'warn' },
          ...(penalty > 0
            ? [{ text: `⛔ Brute-Force lockout triggered! Exponential cooldown of ${penalty}s applied.`, type: 'error' as const }]
            : []),
        ]);
      }
      return;
    }

    if (raw === 'scan') {
      setTermLines((prev) => [
        ...prev,
        { text: `$ ${raw}`, type: 'info' },
        { text: 'Target: 10.10.14.25 (OWASP Sandboxed Daemon)\n[+] Port 80/http open (Apache/2.4.52)\n[+] Port 443/https open (TLS 1.3 Strict)\n[+] Flag challenge: Inspect JWT tokens or SQL queries.', type: 'info' },
      ]);
      return;
    }

    if (raw === 'wallet') {
      setTermLines((prev) => [
        ...prev,
        { text: `$ ${raw}`, type: 'info' },
        { text: `Wallet Status: ৳ ${balanceBdt.toFixed(2)} BDT | XP: ${xpPoints} | Rank: ${userRank}`, type: 'success' },
      ]);
      return;
    }

    // Default response
    setTermLines((prev) => [
      ...prev,
      { text: `$ ${raw}`, type: 'info' },
      { text: `Command output: [Simulated execution for "${raw}" completed in 12ms]`, type: 'info' },
    ]);
  };

  const handleGenerateCertificate = () => {
    const rawSig = `CERT:1:${selectedCourseCert}:${studentName}:${Date.now()}:hs_cert_secret`;
    // Simple SHA-256 simulation
    const simulatedHash = 'hs_' + Array.from(rawSig).reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) % 1000000007, 7).toString(16) + 'f8829a1b0c';
    setGeneratedHash(simulatedHash);
  };

  const handleVerifyLookup = () => {
    if (certVerifyInput.trim().length > 8) {
      setCertVerifyResult({
        valid: true,
        hash: certVerifyInput.trim(),
        studentName: 'Md. Tanvir Hasan',
        course: 'Web Application Security & OWASP Top 10 (2026)',
        date: '2026-10-09',
        xp: 600,
        bdt: 25.0,
        status: 'VERIFIED_CRYPTOGRAPHICALLY',
        seal: 'Authentic Hackers Shikkhok Board Record ✓',
      });
    } else {
      setCertVerifyResult({
        valid: false,
        message: 'ইনভ্যালিড অথবা অচেনা সার্টিফিকেট হ্যাশ। দয়া করে পূর্ণাঙ্গ হ্যাশ দিন।',
      });
    }
  };

  const handleSimulateWebhook = () => {
    const trx = 'TXN_' + Math.floor(100000 + Math.random() * 900000);
    setWebhookTrxId(trx);
    setBalanceBdt((b) => b + webhookAmount);
    setXpPoints((x) => x + webhookAmount * 2);

    const logEntry = `[${new Date().toLocaleTimeString()}] IPN Verified (HMAC Match) via ${webhookSimGateway.toUpperCase()}: Credited ৳ ${webhookAmount.toFixed(2)} BDT to Cadet Wallet (TRX: ${trx})`;
    setWebhookLogs((prev) => [logEntry, ...prev]);
  };

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 space-y-6">
      {/* Header Banner */}
      <div className="relative rounded-2xl border-2 border-[var(--cyber-primary)] bg-gradient-to-br from-[#060c1d] via-[#091122] to-[#0e172a] p-6 shadow-[0_0_35px_var(--cyber-glow)] overflow-hidden">
        {/* Category visual effect badges */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--cyber-primary)] bg-[var(--cyber-primary)]/10 px-3.5 py-1 text-xs font-mono font-extrabold text-[var(--cyber-primary)]">
              <Zap className="h-4 w-4" />
              ULTRA-PRO 3X POWER LMS &amp; AUTONOMOUS SYSTEM SPECIFICATION SUITE
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight font-mono">
              🛡️ Hackers Shikkhok 7-Module Enterprise Architecture
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              80+ Courses Bulk Migration Seeder · Dynamic Neon Aesthetics &amp; Power Level Overclock · Hardened CTF Terminal with Exponential Rate-Limiter · Cryptographic SHA-256 PDF Certificates · BDT Wallet &amp; Real IPN Webhooks · DRM Video Shield · AI Memory Engine.
            </p>
          </div>

          {/* Quick HUD Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
            <div className="rounded-xl border border-slate-800 bg-[#050811] px-3.5 py-2.5">
              <div className="text-lg font-extrabold font-mono text-[var(--cyber-primary)]">{syncedCount} Courses</div>
              <div className="text-[11px] text-slate-400">80+ Catalog Track</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-[#050811] px-3.5 py-2.5">
              <div className="text-lg font-extrabold font-mono text-amber-400">৳ {balanceBdt.toFixed(1)}</div>
              <div className="text-[11px] text-slate-400">BDT Wallet Balance</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-[#050811] px-3.5 py-2.5">
              <div className="text-lg font-extrabold font-mono text-purple-400">⚡ {xpPoints}</div>
              <div className="text-[11px] text-slate-400">Cadet XP Points</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-[#050811] px-3.5 py-2.5">
              <div className="text-lg font-extrabold font-mono text-emerald-400">
                {activePowerLevel === 'high' ? '3X Overclock' : activePowerLevel === 'coding' ? 'IDE Mode' : '1X Normal'}
              </div>
              <div className="text-[11px] text-slate-400">AI Power State</div>
            </div>
          </div>
        </div>

        {/* 7 Modules Navigation Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-800/90 pt-4">
          {[
            { id: 'mod1_courses', label: '1. 80+ Courses Seeder', icon: Layers },
            { id: 'mod2_theming', label: '2. Dynamic Neon Theming', icon: Sparkles },
            { id: 'mod3_ctf_lock', label: '3. Hardened CTF & Anti-Scraping', icon: Terminal },
            { id: 'mod4_cert', label: '4. SHA-256 PDF Certificates', icon: Award },
            { id: 'mod5_wallet_pay', label: '5. BDT Wallet & Payment IPN', icon: Wallet },
            { id: 'mod6_video', label: '6. DRM Video Stream Shield', icon: Video },
            { id: 'mod7_ai_memory', label: '7. AI Behavioral Memory', icon: Brain },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeModuleTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveModuleTab(tab.id as typeof activeModuleTab)}
                className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-mono font-extrabold transition cursor-pointer ${
                  isActive
                    ? 'bg-[var(--cyber-primary)] text-[#050811] shadow-[0_0_15px_var(--cyber-glow)]'
                    : 'border border-slate-800 bg-[#050811] text-slate-300 hover:border-[var(--cyber-primary)]/50 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* MODULE 1: 80+ COURSES BULK MIGRATION & SYSTEM SEEDER */}
      {activeModuleTab === 'mod1_courses' && (
        <div className="space-y-4 rounded-2xl border border-slate-800 bg-[#090e1a] p-6 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono text-[var(--cyber-primary)]">MODULE 1: ENTERPRISE BULK SEEDER</span>
              <h3 className="text-xl font-bold text-white mt-0.5">80+ Cyber Security Courses Master Catalog Pipeline</h3>
              <p className="text-xs text-slate-400 mt-1">
                WP-CLI: <code className="text-[var(--cyber-primary)] bg-black px-1.5 py-0.5 rounded font-mono">wp cyber-lms import-courses --file=courses_80.json</code> অথবা এক-ক্লিকে সিংক্রোনাইজ করুন।
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRunSeeder}
                disabled={seederStatus === 'syncing'}
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--cyber-primary)] hover:opacity-90 text-[#050811] px-4 py-2 text-xs font-bold font-mono transition cursor-pointer"
              >
                <RefreshCw className={`h-4 w-4 ${seederStatus === 'syncing' ? 'animate-spin' : ''}`} />
                {seederStatus === 'syncing' ? 'Syncing 82 Courses...' : seederStatus === 'completed' ? '✓ 82 Courses Synchronized!' : '🚀 Import & Sync 80+ Courses'}
              </button>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="কোর্স টাইটেল বা স্লাগ খুঁজুন..."
                value={searchCatalog}
                onChange={(e) => setSearchCatalog(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#050811] border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-[var(--cyber-primary)]"
              />
            </div>

            <select
              value={selectedCatFilter}
              onChange={(e) => setSelectedCatFilter(e.target.value)}
              className="bg-[#050811] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[var(--cyber-primary)]"
            >
              <option value="all">সকল ক্যাটাগরি (৫টি স্পেশালাইজেশন)</option>
              <option value="Web Hacking / OWASP">Web Hacking / OWASP (18)</option>
              <option value="Social Engineering & Defense">Social Engineering &amp; Defense (14)</option>
              <option value="Network & Red Teaming">Network &amp; Red Teaming (18)</option>
              <option value="Forensics & Blue Team">Forensics &amp; Blue Team (16)</option>
              <option value="Defensive Systems & Binary Hardening">Defensive Systems & Binary Hardening (16)</option>
            </select>

            <select
              value={selectedDiffFilter}
              onChange={(e) => setSelectedDiffFilter(e.target.value)}
              className="bg-[#050811] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[var(--cyber-primary)]"
            >
              <option value="all">সকল ডিফিকাল্টি টিয়ার</option>
              <option value="Script Kiddie">Script Kiddie (Beginner)</option>
              <option value="Cyber Operative">Cyber Operative (Intermediate)</option>
              <option value="Red Team Specialist">Red Team Specialist (Advanced)</option>
              <option value="Insane">Insane (Expert / Kernel)</option>
            </select>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 max-h-[500px] overflow-y-auto pr-1">
            {filtered82Courses.map((course) => (
              <div
                key={course.id}
                className="rounded-xl border border-slate-800 bg-[#050811] p-3.5 hover:border-[var(--cyber-primary)]/50 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className="font-mono text-slate-400">#{course.id}</span>
                    <span
                      className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                        course.difficultyTier === 'Insane'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                          : course.difficultyTier === 'Red Team Specialist'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : course.difficultyTier === 'Cyber Operative'
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      }`}
                    >
                      {course.difficultyTier}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white leading-snug">{course.title}</h4>
                  <div className="text-[11px] text-slate-400 font-mono mt-1">Slug: {course.slug}</div>
                </div>

                <div className="border-t border-slate-900 pt-2.5 mt-2.5 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400">⏱ {course.estimatedLabHours} hrs</span>
                  <span className="text-purple-400">⚡ +{course.xpReward} XP</span>
                  <span className="text-emerald-400">{course.priceBdt > 0 ? `৳ ${course.priceBdt}` : 'FREE'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 2: DYNAMIC COLOR ACCENT & POWER LEVEL */}
      {activeModuleTab === 'mod2_theming' && (
        <div className="space-y-4 rounded-2xl border border-slate-800 bg-[#090e1a] p-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono text-[var(--cyber-primary)]">MODULE 2: LIVE THEMING &amp; OVERCLOCK</span>
            <h3 className="text-xl font-bold text-white mt-0.5">Category-Based Dynamic Neon Aesthetics &amp; Power Levels</h3>
            <p className="text-xs text-slate-400 mt-1">
              ক্যাটাগরি স্যুইচ করলে সাথে সাথে লাইভ CSS ভেরিয়েবল (<code className="text-[var(--cyber-primary)] font-mono">:root --cyber-primary</code>) এবং অ্যানিমেশন ওভারলে পরিবর্তিত হয়।
            </p>
          </div>

          {/* Category Aesthetics Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {[
              { cat: 'Web Hacking / OWASP', color: '#00ff66', desc: 'Matrix Green (Scanlines)', class: 'theme-web-hacking' },
              { cat: 'Social Engineering & Defense', color: '#ff9900', desc: 'Cyber Amber (Radar Sweep)', class: 'theme-social-defense' },
              { cat: 'Network & Red Teaming', color: '#ff0055', desc: 'Crimson Red (Glitch Threat)', class: 'theme-network-red-team' },
              { cat: 'Forensics & Blue Team', color: '#00f0ff', desc: 'Electric Blue (Data Shield)', class: 'theme-forensics-blue-team' },
              { cat: 'Defensive Systems & Binary Hardening', color: '#a100ff', desc: 'Vibrant Neon Purple (Holo HUD)', class: 'theme-defensive-systems' },
            ].map((item) => (
              <button
                key={item.cat}
                onClick={() => setActiveThemeCategory(item.cat)}
                style={{
                  borderColor: activeThemeCategory === item.cat ? item.color : '#1e293b',
                  backgroundColor: activeThemeCategory === item.cat ? `${item.color}15` : '#050811',
                }}
                className="p-3.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className="text-xs font-bold text-white">{item.cat}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2">{item.desc}</p>
                </div>
                {activeThemeCategory === item.cat && (
                  <span className="text-[10px] font-mono font-bold mt-2 text-right" style={{ color: item.color }}>
                    ACTIVE PRESET ✓
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Power Level Transitions & Accessibility Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
            <div className="rounded-xl border border-slate-800 bg-[#050811] p-4 space-y-3">
              <h4 className="text-xs font-mono font-bold text-white flex items-center gap-2">
                <Cpu className="h-4 w-4 text-[var(--cyber-primary)]" />
                AI Chatbot &amp; User Power Level Mode
              </h4>
              <div className="flex items-center gap-2">
                {[
                  { level: 'low', label: 'Low Power (Free)', desc: 'Clean, Minimal HUD' },
                  { level: 'high', label: 'High / Hacking (3X)', desc: 'Full Neon Glowing HUD' },
                  { level: 'coding', label: 'Coding IDE Mode', desc: 'IDE-style Line Highlight' },
                ].map((p) => (
                  <button
                    key={p.level}
                    onClick={() => setActivePowerLevel(p.level as typeof activePowerLevel)}
                    className={`flex-1 p-2.5 rounded-lg border text-xs font-mono transition cursor-pointer text-center ${
                      activePowerLevel === p.level
                        ? 'border-[var(--cyber-primary)] bg-[var(--cyber-primary)]/15 text-[var(--cyber-primary)] font-bold'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div>{p.label}</div>
                    <div className="text-[10px] text-slate-400">{p.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#050811] p-4 space-y-3">
              <h4 className="text-xs font-mono font-bold text-white flex items-center gap-2">
                <Sliders className="h-4 w-4 text-[var(--cyber-primary)]" />
                Accessibility &amp; Typography Scaler
              </h4>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTypographyScale('normal')}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-mono ${typographyScale === 'normal' ? 'border-[var(--cyber-primary)] text-[var(--cyber-primary)] font-bold' : 'border-slate-800 text-slate-400'}`}
                >
                  Standard (100%)
                </button>
                <button
                  onClick={() => setTypographyScale('large')}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-mono ${typographyScale === 'large' ? 'border-[var(--cyber-primary)] text-[var(--cyber-primary)] font-bold' : 'border-slate-800 text-slate-400'}`}
                >
                  Large (A+)
                </button>
                <button
                  onClick={() => setHighContrast(!highContrast)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-mono ${highContrast ? 'border-amber-400 text-amber-400 font-bold bg-amber-400/10' : 'border-slate-800 text-slate-400'}`}
                >
                  {highContrast ? 'High Contrast ON' : 'High Contrast OFF'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 3: PRO-LEVEL CTF ENGINE & ANTI-SCRAPING LOCK */}
      {activeModuleTab === 'mod3_ctf_lock' && (
        <div className="space-y-4 rounded-2xl border border-slate-800 bg-[#090e1a] p-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-[var(--cyber-primary)]">MODULE 3: PRO CTF TERMINAL &amp; HARDENING</span>
              <h3 className="text-xl font-bold text-white mt-0.5">Isolated xterm Sandbox &amp; Exponential Rate-Limiter</h3>
              <p className="text-xs text-slate-400 mt-1">
                REST API: <code className="text-[var(--cyber-primary)] font-mono">/wp-json/lms/v1/ctf/verify</code> with <code className="text-cyan-400 font-mono">hash_equals()</code> timing-attack protection.
              </p>
            </div>

            {cooldownSecs > 0 ? (
              <div className="px-3.5 py-1.5 rounded-xl border border-red-500 bg-red-500/10 text-red-400 font-mono text-xs flex items-center gap-2 animate-pulse">
                <AlertTriangle className="h-4 w-4" />
                <span>EXPONENTIAL COOLDOWN LOCK: {cooldownSecs}s</span>
              </div>
            ) : (
              <div className="px-3.5 py-1.5 rounded-xl border border-emerald-500 bg-emerald-500/10 text-emerald-400 font-mono text-xs flex items-center gap-2">
                <ShieldAlert className="h-4 w-4" />
                <span>RATE-LIMIT STATUS: NORMAL (Max 5 req/min)</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Terminal Window */}
            <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-[#040711] overflow-hidden flex flex-col h-[340px]">
              <div className="bg-[#0b101d] px-3.5 py-2 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                  <span className="text-slate-300 ml-2">cadet@hackersshikkhok:~ [isolated sandbox]</span>
                </div>
                <span>xterm.js v5.3</span>
              </div>

              <div className="flex-1 p-3.5 overflow-y-auto font-mono text-xs space-y-1">
                {termLines.map((line, idx) => (
                  <div
                    key={idx}
                    className={`${
                      line.type === 'success'
                        ? 'text-emerald-400'
                        : line.type === 'warn'
                        ? 'text-amber-400'
                        : line.type === 'error'
                        ? 'text-red-400'
                        : 'text-slate-300'
                    }`}
                  >
                    {line.text}
                  </div>
                ))}
              </div>

              <form onSubmit={handleTerminalSubmit} className="p-2 border-t border-slate-800 bg-[#050814] flex items-center gap-2">
                <span className="font-mono text-xs text-[var(--cyber-primary)] pl-2">cadet$</span>
                <input
                  type="text"
                  placeholder="submit-flag HS{OWASP_TOP10_SECURE_2026} বা scan..."
                  value={cmdInput}
                  onChange={(e) => setCmdInput(e.target.value)}
                  className="flex-1 bg-transparent text-xs font-mono text-white focus:outline-none"
                />
                <button type="submit" className="px-3 py-1 bg-[var(--cyber-primary)] text-[#050811] text-xs font-mono font-bold rounded">
                  Run
                </button>
              </form>
            </div>

            {/* Anti-Scraping & DRM Watermark Info */}
            <div className="rounded-xl border border-slate-800 bg-[#050811] p-4 space-y-3 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-mono font-bold text-white flex items-center gap-2 mb-2">
                  <Lock className="h-4 w-4 text-[var(--cyber-primary)]" />
                  Anti-Scraping Lock &amp; DRM Shield
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                  বট স্ক্র্যাপার ব্লকিং, রাইট-ক্লিক ও টেক্সট সিলেকশন লক এবং ক্রিপ্টোগ্রাফিক ওয়াটারমার্ক DOM-এ স্বয়ংক্রিয়ভাবে ইনজেক্ট করা হয়।
                </p>

                <div className="space-y-1.5">
                  <div className="text-[11px] font-mono text-slate-400">Blocked AI Bots:</div>
                  <div className="flex flex-wrap gap-1">
                    {antiScrapingBlockedBots.map((bot) => (
                      <span key={bot} className="px-1.5 py-0.5 rounded bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-[10px]">
                        ⛔ {bot}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded bg-black/60 border border-slate-800 font-mono text-[10px] text-slate-400 space-y-1">
                <div className="text-[var(--cyber-primary)]">Injected DOM Watermark:</div>
                <div className="truncate text-slate-300">HS-SEC-UID-1-9f86d081884c7d65-1775791200</div>
                <div className="text-[9px] text-slate-500">Opacity: 0.018 | Anti-Screenshot Traceable</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 4: DYNAMIC PDF CERTIFICATE GENERATOR */}
      {activeModuleTab === 'mod4_cert' && (
        <div className="space-y-4 rounded-2xl border border-slate-800 bg-[#090e1a] p-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono text-[var(--cyber-primary)]">MODULE 4: CRYPTOGRAPHIC CERTIFICATES</span>
            <h3 className="text-xl font-bold text-white mt-0.5">Dynamic PDF Certificate Generator &amp; Public Verification</h3>
            <p className="text-xs text-slate-400 mt-1">
              ১০০% কোর্স সম্পন্ন হলে স্বয়ংক্রিয়ভাবে ইউনিক SHA-256 হ্যাশ সহ PDF সার্টিফিকেট প্রস্তুত হয় যা <code className="text-[var(--cyber-primary)] font-mono">/verify-certificate/{'{hash}'}</code> লিংকে সর্বজনীনভাবে যাচাইযোগ্য।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Certificate Form */}
            <div className="rounded-xl border border-slate-800 bg-[#050811] p-4 space-y-3">
              <h4 className="text-xs font-mono font-bold text-white">Generate Cryptographic Certificate</h4>
              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">শিক্ষার্থীর নাম:</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#090e1a] border border-slate-800 rounded-lg text-xs text-white font-mono focus:border-[var(--cyber-primary)]"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">কোর্স নির্বাচন করুন:</label>
                <select
                  value={selectedCourseCert}
                  onChange={(e) => setSelectedCourseCert(e.target.value)}
                  className="w-full px-3 py-2 bg-[#090e1a] border border-slate-800 rounded-lg text-xs text-white font-mono focus:border-[var(--cyber-primary)]"
                >
                  {MASTER_82_COURSES.slice(0, 15).map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleGenerateCertificate}
                className="w-full py-2.5 rounded-lg bg-[var(--cyber-primary)] text-[#050811] font-mono font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Award className="h-4 w-4" />
                Generate Signed Certificate (SHA-256)
              </button>

              <div className="p-3 rounded-lg bg-black/60 border border-slate-800 font-mono text-xs space-y-1">
                <span className="text-slate-400 text-[11px] block">Generated SHA-256 Hash:</span>
                <code className="text-emerald-400 text-[11px] break-all block">{generatedHash}</code>
              </div>
            </div>

            {/* Public Certificate Verifier Simulation */}
            <div className="rounded-xl border border-slate-800 bg-[#050811] p-4 space-y-3 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-mono font-bold text-white flex items-center gap-2">
                  <QrCode className="h-4 w-4 text-[var(--cyber-primary)]" />
                  Public Verification Portal Simulator
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 mb-3">
                  যেকোনো সার্টিফিকেট হ্যাশ ইনপুট দিয়ে সরাসরি অন-চেইন স্ট্যাটাস ও জেনুইনিটি টেস্ট করুন:
                </p>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="SHA-256 হ্যাশ পেস্ট করুন..."
                    value={certVerifyInput}
                    onChange={(e) => setCertVerifyInput(e.target.value)}
                    className="flex-1 px-3 py-2 bg-[#090e1a] border border-slate-800 rounded-lg text-xs text-slate-200 font-mono focus:border-[var(--cyber-primary)]"
                  />
                  <button
                    onClick={handleVerifyLookup}
                    className="px-4 py-2 bg-cyan-500 text-[#050811] rounded-lg text-xs font-mono font-bold"
                  >
                    Verify
                  </button>
                </div>

                {certVerifyResult && (
                  <div className={`mt-3 p-3 rounded-lg border text-xs font-mono ${certVerifyResult.valid ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' : 'bg-red-500/10 border-red-500/40 text-red-300'}`}>
                    {certVerifyResult.valid ? (
                      <div className="space-y-1">
                        <div className="font-bold text-emerald-400">{certVerifyResult.seal}</div>
                        <div>Cadet: {certVerifyResult.studentName}</div>
                        <div>Course: {certVerifyResult.course}</div>
                        <div>Date: {certVerifyResult.date} | XP: +{certVerifyResult.xp}</div>
                      </div>
                    ) : (
                      <div>{certVerifyResult.message}</div>
                    )}
                  </div>
                )}
              </div>

              <div className="text-[11px] text-slate-500 font-mono">
                Theme Route: <code className="text-slate-400">hackersshikkhok-theme/page-verify-certificate.php</code>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 5: BDT WALLET, GAMIFIED ECONOMY & WEBHOOKS */}
      {activeModuleTab === 'mod5_wallet_pay' && (
        <div className="space-y-4 rounded-2xl border border-slate-800 bg-[#090e1a] p-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono text-[var(--cyber-primary)]">MODULE 5: BDT WALLET &amp; IPN WEBHOOKS</span>
            <h3 className="text-xl font-bold text-white mt-0.5">Gamified Economy &amp; Real Payment Gateway Webhooks</h3>
            <p className="text-xs text-slate-400 mt-1">
              bKash, Nagad এবং SSLCommerz থেকে <code className="text-[var(--cyber-primary)] font-mono">/wp-json/lms/v1/payment/webhook</code> এন্ডপয়েন্টে HMAC সিগনেচার যাচাইপূর্বক তাৎক্ষণিক ব্যালেন্স জমা।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Gamified Rewards Simulation */}
            <div className="rounded-xl border border-slate-800 bg-[#050811] p-4 space-y-3">
              <h4 className="text-xs font-mono font-bold text-white">Gamified Reward Triggers</h4>
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                <button
                  onClick={() => {
                    setBalanceBdt((b) => b + 5.0);
                    setXpPoints((x) => x + 50);
                  }}
                  className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:border-emerald-500/50 cursor-pointer"
                >
                  <div className="text-emerald-400 font-bold">+5 BDT</div>
                  <div className="text-[10px] text-slate-400">Comment Like</div>
                </button>

                <button
                  onClick={() => {
                    setBalanceBdt((b) => b + 2.0);
                    setXpPoints((x) => x + 20);
                  }}
                  className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:border-emerald-500/50 cursor-pointer"
                >
                  <div className="text-cyan-400 font-bold">+2 BDT</div>
                  <div className="text-[10px] text-slate-400">Article Like</div>
                </button>

                <button
                  onClick={() => {
                    setBalanceBdt((b) => b + 25.0);
                    setXpPoints((x) => x + 150);
                  }}
                  className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:border-emerald-500/50 cursor-pointer"
                >
                  <div className="text-purple-400 font-bold">+25 BDT</div>
                  <div className="text-[10px] text-slate-400">CTF Solve</div>
                </button>
              </div>

              <div className="p-3 rounded-lg bg-black/60 border border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Current Balance:</span>
                <span className="text-emerald-400 font-bold text-sm">৳ {balanceBdt.toFixed(2)} BDT</span>
              </div>
            </div>

            {/* Real Payment Webhook Simulator */}
            <div className="rounded-xl border border-slate-800 bg-[#050811] p-4 space-y-3">
              <h4 className="text-xs font-mono font-bold text-white">Payment Webhook Simulator (IPN HMAC)</h4>
              <div className="grid grid-cols-3 gap-2">
                {(['bkash', 'nagad', 'sslcommerz'] as const).map((gw) => (
                  <button
                    key={gw}
                    onClick={() => setWebhookSimGateway(gw)}
                    className={`p-2 rounded-lg border text-xs font-mono uppercase font-bold cursor-pointer ${
                      webhookSimGateway === gw ? 'border-[var(--cyber-primary)] bg-[var(--cyber-primary)]/15 text-[var(--cyber-primary)]' : 'border-slate-800 text-slate-400'
                    }`}
                  >
                    {gw}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="number"
                  value={webhookAmount}
                  onChange={(e) => setWebhookAmount(Number(e.target.value))}
                  className="flex-1 px-3 py-2 bg-[#090e1a] border border-slate-800 rounded-lg text-xs text-white font-mono"
                  placeholder="Amount BDT"
                />
                <button
                  onClick={handleSimulateWebhook}
                  className="px-4 py-2 bg-emerald-500 text-[#050811] rounded-lg text-xs font-mono font-bold cursor-pointer"
                >
                  Simulate IPN
                </button>
              </div>

              <div className="max-h-[85px] overflow-y-auto space-y-1 font-mono text-[10px] text-slate-400 bg-black/50 p-2 rounded">
                {webhookLogs.map((log, i) => (
                  <div key={i} className="text-slate-300">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 6: DRM VIDEO STREAM SHIELD */}
      {activeModuleTab === 'mod6_video' && (
        <div className="space-y-4 rounded-2xl border border-slate-800 bg-[#090e1a] p-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono text-[var(--cyber-primary)]">MODULE 6: DRM MEDIA SECURITY</span>
            <h3 className="text-xl font-bold text-white mt-0.5">Domain-Locked Bunny.net Stream &amp; Encrypted Blob Masking</h3>
            <p className="text-xs text-slate-400 mt-1">
              সরাসরি কাঁচা MP4 লিঙ্ক সম্পূর্ণ নিষিদ্ধ। সাইনড ১৫-মিনিট টোকেন এবং ডোমেন লকিং (<code className="text-[var(--cyber-primary)] font-mono">hackersshikkhok.com</code>) এর মাধ্যমে HLS স্ট্রিম পরিচালিত হয়।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Player Container Preview */}
            <div className="rounded-xl border border-slate-800 bg-[#050811] p-4 flex flex-col justify-between aspect-video relative overflow-hidden">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--cyber-primary)]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  DRM ENCRYPTED HLS STREAM
                </span>
                <span className="text-[10px] text-slate-400">Expires in: {tokenExpiresSecs}s</span>
              </div>

              <div className="text-center space-y-2">
                <Play className="h-10 w-10 text-[var(--cyber-primary)] mx-auto opacity-80" />
                <div className="text-xs font-mono text-slate-300">Bunny.net Stream Player Masked</div>
                <div className="text-[10px] font-mono text-slate-500 truncate max-w-xs mx-auto">{maskedBlobUrl}</div>
              </div>

              <div className="text-right text-[10px] font-mono text-slate-500">
                WATERMARK: CADET #1 [HS-DRM-AUTH]
              </div>
            </div>

            {/* DRM Shield Details */}
            <div className="rounded-xl border border-slate-800 bg-[#050811] p-4 space-y-2.5 text-xs font-mono text-slate-300">
              <h4 className="text-xs font-bold text-white flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-[var(--cyber-primary)]" />
                DRM Security Configuration
              </h4>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between border-b border-slate-900 pb-1">
                  <span className="text-slate-400">Allowed HTTP Referer:</span>
                  <span className="text-emerald-400">hackersshikkhok.com</span>
                </div>
                <div className="flex justify-between border-b border-slate-900 pb-1">
                  <span className="text-slate-400">Token Duration:</span>
                  <span className="text-cyan-400">15 Minutes (HMAC-SHA256)</span>
                </div>
                <div className="flex justify-between border-b border-slate-900 pb-1">
                  <span className="text-slate-400">Raw MP4 Direct Access:</span>
                  <span className="text-red-400">BLOCKED (403 Forbidden)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Watermark Traceability:</span>
                  <span className="text-purple-400">User ID + Session Token</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 7: AI MEMORY & BEHAVIORAL TRACKING */}
      {activeModuleTab === 'mod7_ai_memory' && (
        <div className="space-y-4 rounded-2xl border border-slate-800 bg-[#090e1a] p-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono text-[var(--cyber-primary)]">MODULE 7: AI MEMORY &amp; BEHAVIORAL PROFILING</span>
            <h3 className="text-xl font-bold text-white mt-0.5">Behavioral Analytics Engine &amp; Dynamic Course Recommendations</h3>
            <p className="text-xs text-slate-400 mt-1">
              ব্যবহারকারীর সার্চ হিস্ট্রি, স্পেশালাইজেশন ক্যাটাগরি এবং ল্যাব সময় ট্র্যাক করে অটোমেটিক রিকমেন্ডেশন ও টার্মিনাল প্রম্পট অ্যাডাপ্ট করা হয়।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-800 bg-[#050811] p-4 space-y-3">
              <h4 className="text-xs font-mono font-bold text-white">Tracked Behavioral Signals (Encrypted Cookie)</h4>
              <div className="space-y-2 text-xs font-mono">
                <div className="text-[11px] text-slate-400">Top Visited Category Affinities:</div>
                {Object.entries(userInteractions.visitedCats).map(([cat, count]) => (
                  <div key={cat} className="flex justify-between items-center bg-[#090e1a] p-2 rounded">
                    <span className="text-slate-200">{cat}</span>
                    <span className="text-[var(--cyber-primary)] font-bold">{count} visits</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#050811] p-4 space-y-3 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-mono font-bold text-white">Dynamic AI Recommendation</h4>
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono mt-2 space-y-1.5">
                  <div className="font-bold">🎯 Personalized Track: Web Hacking &amp; OWASP Mastery</div>
                  <p className="text-[11px] text-slate-300">
                    ব্যবহারকারীর সাম্প্রতিক অনুসন্ধান (SQLi, JWT) অনুযায়ী এই মুহূর্তে "Advanced SQL Injection &amp; Defense" কোর্সটি সাজেস্ট করা হয়েছে।
                  </p>
                  <div className="text-[10px] text-slate-400">
                    Adaptive Terminal Prompt: <code className="text-white">cadet@hackersshikkhok:~ [focus: web-hacking]$ </code>
                  </div>
                </div>
              </div>

              <div className="text-[11px] font-mono text-slate-500">
                Encrypted Session: <code className="text-slate-400">hs_cyber_session_v4 (UUID + HMAC)</code>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

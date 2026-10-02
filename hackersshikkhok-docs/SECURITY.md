# Security Policy & Hardening — Hackers শিক্ষক

## Core Security Mechanisms
1. **Server-Side Verification:** Client submissions are untrusted. Course progress, XP, quiz scores, exam results, and certificates are strictly computed and verified on the WordPress server.
2. **Prepared Database Queries:** All dynamic database operations strictly use `$wpdb->prepare()`.
3. **Capability & Nonce Enforcements:** REST endpoints enforce strict `permission_callback` routines and user session authentication.
4. **Sandboxed Code Execution:** No user code or Python is executed on the shared WordPress server. Code execution occurs exclusively in sandboxed browser iframes or WASM runtimes.

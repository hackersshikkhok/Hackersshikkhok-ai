<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\LMS;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Class SVG_Annotator
 * Ultra-Pro Dynamic Vector Diagram, Red Callout Arrow, Flowchart & Network Topology Annotator.
 * 
 * @package HackersShikkhok\Core\LMS
 */
final class SVG_Annotator {

    public static function register(): void {
        add_shortcode( 'hs_svg_diagram', array( self::class, 'render_shortcode' ) );
        add_action( 'rest_api_init', static function (): void {
            register_rest_route( 'hackersshikkhok/v1', '/lms/diagram/(?P<key>[a-zA-Z0-9_-]+)', array(
                'methods'             => 'GET',
                'permission_callback' => '__return_true',
                'callback'            => static function ( \WP_REST_Request $request ): \WP_REST_Response {
                    $key  = sanitize_key( (string) $request->get_param( 'key' ) );
                    $html = self::render_diagram( $key );
                    return new \WP_REST_Response( array( 'success' => true, 'key' => $key, 'html' => $html ), 200 );
                },
            ) );
        } );
    }

    public static function render_shortcode( array $atts = array() ): string {
        $atts = shortcode_atts( array(
            'key'   => 'sqli_prevention',
            'title' => '',
            'mode'  => 'dark',
        ), $atts, 'hs_svg_diagram' );

        return self::render_diagram( (string) $atts['key'], (string) $atts['title'] );
    }

    /**
     * Render responsive vector diagram with Red Callout Arrows & numbered step badges
     */
    public static function render_diagram( string $key, string $custom_title = '' ): string {
        switch ( $key ) {
            case 'jwt_auth_flow':
                return self::diagram_jwt_auth( $custom_title );
            case 'network_dmz_defense':
                return self::diagram_network_dmz( $custom_title );
            case 'xss_defense':
                return self::diagram_xss_mitigation( $custom_title );
            case 'sqli_prevention':
            default:
                return self::diagram_sqli_prepared_statement( $custom_title );
        }
    }

    /**
     * Diagram 1: SQL Injection Prevention via Prepared Statements & Parameter Binding
     */
    public static function diagram_sqli_prepared_statement( string $title = '' ): string {
        $diagram_title = $title ?: 'SQL Injection Prevention & Parameterized Queries Architecture';
        
        return <<<SVG
<div class="hs-svg-container" style="background:#0a0e17;border:1px solid #00f5d4;border-radius:14px;padding:20px;margin:20px 0;position:relative;overflow:hidden;box-shadow:0 0 25px rgba(0,245,212,0.15);">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;border-bottom:1px solid #1e293b;padding-bottom:10px;">
        <span style="color:#00f5d4;font-family:monospace;font-size:13px;font-weight:700;">📐 DEFENSIVE ARCHITECTURE DIAGRAM</span>
        <span style="background:#ff3366;color:#ffffff;font-size:11px;font-weight:bold;padding:2px 8px;border-radius:4px;font-family:monospace;">RED ARROWS: CRITICAL DEFENSE POINTS</span>
    </div>
    <svg viewBox="0 0 900 420" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;">
        <defs>
            <!-- Marker for Red Callout Arrows -->
            <marker id="redArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#ff3366" />
            </marker>
            <!-- Marker for Cyan Flow Arrows -->
            <marker id="cyanArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#00f5d4" />
            </marker>
            <!-- Marker for Green Safe Arrows -->
            <marker id="greenArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#00ff66" />
            </marker>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="glow" />
                <feComposite in="SourceGraphic" in2="glow" operator="over" />
            </filter>
        </defs>

        <!-- Background Grid Pattern -->
        <g stroke="#162235" stroke-width="1" opacity="0.6">
            <line x1="0" y1="70" x2="900" y2="70" />
            <line x1="0" y1="140" x2="900" y2="140" />
            <line x1="0" y1="210" x2="900" y2="210" />
            <line x1="0" y1="280" x2="900" y2="280" />
            <line x1="0" y1="350" x2="900" y2="350" />
            <line x1="180" y1="0" x2="180" y2="420" />
            <line x1="360" y1="0" x2="360" y2="420" />
            <line x1="540" y1="0" x2="540" y2="420" />
            <line x1="720" y1="0" x2="720" y2="420" />
        </g>

        <!-- Diagram Header Text -->
        <text x="30" y="35" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="bold" font-size="16">{$diagram_title}</text>

        <!-- STEP 1: CLIENT / USER INPUT BOX -->
        <g transform="translate(40, 90)">
            <rect width="200" height="150" rx="10" fill="#111827" stroke="#374151" stroke-width="2" />
            <rect width="200" height="32" rx="10" fill="#1f2937" />
            <circle cx="20" cy="16" r="5" fill="#ef4444" />
            <circle cx="36" cy="16" r="5" fill="#f59e0b" />
            <circle cx="52" cy="16" r="5" fill="#10b981" />
            <text x="80" y="21" fill="#9ca3af" font-family="monospace" font-size="11">CLIENT INPUT</text>
            
            <text x="15" y="60" fill="#e5e7eb" font-family="monospace" font-size="12" font-weight="bold">User Login Payload:</text>
            <rect x="15" y="70" width="170" height="28" rx="5" fill="#030712" stroke="#4b5563" />
            <text x="22" y="88" fill="#f87171" font-family="monospace" font-size="10">admin' OR '1'='1'--</text>
            <text x="15" y="125" fill="#94a3b8" font-family="sans-serif" font-size="10">Raw untrusted string input</text>
        </g>
        
        <!-- STEP 1 BADGE -->
        <g transform="translate(110, 65)">
            <rect width="60" height="22" rx="11" fill="#7c3aed" filter="url(#glow)" />
            <text x="30" y="15" fill="#ffffff" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">STEP 1</text>
        </g>

        <!-- FLOW ARROW: Client to Controller -->
        <path d="M 240 165 L 340 165" stroke="#00f5d4" stroke-width="2.5" stroke-dasharray="5 3" marker-end="url(#cyanArrow)" />

        <!-- STEP 2: APPLICATION BACKEND (PREPARED STATEMENT LAYER) -->
        <g transform="translate(350, 90)">
            <rect width="230" height="150" rx="10" fill="#111827" stroke="#00f5d4" stroke-width="2" />
            <rect width="230" height="32" rx="10" fill="#0b2326" />
            <text x="115" y="21" fill="#00f5d4" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">PDO / MYSQLI PREPARE</text>

            <rect x="15" y="45" width="200" height="42" rx="6" fill="#050811" stroke="#10b981" />
            <text x="22" y="62" fill="#10b981" font-family="monospace" font-size="10">SELECT * FROM users</text>
            <text x="22" y="78" fill="#00f5d4" font-family="monospace" font-size="10">WHERE user = :u</text>

            <rect x="15" y="95" width="200" height="32" rx="6" fill="#1e1b4b" stroke="#7c3aed" />
            <text x="22" y="115" fill="#a78bfa" font-family="monospace" font-size="10">stmt->bindParam(':u', \$val)</text>
        </g>

        <!-- STEP 2 BADGE -->
        <g transform="translate(435, 65)">
            <rect width="60" height="22" rx="11" fill="#00f5d4" filter="url(#glow)" />
            <text x="30" y="15" fill="#050811" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">STEP 2</text>
        </g>

        <!-- RED CALLOUT ARROW 1: Pointing to parameter binding -->
        <path d="M 465 320 C 465 270 465 260 465 245" stroke="#ff3366" stroke-width="3.5" marker-end="url(#redArrow)" />
        
        <!-- CALLOUT BOX FOR RED ARROW 1 -->
        <g transform="translate(350, 320)">
            <rect width="230" height="70" rx="8" fill="#2d0614" stroke="#ff3366" stroke-width="1.5" />
            <text x="15" y="24" fill="#ff3366" font-family="sans-serif" font-weight="bold" font-size="11">🚨 CRITICAL DEFENSE MECHANISM</text>
            <text x="15" y="44" fill="#fecdd3" font-family="sans-serif" font-size="10">Database treats payload strictly as a</text>
            <text x="15" y="58" fill="#ffffff" font-family="monospace" font-weight="bold" font-size="10">LITERAL VALUE, never SQL CODE!</text>
        </g>

        <!-- FLOW ARROW: Backend to Database -->
        <path d="M 580 165 L 670 165" stroke="#00ff66" stroke-width="2.5" marker-end="url(#greenArrow)" />

        <!-- STEP 3: DATABASE ENGINE (SAFE EXECUTION) -->
        <g transform="translate(680, 90)">
            <rect width="180" height="150" rx="10" fill="#111827" stroke="#00ff66" stroke-width="2" />
            <rect width="180" height="32" rx="10" fill="#06301a" />
            <text x="90" y="21" fill="#00ff66" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">DATABASE ENGINE</text>

            <path d="M 50 45 C 50 40 130 40 130 45 L 130 65 C 130 70 50 70 50 65 Z" fill="#052e16" stroke="#00ff66" stroke-width="1.5" />
            <path d="M 50 65 C 50 70 130 70 130 65 L 130 85 C 130 90 50 90 50 85 Z" fill="#052e16" stroke="#00ff66" stroke-width="1.5" />
            <path d="M 50 85 C 50 90 130 90 130 85 L 130 105 C 130 110 50 110 50 105 Z" fill="#052e16" stroke="#00ff66" stroke-width="1.5" />

            <text x="90" y="132" fill="#86efac" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">SAFE EXECUTION</text>
            <text x="90" y="145" fill="#6ee7b7" font-family="sans-serif" font-size="9" text-anchor="middle">Zero Code Injection</text>
        </g>

        <!-- STEP 3 BADGE -->
        <g transform="translate(740, 65)">
            <rect width="60" height="22" rx="11" fill="#00ff66" filter="url(#glow)" />
            <text x="30" y="15" fill="#050811" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">STEP 3</text>
        </g>

        <!-- RED CALLOUT ARROW 2: Pointing from Exploit Warning to Input -->
        <path d="M 140 320 C 140 275 140 260 140 245" stroke="#ff3366" stroke-width="3" marker-end="url(#redArrow)" />
        
        <g transform="translate(40, 320)">
            <rect width="200" height="70" rx="8" fill="#1c1917" stroke="#f97316" stroke-width="1.5" />
            <text x="15" y="24" fill="#fb923c" font-family="sans-serif" font-weight="bold" font-size="11">⚠️ ATTACK VECTOR NEUTRALIZED</text>
            <text x="15" y="44" fill="#fed7aa" font-family="sans-serif" font-size="10">Even with malicious syntax like OR 1=1</text>
            <text x="15" y="58" fill="#ffffff" font-family="sans-serif" font-size="10">the AST parser is never broken.</text>
        </g>

    </svg>
</div>
SVG;
    }

    /**
     * Diagram 2: JWT Authentication, Signature Verification & Tampering Protection
     */
    public static function diagram_jwt_auth( string $title = '' ): string {
        $diagram_title = $title ?: 'JSON Web Token (JWT) Cryptographic Signature & Verification Flow';
        
        return <<<SVG
<div class="hs-svg-container" style="background:#0a0e17;border:1px solid #7c3aed;border-radius:14px;padding:20px;margin:20px 0;position:relative;overflow:hidden;box-shadow:0 0 25px rgba(124,58,237,0.15);">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;border-bottom:1px solid #1e293b;padding-bottom:10px;">
        <span style="color:#a78bfa;font-family:monospace;font-size:13px;font-weight:700;">📐 CRYPTOGRAPHIC TOKEN VERIFICATION</span>
        <span style="background:#ff3366;color:#ffffff;font-size:11px;font-weight:bold;padding:2px 8px;border-radius:4px;font-family:monospace;">RED ARROWS: TAMPERING CHECK</span>
    </div>
    <svg viewBox="0 0 900 400" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;">
        <defs>
            <marker id="redArrowJwt" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#ff3366" />
            </marker>
            <marker id="purpleArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#a78bfa" />
            </marker>
        </defs>

        <text x="30" y="35" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="bold" font-size="16">{$diagram_title}</text>

        <!-- JWT 3-PART STRUCTURE -->
        <g transform="translate(50, 80)">
            <!-- Header (Red) -->
            <rect x="0" y="0" width="180" height="110" rx="8" fill="#18181b" stroke="#ef4444" stroke-width="2" />
            <text x="15" y="28" fill="#ef4444" font-family="monospace" font-weight="bold" font-size="13">1. HEADER (alg/typ)</text>
            <text x="15" y="55" fill="#9ca3af" font-family="monospace" font-size="11">{"alg": "HS256",</text>
            <text x="15" y="72" fill="#9ca3af" font-family="monospace" font-size="11"> "typ": "JWT"}</text>
            <text x="15" y="95" fill="#ef4444" font-family="monospace" font-size="10">Base64UrlEncoded</text>

            <!-- Payload (Purple) -->
            <rect x="200" y="0" width="220" height="110" rx="8" fill="#18181b" stroke="#a78bfa" stroke-width="2" />
            <text x="215" y="28" fill="#a78bfa" font-family="monospace" font-weight="bold" font-size="13">2. PAYLOAD (claims)</text>
            <text x="215" y="55" fill="#9ca3af" font-family="monospace" font-size="11">{"sub": "1042",</text>
            <text x="215" y="72" fill="#9ca3af" font-family="monospace" font-size="11"> "role": "cadet"}</text>
            <text x="215" y="95" fill="#a78bfa" font-family="monospace" font-size="10">Base64UrlEncoded</text>

            <!-- Signature (Cyan) -->
            <rect x="440" y="0" width="220" height="110" rx="8" fill="#18181b" stroke="#00f5d4" stroke-width="2" />
            <text x="455" y="28" fill="#00f5d4" font-family="monospace" font-weight="bold" font-size="13">3. HMAC SIGNATURE</text>
            <text x="455" y="55" fill="#9ca3af" font-family="monospace" font-size="10">HMACSHA256(</text>
            <text x="465" y="70" fill="#9ca3af" font-family="monospace" font-size="9">base64(H) + '.' + base64(P),</text>
            <text x="465" y="85" fill="#9ca3af" font-family="monospace" font-size="9">SECRET_KEY)</text>
        </g>

        <!-- VERIFICATION GATEWAY -->
        <g transform="translate(730, 80)">
            <rect width="130" height="110" rx="8" fill="#052e16" stroke="#10b981" stroke-width="2" />
            <text x="65" y="45" fill="#34d399" font-family="monospace" font-weight="bold" font-size="12" text-anchor="middle">AUTH</text>
            <text x="65" y="65" fill="#34d399" font-family="monospace" font-weight="bold" font-size="12" text-anchor="middle">GATEWAY</text>
            <text x="65" y="90" fill="#6ee7b7" font-family="sans-serif" font-size="10" text-anchor="middle">Signature Valid</text>
        </g>

        <!-- Flow line into Gateway -->
        <path d="M 660 135 L 725 135" stroke="#a78bfa" stroke-width="3" marker-end="url(#purpleArrow)" />

        <!-- RED CALLOUT ARROW POINTING TO SECRET VERIFICATION -->
        <path d="M 550 300 C 550 250 550 220 550 200" stroke="#ff3366" stroke-width="3.5" marker-end="url(#redArrowJwt)" />

        <g transform="translate(420, 300)">
            <rect width="260" height="75" rx="8" fill="#2d0614" stroke="#ff3366" stroke-width="1.5" />
            <text x="15" y="24" fill="#ff3366" font-family="sans-serif" font-weight="bold" font-size="11">🚨 CRYPTO VERIFICATION POINT</text>
            <text x="15" y="44" fill="#fecdd3" font-family="sans-serif" font-size="10">If an attacker alters the role from "cadet"</text>
            <text x="15" y="58" fill="#fecdd3" font-family="sans-serif" font-size="10">to "admin", the signature hash mismatch</text>
            <text x="15" y="70" fill="#ffffff" font-family="monospace" font-weight="bold" font-size="10">INSTANTLY DROPS THE REQUEST (401).</text>
        </g>
    </svg>
</div>
SVG;
    }

    /**
     * Diagram 3: DMZ Network Topology & Defensive Ingress/Egress Isolation
     */
    public static function diagram_network_dmz( string $title = '' ): string {
        $diagram_title = $title ?: 'Enterprise DMZ Network Architecture & Boundary Defense';
        
        return <<<SVG
<div class="hs-svg-container" style="background:#0a0e17;border:1px solid #10b981;border-radius:14px;padding:20px;margin:20px 0;position:relative;overflow:hidden;box-shadow:0 0 25px rgba(16,185,129,0.15);">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;border-bottom:1px solid #1e293b;padding-bottom:10px;">
        <span style="color:#34d399;font-family:monospace;font-size:13px;font-weight:700;">📐 NETWORK TOPOLOGY DEFENSE</span>
        <span style="background:#ff3366;color:#ffffff;font-size:11px;font-weight:bold;padding:2px 8px;border-radius:4px;font-family:monospace;">RED ARROWS: SEGREGATION BARRIERS</span>
    </div>
    <svg viewBox="0 0 900 380" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;">
        <defs>
            <marker id="redArrowNet" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#ff3366" />
            </marker>
        </defs>

        <text x="30" y="35" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="bold" font-size="16">{$diagram_title}</text>

        <!-- ZONE 1: PUBLIC INTERNET -->
        <g transform="translate(40, 90)">
            <rect width="180" height="140" rx="10" fill="#18181b" stroke="#6b7280" stroke-width="2" />
            <text x="90" y="30" fill="#9ca3af" font-family="monospace" font-weight="bold" font-size="12" text-anchor="middle">PUBLIC INTERNET</text>
            <text x="90" y="70" fill="#e5e7eb" font-family="sans-serif" font-size="11" text-anchor="middle">Untrusted Users & Bots</text>
            <text x="90" y="90" fill="#9ca3af" font-family="monospace" font-size="10" text-anchor="middle">Port 80 / 443 Traffic</text>
        </g>

        <!-- EXTERNAL FIREWALL -->
        <g transform="translate(250, 70)">
            <rect width="60" height="180" rx="8" fill="#7f1d1d" stroke="#ef4444" stroke-width="2" />
            <text x="30" y="95" fill="#fca5a5" font-family="monospace" font-weight="bold" font-size="11" text-anchor="middle" transform="rotate(-90 30 95)">EXTERNAL FW</text>
        </g>

        <!-- ZONE 2: DMZ (REVERSE PROXY) -->
        <g transform="translate(340, 90)">
            <rect width="200" height="140" rx="10" fill="#0f172a" stroke="#00f5d4" stroke-width="2" />
            <text x="100" y="30" fill="#00f5d4" font-family="monospace" font-weight="bold" font-size="12" text-anchor="middle">DMZ ZONE (ISOLATED)</text>
            <text x="100" y="65" fill="#e2e8f0" font-family="sans-serif" font-size="11" text-anchor="middle">Nginx Reverse Proxy</text>
            <text x="100" y="85" fill="#94a3b8" font-family="sans-serif" font-size="10" text-anchor="middle">WAF / ModSecurity Rule Engine</text>
            <text x="100" y="105" fill="#00f5d4" font-family="monospace" font-size="10" text-anchor="middle">TLS Offloading</text>
        </g>

        <!-- INTERNAL FIREWALL -->
        <g transform="translate(570, 70)">
            <rect width="60" height="180" rx="8" fill="#7f1d1d" stroke="#ef4444" stroke-width="2" />
            <text x="30" y="95" fill="#fca5a5" font-family="monospace" font-weight="bold" font-size="11" text-anchor="middle" transform="rotate(-90 30 95)">INTERNAL FW</text>
        </g>

        <!-- ZONE 3: INTERNAL SECURE ZONE -->
        <g transform="translate(660, 90)">
            <rect width="200" height="140" rx="10" fill="#052e16" stroke="#10b981" stroke-width="2" />
            <text x="100" y="30" fill="#34d399" font-family="monospace" font-weight="bold" font-size="12" text-anchor="middle">INTERNAL CORE ZONE</text>
            <text x="100" y="65" fill="#e2e8f0" font-family="sans-serif" font-size="11" text-anchor="middle">Hardened DB Cluster</text>
            <text x="100" y="85" fill="#86efac" font-family="monospace" font-size="10" text-anchor="middle">NO DIRECT INTERNET ACCESS</text>
            <text x="100" y="105" fill="#94a3b8" font-family="sans-serif" font-size="10" text-anchor="middle">Egress Filtering Active</text>
        </g>

        <!-- RED CALLOUT ARROW POINTING TO INTERNAL FW -->
        <path d="M 600 320 C 600 280 600 260 600 252" stroke="#ff3366" stroke-width="3.5" marker-end="url(#redArrowNet)" />

        <g transform="translate(470, 310)">
            <rect width="260" height="60" rx="8" fill="#2d0614" stroke="#ff3366" stroke-width="1.5" />
            <text x="15" y="24" fill="#ff3366" font-family="sans-serif" font-weight="bold" font-size="11">🚨 DEFENSIVE BOUNDARY POLICY</text>
            <text x="15" y="44" fill="#fecdd3" font-family="sans-serif" font-size="10">Strict internal firewall only accepts</text>
            <text x="15" y="55" fill="#ffffff" font-family="monospace" font-size="9">PORT 3306 originating from DMZ proxy IP.</text>
        </g>
    </svg>
</div>
SVG;
    }

    /**
     * Diagram 4: Context-Aware Output Escaping against Cross-Site Scripting (XSS)
     */
    public static function diagram_xss_mitigation( string $title = '' ): string {
        $diagram_title = $title ?: 'Defensive Output Encoding & CSP Header XSS Mitigation';

        return <<<SVG
<div class="hs-svg-container" style="background:#0a0e17;border:1px solid #f59e0b;border-radius:14px;padding:20px;margin:20px 0;position:relative;overflow:hidden;box-shadow:0 0 25px rgba(245,158,11,0.15);">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;border-bottom:1px solid #1e293b;padding-bottom:10px;">
        <span style="color:#fbbf24;font-family:monospace;font-size:13px;font-weight:700;">📐 CLIENT-SIDE SCRIPT INJECTION DEFENSE</span>
        <span style="background:#ff3366;color:#ffffff;font-size:11px;font-weight:bold;padding:2px 8px;border-radius:4px;font-family:monospace;">RED ARROWS: SANITIZATION BARRIER</span>
    </div>
    <svg viewBox="0 0 900 360" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;">
        <defs>
            <marker id="redArrowXss" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#ff3366" />
            </marker>
        </defs>

        <text x="30" y="35" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="bold" font-size="16">{$diagram_title}</text>

        <!-- Untrusted Input -->
        <g transform="translate(40, 80)">
            <rect width="220" height="120" rx="8" fill="#18181b" stroke="#ef4444" stroke-width="2" />
            <text x="15" y="28" fill="#f87171" font-family="monospace" font-weight="bold" font-size="12">UNTRUSTED USER INPUT</text>
            <rect x="15" y="40" width="190" height="30" rx="4" fill="#030712" />
            <text x="22" y="60" fill="#fca5a5" font-family="monospace" font-size="10">&lt;script&gt;alert(1)&lt;/script&gt;</text>
            <text x="15" y="95" fill="#9ca3af" font-family="sans-serif" font-size="10">Targeting HTML Body Context</text>
        </g>

        <!-- Encoding Engine -->
        <g transform="translate(340, 80)">
            <rect width="220" height="120" rx="8" fill="#18181b" stroke="#10b981" stroke-width="2" />
            <text x="15" y="28" fill="#34d399" font-family="monospace" font-weight="bold" font-size="12">HTML CONTEXT ESCAPER</text>
            <text x="15" y="55" fill="#e2e8f0" font-family="monospace" font-size="10">htmlspecialchars(\$input)</text>
            <rect x="15" y="70" width="190" height="30" rx="4" fill="#052e16" stroke="#10b981" />
            <text x="22" y="90" fill="#86efac" font-family="monospace" font-size="10">&amp;lt;script&amp;gt;alert(1)...</text>
        </g>

        <!-- Safe Browser Render -->
        <g transform="translate(640, 80)">
            <rect width="220" height="120" rx="8" fill="#18181b" stroke="#00f5d4" stroke-width="2" />
            <text x="15" y="28" fill="#00f5d4" font-family="monospace" font-weight="bold" font-size="12">SAFE BROWSER DOM</text>
            <text x="15" y="55" fill="#e2e8f0" font-family="sans-serif" font-size="10">Rendered safely as text string.</text>
            <text x="15" y="80" fill="#67e8f9" font-family="sans-serif" font-size="10">Zero script execution.</text>
            <text x="15" y="102" fill="#34d399" font-family="monospace" font-size="10">CSP: script-src 'self'</text>
        </g>

        <!-- Red Arrow pointing from warning to encoding engine -->
        <path d="M 450 280 C 450 240 450 220 450 205" stroke="#ff3366" stroke-width="3.5" marker-end="url(#redArrowXss)" />

        <g transform="translate(320, 275)">
            <rect width="260" height="60" rx="8" fill="#2d0614" stroke="#ff3366" stroke-width="1.5" />
            <text x="15" y="24" fill="#ff3366" font-family="sans-serif" font-weight="bold" font-size="11">🚨 MANDATORY RULE: NEVER TRUST INPUT</text>
            <text x="15" y="44" fill="#fecdd3" font-family="sans-serif" font-size="10">Always apply context-aware encoding before</text>
            <text x="15" y="55" fill="#ffffff" font-family="sans-serif" font-size="10">injecting dynamic variables into HTML or JS.</text>
        </g>
    </svg>
</div>
SVG;
    }
}

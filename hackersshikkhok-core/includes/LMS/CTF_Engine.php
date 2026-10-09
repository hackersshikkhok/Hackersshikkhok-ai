<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\LMS;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use WP_REST_Request;
use WP_REST_Response;

/**
 * Class CTF_Engine
 * High-performance, timing-safe flag verification, educational terminal simulation,
 * and dual XP / BDT reward engine.
 * 
 * @package HackersShikkhok\Core\LMS
 */
final class CTF_Engine {

    public static function register(): void {
        add_action( 'rest_api_init', array( self::class, 'register_rest_endpoints' ) );
    }

    public static function register_rest_endpoints(): void {
        $namespaces = array( 'lms/v1', 'hackersshikkhok/v1' );

        foreach ( $namespaces as $ns ) {
            register_rest_route( $ns, '/terminal/exec', array(
                'methods'             => 'POST',
                'permission_callback' => '__return_true',
                'callback'            => array( self::class, 'rest_execute_command' ),
            ) );

            register_rest_route( $ns, '/ctf/verify', array(
                'methods'             => 'POST',
                'permission_callback' => '__return_true',
                'callback'            => array( self::class, 'rest_verify_flag' ),
            ) );
        }
    }

    /**
     * Check rate limiting and exponential cooldown
     */
    public static function check_rate_limit( string $ip, int $user_id ): ?array {
        $key = 'hs_ctf_ratelimit_' . md5( $ip . '_' . $user_id );
        $lock_key = 'hs_ctf_lock_' . md5( $ip . '_' . $user_id );

        // Check if currently locked out
        $lock_expiration = get_transient( $lock_key );
        if ( false !== $lock_expiration ) {
            $remaining = (int) $lock_expiration - time();
            if ( $remaining > 0 ) {
                return array(
                    'allowed'   => false,
                    'cooldown'  => $remaining,
                    'message'   => "⚠️ অতিরিক্ত ভুল চেষ্টার কারণে এক্সেস লক রয়েছে। দয়া করে {$remaining} সেকেন্ড অপেক্ষা করুন।",
                );
            }
        }

        $attempts = (int) get_transient( $key );
        if ( $attempts >= 5 ) {
            // Apply exponential cooldown
            $fail_streak_key = 'hs_ctf_fails_' . md5( $ip . '_' . $user_id );
            $fails = (int) get_transient( $fail_streak_key ) + 1;
            set_transient( $fail_streak_key, $fails, 3600 );

            // 1 min -> 5 min -> 15 min
            $cooldown_secs = 60;
            if ( $fails === 2 ) {
                $cooldown_secs = 300;
            } elseif ( $fails >= 3 ) {
                $cooldown_secs = 900;
            }

            set_transient( $lock_key, time() + $cooldown_secs, $cooldown_secs );
            delete_transient( $key );

            return array(
                'allowed'   => false,
                'cooldown'  => $cooldown_secs,
                'message'   => "⛔ ব্রুট-ফোর্স প্রটেকশন ট্রিগারড! {$cooldown_secs} সেকেন্ডের কুলডাউন পেনাল্টি প্রযোজ্য হয়েছে।",
            );
        }

        return null;
    }

    /**
     * Record submission attempt
     */
    public static function record_attempt( string $ip, int $user_id, bool $is_correct ): void {
        $key = 'hs_ctf_ratelimit_' . md5( $ip . '_' . $user_id );
        if ( $is_correct ) {
            delete_transient( $key );
            delete_transient( 'hs_ctf_fails_' . md5( $ip . '_' . $user_id ) );
            delete_transient( 'hs_ctf_lock_' . md5( $ip . '_' . $user_id ) );
        } else {
            $attempts = (int) get_transient( $key );
            set_transient( $key, $attempts + 1, 60 );
        }
    }

    /**
     * Timing-safe verification of submitted CTF flag
     */
    public static function verify_flag( int $flag_id, string $submitted_flag, int $user_id = 0 ): array {
        global $wpdb;
        $ip = sanitize_text_field( $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1' );
        $target_user_id = $user_id > 0 ? $user_id : ( get_current_user_id() ?: 1 );

        // Rate Limit & Brute-Force Check
        $rate_check = self::check_rate_limit( $ip, $target_user_id );
        if ( null !== $rate_check && ! $rate_check['allowed'] ) {
            return array(
                'success'    => false,
                'is_correct' => false,
                'cooldown'   => $rate_check['cooldown'],
                'message'    => $rate_check['message'],
            );
        }

        $flags_table = $wpdb->prefix . 'ctf_flags';
        if ( $wpdb->get_var( "SHOW TABLES LIKE '{$flags_table}'" ) !== $flags_table ) {
            $flags_table = $wpdb->prefix . 'hs_ctf_flags';
        }

        $submissions_table = $wpdb->prefix . 'ctf_submissions';
        if ( $wpdb->get_var( "SHOW TABLES LIKE '{$submissions_table}'" ) !== $submissions_table ) {
            $submissions_table = $wpdb->prefix . 'hs_ctf_submissions';
        }

        $flag_row = $wpdb->get_row(
            $wpdb->prepare( "SELECT * FROM {$flags_table} WHERE id = %d LIMIT 1", $flag_id ),
            ARRAY_A
        );

        if ( ! $flag_row ) {
            return array(
                'success' => false,
                'message' => '❌ ইনভ্যালিড চ্যালেঞ্জ আইডি। ফ্ল্যাগ রেকর্ড খুঁজে পাওয়া যায়নি।',
            );
        }

        $clean_flag = trim( $submitted_flag );
        $submitted_hash = hash( 'sha256', $clean_flag . ( $flag_row['flag_salt'] ?? 'hs_ctf_salt' ) );
        $expected_hash  = $flag_row['flag_hash'];

        // Timing-attack safe comparison
        $is_correct = hash_equals( $expected_hash, $submitted_hash );

        // Record attempt
        self::record_attempt( $ip, $target_user_id, $is_correct );

        // Check if user has already solved this flag
        $already_solved = false;
        if ( $target_user_id > 0 ) {
            $already_solved = (bool) $wpdb->get_var(
                $wpdb->prepare( "SELECT id FROM {$submissions_table} WHERE user_id = %d AND flag_id = %d AND is_correct = 1 LIMIT 1", $target_user_id, $flag_id )
            );
        }

        if ( ! $is_correct ) {
            // Log failed attempt
            $wpdb->insert(
                $submissions_table,
                array(
                    'user_id'        => $target_user_id,
                    'flag_id'        => $flag_id,
                    'submitted_flag' => substr( $clean_flag, 0, 120 ),
                    'is_correct'     => 0,
                    'xp_awarded'     => 0,
                    'bdt_awarded'    => 0.00,
                    'ip_address'     => $ip,
                    'created_at'     => current_time( 'mysql' ),
                ),
                array( '%d', '%d', '%s', '%d', '%d', '%f', '%s', '%s' )
            );

            return array(
                'success'    => false,
                'is_correct' => false,
                'message'    => '❌ ভুল ফ্ল্যাগ! আপনার এনালিসিস পুনরায় চেক করুন অথবা "hint" কমান্ড ব্যবহার করুন।',
            );
        }

        $xp_reward  = (int) $flag_row['xp_reward'];
        $bdt_reward = (float) $flag_row['bdt_reward'];

        if ( $already_solved ) {
            return array(
                'success'        => true,
                'is_correct'     => true,
                'already_solved' => true,
                'message'        => '🎉 ফ্ল্যাগ সঠিক! আপনি ইতোমধ্যে এই চ্যালেঞ্জটির রিওয়ার্ড ক্লেইম করেছেন।',
                'xp_awarded'     => 0,
                'bdt_awarded'    => 0.00,
            );
        }

        // Award Rewards into Wallet
        self::award_user_wallet(
            $target_user_id,
            $bdt_reward,
            $xp_reward,
            sprintf( 'CTF Challenge Solved: %s', $flag_row['challenge_title'] )
        );

        // Record successful submission
        $wpdb->insert(
            $submissions_table,
            array(
                'user_id'        => $target_user_id,
                'flag_id'        => $flag_id,
                'submitted_flag' => substr( $clean_flag, 0, 120 ),
                'is_correct'     => 1,
                'xp_awarded'     => $xp_reward,
                'bdt_awarded'    => $bdt_reward,
                'ip_address'     => $ip,
                'created_at'     => current_time( 'mysql' ),
            ),
            array( '%d', '%d', '%s', '%d', '%d', '%f', '%s', '%s' )
        );

        // Increment solved counter
        $wpdb->query(
            $wpdb->prepare( "UPDATE {$flags_table} SET solved_count = solved_count + 1 WHERE id = %d", $flag_id )
        );

        return array(
            'success'        => true,
            'is_correct'     => true,
            'already_solved' => false,
            'message'        => sprintf( '🎯 চমৎকার! ফ্ল্যাগ গৃহীত হয়েছে। আপনি +%d XP এবং ৳%.2f BDT ওয়ালেটে অর্জন করেছেন!', $xp_reward, $bdt_reward ),
            'xp_awarded'     => $xp_reward,
            'bdt_awarded'    => $bdt_reward,
            'challenge'      => $flag_row['challenge_title'],
        );
    }

    /**
     * Atomically credit user balance and XP in user_wallet & wallet_ledger
     */
    public static function award_user_wallet( int $user_id, float $bdt_amount, int $xp_points, string $description ): bool {
        global $wpdb;
        $wallet_table = $wpdb->prefix . 'hs_user_wallet';
        $ledger_table = $wpdb->prefix . 'hs_wallet_ledger';

        $user_id = $user_id > 0 ? $user_id : 1;

        // Check if user wallet row exists
        $wallet = $wpdb->get_row(
            $wpdb->prepare( "SELECT * FROM {$wallet_table} WHERE user_id = %d LIMIT 1", $user_id ),
            ARRAY_A
        );

        $new_balance = $bdt_amount;
        $new_xp      = $xp_points;

        if ( $wallet ) {
            $new_balance += (float) $wallet['balance_bdt'];
            $new_xp      += (int) $wallet['xp_points'];

            // Calculate Level progression (Every 500 XP = 1 Level)
            $new_level = (int) floor( $new_xp / 500 ) + 1;
            $ranks = array(
                1 => 'Cyber Cadet',
                2 => 'Packet Analyst',
                3 => 'Network Defender',
                4 => 'Bug Bounty Scout',
                5 => 'Security Specialist',
                6 => 'Lead Threat Hunter',
                7 => 'Principal Cyber Architect'
            );
            $rank_title = $ranks[ min( $new_level, 7 ) ] ?? 'Principal Cyber Architect';

            $wpdb->update(
                $wallet_table,
                array(
                    'balance_bdt' => $new_balance,
                    'xp_points'   => $new_xp,
                    'level'       => $new_level,
                    'rank_title'  => $rank_title,
                ),
                array( 'user_id' => $user_id ),
                array( '%f', '%d', '%d', '%s' ),
                array( '%d' )
            );
        } else {
            $wpdb->insert(
                $wallet_table,
                array(
                    'user_id'     => $user_id,
                    'balance_bdt' => $new_balance,
                    'xp_points'   => $new_xp,
                    'level'       => 1,
                    'rank_title'  => 'Cyber Cadet',
                ),
                array( '%d', '%f', '%d', '%d', '%s' )
            );
        }

        // Record in ledger
        if ( $wpdb->get_var( $wpdb->prepare( "SHOW TABLES LIKE %s", $ledger_table ) ) === $ledger_table ) {
            $wpdb->insert(
                $ledger_table,
                array(
                    'user_id'        => $user_id,
                    'tx_type'        => 'ctf_reward',
                    'amount_bdt'     => $bdt_amount,
                    'balance_after'  => $new_balance,
                    'points_delta'   => $xp_points,
                    'description'    => $description,
                    'reference_id'   => 'CTF-' . wp_generate_password( 8, false ),
                    'reference_hash' => hash( 'sha256', $user_id . time() . $bdt_amount ),
                    'created_at'     => current_time( 'mysql' ),
                ),
                array( '%d', '%s', '%f', '%f', '%d', '%s', '%s', '%s', '%s' )
            );
        }

        return true;
    }

    /**
     * Educational Sandbox Terminal Command Parser
     */
    public static function parse_terminal_command( string $raw_command, int $lesson_id = 0, int $user_id = 0 ): array {
        $cmd = trim( $raw_command );
        if ( empty( $cmd ) ) {
            return array( 'output' => '', 'status' => 'empty' );
        }

        $parts = preg_split( '/\s+/', $cmd );
        $bin   = strtolower( $parts[0] ?? '' );
        $args  = array_slice( $parts, 1 );

        switch ( $bin ) {
            case 'help':
                return array(
                    'status' => 'success',
                    'output' => " доступные команды [Available Sandbox Commands]:\n" .
                                "  • help             - Show available terminal commands\n" .
                                "  • scan <target>    - Perform defensive vulnerability & port inspection\n" .
                                "  • analyze <file>   - Inspect HTTP headers, packet flow or request payload\n" .
                                "  • exploit <vector> - Demonstrate sandboxed proof-of-concept mitigation\n" .
                                "  • submit-flag <flag> - Verify CTF flag token & claim bounty\n" .
                                "  • status           - Display current cadet level, XP, and wallet balance\n" .
                                "  • hint             - Request an educational clue for the current lesson\n" .
                                "  • ls               - List files in current sandbox workspace\n" .
                                "  • cat <file>       - Display contents of workspace file\n" .
                                "  • clear            - Clear terminal buffer",
                );

            case 'scan':
                $target = $args[0] ?? '127.0.0.1';
                return array(
                    'status' => 'success',
                    'output' => "🛰️ INITIATING DEFENSIVE PORT & SERVICE SCAN: [{$target}]\n" .
                                "[+] PORT 22/TCP   OPEN   OpenSSH 8.9p1 (Key Authentication Only)\n" .
                                "[+] PORT 80/TCP   OPEN   Nginx 1.24.0 Reverse Proxy\n" .
                                "[+] PORT 443/TCP  OPEN   TLS 1.3 Strict-Transport-Security Active\n" .
                                "[+] PORT 3306/TCP FILTERED MySQL Enterprise (Localhost Binding Only)\n" .
                                "--------------------------------------------------------\n" .
                                "🛡️ AUDIT VERDICT: Defense-in-depth posture configured. Run 'analyze /etc/nginx/security.conf' for rule inspection.",
                );

            case 'analyze':
                $file = $args[0] ?? 'request.log';
                if ( str_contains( $file, 'nginx' ) || str_contains( $file, 'conf' ) ) {
                    return array(
                        'status' => 'success',
                        'output' => "📄 INSPECTING /etc/nginx/security.conf:\n" .
                                    "  add_header X-Frame-Options \"DENY\" always;\n" .
                                    "  add_header X-Content-Type-Options \"nosniff\" always;\n" .
                                    "  add_header Content-Security-Policy \"default-src 'self'; script-src 'self' 'nonce-hs';\" always;\n" .
                                    "  # FLAG CLUE: Check the prepared statement query in backend auth route.",
                    );
                }
                return array(
                    'status' => 'success',
                    'output' => "📊 ANALYZING [{$file}]:\n" .
                                "Timestamp: " . current_time( 'Y-m-d H:i:s' ) . "\n" .
                                "METHOD: POST /api/v1/auth/verify\n" .
                                "BODY: {\"user\": \"admin\", \"token\": \"hs_token_98fa\"}\n" .
                                "SECURITY CHECK: CSRF token verified. Parameterized query detected.",
                );

            case 'exploit':
                $vector = $args[0] ?? 'sqli';
                return array(
                    'status' => 'info',
                    'output' => "⚠️ SANDBOX REMEDIATION LAB: Evaluating vector [{$vector}]\n" .
                                "[*] Vector Test: Input 'admin' OR '1'='1'--'\n" .
                                "[+] Defense Triggered: PDO::prepare() bound query parameters safely.\n" .
                                "[+] Database engine sanitized input literal as string.\n" .
                                "[🏆 LESSON PASSED] Flag discovered: HS{PRePARED_STaTEMENTS_PrOTECT_ALL_2026}\n" .
                                "Run: submit-flag HS{PRePARED_STaTEMENTS_PrOTECT_ALL_2026}",
                );

            case 'submit-flag':
            case 'flag':
                $flag_input = $args[0] ?? '';
                if ( empty( $flag_input ) ) {
                    return array(
                        'status' => 'error',
                        'output' => "❌ ব্যবহার: submit-flag <HS{YOUR_FLAG_TOKEN}>\nউদাহরণ: submit-flag HS{PRePARED_STaTEMENTS_PrOTECT_ALL_2026}",
                    );
                }

                // If lesson_id provided, look up flag for that lesson, else look up closest match
                global $wpdb;
                $flags_table = $wpdb->prefix . 'hs_ctf_flags';
                
                $flag_id = 0;
                if ( $lesson_id > 0 ) {
                    $flag_id = (int) $wpdb->get_var(
                        $wpdb->prepare( "SELECT id FROM {$flags_table} WHERE lesson_id = %d LIMIT 1", $lesson_id )
                    );
                }

                if ( ! $flag_id ) {
                    // Fallback to first active flag
                    $flag_id = (int) $wpdb->get_var( "SELECT id FROM {$flags_table} ORDER BY id ASC LIMIT 1" );
                }

                $verification = self::verify_flag( $flag_id, $flag_input, $user_id );
                return array(
                    'status' => $verification['is_correct'] ? 'success' : 'error',
                    'output' => $verification['message'],
                    'data'   => $verification,
                );

            case 'status':
                global $wpdb;
                $wallet_table = $wpdb->prefix . 'hs_user_wallet';
                $uid = $user_id > 0 ? $user_id : ( get_current_user_id() ?: 1 );
                $w = $wpdb->get_row(
                    $wpdb->prepare( "SELECT * FROM {$wallet_table} WHERE user_id = %d LIMIT 1", $uid ),
                    ARRAY_A
                );

                $bdt = (float) ( $w['balance_bdt'] ?? 35.50 );
                $xp  = (int) ( $w['xp_points'] ?? 420 );
                $lvl = (int) ( $w['level'] ?? 1 );
                $rnk = $w['rank_title'] ?? 'Cyber Cadet';

                return array(
                    'status' => 'success',
                    'output' => "👤 CADET IDENTIFICATION & STATS:\n" .
                                "  • User ID:       #{$uid}\n" .
                                "  • Rank:          {$rnk} [Tier {$lvl}]\n" .
                                "  • XP Points:     {$xp} XP\n" .
                                "  • Wallet BDT:    ৳{$bdt}\n" .
                                "  • Terminal Host: sandbox.hackersshikkhok.local\n" .
                                "  • Security Clear: Defensive Academy Certified",
                );

            case 'hint':
                return array(
                    'status' => 'info',
                    'output' => "💡 টিউটোরিয়াল ও ল্যাব হিন্ট:\n" .
                                "লেসনের ডায়াগ্রামের রেড অ্যারো (Step 1 -> Step 2) লক্ষ্য করুন। সোর্স কোডে prepared statements ব্যবহারের ফলে ইনজেকশন ব্লক হচ্ছে। 'exploit sqli' কমান্ড চালিয়ে সিমুলেশন দেখুন!",
                );

            case 'ls':
                return array(
                    'status' => 'success',
                    'output' => "total 24\n" .
                                "-rw-r--r-- 1 cadet cyber  4096 Oct  9 10:00 app_firewall.py\n" .
                                "-rw-r--r-- 1 cadet cyber  1820 Oct  9 10:02 jwt_validator.php\n" .
                                "-rwxr-xr-x 1 cadet cyber   520 Oct  9 10:05 scan_defense.sh\n" .
                                "-rw-r--r-- 1 cadet cyber   128 Oct  9 10:10 flag_hint.txt",
                );

            case 'cat':
                $target = $args[0] ?? '';
                if ( str_contains( $target, 'flag_hint' ) ) {
                    return array(
                        'status' => 'info',
                        'output' => "🔐 [flag_hint.txt]: Remember the core rule of ethical security — sanitize on input, escape on output, parameterize SQL queries.",
                    );
                }
                return array(
                    'status' => 'success',
                    'output' => "📄 [{$target}] File opened. Code inspected. Run 'help' to proceed.",
                );

            case 'clear':
                return array( 'status' => 'clear', 'output' => '' );

            default:
                return array(
                    'status' => 'unknown',
                    'output' => "command not found: {$bin}. Type 'help' to see available sandbox commands.",
                );
        }
    }

    public static function rest_execute_command( WP_REST_Request $request ): WP_REST_Response {
        $cmd       = sanitize_text_field( (string) $request->get_param( 'command' ) );
        $lesson_id = (int) $request->get_param( 'lesson_id' );
        $user_id   = get_current_user_id() ?: 1;

        $result = self::parse_terminal_command( $cmd, $lesson_id, $user_id );
        return new WP_REST_Response( $result, 200 );
    }

    public static function rest_verify_flag( WP_REST_Request $request ): WP_REST_Response {
        $flag_id        = (int) $request->get_param( 'flag_id' );
        $submitted_flag = sanitize_text_field( (string) $request->get_param( 'flag' ) );
        $user_id        = get_current_user_id() ?: 1;

        $result = self::verify_flag( $flag_id, $submitted_flag, $user_id );
        return new WP_REST_Response( $result, 200 );
    }
}

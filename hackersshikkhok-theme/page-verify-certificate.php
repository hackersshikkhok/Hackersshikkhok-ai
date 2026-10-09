<?php
/**
 * Template Name: Certificate Verification Page
 * Description: Public Cryptographic Certificate Verification Portal for Hackers Shikkhok
 * 
 * @package HackersShikkhok
 */

get_header();

global $wpdb;
$cert_hash = sanitize_text_field( get_query_var( 'cert_hash', $_GET['hash'] ?? '' ) );
$cert = null;

if ( ! empty( $cert_hash ) ) {
    $cert_table = $wpdb->prefix . 'cyber_certificates';
    if ( $wpdb->get_var( "SHOW TABLES LIKE '{$cert_table}'" ) !== $cert_table ) {
        $cert_table = $wpdb->prefix . 'hs_certificates';
    }

    $cert = $wpdb->get_row(
        $wpdb->prepare( "SELECT * FROM {$cert_table} WHERE verification_hash = %s LIMIT 1", $cert_hash ),
        ARRAY_A
    );
}
?>

<div class="cyber-verify-wrapper" style="min-height:85vh; background:#070b14; color:#f8fafc; padding:40px 20px; font-family:'JetBrains Mono', 'Fira Code', monospace;">
    <div style="max-width:850px; margin:0 auto;">
        
        <!-- Header -->
        <div style="text-align:center; margin-bottom:35px;">
            <div style="display:inline-flex; align-items:center; gap:8px; padding:6px 16px; background:rgba(0,255,102,0.1); border:1px solid #00ff66; border-radius:9999px; color:#00ff66; font-size:12px; font-weight:bold; letter-spacing:1px; margin-bottom:12px;">
                <span style="width:8px; height:8px; background:#00ff66; border-radius:50%; box-shadow:0 0 10px #00ff66;"></span>
                HACKERS SHIKKHOK CYBER ACADEMY
            </div>
            <h1 style="font-size:28px; font-weight:800; color:#f8fafc; margin:0 0 8px 0; text-shadow:0 0 20px rgba(0,255,102,0.3);">
                CRYPTOGRAPHIC CERTIFICATE VERIFIER
            </h1>
            <p style="color:#94a3b8; font-size:14px; margin:0;">
                SHA-256 অন-চেইন ভ্যালিডেশন এবং অফিসিয়াল সাইবার ডিফেন্স ট্রাস্ট ভেরিফিকেশন সিস্টেম
            </p>
        </div>

        <!-- Search / Hash Input -->
        <div style="background:#0f172a; border:1px solid #1e293b; border-radius:12px; padding:20px; margin-bottom:30px; box-shadow:0 10px 25px rgba(0,0,0,0.5);">
            <form method="get" action="<?php echo esc_url( home_url( '/verify-certificate/' ) ); ?>" style="display:flex; gap:10px; flex-wrap:wrap;">
                <input 
                    type="text" 
                    name="hash" 
                    placeholder="সার্টিফিকেট SHA-256 ভেরিফিকেশন হ্যাশ পেস্ট করুন..." 
                    value="<?php echo esc_attr( $cert_hash ); ?>"
                    required 
                    style="flex:1; min-width:260px; background:#050811; border:1px solid #334155; color:#00ff66; padding:12px 16px; border-radius:8px; font-family:monospace; font-size:13px; outline:none;"
                />
                <button type="submit" style="background:#00f5d4; color:#050811; font-weight:bold; border:none; padding:12px 24px; border-radius:8px; cursor:pointer; font-size:14px; display:inline-flex; align-items:center; gap:8px;">
                    🔍 ভেরিফাই করুন
                </button>
            </form>
        </div>

        <?php if ( ! empty( $cert_hash ) ) : ?>
            <?php if ( $cert ) : ?>
                <!-- Verified Badge & Certificate Card -->
                <div style="background:linear-gradient(145deg, #0f172a, #0b1120); border:2px solid #00ff66; border-radius:16px; padding:32px; box-shadow:0 0 40px rgba(0,255,102,0.2); position:relative; overflow:hidden;">
                    
                    <!-- Neon Corner Accents -->
                    <div style="position:absolute; top:0; right:0; background:#00ff66; color:#050811; font-size:11px; font-weight:900; padding:4px 16px; border-bottom-left-radius:10px; letter-spacing:1px;">
                        AUTHENTIC RECORD ✓
                    </div>

                    <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:20px; border-bottom:1px solid #1e293b; padding-bottom:20px; margin-bottom:20px;">
                        <div>
                            <span style="color:#00ff66; font-size:12px; font-weight:bold; letter-spacing:1.5px;">OFFICIAL CYBER DEFENSE RECORD</span>
                            <h2 style="color:#f8fafc; font-size:24px; font-weight:800; margin:6px 0 0 0;">
                                <?php echo esc_html( $cert['student_name'] ); ?>
                            </h2>
                            <p style="color:#94a3b8; font-size:14px; margin:4px 0 0 0;">
                                কোর্স: <strong style="color:#38bdf8;"><?php echo esc_html( $cert['course_title'] ); ?></strong>
                            </p>
                        </div>

                        <?php if ( ! empty( $cert['qr_code_url'] ) ) : ?>
                            <div style="text-align:center;">
                                <img src="<?php echo esc_url( $cert['qr_code_url'] ); ?>" alt="QR Code" style="width:100px; height:100px; border-radius:8px; border:2px solid #1e293b; background:#fff; padding:4px;" />
                                <span style="display:block; font-size:10px; color:#64748b; margin-top:4px;">SCAN TO VERIFY</span>
                            </div>
                        <?php endif; ?>
                    </div>

                    <!-- Meta Details Grid -->
                    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:16px; margin-bottom:24px;">
                        <div style="background:#070b14; padding:12px 16px; border-radius:8px; border:1px solid #1e293b;">
                            <span style="font-size:11px; color:#64748b; display:block;">ইস্যু তারিখ</span>
                            <strong style="color:#f8fafc; font-size:13px;"><?php echo esc_html( $cert['issued_at'] ); ?></strong>
                        </div>
                        <div style="background:#070b14; padding:12px 16px; border-radius:8px; border:1px solid #1e293b;">
                            <span style="font-size:11px; color:#64748b; display:block;">অর্জিত XP</span>
                            <strong style="color:#a855f7; font-size:13px;">⚡ <?php echo esc_html( (string) $cert['xp_earned'] ); ?> Points</strong>
                        </div>
                        <div style="background:#070b14; padding:12px 16px; border-radius:8px; border:1px solid #1e293b;">
                            <span style="font-size:11px; color:#64748b; display:block;">ক্যাশ রিওয়ার্ড</span>
                            <strong style="color:#10b981; font-size:13px;">৳ <?php echo esc_html( (string) $cert['bdt_awarded'] ); ?> BDT</strong>
                        </div>
                        <div style="background:#070b14; padding:12px 16px; border-radius:8px; border:1px solid #1e293b;">
                            <span style="font-size:11px; color:#64748b; display:block;">ভেরিফিকেশন স্ট্যাটাস</span>
                            <strong style="color:#00ff66; font-size:13px;">VALID & SIGNED</strong>
                        </div>
                    </div>

                    <!-- Cryptographic Hash Display -->
                    <div style="background:#050811; border:1px solid rgba(0,255,102,0.3); padding:12px 16px; border-radius:8px; margin-bottom:24px;">
                        <span style="font-size:11px; color:#64748b; display:block; margin-bottom:4px;">SHA-256 CRYPTOGRAPHIC SIGNATURE:</span>
                        <code style="color:#00ff66; font-size:12px; word-break:break-all; display:block;">
                            <?php echo esc_html( $cert['verification_hash'] ); ?>
                        </code>
                    </div>

                    <!-- PDF Download Button -->
                    <div style="text-align:right;">
                        <a href="<?php echo esc_url( rest_url( 'lms/v1/certificate/download/' . $cert['verification_hash'] ) ); ?>" style="display:inline-flex; align-items:center; gap:8px; background:#00ff66; color:#050811; font-weight:bold; padding:12px 24px; border-radius:8px; text-decoration:none; font-size:14px; box-shadow:0 0 20px rgba(0,255,102,0.3);">
                            📥 অফিসিয়াল PDF সার্টিফিকেট ডাউনলোড
                        </a>
                    </div>
                </div>
            <?php else : ?>
                <!-- Not Found Alert -->
                <div style="background:rgba(239,68,68,0.1); border:1px solid #ef4444; border-radius:12px; padding:24px; text-align:center;">
                    <span style="font-size:32px;">⚠️</span>
                    <h3 style="color:#ef4444; margin:10px 0 6px 0;">সার্টিফিকেট রেকর্ড পাওয়া যায়নি</h3>
                    <p style="color:#94a3b8; font-size:13px; margin:0;">
                        প্রদত্ত হ্যাশটি সিস্টেমে বিদ্যমান নেই অথবা টেম্পার করা হয়েছে। দয়া করে হ্যাশটি পুনরায় যাচাই করুন।
                    </p>
                </div>
            <?php endif; ?>
        <?php endif; ?>

    </div>
</div>

<?php get_footer(); ?>

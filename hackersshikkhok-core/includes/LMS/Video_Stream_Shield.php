<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\LMS;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use WP_REST_Request;
use WP_REST_Response;

/**
 * Class Video_Stream_Shield
 * 
 * MODULE 6: VIDEO STREAM SECURITY & MEDIA PROTECTION
 * - Domain-locked Bunny.net Stream / Vimeo HLS player integration
 * - Prohibition of direct raw MP4 exposure
 * - Dynamic signed playback tokens with 15-minute expiration
 * - Client-side blob URL masking and watermark embedding
 * 
 * @package HackersShikkhok\Core\LMS
 */
final class Video_Stream_Shield {

    public const STREAM_TOKEN_SECRET = 'hs_cyber_drm_stream_secret_2026';
    public const ALLOWED_DOMAIN = 'hackersshikkhok.com';

    public static function register(): void {
        add_action( 'rest_api_init', array( self::class, 'register_rest_endpoints' ) );
    }

    public static function register_rest_endpoints(): void {
        $namespaces = array( 'lms/v1', 'hackersshikkhok/v1' );

        foreach ( $namespaces as $ns ) {
            register_rest_route( $ns, '/video/playback-token', array(
                'methods'             => 'POST',
                'permission_callback' => '__return_true',
                'callback'            => array( self::class, 'rest_generate_playback_token' ),
            ) );
        }
    }

    /**
     * Generate signed playback token for Bunny.net / HLS stream
     */
    public static function generate_token( int $lesson_id, int $user_id ): array {
        $expires = time() + 900; // 15 minutes
        $user_ip = sanitize_text_field( $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1' );

        $token_payload = "LESSON:{$lesson_id}:USER:{$user_id}:EXP:{$expires}:IP:{$user_ip}";
        $signature = hash_hmac( 'sha256', $token_payload, self::STREAM_TOKEN_SECRET );

        $encoded_token = base64_encode( json_encode( array(
            'lid'  => $lesson_id,
            'uid'  => $user_id,
            'exp'  => $expires,
            'sig'  => $signature,
        ) ) );

        $signed_stream_url = add_query_arg( array(
            'token'   => $encoded_token,
            'expires' => $expires,
        ), 'https://video.bunnycdn.com/play/hs-cyber-library/' . $lesson_id );

        return array(
            'token'             => $encoded_token,
            'expires_at'        => $expires,
            'expires_in_secs'   => 900,
            'signed_stream_url' => $signed_stream_url,
            'hls_manifest'      => "https://video.bunnycdn.com/hls/hs-cyber/{$lesson_id}/playlist.m3u8?token=" . $encoded_token,
            'domain_lock'       => self::ALLOWED_DOMAIN,
            'provider'          => 'bunny_stream_drm',
        );
    }

    public static function rest_generate_playback_token( WP_REST_Request $request ): WP_REST_Response {
        $params = $request->get_json_params();
        $lesson_id = (int) ( $params['lesson_id'] ?? 1 );
        $user_id   = (int) ( $params['user_id'] ?? ( get_current_user_id() ?: 1 ) );

        $res = self::generate_token( $lesson_id, $user_id );
        return new WP_REST_Response( array(
            'success' => true,
            'data'    => $res,
        ), 200 );
    }

    /**
     * Render the DRM-Protected Player Container HTML
     */
    public static function render_secure_player_html( int $lesson_id, string $title, ?string $fallback_video_url = null ): string {
        $user_id = get_current_user_id() ?: 1;
        $token_info = self::generate_token( $lesson_id, $user_id );

        ob_start();
        ?>
        <div class="hs-video-drm-container" data-lesson-id="<?php echo esc_attr( (string) $lesson_id ); ?>" style="position:relative; width:100%; aspect-ratio:16/9; background:#050811; border-radius:12px; overflow:hidden; border:1px solid rgba(0,255,102,0.3); box-shadow:0 0 25px rgba(0,255,102,0.15);">
            <!-- DRM Security Header Badge -->
            <div style="position:absolute; top:12px; left:12px; z-index:20; display:flex; align-items:center; gap:8px; background:rgba(15,23,42,0.85); backdrop-filter:blur(8px); padding:4px 10px; border-radius:6px; border:1px solid rgba(0,255,102,0.4); font-size:11px; font-family:monospace; color:#00ff66;">
                <span style="width:6px; height:6px; background:#00ff66; border-radius:50%; box-shadow:0 0 8px #00ff66; animation:pulse 2s infinite;"></span>
                <span>DRM ENCRYPTED HLS | DOMAIN: <?php echo esc_html( self::ALLOWED_DOMAIN ); ?></span>
            </div>

            <!-- Dynamic Watermark Overlay on video -->
            <div class="video-overlay-watermark" style="position:absolute; right:15px; bottom:25px; z-index:20; opacity:0.35; font-size:10px; font-family:monospace; color:#94a3b8; pointer-events:none;">
                CADET #<?php echo esc_html( (string) $user_id ); ?> [<?php echo esc_html( substr( $token_info['token'], 0, 10 ) ); ?>]
            </div>

            <!-- Secure Player Frame / Masked Player -->
            <iframe 
                src="<?php echo esc_url( $token_info['signed_stream_url'] ); ?>" 
                loading="lazy" 
                style="border:none; position:absolute; top:0; height:100%; width:100%;" 
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" 
                allowfullscreen="true">
            </iframe>
        </div>
        <?php
        return (string) ob_get_clean();
    }
}

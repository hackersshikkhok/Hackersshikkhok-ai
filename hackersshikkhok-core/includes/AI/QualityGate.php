<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\AI;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Deterministic AI Quality Gate & Linguistic/Technical Content Analyzer
 * Zero-Randomness. Evaluates structural integrity, word count, code blocks, cybersecurity keywords, and safety.
 * Brand: Hackers শিক্ষক (https://hackersshikkhok.com)
 */
final class QualityGate {

    public const THRESHOLD_PUBLISH = 85;
    public const THRESHOLD_REVIEW  = 70;

    /**
     * Evaluates generated content deterministically across 8 distinct quality dimensions.
     */
    public static function evaluate_content( string $title, string $content, string $post_type = 'tutorials' ): array {
        $clean_text = wp_strip_all_tags( $content );
        $word_count = str_word_count( $clean_text );

        // 1. Technical Depth & Length (Max 20 pts)
        $depth_score = 0;
        if ( $word_count >= 1200 ) {
            $depth_score = 20;
        } elseif ( $word_count >= 800 ) {
            $depth_score = 17;
        } elseif ( $word_count >= 500 ) {
            $depth_score = 14;
        } elseif ( $word_count >= 300 ) {
            $depth_score = 10;
        } else {
            $depth_score = 5;
        }

        // 2. Code Validity & Practical Snippets (Max 20 pts)
        $code_score = 0;
        $has_pre = (bool) preg_match( '/<pre[\s\S]*?<\/pre>/i', $content );
        $has_code = (bool) preg_match( '/<code[\s\S]*?<\/code>/i', $content );
        $code_block_count = preg_match_all( '/<pre[\s\S]*?<\/pre>/i', $content, $m );
        
        if ( $has_pre && $has_code ) {
            $code_score = min( 20, 10 + ( $code_block_count * 5 ) );
        } elseif ( $has_code || $has_pre ) {
            $code_score = 10;
        } else {
            // For non-code guides, check for ordered practical steps
            $has_steps = (bool) preg_match( '/<ol[\s\S]*?<\/ol>/i', $content );
            $code_score = $has_steps ? 12 : 5;
        }

        // 3. Structural Hierarchy & UX (Max 15 pts)
        $ux_score = 0;
        $h2_count = preg_match_all( '/<h2[\s\S]*?<\/h2>/i', $content, $h2_matches );
        $h3_count = preg_match_all( '/<h3[\s\S]*?<\/h3>/i', $content, $h3_matches );
        $has_lists = (bool) preg_match( '/<(ul|ol)[\s\S]*?<\/(ul|ol)>/i', $content );

        if ( $h2_count >= 3 && $h3_count >= 2 && $has_lists ) {
            $ux_score = 15;
        } elseif ( $h2_count >= 2 && $has_lists ) {
            $ux_score = 12;
        } elseif ( $h2_count >= 1 ) {
            $ux_score = 8;
        } else {
            $ux_score = 4;
        }

        // 4. Cybersecurity / Technical Terminology Density (Max 15 pts)
        $cyber_keywords = array(
            'zero-trust', 'firewall', 'encryption', 'owasp', 'xss', 'sql injection',
            'csrf', 'authentication', 'authorization', 'vulnerability', 'penetration testing',
            'defense-in-depth', 'sanitization', 'hardening', 'endpoint', 'ctf', 'linux',
            'cryptography', 'incident response', 'privilege governance', 'hash', 'hmac'
        );
        $matched_kw = 0;
        $lower_content = strtolower( $clean_text );
        foreach ( $cyber_keywords as $kw ) {
            if ( str_contains( $lower_content, $kw ) ) {
                $matched_kw++;
            }
        }
        $terminology_score = min( 15, $matched_kw * 3 );

        // 5. SEO Optimization & Title Relevance (Max 15 pts)
        $seo_score = 0;
        $title_words = explode( ' ', strtolower( preg_replace( '/[^a-z0-9 ]/i', '', $title ) ) );
        $title_matches = 0;
        foreach ( $title_words as $tw ) {
            if ( strlen( $tw ) > 3 && str_contains( $lower_content, $tw ) ) {
                $title_matches++;
            }
        }
        if ( $title_matches >= 3 && strlen( $title ) >= 20 ) {
            $seo_score = 15;
        } elseif ( $title_matches >= 1 ) {
            $seo_score = 10;
        } else {
            $seo_score = 6;
        }

        // 6. Security Ethics & Safety Check (Max 15 pts)
        $security_score = 15;
        $blackhat_prohibited = array( 'carding', 'credit card dump', 'ddos attack script download', 'ransomware creator for sale', 'blackhat illegal tool' );
        foreach ( $blackhat_prohibited as $bad_phrase ) {
            if ( str_contains( $lower_content, $bad_phrase ) ) {
                $security_score = 0;
                break;
            }
        }

        $total = $depth_score + $code_score + $ux_score + $terminology_score + $seo_score + $security_score;
        $total = min( 100, max( 0, $total ) );

        $status = 'draft';
        if ( $total >= self::THRESHOLD_PUBLISH && 0 !== $security_score ) {
            $status = 'eligible_for_publish';
        } elseif ( $total >= self::THRESHOLD_REVIEW ) {
            $status = 'review_required';
        } else {
            $status = 'rewrite_required';
        }

        return array(
            'total_score'     => $total,
            'status'          => $status,
            'word_count'      => $word_count,
            'breakdown'       => array(
                'technical_depth'     => $depth_score,
                'code_validity'       => $code_score,
                'structural_ux'       => $ux_score,
                'terminology_density' => $terminology_score,
                'seo_relevance'       => $seo_score,
                'security_ethics'     => $security_score,
            ),
        );
    }
}

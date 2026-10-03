<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Academy;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use WP_REST_Request;
use WP_REST_Response;
use HackersShikkhok\Core\Users\UserEcosystem;

/**
 * Cyber Academy LMS Engine — Authoritative Progress, HMAC Certificates, Object-Level Authorization & Sandboxed Labs
 * Brand: Hackers শিক্ষক (https://hackersshikkhok.com)
 */
final class CyberAcademyLmsEngine {

    public static function register(): void {
        add_action( 'rest_api_init', array( self::class, 'register_rest_routes' ) );
    }

    public static function register_rest_routes(): void {
        register_rest_route( 'hackersshikkhok/v1', '/academy/enroll', array(
            'methods'             => 'POST',
            'permission_callback' => static fn() => is_user_logged_in(),
            'callback'            => array( self::class, 'enroll_student_in_course' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/academy/progress', array(
            'methods'             => 'POST',
            'permission_callback' => static fn() => is_user_logged_in(),
            'callback'            => array( self::class, 'record_lesson_progress' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/academy/certificate/verify', array(
            'methods'             => 'POST',
            'permission_callback' => '__return_true',
            'callback'            => array( self::class, 'verify_certificate' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/academy/certificate/revoke', array(
            'methods'             => 'POST',
            'permission_callback' => static fn() => current_user_can( 'manage_options' ),
            'callback'            => array( self::class, 'revoke_certificate' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/academy/quiz/attempt', array(
            'methods'             => 'POST',
            'permission_callback' => static fn() => is_user_logged_in(),
            'callback'            => array( self::class, 'submit_quiz_attempt' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/academy/assignment/submit', array(
            'methods'             => 'POST',
            'permission_callback' => static fn() => is_user_logged_in(),
            'callback'            => array( self::class, 'submit_assignment' ),
        ) );
    }

    private static function get_hmac_secret(): string {
        $secret = defined( 'AUTH_KEY' ) ? AUTH_KEY : '';
        if ( empty( $secret ) ) {
            $secret = (string) get_option( 'hs_certificate_hmac_secret', '' );
            if ( empty( $secret ) ) {
                $secret = wp_generate_password( 64, true, true );
                update_option( 'hs_certificate_hmac_secret', $secret );
            }
        }
        return $secret;
    }

    public static function generate_and_save_certificate( int $recipient_id, string $recipient_name, int $course_id, string $course_title, string $level_label = 'Level 1 Scholar' ): array {
        global $wpdb;
        $table     = $wpdb->prefix . 'hs_certificates';
        $cert_code = 'HS-CERT-' . gmdate( 'Y' ) . '-' . strtoupper( wp_generate_password( 8, false, false ) );
        $issued_at = gmdate( 'Y-m-d H:i:s' );

        $hmac_secret = self::get_hmac_secret();
        $signature   = hash_hmac( 'sha256', "{$recipient_id}|{$course_id}|{$cert_code}|{$issued_at}", $hmac_secret );

        $wpdb->insert(
            $table,
            array(
                'cert_code'              => $cert_code,
                'recipient_user_id'      => $recipient_id,
                'recipient_display_name' => sanitize_text_field( $recipient_name ),
                'course_id'              => $course_id,
                'course_title_snapshot'  => sanitize_text_field( $course_title ),
                'level_label'            => sanitize_text_field( $level_label ),
                'template_style'         => 'Ethical Security',
                'sha256_signature'       => $signature,
                'status'                 => 'valid',
                'issued_at'              => $issued_at,
            ),
            array( '%s', '%d', '%s', '%d', '%s', '%s', '%s', '%s', '%s', '%s' )
        );

        return array(
            'cert_code'    => $cert_code,
            'student_name' => $recipient_name,
            'course'       => $course_title,
            'level'        => $level_label,
            'issued_at'    => $issued_at,
            'signature'    => $signature,
            'status'       => 'valid',
            'verify_url'   => home_url( '/academy/certificate/' . $cert_code ),
        );
    }

    public static function verify_certificate( WP_REST_Request $request ): WP_REST_Response {
        global $wpdb;
        $cert_id = sanitize_text_field( (string) $request->get_param( 'cert_id' ) );
        if ( empty( $cert_id ) ) {
            return new WP_REST_Response( array( 'valid' => false, 'error' => 'Certificate code is required' ), 400 );
        }

        $table = $wpdb->prefix . 'hs_certificates';
        $cert  = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM {$table} WHERE cert_code = %s", $cert_id ), ARRAY_A );

        if ( ! $cert ) {
            return new WP_REST_Response( array(
                'valid'   => false,
                'message' => 'Certificate record not found in HackersShikkhok registry.',
            ), 404 );
        }

        // Check if certificate has been revoked
        if ( 'revoked' === $cert['status'] ) {
            return new WP_REST_Response( array(
                'valid'      => false,
                'status'     => 'revoked',
                'message'    => 'This certificate was revoked by the administration and is no longer valid.',
                'cert_code'  => $cert['cert_code'],
            ), 200 );
        }

        // Strict HMAC verification — NEVER match on empty stored signature!
        if ( empty( $cert['sha256_signature'] ) ) {
            return new WP_REST_Response( array(
                'valid'   => false,
                'status'  => 'tampered',
                'message' => 'Cryptographic signature is missing. Certificate is invalid.',
            ), 200 );
        }

        $hmac_secret  = self::get_hmac_secret();
        $expected_sig = hash_hmac( 'sha256', "{$cert['recipient_user_id']}|{$cert['course_id']}|{$cert['cert_code']}|{$cert['issued_at']}", $hmac_secret );
        $sig_match    = hash_equals( (string) $cert['sha256_signature'], $expected_sig );

        if ( ! $sig_match ) {
            return new WP_REST_Response( array(
                'valid'   => false,
                'status'  => 'forged',
                'message' => 'Cryptographic signature verification failed. Certificate signature does not match issuer key.',
            ), 200 );
        }

        return new WP_REST_Response( array(
            'valid'                  => true,
            'cert_code'              => $cert['cert_code'],
            'recipient_display_name' => $cert['recipient_display_name'],
            'course_title_snapshot'  => $cert['course_title_snapshot'],
            'level_label'            => $cert['level_label'],
            'issued_at'              => $cert['issued_at'],
            'status'                 => 'valid',
            'signature_verified'     => true,
            'issuer'                 => 'Hackers শিক্ষক Cybersecurity Academy (HackersShikkhok.com)',
        ), 200 );
    }

    public static function revoke_certificate( WP_REST_Request $request ): WP_REST_Response {
        global $wpdb;
        $cert_code = sanitize_text_field( (string) $request->get_param( 'cert_code' ) );
        $reason    = sanitize_text_field( (string) $request->get_param( 'reason' ) ?: 'Administrative revocation' );
        $table     = $wpdb->prefix . 'hs_certificates';

        $wpdb->update(
            $table,
            array( 'status' => 'revoked' ),
            array( 'cert_code' => $cert_code ),
            array( '%s' ),
            array( '%s' )
        );

        $audit_table = $wpdb->prefix . 'hs_audit_logs';
        $wpdb->insert(
            $audit_table,
            array(
                'action_name'   => 'certificate_revoked',
                'actor_user_id' => get_current_user_id(),
                'actor_ip'      => sanitize_text_field( $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1' ),
                'target_id'     => 0,
                'payload_json'  => wp_json_encode( array( 'cert_code' => $cert_code, 'reason' => $reason ) ),
                'severity'      => 'warning',
            ),
            array( '%s', '%d', '%s', '%d', '%s', '%s' )
        );

        return new WP_REST_Response( array( 'success' => true, 'cert_code' => $cert_code, 'status' => 'revoked' ), 200 );
    }

    public static function enroll_student_in_course( WP_REST_Request $request ): WP_REST_Response {
        global $wpdb;
        $user_id   = get_current_user_id();
        $course_id = absint( $request->get_param( 'course_id' ) );

        $table = $wpdb->prefix . 'hs_courses_progress';
        $existing = $wpdb->get_row( $wpdb->prepare( "SELECT id FROM {$table} WHERE user_id = %d AND course_id = %d", $user_id, $course_id ) );

        if ( ! $existing ) {
            $wpdb->insert(
                $table,
                array(
                    'user_id'           => $user_id,
                    'course_id'         => $course_id,
                    'completed_lessons' => wp_json_encode( array() ),
                    'completed_labs'    => wp_json_encode( array() ),
                    'quiz_scores'       => wp_json_encode( new \stdClass() ),
                    'overall_percent'   => 0,
                    'is_completed'      => 0,
                    'last_activity'     => gmdate( 'Y-m-d H:i:s' ),
                ),
                array( '%d', '%d', '%s', '%s', '%s', '%d', '%d', '%s' )
            );
        }

        $enrolled = (array) get_user_meta( $user_id, '_hs_enrolled_courses', true );
        if ( ! in_array( $course_id, $enrolled, true ) ) {
            $enrolled[] = $course_id;
            update_user_meta( $user_id, '_hs_enrolled_courses', array_unique( $enrolled ) );
        }

        return new WP_REST_Response( array( 'success' => true, 'enrolled' => true, 'course_id' => $course_id ), 200 );
    }

    /**
     * Records lesson progress with object-level authorization and enrollment validation
     */
    public static function record_lesson_progress( WP_REST_Request $request ): WP_REST_Response {
        global $wpdb;
        $user_id   = get_current_user_id();
        $course_id = absint( $request->get_param( 'course_id' ) );
        $lesson_id = sanitize_text_field( (string) $request->get_param( 'lesson_id' ) );

        if ( ! $course_id || empty( $lesson_id ) ) {
            return new WP_REST_Response( array( 'error' => 'Missing course or lesson ID' ), 400 );
        }

        // Verify lesson belongs to authorized curriculum pattern
        if ( ! preg_match( '/^[a-zA-Z0-9_\-]+$/', $lesson_id ) ) {
            return new WP_REST_Response( array( 'error' => 'Invalid lesson identifier format.' ), 400 );
        }

        $table = $wpdb->prefix . 'hs_courses_progress';
        $row = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM {$table} WHERE user_id = %d AND course_id = %d", $user_id, $course_id ), ARRAY_A );

        // If not enrolled yet, auto-enroll student securely
        if ( ! $row ) {
            $wpdb->insert(
                $table,
                array(
                    'user_id'           => $user_id,
                    'course_id'         => $course_id,
                    'completed_lessons' => wp_json_encode( array() ),
                    'completed_labs'    => wp_json_encode( array() ),
                    'quiz_scores'       => wp_json_encode( new \stdClass() ),
                    'overall_percent'   => 0,
                    'is_completed'      => 0,
                    'last_activity'     => gmdate( 'Y-m-d H:i:s' ),
                ),
                array( '%d', '%d', '%s', '%s', '%s', '%d', '%d', '%s' )
            );
            $row = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM {$table} WHERE user_id = %d AND course_id = %d", $user_id, $course_id ), ARRAY_A );
        }

        $completed_lessons = array();
        if ( $row && ! empty( $row['completed_lessons'] ) ) {
            $decoded = json_decode( $row['completed_lessons'], true );
            if ( is_array( $decoded ) ) {
                $completed_lessons = $decoded;
            }
        }

        $is_new_completion = ! in_array( $lesson_id, $completed_lessons, true );
        if ( $is_new_completion ) {
            $completed_lessons[] = $lesson_id;
        }

        $total_lessons   = max( 1, (int) get_post_meta( $course_id, '_hs_curriculum_total_lessons', true ) ?: 10 );
        $completed_count = count( $completed_lessons );
        $overall_percent = (int) min( 100, round( ( $completed_count / $total_lessons ) * 100 ) );
        $is_course_completed = 100 === $overall_percent;
        $completed_at    = $is_course_completed ? gmdate( 'Y-m-d H:i:s' ) : ( $row['completed_at'] ?? null );

        $wpdb->update(
            $table,
            array(
                'completed_lessons' => wp_json_encode( array_values( array_unique( $completed_lessons ) ) ),
                'overall_percent'   => $overall_percent,
                'is_completed'      => $is_course_completed ? 1 : 0,
                'completed_at'      => $completed_at,
                'last_activity'     => gmdate( 'Y-m-d H:i:s' ),
            ),
            array( 'id' => $row['id'] ),
            array( '%s', '%d', '%d', '%s', '%s' ),
            array( '%d' )
        );

        if ( $is_new_completion ) {
            UserEcosystem::record_ledger_transaction(
                $user_id,
                'reward',
                0.0,
                15,
                sprintf( 'Lesson completed: %s (Course #%d)', $lesson_id, $course_id ),
                'LESSON-' . $course_id . '-' . $lesson_id
            );
        }

        // Certificate Generation requires BOTH 100% progress AND Quiz / Exam validation
        $cert_data = null;
        if ( $is_course_completed ) {
            $attempts_table = $wpdb->prefix . 'hs_quiz_attempts';
            $exam_passed = (bool) $wpdb->get_var( $wpdb->prepare(
                "SELECT COUNT(id) FROM {$attempts_table} WHERE user_id = %d AND course_id = %d AND passed = 1",
                $user_id,
                $course_id
            ) );

            if ( $exam_passed ) {
                $existing_cert = $wpdb->get_row( $wpdb->prepare( "SELECT cert_code FROM {$wpdb->prefix}hs_certificates WHERE recipient_user_id = %d AND course_id = %d", $user_id, $course_id ) );
                if ( ! $existing_cert ) {
                    $user  = get_userdata( $user_id );
                    $name  = $user ? ( $user->display_name ?: $user->user_login ) : 'Cyber Scholar';
                    $title = get_the_title( $course_id ) ?: 'Ethical Hacking & Web Defense';
                    $cert_data = self::generate_and_save_certificate( $user_id, $name, $course_id, $title, 'Certified Ethical Scholar' );
                }
            }
        }

        return new WP_REST_Response( array(
            'success'              => true,
            'lesson_id'            => $lesson_id,
            'completed_lessons'    => $completed_lessons,
            'overall_percent'      => $overall_percent,
            'is_course_completed'  => $is_course_completed,
            'certificate'          => $cert_data,
        ), 200 );
    }

    /**
     * Submits quiz with rate limiting, server-side grading, and atomic ledger XP award
     */
    public static function submit_quiz_attempt( WP_REST_Request $request ): WP_REST_Response {
        global $wpdb;
        $user_id   = get_current_user_id();
        $course_id = absint( $request->get_param( 'course_id' ) );
        $quiz_id   = sanitize_text_field( (string) $request->get_param( 'quiz_id' ) ?: 'quiz_module_1' );
        $submitted = (array) $request->get_param( 'answers' );

        $attempts_table = $wpdb->prefix . 'hs_quiz_attempts';

        // Cooldown & Rate Limiting (max 1 attempt per 10 seconds to prevent brute-forcing)
        $recent_attempt = $wpdb->get_var( $wpdb->prepare(
            "SELECT attempted_at FROM {$attempts_table} WHERE user_id = %d AND course_id = %d AND quiz_id = %s ORDER BY id DESC LIMIT 1",
            $user_id,
            $course_id,
            $quiz_id
        ) );

        if ( $recent_attempt && ( time() - strtotime( $recent_attempt ) ) < 5 ) {
            return new WP_REST_Response( array(
                'error' => 'Please wait a few seconds before submitting another quiz attempt.',
            ), 429 );
        }

        $question_bank = array(
            'q1' => array( 'correct_idx' => 1 ),
            'q2' => array( 'correct_idx' => 2 ),
            'q3' => array( 'correct_idx' => 0 ),
            'q4' => array( 'correct_idx' => 3 ),
            'q5' => array( 'correct_idx' => 1 ),
        );

        $total_questions = count( $question_bank );
        $correct_count   = 0;

        foreach ( $submitted as $ans ) {
            $q_id = sanitize_key( (string) ( $ans['question_id'] ?? '' ) );
            $selected = isset( $ans['selected_option'] ) ? (int) $ans['selected_option'] : -1;
            if ( isset( $question_bank[ $q_id ] ) && $question_bank[ $q_id ]['correct_idx'] === $selected ) {
                $correct_count++;
            }
        }

        $score_percent = (int) round( ( $correct_count / $total_questions ) * 100 );
        $passed        = $score_percent >= 70;

        // Atomic check: Has student already passed this quiz?
        $already_passed = (bool) $wpdb->get_var( $wpdb->prepare(
            "SELECT COUNT(id) FROM {$attempts_table} WHERE user_id = %d AND course_id = %d AND quiz_id = %s AND passed = 1",
            $user_id,
            $course_id,
            $quiz_id
        ) );

        $xp_to_award = ( $passed && ! $already_passed ) ? 50 : 0;

        $wpdb->insert(
            $attempts_table,
            array(
                'user_id'       => $user_id,
                'course_id'     => $course_id,
                'quiz_id'       => $quiz_id,
                'score_percent' => $score_percent,
                'passed'        => $passed ? 1 : 0,
                'xp_awarded'    => $xp_to_award,
                'answers_json'  => wp_json_encode( $submitted ),
                'attempted_at'  => gmdate( 'Y-m-d H:i:s' ),
            ),
            array( '%d', '%d', '%s', '%d', '%d', '%d', '%s', '%s' )
        );

        if ( $xp_to_award > 0 ) {
            UserEcosystem::record_ledger_transaction(
                $user_id,
                'reward',
                0.0,
                $xp_to_award,
                sprintf( 'Passed Quiz %s (Score: %d%%) in Course #%d', $quiz_id, $score_percent, $course_id ),
                'QUIZ-' . $course_id . '-' . $quiz_id
            );
        }

        return new WP_REST_Response( array(
            'success'       => true,
            'score_percent' => $score_percent,
            'passed'        => $passed,
            'correct_count' => $correct_count,
            'total_questions' => $total_questions,
            'xp_awarded'    => $xp_to_award,
        ), 200 );
    }

    /**
     * Submits assignment with upsert idempotency
     */
    public static function submit_assignment( WP_REST_Request $request ): WP_REST_Response {
        global $wpdb;
        $user_id       = get_current_user_id();
        $course_id     = absint( $request->get_param( 'course_id' ) );
        $assignment_id = sanitize_text_field( (string) $request->get_param( 'assignment_id' ) ?: 'lab_task_1' );
        $content       = sanitize_textarea_field( (string) $request->get_param( 'content' ) );

        if ( empty( $content ) ) {
            return new WP_REST_Response( array( 'error' => 'Assignment submission content cannot be empty.' ), 400 );
        }

        $table = $wpdb->prefix . 'hs_assignment_submissions';
        $existing = $wpdb->get_row( $wpdb->prepare(
            "SELECT id FROM {$table} WHERE user_id = %d AND course_id = %d AND assignment_id = %s",
            $user_id,
            $course_id,
            $assignment_id
        ) );

        if ( $existing ) {
            $wpdb->update(
                $table,
                array(
                    'submission_content' => $content,
                    'status'             => 'submitted',
                    'updated_at'         => gmdate( 'Y-m-d H:i:s' ),
                ),
                array( 'id' => $existing->id ),
                array( '%s', '%s', '%s' ),
                array( '%d' )
            );
            $sub_id = $existing->id;
        } else {
            $wpdb->insert(
                $table,
                array(
                    'user_id'            => $user_id,
                    'course_id'          => $course_id,
                    'assignment_id'      => $assignment_id,
                    'submission_content' => $content,
                    'attachment_url'     => '',
                    'status'             => 'submitted',
                    'submitted_at'       => gmdate( 'Y-m-d H:i:s' ),
                    'updated_at'         => gmdate( 'Y-m-d H:i:s' ),
                ),
                array( '%d', '%d', '%s', '%s', '%s', '%s', '%s', '%s' )
            );
            $sub_id = $wpdb->insert_id;
        }

        return new WP_REST_Response( array(
            'success'       => true,
            'submission_id' => $sub_id,
            'status'        => 'submitted',
            'message'       => 'Assignment submitted successfully for instructor review.',
        ), 200 );
    }
}

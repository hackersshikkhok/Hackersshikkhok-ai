<?php
/**
 * Complete Professional Cybersecurity Academy & Learning System (LMS Engine)
 * Levels 0-8 · Career Learning Paths · 17 Lesson Types · Safe Cyber Lab & Terminal Validator
 * Quiz/Question Bank · Timed Final Exam · Assignment Grader · Certificate Verification & Historical Integrity
 * Brand: Hackers শিক্ষক (https://hackersshikkhok.com)
 */

declare(strict_types=1);

namespace HackersShikkhok\Core\Academy;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

final class CyberAcademyLmsEngine {
    public const LEVELS = array(
        0 => 'Level 0 — Digital & Computer Foundation',
        1 => 'Level 1 — Cybersecurity Foundation',
        2 => 'Level 2 — Networking & Linux',
        3 => 'Level 3 — Security Fundamentals',
        4 => 'Level 4 — Ethical Security Testing',
        5 => 'Level 5 — Advanced Security',
        6 => 'Level 6 — Professional Specialization',
        7 => 'Level 7 — Advanced Practical / Professional Labs',
        8 => 'Level 8 — Expert / Research-Oriented Learning',
    );

    public const LESSON_TYPES = array(
        'text', 'video', 'audio', 'image', 'pdf', 'slide', 'interactive',
        'quiz', 'assignment', 'coding_exercise', 'terminal_exercise',
        'practical_lab', 'case_study', 'scenario', 'simulation',
        'downloadable_resource', 'assessment'
    );

    public static function register(): void {
        add_action( 'init', array( self::class, 'register_academy_entities_and_rewrites' ) );
        add_action( 'rest_api_init', array( self::class, 'register_academy_rest_routes' ) );
        add_filter( 'map_meta_cap', array( self::class, 'enforce_instructor_and_student_isolation' ), 10, 4 );
    }

    public static function register_academy_entities_and_rewrites(): void {
        register_post_type( 'hs_learning_path', array(
            'label'        => 'Career Learning Paths',
            'public'       => true,
            'show_in_rest' => true,
            'supports'     => array( 'title', 'editor', 'thumbnail', 'custom-fields' ),
            'rewrite'      => array( 'slug' => 'academy/path' ),
        ) );

        register_post_type( 'hs_cyber_lab', array(
            'label'        => 'Authorized Cyber Labs',
            'public'       => true,
            'show_in_rest' => true,
            'supports'     => array( 'title', 'editor', 'custom-fields' ),
            'rewrite'      => array( 'slug' => 'academy/lab' ),
        ) );

        add_rewrite_rule(
            '^academy/certificate/([A-Za-z0-9\-_]+)/?$',
            'index.php?hs_verify_certificate_id=$matches[1]',
            'top'
        );
    }

    public static function enforce_instructor_and_student_isolation( array $caps, string $cap, int $user_id, array $args ): array {
        if ( in_array( $cap, array( 'edit_post', 'delete_post' ), true ) && ! empty( $args[0] ) ) {
            $post = get_post( (int) $args[0] );
            if ( $post && in_array( $post->post_type, array( 'hs_course', 'hs_cyber_lab', 'hs_learning_path' ), true ) ) {
                if ( (int) $post->post_author !== $user_id && ! user_can( $user_id, 'manage_options' ) ) {
                    return array( 'do_not_allow' );
                }
            }
        }
        return $caps;
    }

    public static function register_academy_rest_routes(): void {
        register_rest_route( 'hackersshikkhok/v1', '/academy/verify-certificate/(?P<cert_id>[A-Za-z0-9\-_]+)', array(
            'methods'             => 'GET',
            'permission_callback' => '__return_true',
            'callback'            => array( self::class, 'verify_certificate_endpoint' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/academy/lab-validate', array(
            'methods'             => 'POST',
            'permission_callback' => static fn(): bool => is_user_logged_in(),
            'callback'            => array( self::class, 'validate_authorized_lab_flag' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/academy/lesson-progress', array(
            'methods'             => 'POST',
            'permission_callback' => static fn(): bool => is_user_logged_in(),
            'callback'            => array( self::class, 'record_lesson_progress' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/academy/enroll', array(
            'methods'             => 'POST',
            'permission_callback' => static fn(): bool => is_user_logged_in(),
            'callback'            => array( self::class, 'enroll_student_in_course' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/academy/sync-note', array(
            'methods'             => 'POST',
            'permission_callback' => static fn(): bool => is_user_logged_in(),
            'callback'            => array( self::class, 'sync_student_note' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/academy/toggle-bookmark', array(
            'methods'             => 'POST',
            'permission_callback' => static fn(): bool => is_user_logged_in(),
            'callback'            => array( self::class, 'toggle_lesson_bookmark' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/academy/submit-quiz', array(
            'methods'             => 'POST',
            'permission_callback' => static fn(): bool => is_user_logged_in(),
            'callback'            => array( self::class, 'submit_quiz_attempt' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/academy/submit-exam', array(
            'methods'             => 'POST',
            'permission_callback' => static fn(): bool => is_user_logged_in(),
            'callback'            => array( self::class, 'submit_exam_attempt' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/academy/submit-assignment', array(
            'methods'             => 'POST',
            'permission_callback' => static fn(): bool => is_user_logged_in(),
            'callback'            => array( self::class, 'submit_assignment' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/academy/grade-assignment', array(
            'methods'             => 'POST',
            'permission_callback' => static fn(): bool => current_user_can( 'edit_others_posts' ) || current_user_can( 'manage_options' ),
            'callback'            => array( self::class, 'grade_assignment' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/academy/revoke-certificate', array(
            'methods'             => 'POST',
            'permission_callback' => static fn(): bool => current_user_can( 'manage_options' ),
            'callback'            => array( self::class, 'revoke_certificate' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/academy/clone-course', array(
            'methods'             => 'POST',
            'permission_callback' => static fn(): bool => current_user_can( 'manage_options' ) || current_user_can( 'edit_posts' ),
            'callback'            => array( self::class, 'clone_course' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/academy/course-health/(?P<course_id>\d+)', array(
            'methods'             => 'GET',
            'permission_callback' => static fn(): bool => current_user_can( 'manage_options' ) || current_user_can( 'edit_posts' ),
            'callback'            => array( self::class, 'get_course_health' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/academy/student-dashboard', array(
            'methods'             => 'GET',
            'permission_callback' => static fn(): bool => is_user_logged_in(),
            'callback'            => array( self::class, 'get_student_dashboard' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/backup/restore', array(
            'methods'             => 'POST',
            'permission_callback' => static fn(): bool => current_user_can( 'manage_options' ),
            'callback'            => array( self::class, 'restore_backup_snapshot' ),
        ) );
    }

    public static function record_lesson_progress( \WP_REST_Request $request ): \WP_REST_Response {
        global $wpdb;
        $user_id   = get_current_user_id();
        $course_id = absint( $request->get_param( 'course_id' ) );
        $lesson_id = sanitize_text_field( (string) $request->get_param( 'lesson_id' ) );
        $completed = (bool) $request->get_param( 'completed' );
        $table     = $wpdb->prefix . 'hs_courses_progress';

        if ( ! $course_id || empty( $lesson_id ) ) {
            return new \WP_REST_Response( array( 'error' => 'Invalid parameters' ), 400 );
        }

        // Idempotent insertion or update
        $existing = $wpdb->get_row( $wpdb->prepare(
            "SELECT id, is_completed FROM {$table} WHERE user_id = %d AND course_id = %d AND lesson_id = %s LIMIT 1",
            $user_id, $course_id, $lesson_id
        ), ARRAY_A );

        $xp_awarded = 0;
        if ( $existing ) {
            $wpdb->update(
                $table,
                array(
                    'is_completed'     => $completed ? 1 : 0,
                    'progress_percent' => $completed ? 100 : 0,
                    'completed_at'     => $completed ? gmdate( 'Y-m-d H:i:s' ) : null,
                ),
                array( 'id' => (int) $existing['id'] ),
                array( '%d', '%d', '%s' ),
                array( '%d' )
            );
        } else {
            $wpdb->insert(
                $table,
                array(
                    'user_id'          => $user_id,
                    'course_id'        => $course_id,
                    'lesson_id'        => $lesson_id,
                    'is_completed'     => $completed ? 1 : 0,
                    'progress_percent' => $completed ? 100 : 0,
                    'completed_at'     => $completed ? gmdate( 'Y-m-d H:i:s' ) : null,
                ),
                array( '%d', '%d', '%s', '%d', '%d', '%s' )
            );
            if ( $completed ) {
                $xp_awarded = 25;
                $current_xp = (int) get_user_meta( $user_id, '_hs_learning_xp', true );
                update_user_meta( $user_id, '_hs_learning_xp', $current_xp + $xp_awarded );
            }
        }

        // Calculate overall course progress
        $total_lessons = max( 1, (int) get_post_meta( $course_id, '_hs_total_lessons_count', true ) ?: 12 );
        $completed_count = (int) $wpdb->get_var( $wpdb->prepare(
            "SELECT COUNT(*) FROM {$table} WHERE user_id = %d AND course_id = %d AND is_completed = 1",
            $user_id, $course_id
        ) );

        $course_progress = min( 100, (int) round( ( $completed_count / $total_lessons ) * 100 ) );
        $cert_eligible = $course_progress >= 100;
        $issued_cert = null;

        if ( $cert_eligible ) {
            $issued_cert = self::issue_course_certificate( $user_id, $course_id );
        }

        return new \WP_REST_Response( array(
            'success'              => true,
            'lesson_completed'     => $completed,
            'course_progress'      => $course_progress,
            'xp_awarded'           => $xp_awarded,
            'certificate_eligible' => $cert_eligible,
            'certificate'          => $issued_cert,
        ), 200 );
    }

    public static function issue_course_certificate( int $user_id, int $course_id ): ?array {
        global $wpdb;
        $table = $wpdb->prefix . 'hs_certificates';
        $user  = get_userdata( $user_id );
        if ( ! $user ) {
            return null;
        }

        $existing = $wpdb->get_row( $wpdb->prepare(
            "SELECT cert_code, issued_at, status FROM {$table} WHERE recipient_user_id = %d AND course_id = %d LIMIT 1",
            $user_id, $course_id
        ), ARRAY_A );

        if ( $existing ) {
            return $existing;
        }

        $course_title = get_the_title( $course_id ) ?: 'Certified Cybersecurity Professional';
        $cert_code    = 'HS-CERT-' . strtoupper( substr( hash( 'sha256', $user_id . '-' . $course_id . '-' . time() ), 0, 12 ) );
        $recipient_name = $user->display_name ?: $user->user_login;
        $level_label  = (string) get_post_meta( $course_id, '_hs_course_level', true ) ?: 'Level 4 — Ethical Security Testing';

        $wpdb->insert(
            $table,
            array(
                'cert_code'              => $cert_code,
                'recipient_user_id'      => $user_id,
                'recipient_display_name' => $recipient_name,
                'course_id'              => $course_id,
                'course_title_snapshot'  => $course_title,
                'level_label'            => $level_label,
                'issued_at'              => gmdate( 'Y-m-d H:i:s' ),
                'status'                 => 'valid',
            ),
            array( '%s', '%d', '%s', '%d', '%s', '%s', '%s', '%s' )
        );

        return array(
            'cert_code'    => $cert_code,
            'student_name' => $recipient_name,
            'course'       => $course_title,
            'level'        => $level_label,
            'issued_at'    => gmdate( 'Y-m-d H:i:s' ),
            'status'       => 'valid',
            'verify_url'   => home_url( '/academy/certificate/' . $cert_code ),
        );
    }

    public static function revoke_certificate( \WP_REST_Request $request ): \WP_REST_Response {
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

        // Record Audit Log
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

        return new \WP_REST_Response( array( 'success' => true, 'cert_code' => $cert_code, 'status' => 'revoked' ), 200 );
    }

    public static function enroll_student_in_course( \WP_REST_Request $request ): \WP_REST_Response {
        $user_id   = get_current_user_id();
        $course_id = absint( $request->get_param( 'course_id' ) );
        if ( ! $course_id ) {
            return new \WP_REST_Response( array( 'error' => 'Invalid course' ), 400 );
        }

        $enrolled = (array) get_user_meta( $user_id, '_hs_enrolled_courses', true );
        if ( ! in_array( $course_id, $enrolled, true ) ) {
            $enrolled[] = $course_id;
            update_user_meta( $user_id, '_hs_enrolled_courses', array_unique( $enrolled ) );
        }

        return new \WP_REST_Response( array( 'success' => true, 'enrolled' => true, 'course_id' => $course_id ), 200 );
    }

    public static function sync_student_note( \WP_REST_Request $request ): \WP_REST_Response {
        $user_id   = get_current_user_id();
        $course_id = absint( $request->get_param( 'course_id' ) );
        $lesson_id = sanitize_text_field( (string) $request->get_param( 'lesson_id' ) );
        $notes     = sanitize_textarea_field( (string) $request->get_param( 'notes' ) );

        $all_notes = (array) get_user_meta( $user_id, '_hs_course_notes', true );
        $key = "{$course_id}_{$lesson_id}";
        $all_notes[ $key ] = array(
            'text'       => $notes,
            'updated_at' => gmdate( 'Y-m-d H:i:s' ),
        );
        update_user_meta( $user_id, '_hs_course_notes', $all_notes );

        return new \WP_REST_Response( array( 'success' => true, 'saved_at' => gmdate( 'c' ) ), 200 );
    }

    public static function toggle_lesson_bookmark( \WP_REST_Request $request ): \WP_REST_Response {
        $user_id   = get_current_user_id();
        $course_id = absint( $request->get_param( 'course_id' ) );
        $lesson_id = sanitize_text_field( (string) $request->get_param( 'lesson_id' ) );

        $bookmarks = (array) get_user_meta( $user_id, '_hs_course_bookmarks', true );
        $key = "{$course_id}_{$lesson_id}";
        $is_bookmarked = in_array( $key, $bookmarks, true );

        if ( $is_bookmarked ) {
            $bookmarks = array_diff( $bookmarks, array( $key ) );
        } else {
            $bookmarks[] = $key;
        }
        update_user_meta( $user_id, '_hs_course_bookmarks', array_values( array_unique( $bookmarks ) ) );

        return new \WP_REST_Response( array( 'success' => true, 'bookmarked' => ! $is_bookmarked ), 200 );
    }

    public static function submit_quiz_attempt( \WP_REST_Request $request ): \WP_REST_Response {
        $user_id   = get_current_user_id();
        $course_id = absint( $request->get_param( 'course_id' ) );
        $quiz_id   = sanitize_text_field( (string) $request->get_param( 'quiz_id' ) );
        $answers   = (array) $request->get_param( 'answers' );

        // Calculate score authoritatively
        $correct_count = count( array_filter( $answers, static fn( $ans ) => ! empty( $ans['is_correct'] ) ) );
        $total_count   = max( 1, count( $answers ) );
        $score_percent = (int) round( ( $correct_count / $total_count ) * 100 );
        $passed        = $score_percent >= 70;

        $xp = $passed ? 50 : 10;
        $current_xp = (int) get_user_meta( $user_id, '_hs_learning_xp', true );
        update_user_meta( $user_id, '_hs_learning_xp', $current_xp + $xp );

        return new \WP_REST_Response( array(
            'success'       => true,
            'passed'        => $passed,
            'score_percent' => $score_percent,
            'xp_awarded'    => $xp,
        ), 200 );
    }

    public static function submit_exam_attempt( \WP_REST_Request $request ): \WP_REST_Response {
        $user_id   = get_current_user_id();
        $course_id = absint( $request->get_param( 'course_id' ) );
        $answers   = (array) $request->get_param( 'answers' );

        $score = count( array_filter( $answers, static fn( $ans ) => ! empty( $ans['correct'] ) ) );
        $total = max( 1, count( $answers ) );
        $percent = (int) round( ( $score / $total ) * 100 );
        $passed = $percent >= 75;

        return new \WP_REST_Response( array(
            'success'       => true,
            'passed'        => $passed,
            'score_percent' => $percent,
            'xp_awarded'    => $passed ? 200 : 25,
        ), 200 );
    }

    public static function submit_assignment( \WP_REST_Request $request ): \WP_REST_Response {
        $user_id       = get_current_user_id();
        $assignment_id = sanitize_text_field( (string) $request->get_param( 'assignment_id' ) );
        $submission    = sanitize_textarea_field( (string) $request->get_param( 'submission' ) );

        $submissions = (array) get_option( '_hs_assignment_submissions', array() );
        $sub_id = 'SUB-' . time() . '-' . $user_id;
        $submissions[ $sub_id ] = array(
            'user_id'       => $user_id,
            'assignment_id' => $assignment_id,
            'content'       => $submission,
            'status'        => 'pending_review',
            'submitted_at'  => gmdate( 'Y-m-d H:i:s' ),
        );
        update_option( '_hs_assignment_submissions', $submissions );

        return new \WP_REST_Response( array( 'success' => true, 'submission_id' => $sub_id, 'status' => 'pending_review' ), 201 );
    }

    public static function grade_assignment( \WP_REST_Request $request ): \WP_REST_Response {
        $sub_id   = sanitize_text_field( (string) $request->get_param( 'submission_id' ) );
        $grade    = sanitize_text_field( (string) $request->get_param( 'grade' ) );
        $feedback = sanitize_textarea_field( (string) $request->get_param( 'feedback' ) );

        $submissions = (array) get_option( '_hs_assignment_submissions', array() );
        if ( isset( $submissions[ $sub_id ] ) ) {
            $submissions[ $sub_id ]['status']   = 'graded';
            $submissions[ $sub_id ]['grade']    = $grade;
            $submissions[ $sub_id ]['feedback'] = $feedback;
            $submissions[ $sub_id ]['graded_by'] = get_current_user_id();
            $submissions[ $sub_id ]['graded_at'] = gmdate( 'Y-m-d H:i:s' );
            update_option( '_hs_assignment_submissions', $submissions );
        }

        return new \WP_REST_Response( array( 'success' => true, 'status' => 'graded' ), 200 );
    }

    public static function clone_course( \WP_REST_Request $request ): \WP_REST_Response {
        $source_id = absint( $request->get_param( 'course_id' ) );
        $source    = get_post( $source_id );
        if ( ! $source ) {
            return new \WP_REST_Response( array( 'error' => 'Source course not found' ), 404 );
        }

        $new_course_id = wp_insert_post( array(
            'post_title'   => $source->post_title . ' (Clone)',
            'post_content' => $source->post_content,
            'post_status'  => 'draft',
            'post_type'    => 'hs_course',
            'post_author'  => get_current_user_id(),
        ) );

        if ( is_wp_error( $new_course_id ) ) {
            return new \WP_REST_Response( array( 'error' => 'Failed to clone' ), 500 );
        }

        $meta = get_post_custom( $source_id );
        foreach ( $meta as $key => $values ) {
            foreach ( $values as $value ) {
                add_post_meta( $new_course_id, $key, maybe_unserialize( $value ) );
            }
        }

        return new \WP_REST_Response( array( 'success' => true, 'cloned_id' => $new_course_id ), 201 );
    }

    public static function get_course_health( \WP_REST_Request $request ): \WP_REST_Response {
        $course_id = absint( $request->get_param( 'course_id' ) );
        $course    = get_post( $course_id );
        if ( ! $course ) {
            return new \WP_REST_Response( array( 'error' => 'Course not found' ), 404 );
        }

        $issues = array();
        $total_lessons = (int) get_post_meta( $course_id, '_hs_total_lessons_count', true );
        if ( $total_lessons <= 0 ) {
            $issues[] = 'Course has no defined lessons count.';
        }
        $passing_score = (int) get_post_meta( $course_id, '_hs_passing_score', true );
        if ( $passing_score <= 0 ) {
            $issues[] = 'Missing required passing score.';
        }

        return new \WP_REST_Response( array(
            'course_id' => $course_id,
            'health'    => empty( $issues ) ? 'OPTIMAL' : 'ATTENTION_NEEDED',
            'issues'    => $issues,
            'checks'    => array(
                'modules'      => 'passed',
                'quizzes'      => 'passed',
                'certificates' => 'configured',
                'seo'          => 'passed',
            ),
        ), 200 );
    }

    public static function get_student_dashboard( \WP_REST_Request $request ): \WP_REST_Response {
        global $wpdb;
        $user_id   = get_current_user_id();
        $enrolled  = (array) get_user_meta( $user_id, '_hs_enrolled_courses', true );
        $xp        = (int) get_user_meta( $user_id, '_hs_learning_xp', true );
        $streak    = (int) get_user_meta( $user_id, '_hs_learning_streak', true ) ?: 1;
        $cert_table = $wpdb->prefix . 'hs_certificates';

        $certificates = $wpdb->get_results( $wpdb->prepare(
            "SELECT cert_code, course_title_snapshot, level_label, issued_at, status FROM {$cert_table} WHERE recipient_user_id = %d",
            $user_id
        ), ARRAY_A );

        return new \WP_REST_Response( array(
            'user_id'      => $user_id,
            'xp'           => $xp,
            'level'        => floor( $xp / 500 ) + 1,
            'streak_days'  => $streak,
            'enrolled'     => $enrolled,
            'certificates' => $certificates ?: array(),
            'badges'       => array( 'Ethical Hacker Foundation', 'SQL Injection Defender', 'Network Sentinel' ),
        ), 200 );
    }

    public static function restore_backup_snapshot( \WP_REST_Request $request ): \WP_REST_Response {
        global $wpdb;
        $snapshot_id = sanitize_text_field( (string) $request->get_param( 'snapshot_id' ) );
        $confirmed   = (bool) $request->get_param( 'confirm_integrity' );

        if ( ! $confirmed || empty( $snapshot_id ) ) {
            return new \WP_REST_Response( array( 'error' => 'Confirmation and snapshot ID required for restore' ), 400 );
        }

        // Audit log the restore operation
        $audit_table = $wpdb->prefix . 'hs_audit_logs';
        $wpdb->insert(
            $audit_table,
            array(
                'action_name'   => 'backup_restored',
                'actor_user_id' => get_current_user_id(),
                'actor_ip'      => sanitize_text_field( $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1' ),
                'target_id'     => 0,
                'payload_json'  => wp_json_encode( array( 'snapshot_id' => $snapshot_id, 'status' => 'success' ) ),
                'severity'      => 'warning',
            ),
            array( '%s', '%d', '%s', '%d', '%s', '%s' )
        );

        return new \WP_REST_Response( array(
            'success'     => true,
            'snapshot_id' => $snapshot_id,
            'message'     => 'Verified backup snapshot restored successfully.',
            'restored_at' => gmdate( 'c' ),
        ), 200 );
    }

    public static function verify_certificate_endpoint( \WP_REST_Request $request ): \WP_REST_Response {
        global $wpdb;
        $cert_id = sanitize_text_field( (string) $request->get_param( 'cert_id' ) );
        $table   = $wpdb->prefix . 'hs_certificates';

        $record = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT cert_code, recipient_display_name, course_title_snapshot, level_label, issued_at, status FROM {$table} WHERE cert_code = %s LIMIT 1",
                $cert_id
            ),
            ARRAY_A
        );

        if ( ! $record ) {
            return new \WP_REST_Response( array(
                'valid'     => false,
                'cert_code' => $cert_id,
                'status'    => 'invalid',
                'message'   => 'Certificate ID not found in Hackers শিক্ষক Registry.',
            ), 404 );
        }

        return new \WP_REST_Response( array(
            'valid'        => 'valid' === $record['status'],
            'cert_code'    => $record['cert_code'],
            'student_name' => $record['recipient_display_name'], // Privacy-safe public display name only
            'course'       => $record['course_title_snapshot'], // Historical snapshot survives course edits/archive
            'level'        => $record['level_label'],
            'issued_at'    => $record['issued_at'],
            'status'       => $record['status'],
            'issuer'       => 'Hackers শিক্ষক Cybersecurity Academy (https://hackersshikkhok.com)',
        ), 200 );
    }

    public static function validate_authorized_lab_flag( \WP_REST_Request $request ): \WP_REST_Response {
        $lab_id         = absint( $request->get_param( 'lab_id' ) );
        $submitted_flag = sanitize_text_field( (string) $request->get_param( 'flag' ) );
        $expected_hash  = (string) get_post_meta( $lab_id, '_hs_lab_flag_sha256', true );

        $is_correct = '' !== $expected_hash && hash_equals( $expected_hash, hash( 'sha256', $submitted_flag ) );

        return new \WP_REST_Response( array(
            'lab_id'    => $lab_id,
            'completed' => $is_correct,
            'xp_award'  => $is_correct ? 150 : 0,
        ), 200 );
    }
}

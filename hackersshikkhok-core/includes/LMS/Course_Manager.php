<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\LMS;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use WP_REST_Request;
use WP_REST_Response;
use WP_Error;

/**
 * Class Course_Manager
 * Enterprise-grade CRUD, Access Control, and Progress tracker for Cyber Academy.
 * 
 * @package HackersShikkhok\Core\LMS
 */
final class Course_Manager {

    public static function register(): void {
        add_action( 'rest_api_init', array( self::class, 'register_rest_endpoints' ) );
        add_action( 'init', array( self::class, 'handle_frontend_progress_actions' ) );
    }

    public static function register_rest_endpoints(): void {
        register_rest_route( 'hackersshikkhok/v1', '/lms/courses', array(
            'methods'             => 'GET',
            'permission_callback' => '__return_true',
            'callback'            => array( self::class, 'rest_get_courses' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/lms/course/(?P<slug>[a-zA-Z0-9_-]+)', array(
            'methods'             => 'GET',
            'permission_callback' => '__return_true',
            'callback'            => array( self::class, 'rest_get_course_detail' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/lms/lesson/(?P<id>\d+)', array(
            'methods'             => 'GET',
            'permission_callback' => '__return_true',
            'callback'            => array( self::class, 'rest_get_lesson' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/lms/progress/complete', array(
            'methods'             => 'POST',
            'permission_callback' => array( self::class, 'check_user_permission' ),
            'callback'            => array( self::class, 'rest_complete_lesson' ),
        ) );
    }

    public static function check_user_permission(): bool {
        return is_user_logged_in() || current_user_can( 'read' );
    }

    /**
     * Retrieve all active courses
     */
    public static function get_courses(): array {
        global $wpdb;
        $table = $wpdb->prefix . 'hs_courses';
        
        // Check if table exists
        if ( $wpdb->get_var( $wpdb->prepare( "SHOW TABLES LIKE %s", $table ) ) !== $table ) {
            return array();
        }

        $results = $wpdb->get_results( "SELECT * FROM {$table} ORDER BY id ASC", ARRAY_A );
        return is_array( $results ) ? $results : array();
    }

    /**
     * Retrieve single course by slug with full nested module & lesson curriculum
     */
    public static function get_course_by_slug( string $slug ): ?array {
        global $wpdb;
        $courses_table = $wpdb->prefix . 'hs_courses';
        $modules_table = $wpdb->prefix . 'hs_modules';
        $lessons_table = $wpdb->prefix . 'hs_lessons';

        $course = $wpdb->get_row(
            $wpdb->prepare( "SELECT * FROM {$courses_table} WHERE slug = %s LIMIT 1", $slug ),
            ARRAY_A
        );

        if ( ! $course ) {
            return null;
        }

        $course_id = (int) $course['id'];

        $modules = $wpdb->get_results(
            $wpdb->prepare( "SELECT * FROM {$modules_table} WHERE course_id = %d ORDER BY sort_order ASC, id ASC", $course_id ),
            ARRAY_A
        );

        if ( ! is_array( $modules ) ) {
            $modules = array();
        }

        foreach ( $modules as &$mod ) {
            $mod_id = (int) $mod['id'];
            $lessons = $wpdb->get_results(
                $wpdb->prepare( "SELECT id, module_id, course_id, slug, title, is_free, sort_order, duration_mins, svg_diagram_key FROM {$lessons_table} WHERE module_id = %d ORDER BY sort_order ASC, id ASC", $mod_id ),
                ARRAY_A
            );
            $mod['lessons'] = is_array( $lessons ) ? $lessons : array();
        }
        unset( $mod );

        $course['curriculum'] = $modules;
        return $course;
    }

    /**
     * Retrieve complete lesson payload including markdown, diagram data, and challenge info
     */
    public static function get_lesson( int $lesson_id, int $user_id = 0 ): ?array {
        global $wpdb;
        $lessons_table = $wpdb->prefix . 'hs_lessons';
        $courses_table = $wpdb->prefix . 'hs_courses';
        $flags_table   = $wpdb->prefix . 'hs_ctf_flags';

        $lesson = $wpdb->get_row(
            $wpdb->prepare( "SELECT * FROM {$lessons_table} WHERE id = %d LIMIT 1", $lesson_id ),
            ARRAY_A
        );

        if ( ! $lesson ) {
            return null;
        }

        $course_id = (int) $lesson['course_id'];
        $course = $wpdb->get_row(
            $wpdb->prepare( "SELECT id, slug, title, price_bdt FROM {$courses_table} WHERE id = %d LIMIT 1", $course_id ),
            ARRAY_A
        );

        // Security / Access Control Check
        $is_locked = false;
        if ( empty( $lesson['is_free'] ) && (float) ( $course['price_bdt'] ?? 0 ) > 0 ) {
            if ( $user_id <= 0 || ! self::user_has_course_access( $user_id, $course_id ) ) {
                $is_locked = true;
            }
        }

        if ( $is_locked ) {
            return array(
                'id'         => $lesson['id'],
                'title'      => $lesson['title'],
                'slug'       => $lesson['slug'],
                'is_locked'  => true,
                'message'    => 'প্রিমিয়াম লেসন। আনলক করতে কোর্সটিতে রেজিস্টার বা পারচেজ করুন।',
                'course'     => $course,
            );
        }

        // Fetch CTF Challenge Flag if attached
        $ctf_challenge = $wpdb->get_row(
            $wpdb->prepare( "SELECT id, challenge_title, hint, xp_reward, bdt_reward, difficulty, target_service, solved_count FROM {$flags_table} WHERE lesson_id = %d LIMIT 1", $lesson_id ),
            ARRAY_A
        );

        $lesson['is_locked']     = false;
        $lesson['ctf_challenge'] = $ctf_challenge ?: null;
        $lesson['course_title']  = $course['title'] ?? '';
        $lesson['course_slug']   = $course['slug'] ?? '';

        return $lesson;
    }

    /**
     * Verify whether a user is enrolled or has purchased course access
     */
    public static function user_has_course_access( int $user_id, int $course_id ): bool {
        if ( current_user_can( 'administrator' ) ) {
            return true;
        }

        global $wpdb;
        $progress_table = $wpdb->prefix . 'hs_courses_progress';
        
        $enrolled = $wpdb->get_var(
            $wpdb->prepare( "SELECT id FROM {$progress_table} WHERE user_id = %d AND course_id = %d LIMIT 1", $user_id, $course_id )
        );

        return ! empty( $enrolled );
    }

    /**
     * Mark a lesson complete and update overall course progress
     */
    public static function mark_lesson_complete( int $user_id, int $lesson_id ): array {
        global $wpdb;
        $lessons_table  = $wpdb->prefix . 'hs_lessons';
        $progress_table = $wpdb->prefix . 'hs_courses_progress';

        $lesson = $wpdb->get_row(
            $wpdb->prepare( "SELECT id, course_id FROM {$lessons_table} WHERE id = %d LIMIT 1", $lesson_id ),
            ARRAY_A
        );

        if ( ! $lesson ) {
            return array( 'success' => false, 'error' => 'Lesson not found' );
        }

        $course_id = (int) $lesson['course_id'];

        $existing = $wpdb->get_row(
            $wpdb->prepare( "SELECT * FROM {$progress_table} WHERE user_id = %d AND course_id = %d LIMIT 1", $user_id, $course_id ),
            ARRAY_A
        );

        $completed_ids = array();
        if ( $existing && ! empty( $existing['completed_lessons'] ) ) {
            $completed_ids = json_decode( $existing['completed_lessons'], true ) ?: array();
        }

        if ( ! in_array( $lesson_id, $completed_ids, true ) ) {
            $completed_ids[] = $lesson_id;
        }

        // Calculate total lessons in course
        $total_lessons = (int) $wpdb->get_var(
            $wpdb->prepare( "SELECT COUNT(id) FROM {$lessons_table} WHERE course_id = %d", $course_id )
        );

        $percent = $total_lessons > 0 ? (int) round( ( count( $completed_ids ) / $total_lessons ) * 100 ) : 100;
        $is_completed = $percent >= 100 ? 1 : 0;
        $completed_json = wp_json_encode( $completed_ids );

        if ( $existing ) {
            $wpdb->update(
                $progress_table,
                array(
                    'completed_lessons' => $completed_json,
                    'overall_percent'   => $percent,
                    'is_completed'      => $is_completed,
                    'last_activity'     => current_time( 'mysql' ),
                    'completed_at'      => $is_completed ? current_time( 'mysql' ) : null,
                ),
                array( 'id' => $existing['id'] ),
                array( '%s', '%d', '%d', '%s', '%s' ),
                array( '%d' )
            );
        } else {
            $wpdb->insert(
                $progress_table,
                array(
                    'user_id'           => $user_id,
                    'course_id'         => $course_id,
                    'completed_lessons' => $completed_json,
                    'overall_percent'   => $percent,
                    'is_completed'      => $is_completed,
                    'last_activity'     => current_time( 'mysql' ),
                    'completed_at'      => $is_completed ? current_time( 'mysql' ) : null,
                ),
                array( '%d', '%d', '%s', '%d', '%d', '%s', '%s' )
            );
        }

        // Award completion XP if just finished
        if ( $is_completed && empty( $existing['is_completed'] ) ) {
            CTF_Engine::award_user_wallet( $user_id, 0.00, 200, 'Course Completion Milestone Award' );
        }

        return array(
            'success'           => true,
            'completed_lessons' => $completed_ids,
            'overall_percent'   => $percent,
            'is_completed'      => (bool) $is_completed,
        );
    }

    public static function rest_get_courses( WP_REST_Request $request ): WP_REST_Response {
        $courses = self::get_courses();
        return new WP_REST_Response( array(
            'success' => true,
            'courses' => $courses,
            'count'   => count( $courses ),
        ), 200 );
    }

    public static function rest_get_course_detail( WP_REST_Request $request ): WP_REST_Response {
        $slug = sanitize_title( (string) $request->get_param( 'slug' ) );
        $course = self::get_course_by_slug( $slug );

        if ( ! $course ) {
            return new WP_REST_Response( array(
                'success' => false,
                'message' => 'Course not found',
            ), 404 );
        }

        return new WP_REST_Response( array(
            'success' => true,
            'course'  => $course,
        ), 200 );
    }

    public static function rest_get_lesson( WP_REST_Request $request ): WP_REST_Response {
        $id = (int) $request->get_param( 'id' );
        $user_id = get_current_user_id();
        $lesson = self::get_lesson( $id, $user_id );

        if ( ! $lesson ) {
            return new WP_REST_Response( array(
                'success' => false,
                'message' => 'Lesson not found',
            ), 404 );
        }

        return new WP_REST_Response( array(
            'success' => true,
            'lesson'  => $lesson,
        ), 200 );
    }

    public static function rest_complete_lesson( WP_REST_Request $request ): WP_REST_Response {
        $lesson_id = (int) $request->get_param( 'lesson_id' );
        $user_id   = get_current_user_id() ?: 1; // Fallback to current or guest cadet

        $result = self::mark_lesson_complete( $user_id, $lesson_id );
        return new WP_REST_Response( $result, 200 );
    }

    public static function handle_frontend_progress_actions(): void {
        // Nonce-verified action fallback for non-REST requests
        if ( isset( $_POST['action'] ) && $_POST['action'] === 'hs_complete_lesson' && check_admin_referer( 'hs_lms_nonce', 'security' ) ) {
            $lesson_id = (int) ( $_POST['lesson_id'] ?? 0 );
            $user_id = get_current_user_id() ?: 1;
            if ( $lesson_id > 0 ) {
                self::mark_lesson_complete( $user_id, $lesson_id );
            }
        }
    }
}

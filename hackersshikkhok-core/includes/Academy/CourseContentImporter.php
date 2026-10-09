<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Academy;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use WP_REST_Request;
use WP_REST_Response;

/**
 * Course Content Importer & Schema Synchronizer
 * 
 * Safely, idempotently imports the 80 Master Courses and their substantive modules,
 * lessons, quizzes, labs, and assignments into WordPress CPTs ('hs_course') and PostMeta.
 * Brand: Hackers শিক্ষক (https://hackersshikkhok.com)
 */
final class CourseContentImporter {

    public static function register(): void {
        add_action( 'rest_api_init', array( self::class, 'register_admin_rest_routes' ) );
    }

    public static function register_admin_rest_routes(): void {
        register_rest_route( 'hackersshikkhok/v1', '/academy/import-courses', array(
            'methods'             => 'POST',
            'permission_callback' => static fn() => current_user_can( 'manage_options' ),
            'callback'            => array( self::class, 'handle_admin_import_request' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/academy/courses', array(
            'methods'             => 'GET',
            'permission_callback' => '__return_true',
            'callback'            => array( self::class, 'get_public_courses_catalog' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/academy/course/(?P<id>[a-zA-Z0-9_\-]+)', array(
            'methods'             => 'GET',
            'permission_callback' => '__return_true',
            'callback'            => array( self::class, 'get_single_course_detail' ),
        ) );
    }

    /**
     * Get JSON package path
     */
    private static function get_package_path(): string {
        $upload_dir = wp_upload_dir();
        $custom_path = $upload_dir['basedir'] . '/hackersshikkhok/full-courses-content-package.json';
        if ( file_exists( $custom_path ) ) {
            return $custom_path;
        }

        // Default plugin bundled package location
        return dirname( __DIR__, 2 ) . '/assets/data/full-courses-content-package.json';
    }

    /**
     * Admin REST Handler to trigger chunked batch course import
     */
    public static function handle_admin_import_request( WP_REST_Request $request ): WP_REST_Response {
        $package_path = self::get_package_path();

        if ( ! file_exists( $package_path ) ) {
            return new WP_REST_Response( array( 'success' => false, 'message' => 'Package not found' ), 404 );
        }

        $batch_size = 50;
        $offset     = (int) $request->get_param( 'offset' ) ?: 0;
        
        // This is a naive implementation; for real streaming large JSONs, 
        // a streaming parser is better. But given the constraints:
        $raw_data = file_get_contents( $package_path );
        $courses  = json_decode( (string) $raw_data, true );
        
        if ( ! is_array( $courses ) ) {
            return new WP_REST_Response( array( 'success' => false, 'message' => 'Malformed JSON' ), 400 );
        }

        $chunk = array_slice( $courses, $offset, $batch_size );
        $imported_count = 0;
        $updated_count  = 0;
        $errors         = array();

        foreach ( $chunk as $course_data ) {
            $res = self::import_single_course( $course_data );
            if ( $res['status'] === 'created' ) {
                $imported_count++;
            } elseif ( $res['status'] === 'updated' ) {
                $updated_count++;
            } else {
                $errors[] = $res['error'] ?? 'Unknown error';
            }
        }

        return new WP_REST_Response( array(
            'success'        => true,
            'imported_new'   => $imported_count,
            'updated'        => $updated_count,
            'next_offset'    => count( $chunk ) === $batch_size ? $offset + $batch_size : -1,
            'errors'         => $errors,
        ), 200 );
    }

    /**
     * Idempotently insert or update a single course and its full curriculum
     */
    public static function import_single_course( array $data ): array {
        $course_slug = sanitize_title( (string) ( $data['courseId'] ?? '' ) );
        if ( empty( $course_slug ) ) {
            return array( 'status' => 'error', 'error' => 'Missing courseId' );
        }

        // Query existing post by slug
        $existing = get_page_by_path( $course_slug, OBJECT, 'hs_course' );
        $post_title = sanitize_text_field( (string) ( $data['titleBn'] ?? $data['titleEn'] ?? 'Course' ) );
        $post_content = wp_kses_post( (string) ( $data['descriptionBn'] ?? '' ) );

        $post_data = array(
            'post_title'   => $post_title,
            'post_name'    => $course_slug,
            'post_content' => $post_content,
            'post_type'    => 'hs_course',
            'post_status'  => 'publish',
            'post_author'  => get_current_user_id() ?: 1,
        );

        $is_new = false;
        if ( $existing ) {
            $post_data['ID'] = $existing->ID;
            $post_id = wp_update_post( $post_data );
            $status = 'updated';
        } else {
            $post_id = wp_insert_post( $post_data );
            $is_new = true;
            $status = 'created';
        }

        if ( is_wp_error( $post_id ) || ! $post_id ) {
            return array( 'status' => 'error', 'error' => 'Failed to save course post.' );
        }

        // Attach complete course metadata
        update_post_meta( $post_id, '_hs_course_slug_id', $course_slug );
        update_post_meta( $post_id, '_hs_title_en', sanitize_text_field( (string) ( $data['titleEn'] ?? '' ) ) );
        update_post_meta( $post_id, '_hs_category_id', sanitize_text_field( (string) ( $data['categoryId'] ?? '' ) ) );
        update_post_meta( $post_id, '_hs_level', (int) ( $data['level'] ?? 1 ) );
        update_post_meta( $post_id, '_hs_duration_weeks', (int) ( $data['durationWeeks'] ?? 4 ) );
        update_post_meta( $post_id, '_hs_curriculum_total_lessons', (int) ( $data['totalLessonCount'] ?? 12 ) );
        update_post_meta( $post_id, '_hs_curriculum_total_labs', (int) ( $data['totalLabCount'] ?? 2 ) );
        update_post_meta( $post_id, '_hs_curriculum_total_quizzes', count( $data['quizzes'] ?? array() ) );

        // Store substantive module & lesson structure JSON
        if ( ! empty( $data['modules'] ) ) {
            update_post_meta( $post_id, '_hs_modules_json', wp_json_encode( $data['modules'] ) );
        }
        if ( ! empty( $data['quizzes'] ) ) {
            update_post_meta( $post_id, '_hs_quizzes_json', wp_json_encode( $data['quizzes'] ) );
        }
        if ( ! empty( $data['labs'] ) ) {
            update_post_meta( $post_id, '_hs_labs_json', wp_json_encode( $data['labs'] ) );
        }
        if ( ! empty( $data['assignments'] ) ) {
            update_post_meta( $post_id, '_hs_assignments_json', wp_json_encode( $data['assignments'] ) );
        }
        if ( ! empty( $data['completionRequirements'] ) ) {
            update_post_meta( $post_id, '_hs_completion_rules_json', wp_json_encode( $data['completionRequirements'] ) );
        }

        return array( 'status' => $status, 'post_id' => $post_id, 'course_slug' => $course_slug );
    }

    /**
     * Public REST API: Get all published courses
     */
    public static function get_public_courses_catalog( WP_REST_Request $request ): WP_REST_Response {
        $posts = get_posts( array(
            'post_type'      => 'hs_course',
            'post_status'    => 'publish',
            'posts_per_page' => 450,
            'orderby'        => 'date',
            'order'          => 'ASC',
        ) );

        $catalog = array();
        if ( empty( $posts ) ) {
            $pkg_path = self::get_package_path();
            if ( file_exists( $pkg_path ) ) {
                $raw = file_get_contents( $pkg_path );
                $pkg = ! empty( $raw ) ? json_decode( $raw, true ) : array();
                if ( is_array( $pkg ) ) {
                    foreach ( $pkg as $c_item ) {
                        $catalog[] = array(
                            'id'            => $c_item['courseId'] ?? 'course',
                            'post_id'       => 0,
                            'titleBn'       => $c_item['titleBn'] ?? '',
                            'titleEn'       => $c_item['titleEn'] ?? '',
                            'categoryId'    => $c_item['categoryId'] ?? 'cybersecurity',
                            'level'         => (int) ( $c_item['level'] ?? 1 ),
                            'durationWeeks' => (int) ( $c_item['durationWeeks'] ?? 4 ),
                            'lessonCount'   => (int) ( $c_item['totalLessonCount'] ?? 12 ),
                            'labCount'      => (int) ( $c_item['totalLabCount'] ?? 2 ),
                        );
                    }
                    return new WP_REST_Response( array(
                        'count'   => count( $catalog ),
                        'courses' => $catalog,
                    ), 200 );
                }
            }
        }
        foreach ( $posts as $p ) {
            $slug_id = get_post_meta( $p->ID, '_hs_course_slug_id', true ) ?: $p->post_name;
            $catalog[] = array(
                'id'            => $slug_id,
                'post_id'       => $p->ID,
                'titleBn'       => $p->post_title,
                'titleEn'       => get_post_meta( $p->ID, '_hs_title_en', true ) ?: $p->post_title,
                'categoryId'    => get_post_meta( $p->ID, '_hs_category_id', true ) ?: 'cybersecurity',
                'level'         => (int) get_post_meta( $p->ID, '_hs_level', true ) ?: 1,
                'durationWeeks' => (int) get_post_meta( $p->ID, '_hs_duration_weeks', true ) ?: 4,
                'lessonCount'   => (int) get_post_meta( $p->ID, '_hs_curriculum_total_lessons', true ) ?: 12,
                'labCount'      => (int) get_post_meta( $p->ID, '_hs_curriculum_total_labs', true ) ?: 2,
            );
        }

        return new WP_REST_Response( array(
            'count'   => count( $catalog ),
            'courses' => $catalog,
        ), 200 );
    }

    /**
     * Public REST API: Get full course detail with modules & lessons
     */
    public static function get_single_course_detail( WP_REST_Request $request ): WP_REST_Response {
        $id_or_slug = sanitize_text_field( (string) $request->get_param( 'id' ) );
        
        $post = is_numeric( $id_or_slug )
            ? get_post( (int) $id_or_slug )
            : get_page_by_path( $id_or_slug, OBJECT, 'hs_course' );

        if ( ! $post || $post->post_type !== 'hs_course' ) {
            return new WP_REST_Response( array( 'error' => 'Course not found' ), 404 );
        }

        $modules     = json_decode( (string) get_post_meta( $post->ID, '_hs_modules_json', true ), true ) ?: array();
        $quizzes     = json_decode( (string) get_post_meta( $post->ID, '_hs_quizzes_json', true ), true ) ?: array();
        $labs        = json_decode( (string) get_post_meta( $post->ID, '_hs_labs_json', true ), true ) ?: array();
        $assignments = json_decode( (string) get_post_meta( $post->ID, '_hs_assignments_json', true ), true ) ?: array();
        $rules       = json_decode( (string) get_post_meta( $post->ID, '_hs_completion_rules_json', true ), true ) ?: array();

        return new WP_REST_Response( array(
            'id'                     => get_post_meta( $post->ID, '_hs_course_slug_id', true ) ?: $post->post_name,
            'post_id'                => $post->ID,
            'titleBn'                => $post->post_title,
            'titleEn'                => get_post_meta( $post->ID, '_hs_title_en', true ),
            'categoryId'             => get_post_meta( $post->ID, '_hs_category_id', true ),
            'level'                  => (int) get_post_meta( $post->ID, '_hs_level', true ),
            'durationWeeks'          => (int) get_post_meta( $post->ID, '_hs_duration_weeks', true ),
            'descriptionBn'          => $post->post_content,
            'completionRequirements' => $rules,
            'modules'                => $modules,
            'quizzes'                => $quizzes,
            'labs'                   => $labs,
            'assignments'            => $assignments,
        ), 200 );
    }
}

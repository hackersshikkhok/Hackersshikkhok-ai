<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Core;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

final class Database {
    public const DB_VERSION = '4.1.0';

    public static function install_tables(): void {
        global $wpdb;
        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        $charset_collate = $wpdb->get_charset_collate();
        $p = $wpdb->prefix . 'hs_';

        $tables = array(
            "CREATE TABLE {$p}migrations (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                migration_id VARCHAR(64) NOT NULL,
                version VARCHAR(32) NOT NULL,
                status VARCHAR(24) NOT NULL DEFAULT 'completed',
                applied_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY  (id),
                UNIQUE KEY uq_migration_id (migration_id)
            ) $charset_collate;",
            "CREATE TABLE {$p}ai_jobs (
                job_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                job_type VARCHAR(64) NOT NULL DEFAULT 'autopilot',
                center_slug VARCHAR(64) NOT NULL,
                target_cpt VARCHAR(64) NOT NULL DEFAULT 'tutorials',
                post_id BIGINT UNSIGNED NOT NULL DEFAULT 0,
                status VARCHAR(32) NOT NULL DEFAULT 'queued',
                retry_count TINYINT UNSIGNED NOT NULL DEFAULT 0,
                quality_score TINYINT UNSIGNED NOT NULL DEFAULT 0,
                payload LONGTEXT NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY  (job_id),
                KEY idx_status_scheduled (status, created_at),
                KEY idx_center_slug (center_slug),
                KEY idx_target_post (target_cpt, post_id)
            ) $charset_collate;",
            "CREATE TABLE {$p}wallet_ledger (
                tx_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                user_id BIGINT UNSIGNED NOT NULL,
                tx_type VARCHAR(48) NOT NULL,
                amount_bdt DECIMAL(12,2) NOT NULL DEFAULT 0.00,
                balance_after DECIMAL(12,2) NOT NULL DEFAULT 0.00,
                points_delta INT NOT NULL DEFAULT 0,
                description TEXT NULL,
                reference_id VARCHAR(100) NOT NULL DEFAULT '',
                reference_hash VARCHAR(64) NOT NULL DEFAULT '',
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY  (tx_id),
                KEY idx_tx_reference (reference_id),
                KEY idx_user_created (user_id, created_at)
            ) $charset_collate;",
            "CREATE TABLE {$p}certificates (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                cert_code VARCHAR(64) NOT NULL,
                recipient_user_id BIGINT UNSIGNED NOT NULL DEFAULT 0,
                recipient_display_name VARCHAR(191) NOT NULL,
                course_id BIGINT UNSIGNED NOT NULL DEFAULT 0,
                course_title_snapshot VARCHAR(255) NOT NULL,
                level_label VARCHAR(96) NOT NULL,
                template_style VARCHAR(48) NOT NULL DEFAULT 'Ethical Security',
                sha256_signature VARCHAR(64) NOT NULL,
                status VARCHAR(24) NOT NULL DEFAULT 'valid',
                issued_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY  (id),
                UNIQUE KEY uq_cert_code (cert_code),
                KEY idx_recipient (recipient_user_id),
                KEY idx_status_issued (status, issued_at)
            ) $charset_collate;",
            "CREATE TABLE {$p}courses_progress (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                user_id BIGINT UNSIGNED NOT NULL,
                course_id BIGINT UNSIGNED NOT NULL,
                completed_lessons LONGTEXT NULL,
                completed_labs LONGTEXT NULL,
                quiz_scores LONGTEXT NULL,
                overall_percent TINYINT UNSIGNED NOT NULL DEFAULT 0,
                is_completed TINYINT UNSIGNED NOT NULL DEFAULT 0,
                completed_at DATETIME NULL,
                last_activity DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY  (id),
                UNIQUE KEY uq_user_course (user_id, course_id),
                KEY idx_user_activity (user_id, last_activity)
            ) $charset_collate;",
            "CREATE TABLE {$p}quiz_attempts (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                user_id BIGINT UNSIGNED NOT NULL,
                course_id BIGINT UNSIGNED NOT NULL,
                quiz_id VARCHAR(64) NOT NULL,
                score_percent TINYINT UNSIGNED NOT NULL DEFAULT 0,
                passed TINYINT UNSIGNED NOT NULL DEFAULT 0,
                xp_awarded INT UNSIGNED NOT NULL DEFAULT 0,
                answers_json LONGTEXT NULL,
                attempted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY  (id),
                KEY idx_user_quiz (user_id, course_id, quiz_id),
                KEY idx_attempt_date (attempted_at)
            ) $charset_collate;",
            "CREATE TABLE {$p}assignment_submissions (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                user_id BIGINT UNSIGNED NOT NULL,
                course_id BIGINT UNSIGNED NOT NULL,
                assignment_id VARCHAR(64) NOT NULL,
                submission_content LONGTEXT NOT NULL,
                attachment_url VARCHAR(255) NULL,
                status VARCHAR(24) NOT NULL DEFAULT 'pending',
                grade INT NULL,
                feedback TEXT NULL,
                graded_by BIGINT UNSIGNED DEFAULT 0,
                submitted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY  (id),
                KEY idx_user_course_assignment (user_id, course_id, assignment_id)
            ) $charset_collate;",
            "CREATE TABLE {$p}audit_logs (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                action_name VARCHAR(96) NOT NULL,
                actor_user_id BIGINT UNSIGNED NOT NULL DEFAULT 0,
                actor_ip VARCHAR(64) NOT NULL DEFAULT '',
                target_id BIGINT UNSIGNED NOT NULL DEFAULT 0,
                payload_json LONGTEXT NULL,
                severity VARCHAR(24) NOT NULL DEFAULT 'info',
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY  (id),
                KEY idx_action_created (action_name, created_at),
                KEY idx_actor (actor_user_id)
            ) $charset_collate;",
            "CREATE TABLE {$p}tool_usage (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                tool_slug VARCHAR(64) NOT NULL,
                user_id BIGINT UNSIGNED NOT NULL DEFAULT 0,
                processing_time_ms INT UNSIGNED NOT NULL DEFAULT 0,
                status VARCHAR(24) NOT NULL DEFAULT 'success',
                used_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY  (id),
                KEY idx_tool_used (tool_slug, used_at)
            ) $charset_collate;",
            "CREATE TABLE {$p}search_analytics (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                search_query VARCHAR(191) NOT NULL,
                results_count INT UNSIGNED NOT NULL DEFAULT 0,
                user_id BIGINT UNSIGNED NOT NULL DEFAULT 0,
                searched_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY  (id),
                KEY idx_query_searched (search_query, searched_at)
            ) $charset_collate;",
            "CREATE TABLE {$p}internal_links (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                source_post_id BIGINT UNSIGNED NOT NULL,
                target_post_id BIGINT UNSIGNED NOT NULL,
                relationship_type VARCHAR(48) NOT NULL,
                relevance_score TINYINT UNSIGNED NOT NULL DEFAULT 80,
                PRIMARY KEY  (id),
                UNIQUE KEY uq_link_rel (source_post_id, target_post_id, relationship_type)
            ) $charset_collate;",
            "CREATE TABLE {$p}backup_manifest (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                backup_type VARCHAR(48) NOT NULL,
                file_path VARCHAR(255) NOT NULL,
                tables_included LONGTEXT NULL,
                checksum_sha256 VARCHAR(64) NOT NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY  (id)
            ) $charset_collate;"
        );

        foreach ( $tables as $sql ) {
            dbDelta( $sql );
        }

        update_option( 'hs_core_db_version', self::DB_VERSION );
    }
}

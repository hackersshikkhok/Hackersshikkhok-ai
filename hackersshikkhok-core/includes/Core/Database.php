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
            "CREATE TABLE {$p}ppc_earnings (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                user_id BIGINT UNSIGNED NOT NULL,
                post_id BIGINT UNSIGNED NOT NULL DEFAULT 0,
                earning_type VARCHAR(32) NOT NULL DEFAULT 'view',
                amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
                status VARCHAR(24) NOT NULL DEFAULT 'approved',
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY  (id),
                KEY idx_user_type (user_id, earning_type),
                KEY idx_post (post_id)
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
            ) $charset_collate;",
            "CREATE TABLE {$p}custom_tools (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                tool_slug VARCHAR(64) NOT NULL,
                tool_name VARCHAR(128) NOT NULL,
                center_slug VARCHAR(64) NOT NULL,
                category_slug VARCHAR(64) NOT NULL,
                icon VARCHAR(64) NOT NULL DEFAULT 'Terminal',
                description TEXT NOT NULL,
                input_schema LONGTEXT NULL,
                output_type VARCHAR(48) NOT NULL DEFAULT 'text',
                processor_type VARCHAR(48) NOT NULL DEFAULT 'client',
                status VARCHAR(24) NOT NULL DEFAULT 'published',
                version VARCHAR(16) NOT NULL DEFAULT '1.0.0',
                seo_title VARCHAR(191) NULL,
                seo_description TEXT NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY  (id),
                UNIQUE KEY uq_tool_slug (tool_slug),
                KEY idx_center_cat (center_slug, category_slug),
                KEY idx_status (status)
            ) $charset_collate;",
            "CREATE TABLE {$p}courses (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                slug VARCHAR(128) NOT NULL,
                title VARCHAR(255) NOT NULL,
                category VARCHAR(64) NOT NULL DEFAULT 'Web Hacking / OWASP',
                description TEXT NULL,
                level VARCHAR(32) NOT NULL DEFAULT 'beginner',
                difficulty_tier VARCHAR(48) NOT NULL DEFAULT 'Script Kiddie',
                estimated_lab_hours DECIMAL(5,1) NOT NULL DEFAULT 6.5,
                price_bdt DECIMAL(10,2) NOT NULL DEFAULT 0.00,
                thumbnail VARCHAR(255) NULL,
                xp_reward INT UNSIGNED NOT NULL DEFAULT 500,
                reward_matrix LONGTEXT NULL,
                prerequisite_tree LONGTEXT NULL,
                completion_badge_id VARCHAR(64) NOT NULL DEFAULT 'cyber-badge-bronze',
                certificate_enabled TINYINT(1) NOT NULL DEFAULT 1,
                instructor VARCHAR(128) NOT NULL DEFAULT 'Hackers Shikkhok Cyber Faculty',
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY  (id),
                UNIQUE KEY uq_course_slug (slug),
                KEY idx_course_cat (category),
                KEY idx_course_level (level),
                KEY idx_diff_tier (difficulty_tier)
            ) $charset_collate;",
            "CREATE TABLE {$p}modules (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                course_id BIGINT UNSIGNED NOT NULL,
                title VARCHAR(255) NOT NULL,
                summary TEXT NULL,
                sort_order INT NOT NULL DEFAULT 0,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY  (id),
                KEY idx_module_course (course_id, sort_order)
            ) $charset_collate;",
            "CREATE TABLE {$p}lessons (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                module_id BIGINT UNSIGNED NOT NULL,
                course_id BIGINT UNSIGNED NOT NULL,
                slug VARCHAR(128) NOT NULL,
                title VARCHAR(255) NOT NULL,
                content_md LONGTEXT NULL,
                video_url VARCHAR(255) NULL,
                video_provider VARCHAR(32) NOT NULL DEFAULT 'bunny_stream',
                svg_diagram_key VARCHAR(64) NULL,
                is_free TINYINT(1) NOT NULL DEFAULT 0,
                sort_order INT NOT NULL DEFAULT 0,
                duration_mins INT NOT NULL DEFAULT 15,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY  (id),
                UNIQUE KEY uq_lesson_slug (course_id, slug),
                KEY idx_lesson_module (module_id, sort_order)
            ) $charset_collate;",
            "CREATE TABLE {$p}ctf_flags (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                lesson_id BIGINT UNSIGNED NOT NULL,
                course_id BIGINT UNSIGNED NOT NULL,
                challenge_title VARCHAR(255) NOT NULL,
                flag_hash VARCHAR(64) NOT NULL,
                flag_salt VARCHAR(32) NOT NULL DEFAULT 'hs_ctf_salt',
                hint TEXT NULL,
                xp_reward INT UNSIGNED NOT NULL DEFAULT 150,
                bdt_reward DECIMAL(10,2) NOT NULL DEFAULT 25.00,
                difficulty VARCHAR(32) NOT NULL DEFAULT 'medium',
                target_service VARCHAR(64) NOT NULL DEFAULT 'mock_terminal',
                solved_count INT UNSIGNED NOT NULL DEFAULT 0,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY  (id),
                KEY idx_ctf_lesson (lesson_id),
                KEY idx_ctf_course (course_id)
            ) $charset_collate;",
            "CREATE TABLE {$p}ctf_submissions (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                user_id BIGINT UNSIGNED NOT NULL,
                flag_id BIGINT UNSIGNED NOT NULL,
                submitted_flag VARCHAR(128) NOT NULL,
                is_correct TINYINT(1) NOT NULL DEFAULT 0,
                xp_awarded INT UNSIGNED NOT NULL DEFAULT 0,
                bdt_awarded DECIMAL(10,2) NOT NULL DEFAULT 0.00,
                ip_address VARCHAR(45) NOT NULL DEFAULT '',
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY  (id),
                KEY idx_user_flag (user_id, flag_id),
                KEY idx_correct_user (user_id, is_correct)
            ) $charset_collate;",
            "CREATE TABLE {$p}user_wallet (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                user_id BIGINT UNSIGNED NOT NULL,
                balance_bdt DECIMAL(12,2) NOT NULL DEFAULT 0.00,
                xp_points INT UNSIGNED NOT NULL DEFAULT 0,
                level INT UNSIGNED NOT NULL DEFAULT 1,
                rank_title VARCHAR(64) NOT NULL DEFAULT 'Cyber Cadet',
                power_level VARCHAR(32) NOT NULL DEFAULT 'low',
                pending_payout DECIMAL(12,2) NOT NULL DEFAULT 0.00,
                updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY  (id),
                UNIQUE KEY uq_wallet_user (user_id)
            ) $charset_collate;",
            "CREATE TABLE {$p}cyber_certificates (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                user_id BIGINT UNSIGNED NOT NULL,
                course_id BIGINT UNSIGNED NOT NULL,
                verification_hash VARCHAR(64) NOT NULL,
                student_name VARCHAR(191) NOT NULL,
                course_title VARCHAR(255) NOT NULL,
                xp_earned INT UNSIGNED NOT NULL DEFAULT 0,
                bdt_awarded DECIMAL(10,2) NOT NULL DEFAULT 0.00,
                qr_code_url VARCHAR(255) NULL,
                certificate_pdf_url VARCHAR(255) NULL,
                issued_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY  (id),
                UNIQUE KEY uq_cert_hash (verification_hash),
                KEY idx_cert_user_course (user_id, course_id)
            ) $charset_collate;",
            "CREATE TABLE {$p}payment_transactions (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                user_id BIGINT UNSIGNED NOT NULL,
                gateway VARCHAR(32) NOT NULL DEFAULT 'bkash',
                trx_id VARCHAR(128) NOT NULL,
                amount_bdt DECIMAL(12,2) NOT NULL,
                status VARCHAR(24) NOT NULL DEFAULT 'pending',
                signature_hash VARCHAR(128) NOT NULL,
                payload_json LONGTEXT NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY  (id),
                UNIQUE KEY uq_trx_id (trx_id),
                KEY idx_pay_user (user_id),
                KEY idx_pay_status (status)
            ) $charset_collate;",
            "CREATE TABLE {$p}user_behavior_analytics (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                user_id BIGINT UNSIGNED NOT NULL DEFAULT 0,
                session_token VARCHAR(128) NOT NULL,
                event_type VARCHAR(64) NOT NULL,
                category VARCHAR(64) NULL,
                metadata_json LONGTEXT NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY  (id),
                KEY idx_analytics_session (session_token),
                KEY idx_analytics_event (event_type),
                KEY idx_analytics_cat (category)
            ) $charset_collate;"
        );

        foreach ( $tables as $sql ) {
            dbDelta( $sql );
        }

        update_option( 'hs_core_db_version', self::DB_VERSION );
    }
}

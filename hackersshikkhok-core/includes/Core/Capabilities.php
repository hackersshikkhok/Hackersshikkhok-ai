<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Core;

final class Capabilities {
    public static function register_roles_and_caps(): void {
        add_role( 'hs_developer', __( 'Developer', 'hackersshikkhok-core' ), array(
            'read'           => true,
            'hs_submit_code' => true,
            'hs_use_sandbox' => true,
        ) );
        add_role( 'hs_instructor', __( 'Instructor', 'hackersshikkhok-core' ), array(
            'read'             => true,
            'hs_create_course' => true,
            'hs_submit_code'   => true,
        ) );
        add_role( 'hs_researcher', __( 'Security Researcher', 'hackersshikkhok-core' ), array(
            'read'              => true,
            'hs_submit_cyber'   => true,
            'hs_use_device_lab' => true,
        ) );
        add_role( 'hs_moderator', __( 'Moderator', 'hackersshikkhok-core' ), array(
            'read'                 => true,
            'hs_review_submission' => true,
            'hs_moderate_forum'    => true,
            'hs_manage_reports'    => true,
        ) );
        add_role( 'hs_verified_creator', __( 'Verified Creator', 'hackersshikkhok-core' ), array(
            'read'               => true,
            'hs_submit_code'     => true,
            'hs_create_project'  => true,
            'hs_use_ai_assisted' => true,
        ) );
    }
}

<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Core;

use HackersShikkhok\Core\PostTypes\PostTypeRegistrar;
use HackersShikkhok\Core\Taxonomies\TaxonomyRegistrar;
use HackersShikkhok\Core\Centers\CenterManager;
use HackersShikkhok\Core\Code\CodeLibrary;
use HackersShikkhok\Core\Demo\LiveDemo;
use HackersShikkhok\Core\Tools\ToolsEngine;
use HackersShikkhok\Core\Tools\CssRgbLab;
use HackersShikkhok\Core\Tools\AdvancedWebToolsSuite;
use HackersShikkhok\Core\AI\UniversalAutopilotEngine;
use HackersShikkhok\Core\AI\AiTutorEngine;
use HackersShikkhok\Core\SEO\SeoEngine;
use HackersShikkhok\Core\SEO\NativeSeoAndSitemapEngine;
use HackersShikkhok\Core\SEO\InternalLinker;
use HackersShikkhok\Core\Integrations\NativeGoogleAndAdsEngine;
use HackersShikkhok\Core\Email\NativeBrandedEmailEngine;
use HackersShikkhok\Core\Auth\NativeBrandedAuthEngine;
use HackersShikkhok\Core\Editor\NativeClassicEditorEngine;
use HackersShikkhok\Core\Academy\CyberAcademyLmsEngine;
use HackersShikkhok\Core\Academy\CourseContentImporter;
use HackersShikkhok\Core\LMS\Course_Manager;
use HackersShikkhok\Core\LMS\CTF_Engine;
use HackersShikkhok\Core\LMS\SVG_Annotator;
use HackersShikkhok\Core\LMS\Bulk_Course_Importer;
use HackersShikkhok\Core\LMS\Theming_Engine;
use HackersShikkhok\Core\LMS\Certificate_Engine;
use HackersShikkhok\Core\LMS\Wallet_Economy;
use HackersShikkhok\Core\LMS\Video_Stream_Shield;
use HackersShikkhok\Core\Security\Content_Protection_Lock;
use HackersShikkhok\Core\AI\Behavioral_Analytics_Engine;
use HackersShikkhok\Core\AI\Autopilot;
use HackersShikkhok\Core\Labs\HardwareAndIotEngine;
use HackersShikkhok\Core\Labs\EngineeringAndCncLab;
use HackersShikkhok\Core\Labs\EliteTriPlatformExpansionSuite;
use HackersShikkhok\Core\Labs\LabPeaksControllerStore;
use HackersShikkhok\Core\Community\GamificationAndChallenges;
use HackersShikkhok\Core\Community\BookmarksAndNotifications;
use HackersShikkhok\Core\Security\SecurityManager;
use HackersShikkhok\Core\Security\SecurityAwarenessDefenseLab;
use HackersShikkhok\Core\API\RestController;
use HackersShikkhok\Core\Community\UniversalInteractionEngine;
use HackersShikkhok\Core\Earnings\PostPayCounterEngine;
use HackersShikkhok\Core\Core\UltimateHackersMasterEngine;
use HackersShikkhok\Core\Core\EliteGlobalPlatformEngine;
use HackersShikkhok\Core\Dashboard\ControlCenter;
use HackersShikkhok\Core\Dashboard\PostPayCounterAdmin;

final class Plugin {
    private static ?self $instance = null;

    public static function instance(): self {
        if ( null === self::$instance ) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function boot(): void {
        SecurityManager::register();
        SecurityAwarenessDefenseLab::register();
        PostTypeRegistrar::register();
        TaxonomyRegistrar::register();
        CenterManager::register();
        CodeLibrary::register();
        LiveDemo::register();
        ToolsEngine::register();
        CssRgbLab::register();
        AdvancedWebToolsSuite::register();
        UniversalAutopilotEngine::register();
        UniversalInteractionEngine::register();
        PostPayCounterEngine::register();
        SeoEngine::register();
        NativeSeoAndSitemapEngine::register();
        NativeGoogleAndAdsEngine::register();
        NativeBrandedEmailEngine::register();
        NativeBrandedAuthEngine::register();
        NativeClassicEditorEngine::register();
        CyberAcademyLmsEngine::register();
        CourseContentImporter::register();
        Course_Manager::register();
        CTF_Engine::register();
        SVG_Annotator::register();
        Bulk_Course_Importer::register();
        Theming_Engine::register();
        Certificate_Engine::register();
        Wallet_Economy::register();
        Video_Stream_Shield::register();
        Content_Protection_Lock::register();
        Behavioral_Analytics_Engine::register();
        Autopilot::register();
        HardwareAndIotEngine::register();
        EngineeringAndCncLab::register();
        EliteTriPlatformExpansionSuite::register();
        LabPeaksControllerStore::register();
        GamificationAndChallenges::register();
        BookmarksAndNotifications::register();
        AiTutorEngine::register();
        InternalLinker::register();
        RestController::register();
        UltimateHackersMasterEngine::register();
        EliteGlobalPlatformEngine::register();
        EcosystemControlCenter::register();

        if ( is_admin() ) {
            ControlCenter::register();
            PostPayCounterAdmin::register();
        }
    }
}

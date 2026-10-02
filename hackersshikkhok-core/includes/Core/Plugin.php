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
use HackersShikkhok\Core\AI\UniversalAutopilotEngine;
use HackersShikkhok\Core\SEO\SeoEngine;
use HackersShikkhok\Core\SEO\NativeSeoAndSitemapEngine;
use HackersShikkhok\Core\SEO\InternalLinker;
use HackersShikkhok\Core\Integrations\NativeGoogleAndAdsEngine;
use HackersShikkhok\Core\Email\NativeBrandedEmailEngine;
use HackersShikkhok\Core\Auth\NativeBrandedAuthEngine;
use HackersShikkhok\Core\Editor\NativeClassicEditorEngine;
use HackersShikkhok\Core\Academy\CyberAcademyLmsEngine;
use HackersShikkhok\Core\Security\SecurityManager;
use HackersShikkhok\Core\API\RestController;
use HackersShikkhok\Core\Community\UniversalInteractionEngine;
use HackersShikkhok\Core\Dashboard\ControlCenter;

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
        PostTypeRegistrar::register();
        TaxonomyRegistrar::register();
        CenterManager::register();
        CodeLibrary::register();
        LiveDemo::register();
        ToolsEngine::register();
        CssRgbLab::register();
        UniversalAutopilotEngine::register();
        UniversalInteractionEngine::register();
        SeoEngine::register();
        NativeSeoAndSitemapEngine::register();
        NativeGoogleAndAdsEngine::register();
        NativeBrandedEmailEngine::register();
        NativeBrandedAuthEngine::register();
        NativeClassicEditorEngine::register();
        CyberAcademyLmsEngine::register();
        InternalLinker::register();
        RestController::register();

        if ( is_admin() ) {
            ControlCenter::register();
        }
    }
}

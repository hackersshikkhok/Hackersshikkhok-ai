<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\AI;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use WP_REST_Request;
use WP_REST_Response;

/**
 * AI Tutor & Contextual Academy Assistant Engine
 * Provides interactive educational assistance, code debugging, and step hints without revealing exam keys.
 * Brand: Hackers শিক্ষক (https://hackersshikkhok.com)
 */
final class AiTutorEngine {

    public static function register(): void {
        add_action( 'rest_api_init', array( self::class, 'register_rest_routes' ) );
    }

    public static function register_rest_routes(): void {
        register_rest_route( 'hackersshikkhok/v1', '/ai/tutor/ask', array(
            'methods'             => 'POST',
            'permission_callback' => static fn() => is_user_logged_in(),
            'callback'            => array( self::class, 'handle_tutor_query' ),
        ) );
    }

    public static function handle_tutor_query( WP_REST_Request $request ): WP_REST_Response {
        $query      = sanitize_text_field( (string) $request->get_param( 'query' ) );
        $lesson_ctx = sanitize_text_field( (string) $request->get_param( 'lesson_context' ) ?: 'General Cybersecurity' );
        $mode       = sanitize_key( (string) $request->get_param( 'mode' ) ?: 'explain' ); // explain, hint, simpler, debug

        if ( empty( $query ) ) {
            return new WP_REST_Response( array( 'error' => 'Query is required.' ), 400 );
        }

        // Safety Filter: Prevent cheating or blackhat exploits
        $lower_q = strtolower( $query );
        if ( str_contains( $lower_q, 'give me quiz answers' ) || str_contains( $lower_q, 'dump exam keys' ) ) {
            return new WP_REST_Response( array(
                'success' => true,
                'response'=> "🛡️ **AI Tutor Security Notice:** I can guide you through the foundational concepts and explain how to analyze the problem, but I cannot give direct answers to graded assessments. Would you like a conceptual breakdown of this topic?",
                'model'   => 'HackersShikkhok-Tutor-Guard',
            ), 200 );
        }

        $prompt = sprintf(
            "You are the AI Tutor for HackersShikkhok.com Academy. Lesson Context: '%s'. Mode: '%s'. Student Question: '%s'.\n" .
            "Provide an encouraging, accurate, pedagogical response formatted in Markdown with code blocks where helpful.",
            $lesson_ctx,
            $mode,
            $query
        );

        $ai_res = UniversalAutopilotEngine::request_ai_generation( $prompt, 'tutorials' );

        return new WP_REST_Response( array(
            'success'   => true,
            'response'  => $ai_res['content'] ?: "Here is how to approach this concept in {$lesson_ctx}: Focus on defense-in-depth principles, validate inputs on the server, and verify token signatures.",
            'provider'  => $ai_res['provider'],
            'model'     => $ai_res['model'],
            'mode'      => $mode,
        ), 200 );
    }
}

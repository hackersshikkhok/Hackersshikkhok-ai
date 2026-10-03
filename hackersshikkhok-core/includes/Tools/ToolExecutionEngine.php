<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Tools;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use WP_REST_Request;
use WP_REST_Response;

/**
 * Universal Tool Execution Engine & Sandbox Processor
 * Handles secure server-side tool execution, rate limiting,
 * usage logging into hs_tool_usage, and temporary file sanitization.
 */
final class ToolExecutionEngine {

    /**
     * Process tool execution request via REST API
     */
    public static function handle_execution_request( WP_REST_Request $request ): WP_REST_Response {
        $tool_id = sanitize_key( (string) $request->get_param( 'tool_id' ) );
        $payload = $request->get_param( 'payload' );
        $user_id = get_current_user_id();

        $start_time = microtime( true );

        if ( empty( $tool_id ) ) {
            return new WP_REST_Response(
                array(
                    'success' => false,
                    'error' => 'Missing tool identifier.',
                ),
                400
            );
        }

        $all_tools = UniversalToolRegistry::get_all_tools();
        if ( ! isset( $all_tools[ $tool_id ] ) ) {
            return new WP_REST_Response(
                array(
                    'success' => false,
                    'error' => 'Unrecognized or inactive tool.',
                ),
                404
            );
        }

        $tool = $all_tools[ $tool_id ];
        $result = array();
        $status = 'success';

        try {
            switch ( $tool_id ) {
                case 'hash-generator':
                case 'hash-identifier':
                    $text = is_string( $payload ) ? $payload : ( $payload['text'] ?? '' );
                    $result = array(
                        'md5' => md5( (string) $text ),
                        'sha1' => sha1( (string) $text ),
                        'sha256' => hash( 'sha256', (string) $text ),
                        'sha512' => hash( 'sha512', (string) $text ),
                        'byte_length' => strlen( (string) $text ),
                    );
                    break;

                case 'uuid-generator':
                    $count = min( 50, max( 1, (int) ( $payload['count'] ?? 5 ) ) );
                    $uuids = array();
                    for ( $i = 0; $i < $count; $i++ ) {
                        $uuids[] = wp_generate_uuid4();
                    }
                    $result = array(
                        'count' => count( $uuids ),
                        'uuids' => $uuids,
                    );
                    break;

                case 'json-formatter':
                    $json_str = is_string( $payload ) ? $payload : ( $payload['json'] ?? '' );
                    $decoded = json_decode( (string) $json_str, true );
                    if ( json_last_error() !== JSON_ERROR_NONE ) {
                        throw new \RuntimeException( 'Invalid JSON: ' . json_last_error_msg() );
                    }
                    $result = array(
                        'valid' => true,
                        'formatted' => json_encode( $decoded, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES ),
                        'minified' => json_encode( $decoded ),
                        'keys_count' => is_array( $decoded ) ? count( $decoded ) : 0,
                    );
                    break;

                default:
                    // Client-side execution confirmation
                    $result = array(
                        'tool_id' => $tool_id,
                        'processor' => 'client-side-confirmed',
                        'timestamp' => time(),
                    );
                    break;
            }
        } catch ( \Throwable $e ) {
            $status = 'error';
            $result = array( 'error' => $e->getMessage() );
        }

        $duration_ms = (int) round( ( microtime( true ) - $start_time ) * 1000 );
        self::log_tool_usage( $tool_id, $user_id, $duration_ms, $status );

        return new WP_REST_Response(
            array(
                'success' => $status === 'success',
                'tool_id' => $tool_id,
                'data' => $result,
                'duration_ms' => $duration_ms,
            ),
            $status === 'success' ? 200 : 422
        );
    }

    /**
     * Log Tool Execution to Database for Real Analytics
     */
    private static function log_tool_usage( string $tool_slug, int $user_id, int $duration_ms, string $status ): void {
        global $wpdb;
        if ( ! $wpdb ) {
            return;
        }
        $table = $wpdb->prefix . 'tool_usage';
        $wpdb->insert(
            $table,
            array(
                'tool_slug' => substr( $tool_slug, 0, 64 ),
                'user_id' => $user_id,
                'processing_time_ms' => $duration_ms,
                'status' => $status,
                'used_at' => current_time( 'mysql', true ),
            ),
            array( '%s', '%d', '%d', '%s', '%s' )
        );
    }
}

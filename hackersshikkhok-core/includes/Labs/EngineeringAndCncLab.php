<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Labs;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use WP_REST_Request;
use WP_REST_Response;

/**
 * Engineering Lab & CNC / Fabrication Tool Suite
 * High-precision calculators for Electrical, Mechanical, and CNC machining workflows.
 * Brand: Hackers শিক্ষক (https://hackersshikkhok.com)
 */
final class EngineeringAndCncLab {

    public static function register(): void {
        add_action( 'rest_api_init', array( self::class, 'register_rest_routes' ) );
    }

    public static function register_rest_routes(): void {
        register_rest_route( 'hackersshikkhok/v1', '/engineering/calculate', array(
            'methods'             => 'POST',
            'permission_callback' => '__return_true',
            'callback'            => array( self::class, 'handle_calculation' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/engineering/gcode-parse', array(
            'methods'             => 'POST',
            'permission_callback' => '__return_true',
            'callback'            => array( self::class, 'parse_gcode' ),
        ) );
    }

    public static function handle_calculation( WP_REST_Request $request ): WP_REST_Response {
        $calc_type = sanitize_key( (string) $request->get_param( 'calc_type' ) );
        $params    = (array) $request->get_param( 'params' );

        switch ( $calc_type ) {
            case 'ohms_law':
                $v = isset( $params['voltage'] ) ? (float) $params['voltage'] : null;
                $i = isset( $params['current'] ) ? (float) $params['current'] : null;
                $r = isset( $params['resistance'] ) ? (float) $params['resistance'] : null;

                if ( null === $v && null !== $i && null !== $r ) {
                    $v = $i * $r;
                } elseif ( null === $i && null !== $v && null !== $r && 0.0 !== $r ) {
                    $i = $v / $r;
                } elseif ( null === $r && null !== $v && null !== $i && 0.0 !== $i ) {
                    $r = $v / $i;
                }
                $p = ( null !== $v && null !== $i ) ? ( $v * $i ) : 0.0;

                return new WP_REST_Response( array(
                    'voltage'    => round( (float) $v, 4 ),
                    'current'    => round( (float) $i, 4 ),
                    'resistance' => round( (float) $r, 4 ),
                    'power_watts'=> round( (float) $p, 4 ),
                ), 200 );

            case 'voltage_divider':
                $vin = (float) ( $params['vin'] ?? 5.0 );
                $r1  = (float) ( $params['r1'] ?? 1000.0 );
                $r2  = (float) ( $params['r2'] ?? 1000.0 );
                $vout = ( $r1 + $r2 > 0 ) ? ( $vin * ( $r2 / ( $r1 + $r2 ) ) ) : 0.0;

                return new WP_REST_Response( array(
                    'vin'  => $vin,
                    'r1'   => $r1,
                    'r2'   => $r2,
                    'vout' => round( $vout, 4 ),
                ), 200 );

            case 'cnc_feed_rate':
                $rpm       = (float) ( $params['rpm'] ?? 12000.0 );
                $flutes    = (int) ( $params['flutes'] ?? 2 );
                $chipload  = (float) ( $params['chipload'] ?? 0.05 ); // mm per tooth
                $feed_rate = $rpm * $flutes * $chipload; // mm/min

                return new WP_REST_Response( array(
                    'spindle_rpm' => $rpm,
                    'flute_count' => $flutes,
                    'chipload_mm' => $chipload,
                    'feed_rate_mmpm' => round( $feed_rate, 2 ),
                ), 200 );

            case 'battery_runtime':
                $capacity_mah = (float) ( $params['capacity_mah'] ?? 2500.0 );
                $load_ma      = (float) ( $params['load_ma'] ?? 150.0 );
                $efficiency   = (float) ( $params['efficiency'] ?? 0.85 );
                $hours        = ( $load_ma > 0 ) ? ( ( $capacity_mah * $efficiency ) / $load_ma ) : 0.0;

                return new WP_REST_Response( array(
                    'capacity_mah'  => $capacity_mah,
                    'load_ma'       => $load_ma,
                    'runtime_hours' => round( $hours, 2 ),
                    'runtime_days'  => round( $hours / 24, 2 ),
                ), 200 );

            default:
                return new WP_REST_Response( array( 'error' => 'Unknown calculation type.' ), 400 );
        }
    }

    public static function parse_gcode( WP_REST_Request $request ): WP_REST_Response {
        $gcode = (string) $request->get_param( 'gcode' );
        if ( empty( $gcode ) ) {
            return new WP_REST_Response( array( 'error' => 'G-code snippet is required.' ), 400 );
        }

        $lines = explode( "\n", $gcode );
        $stats = array(
            'total_lines' => count( $lines ),
            'g0_rapid'    => 0,
            'g1_linear'   => 0,
            'g2_arc_cw'   => 0,
            'g3_arc_ccw'  => 0,
            'tool_changes'=> 0,
            'max_x'       => 0.0,
            'max_y'       => 0.0,
            'max_z'       => 0.0,
        );

        foreach ( $lines as $line ) {
            $line = trim( strtoupper( $line ) );
            if ( str_starts_with( $line, 'G0 ' ) || str_starts_with( $line, 'G00' ) ) $stats['g0_rapid']++;
            if ( str_starts_with( $line, 'G1 ' ) || str_starts_with( $line, 'G01' ) ) $stats['g1_linear']++;
            if ( str_starts_with( $line, 'G2 ' ) || str_starts_with( $line, 'G02' ) ) $stats['g2_arc_cw']++;
            if ( str_starts_with( $line, 'G3 ' ) || str_starts_with( $line, 'G03' ) ) $stats['g3_arc_ccw']++;
            if ( str_starts_with( $line, 'M6' ) || str_starts_with( $line, 'T' ) ) $stats['tool_changes']++;

            if ( preg_match( '/X([0-9\.\-]+)/', $line, $mx ) ) {
                $stats['max_x'] = max( $stats['max_x'], (float) $mx[1] );
            }
            if ( preg_match( '/Y([0-9\.\-]+)/', $line, $my ) ) {
                $stats['max_y'] = max( $stats['max_y'], (float) $my[1] );
            }
            if ( preg_match( '/Z([0-9\.\-]+)/', $line, $mz ) ) {
                $stats['max_z'] = max( $stats['max_z'], (float) $mz[1] );
            }
        }

        return new WP_REST_Response( array(
            'success' => true,
            'stats'   => $stats,
        ), 200 );
    }
}

<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Labs;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use WP_REST_Request;
use WP_REST_Response;

/**
 * Hardware Lab & IoT Secure Device Telemetry Hub
 * Supports Arduino, ESP32, Raspberry Pi projects, device registration, and encrypted telemetry ingest.
 * Brand: Hackers শিক্ষক (https://hackersshikkhok.com)
 */
final class HardwareAndIotEngine {

    public static function register(): void {
        add_action( 'rest_api_init', array( self::class, 'register_rest_routes' ) );
    }

    public static function register_rest_routes(): void {
        register_rest_route( 'hackersshikkhok/v1', '/iot/devices', array(
            'methods'             => 'GET',
            'permission_callback' => static fn() => is_user_logged_in(),
            'callback'            => array( self::class, 'get_user_devices' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/iot/devices/register', array(
            'methods'             => 'POST',
            'permission_callback' => static fn() => is_user_logged_in(),
            'callback'            => array( self::class, 'register_device' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/iot/telemetry/ingest', array(
            'methods'             => 'POST',
            'permission_callback' => '__return_true', // Validated via Bearer Device API Secret
            'callback'            => array( self::class, 'ingest_telemetry' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/hardware/projects', array(
            'methods'             => 'GET',
            'permission_callback' => '__return_true',
            'callback'            => array( self::class, 'get_hardware_catalog' ),
        ) );
    }

    public static function get_hardware_catalog( WP_REST_Request $request ): WP_REST_Response {
        $category = sanitize_key( (string) $request->get_param( 'category' ) ?: 'all' );

        $projects = array(
            array(
                'id'          => 'hw_esp32_air_sentinel',
                'title'       => 'ESP32 Zero-Trust Air Sentinel & MQTT Gateway',
                'category'    => 'esp32',
                'difficulty'  => 'Intermediate',
                'duration'    => '3 Hours',
                'components'  => array( 'ESP32 DevKit v1', 'BME680 Sensor', 'OLED 0.96" I2C', 'Breadboard' ),
                'schematic'   => 'I2C SDA->GPIO21, SCL->GPIO22, VCC->3.3V, GND->GND',
                'code_url'    => home_url( '/code/esp32-air-sentinel' ),
                'firmware'    => 'C++ / Arduino IDE / PlatformIO',
            ),
            array(
                'id'          => 'hw_rpi_honeypot',
                'title'       => 'Raspberry Pi 4 Threat Detection & Defensive Honeypot',
                'category'    => 'raspberry_pi',
                'difficulty'  => 'Advanced',
                'duration'    => '4 Hours',
                'components'  => array( 'Raspberry Pi 4 4GB', '32GB MicroSD', 'Gigabit Ethernet', 'Heat Sinks' ),
                'schematic'   => 'Isolated VLAN port forwarding with Cowrie SSH honeypot',
                'code_url'    => home_url( '/code/rpi-defensive-honeypot' ),
                'firmware'    => 'Raspberry Pi OS Lite 64-bit + Docker',
            ),
            array(
                'id'          => 'hw_arduino_can_bus',
                'title'       => 'Arduino Uno Automotive CAN-Bus Sniffer & Analyzer',
                'category'    => 'arduino',
                'difficulty'  => 'Intermediate',
                'duration'    => '2.5 Hours',
                'components'  => array( 'Arduino Uno R3', 'MCP2515 CAN Module', '120 Ohm Terminator' ),
                'schematic'   => 'SPI CS->D10, MOSI->D11, MISO->D12, SCK->D13, INT->D2',
                'code_url'    => home_url( '/code/arduino-can-bus-sniffer' ),
                'firmware'    => 'Arduino C++ + CAN_BUS_Shield Lib',
            ),
        );

        if ( 'all' !== $category ) {
            $projects = array_values( array_filter( $projects, fn( $p ) => $p['category'] === $category ) );
        }

        return new WP_REST_Response( array(
            'success'  => true,
            'count'    => count( $projects ),
            'projects' => $projects,
        ), 200 );
    }

    public static function register_device( WP_REST_Request $request ): WP_REST_Response {
        global $wpdb;
        $user_id     = get_current_user_id();
        $device_name = sanitize_text_field( (string) $request->get_param( 'device_name' ) );
        $device_type = sanitize_key( (string) $request->get_param( 'device_type' ) ?: 'esp32' );

        if ( empty( $device_name ) ) {
            return new WP_REST_Response( array( 'error' => 'Device name is required.' ), 400 );
        }

        $device_id   = 'HS-DEV-' . strtoupper( wp_generate_password( 8, false, false ) );
        $api_secret  = 'hs_sec_' . wp_generate_password( 32, true, true );
        $secret_hash = wp_hash_password( $api_secret );

        $devices = (array) get_user_meta( $user_id, '_hs_iot_devices', true );
        $devices[ $device_id ] = array(
            'device_id'   => $device_id,
            'device_name' => $device_name,
            'device_type' => $device_type,
            'secret_hash' => $secret_hash,
            'status'      => 'registered',
            'created_at'  => gmdate( 'c' ),
            'last_seen'   => null,
            'telemetry'   => array(),
        );

        update_user_meta( $user_id, '_hs_iot_devices', $devices );

        return new WP_REST_Response( array(
            'success'     => true,
            'device_id'   => $device_id,
            'device_name' => $device_name,
            'device_type' => $device_type,
            'api_secret'  => $api_secret, // Exposed only once upon registration
            'message'     => 'Store this API secret securely. It will not be shown again.',
        ), 201 );
    }

    public static function get_user_devices( WP_REST_Request $request ): WP_REST_Response {
        $user_id = get_current_user_id();
        $devices = (array) get_user_meta( $user_id, '_hs_iot_devices', true );

        // Strip secret hashes from read responses
        $sanitized = array_map( function( $d ) {
            unset( $d['secret_hash'] );
            return $d;
        }, array_values( $devices ) );

        return new WP_REST_Response( array(
            'success' => true,
            'devices' => $sanitized,
        ), 200 );
    }

    public static function ingest_telemetry( WP_REST_Request $request ): WP_REST_Response {
        $auth_header = $request->get_header( 'authorization' ) ?: '';
        if ( ! str_starts_with( $auth_header, 'Bearer ' ) ) {
            return new WP_REST_Response( array( 'error' => 'Missing authorization token.' ), 401 );
        }

        $token     = substr( $auth_header, 7 );
        $device_id = sanitize_text_field( (string) $request->get_param( 'device_id' ) );
        $payload   = $request->get_param( 'telemetry' );

        if ( empty( $device_id ) || ! is_array( $payload ) ) {
            return new WP_REST_Response( array( 'error' => 'Invalid device telemetry payload.' ), 400 );
        }

        // Locate device across users
        global $wpdb;
        $users_with_devices = $wpdb->get_results( "SELECT user_id, meta_value FROM {$wpdb->usermeta} WHERE meta_key = '_hs_iot_devices'", ARRAY_A );

        $found_user_id = null;
        $found_device  = null;

        foreach ( $users_with_devices as $row ) {
            $user_devs = maybe_unserialize( $row['meta_value'] );
            if ( is_array( $user_devs ) && isset( $user_devs[ $device_id ] ) ) {
                $found_user_id = (int) $row['user_id'];
                $found_device  = $user_devs[ $device_id ];
                break;
            }
        }

        if ( ! $found_device || ! wp_check_password( $token, $found_device['secret_hash'] ) ) {
            return new WP_REST_Response( array( 'error' => 'Invalid device credentials or signature.' ), 403 );
        }

        // Record Telemetry
        $all_devs = (array) get_user_meta( $found_user_id, '_hs_iot_devices', true );
        $all_devs[ $device_id ]['last_seen'] = gmdate( 'c' );
        $all_devs[ $device_id ]['telemetry'] = $payload;
        $all_devs[ $device_id ]['status']    = 'online';

        update_user_meta( $found_user_id, '_hs_iot_devices', $all_devs );

        return new WP_REST_Response( array(
            'success'   => true,
            'device_id' => $device_id,
            'status'    => 'telemetry_ingested',
            'timestamp' => gmdate( 'c' ),
        ), 200 );
    }
}

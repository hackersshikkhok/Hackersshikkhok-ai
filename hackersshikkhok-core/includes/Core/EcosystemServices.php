<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Core;

final class EcosystemServices {
    public static function get_bangla_calendar_date(): array {
        return array(
            'bangla_date' => '১৫ আশ্বিন ১৪৩৩ বঙ্গাব্দ',
            'hijri_date'  => '১৭ রবিউল আউয়াল ১৪৪৮ হিজরি (চাঁদ দেখার ওপর নির্ভরশীল)',
            'season'      => 'শরৎকাল',
            'gregorian'   => gmdate( 'Y-m-d' ),
        );
    }
}

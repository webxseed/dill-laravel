<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            ['key' => 'contact_name', 'value' => 'Dr. Hanna Bishara'],
            ['key' => 'contact_email', 'value' => 'hbishara@tauex.tau.ac.il'],
            ['key' => 'location_building', 'value' => 'Wolfson Building'],
            ['key' => 'location_room', 'value' => 'Room 121'],
            ['key' => 'location_faculty', 'value' => 'Faculty of Engineering'],
            ['key' => 'location_university', 'value' => 'Tel Aviv University'],
            ['key' => 'location_city', 'value' => 'Tel Aviv'],
            ['key' => 'location_country', 'value' => 'Israel'],
        ];

        foreach ($settings as $setting) {
            DB::table('settings')->insert($setting);
        }
    }
}

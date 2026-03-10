<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PageSeeder extends Seeder
{
    public function run(): void
    {
        $pages = [
            [
                'slug' => 'home',
                'title' => 'Defects and Internal Interfaces Lab',
                'content' => json_encode([
                    'hero_title' => 'Defects and Internal Interfaces Lab',
                    'hero_subtitle' => 'Investigating the local electrical properties of individual defects and internal interface segments with respect to their microstructure.',
                    'about_title' => 'Advancing Materials Science',
                    'about_description' => 'The Defects and Internal Interfaces Lab (DIIL) studies local electron transport properties across microstructural defects in alloys and across interfaces between metallic materials.',
                    'cta_title' => 'Interested in Collaborating?',
                    'cta_description' => 'DIIL welcomes excellent PhD candidates, postdocs, and collaborators. Get in touch to explore opportunities.',
                ]),
                'meta_title' => 'DIIL - Defects and Internal Interfaces Lab',
                'meta_description' => 'Defects and Internal Interfaces Lab - Tel Aviv University',
                'is_published' => true,
            ],
            [
                'slug' => 'about',
                'title' => 'About DIIL',
                'content' => json_encode([
                    'description' => 'The Defects and Internal Interfaces Lab (DIIL) studies local electron transport properties across microstructural defects in alloys and across interfaces between metallic materials.',
                ]),
                'meta_title' => 'About - DIIL',
                'meta_description' => 'Learn about the Defects and Internal Interfaces Lab at Tel Aviv University',
                'is_published' => true,
            ],
            [
                'slug' => 'research',
                'title' => 'Research',
                'content' => json_encode([
                    'description' => 'Our research focuses on understanding electron scattering at defects and internal interfaces in materials.',
                ]),
                'meta_title' => 'Research - DIIL',
                'meta_description' => 'Research focus areas of the Defects and Internal Interfaces Lab',
                'is_published' => true,
            ],
            [
                'slug' => 'contact',
                'title' => 'Contact Us',
                'content' => json_encode([
                    'contact_name' => 'Dr. Hanna Bishara',
                    'contact_email' => 'hbishara@tauex.tau.ac.il',
                    'location_building' => 'Wolfson Building',
                    'location_room' => 'Room 121',
                    'location_faculty' => 'Faculty of Engineering',
                    'location_university' => 'Tel Aviv University',
                    'location_city' => 'Tel Aviv',
                    'location_country' => 'Israel',
                ]),
                'meta_title' => 'Contact - DIIL',
                'meta_description' => 'Contact the Defects and Internal Interfaces Lab',
                'is_published' => true,
            ],
        ];

        foreach ($pages as $page) {
            DB::table('pages')->insert($page);
        }
    }
}

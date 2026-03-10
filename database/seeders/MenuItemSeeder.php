<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MenuItemSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            // Main menu
            ['menu' => 'main', 'label' => 'Home', 'path' => '/', 'sort_order' => 1, 'is_visible' => true],
            ['menu' => 'main', 'label' => 'People', 'path' => '/people', 'sort_order' => 2, 'is_visible' => true],
            ['menu' => 'main', 'label' => 'Research', 'path' => '/research', 'sort_order' => 3, 'is_visible' => true],
            ['menu' => 'main', 'label' => 'Projects', 'path' => '/projects', 'sort_order' => 4, 'is_visible' => true],
            ['menu' => 'main', 'label' => 'Facilities', 'path' => '/facilities', 'sort_order' => 5, 'is_visible' => true],
            ['menu' => 'main', 'label' => 'Contact', 'path' => '/contact', 'sort_order' => 6, 'is_visible' => true],
            
            // Footer menu
            ['menu' => 'footer', 'label' => 'Home', 'path' => '/', 'sort_order' => 1, 'is_visible' => true],
            ['menu' => 'footer', 'label' => 'People', 'path' => '/people', 'sort_order' => 2, 'is_visible' => true],
            ['menu' => 'footer', 'label' => 'Research', 'path' => '/research', 'sort_order' => 3, 'is_visible' => true],
            ['menu' => 'footer', 'label' => 'Projects', 'path' => '/projects', 'sort_order' => 4, 'is_visible' => true],
            ['menu' => 'footer', 'label' => 'Facilities', 'path' => '/facilities', 'sort_order' => 5, 'is_visible' => true],
            ['menu' => 'footer', 'label' => 'Contact', 'path' => '/contact', 'sort_order' => 6, 'is_visible' => true],
        ];

        foreach ($items as $item) {
            DB::table('menu_items')->insert($item);
        }
    }
}

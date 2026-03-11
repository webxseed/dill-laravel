<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NewsSeeder extends Seeder
{
    public function run(): void
    {
        $news = [
            ['date' => 'February 2024', 'title' => 'Lab Construction Completed', 'text' => 'Lab construction completed! Instruments warming and running. Looking forward to cutting-edge research.', 'image' => '/images/news/lab-construction.jpg', 'sort_order' => 1],
            ['date' => 'September 2023', 'title' => 'NOGA Funding Accepted', 'text' => 'A proposal project accepted for fund by NOGA company — studying highly-strong and highly conductive Aluminum alloys.', 'image' => '/images/news/aluminum-alloys.jpg', 'sort_order' => 2],
            ['date' => 'August 2023', 'title' => 'New Lab Members Join DIIL', 'text' => 'New members accepted to join DIIL starting from fall semester 2023: Dr. Gautam Kumar (Postdoc) and Ms. Saja Sarhan (MSc.).', 'image' => '/images/news/new-members.jpg', 'sort_order' => 3],
            ['date' => 'July 2023', 'title' => 'ISF Grant Awarded', 'text' => 'Proposal accepted for fund by ISF (Israel Science Foundation), including an equipment grant.', 'image' => '/images/news/isf-grant.jpg', 'sort_order' => 4],
            ['date' => 'May 2023', 'title' => 'Max-Planck Partner Group', 'text' => 'DIIL is declared as a Max-Planck partner group led by Dr. Hanna Bishara with Max-Planck-Institut für Eisenforschung.', 'image' => '/images/news/max-planck.jpg', 'sort_order' => 5],
        ];

        foreach ($news as $item) {
            DB::table('news')->insert($item);
        }
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PeopleSeeder extends Seeder
{
    public function run(): void
    {
        $people = [
            [
                'name' => 'Dr. Hanna Bishara',
                'role' => 'Lab Director & Principal Investigator',
                'email' => 'hbishara@tauex.tau.ac.il',
                'location' => 'Wolfson Building, Room 121',
                'bio' => 'Faculty member in Materials Science and Engineering at TAU since July 2022. Spent 3.5 years in Max-Planck-Institut für Eisenforschung (Germany) as a postdoctoral researcher. PhD, MSc, and BSc in Materials Science and Engineering at Technion.',
                'type' => 'member',
                'publications' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Dr. Amram Azulay',
                'role' => 'Lab Engineer & Researcher',
                'email' => 'ami2@tauex.tau.ac.il',
                'location' => null,
                'bio' => 'Gained expertise in Materials Science and Engineering focusing on electronic and thermal transport properties of bulk thermoelectric oxides. Employing point defect engineering, phase mixture, and ball mill processing.',
                'type' => 'member',
                'publications' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Dr. Gautam Kumar Pal',
                'role' => 'Postdoctoral Researcher',
                'email' => 'gautamkumar@tauex.tau.ac.il',
                'location' => null,
                'bio' => 'Investigating contact resistivity between functional alloy and conductive alloys through local electrical measurements. Studies the electrical-mechanical properties interplay in cast 6xxx Al-alloy.',
                'type' => 'member',
                'publications' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Saja Sarhan',
                'role' => 'MSc. Candidate',
                'email' => 'sajasarhan@tauex.tau.ac.il',
                'location' => null,
                'bio' => 'Completed bachelor studies in fall 2023 in Materials Science and Engineering at TAU. For her masters, studies the segregation and precipitation in Cu-Mn alloys and their impact on local physical properties of grain boundaries.',
                'type' => 'member',
                'publications' => false,
                'sort_order' => 4,
            ],
            [
                'name' => 'Omer Coriat',
                'role' => 'MSc. Candidate',
                'email' => 'omercoriat@tauex.tau.ac.il',
                'location' => null,
                'bio' => 'Investigates the local electrical properties of 3D printed 6xxx Al-alloys to reveal resistivity mechanisms and improve the mechanical-electrical interplay. Co-supervised with Dr. Vladimir Popov.',
                'type' => 'member',
                'publications' => false,
                'sort_order' => 5,
            ],
            // Alumni
            [
                'name' => 'Michael Cohen',
                'role' => 'MSc. 2023',
                'email' => null,
                'location' => null,
                'bio' => null,
                'type' => 'alumni',
                'publications' => false,
                'alumni_topic' => 'Grain boundary segregation in Cu-Ni alloys',
                'sort_order' => 10,
            ],
            [
                'name' => 'Yael Levi',
                'role' => 'BSc. Project 2023',
                'email' => null,
                'location' => null,
                'bio' => null,
                'type' => 'alumni',
                'publications' => false,
                'alumni_topic' => 'Thin film deposition and characterization',
                'sort_order' => 11,
            ],
            [
                'name' => 'Daniel Stern',
                'role' => 'BSc. Project 2023',
                'email' => null,
                'location' => null,
                'bio' => null,
                'type' => 'alumni',
                'publications' => false,
                'alumni_topic' => 'Electrical measurements methodology',
                'sort_order' => 12,
            ],
        ];

        foreach ($people as $person) {
            DB::table('people')->insert($person);
        }
    }
}

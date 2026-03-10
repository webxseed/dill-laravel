<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProjectsSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            // Current projects
            [
                'title' => 'Microstructure-controlled contact resistivity between metallic contact and functional Heusler alloy',
                'funding' => 'ISF 2023 (4 years project)',
                'summary' => 'The project aims to study the microstructure evolution at the internal interfaces between functional-contact alloys, and investigate the related local electrical properties of the complex material system.',
                'detail' => 'The interface between a functional alloy and the conductive alloy material is responsible for an enhanced electron scattering in devices. Microstructure plays a significant role in determining the contact resistance.',
                'status' => 'current',
                'period' => null,
                'sort_order' => 1,
            ],
            [
                'title' => 'Segregation vs. Precipitation: Local Electrical and Mechanical Properties',
                'funding' => 'Max-Planck Partner group (5 years project)',
                'summary' => 'Here we study and separate the impact of atomic segregation and precipitate formation on the microstructure evolution and the physical properties.',
                'detail' => 'The microstructure evolution of an alloy is dominantly affected by its chemistry and processing history. Usually alloying elements tend to accumulate on grain boundaries leading to either segregation or precipitation phenomena.',
                'status' => 'current',
                'period' => null,
                'sort_order' => 2,
            ],
            [
                'title' => 'High-Conductivity High-Strength Aluminum Alloys',
                'funding' => 'NOGA company (1 year project)',
                'summary' => 'Aim is to locally investigate the contribution of individual defects\' segments to the electrical resistivity, and correlate it with the local microstructure characteristics.',
                'detail' => 'Alloying is essential to enhance the mechanical strength of metals. However it is accompanied with an increased electron scattering by defects induced by the alloying elements.',
                'status' => 'current',
                'period' => null,
                'sort_order' => 3,
            ],
            // Previous projects
            [
                'title' => 'Grain Boundary Resistivity in Pure Copper',
                'funding' => 'Max-Planck-Institut für Eisenforschung',
                'summary' => 'Developed novel SEM in-situ local electrical measurements to quantify the resistivity of individual grain boundaries in Cu, revealing the effect of boundary structure on electron scattering.',
                'detail' => null,
                'status' => 'previous',
                'period' => '2019–2022',
                'sort_order' => 10,
            ],
            [
                'title' => 'Dislocation-Enhanced Conductivity in Rutile TiO₂',
                'funding' => 'DFG Collaborative Research',
                'summary' => 'Demonstrated that nano-mechanical doping via dislocations can locally enhance the electrical conductivity in rutile TiO₂, opening pathways for defect-engineered oxide electronics.',
                'detail' => null,
                'status' => 'previous',
                'period' => '2020–2022',
                'sort_order' => 11,
            ],
            [
                'title' => 'Dopant Segregation in NbCoSn Half-Heusler Thermoelectrics',
                'funding' => 'Max-Planck / CAS Collaboration',
                'summary' => 'Showed that dopant segregation to grain boundaries controls the electrical conductivity of n-type NbCo(Pt)Sn half-Heusler alloys, mediating thermoelectric performance.',
                'detail' => null,
                'status' => 'previous',
                'period' => '2019–2021',
                'sort_order' => 12,
            ],
        ];

        foreach ($projects as $project) {
            DB::table('projects')->insert($project);
        }
    }
}

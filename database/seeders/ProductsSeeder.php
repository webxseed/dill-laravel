<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductsSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            // Materials Fabrication
            [
                'name' => 'Induction Melting Furnace',
                'category' => 'Materials Fabrication',
                'features' => json_encode(['Bulk alloy fabrication by induction melting', 'Heating up to 2000 °C', 'High purity Ar atmosphere', 'Graphite and copper dies – volume ~20 cm³']),
                'sort_order' => 1,
            ],
            [
                'name' => 'Magnetron Sputtering Machine',
                'category' => 'Materials Fabrication',
                'features' => json_encode(['Turbo pump, vacuum level', 'Two active cathodes, dc + ac', 'Substrate heating to 600°C']),
                'sort_order' => 2,
            ],
            // Heat Treatments
            [
                'name' => 'Inert Atmosphere & Vacuum Tube Furnaces',
                'category' => 'Heat Treatments',
                'features' => json_encode(['Annealing with high purity Ar', 'Pre-vacuum of E-01 mbar', 'Heating up to 1000°C', 'Ramp control']),
                'sort_order' => 10,
            ],
            [
                'name' => 'Vacuum Furnace',
                'category' => 'Heat Treatments',
                'features' => json_encode(['Base pressure 10E-5 mbar', 'Heating up to 1000°C', 'Self-designed (with a company)']),
                'sort_order' => 11,
            ],
            [
                'name' => 'Burnout Furnace',
                'category' => 'Heat Treatments',
                'features' => json_encode(['Heating up to 1000°C', '20 liter chamber']),
                'sort_order' => 12,
            ],
            // Mechanical Treatments
            [
                'name' => 'Cold Rolling',
                'category' => 'Mechanical Treatments',
                'features' => json_encode(['Rolling at planes starting from thickness of 8mm', 'Automatic flow', 'Control over the speed of advance', 'Suitable for materials up to hardness 64']),
                'sort_order' => 20,
            ],
            [
                'name' => 'Multi Directional Forging',
                'category' => 'Mechanical Treatments',
                'features' => json_encode(['100kN load cell', 'Compression and three-point bending', 'Load or displacement control']),
                'sort_order' => 21,
            ],
            // Sample Preparation
            [
                'name' => 'Cutting Wheel Disk',
                'category' => 'Sample Preparation',
                'features' => json_encode(['Load cell to control feed rate', 'Multiple disk materials', 'Water-cooled cutting']),
                'sort_order' => 30,
            ],
            [
                'name' => 'Diamond Wire Saw',
                'category' => 'Sample Preparation',
                'features' => json_encode(['Very smooth cut surface, minimal deformation', 'Control of cutting force and wire speed', 'Water-cooled']),
                'sort_order' => 31,
            ],
            [
                'name' => 'Automatic Polishing Machine',
                'category' => 'Sample Preparation',
                'features' => json_encode(['Control over time and speed', 'From abrasive grinding to OPS polishing', 'Wide range of polishing cloths and liquids']),
                'sort_order' => 32,
            ],
            [
                'name' => 'Vibro-polishing Machine',
                'category' => 'Sample Preparation',
                'features' => json_encode(['Control of vibration frequency and force', 'A range of polishing cloths and liquids', 'Extremely smooth deformation free surfaces']),
                'sort_order' => 33,
            ],
            // Material Characterization
            [
                'name' => 'Optical Microscope',
                'category' => 'Material Characterization',
                'features' => json_encode(['Up to 100x objective lenses', 'Bright field and Dark field', 'Multiple filters', 'Camera features and image analyses']),
                'sort_order' => 40,
            ],
            [
                'name' => 'Benchtop Scanning Electron Microscope (SEM)',
                'category' => 'Material Characterization',
                'features' => json_encode(['SE and BSE detectors', 'EDS', 'Large samples are also possible', 'Variable vacuum level']),
                'sort_order' => 41,
            ],
            [
                'name' => 'Nano-probing Nano-manipulators System',
                'category' => 'Material Characterization',
                'features' => json_encode(['Perform local electrical measurements inside SEM', 'Four independent probes', 'Compatible with Phenom and Zeiss SEMs', 'Nano-manipulators move at exact range between motors to nano scale']),
                'sort_order' => 42,
            ],
            [
                'name' => 'Keithley Devices',
                'category' => 'Material Characterization',
                'features' => json_encode(['Nano-Voltmeter', 'Sensitive current generator', 'Ability to measure fractions of mili Ohms in metals']),
                'sort_order' => 43,
            ],
            [
                'name' => 'Probing Station',
                'category' => 'Material Characterization',
                'features' => json_encode(['Four probes, manually aligned', 'Heating range to 680°C, and cooling to liquid nitrogen', 'Accurate temperature ramp control', 'Suitable for Con. dap Pause method']),
                'sort_order' => 44,
            ],
            [
                'name' => 'Nanoindenter',
                'category' => 'Material Characterization',
                'features' => json_encode(['Berkovich tip', 'Linear arrays of nano-indentation', 'From µN up to 500 mN']),
                'sort_order' => 45,
            ],
        ];

        foreach ($products as $product) {
            DB::table('products')->insert($product);
        }
    }
}

import { FadeIn, SectionHeader } from "@/components/FadeIn";


import imgAutomaticPolishing from "@/assets/facilities/automatic-polishing-machine.avif";
import imgSEM from "@/assets/facilities/benchtop-sem.avif";
import imgColdRolling from "@/assets/facilities/cold-rolling.avif";
import imgCuttingWheel from "@/assets/facilities/cutting-wheel-disk.avif";
import imgDiamondWire from "@/assets/facilities/diamond-wire-saw.avif";
import imgKeithley from "@/assets/facilities/keithley-devices.avif";
import imgForging from "@/assets/facilities/multi-directional-forging.avif";
import imgNanoProbing from "@/assets/facilities/nano-probing.avif";
import imgNanoindenter from "@/assets/facilities/nanoindenter.avif";
import imgOpticalMicroscope from "@/assets/facilities/optical-microscope.avif";
import imgProbingStation from "@/assets/facilities/probing-station.avif";
import imgVibroPolishing from "@/assets/facilities/vibro-polishing-machine.avif";
import imgBurnoutFurnace from "@/assets/facilities/burnout-furnace.avif";
import imgTubeFurnaces from "@/assets/facilities/inert-tube-furnaces.avif";
import imgVacuumFurnace from "@/assets/facilities/vacuum-furnace.avif";
import imgInductionMelting from "@/assets/facilities/induction-melting-furnace.avif";
import imgMagnetronSputtering from "@/assets/facilities/magnetron-sputtering.avif";

interface Facility {
  name: string;
  features: string[];
  image?: string;
}

interface FacilityCategory {
  title: string;
  items: Facility[];
}

const categories: FacilityCategory[] = [
  {
    title: "Materials Fabrication",
    items: [
      { name: "Induction Melting Furnace", features: ["Bulk alloy fabrication by induction melting", "Heating up to 2000 °C", "High purity Ar atmosphere", "Graphite and copper dies – volume ~20 cm³"], image: imgInductionMelting },
      { name: "Magnetron Sputtering Machine", features: ["Turbo pump, vacuum level", "Two active cathodes, dc + ac", "Substrate heating to 600°C"], image: imgMagnetronSputtering },
    ],
  },
  {
    title: "Heat Treatments",
    items: [
      { name: "Inert Atmosphere & Vacuum Tube Furnaces", features: ["Annealing with high purity Ar", "Pre-vacuum of E-01 mbar", "Heating up to 1000°C", "Ramp control"], image: imgTubeFurnaces },
      { name: "Vacuum Furnace", features: ["Base pressure 10E-5 mbar", "Heating up to 1000°C", "Self-designed (with a company)"], image: imgVacuumFurnace },
      { name: "Burnout Furnace", features: ["Heating up to 1000°C", "20 liter chamber"], image: imgBurnoutFurnace },
    ],
  },
  {
    title: "Mechanical Treatments",
    items: [
      { name: "Cold Rolling", features: ["Rolling at planes starting from thickness of 8mm", "Automatic flow", "Control over the speed of advance", "Suitable for materials up to hardness 64"], image: imgColdRolling },
      { name: "Multi Directional Forging", features: ["100kN load cell", "Compression and three-point bending", "Load or displacement control"], image: imgForging },
    ],
  },
  {
    title: "Sample Preparation",
    items: [
      { name: "Cutting Wheel Disk", features: ["Load cell to control feed rate", "Multiple disk materials", "Water-cooled cutting"], image: imgCuttingWheel },
      { name: "Diamond Wire Saw", features: ["Very smooth cut surface, minimal deformation", "Control of cutting force and wire speed", "Water-cooled"], image: imgDiamondWire },
      { name: "Automatic Polishing Machine", features: ["Control over time and speed", "From abrasive grinding to OPS polishing", "Wide range of polishing cloths and liquids"], image: imgAutomaticPolishing },
      { name: "Vibro-polishing Machine", features: ["Control of vibration frequency and force", "A range of polishing cloths and liquids", "Extremely smooth deformation free surfaces"], image: imgVibroPolishing },
    ],
  },
  {
    title: "Material Characterization",
    items: [
      { name: "Optical Microscope", features: ["Up to 100x objective lenses", "Bright field and Dark field", "Multiple filters", "Camera features and image analyses"], image: imgOpticalMicroscope },
      { name: "Benchtop Scanning Electron Microscope (SEM)", features: ["SE and BSE detectors", "EDS", "Large samples are also possible", "Variable vacuum level"], image: imgSEM },
      { name: "Nano-probing Nano-manipulators System", features: ["Perform local electrical measurements inside SEM", "Four independent probes", "Compatible with Phenom and Zeiss SEMs", "Nano-manipulators move at exact range between motors to nano scale"], image: imgNanoProbing },
      { name: "Keithley Devices", features: ["Nano-Voltmeter", "Sensitive current generator", "Ability to measure fractions of mili Ohms in metals"], image: imgKeithley },
      { name: "Probing Station", features: ["Four probes, manually aligned", "Heating range to 680°C, and cooling to liquid nitrogen", "Accurate temperature ramp control", "Suitable for Con. dap Pause method"], image: imgProbingStation },
      { name: "Nanoindenter", features: ["Berkovich tip", "Linear arrays of nano-indentation", "From µN up to 500 mN"], image: imgNanoindenter },
    ],
  },
];

export default function FacilitiesPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 section-padding bg-gold-light/70">
        <div className="container-wide mx-auto text-center">
          <SectionHeader
            label="Facilities"
            title="Lab Equipment & Instruments"
            description="The lab is equipped with instruments for proper materials fabrication, sample preparation, and characterization."
          />
        </div>
      </section>

      {/* Categories */}
      {categories.map((category, ci) => (
        <section
          key={category.title}
          className={`section-padding ${ci % 3 === 0 ? "bg-purple-light/40" : ci % 3 === 1 ? "bg-gold-light/40" : "bg-teal-light/20"}`}
        >
          <div className="container-wide mx-auto">
            <FadeIn>
              <h3 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-10">
                {category.title}
              </h3>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item, i) => (
                <FadeIn key={item.name} delay={i * 0.08}>
                  <div className="bg-card border border-border rounded-xl overflow-hidden h-full hover:shadow-md transition-shadow">
                    {item.image ? (
                      <div className="h-48 overflow-hidden bg-white">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="h-2 bg-accent/20" />
                    )}
                    <div className="p-6">
                      <h4 className="text-base font-heading font-semibold text-foreground mb-3">
                        {item.name}
                      </h4>
                      <ul className="space-y-1.5">
                        {item.features.map((f, fi) => (
                          <li key={fi} className="text-xs text-muted-foreground flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-accent mt-1.5 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

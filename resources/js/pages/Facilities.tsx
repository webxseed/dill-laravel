import { useEffect, useState } from "react";
import { FadeIn, SectionHeader } from "@/components/FadeIn";
import { api, Product } from "@/lib/api";

interface Facility {
  name: string;
  features: string[];
  image?: string;
}

interface FacilityCategory {
  title: string;
  items: Facility[];
}

export default function FacilitiesPage() {
  const [categories, setCategories] = useState<FacilityCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState<{ meta_title?: string; meta_description?: string; subtitle?: string }>({});

  useEffect(() => {
    api.getPage('facilities')
      .then(setPageData)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (pageData.meta_title) {
      document.title = pageData.meta_title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', pageData.meta_description || '');
    }
  }, [pageData]);

  const getProductImage = (name: string) => {
    const nameLower = name.toLowerCase().replace(/\s+/g, '-');
    const images: Record<string, string> = {
      'induction-melting-furnace': '/images/facilities/induction-melting-furnace.avif',
      'magnetron-sputtering-machine': '/images/facilities/magnetron-sputtering.avif',
      'inert-atmosphere-vacuum-tube-furnaces': '/images/facilities/inert-tube-furnaces.avif',
      'vacuum-furnace': '/images/facilities/vacuum-furnace.avif',
      'burnout-furnace': '/images/facilities/burnout-furnace.avif',
      'cold-rolling': '/images/facilities/cold-rolling.avif',
      'multi-directional-forging': '/images/facilities/multi-directional-forging.avif',
      'cutting-wheel-disk': '/images/facilities/cutting-wheel-disk.avif',
      'diamond-wire-saw': '/images/facilities/diamond-wire-saw.avif',
      'automatic-polishing-machine': '/images/facilities/automatic-polishing-machine.avif',
      'vibro-polishing-machine': '/images/facilities/vibro-polishing-machine.avif',
      'optical-microscope': '/images/facilities/optical-microscope.avif',
      'benchtop-scanning-electron-microscope-(sem)': '/images/facilities/benchtop-sem.avif',
      'nano-probing-nano-manipulators-system': '/images/facilities/nano-probing.avif',
      'keithley-devices': '/images/facilities/keithley-devices.avif',
      'probing-station': '/images/facilities/probing-station.avif',
      'nanoindenter': '/images/facilities/nanoindenter.avif',
    };
    return images[nameLower] || '';
  };

  useEffect(() => {
    api.get("/products")
      .then((data: Product[]) => {
        const grouped = data.reduce((acc, product) => {
          const category = product.category;
          if (!acc[category]) {
            acc[category] = [];
          }
          let features: string[] = [];
          if (product.features) {
            try {
              features = typeof product.features === 'string' 
                ? JSON.parse(product.features) 
                : product.features;
            } catch {
              features = [];
            }
          }
          acc[category].push({
            name: product.name,
            features,
            image: product.image || getProductImage(product.name),
          });
          return acc;
        }, {} as Record<string, Facility[]>);

        const categoryArray: FacilityCategory[] = Object.entries(grouped)
          .map(([title, items]) => ({ title, items }))
          .sort((a, b) => {
            const order = ['Materials Fabrication', 'Heat Treatments', 'Mechanical Treatments', 'Sample Preparation', 'Material Characterization'];
            const aIdx = order.indexOf(a.title);
            const bIdx = order.indexOf(b.title);
            return (aIdx === -1 ? 999 : aIdx) - (bIdx === -1 ? 999 : bIdx);
          });

        setCategories(categoryArray);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="pt-32 pb-16 section-padding bg-gold-light/70">
        <div className="container-wide mx-auto text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="pt-32 pb-16 section-padding bg-gold-light/70">
        <div className="container-wide mx-auto text-center">
          <SectionHeader
            label="Facilities"
            title="Lab Equipment & Instruments"
            description={pageData.subtitle || "The lab is equipped with instruments for proper materials fabrication, sample preparation, and characterization."}
          />
        </div>
      </section>

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

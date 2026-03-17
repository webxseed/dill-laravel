import { useEffect, useState } from "react";
import { FadeIn, SectionHeader } from "@/components/FadeIn";
import { ArrowRight } from "lucide-react";
import { api, Publication } from "@/lib/api";

export default function ResearchPage() {
  const [pageData, setPageData] = useState<{ meta_title?: string; meta_description?: string; content?: string }>({});
  const [publications, setPublications] = useState<Publication[]>([]);

  useEffect(() => {
    api.getPage('research')
      .then(setPageData)
      .catch(console.error);
  }, []);

  useEffect(() => {
    api.getPublications()
      .then(setPublications)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (pageData.meta_title) {
      document.title = pageData.meta_title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', pageData.meta_description || '');
    }
  }, [pageData]);

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 section-padding bg-gold-light/70">
        <div className="container-wide mx-auto text-center">
          <SectionHeader
            label="Research"
            title="Research Philosophy"
            description="The research philosophy of DIIL is explained."
          />
        </div>
      </section>

      {/* Strategy */}
      <section className="section-padding bg-purple-light/40">
        <div className="container-narrow mx-auto">
          {pageData.content ? (
            <FadeIn>
              <div 
                className="prose prose-sm max-w-none text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: pageData.content }}
              />
            </FadeIn>
          ) : (
            <FadeIn>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">DIIL</strong> studies local electron transport properties across
                  microstructural defects in alloys and across internal interfaces between alloys.
                </p>
                <p className="font-medium text-foreground">The research strategy is:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    In DIIL we grow bulk and thin film materials in a well-controlled manner to tune defects' structures.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    In DIIL we structurally characterize the defects.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    In DIIL we study the local electrical and mechanical properties of individual defects and internal interfaces' segments.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    In DIIL we continuously develop the methodologies for local electrical characterization.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    In DIIL we develop novel defect-design concepts.
                  </li>
                </ul>
              </div>
            </FadeIn>
          )}

          {/* Process flow */}
          <FadeIn className="mt-16">
            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-heading font-bold text-foreground mb-6 text-center">
                Research Workflow
              </h3>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm">
                {[
                  { label: "Defect Preparation", sub: "Thin films · Bulk" },
                  { label: "Defect Characterization", sub: "Structural · Electrical · Mechanical" },
                  { label: "Optimization", sub: "Materials & Interfaces" },
                ].map((step, i) => (
                  <div key={step.label} className="flex items-center gap-4">
                    <div className="bg-secondary rounded-lg p-4 text-center min-w-[180px]">
                      <p className="font-medium text-foreground">{step.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">{step.sub}</p>
                    </div>
                    {i < 2 && <ArrowRight className="text-accent shrink-0 hidden md:block" size={20} />}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Publications */}
      <section className="section-padding bg-teal-light/25">
        <div className="container-narrow mx-auto">
          <SectionHeader title="Related Publications" label="Publications" />
          <div className="space-y-6">
            {publications.map((pub, i) => (
              <FadeIn key={pub.id || i} delay={i * 0.05}>
                <div className="border-l-2 border-accent/30 pl-6 py-1">
                  <p className="text-sm text-muted-foreground leading-relaxed">{pub.citation}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import { useEffect, useState } from "react";
import { FadeIn, SectionHeader } from "@/components/FadeIn";
import { api, Publication } from "@/lib/api";

export default function ResearchPage() {
  const [pageData, setPageData] = useState<{ meta_title?: string; meta_description?: string; content?: string; image?: string }>({});
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
          {pageData.image && (
            <FadeIn>
              <div className="rounded-xl overflow-hidden shadow-lg mb-10">
                <img src={pageData.image} alt="Research" className="w-full h-auto object-cover max-h-[400px]" />
              </div>
            </FadeIn>
          )}
          {pageData.content && (
            <FadeIn>
              <div 
                className="prose prose-sm max-w-none text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: pageData.content }}
              />
            </FadeIn>
          )}
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

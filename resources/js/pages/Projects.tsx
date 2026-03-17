import { useEffect, useState } from "react";
import { FadeIn, SectionHeader } from "@/components/FadeIn";
import { api, Project } from "@/lib/api";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState<{ meta_title?: string; meta_description?: string }>({});

  useEffect(() => {
    api.getPage('projects')
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

  useEffect(() => {
    api.get("/projects")
      .then((data) => setProjects(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const currentProjects = projects.filter((p) => p.status === "current");
  const previousProjects = projects.filter((p) => p.status === "previous");

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
      {/* Header */}
      <section className="pt-32 pb-16 section-padding bg-gold-light/70">
        <div className="container-wide mx-auto text-center">
          <SectionHeader
            label="Projects"
            title="Research Projects"
            description="Brief descriptions of our research projects. For more information please contact the PI."
          />
        </div>
      </section>

      {/* Current Projects */}
      <section className="section-padding bg-purple-light/40">
        <div className="container-narrow mx-auto">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-8 flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-accent" />
            Current Projects
          </h2>
          <div className="space-y-8">
            {currentProjects.map((project, i) => (
              <FadeIn key={project.id} delay={i * 0.1}>
                <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                  {project.image && (
                    <div className="w-full h-48 md:h-56 overflow-hidden">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-8">
                    <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-accent font-medium italic mb-4">
                      {project.funding}
                    </p>
                    {project.detail && (
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        {project.detail}
                      </p>
                    )}
                    {project.summary && (
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        {project.summary}
                      </p>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Previous Projects */}
      {previousProjects.length > 0 && (
        <section className="section-padding bg-teal-light/20">
          <div className="container-narrow mx-auto">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-8 flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-purple" />
              Previous Projects
            </h2>
            <div className="space-y-6">
              {previousProjects.map((project, i) => (
                <FadeIn key={project.id} delay={i * 0.1}>
                  <div className="bg-card/80 border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <h3 className="text-lg font-heading font-semibold text-foreground">
                        {project.title}
                      </h3>
                      {project.period && (
                        <span className="text-xs text-muted-foreground font-medium bg-secondary px-3 py-1 rounded-full shrink-0">
                          {project.period}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-accent font-medium italic mb-3">
                      {project.funding}
                    </p>
                    {project.summary && (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {project.summary}
                      </p>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

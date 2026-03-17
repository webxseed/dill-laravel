import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FadeIn, SectionHeader } from "@/components/FadeIn";
import { api, Person, News } from "@/lib/api";
import heroBg from "@/assets/hero-bg.jpg";
import microstructureImg from "@/assets/microstructure-sem.jpg";
import labImg from "@/assets/lab-environment.jpg";
import logoImg from "@/assets/logo.svg";

export default function HomePage() {
  const [teamMembers, setTeamMembers] = useState<Person[]>([]);
  const [newsItems, setNewsItems] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState<{ meta_title?: string; meta_description?: string }>({});

  useEffect(() => {
    // Update document title
    document.title = pageData.meta_title || 'DIIL - Defects and Internal Interfaces Lab';
    
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', pageData.meta_description || '');
    }
  }, [pageData]);

  useEffect(() => {
    // Fetch page data
    api.getPage('home')
      .then(setPageData)
      .catch(console.error);

    Promise.all([
      api.get("/people"),
      api.getNews(),
    ])
      .then(([people, news]) => {
        const members = (people as Person[]).filter((p) => p.type === "member").slice(0, 5);
        setTeamMembers(members);
        setNewsItems(news as News[]);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const getTeamImage = (name: string) => {
    const nameLower = name.toLowerCase();
    if (nameLower.includes('hanna')) return '/images/people/hanna.avif';
    if (nameLower.includes('amram') || nameLower.includes('azulay')) return '/images/people/amram.avif';
    if (nameLower.includes('gautam')) return '/images/people/gautam.avif';
    if (nameLower.includes('saja')) return '/images/people/saja.avif';
    if (nameLower.includes('omer')) return '/images/people/omer.avif';
    return '';
  };

  const getNewsImage = (imagePath: string) => {
    if (!imagePath) return heroBg;
    if (imagePath.includes('lab-construction')) return labImg;
    if (imagePath.includes('aluminum')) return labImg;
    if (imagePath.includes('new-members')) return labImg;
    if (imagePath.includes('isf')) return labImg;
    if (imagePath.includes('max-planck')) return labImg;
    return labImg;
  };

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/70" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-copper-light text-sm tracking-[0.25em] uppercase font-medium mb-4 block">
              Tel Aviv University
            </span>
            <div className="inline-block mb-4">
              <img src={logoImg} alt="DIIL Logo" className="h-20 md:h-24 w-auto" />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold text-primary-foreground leading-tight tracking-tight">
              Defects and Internal
              <br />
              Interfaces Lab
            </h1>
            <p className="mt-6 text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Investigating the local electrical properties of individual defects and
              internal interface segments with respect to their microstructure.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Link
                to="/research"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-md text-sm font-medium hover:bg-accent/90 transition-colors"
              >
                Explore Research <ArrowRight size={16} />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-md text-sm font-medium hover:bg-accent/90 transition-colors"
              >
                Explore Projects <ArrowRight size={16} />
              </Link>
              <Link
                to="/people"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-md text-sm font-medium hover:bg-accent/90 transition-colors"
              >
                Meet the Team
              </Link>
              <Link
                to="/facilities"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-md text-sm font-medium hover:bg-accent/90 transition-colors"
              >
                View Facilities
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="section-padding bg-gold-light/70">
        <div className="container-wide mx-auto">
          <SectionHeader
            label="About the Lab"
            title="Advancing Materials Science"
            description="The Defects and Internal Interfaces Lab (DIIL) studies local electron transport properties across microstructural defects in alloys and across interfaces between metallic materials."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <FadeIn>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img src={microstructureImg} alt="SEM microstructure image showing grain boundaries in an alloy" className="w-full h-auto object-cover" />
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Electron scattering is usually enhanced at defects and internal interfaces of materials,
                  leading to energy loss and a decline in performance. Detecting and understanding the
                  associated resistivity mechanisms is the key to improving electrical properties while
                  maintaining high-mechanical performance.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Lab Photo Banner */}
      <section className="section-padding bg-purple-light/60">
        <div className="container-wide mx-auto">
          <FadeIn>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img src={labImg} alt="Researchers working in the DIIL materials science laboratory" className="w-full h-64 md:h-80 object-cover" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Team Preview */}
      <section className="section-padding bg-teal-light/20">
        <div className="container-wide mx-auto">
          <SectionHeader
            label="Our Team"
            title="People of DIIL"
            description="A multidisciplinary team dedicated to advancing our understanding of defects and interfaces."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {teamMembers.map((member, i) => (
              <FadeIn key={member.id} delay={i * 0.08}>
                <div className="text-center group">
                  <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-3 overflow-hidden ring-2 ring-transparent group-hover:ring-accent/40 transition-all duration-300">
                    {member.image || getTeamImage(member.name) ? (
                      <img src={getTeamImage(member.name)} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-teal text-white font-bold text-2xl">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-foreground">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn className="mt-10 text-center">
            <Link to="/people" className="text-accent text-sm font-medium hover:underline inline-flex items-center gap-1">
              Meet the full team <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* News */}
      <section className="section-padding bg-gold-light/60">
        <div className="container-wide mx-auto">
          <SectionHeader
            label="Updates"
            title="News & Announcements"
          />
          <div className="max-w-4xl mx-auto grid gap-6">
            {newsItems.map((item, i) => (
              <FadeIn key={item.id} delay={i * 0.08}>
                <div className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg hover:border-teal/40 transition-all duration-300 flex flex-col sm:flex-row">
                  <div className="sm:w-48 md:w-56 shrink-0 overflow-hidden">
                    <img src={getNewsImage(item.image || '')} alt="" className="w-full h-40 sm:h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5 flex flex-col justify-center">
                    <span className="text-xs font-semibold text-accent tracking-wide mb-1 block">
                      {item.date}
                    </span>
                    <h3 className="text-base font-heading font-bold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary">
        <div className="container-narrow mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4 tracking-tight">
              Interested in Collaborating?
            </h2>
            <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8">
              DIIL welcomes excellent PhD candidates, postdocs, and collaborators.
              Get in touch to explore opportunities.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3 rounded-md text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              Contact Us <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

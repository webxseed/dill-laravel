import { useEffect, useState } from "react";
import { FadeIn, SectionHeader } from "@/components/FadeIn";
import { Mail, BookOpen } from "lucide-react";
import { api, Person } from "@/lib/api";

export default function PeoplePage() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState<{ meta_title?: string; meta_description?: string }>({});

  useEffect(() => {
    api.getPage('people')
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

  const getPersonImage = (name: string) => {
    const nameLower = name.toLowerCase();
    if (nameLower.includes('hanna')) return '/images/people/hanna.avif';
    if (nameLower.includes('amram') || nameLower.includes('azulay')) return '/images/people/amram.avif';
    if (nameLower.includes('gautam')) return '/images/people/gautam.avif';
    if (nameLower.includes('saja')) return '/images/people/saja.avif';
    if (nameLower.includes('omer')) return '/images/people/omer.avif';
    return '';
  };

  useEffect(() => {
    api.get("/people")
      .then((data) => setPeople(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const members = people.filter((p) => p.type === "member");
  const alumni = people.filter((p) => p.type === "alumni");

  if (loading) {
    return (
      <section className="pt-32 pb-16 section-padding bg-purple-light/70">
        <div className="container-wide mx-auto text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="pt-32 pb-16 section-padding bg-purple-light/70">
        <div className="container-wide mx-auto text-center">
          <SectionHeader
            label="Team"
            title="People of DIIL"
            description="Meet the researchers behind our cutting-edge materials science research."
          />
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide mx-auto">
          <h3 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-10">
            Team Members
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((person, i) => (
              <FadeIn key={person.id} delay={i * 0.08}>
                <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                  <div className="aspect-square overflow-hidden bg-muted relative">
                    {person.image || getPersonImage(person.name) ? (
                      <img
                        src={person.image || getPersonImage(person.name)}
                        alt={person.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-teal text-white text-4xl font-bold">
                        {person.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h4 className="text-lg font-heading font-semibold text-foreground">
                      {person.name}
                    </h4>
                    <p className="text-accent text-sm font-medium mb-2">{person.role}</p>
                    {person.email && (
                      <a
                        href={`mailto:${person.email}`}
                        className="text-muted-foreground text-sm flex items-center gap-2 mb-3 hover:text-accent transition-colors mt-auto"
                      >
                        <Mail size={14} /> {person.email}
                      </a>
                    )}
                    {person.location && (
                      <p className="text-muted-foreground text-xs">{person.location}</p>
                    )}
                    {person.bio && (
                      <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                        {person.bio}
                      </p>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {alumni.length > 0 && (
        <section className="section-padding bg-gold-light/40">
          <div className="container-wide mx-auto">
            <h3 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-10">
              Alumni
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {alumni.map((person, i) => (
                <FadeIn key={person.id} delay={i * 0.06}>
                  <div className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-foreground font-semibold shrink-0">
                        {person.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{person.name}</h4>
                        <p className="text-accent text-sm">{person.role}</p>
                        {person.alumni_topic && (
                          <p className="text-muted-foreground text-xs mt-1 flex items-start gap-1">
                            <BookOpen size={12} className="mt-0.5 shrink-0" />
                            {person.alumni_topic}
                          </p>
                        )}
                      </div>
                    </div>
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

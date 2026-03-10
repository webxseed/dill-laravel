import { useEffect, useState } from "react";
import { FadeIn, SectionHeader } from "@/components/FadeIn";
import { Mail, BookOpen } from "lucide-react";
import { api, Person } from "@/lib/api";

import hannaImg from "@/assets/team/hanna.avif";
import amramImg from "@/assets/team/amram.avif";
import gautamImg from "@/assets/team/gautam.avif";
import sajaImg from "@/assets/team/saja.avif";
import omerImg from "@/assets/team/omer.avif";

// Map of name to imported image
const imageMap: Record<string, any> = {
  "Dr. Hanna Bishara": hannaImg,
  "Dr. Amram Azulay": amramImg,
  "Dr. Gautam Kumar Pal": gautamImg,
  "Saja Sarhan": sajaImg,
  "Omer Coriat": omerImg,
};

export default function PeoplePage() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);

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
      {/* Header */}
      <section className="pt-32 pb-16 section-padding bg-purple-light/70">
        <div className="container-wide mx-auto text-center">
          <SectionHeader
            label="Our Team"
            title="People of DIIL"
            description="DIIL is looking for excellent PhD candidates. Information about available projects is found in the Research and Projects section."
          />
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-gold-light/40">
        <div className="container-narrow mx-auto space-y-16">
          {members.map((person, i) => (
            <FadeIn key={person.id} delay={i * 0.05}>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="shrink-0 w-28 h-28 rounded-xl overflow-hidden bg-muted">
                  {person.image ? (
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={imageMap[person.name]}
                      alt={person.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-heading font-bold text-foreground">
                    {person.name}
                  </h3>
                  <p className="text-accent text-sm font-medium mt-1">{person.role}</p>
                  {person.location && (
                    <p className="text-xs text-muted-foreground mt-1">{person.location}</p>
                  )}
                  <div className="flex items-center gap-4 mt-3">
                    {person.email && (
                      <a
                        href={`mailto:${person.email}`}
                        className="text-xs text-muted-foreground hover:text-accent transition-colors flex items-center gap-1"
                      >
                        <Mail size={12} /> {person.email}
                      </a>
                    )}
                    {person.publications && (
                      <span className="text-xs text-teal font-medium flex items-center gap-1 cursor-pointer hover:underline">
                        <BookOpen size={12} /> Publications
                      </span>
                    )}
                  </div>
                  {person.bio && (
                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                      {person.bio}
                    </p>
                  )}
                </div>
              </div>
              {i < members.length - 1 && <div className="h-px bg-border mt-12" />}
            </FadeIn>
          ))}

          {/* Alumni */}
          {alumni.length > 0 && (
            <FadeIn>
              <h3 className="text-xl font-heading font-bold text-foreground mb-6">Our Alumni</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {alumni.map((person, i) => (
                  <FadeIn key={person.id} delay={i * 0.08}>
                    <div className="bg-card border border-border rounded-lg p-5 text-center">
                      <div className="w-14 h-14 rounded-full bg-muted mx-auto mb-3 flex items-center justify-center text-muted-foreground font-heading font-bold text-lg">
                        {person.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <p className="text-sm font-semibold text-foreground">{person.name}</p>
                      <p className="text-xs text-accent font-medium mt-0.5">{person.role}</p>
                      {person.alumni_topic && (
                        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                          {person.alumni_topic}
                        </p>
                      )}
                    </div>
                  </FadeIn>
                ))}
              </div>
            </FadeIn>
          )}

          {/* Open position */}
          <FadeIn>
            <div className="border-2 border-dashed border-accent/30 rounded-xl p-8 text-center bg-secondary/50">
              <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                This position can be yours!
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Researcher / graduate student — Contact us to join!
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-2.5 rounded-md text-sm font-medium hover:bg-accent/90 transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

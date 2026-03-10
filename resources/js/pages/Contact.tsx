import { useState, useEffect } from "react";
import { FadeIn, SectionHeader } from "@/components/FadeIn";
import { Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { api } from "@/lib/api";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [settings, setSettings] = useState<any>({});

  useEffect(() => {
    api.getSettings().then(setSettings).catch(console.error);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const fullAddress = [
    settings.location_building,
    settings.location_room,
    settings.location_faculty,
    settings.location_university,
    settings.location_city + (settings.location_country ? `, ${settings.location_country}` : ''),
  ].filter(Boolean).join(', ');

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 section-padding bg-purple-light/70">
        <div className="container-wide mx-auto text-center">
          <SectionHeader
            label="Contact"
            title="Get in Touch"
            description="Interested in collaboration, joining the lab, or learning more about our research? We'd love to hear from you."
          />
        </div>
      </section>

      <section className="section-padding bg-gold-light/40">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
            {/* Form */}
            <div className="md:col-span-3">
              <FadeIn>
                {submitted ? (
                  <div className="bg-card border border-border rounded-xl p-12 text-center">
                    <CheckCircle2 className="text-teal mx-auto mb-4" size={48} />
                    <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Thank you for reaching out. We'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Name</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-md border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-md border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Subject</label>
                      <input
                        type="text"
                        required
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-md border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-md border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3 rounded-md text-sm font-medium hover:bg-accent/90 transition-colors"
                    >
                      Send Message <Send size={14} />
                    </button>
                  </form>
                )}
              </FadeIn>
            </div>

            {/* Info */}
            <div className="md:col-span-2">
              <FadeIn delay={0.1}>
                <div className="space-y-8">
                  <div>
                    <h4 className="text-sm font-heading font-bold text-foreground mb-3 flex items-center gap-2">
                      <Mail size={16} className="text-teal" /> Direct Contact
                    </h4>
                    <p className="text-sm text-muted-foreground">{settings.contact_name}</p>
                    <a href={`mailto:${settings.contact_email}`} className="text-sm text-accent hover:underline">
                      {settings.contact_email}
                    </a>
                  </div>
                  <div>
                    <h4 className="text-sm font-heading font-bold text-foreground mb-3 flex items-center gap-2">
                      <MapPin size={16} className="text-teal" /> Location
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {fullAddress || 'Loading...'}
                    </p>
                  </div>
                  <div className="bg-secondary rounded-xl p-6">
                    <h4 className="text-sm font-heading font-bold text-foreground mb-2">
                      Join DIIL
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      We are always looking for motivated PhD candidates, MSc students, and postdoctoral
                      researchers. Check our Research and Projects sections for available topics.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

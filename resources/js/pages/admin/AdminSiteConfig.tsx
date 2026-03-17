import { useState, useEffect } from "react";
import { api } from "@/lib/api";

interface SiteConfig {
  [key: string]: string;
}

export default function AdminSiteConfig() {
  const [config, setConfig] = useState<SiteConfig>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  const configFields = [
    { key: 'home_hero_subtitle', label: 'Hero Subtitle', section: 'Hero', placeholder: 'Tel Aviv University' },
    { key: 'home_hero_title', label: 'Hero Title', section: 'Hero', placeholder: 'Defects and Internal Interfaces Lab' },
    { key: 'home_hero_description', label: 'Hero Description', section: 'Hero', placeholder: 'Investigating the local electrical properties...' },
    { key: 'home_about_label', label: 'About Label', section: 'About', placeholder: 'About the Lab' },
    { key: 'home_about_title', label: 'About Title', section: 'About', placeholder: 'Advancing Materials Science' },
    { key: 'home_about_description', label: 'About Description', section: 'About', placeholder: 'The Defects and Internal Interfaces Lab...' },
    { key: 'home_team_label', label: 'Team Label', section: 'Team', placeholder: 'Our Team' },
    { key: 'home_team_title', label: 'Team Title', section: 'Team', placeholder: 'People of DIIL' },
    { key: 'home_team_description', label: 'Team Description', section: 'Team', placeholder: 'A multidisciplinary team...' },
    { key: 'home_news_label', label: 'News Label', section: 'News', placeholder: 'Updates' },
    { key: 'home_news_title', label: 'News Title', section: 'News', placeholder: 'News & Announcements' },
    { key: 'home_cta_title', label: 'CTA Title', section: 'CTA', placeholder: 'Interested in Collaborating?' },
    { key: 'home_cta_description', label: 'CTA Description', section: 'CTA', placeholder: 'DIIL welcomes excellent PhD candidates...' },
  ];

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const data = await api.getSiteConfig();
      setConfig(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.updateSiteConfig(config);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setConfig({ ...config, [key]: value });
  };

  const sections = ['Hero', 'About', 'Team', 'News', 'CTA'];

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Home Page Configuration</h1>
      
      <div className="bg-card border border-border rounded-xl p-6">
        {sections.map((section) => (
          <div key={section} className="mb-8 last:mb-0">
            <h2 className="text-lg font-semibold mb-4 text-accent">{section} Section</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {configFields
                .filter((field) => field.section === section)
                .map((field) => (
                  <div key={field.key} className={field.label.includes('Description') || field.key.includes('description') ? 'md:col-span-2' : ''}>
                    <label className="block text-sm font-medium mb-1">{field.label}</label>
                    {field.key.includes('description') || field.key.includes('title') || field.key.includes('hero_title') ? (
                      <textarea
                        value={config[field.key] || ''}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        className="w-full px-3 py-2 rounded-md border border-border bg-background"
                        rows={field.label.includes('Description') ? 3 : 2}
                        placeholder={field.placeholder}
                      />
                    ) : (
                      <input
                        type="text"
                        value={config[field.key] || ''}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        className="w-full px-3 py-2 rounded-md border border-border bg-background"
                        placeholder={field.placeholder}
                      />
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}

        <div className="mt-6 pt-4 border-t">
          <button 
            onClick={handleSave} 
            disabled={saving} 
            className="bg-accent text-accent-foreground px-6 py-2.5 rounded-md text-sm font-medium hover:bg-accent/90 disabled:opacity-50"
          >
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Configuration'}
          </button>
        </div>
      </div>
    </div>
  );
}

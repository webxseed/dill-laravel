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
  const [uploading, setUploading] = useState<string | null>(null);

  const configFields = [
    { key: 'home_hero_bg', label: 'Hero Background Image', section: 'Hero', type: 'image', placeholder: '' },
    { key: 'home_hero_subtitle', label: 'Hero Subtitle', section: 'Hero', placeholder: 'Tel Aviv University' },
    { key: 'home_hero_title', label: 'Hero Title', section: 'Hero', placeholder: 'Defects and Internal Interfaces Lab' },
    { key: 'home_hero_description', label: 'Hero Description', section: 'Hero', placeholder: 'Investigating the local electrical properties...' },
    { key: 'home_about_img', label: 'About Section Image', section: 'About', type: 'image', placeholder: '' },
    { key: 'home_about_label', label: 'About Label', section: 'About', placeholder: 'About the Lab' },
    { key: 'home_about_title', label: 'About Title', section: 'About', placeholder: 'Advancing Materials Science' },
    { key: 'home_about_description', label: 'About Description', section: 'About', placeholder: 'The Defects and Internal Interfaces Lab...' },
    { key: 'home_lab_img', label: 'Lab Photo Banner', section: 'Lab Photo', type: 'image', placeholder: '' },
    { key: 'home_team_label', label: 'Team Label', section: 'Team', placeholder: 'Our Team' },
    { key: 'home_team_title', label: 'Team Title', section: 'Team', placeholder: 'People of DIIL' },
    { key: 'home_team_description', label: 'Team Description', section: 'Team', placeholder: 'A multidisciplinary team...' },
    { key: 'home_news_label', label: 'News Label', section: 'News', placeholder: 'Updates' },
    { key: 'home_news_title', label: 'News Title', section: 'News', placeholder: 'News & Announcements' },
    { key: 'home_cta_title', label: 'CTA Title', section: 'CTA', placeholder: 'Interested in Collaborating?' },
    { key: 'home_cta_description', label: 'CTA Description', section: 'CTA', placeholder: 'DIIL welcomes excellent PhD candidates...' },
    { key: 'research_publications_title', label: 'Publications Title (Research Page)', section: 'Research', placeholder: 'Selected Publications' },
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(key);
    try {
      const result = await api.upload(file, 'images/config');
      setConfig({ ...config, [key]: result.path });
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Failed to upload image');
    } finally {
      setUploading(null);
    }
  };

  const sections = ['Hero', 'About', 'Lab Photo', 'Team', 'News', 'Research', 'CTA'];

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
                  <div key={field.key} className={field.label.includes('Description') || field.key.includes('description') || field.type === 'image' ? 'md:col-span-2' : ''}>
                    <label className="block text-sm font-medium mb-1">{field.label}</label>
                    {field.type === 'image' ? (
                      <div className="space-y-2">
                        {config[field.key] && (
                          <div className="relative inline-block mt-2">
                            <img src={config[field.key]} alt="Preview" className="h-24 w-auto rounded border border-border object-contain bg-muted" />
                            <button
                              type="button"
                              onClick={() => handleChange(field.key, '')}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                            >
                              ×
                            </button>
                          </div>
                        )}
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, field.key)}
                            className="text-sm cursor-pointer"
                            disabled={uploading === field.key}
                          />
                          {uploading === field.key && <span className="text-xs text-muted-foreground ml-2">Uploading...</span>}
                        </div>
                      </div>
                    ) : field.key.includes('description') || field.key.includes('title') || field.key.includes('hero_title') ? (
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

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { api, Settings } from "@/lib/api";

export default function AdminSettings() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await api.getSettings();
      setSettings(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    try {
      await api.updateSettings(settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-10">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-bold mb-6">Site Settings</h1>
        
        <div className="bg-card border border-border rounded-xl p-6 max-w-2xl">
          <h2 className="font-semibold mb-4">Contact Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Contact Name</label>
              <input 
                type="text" 
                value={settings?.contact_name || ''} 
                onChange={(e) => setSettings({...settings!, contact_name: e.target.value})} 
                className="w-full px-3 py-2 rounded-md border border-border bg-background" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contact Email</label>
              <input 
                type="email" 
                value={settings?.contact_email || ''} 
                onChange={(e) => setSettings({...settings!, contact_email: e.target.value})} 
                className="w-full px-3 py-2 rounded-md border border-border bg-background" 
              />
            </div>
          </div>

          <h2 className="font-semibold mt-6 mb-4">Location</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Building</label>
              <input 
                type="text" 
                value={settings?.location_building || ''} 
                onChange={(e) => setSettings({...settings!, location_building: e.target.value})} 
                className="w-full px-3 py-2 rounded-md border border-border bg-background" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Room</label>
              <input 
                type="text" 
                value={settings?.location_room || ''} 
                onChange={(e) => setSettings({...settings!, location_room: e.target.value})} 
                className="w-full px-3 py-2 rounded-md border border-border bg-background" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Faculty</label>
              <input 
                type="text" 
                value={settings?.location_faculty || ''} 
                onChange={(e) => setSettings({...settings!, location_faculty: e.target.value})} 
                className="w-full px-3 py-2 rounded-md border border-border bg-background" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">University</label>
              <input 
                type="text" 
                value={settings?.location_university || ''} 
                onChange={(e) => setSettings({...settings!, location_university: e.target.value})} 
                className="w-full px-3 py-2 rounded-md border border-border bg-background" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input 
                  type="text" 
                  value={settings?.location_city || ''} 
                  onChange={(e) => setSettings({...settings!, location_city: e.target.value})} 
                  className="w-full px-3 py-2 rounded-md border border-border bg-background" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Country</label>
                <input 
                  type="text" 
                  value={settings?.location_country || ''} 
                  onChange={(e) => setSettings({...settings!, location_country: e.target.value})} 
                  className="w-full px-3 py-2 rounded-md border border-border bg-background" 
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t">
            <button 
              onClick={handleSave} 
              disabled={saving} 
              className="bg-accent text-accent-foreground px-6 py-2.5 rounded-md text-sm font-medium hover:bg-accent/90 disabled:opacity-50"
            >
              {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

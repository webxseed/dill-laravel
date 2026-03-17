import { useState, useEffect } from "react";
import { api, Publication } from "@/lib/api";

export default function AdminPublications() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [editing, setEditing] = useState<Publication | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadPublications();
  }, []);

  const loadPublications = async () => {
    try {
      const data = await api.getPublications();
      setPublications(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      await api.savePublication(editing);
      setEditing(null);
      loadPublications();
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this publication?')) return;
    try {
      await api.deletePublication(id);
      loadPublications();
    } catch (e) {
      console.error(e);
    }
  };

  const addNew = () => {
    setEditing({
      id: 0,
      citation: '',
      sort_order: publications.length + 1,
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Publications Management</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Publications</h2>
            <button onClick={addNew} className="text-sm bg-accent text-accent-foreground px-3 py-1 rounded-md">
              + Add
            </button>
          </div>
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {publications.map((pub) => (
              <div key={pub.id} className={`p-3 rounded-lg border flex justify-between items-center ${editing?.id === pub.id ? 'border-accent' : 'border-border'}`}>
                <div className="truncate flex-1 mr-2">
                  <span className="text-sm">{pub.citation}</span>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => setEditing(pub)} className="text-xs text-blue-500 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(pub.id)} className="text-xs text-red-500 hover:underline">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          {editing ? (
            <>
              <h2 className="font-semibold mb-4">{editing.id ? 'Edit' : 'Add'} Publication</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Citation</label>
                  <textarea 
                    value={editing.citation} 
                    onChange={(e) => setEditing({...editing, citation: e.target.value})} 
                    className="w-full px-3 py-2 rounded-md border border-border bg-background" 
                    rows={4}
                    placeholder="Enter the full citation..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Sort Order</label>
                  <input 
                    type="number" 
                    value={editing.sort_order} 
                    onChange={(e) => setEditing({...editing, sort_order: parseInt(e.target.value)})} 
                    className="w-full px-3 py-2 rounded-md border border-border bg-background" 
                  />
                </div>
                <div className="flex gap-2">
                  <button onClick={handleSave} disabled={saving} className="bg-accent text-accent-foreground px-4 py-2 rounded-md text-sm">
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button onClick={() => setEditing(null)} className="bg-secondary px-4 py-2 rounded-md text-sm">
                    Cancel
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p className="text-muted-foreground">Select a publication to edit or add a new one</p>
          )}
        </div>
      </div>
    </div>
  );
}

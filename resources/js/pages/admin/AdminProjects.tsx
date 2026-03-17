import { useState, useEffect, useRef } from "react";
import { api, Project } from "@/lib/api";

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await api.getProjects();
      setProjects(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      await api.saveProject(editing);
      setEditing(null);
      loadProjects();
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this project?')) return;
    try {
      await api.deleteProject(id);
      loadProjects();
    } catch (e) {
      console.error(e);
    }
  };

  const addNew = () => {
    setEditing({
      id: 0,
      title: '',
      summary: '',
      detail: '',
      funding: '',
      period: '',
      status: 'current',
      sort_order: projects.length + 1,
      image: '',
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    
    setUploading(true);
    try {
      const result = await api.upload(file, 'images/projects');
      setEditing({ ...editing, image: result.path });
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
        <h1 className="text-2xl font-bold mb-6">Projects Management</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Projects</h2>
              <button onClick={addNew} className="text-sm bg-accent text-accent-foreground px-3 py-1 rounded-md">
                + Add
              </button>
            </div>
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {projects.map((project) => (
                <div key={project.id} className={`p-3 rounded-lg border flex justify-between items-center ${editing?.id === project.id ? 'border-accent' : 'border-border'}`}>
                  <div>
                    <span className="font-medium">{project.title}</span>
                    <span className="text-xs text-muted-foreground ml-2">({project.status})</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditing(project)} className="text-xs text-blue-500 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(project.id)} className="text-xs text-red-500 hover:underline">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            {editing ? (
              <>
                <h2 className="font-semibold mb-4">{editing.id ? 'Edit' : 'Add'} Project</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input type="text" value={editing.title} onChange={(e) => setEditing({...editing, title: e.target.value})} className="w-full px-3 py-2 rounded-md border border-border bg-background" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Funding</label>
                    <input type="text" value={editing.funding} onChange={(e) => setEditing({...editing, funding: e.target.value})} className="w-full px-3 py-2 rounded-md border border-border bg-background" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select value={editing.status} onChange={(e) => setEditing({...editing, status: e.target.value as 'current' | 'previous'})} className="w-full px-3 py-2 rounded-md border border-border bg-background">
                      <option value="current">Current</option>
                      <option value="previous">Previous</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Period</label>
                    <input type="text" value={editing.period || ''} onChange={(e) => setEditing({...editing, period: e.target.value})} className="w-full px-3 py-2 rounded-md border border-border bg-background" placeholder="e.g., 2023-2025" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Image</label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="text-sm bg-secondary text-foreground px-3 py-2 rounded-md hover:bg-secondary/80 disabled:opacity-50"
                      >
                        {uploading ? 'Uploading...' : 'Choose Image'}
                      </button>
                      {editing.image && (
                        <div className="relative inline-block">
                          <img src={editing.image} alt="Preview" className="h-20 w-auto rounded border" />
                          <button
                            type="button"
                            onClick={() => setEditing({...editing, image: ''})}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                          >
                            ×
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Summary</label>
                    <textarea value={editing.summary || ''} onChange={(e) => setEditing({...editing, summary: e.target.value})} className="w-full px-3 py-2 rounded-md border border-border bg-background" rows={2} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Detail</label>
                    <textarea value={editing.detail || ''} onChange={(e) => setEditing({...editing, detail: e.target.value})} className="w-full px-3 py-2 rounded-md border border-border bg-background" rows={3} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Sort Order</label>
                    <input type="number" value={editing.sort_order} onChange={(e) => setEditing({...editing, sort_order: parseInt(e.target.value)})} className="w-full px-3 py-2 rounded-md border border-border bg-background" />
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
              <p className="text-muted-foreground">Select a project to edit or add a new one</p>
            )}
          </div>
        </div>
      </div>
  );
}

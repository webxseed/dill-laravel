import { useState, useEffect, useRef } from "react";
import { api } from "@/lib/api";
import RichEditor from "@/components/admin/RichEditor";

interface Page {
  id: number;
  slug: string;
  title: string;
  content: string;
  image: string;
  meta_title: string;
  meta_description: string;
  is_published: boolean;
}

export default function AdminPages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [editing, setEditing] = useState<Page | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    try {
      const data = await api.get("/pages");
      setPages(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (editing.id) {
        await api.put(`/pages/${editing.id}`, editing);
      } else {
        await api.post('/pages', editing);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      setEditing(null);
      loadPages();
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this page?')) return;
    try {
      await api.delete(`/pages/${id}`);
      loadPages();
      if (editing?.id === id) setEditing(null);
    } catch (e) {
      console.error(e);
    }
  };

  const addNew = () => {
    setEditing({
      id: 0,
      slug: '',
      title: '',
      content: '',
      image: '',
      meta_title: '',
      meta_description: '',
      is_published: true,
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    
    setUploading(true);
    try {
      const result = await api.upload(file, 'images/pages');
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
        <h1 className="text-2xl font-bold mb-6">Pages</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pages List */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">All Pages</h2>
              <button onClick={addNew} className="text-sm bg-accent text-accent-foreground px-3 py-1 rounded-md">
                + Add
              </button>
            </div>
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {pages.map((page) => (
                <div
                  key={page.id}
                  className={`p-3 rounded-lg border flex justify-between items-center ${
                    editing?.id === page.id
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-accent/50"
                  }`}
                  onClick={() => setEditing(page)}
                >
                  <div>
                    <span className="font-medium">{page.title}</span>
                    <span className="text-xs text-muted-foreground ml-2">/{page.slug}</span>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDelete(page.id); }}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Edit Form */}
          <div className="bg-card border border-border rounded-xl p-6">
            {editing ? (
              <>
                <h2 className="font-semibold mb-4">{editing.id ? 'Edit' : 'Add'} Page</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Slug</label>
                    <input
                      type="text"
                      value={editing.slug}
                      onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                      className="w-full px-3 py-2 rounded-md border border-border bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                      type="text"
                      value={editing.title}
                      onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-md border border-border bg-background"
                    />
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
                    <label className="block text-sm font-medium mb-1">Content</label>
                    <RichEditor
                      value={editing.content}
                      onChange={(value) => setEditing({ ...editing, content: value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Meta Title</label>
                    <input
                      type="text"
                      value={editing.meta_title || ""}
                      onChange={(e) => setEditing({ ...editing, meta_title: e.target.value })}
                      className="w-full px-3 py-2 rounded-md border border-border bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Meta Description</label>
                    <textarea
                      value={editing.meta_description || ""}
                      onChange={(e) => setEditing({ ...editing, meta_description: e.target.value })}
                      className="w-full px-3 py-2 rounded-md border border-border bg-background"
                      rows={2}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="published"
                      checked={editing.is_published}
                      onChange={(e) => setEditing({ ...editing, is_published: e.target.checked })}
                      className="rounded"
                    />
                    <label htmlFor="published" className="text-sm">Published</label>
                  </div>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full bg-accent text-accent-foreground px-6 py-2.5 rounded-md text-sm font-medium hover:bg-accent/90 disabled:opacity-50"
                  >
                    {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
                  </button>
                </div>
              </>
            ) : (
              <p className="text-muted-foreground">Select a page to edit</p>
            )}
          </div>
        </div>
      </div>
  );
}

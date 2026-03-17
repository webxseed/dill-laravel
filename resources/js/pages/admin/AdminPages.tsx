import { useState, useEffect } from "react";
import { api } from "@/lib/api";

interface Page {
  id: number;
  slug: string;
  title: string;
  content: string;
  meta_title: string;
  meta_description: string;
  is_published: boolean;
}

export default function AdminPages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [editing, setEditing] = useState<Page | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

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
      await api.put(`/pages/${editing.id}`, editing);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      loadPages();
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
        <h1 className="text-2xl font-bold mb-6">Pages</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pages List */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-semibold mb-4">All Pages</h2>
            <div className="space-y-2">
              {pages.map((page) => (
                <div
                  key={page.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    editing?.id === page.id
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-accent/50"
                  }`}
                  onClick={() => setEditing(page)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{page.title}</span>
                    <span className="text-xs text-muted-foreground">/{page.slug}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Edit Form */}
          <div className="bg-card border border-border rounded-xl p-6">
            {editing ? (
              <>
                <h2 className="font-semibold mb-4">Edit: {editing.title}</h2>
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
                    <label className="block text-sm font-medium mb-1">Content (JSON)</label>
                    <textarea
                      value={editing.content}
                      onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                      className="w-full px-3 py-2 rounded-md border border-border bg-background font-mono text-sm"
                      rows={6}
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

import { useState, useEffect } from "react";
import { api, News } from "@/lib/api";

export default function AdminNews() {
  const [news, setNews] = useState<News[]>([]);
  const [editing, setEditing] = useState<News | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const data = await api.getNews();
      setNews(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      await api.saveNews(editing);
      setEditing(null);
      loadNews();
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this news item?')) return;
    try {
      await api.deleteNews(id);
      loadNews();
    } catch (e) {
      console.error(e);
    }
  };

  const addNew = () => {
    setEditing({
      id: 0,
      title: '',
      text: '',
      date: new Date().toISOString().split('T')[0],
      image: '',
      sort_order: news.length + 1,
      is_visible: true,
    });
  };

  return (
    <div>
        <h1 className="text-2xl font-bold mb-6">News Management</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">News Items</h2>
              <button onClick={addNew} className="text-sm bg-accent text-accent-foreground px-3 py-1 rounded-md">
                + Add
              </button>
            </div>
            <div className="space-y-2">
              {news.map((item) => (
                <div key={item.id} className={`p-3 rounded-lg border flex justify-between items-center ${editing?.id === item.id ? 'border-accent' : 'border-border'}`}>
                  <div>
                    <span className="font-medium">{item.title}</span>
                    <span className="text-xs text-muted-foreground ml-2">{item.date}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditing(item)} className="text-xs text-blue-500 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(item.id)} className="text-xs text-red-500 hover:underline">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            {editing ? (
              <>
                <h2 className="font-semibold mb-4">{editing.id ? 'Edit' : 'Add'} News Item</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input type="text" value={editing.title} onChange={(e) => setEditing({...editing, title: e.target.value})} className="w-full px-3 py-2 rounded-md border border-border bg-background" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Date</label>
                    <input type="text" value={editing.date} onChange={(e) => setEditing({...editing, date: e.target.value})} className="w-full px-3 py-2 rounded-md border border-border bg-background" placeholder="February 2024" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Text</label>
                    <textarea value={editing.text || ''} onChange={(e) => setEditing({...editing, text: e.target.value})} className="w-full px-3 py-2 rounded-md border border-border bg-background" rows={3} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Sort Order</label>
                    <input type="number" value={editing.sort_order} onChange={(e) => setEditing({...editing, sort_order: parseInt(e.target.value)})} className="w-full px-3 py-2 rounded-md border border-border bg-background" />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="visible" checked={editing.is_visible} onChange={(e) => setEditing({...editing, is_visible: e.target.checked})} className="rounded" />
                    <label htmlFor="visible" className="text-sm">Visible</label>
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
              <p className="text-muted-foreground">Select an item to edit or add a new one</p>
            )}
          </div>
        </div>
      </div>
  );
}

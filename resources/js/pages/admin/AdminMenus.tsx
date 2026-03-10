import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { api, MenuItem } from "@/lib/api";

export default function AdminMenus() {
  const [menuType, setMenuType] = useState<'main' | 'footer'>('main');
  const [items, setItems] = useState<MenuItem[]>([]);
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadMenu();
  }, [menuType]);

  const loadMenu = async () => {
    try {
      const data = await api.getMenu(menuType);
      setItems(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      await api.saveMenuItem(editing);
      setEditing(null);
      loadMenu();
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this item?')) return;
    try {
      await api.deleteMenuItem(id);
      loadMenu();
    } catch (e) {
      console.error(e);
    }
  };

  const addNew = () => {
    setEditing({
      id: 0,
      menu: menuType,
      label: '',
      path: '/',
      sort_order: items.length + 1,
      is_visible: true,
    });
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-bold mb-6">Menu Management</h1>
        
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setMenuType('main')}
            className={`px-4 py-2 rounded-md ${menuType === 'main' ? 'bg-accent text-accent-foreground' : 'bg-secondary'}`}
          >
            Main Menu
          </button>
          <button
            onClick={() => setMenuType('footer')}
            className={`px-4 py-2 rounded-md ${menuType === 'footer' ? 'bg-accent text-accent-foreground' : 'bg-secondary'}`}
          >
            Footer Menu
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Items List */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">{menuType === 'main' ? 'Main' : 'Footer'} Menu Items</h2>
              <button onClick={addNew} className="text-sm bg-accent text-accent-foreground px-3 py-1 rounded-md">
                + Add
              </button>
            </div>
            <div className="space-y-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-lg border flex justify-between items-center ${
                    editing?.id === item.id ? "border-accent" : "border-border"
                  }`}
                >
                  <div>
                    <span className="font-medium">{item.label}</span>
                    <span className="text-xs text-muted-foreground ml-2">{item.path}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditing(item)}
                      className="text-xs text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {items.length === 0 && (
                <p className="text-muted-foreground text-sm">No items yet</p>
              )}
            </div>
          </div>

          {/* Edit Form */}
          <div className="bg-card border border-border rounded-xl p-6">
            {editing ? (
              <>
                <h2 className="font-semibold mb-4">
                  {editing.id ? 'Edit' : 'Add'} Menu Item
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Label</label>
                    <input
                      type="text"
                      value={editing.label}
                      onChange={(e) => setEditing({ ...editing, label: e.target.value })}
                      className="w-full px-3 py-2 rounded-md border border-border bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Path</label>
                    <input
                      type="text"
                      value={editing.path}
                      onChange={(e) => setEditing({ ...editing, path: e.target.value })}
                      className="w-full px-3 py-2 rounded-md border border-border bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Sort Order</label>
                    <input
                      type="number"
                      value={editing.sort_order}
                      onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 rounded-md border border-border bg-background"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="visible"
                      checked={editing.is_visible}
                      onChange={(e) => setEditing({ ...editing, is_visible: e.target.checked })}
                      className="rounded"
                    />
                    <label htmlFor="visible" className="text-sm">Visible</label>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="bg-accent text-accent-foreground px-4 py-2 rounded-md text-sm"
                    >
                      {saving ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={() => setEditing(null)}
                      className="bg-secondary px-4 py-2 rounded-md text-sm"
                    >
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
    </AdminLayout>
  );
}

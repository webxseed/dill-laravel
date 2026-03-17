import { useState, useEffect } from "react";
import { api, Product } from "@/lib/api";

export default function AdminFacilities() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await api.getProducts();
      setProducts(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      await api.saveProduct(editing);
      setEditing(null);
      loadProducts();
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this equipment?')) return;
    try {
      await api.deleteProduct(id);
      loadProducts();
    } catch (e) {
      console.error(e);
    }
  };

  const addNew = () => {
    setEditing({
      id: 0,
      name: '',
      features: '',
      image: '',
      category: 'Materials Fabrication',
      sort_order: products.length + 1,
    });
  };

  const categories = [
    'Materials Fabrication',
    'Heat Treatments',
    'Mechanical Treatments',
    'Sample Preparation',
    'Material Characterization',
  ];

  return (
    <div>
        <h1 className="text-2xl font-bold mb-6">Facilities/Equipment Management</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Equipment</h2>
              <button onClick={addNew} className="text-sm bg-accent text-accent-foreground px-3 py-1 rounded-md">
                + Add
              </button>
            </div>
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {products.map((product) => (
                <div key={product.id} className={`p-3 rounded-lg border flex justify-between items-center ${editing?.id === product.id ? 'border-accent' : 'border-border'}`}>
                  <div>
                    <span className="font-medium">{product.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">({product.category})</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditing(product)} className="text-xs text-blue-500 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(product.id)} className="text-xs text-red-500 hover:underline">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            {editing ? (
              <>
                <h2 className="font-semibold mb-4">{editing.id ? 'Edit' : 'Add'} Equipment</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input type="text" value={editing.name} onChange={(e) => setEditing({...editing, name: e.target.value})} className="w-full px-3 py-2 rounded-md border border-border bg-background" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select value={editing.category} onChange={(e) => setEditing({...editing, category: e.target.value})} className="w-full px-3 py-2 rounded-md border border-border bg-background">
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Image URL</label>
                    <input type="text" value={editing.image || ''} onChange={(e) => setEditing({...editing, image: e.target.value})} className="w-full px-3 py-2 rounded-md border border-border bg-background" placeholder="/images/facilities/..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Features (one per line)</label>
                    <textarea value={typeof editing.features === 'string' ? editing.features : (editing.features as unknown as string) || ''} onChange={(e) => setEditing({...editing, features: e.target.value})} className="w-full px-3 py-2 rounded-md border border-border bg-background" rows={4} placeholder="Feature 1&#10;Feature 2&#10;Feature 3" />
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
              <p className="text-muted-foreground">Select an equipment to edit or add a new one</p>
            )}
          </div>
        </div>
      </div>
  );
}

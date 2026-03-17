import { useState, useEffect, useRef } from "react";
import { api, Product } from "@/lib/api";

export default function AdminFacilities() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [features, setFeatures] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    setFeatures(['']);
    setEditing({
      id: 0,
      name: '',
      features: '',
      image: '',
      category: 'Materials Fabrication',
      sort_order: products.length + 1,
    });
  };

  // Load features when editing changes
  useEffect(() => {
    if (editing) {
      let parsed: string[] = [];
      if (editing.features) {
        try {
          parsed = typeof editing.features === 'string' 
            ? JSON.parse(editing.features) 
            : editing.features;
        } catch {
          parsed = [];
        }
      }
      setFeatures(parsed.length > 0 ? parsed : ['']);
    }
  }, [editing?.id]);

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
    setEditing(editing ? { ...editing, features: JSON.stringify(newFeatures.filter(f => f.trim())) } : null);
  };

  const addFeature = () => {
    setFeatures([...features, '']);
  };

  const removeFeature = (index: number) => {
    const newFeatures = features.filter((_, i) => i !== index);
    setFeatures(newFeatures);
    setEditing(editing ? { ...editing, features: JSON.stringify(newFeatures.filter(f => f.trim())) } : null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    
    setUploading(true);
    try {
      const result = await api.upload(file, 'images/facilities');
      setEditing({ ...editing, image: result.path });
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
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
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-sm font-medium">Features</label>
                      <button
                        type="button"
                        onClick={addFeature}
                        className="text-xs bg-secondary text-foreground px-2 py-1 rounded hover:bg-secondary/80"
                      >
                        + Add
                      </button>
                    </div>
                    <div className="space-y-2">
                      {features.map((feature, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => handleFeatureChange(index, e.target.value)}
                            className="flex-1 px-3 py-2 rounded-md border border-border bg-background text-sm"
                            placeholder={`Feature ${index + 1}`}
                          />
                          {features.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeFeature(index)}
                              className="text-red-500 hover:text-red-700 px-2"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
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

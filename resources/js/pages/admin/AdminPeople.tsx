import { useState, useEffect } from "react";
import { api, Person } from "@/lib/api";

export default function AdminPeople() {
  const [people, setPeople] = useState<Person[]>([]);
  const [editing, setEditing] = useState<Person | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadPeople();
  }, []);

  const loadPeople = async () => {
    try {
      const data = await api.getPeople();
      setPeople(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      await api.savePerson(editing);
      setEditing(null);
      loadPeople();
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this person?')) return;
    try {
      await api.deletePerson(id);
      loadPeople();
    } catch (e) {
      console.error(e);
    }
  };

  const addNew = () => {
    setEditing({
      id: 0,
      name: '',
      role: '',
      email: '',
      location: '',
      bio: '',
      image: '',
      publications: false,
      type: 'member',
      sort_order: people.length + 1,
    });
  };

  return (
    <div>
        <h1 className="text-2xl font-bold mb-6">People Management</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">People</h2>
              <button onClick={addNew} className="text-sm bg-accent text-accent-foreground px-3 py-1 rounded-md">
                + Add
              </button>
            </div>
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {people.map((person) => (
                <div key={person.id} className={`p-3 rounded-lg border flex justify-between items-center ${editing?.id === person.id ? 'border-accent' : 'border-border'}`}>
                  <div>
                    <span className="font-medium">{person.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">({person.type})</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditing(person)} className="text-xs text-blue-500 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(person.id)} className="text-xs text-red-500 hover:underline">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            {editing ? (
              <>
                <h2 className="font-semibold mb-4">{editing.id ? 'Edit' : 'Add'} Person</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input type="text" value={editing.name} onChange={(e) => setEditing({...editing, name: e.target.value})} className="w-full px-3 py-2 rounded-md border border-border bg-background" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Role</label>
                    <input type="text" value={editing.role} onChange={(e) => setEditing({...editing, role: e.target.value})} className="w-full px-3 py-2 rounded-md border border-border bg-background" placeholder="e.g., Principal Investigator" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Type</label>
                    <select value={editing.type} onChange={(e) => setEditing({...editing, type: e.target.value as 'member' | 'alumni'})} className="w-full px-3 py-2 rounded-md border border-border bg-background">
                      <option value="member">Member</option>
                      <option value="alumni">Alumni</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input type="email" value={editing.email || ''} onChange={(e) => setEditing({...editing, email: e.target.value})} className="w-full px-3 py-2 rounded-md border border-border bg-background" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <input type="text" value={editing.location || ''} onChange={(e) => setEditing({...editing, location: e.target.value})} className="w-full px-3 py-2 rounded-md border border-border bg-background" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Image URL</label>
                    <input type="text" value={editing.image || ''} onChange={(e) => setEditing({...editing, image: e.target.value})} className="w-full px-3 py-2 rounded-md border border-border bg-background" placeholder="/images/people/..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Bio</label>
                    <textarea value={editing.bio || ''} onChange={(e) => setEditing({...editing, bio: e.target.value})} className="w-full px-3 py-2 rounded-md border border-border bg-background" rows={3} />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="publications" checked={editing.publications} onChange={(e) => setEditing({...editing, publications: e.target.checked})} className="rounded" />
                    <label htmlFor="publications" className="text-sm">Show in Publications</label>
                  </div>
                  {editing.type === 'alumni' && (
                    <div>
                      <label className="block text-sm font-medium mb-1">Alumni Topic</label>
                      <input type="text" value={editing.alumni_topic || ''} onChange={(e) => setEditing({...editing, alumni_topic: e.target.value})} className="w-full px-3 py-2 rounded-md border border-border bg-background" />
                    </div>
                  )}
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
              <p className="text-muted-foreground">Select a person to edit or add a new one</p>
            )}
          </div>
        </div>
      </div>
  );
}

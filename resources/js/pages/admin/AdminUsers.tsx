import { useState, useEffect } from "react";

import { api, User } from "@/lib/api";

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [editing, setEditing] = useState<User | null>(null);
  const [saving, setSaving] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    loadUsers();
    const user = api.getUser();
    if (user) setCurrentUserId(user.id);
  }, []);

  const loadUsers = async () => {
    try {
      const data = await api.getUsers();
      setUsers(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      await api.saveUser(editing);
      setEditing(null);
      loadUsers();
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this user?')) return;
    try {
      await api.deleteUser(id);
      loadUsers();
    } catch (e: any) {
      alert(e.message || 'Cannot delete this user');
    }
  };

  const addNew = () => {
    setEditing({
      id: 0,
      name: '',
      email: '',
      password: '',
    });
  };

  return (
    
      <div>
        <h1 className="text-2xl font-bold mb-6">User Management</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Users</h2>
              <button onClick={addNew} className="text-sm bg-accent text-accent-foreground px-3 py-1 rounded-md">
                + Add
              </button>
            </div>
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {users.map((user) => (
                <div key={user.id} className={`p-3 rounded-lg border flex justify-between items-center ${editing?.id === user.id ? 'border-accent' : 'border-border'}`}>
                  <div>
                    <span className="font-medium">{user.name}</span>
                    <span className="text-xs text-muted-foreground ml-2 block">{user.email}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditing(user)} className="text-xs text-blue-500 hover:underline">Edit</button>
                    {user.id !== currentUserId && (
                      <button onClick={() => handleDelete(user.id)} className="text-xs text-red-500 hover:underline">Delete</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            {editing ? (
              <>
                <h2 className="font-semibold mb-4">{editing.id ? 'Edit' : 'Add'} User</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input 
                      type="text" 
                      value={editing.name} 
                      onChange={(e) => setEditing({...editing, name: e.target.value})} 
                      className="w-full px-3 py-2 rounded-md border border-border bg-background" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input 
                      type="email" 
                      value={editing.email} 
                      onChange={(e) => setEditing({...editing, email: e.target.value})} 
                      className="w-full px-3 py-2 rounded-md border border-border bg-background" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Password {editing.id ? '(leave blank to keep current)' : ''}
                    </label>
                    <input 
                      type="password" 
                      value={editing.password || ''} 
                      onChange={(e) => setEditing({...editing, password: e.target.value})} 
                      className="w-full px-3 py-2 rounded-md border border-border bg-background" 
                      placeholder={editing.id ? '••••••••' : 'Enter password'}
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
              <p className="text-muted-foreground">Select a user to edit or add a new one</p>
            )}
          </div>
        </div>
      </div>
    
  );
}

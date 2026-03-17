import { useState, useEffect } from "react";

import { api } from "@/lib/api";

interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function AdminContactSubmissions() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      const data = await api.getContactSubmissions();
      setSubmissions(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: number) => {
    try {
      await api.markContactAsRead(id);
      loadSubmissions();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this submission?')) return;
    try {
      await api.deleteContactSubmission(id);
      loadSubmissions();
    } catch (e) {
      console.error(e);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      
        <div className="text-center py-10">Loading...</div>
      
    );
  }

  return (
    
      <div>
        <h1 className="text-2xl font-bold mb-6">Contact Form Submissions</h1>
        
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {submissions.length === 0 ? (
            <div className="p-6 text-muted-foreground">No submissions yet.</div>
          ) : (
            <div className="divide-y divide-border">
              {submissions.map((sub) => (
                <div key={sub.id} className={`p-4 ${sub.is_read ? 'opacity-60' : 'bg-blue-50/50'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-semibold">{sub.name}</span>
                      <span className="text-muted-foreground text-sm ml-2">{sub.email}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{formatDate(sub.created_at)}</span>
                  </div>
                  {sub.subject && (
                    <p className="text-sm font-medium text-accent mb-1">{sub.subject}</p>
                  )}
                  <p className="text-sm text-muted-foreground mb-3 whitespace-pre-wrap">{sub.message}</p>
                  <div className="flex gap-2">
                    {!sub.is_read && (
                      <button
                        onClick={() => markAsRead(sub.id)}
                        className="text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Mark as Read
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(sub.id)}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    
  );
}

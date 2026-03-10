const API_BASE = '/api';

export const api = {
  async get(endpoint: string) {
    const res = await fetch(`${API_BASE}${endpoint}`);
    if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
    return res.json();
  },

  async post(endpoint: string, data: any) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Failed to create ${endpoint}`);
    return res.json();
  },

  async put(endpoint: string, data: any) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Failed to update ${endpoint}`);
    return res.json();
  },

  async delete(endpoint: string) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error(`Failed to delete ${endpoint}`);
  },

  async getSettings() {
    return this.get('/settings');
  },

  async updateSettings(settings: Record<string, string>) {
    const res = await fetch(`${API_BASE}/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    if (!res.ok) throw new Error('Failed to update settings');
    return res.json();
  },

  async getMenu(menu: string) {
    return this.get(`/menu?menu=${menu}`);
  },

  async saveMenuItem(item: Partial<MenuItem>) {
    if (item.id) {
      return this.put(`/menu/${item.id}`, item);
    } else {
      return this.post('/menu', item);
    }
  },

  async deleteMenuItem(id: number) {
    return this.delete(`/menu/${id}`);
  },
};

// Types
export interface Person {
  id: number;
  name: string;
  role: string;
  email?: string;
  location?: string;
  bio?: string;
  image?: string;
  publications: boolean;
  type: 'member' | 'alumni';
  alumni_topic?: string;
  sort_order: number;
}

export interface Project {
  id: number;
  title: string;
  summary?: string;
  detail?: string;
  funding: string;
  period?: string;
  status: 'current' | 'previous';
  sort_order: number;
}

export interface Product {
  id: number;
  name: string;
  features?: string;
  image?: string;
  category: string;
  sort_order: number;
}

export interface Settings {
  contact_name: string;
  contact_email: string;
  location_building: string;
  location_room: string;
  location_faculty: string;
  location_university: string;
  location_city: string;
  location_country: string;
}

export interface MenuItem {
  id: number;
  menu: string;
  label: string;
  path: string;
  sort_order: number;
  is_visible: boolean;
}

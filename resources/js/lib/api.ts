const API_BASE = '/api';

const getToken = () => localStorage.getItem('token');

export const api = {
  async get(endpoint: string) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: authHeader(),
    });
    if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
    return res.json();
  },

  async post(endpoint: string, data: any) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeader() },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Failed to create ${endpoint}`);
    return res.json();
  },

  async put(endpoint: string, data: any) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeader() },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Failed to update ${endpoint}`);
    return res.json();
  },

  async delete(endpoint: string) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'DELETE',
      headers: authHeader(),
    });
    if (!res.ok) throw new Error(`Failed to delete ${endpoint}`);
  },

  async upload(file: File, folder: string = 'uploads') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    
    const token = getToken();
    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });
    if (!res.ok) throw new Error('Failed to upload file');
    return res.json();
  },

  async login(email: string, password: string) {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Login failed');
    }
    const data = await res.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  },

  async logout() {
    try {
      await fetch(`${API_BASE}/logout`, {
        method: 'POST',
        headers: authHeader(),
      });
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  isLoggedIn() {
    return !!getToken();
  },

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  async getSettings() {
    return this.get('/settings');
  },

  async getPage(slug: string) {
    return this.get(`/pages/${slug}`);
  },

  async updateSettings(settings: Record<string, string>) {
    const res = await fetch(`${API_BASE}/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeader() },
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

  async getNews() {
    return this.get('/news');
  },

  async saveNews(news: Partial<News>) {
    if (news.id) {
      return this.put(`/news/${news.id}`, news);
    } else {
      return this.post('/news', news);
    }
  },

  async deleteNews(id: number) {
    return this.delete(`/news/${id}`);
  },

  async getProjects() {
    return this.get('/projects');
  },

  async saveProject(project: Partial<Project>) {
    if (project.id) {
      return this.put(`/projects/${project.id}`, project);
    } else {
      return this.post('/projects', project);
    }
  },

  async deleteProject(id: number) {
    return this.delete(`/projects/${id}`);
  },

  async getPeople() {
    return this.get('/people');
  },

  async savePerson(person: Partial<Person>) {
    if (person.id) {
      return this.put(`/people/${person.id}`, person);
    } else {
      return this.post('/people', person);
    }
  },

  async deletePerson(id: number) {
    return this.delete(`/people/${id}`);
  },

  async getProducts() {
    return this.get('/products');
  },

  async saveProduct(product: Partial<Product>) {
    if (product.id) {
      return this.put(`/products/${product.id}`, product);
    } else {
      return this.post('/products', product);
    }
  },

  async deleteProduct(id: number) {
    return this.delete(`/products/${id}`);
  },

  async getPublications() {
    return this.get('/publications');
  },

  async savePublication(publication: Partial<Publication>) {
    if (publication.id) {
      return this.put(`/publications/${publication.id}`, publication);
    } else {
      return this.post('/publications', publication);
    }
  },

  async deletePublication(id: number) {
    return this.delete(`/publications/${id}`);
  },
};

function authHeader() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

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
  image?: string;
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

export interface News {
  id: number;
  title: string;
  text: string;
  date: string;
  image: string;
  sort_order: number;
  is_visible: boolean;
}

export interface Publication {
  id: number;
  citation: string;
  sort_order: number;
}

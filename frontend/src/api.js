import axios from 'axios';

const API_BASE_URL = '/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (username, password) =>
    api.post('/auth/login', { username, password }),
  register: (username, email, password) =>
    api.post('/auth/register', { username, email, password }),
  getMe: () => api.get('/auth/me'),
};

export const hostsAPI = {
  list: () => api.get('/hosts'),
  get: (id) => api.get(`/hosts/${id}`),
  create: (data) => api.post('/hosts', data),
  update: (id, data) => api.patch(`/hosts/${id}`, data),
  delete: (id) => api.delete(`/hosts/${id}`),
};

export const metricsAPI = {
  list: (params) => api.get('/metrics', { params }),
  create: (data) => api.post('/metrics', data),
  getLatest: (hostId) => api.get(`/metrics/latest/${hostId}`),
};

export const alertsAPI = {
  list: (params) => api.get('/alerts', { params }),
  create: (data) => api.post('/alerts', data),
};

export const triggersAPI = {
  list: (params) => api.get('/triggers', { params }),
  get: (id) => api.get(`/triggers/${id}`),
  create: (data) => api.post('/triggers', data),
  update: (id, data) => api.patch(`/triggers/${id}`, data),
};

export default api;

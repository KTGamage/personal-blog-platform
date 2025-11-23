import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me'),
};

export const postsAPI = {
  getPosts: (params) => api.get('/posts', { params }),
  getPost: (id) => api.get(`/posts/${id}`),
  createPost: (data) => api.post('/posts', data),
  updatePost: (id, data) => api.put(`/posts/${id}`, data),
  deletePost: (id) => api.delete(`/posts/${id}`),
  likePost: (id) => api.post(`/posts/${id}/like`),
  addComment: (id, data) => api.post(`/posts/${id}/comments`, data),
  getComments: (id) => api.get(`/posts/${id}/comments`),
};

export const usersAPI = {
  getUser: (id) => api.get(`/users/${id}`),
  updateProfile: (data) => api.put('/users/profile', data),
};

export const emailAPI = {
  contact: (data) => api.post('/email/contact', data),
  subscribeNewsletter: (email) => api.post('/email/newsletter/subscribe', email),
  unsubscribeNewsletter: (email) => api.post('/email/newsletter/unsubscribe', email),
  getSubscribers: () => api.get('/email/newsletter/subscribers'),
  sendNewsletter: (data) => api.post('/email/newsletter/send', data),
};

export const translationAPI = {
  translate: (data) => api.post('/translate', data),
};

export default api;
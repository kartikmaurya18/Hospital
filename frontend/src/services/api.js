import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific error cases
      switch (error.response.status) {
        case 404:
          // Not found - show error message
          console.error('Resource not found');
          break;
        case 500:
          // Server error - show error message
          console.error('Server error occurred');
          break;
        default:
          console.error('An error occurred:', error.response.data);
      }
    } else if (error.request) {
      // Network error
      console.error('Network error:', error.request);
    } else {
      // Other errors
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Patient endpoints
export const patients = {
  getAll: (params) => api.get('/api/patients', { params }),
  getById: (id) => api.get(`/api/patients/${id}`),
  create: (data) => api.post('/api/patients', data),
  update: (id, data) => api.put(`/api/patients/${id}`, data),
  delete: (id) => api.delete(`/api/patients/${id}`),
};

// Doctor endpoints
export const doctors = {
  getAll: (params) => api.get('/api/doctors', { params }),
  getById: (id) => api.get(`/api/doctors/${id}`),
  create: (data) => api.post('/api/doctors', data),
  update: (id, data) => api.put(`/api/doctors/${id}`, data),
  delete: (id) => api.delete(`/api/doctors/${id}`),
};

// Appointment endpoints
export const appointments = {
  getAll: (params) => api.get('/api/appointments', { params }),
  getById: (id) => api.get(`/api/appointments/${id}`),
  create: (data) => api.post('/api/appointments', data),
  update: (id, data) => api.put(`/api/appointments/${id}`, data),
  delete: (id) => api.delete(`/api/appointments/${id}`),
};

// Medical record endpoints
export const medicalRecords = {
  getAll: (params) => api.get('/api/medical-records', { params }),
  getById: (id) => api.get(`/api/medical-records/${id}`),
  create: (data) => api.post('/api/medical-records', data),
  update: (id, data) => api.put(`/api/medical-records/${id}`, data),
  delete: (id) => api.delete(`/api/medical-records/${id}`),
};

// Prescription endpoints
export const prescriptions = {
  getAll: (params) => api.get('/api/prescriptions', { params }),
  getById: (id) => api.get(`/api/prescriptions/${id}`),
  create: (data) => api.post('/api/prescriptions', data),
  update: (id, data) => api.put(`/api/prescriptions/${id}`, data),
  delete: (id) => api.delete(`/api/prescriptions/${id}`),
};

// Billing endpoints
export const billing = {
  getAll: (params) => api.get('/api/billing', { params }),
  getById: (id) => api.get(`/api/billing/${id}`),
  create: (data) => api.post('/api/billing', data),
  update: (id, data) => api.put(`/api/billing/${id}`, data),
  delete: (id) => api.delete(`/api/billing/${id}`),
};

// Inventory endpoints
export const inventory = {
  getAll: (params) => api.get('/api/inventory', { params }),
  getById: (id) => api.get(`/api/inventory/${id}`),
  create: (data) => api.post('/api/inventory', data),
  update: (id, data) => api.put(`/api/inventory/${id}`, data),
  delete: (id) => api.delete(`/api/inventory/${id}`),
};

// Staff endpoints
export const staff = {
  getAll: (params) => api.get('/api/staff', { params }),
  getById: (id) => api.get(`/api/staff/${id}`),
  create: (data) => api.post('/api/staff', data),
  update: (id, data) => api.put(`/api/staff/${id}`, data),
  delete: (id) => api.delete(`/api/staff/${id}`),
};

// Chat endpoints
export const chat = {
  getAll: (params) => api.get('/api/chat', { params }),
  getById: (id) => api.get(`/api/chat/${id}`),
  create: (data) => api.post('/api/chat', data),
  update: (id, data) => api.put(`/api/chat/${id}`, data),
  delete: (id) => api.delete(`/api/chat/${id}`),
};

// Auth endpoints
const auth = {
  login: (credentials) => api.post('/api/auth/login', credentials),
  logout: () => api.post('/api/auth/logout'),
  checkSession: () => api.get('/api/auth/check-session'),
  updatePassword: (data) => api.post('/api/auth/update-password', data),
};

export default api; 
/**
 * API Client for ServaSetu Backend
 * Handles all HTTP requests to the backend server
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Get auth token from localStorage or cookies
const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('servasetu_token');
  }
  return null;
};

// Generic API request handler
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ status: string; data: T; message?: string }> {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `API Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API Error - ${endpoint}:`, error);
    throw error;
  }
}

// Authentication APIs
export const authAPI = {
  register: (payload: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }) =>
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  login: (payload: { email: string; password: string }) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};

// Services APIs
export const servicesAPI = {
  getAll: (filters?: { category?: string; isActive?: boolean }) => {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.isActive !== undefined) params.append('isActive', String(filters.isActive));
    return apiRequest(`/services${params.toString() ? '?' + params.toString() : ''}`, {
      method: 'GET',
    });
  },

  getById: (id: string) =>
    apiRequest(`/services/${id}`, { method: 'GET' }),

  create: (payload: any) =>
    apiRequest('/services', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  update: (id: string, payload: any) =>
    apiRequest(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),

  delete: (id: string) =>
    apiRequest(`/services/${id}`, { method: 'DELETE' }),
};

// Bookings APIs
export const bookingsAPI = {
  create: (payload: {
    serviceId: string;
    scheduledDate: string;
    scheduledTime: string;
    address: {
      street: string;
      city: string;
      state: string;
      pincode: string;
    };
    notes?: string;
  }) =>
    apiRequest('/bookings', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getMyBookings: (filters?: { status?: string; paymentStatus?: string }) => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.paymentStatus) params.append('paymentStatus', filters.paymentStatus);
    return apiRequest(`/bookings/my-bookings${params.toString() ? '?' + params.toString() : ''}`, {
      method: 'GET',
    });
  },

  getById: (id: string) =>
    apiRequest(`/bookings/${id}`, { method: 'GET' }),

  updateStatus: (id: string, status: string) =>
    apiRequest(`/bookings/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  cancel: (id: string) =>
    apiRequest(`/bookings/${id}/cancel`, { method: 'PATCH' }),

  getAll: (filters?: { status?: string; paymentStatus?: string }) => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.paymentStatus) params.append('paymentStatus', filters.paymentStatus);
    return apiRequest(`/bookings/admin/all${params.toString() ? '?' + params.toString() : ''}`, {
      method: 'GET',
    });
  },
};

// Payment APIs
export const paymentAPI = {
  createOrder: (payload: { amount: number; bookingId?: string; receipt?: string }) =>
    apiRequest('/payment/create-order', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  verifyPayment: (payload: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) =>
    apiRequest('/payment/verify-payment', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getDetails: (paymentId: string) =>
    apiRequest(`/payment/${paymentId}`, { method: 'GET' }),
};

// User APIs
export const usersAPI = {
  getProfile: () => apiRequest('/users/profile', { method: 'GET' }),

  updateProfile: (payload: {
    name?: string;
    phone?: string;
    address?: {
      street?: string;
      city?: string;
      state?: string;
      pincode?: string;
    };
  }) =>
    apiRequest('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),

  getAll: () => apiRequest('/users', { method: 'GET' }),
};

// Helper functions for token management
export const tokenManager = {
  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('servasetu_token', token);
    }
  },

  getToken: () => getAuthToken(),

  removeToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('servasetu_token');
      localStorage.removeItem('servasetu_user');
    }
  },

  setUser: (user: any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('servasetu_user', JSON.stringify(user));
    }
  },

  getUser: () => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('servasetu_user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  },

  isAuthenticated: () => !!getAuthToken(),
};

export default {
  auth: authAPI,
  services: servicesAPI,
  bookings: bookingsAPI,
  payment: paymentAPI,
  users: usersAPI,
  tokens: tokenManager,
};

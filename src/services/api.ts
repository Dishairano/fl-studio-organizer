import axios from 'axios';
import { LoginCredentials, AuthResponse, SubscriptionResponse } from '../types/auth';

// Change this to your actual website URL
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/api/auth/login', credentials);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Login failed',
      };
    }
  },

  verifySubscription: async (): Promise<SubscriptionResponse> => {
    try {
      const response = await api.get<SubscriptionResponse>('/api/subscription');
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        hasSubscription: false,
        error: error.response?.data?.error || 'Failed to verify subscription',
      };
    }
  },
};

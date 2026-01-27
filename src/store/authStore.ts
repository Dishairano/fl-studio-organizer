import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, LoginCredentials } from '../types/auth';
import { authAPI } from '../services/api';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      hasSubscription: false,
      subscription: null,

      login: async (credentials: LoginCredentials) => {
        const response = await authAPI.login(credentials);
        
        if (response.success && response.token && response.user) {
          set({
            isAuthenticated: true,
            user: response.user,
            token: response.token,
          });
          
          // Store token for API requests
          localStorage.setItem('auth_token', response.token);
          
          // Verify subscription
          await get().verifySubscription();
          
          return true;
        }
        
        return false;
      },

      verifySubscription: async () => {
        const response = await authAPI.verifySubscription();
        
        if (response.success) {
          set({
            hasSubscription: response.hasSubscription,
            subscription: response.subscription || null,
          });
          
          return response.hasSubscription;
        }
        
        return false;
      },

      logout: () => {
        localStorage.removeItem('auth_token');
        set({
          isAuthenticated: false,
          user: null,
          token: null,
          hasSubscription: false,
          subscription: null,
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
        hasSubscription: state.hasSubscription,
        subscription: state.subscription,
      }),
    }
  )
);

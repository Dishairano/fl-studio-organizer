export interface User {
  id: number;
  email: string;
  display_name?: string;
  avatar_url?: string;
  isAdmin: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
  error?: string;
}

export interface SubscriptionResponse {
  success: boolean;
  hasSubscription: boolean;
  subscription?: {
    id: number;
    status: string;
    planName: string;
    price: number;
    currency: string;
    currentPeriodEnd: string;
    license?: {
      key: string;
      activations: number;
      maxActivations: number;
      status: string;
    };
  };
  error?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  hasSubscription: boolean;
  subscription: SubscriptionResponse['subscription'] | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  verifySubscription: () => Promise<boolean>;
  logout: () => void;
}

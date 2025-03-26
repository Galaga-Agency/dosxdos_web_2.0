import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      login: async (username, password) => {
        // In a real app, you would validate against an API
        // This is a simplified example for a single admin user
        if (username === process.env.NEXT_PUBLIC_ADMIN_USERNAME && 
            password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: 'auth-storage', // name of the item in storage
      // You can customize storage - defaults to localStorage
    }
  )
);
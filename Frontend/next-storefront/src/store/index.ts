import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { User, DashboardStats, AppSettings } from "../types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

interface UIState {
  sidebarCollapsed: boolean;
  theme: "light" | "dark" | "system";
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setTheme: (theme: "light" | "dark" | "system") => void;
}

interface AppState {
  dashboardStats: DashboardStats | null;
  settings: AppSettings;
  setDashboardStats: (stats: DashboardStats) => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
}

// Auth Store
export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isAuthenticated: false,
        isLoading: false,

        login: async (email: string, password: string) => {
          set({ isLoading: true });
          try {
            // Mock authentication - replace with real API
            if (
              email === "admin@safinacarpets.com" &&
              password === "admin123"
            ) {
              const user: User = {
                id: "1",
                name: "Admin User",
                email: "admin@safinacarpets.com",
                role: "admin",
                avatar: undefined,
                lastLogin: new Date(),
              };
              set({ user, isAuthenticated: true, isLoading: false });
            } else {
              throw new Error("Invalid credentials");
            }
          } catch (error) {
            set({ isLoading: false });
            throw error;
          }
        },

        logout: () => {
          set({ user: null, isAuthenticated: false });
          if(typeof window !== "undefined") localStorage.removeItem("auth-storage");
        },

        setUser: (user: User) => {
          set({ user, isAuthenticated: true });
        },
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    { name: "auth-store" }
  )
);

// UI Store
export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set) => ({
        sidebarCollapsed: false,
        theme: "light",

        toggleSidebar: () => {
          set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }));
        },

        setSidebarCollapsed: (collapsed: boolean) => {
          set({ sidebarCollapsed: collapsed });
        },

        setTheme: (theme: "light" | "dark" | "system") => {
          set({ theme });
          // Apply theme to document
          const root = document.documentElement;
          if (theme === "dark") {
            root.classList.add("dark");
          } else if (theme === "light") {
            root.classList.remove("dark");
          } else {
            // System theme
            const mediaQuery = window.matchMedia(
              "(prefers-color-scheme: dark)"
            );
            if (mediaQuery.matches) {
              root.classList.add("dark");
            } else {
              root.classList.remove("dark");
            }
          }
        },
      }),
      {
        name: "ui-storage",
      }
    ),
    { name: "ui-store" }
  )
);

// App Store
export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      dashboardStats: null,
      settings: {
        companyName: "SAFINA CARPETS",
        currency: "INR",
        taxRate: 18,
        theme: "light",
        language: "en",
        notifications: {
          email: true,
          push: true,
          orderUpdates: true,
          lowStock: true,
        },
      },

      setDashboardStats: (stats: DashboardStats) => {
        set({ dashboardStats: stats });
      },

      updateSettings: (newSettings: Partial<AppSettings>) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }));
      },
    }),
    { name: "app-store" }
  )
);

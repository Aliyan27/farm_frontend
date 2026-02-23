import type { IUser } from "@/@types/commonTypes";
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: IUser | null;

  login: (token: string) => void;
  logout: () => void;
  setUser: (user: IUser) => void;
  updateUser: (updates: Partial<IUser>) => void;
}

const getInitialAuthState = () => {
  const savedToken = localStorage.getItem("authToken");
  const savedUser = localStorage.getItem("userProfile");

  return {
    token: savedToken || null,
    user: savedUser ? JSON.parse(savedUser) : null,
  };
};

export const useAuthStore = create<AuthState>()((set) => ({
  isAuthenticated: !!getInitialAuthState().token,
  token: getInitialAuthState().token,
  user: getInitialAuthState().user,

  login: (token: string) => {
    localStorage.setItem("authToken", token);
    set({
      isAuthenticated: true,
      token,
    });
  },

  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userProfile");
    set({
      isAuthenticated: false,
      token: null,
      user: null,
    });
  },

  setUser: (user: IUser) => {
    localStorage.setItem("userProfile", JSON.stringify(user));
    set({ user });
  },

  updateUser: (updates: Partial<IUser>) => {
    set((state) => {
      if (!state.user) return state;
      const updatedUser = { ...state.user, ...updates };
      localStorage.setItem("userProfile", JSON.stringify(updatedUser));
      return { user: updatedUser };
    });
  },
}));

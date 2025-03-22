import { create } from "zustand";

type User = {
  email: string;
  role: "client" | "lawyer";
};

type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => {
    set({ user: null });
    localStorage.removeItem("user");
    // Sign out from Firebase
    import("@/lib/firebaseConfig").then(({ auth }) => {
      auth.signOut();
    });
  },
}));
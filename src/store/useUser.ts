import { create } from "zustand";
import { UserStore } from "@/interfaces";

import { jwtDecode } from "jwt-decode";

export const useUserStore = create<UserStore>((set) => ({
  token: null,
  user: null,
  setToken: (token: string) => set({ token }),
  setUser: (token: string) => set({ user: jwtDecode(token) }),
}));

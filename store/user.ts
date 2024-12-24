import { create } from 'zustand';
import { User } from '@/types/user';

interface UserState {
  user?: Omit<User, 'password'> | null;
  setUser: (newUser: Omit<User, 'password'> | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: undefined,
  setUser: (newUser) => set({ user: newUser }),
}));

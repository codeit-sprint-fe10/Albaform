import { create } from 'zustand';
import { User, UserRole } from '@/types/user';

interface UserState {
  user?: Omit<User, 'password'> | null;
  setUser: (newUser: Omit<User, 'password'> | null) => void;
  isApplicant?: boolean;
  isOwner?: boolean;
  isGuest?: boolean;
}

export const useUserStore = create<UserState>((set) => ({
  user: undefined,
  setUser: (newUser) => {
    set({ user: newUser });
    set({ isApplicant: newUser?.role === UserRole.applicant });
    set({ isOwner: newUser?.role === UserRole.owner });
    set({ isGuest: newUser === null });
  },
  isApplicant: undefined,
  isOwner: undefined,
  isGuest: undefined,
}));

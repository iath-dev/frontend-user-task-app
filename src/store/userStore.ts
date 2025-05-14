import { User } from '@/types/user.types';
import { create } from 'zustand';

interface UserState {
  selectedUser: User | null;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserState>((set) => ({
  selectedUser: null,
  setUser: (user: User) => set({ selectedUser: user }),
}));

import { dbTypeTypes, userDetailsInterface } from '@/types/api.types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStoreState {
  authDetails?: userDetailsInterface;
  setAuthDetails: (i: any) => void;
  activeDb: string;
  setActiveDb: (i: string) => void;
}

const useAuthStore = create<AuthStoreState>()((set) => ({
  activeDb: '',
  setActiveDb: (i: string) =>
    set((state) => ({
      activeDb: i
    })),
  setAuthDetails: (i: userDetailsInterface) =>
    set((state) => ({
      authDetails: i
    }))
}));

export default useAuthStore;

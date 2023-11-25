import { userDetailsInterface } from '@/types/api.types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStoreState {
  loggedIn: boolean;
  loginOpen: boolean;
  signUpOpen: boolean;
  authDetails?: userDetailsInterface;
  logoutOpen: boolean;
  setLoggedIn: (i: boolean) => void;
  setLoginOpen: (i: boolean) => void;
  setSignUpOpen: (i: boolean) => void;
  setAuthDetails: (i: any) => void;
  setLogoutOpen: (i: boolean) => void;
}

const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      loggedIn: false,
      loginOpen: false,
      signUpOpen: false,
      logoutOpen: false,
      setAuthDetails: (i: userDetailsInterface) =>
        set((state) => ({
          authDetails: i
        })),

      setLoginOpen: (i) =>
        set((state) => ({
          loginOpen: i
        })),

      setLogoutOpen: (i) =>
        set((state) => ({
          logoutOpen: i
        })),

      setSignUpOpen: (i: boolean) => set((state) => ({ signUpOpen: i })),

      setLoggedIn: (i: boolean) => set((state) => ({ loggedIn: i }))
    }),
    { name: 'auth-storage' }
  )
);

export default useAuthStore;

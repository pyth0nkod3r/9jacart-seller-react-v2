import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface RegistrationStore {
  isRegistrationComplete: boolean;
  setRegistrationComplete: (value: boolean) => void;
  reset: () => void;
}

export const useRegistrationStore = create<RegistrationStore>()(
  devtools((set) => ({
    isRegistrationComplete: false,
    setRegistrationComplete: (value: boolean) => set({ isRegistrationComplete: value }),
    reset: () => set({ isRegistrationComplete: false }),
  }), {
    name: 'registration-store',
  })
);

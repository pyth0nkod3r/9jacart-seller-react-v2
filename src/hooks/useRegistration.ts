import { useRegistrationStore } from '@/stores/registrationStore';

export const useRegistration = () => {
  const store = useRegistrationStore();
  return {
    isRegistrationComplete: store.isRegistrationComplete,
    setRegistrationComplete: store.setRegistrationComplete,
    reset: store.reset,
  };
};

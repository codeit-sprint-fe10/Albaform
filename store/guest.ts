import { create } from 'zustand';
import { GetGuestApplicationsBody } from '@/types/application';

interface GuestStore {
  guest: GetGuestApplicationsBody;
  setGuest: (guest: GetGuestApplicationsBody) => void;
}

const useGuestStore = create<GuestStore>((set) => ({
  guest: {
    password: '',
    phoneNumber: '',
    name: '',
  },
  setGuest: (guest) => set({ guest }),
}));

export default useGuestStore;

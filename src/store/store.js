import { create } from "zustand";

export const useAdherentStore = create((set) => ({
  adherent: {
    data:{}
  },
  setData: (data) =>
    set((state) => ({ adherent: { ...state.data, data } })),
}));

/* eslint-disable no-unused-vars */
import { create } from "zustand";

export const useAppStore = create((set) => ({
  view: 0,
  setView: (page) => {
    return set((state) => ({
      view: page,
    }));
  },
  location: [],
  setLocation: (location) => {
    return set((state) => ({
      location: location,
    }));
  },
}));

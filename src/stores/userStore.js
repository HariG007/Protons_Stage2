/* eslint-disable no-unused-vars */
import { create } from "zustand";

export const useUserStore = create((set) => ({
  currPosition: null,
  setCurrentPostion: (pos) => {
    return set((state) => ({
      currPosition: pos,
    }));
  },
}));

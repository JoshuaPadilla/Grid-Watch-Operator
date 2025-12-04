import { create } from "zustand";
import { NAVIGATION, type NAVIGATION_TYPE } from "../types/nav.type";

interface StoreState {
  activeNav: NAVIGATION_TYPE;
  changeNav: (nav_type: NAVIGATION_TYPE) => void;
}

export const useNavStore = create<StoreState>((set, get) => ({
  activeNav: NAVIGATION.DASHBOARD,
  changeNav: (nav_type) => {
    set({ activeNav: nav_type });
  },
}));

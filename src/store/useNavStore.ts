import { create } from "zustand";
import { NAVIGATION, type NAVIGATION_TYPE } from "../types/nav.type";

interface StoreState {
  fromNav: boolean;
  showDeviceReport: boolean;
  activeNav: NAVIGATION_TYPE;
  // pass the nav name and internal if call from inside the header
  changeNav: (nav_type: NAVIGATION_TYPE, internal: boolean) => void;
  setShowDeviceReport: (show: boolean) => void;
}

export const useNavStore = create<StoreState>((set, get) => ({
  showDeviceReport: false,
  fromNav: true,
  activeNav: NAVIGATION.DASHBOARD,
  changeNav: (nav_type, internal) => {
    set({ activeNav: nav_type, fromNav: internal });
  },
  setShowDeviceReport: (show) => {
    set({ showDeviceReport: show });
  },
}));

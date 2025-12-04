import { create } from "zustand";
import type { History } from "../interfaces/history.interface";
import { BASE_URL } from "../constants/base_url.constant";

interface StoreState {
  loading: boolean;
  history: History[];
  selectedHistory: History | null;
  setSelectedHistory: (history: History) => void;
  getAllHistory: () => void;
  getHistory: (historyId: string) => void;
}

export const useHistoryStore = create<StoreState>((set) => ({
  loading: false,
  history: [],
  selectedHistory: null,
  getAllHistory: async () => {
    try {
      set({ loading: true });
      const res = await fetch(`${BASE_URL}history`, {
        method: "Get",
      });

      const data = await res.json();

      if (res.ok) {
        set({ history: data });
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  getHistory: async () => {},
  setSelectedHistory: (history) => {
    set({ selectedHistory: history });
  },
}));

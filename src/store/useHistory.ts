import { create } from "zustand";
import type { History } from "../interfaces/history.interface";
import { BASE_URL } from "../constants/base_url.constant";

interface StoreState {
  loading: boolean;
  history: History[];
  selectedHistory: History | null;
  setSelectedHistory: (history: History) => void;
  getAllHistory: (query?: string) => void;
  getHistory: (historyId: string) => void;
  setHistory: (query?: string) => void;
}

export const useHistoryStore = create<StoreState>((set) => ({
  loading: false,
  history: [],
  selectedHistory: null,
  getAllHistory: async (query) => {
    try {
      set({ loading: true });
      const res = await fetch(`${BASE_URL}history?${query}`, {
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
  setHistory: (query) => {
    set((state) => {
      let filteredHistory;

      // Use a standard if/else block
      if (query) {
        filteredHistory = state.history.filter((history) => {
          return `${history.title} ${history.body}`.includes(query);
        });
      } else {
        filteredHistory = state.history;
      }

      return { history: filteredHistory };
    });
  },
}));

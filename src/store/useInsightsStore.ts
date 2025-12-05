import { create } from "zustand";
import type { InsightsNumbers } from "../interfaces/insights_numbers.interface";
import { BASE_URL } from "../constants/base_url.constant";

interface StoreState {
  loading: boolean;
  insightsNumbers: InsightsNumbers | undefined;
  getInsightsNumbers: () => void;
}

export const useInsightsStore = create<StoreState>((set) => ({
  loading: false,
  insightsNumbers: undefined,
  getInsightsNumbers: async () => {
    try {
      set({ loading: true });
      const res = await fetch(`${BASE_URL}insights`, {
        method: "Get",
      });

      const data = await res.json();

      if (res.ok) {
        set({ insightsNumbers: data });
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
}));

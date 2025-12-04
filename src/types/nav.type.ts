export const NAVIGATION = {
  DASHBOARD: "dashboard",
  HISTORY: "history",
  INSIGHTS: "insights",
} as const; // 💡 The 'as const' makes this read-only and improves TypeScript's type inference.

export type NAVIGATION_TYPE = (typeof NAVIGATION)[keyof typeof NAVIGATION];

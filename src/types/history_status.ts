// DEVICE_STATUS.enums.ts

export const HISTORY_STATUS = {
  OUTAGE: "outage",
  NOTIF: "notif",
  RESTORED: "restored",
} as const; // 💡 The 'as const' makes this read-only and improves TypeScript's type inference.

// Optional: Define a type alias for clarity when typing variables/properties
export type HISTORY_STATUS_TYPES =
  (typeof HISTORY_STATUS)[keyof typeof HISTORY_STATUS];

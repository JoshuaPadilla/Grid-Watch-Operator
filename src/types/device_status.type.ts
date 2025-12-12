// DEVICE_STATUS.enums.ts

export const DEVICE_STATUS = {
  STABLE: "stable",
  LOW: "low voltage",
  HIGH_VOLTAGE: "high voltage",
  CURRENT_OVERLOAD: "current overloading",
  FLUCTUATING: "fluctuating",
  NO_POWER: "no_power",
} as const; // 💡 The 'as const' makes this read-only and improves TypeScript's type inference.

// Optional: Define a type alias for clarity when typing variables/properties
export type DeviceStatusType =
  (typeof DEVICE_STATUS)[keyof typeof DEVICE_STATUS];

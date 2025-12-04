import type { HISTORY_STATUS_TYPES } from "../types/history_status";

export interface History {
  _id: string;
  deviceId: string;
  timestamps: Date;
  title: string;
  body: string;
  status: HISTORY_STATUS_TYPES;
}

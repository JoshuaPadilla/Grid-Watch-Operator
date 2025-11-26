import type { DeviceStatusType } from "../types/device_Status.type";
import type { LocationCoordinates } from "./location_coor.interface";

export interface Device {
  _id: string;
  status?: DeviceStatusType;
  location?: LocationCoordinates;
  createdAt?: string;
  updatedAt?: string;
}

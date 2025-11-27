import type { DeviceStatusType } from "../types/device_status.type";
import type { LocationCoordinates } from "./location_coor.interface";
import type { LocationName } from "./location_name.interface";

export interface Device {
  _id: string;
  deviceId: string;
  status?: DeviceStatusType;
  locationCoordinates?: LocationCoordinates;
  locationName?: LocationName;
  createdAt?: string;
  updatedAt?: string;
}

export interface DevicePayload {
  deviceId: string;
  voltage: number;
  current: number;
  temperature: number;
  createdAt: string;
  localCreatedAt: string;
}

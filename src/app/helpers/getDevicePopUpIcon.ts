import { Icons } from "../../constants/icons.constant";
import {
  DEVICE_STATUS,
  type DeviceStatusType,
} from "../../types/device_status.type";
import L from "leaflet";

export const getDevicePopUpIcon = (status?: DeviceStatusType) => {
  switch (status) {
    case DEVICE_STATUS.NO_POWER:
      return L.icon({
        iconUrl: Icons.popup_danger,
        iconSize: [50, 50], // Size of the icon
        iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
        popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
      });
    case DEVICE_STATUS.FLUCTUATING:
      return L.icon({
        iconUrl: Icons.popup_warning,
        iconSize: [50, 50], // Size of the icon
        iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
        popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
      });
    case DEVICE_STATUS.STABLE:
      return L.icon({
        iconUrl: Icons.popup_safe,
        iconSize: [50, 50], // Size of the icon
        iconAnchor: [16, 50], // Point of the icon which will correspond to marker's location
        popupAnchor: [0, -50], // Point from which the popup should open relative to the iconAnchor
      });
    case DEVICE_STATUS.CURRENT_OVERLOAD:
      return L.icon({
        iconUrl: Icons.popup_danger,
        iconSize: [50, 50], // Size of the icon
        iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
        popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
      });
    case DEVICE_STATUS.LOW:
      return L.icon({
        iconUrl: Icons.popup_warning,
        iconSize: [50, 50], // Size of the icon
        iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
        popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
      });
    case DEVICE_STATUS.HIGH_VOLTAGE:
      return L.icon({
        iconUrl: Icons.popup_danger,
        iconSize: [50, 50], // Size of the icon
        iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
        popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
      });
    default:
      return L.icon({
        iconUrl: Icons.popup_warning,
        iconSize: [50, 50], // Size of the icon
        iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
        popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
      });
  }
};

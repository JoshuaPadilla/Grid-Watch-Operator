import L from "leaflet";
import { Icons } from "../constants/icons.constant";

// Define the custom icon
export const popupIcon = L.icon({
  iconUrl: Icons.popup_safe,
  iconSize: [32, 32], // Size of the icon
  iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
});

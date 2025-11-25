import { create } from "zustand";
import type { LocationName } from "../interfaces/location_name.interface";

interface StoreState {
  getLocationName: (lat: string, lng: string) => void;
}

export const useGeoCodeStore = create<StoreState>((set) => ({
  getLocationName: async (lat, lng) => {
    try {
      const req = await fetch(
        `https://us1.locationiq.com/v1/reverse?key=pk.e34742aad85680d4ff0edd1d67d775af&lat=${lat}&lon=${lng}&format=json&`,
        {
          method: "GET",
        }
      );

      if (!req.ok) {
        // Throw an error for HTTP 4xx/5xx status codes
        throw new Error(`HTTP error! status: ${req.status}`);
      }

      const data = await req.json();

      const locationName: LocationName = {
        road: data.address.road,
        brgy: `Brgy. ${data.address.quarter}`,
        city: `${data.address.city} City`,
      };

      return locationName;
    } catch (error) {
      console.log("Error:", error);
    }
  },
}));

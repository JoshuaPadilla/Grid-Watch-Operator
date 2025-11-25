import React, { useState } from "react";
import { useMapEvents, Marker, Popup } from "react-leaflet";
import { fetchLocationName } from "./fetch-location-name";

export const LocationFinder = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [address, setAddress] = useState("Fetching location details...");

  // Hook to interact with Leaflet map events
  const map = useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);

      // Step 2: Call the Fetch Function
      const locationName = await fetchLocationName(lat, lng);
      setAddress(locationName);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>{address}</Popup>
    </Marker>
  );
};

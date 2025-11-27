import React, { useEffect } from "react";
import type { LocationCoordinates } from "../interfaces/location_coor.interface";
import { useMap } from "react-leaflet";

interface Props {
  locationCoordinates: LocationCoordinates | null;
}

function MapCenterController({ locationCoordinates }: Props) {
  const lat = Number(locationCoordinates?.lat) || 12.067464704041424;
  const lng = Number(locationCoordinates?.lng) || 124.5924237721899;
  const map = useMap();

  useEffect(() => {
    if (!isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0) {
      // Use panTo() for a smooth transition animation
      //   map.panTo([lat, lng], {
      //     animate: true,
      //     duration: 1.0, // 1 second animation

      //   });
      // Optionally, you can also change the zoom:
      map.setView([lat, lng], 20, { animate: true, duration: 1.0 });
    }
  }, [locationCoordinates, map]);

  return <div>MapCenterController</div>;
}

export default MapCenterController;

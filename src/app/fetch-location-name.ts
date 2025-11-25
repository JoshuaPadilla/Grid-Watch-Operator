// This function can be defined outside the component or in a utility file
export const fetchLocationName = async (lat: number, lng: number) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;

  try {
    const response = await fetch(url, {
      // Nominatim requires a recognizable User-Agent or Referer header
      headers: {
        "User-Agent": "React Leaflet App for Reverse Geocoding Demo",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Check if the API returned a display name
    if (data && data.display_name) {
      return data.display_name;
    } else {
      return "Location name not found.";
    }
  } catch (error) {
    console.error("Error during reverse geocoding:", error);
    return "Could not retrieve location.";
  }
};

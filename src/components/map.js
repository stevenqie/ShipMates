'use client';

import { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

// Replace with your own Mapbox token
mapboxgl.accessToken = 'pk.eyJ1Ijoic3RldmVucWllIiwiYSI6ImNtMzk2MHRlcjB6aXAya3B3ZnMwZmp0eWcifQ.LZpQC7xRtVKDfD56Up-3zQ';

export default function Map({ listings = [] }) {
  const [map, setMap] = useState(null);
  const markersRef = useRef([]); // This will hold our markers

  useEffect(() => {
    // Initialize the map
    const mapInstance = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-98.35, 39.5], // Fallback center (USA)
      zoom: 3,               // Fallback zoom
    });

    setMap(mapInstance);

    // Attempt to get the user's current location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          mapInstance.setCenter([longitude, latitude]);
          mapInstance.setZoom(12);
        },
        (error) => {
          console.error('Error getting user location:', error);
          window.alert("Could not retrieve your location, falling back to New York City.");
          // Fallback location: New York City
          mapInstance.setCenter([-74.0060, 40.7128]);
          mapInstance.setZoom(12);
        },
        {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    }

    // Cleanup on unmount
    return () => mapInstance.remove();
  }, []);

//   useEffect(() => {
//     if (!map) return;

//     // Remove all existing markers from the map
//     markersRef.current.forEach((marker) => marker.remove());
//     markersRef.current = [];

//     // Add markers for each listing in the updated listings array
//     listings.forEach(({ lat, lon, title }) => {
//       const marker = new mapboxgl.Marker()
//         .setLngLat([lon, lat])
//         .setPopup(new mapboxgl.Popup().setText(title))
//         .addTo(map);
//       markersRef.current.push(marker);
//     });
//   }, [map, listings]);

  return (
    <div
      id="map"
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
}

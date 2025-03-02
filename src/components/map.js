'use client';

import { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Replace with your own Mapbox token
mapboxgl.accessToken = 'pk.eyJ1Ijoic3RldmVucWllIiwiYSI6ImNtMzk2MHRlcjB6aXAya3B3ZnMwZmp0eWcifQ.LZpQC7xRtVKDfD56Up-3zQ';

async function fetchCoordinates(zipcode) {
    const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${zipcode}.json?access_token=${mapboxgl.accessToken}`
      );
    const data = await response.json();
    if (data.features && data.features.length > 0) {
        return data.features[0].center;
    }
    return null; 
}

async function addMarkerFromLocation(map, address, markersRef) {
    console.error(`Geocoding address: ${address}`);
    const endpoint = `https://api.mapbox.com/search/geocode/v6/forward?q=${address}&limit=1&access_token=${mapboxgl.accessToken}`;
    try {
        const response = await fetch(endpoint);
        const data = await response.json();

        if (data.features.length === 0) {
            console.warn(`No results for: ${address}`);
            return;
        }

        // Extract coordinates
        const [lon, lat] = data.features[0].geometry.coordinates;

        // Create a marker
        const marker = new mapboxgl.Marker()
            .setLngLat([lon, lat])
            .setPopup(new mapboxgl.Popup().setText(address))
            .addTo(map);

        markersRef.current.push(marker); // Store marker reference
        console.log(`Marker added at ${lat}, ${lon} for: ${address}`);

    } catch (error) {
        console.error("Error geocoding address:", error);
    }
}

export default function Map({ listings = [], zipcode= '' }) {
  const [map, setMap] = useState(null);
  const mapContainerRef = useRef(null); // This will hold our markers
  const markersRef = useRef([]);

  useEffect(() => {
    async function initMap() {
        let center = [-98.35, 39.5]; // Fallback center (USA)

        if (zipcode) {
            const coords = await fetchCoordinates(zipcode);
            if (coords) {
                center = coords;
            }
        }

        const mapInstance = new mapboxgl.Map({
            container: mapContainerRef.current, 
            style: 'mapbox://styles/mapbox/streets-v11',
            center: center,
            zoom: 12,
        });

        setMap(mapInstance)
    }

    if (mapContainerRef.current && !map) {
        initMap();
    }
  }, [zipcode, map]);

  //plant the markers 
  useEffect(() => {
    if (!map) return; 

    //remove existing markers 
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    listings.forEach((listing) => {
        if (!listing.location) {
            return; 
        }
        const city = listing.location.city || '';
        const state = listing.location.state || '';
        const street = listing.location.street || '';
        const zip = listing.location.zip || '';

        if (!city || !state || !street || !zip) {
            return; 
        }

        const address = `${street} ${city} ${state} ${zip}`;
        const encoded_address = encodeURIComponent(address);
        addMarkerFromLocation(map, encoded_address, markersRef);
    })
  }, [map, listings]);

  return (
    <div
      id="map"
      ref={mapContainerRef}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
}

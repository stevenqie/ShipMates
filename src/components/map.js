'use client';

import { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from "@chakra-ui/react";
import ListingView from './ListingView';

// Replace with your own Mapbox token
mapboxgl.accessToken = '';

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

async function addMarkerFromLocation(map, address, markersRef, onMarkerClick) {
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
            .setPopup(new mapboxgl.Popup({ offset: 25 }))
            .addTo(map);
        
        // Apply inline hover effect
        const markerEl = marker.getElement();
        // const originalTransform = markerEl.style.transform || '';
        // // Set up transition so changes animate smoothly
        // markerEl.style.transition = 'transform 0.3s ease';
        // markerEl.addEventListener('mouseenter', () => {
        // markerEl.style.transform = `${originalTransform} scale(1.2)`;
        // });
        // markerEl.addEventListener('mouseleave', () => {
        // markerEl.style.transform = originalTransform;
        // });
        markerEl.addEventListener('click', () => {
            onMarkerClick();
        });
        
        markersRef.current.push(marker); // Store marker reference
        console.log(`Marker added at ${lat}, ${lon} for: ${address}`);

    } catch (error) {
        console.error("Error geocoding address:", error);
    }
}

export default function MapComponent({ listings = [], zipcode= '', currentUser=''}) {
  const [map, setMap] = useState(null);
  const [selectedListing, setSelectedListing] = useState(null);
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

        mapInstance.addControl(new mapboxgl.NavigationControl());

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
        addMarkerFromLocation(map, encoded_address, markersRef, () => {
            setSelectedListing(listing);
        });
    });
  }, [map, listings, zipcode]);

  return (
        <>
            <div
                id="map"
                ref={mapContainerRef}
                style={{ width: '100%', height: '100%' }}
            />

            {/* Custom overlay for ListingView (positioned absolutely on the page) */}
            {selectedListing && (
                <div
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'white',
                        padding: '20px',
                        border: '1px solid #ccc',
                        zIndex: 1000,
                        maxWidth: '300px',
                    }}
                >
                    <Button size="xs" onClick={() => setSelectedListing(null)} mb="4">
                        Close
                    </Button>
                    <ListingView listing={selectedListing} currentUser = {currentUser} />
                </div>
            )}
        </>
    );
}

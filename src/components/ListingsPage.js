// filepath: /Users/stevenqie/Desktop/Github_Projects/hackillinois25/src/app/view/[zipcode]/ListingsPage.js
'use client'; // Ensure this is a client-side component

import React, { useState, useEffect } from "react";
import ListingView from "@/components/ListingView";
import SearchBar from "@/components/Searchbar";
import { Box, Text } from "@chakra-ui/react";
import { getActiveListingsByZip } from "@/app/lib/fetchData";
import Map from "@/components/map";

export default function ListingsPage({ zipcode }) {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    async function fetchListings() {
      const allListings = await getActiveListingsByZip(zipcode);
      setListings(allListings);
    }
    fetchListings();
  }, [zipcode]);

  const handleDeleteListing = (id) => {
    setListings((prevListings) => prevListings.filter((listing) => listing.id !== id));
  };

  return (
    <Box className="h-screen w-screen flex flex-col">
      {/* Navbar */}
      <SearchBar zipcode={zipcode} />
      {/* Main Layout */}
      <Box className="flex flex-2">
        {/* Left Side - Grid Layout */}
        <Box className="w-1/2" p="10" flex flex-col>
          <Box className="w-full text-center mb-4"></Box>
          <Text>{listings.length} listings in {zipcode}</Text>\
          <Box className="grid grid-cols-3 gap-4">
            {listings.map((listing, index) => (
              <ListingView key={index} listing={listing} onDelete={handleDeleteListing} />
            ))}
          </Box>
        </Box>
        {/* Right Side - Map Integration */}
        <Box className="w-1/2 bg-gray-50 flex items-center justify-center">
          <Map listings={listings} />
        </Box>
      </Box>
    </Box>
  );
}
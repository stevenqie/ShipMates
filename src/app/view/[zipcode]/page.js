import React from "react";
import ListingView from "@/components/ListingView";
import SearchBar from "@/components/Searchbar";
import { Box, Text } from "@chakra-ui/react";
import { getActiveListingsByZip } from "@/app/lib/fetchData";

export default async function Home({ params }) {
  const { zipcode } = await params;
  const allListings = await getActiveListingsByZip(zipcode);

  return (
    <Box className="h-screen w-screen flex flex-col">
      {/* Navbar */}
      <SearchBar zipcode={zipcode} />
      {/* Main Layout */}
      <Box className="flex flex-2">
        {/* Left Side - Grid Layout */}
        <Box className="w-1/2" p="10">
          <Text>{allListings.length} listings in {zipcode}</Text>
          <Box className="grid grid-cols-3 gap-4">
            {allListings.map((listing, index) => (
              <ListingView
                key={index}
                index={index}
                listing={listing}
              />
            ))}
          </Box>
        </Box>
        {/* Right Side - Empty for Map Integration */}
        <Box className="w-1/2 bg-gray-50 flex items-center justify-center">
          {/* Map will go here */}
          TODO: Add map
        </Box>
      </Box>
    </Box>
  );
}
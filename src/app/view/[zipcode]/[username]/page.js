import React from "react";
import ListingView from "@/components/ListingView";
import SearchBar from "@/components/Searchbar";
import { Box, Text } from "@chakra-ui/react";
import { getActiveListingsByZip } from "@/app/lib/fetchData";
import { getUser } from "@/app/lib/getUser";
import MapComponent from "@/components/map";
export default async function Home({ params }) {
  const { zipcode, username } = await params;
  const allListings = await getActiveListingsByZip(zipcode);
  console.log(username);
  return (
    <Box className="h-screen w-screen flex flex-col">
      {/* Navbar */}
      <SearchBar zipcode={zipcode} uname={username}/>
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
                currentUser={username}
              />
              ))}
            </Box>
          </Box>
          {/* Right Side - Empty for Map Integration */}
          <Box className="w-1/2 bg-gray-50 flex items-center justify-center">
            {/* Map will go here */}
            <MapComponent listings={allListings} zipcode={zipcode}/>
          </Box>
        </Box>
      </Box>
    );
}
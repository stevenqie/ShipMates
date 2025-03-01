import React from "react";
import ListingView from "@/components/ListingView";
import SearchBar from "@/components/Searchbar";
import {Box, Text} from "@chakra-ui/react"

export default async function Home({ params }) {

    const {zipcode} = await params;
    const exampleSchema = {
        title : "Example listing",
        name : "Name join",
        store : "Walmart",
        description : "Example description text, Longer example description text so it goes to multiple lines",
        minPurchaseRequired : 62.88,
        currentTotal : 12.12,
        expireDate: "May 12 2025",
        locationData: "Placeholder location data",
        avgRating: 4.89,
        numReviews: 15
    }
  return (
    <Box className="h-screen w-screen flex flex-col">
      {/* Navbar */}
      <SearchBar zipcode={zipcode}/>
      {/* Main Layout */}
      <Box className="flex flex-2">
        {/* Left Side - Grid Layout */}
        <Box className="w-1/2" p="10">
            <Text>9 places in {zipcode}</Text>
            <Box className="grid grid-cols-3 gap-4">
              {[...Array(9)].map((_, index) => (
                  <ListingView key={index} listing={exampleSchema}/>
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

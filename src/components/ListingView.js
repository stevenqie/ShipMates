"use client";
import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

function ListingProgressBar({ progress, remaining, threshold }) {
  return (
    <Box className="w-full">
      <Box className="w-full h-2 bg-gray-200 rounded">
        <Box
          className="h-full bg-blue-500 rounded transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></Box>
      </Box>
      <p>
        <Text as="span" fontWeight="bold">
          ${remaining} remaining
        </Text>{" "}
        of ${threshold} threshold
      </p>
    </Box>
  );
}

export default function ListingView({ listing }) {
  const router = useRouter();

  const handleBoxClick = () => {
    console.log("Hello world");
    console.log(JSON.stringify(listing));
    console.log("Clicked listingID:", listing.listingID);
    router.push(`/chat/${listing.listingID}`);
  };

  const freeShippingThreshold = listing.currentTotal + listing.minPurchaseRequired;
  const percentComplete = (listing.currentTotal / freeShippingThreshold) * 100;

  return (
    <div
      className="flex flex-col bg-gray-100 rounded p-4 cursor-pointer"
      onClick={handleBoxClick}
    >
      <Box className="bg-gray-200 h-24 rounded flex items-center justify-center">
        <Text>{listing.store}</Text>
      </Box>
      <Box className="flex justify-between pt-2">
        <Text fontWeight="bold">{listing.title}</Text>
        <p>{listing.avgRating} ({listing.numReviews})</p>
      </Box>
      <p className="text-sm text-grey-400 pt-3 pb-2">{listing.description}</p>
      <ListingProgressBar
        progress={percentComplete}
        remaining={listing.minPurchaseRequired}
        threshold={freeShippingThreshold}
      />
    </div>
  );
}
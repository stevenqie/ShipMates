"use client";
import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import "./style.css";

function ListingProgressBar({ progress, remaining, threshold }) {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimatedProgress(progress), 200);
    return () => clearTimeout(timeout);
  }, [progress]);

  return (
    <div className="w-full">
      {/* Progress Bar Container */}
      <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded transition-all duration-1000 ease-in-out"
          style={{ width: `${animatedProgress}%` }}
        ></div>
      </div>
      
      {/* Progress Text */}
      <p className="mt-2 text-sm">
        <strong>${remaining} remaining</strong> of ${threshold} threshold
      </p>
    </div>
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
      className="listing-card"
      onClick={handleBoxClick}
    >
      <Box className="bg-gray-200 h-24 rounded flex items-center justify-center">
        <Text>{listing.store}</Text>
      </Box>
      <Box className="flex justify-between pt-2">
        <Text fontWeight="bold">{listing.title}</Text>
        <p>{listing.avgRating} ({listing.numReviews})</p>
      </Box>
      <p className="text-sm text-black pt-3 pb-2">{listing.description}</p>
      <ListingProgressBar
        progress={percentComplete}
        remaining={listing.minPurchaseRequired}
        threshold={freeShippingThreshold}
      />
    </div>
  );
}
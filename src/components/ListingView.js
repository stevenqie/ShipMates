"use client";
import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const stores_map = new Map([
  ["Amazon", "https://www.hatchwise.com/wp-content/uploads/2022/08/Amazon-Logo-2000-present-1024x576.jpeg"],
  ["Macys", "https://fabrikbrands.com/wp-content/uploads/Macys-Logo-1.png"],
  ["Uniqlo", "https://logos-world.net/wp-content/uploads/2023/01/Uniqlo-Logo.jpg"],
  ["Walmart", "https://purepng.com/public/uploads/large/purepng.com-walmart-logologobrand-logoiconslogos-2515199386533ogay.png"],
  ["Weee!", "https://mma.prnewswire.com/media/1232964/Weee_Logo.jpg?p=facebook"],
  ["Fanatics", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Fanatics_company_logo.svg/2560px-Fanatics_company_logo.svg.png"]
]);

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

  const imageurl = stores_map.get(listing.store);

  return (
    <div
      className="flex flex-col bg-gray-100 rounded p-4 cursor-pointer"
      onClick={handleBoxClick}
    >
      <Box className="bg-gray-200 h-24 rounded flex items-center justify-center">
        <Image
          src={imageurl}
          alt= {listing.store}
          objectFit = "contain"
          maxH="full"
          maxW="full"
        />
        {/* <Text>{listing.store}</Text> */}
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
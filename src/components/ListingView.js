"use client";
import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { db } from '@/app/lib/firebaseConfig'; // Adjust the path as needed
import { collection, query, where, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';

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

export default function ListingView({ listing, currentUser }) {
  const router = useRouter();

  const handleBoxClick = async () => {
    console.log("Hello world");
    console.log(JSON.stringify(listing));
    console.log("Clicked listingID:", listing.listingID);

    // Fetch the hostID from the listingID
    const listingRef = doc(db, "listings", String(listing.listingID));
    const listingDoc = await getDoc(listingRef);
    const hostID = listingDoc.data().hostID;

    // Check if a chatID already exists
    const chatRef = collection(db, "chatMetadata");
    const chatQuery = query(
      chatRef, // Use collection directly from db
      where("hostID", "==", hostID),
      where("personbID", "==", currentUser),
      where("listingID", "==", listing.listingID)
    );

    const chatSnapshot = await getDocs(chatQuery);
    let chatID;

    if (chatSnapshot.empty) {
      // Generate a new chatID if it doesn't exist
      const newChatRef = doc(chatRef); // Generate a new document reference with a unique ID
      chatID = newChatRef.id; // Get the generated unique ID
      await setDoc(newChatRef, { // Use setDoc to create the document
        chatID: chatID, // Include the chatID field
        hostID: hostID,
        personbID: currentUser,
        listingID: listing.listingID,
        timestamp: new Date()
      });
      console.log("Generated new chatID:", chatID);
    } else {
      // Use the existing chatID
      chatID = chatSnapshot.docs[0].id;
      console.log("Using existing chatID:", chatID);
    }

    router.push(`/chat/${currentUser}/${chatID}`);
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
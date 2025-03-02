"use client";
import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { db } from '@/app/lib/firebaseConfig'; // Adjust the path as needed
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';

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

    // Check if a chatID already exists
    const chatRef = collection(db, "chats");
    const chatQuery = query(
      chatRef, // Use collection directly from db
      where("hostID", "==", listing.hostID),
      where("username", "==", currentUser),
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
        hostID: listing.hostID,
        username: currentUser,
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
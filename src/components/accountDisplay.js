"use client";

import React, { useEffect, useState } from "react";
import { Box, Text, Image, Spinner, VStack, HStack } from "@chakra-ui/react";
import {
  getAccountName,
  getAccountBalance,
  getAccount,
} from "../../lib/api_endpoints";
import { db } from '@/app/lib/firebaseConfig'; 
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';

// Helper function that accepts a username,
// gets the associated account via getAccount,
// then retrieves the account name and balance using the accountID.
async function fetchUserData(username) {
    // Query the Firestore database to get the user's first name, last name, and profile picture
    //console.error("username: ", username);
    const userQuery = query(
        collection(db, "users"), 
        where("username", "==", username)
    );
    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.empty) {
        console.error("username doesn't exist in the db");
        return null; //return null if t
    }


    let userData = {};
    querySnapshot.forEach((doc) => {
        userData = doc.data();
    });

    const firstname = userData.firstName; 
    const lastname = userData.lastName; 
    const pfp_url = userData.profilePictureURL;
    const account_id = userData.accountID; 

    console.log("account_id: ", account_id);
    const cur_balance = await getAccountBalance(account_id);
    if (!cur_balance) {
        console.error("Account Balance not found in response");
        return null; 
    }
    return {
        username: username, 
        firstName: firstname, 
        lastName: lastname,
        pfpURL: pfp_url, 
        balance: cur_balance, 
    };
}

export default function Profile({ userName }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    // Fetch user data on mount
    useEffect(() => {
      const getUserData = async () => {
        try {
          const data = await fetchUserData(userName);
          setUser(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };
      getUserData();
    }, [userName]);
  
    // Show a loading indicator while data is being fetched
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" p={4}>
          <Spinner size="xl" />
        </Box>
      );
    }
  
    // Handle case if user data is null or undefined
    if (!user) {
      return (
        <Box p={4}>
          <Text color="red.500">Could not load user data.</Text>
        </Box>
      );
    }
  
    return (
     <Box
        bg="gray.50"
        p={4}
        borderRadius="md"
        display="flex"
        flexDirection="column"
        alignItems="center"
        maxW="300px"
        boxShadow="lg"
      >
        <Image
          src={user.pfpURL}
          alt={`${user.firstName} ${user.lastName}`}
          boxSize="80px"
          objectFit="cover"
          borderRadius="full"
          mb={4}
        />
        <VStack spacing={2} alignItems="center">
          <Text fontWeight="bold" fontSize="lg">
            {user.username}
          </Text>
          <Text fontSize="md">
            {user.firstName} {user.lastName}
          </Text>
          <Text mt={2} color="green.600" fontWeight="semibold">
            Account Balance: ${Number(user.balance).toFixed(2)}
          </Text>
        </VStack>
      </Box>
    );
  }
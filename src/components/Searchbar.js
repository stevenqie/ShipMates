"use client"
import { useState } from "react";
import AddModalListing from "./AddModalListing";
import { Box, Button, Input, Text, Image, Flex } from "@chakra-ui/react";
import { useRouter } from 'next/navigation';

export default function SearchBar({zipcode, uname}) {
    const router = useRouter();
    const handleViewChat = async (e) => {
        e.preventDefault();
        router.push(`/chatview/${uname}`);

    }
    return (
        <Box 
            w="full"
            h="16"
            bg="gray.100"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            px="6"
            borderBottom="1px solid"
            borderColor="gray.200"
        >
            {/* Search/Filter Controls needs server side*/}
            <Box className="search-lhs" display="flex" gap="4">
                <Input 
                    w="40"
                    placeholder={zipcode}/>
                <Button>Search!</Button>
            </Box>

            <Flex align="center">
                <Text fontSize="lg" fontWeight="bold" color="gray.700">
                    What's In Your Cart,
                </Text>
                <Text fontSize="md" fontWeight="medium" color="gray.600" ml="2">
                    Powered By
                </Text>
                <Image
                src="https://1000logos.net/wp-content/uploads/2018/11/Capital-One-Logo.png"
                alt="Capital One"
                maxH="10"
                objectFit="contain"
                ml="2"
                />
            </Flex>

            <Box>
                <Button onClick={handleViewChat}>View Chats</Button>
                <AddModalListing uname={uname}/>
            </Box>

            
        </Box>
    );

}
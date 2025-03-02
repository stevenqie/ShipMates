"use client"
import { useState } from "react";
import AddModalListing from "./AddModalListing";
import { Box, Button, Input } from "@chakra-ui/react";
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
            h="14"
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

            <Box>
                <Button onClick={handleViewChat}>View Chats</Button>
                <AddModalListing uname={uname}/>
            </Box>

            
        </Box>
    );

}
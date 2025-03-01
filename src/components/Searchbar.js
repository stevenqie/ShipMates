"use client"
import { useState } from "react";
import AddModalListing from "./AddModalListing";
import { Box, Button, Input } from "@chakra-ui/react";

export default function SearchBar({zipcode}) {
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

            <AddModalListing/>
        </Box>
    );

}
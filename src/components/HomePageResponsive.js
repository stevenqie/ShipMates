"use client";

import { useState } from "react";
import {Box, Button, Separator, HStack, Input, Text, Flex} from "@chakra-ui/react"
export default function HomePageResponsive() {

    const [zipCode, setZipCode] = useState("");
    return (
        <Box>
            {/* Zip Code Input */}
            <HStack spacing={4} mt={6}>
                <Input 
                    placeholder="Enter your zip code" 
                    size="lg" 
                    maxW="300px"
                    value={zipCode} 
                    onChange={(e) => setZipCode(e.target.value)} 
                    textAlign="center"
                    bg="white"
                    boxShadow="md"
                />
                <Button colorScheme="blue" size="lg" onClick={() => {}}>Explore Deals</Button>
            </HStack>

            {/* Login Button */}
                <Flex align="center" width="100%" mt={6}>
                  <Separator flex="1" borderColor="gray.300" />
                  <Text mx={2} color="gray.500" fontWeight="bold">
                    or
                  </Text>
                  <Separator flex="1" borderColor="gray.300" />
                </Flex>
                <Button w="100%" mt={6} variant="outline" colorScheme="blue" size="lg" onClick={() => alert("Redirecting to login...")}>
                  Login
                </Button>
        </Box>
    );
}

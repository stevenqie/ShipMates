"use client"; // Ensure this runs on the client

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Button, Box, Text, VStack, HStack } from "@chakra-ui/react";

const socket = io("http://localhost:3000"); // Connect to the WebSocket server
const ChatMessage = ({ message, isSender = false }) => {
  return (
    <Box
      bg={isSender ? "blue.500" : "gray.200"}
      color={isSender ? "white" : "black"}
      maxW="75%"
      p={3}
      rounded="md"
      alignSelf={isSender ? "flex-end" : "flex-start"}
      mt={2}
      boxShadow="md"
    >
      <Text>{message}</Text>
    </Box>
  );
};
export default function ChatComponent() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const listingId = 12;
    const counterpartyId = 111;

    const listingKey = {
        listingId: listingId,
        counterpartyId: counterpartyId
    }

    useEffect(() => {
        // Listen for incoming messages
        socket.on("message", (message) => {
            const newMsg = {
                message: message,
                isSender: false
            }
            setMessages((prev) => [...prev, newMsg]); // Update state with new messages
        });

        socket.emit("join", listingKey);

        return () => {
            socket.emit("disconn", listingKey);
            socket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        const newMsg = {
            message: input,
            isSender: true 
        }

        setMessages((prev) => [...prev, newMsg]);
        console.log("Sending message....");
        if (input.trim()) {
            socket.emit("message", input);
            setInput(""); // Clear input
        }
  };

  return (
    <VStack
        spacing={4} 
        position="fixed" 
        bottom="0" 
        left="0" 
        minH="100%"
        bg="black" 
        p={4}
      >
      <div>
        {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg.message} isSender={msg.isSender}/>
        ))}
      </div>
      <HStack>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            width="100%"
          />
          <Button onClick={sendMessage}>Send</Button>
      </HStack>
    </VStack>
  );
}

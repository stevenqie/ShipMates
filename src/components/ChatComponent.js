"use client"; // Ensure this runs on the client

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Button, Input, Text, Flex, HStack, VStack } from "@chakra-ui/react";

const socket = io("http://localhost:3000"); // Connect to the WebSocket server
const ChatMessage = ({ message, isSender = false }) => {
  return (
    <Flex
      bg={isSender ? "blue.500" : "gray.200"}
      color={isSender ? "white" : "black"}
      maxW="75%"
      p={3}
      rounded="md"
      alignSelf={isSender ? "end" : "start"}
      mt={2}
      boxShadow="md"
    >
      {message}
    </Flex>
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

    <Flex width="50%" height="100%" align="end" justify="center" pb={10} bg="gray.100"> 
        <VStack width="100%" px={8} py={4}>
        {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg.message} isSender={msg.isSender}/>
        ))}
      <HStack width="100%" height="40px">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            style={{flex: 10, height: "100%"}}
          />
          <Button flex={2} onClick={sendMessage}>Send</Button>
      </HStack>
    </VStack>
    </Flex>
  );
}

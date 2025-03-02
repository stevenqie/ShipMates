"use client"; 

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
      overflow="hidden"
      minH= "40px"
      maxH = "200px"
      overflowWrap="break-word" // Ensures long words break instead of overflowing
      wordBreak="break-word" // Breaks words that are too long
      whiteSpace="pre-wrap" // Preserves new lines while allowing wrapping
    >
      {message}
    </Flex>
  );
};



export default function ChatComponent({chatID, userID}) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");


    async function fetchMessages(chatID, userID) { 
        try {
            const response = await fetch(`/api/chat?chatID=${chatID}&userID=${userID}`);
            const data = await response.json();

            if (response.ok) {
                setMessages(data);
            } else {
                throw new Error(data.error || "Failed to fetch messages");
            }
        } catch (err) {
            console.error("Error fetching data: " + err);
        }
    }

    useEffect(() => {
        if (!chatID || !userID) return;

        const joinMsg = {
            chatID: chatID,
            userID: userID
        }
        // Listen for incoming messages
        socket.on("message", (message) => {
            const newMsg = {
                message: message,
                isSender: false
            }
            setMessages((prev) => [...prev, newMsg]); // Update state with new messages
        });


        socket.emit("join", joinMsg);
        fetchMessages(chatID, userID);
        return () => {
            socket.emit("disconn", chatID);
            socket.disconnect();
        };
    }, [chatID, userID]);

    const sendMessage = () => {
        const newMsg = {
            message: input,
            isSender: true 
        }

        setMessages((prev) => [...prev, newMsg]);
        if (input.trim()) {
            socket.emit("message", input);
            setInput(""); // Clear input
        }
  };

  return (

    <VStack width="50%" height="100%" align="end" justify="center" pb={10} bg="gray.100"> 
        <VStack width="100%" px={8} py={4} height="90vh" overflowY="auto" align="stretch">
        {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg.message} isSender={msg.isSender}/>
        ))}
        </VStack>
      <HStack width="100%" height="40px"px={8}>
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            style={{flex: 10, height: "100%"}}
          />
          <Button flex={2} onClick={sendMessage}>Send</Button>
      </HStack>
      <p>{chatID}, {userID}</p>
    </VStack>
  );
}

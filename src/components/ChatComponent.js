"use client"; // Ensure this runs on the client

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Button } from "@chakra-ui/react";

const socket = io("http://localhost:3000"); // Connect to the WebSocket server

export default function ChatComponent() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const listingId = 12;
    const counterpartyId = 111;


    useEffect(() => {
        // Listen for incoming messages
        socket.on("message", (message) => {
            console.log("Message: " + message);
            setMessages((prev) => [...prev, message]); // Update state with new messages
        });

        socket.emit("join", {
            listingId: listingId,
            counterpartyId: counterpartyId 
        });

        return () => {
            socket.emit("disconn", {});
            socket.disconnect(); 
        };
    }, []);

    const sendMessage = () => {
        const msg = {
            listindId: listingId,
            counterpartyId: counterpartyId,
            msg: input
        };
        console.log("Sending message....");
        if (input.trim()) {
            socket.emit("message", msg);
            setInput(""); // Clear input
        }
  };

  return (
    <div>
      <h2>Chat</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <Button onClick={sendMessage}>Send</Button>
    </div>
  );
}

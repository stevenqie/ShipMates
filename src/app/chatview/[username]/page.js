"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ChatCard from "./chatCard";
import { getChats } from "@/app/lib/getChats";
import { getUserInfo } from "@/app/lib/getUserInfo";
import Profile from "@/components/accountDisplay";

export default function Home() {
  const { username } = useParams(); // ✅ Correctly accessing dynamic params
  const router = useRouter();
  const [chatData, setChatData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    async function fetchChats() {
      try {
        const chats = await getChats(username);
        const limitedChats = chats.slice(0, 6);

        const chatData = await Promise.all(
          limitedChats.map(async (chat) => {
            const userInfo = await getUserInfo(chat.personbID);
            const profilePictureURL =
              userInfo[0]?.profilePictureURL ||
              "https://a.espncdn.com/i/headshots/nba/players/full/1966.png";
            return {
              title: chat.personbID,
              imageUrl: profilePictureURL,
              chatID: chat.chatID,
            };
          })
        );

        setChatData(chatData);
      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchChats();
  }, [username]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-100 p-4">
      <div className="absolute top-4 right-4 bg-white shadow-md rounded-lg p-4">
        <Profile userName={username} />
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center w-full max-w-2xl mt-8">
        <h1 className="text-2xl font-bold mb-4">Recent Chats</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {chatData.map((chat, index) => (
            <ChatCard
              key={index}
              title={chat.title}
              imageUrl={chat.imageUrl}
              onClick={() => {
                console.log(`Navigating to: /chat/${username}/${chat.chatID}`); // ✅ Debugging
                router.push(`/chat/${username}/${chat.chatID}`);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

import ChatCard from "./chatCard";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
    <div>
      <ChatCard title="Hello!" imageUrl="https://a.espncdn.com/i/headshots/nba/players/full/1966.png"/>
      <ChatCard title="Welcome!" imageUrl="https://a.espncdn.com/i/headshots/nba/players/full/1966.png"/>
      <ChatCard title="Next.js Rocks!" imageUrl="https://a.espncdn.com/i/headshots/nba/players/full/1966.png"/>
      <ChatCard title="Hello!" imageUrl="https://a.espncdn.com/i/headshots/nba/players/full/1966.png"/>
      <ChatCard title="Welcome!" imageUrl="https://a.espncdn.com/i/headshots/nba/players/full/1966.png"/>
      <ChatCard title="Next.js Rocks!" imageUrl="https://a.espncdn.com/i/headshots/nba/players/full/1966.png"/>
    </div>
    </div>
  );
}

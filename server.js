import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";


import { db } from "./src/app/lib/firebaseConfig.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

let count = 0;

async function postChatMessageToDB (
    chatID,
    username,
    msg
) {
    const time = serverTimestamp();
    try {
        await addDoc(collection(db, "chats"), {
            chatID: chatID,
            username: username,
            message: msg,
            timestamp: time
        });
    } catch (error) {
        console.error("Failed to write msg to db: " +error);
    }
}
app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server(httpServer);

   
    const chatIDToSocketIDs = new Map();
    const socketIDToChatID= new Map();
    const socketIDToUserID = new Map();

    const userToListingKey = new Map();
    io.on("connection", (socket) => {
        const socketID = socket.id;
        
        count += 1;

        socket.on("join", (joinJSON) => {
            const chatID = joinJSON.chatID;
            const userID = joinJSON.userID;

            const otherUserLoggedIn = chatIDToSocketIDs.has(chatID);

            if (otherUserLoggedIn) {
                chatIDToSocketIDs.get(chatID).push(socketID);
            } else {
                chatIDToSocketIDs.set(chatID, [socketID]);
            }
            socketIDToChatID.set(socketID, chatID);
            socketIDToUserID.set(socketID, userID);

            console.log("After join " + socketID +  "(other logged in): " + otherUserLoggedIn + "  -> ");
            console.table(chatIDToSocketIDs);
            console.table(socketIDToChatID);
            console.table(socketIDToUserID);
        });
        
        socket.on("disconnect", (_) => {
            const chatID = socketIDToChatID.get(socketID);
            if (chatIDToSocketIDs.has(chatID)) {
                const activeUsers = chatIDToSocketIDs.get(chatID);
                activeUsers.splice(activeUsers[1] == socketID, 1);
            }

            if (socketIDToChatID.has(socketID)) {
                socketIDToChatID.delete(socketID);
            }

            if (socketIDToUserID.has(socketID)) {
                socketIDToUserID.delete(socketID);
            }

            console.log("After disconnect " + socketID);
            console.table(chatIDToSocketIDs);
            console.table(socketIDToChatID);
            console.table(socketIDToUserID);

        });

        socket.on("message", (msg) => {
            console.log("Received msg: " + msg);
            const chatID = socketIDToChatID.get(socketID); 
            const userID = socketIDToUserID.get(socketID);
            const activeUsers = chatIDToSocketIDs.get(chatID);

            if (activeUsers.length == 2) { // other user online
                const index = activeUsers[0] == socketID ? 1 : 0;
                console.log("Sending to " + activeUsers[index]);
                socket.to(activeUsers[index]).emit("message", msg); 
            }

            postChatMessageToDB(chatID, userID, msg);
        });
    });

    httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});

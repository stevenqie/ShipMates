import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

let count = 0;
app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server(httpServer);

   
    const listingKeyToUsers = new Map();
    io.on("connection", (socket) => {
        const currentId = socket.id;
        
        count += 1;

        socket.on("join", (listingKey) => {
            const otherUserLoggedIn = listingKeyToUsers.has(listingKey);
            
            if (otherUserLoggedIn) {
                listingKeyToUsers.get(listingKey).push(currentId);
            } else {
                listingKeyToUsers.set(listingKey, [currentId]);
            }
        });
        
        socket.on("disconnect", (_) => {
            const currentClientList = listingKeyToUsers.get(data.listingKey);
            const otherUserLoggedIn = currentClientList.length == 2;
            if (otherUserLoggedIn) {
                const idxToDel = currentClientList.findIndex(currentId);
                currentClientList.splice(idxToDel, 1);
            } else {
                listingKeyToUsers.delete(data.listingKey);
            }
        });

        socket.on("message", (data) => {
            console.table(listingKeyToUsers);
            const currentClientList = listingKeyToUsers.get(data.listingKey);
            const otherUserLoggedIn = currentClientList.length == 2;
            if (otherUserLoggedIn) {
                console.log("Found other user");
                const otherId = currentClientList[0] == socket.id ? currentClientList[1] : currentClientList[0];
                io.to(otherId).emit("message", data.msg);
            }
            console.log("TODO: Send msg to DB");
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

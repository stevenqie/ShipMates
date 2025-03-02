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
    const userToListingKey = new Map();

    io.on("connection", (socket) => {
        const currentId = socket.id;
        
        count += 1;

        socket.on("join", (listingKey) => {
            const listingKeyString = JSON.stringify(listingKey);
            const otherUserLoggedIn = listingKeyToUsers.has(listingKeyString);

            if (otherUserLoggedIn) {
                listingKeyToUsers.get(listingKeyString).push(currentId);
            } else {
                listingKeyToUsers.set(listingKeyString, [currentId]);
            }
            userToListingKey.set(currentId, listingKeyString);

            console.log("After join " + currentId +  "(other logged in): " + otherUserLoggedIn + "  -> ");
            console.table(listingKeyToUsers);
        });
        
        socket.on("disconnect", (_) => {
            const listingKeyString = userToListingKey.get(currentId);
            if (!listingKeyString) {
                return;
            }

            const currentClientList = listingKeyToUsers.get(listingKeyString);
            const otherUserLoggedIn = currentClientList && currentClientList.length == 2;
            if (otherUserLoggedIn) {
                const idxToDel = currentClientList.findIndex(currentId);
                currentClientList.splice(idxToDel, 1);
            } else {
                console.log("Full delete");
                listingKeyToUsers.delete(listingKeyString);
            }

            console.log("After disconnect " + currentId + " -> ");
            console.table(listingKeyToUsers);
        });

        socket.on("message", (msg) => {
            const listingKeyString = userToListingKey.get(currentId);
            console.log(JSON.stringify(msg));
            const currentClientList = listingKeyToUsers.get(listingKeyString);
            const otherUserLoggedIn = currentClientList && currentClientList.length == 2;
            if (otherUserLoggedIn) {
                console.log("Found other user");
                const otherId = currentClientList[0] == socket.id ? currentClientList[1] : currentClientList[0];
                io.to(otherId).emit("message", msg);
            }
            console.log("TODO: Send msg to DB");
            console.log("After msg " + msg + " -> ");
            console.table(listingKeyToUsers);
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

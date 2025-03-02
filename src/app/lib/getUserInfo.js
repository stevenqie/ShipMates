import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../lib/firebaseConfig.js";

async function getUserInfo(username) {
    console.warn("get user info");
    console.warn(username)
    const usersRef = collection(db, "users");
    const usersQuery = query(
        usersRef,
        where("username", "==", username),
    );
    const snapshot = await getDocs(usersQuery);

    return snapshot.docs.map((doc) => {
        const data = doc.data();
        console.warn("Document Data:", data); // Log entire document data
        return {
            profilePictureURL: data?.profilePictureUrl || "https://a.espncdn.com/i/headshots/nba/players/full/1966.png"
        };
    });

}

export {getUserInfo};
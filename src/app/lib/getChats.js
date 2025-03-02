import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../lib/firebaseConfig.js";

async function getChats(username) {
    console.warn("Fetching chats for user:", username);

    const chatsRef = collection(db, "chatMetadata"); 
    const chatsQuery = query(
        chatsRef, 
        where("hostID", "==", username)
    );

    const snapshot = await getDocs(chatsQuery);

    return snapshot.docs.map((doc) => ({
        hostID: doc.data()?.hostID || "", 
        personbID: doc.data()?.personbID  || "",
        chatID: doc.id 
    }));
}

export { getChats };

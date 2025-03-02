import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../lib/firebaseConfig.js";

async function getUser(email) {
    console.warn("get user");
    console.warn(email)
    const usersRef = collection(db, "users");
    const usersQuery = query(
        usersRef,
        where("email", "==", email),
    );
    const snapshot = await getDocs(usersQuery);

    if(!snapshot.empty) {
        const userDoc = snapshot.docs[0].data();
        console.warn(userDoc.username); 
        return userDoc.username;
    }

    return "";
}

export {getUser};
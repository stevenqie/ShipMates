import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../lib/firebaseConfig.js";

async function checkUser(email) {
    const usersRef = collection(db, "users");
    const usersQuery = query(
        usersRef,
        where("email", "==", email),
    );
    const snapshot = await getDocs(usersQuery);

    if(!snapshot.empty) {
        const userDoc = snapshot.docs[0].data(); 
        return userDoc.addresses;
    }

    return 0;
}

export {checkUser};
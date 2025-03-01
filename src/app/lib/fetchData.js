import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../lib/firebaseConfig.js";

async function getActiveListingsByZip(zipCode) {
    const listingsRef = collection(db, "listings");
    const listingsQuery = query(
        listingsRef,
        where("status", "==", "active"),
        where("location.zip", "==", zipCode),
    );
    const snapshot = await getDocs(listingsQuery);

    return snapshot.docs.map((doc) => ({ 
        id: doc.data().id, 
        title: doc.data().title,
        // TODO: Fetch user's name
        store: doc.data().store,
        description: doc.data().description,
        minPurchaseRequired: doc.data().minPurchaseRequired,
        currentTotal: doc.data().currentTotal,
        location: doc.data().location,
        // TODO: Fetch avg rating
        // TODO: Fetch num reviews
    }));
}

export {getActiveListingsByZip};

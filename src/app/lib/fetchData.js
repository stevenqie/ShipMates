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
    console.log("hi");
    snapshot.docs.forEach((doc) => {
        console.log(doc.data().hostID);
    });
    return snapshot.docs.map((doc) => ({ 
        listingID: doc.id,
        hostID: doc.data().hostID, 
        title: doc.data().title,
        // TODO: Fetch user's name
        store: doc.data().store,
        description: doc.data().description,
        minPurchaseRequired: doc.data().minPurchaseRequired,
        currentTotal: doc.data().currentTotal,
        location: doc.data().location,
        createdAt : doc.data().createdAt.toDate(),
        status: doc.data().status
        // TODO: Fetch avg rating
        // TODO: Fetch num reviews
    }));
}

export {getActiveListingsByZip};

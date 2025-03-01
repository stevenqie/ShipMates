import { db } from "../firebaseConfig.js";
import { doc, setDoc } from "firebase/firestore";


//listingdata should be a json file with the following fields:
//listingID, hostID, store, title, description, minPurchaseRequired, currentTotal, createdAt, expiresAt, status, location
//location should be a json object with the following fields:
//street, apt number (if relevant), city, state, zip
export default function storeListingData(listingdata) {
  const listingRef = doc(db, "listings", listingdata.listingID);

  return setDoc(listingRef, {
    listingID: listingdata.listingID,
    hostID: listingdata.hostID,
    store: listingdata.store,
    title: listingdata.title,
    description: listingdata.description,
    minPurchaseRequired: listingdata.minPurchaseRequired,
    currentTotal: listingdata.currentTotal,
    createdAt: listingdata.createdAt,
    expiresAt: listingdata.expiresAt,
    status: listingdata.status,
    location: listingdata.location
  });
}

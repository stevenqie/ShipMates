import { db } from "@/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";


//userdata should be a json file with the following fields:
//username, firstName, lastName, profilePictureURL, email, phoneNumber, bio, rating, completedOrders, addresses
//addresses should be a list of json objects with the following fields:
//street, city, state, zip, isPrimary
export default function storeUserData(userdata) {
  const userRef = doc(db, "users", userdata.username);

  return setDoc(userRef, {
    username: userdata.username,
    firstName: userdata.firstName,
    lastName: userdata.lastName,
    profilePictureURL: userdata.profilePictureURL,
    email: userdata.email,
    phoneNumber: userdata.phoneNumber,
    bio: userdata.bio,
    rating: userdata.rating,
    completedOrders: userdata.completedOrders,
    addresses: userdata.addresses,
  });
}
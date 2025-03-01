import { faker } from "@faker-js/faker";
import { db } from "../firebaseConfig.js";
import { doc, setDoc } from "firebase/firestore";
//import storeUserData from "../register/page.js";
const stateZipRanges = {
  "AL": [35001, 36999],
  "AK": [99501, 99999],
  "AZ": [85001, 86999],
  "AR": [71601, 72999],
  "CA": [90001, 96199],
  "CO": [80001, 81699],
  "CT": [6001, 6999],
  "DE": [19701, 19999],
  "FL": [32001, 34999],
  "GA": [30001, 31999],
  "HI": [96701, 96999],
  "ID": [83201, 83999],
  "IL": [60001, 62999],
  "IN": [46001, 47999],
  "IA": [50001, 52999],
  "KS": [66001, 67999],
  "KY": [40001, 42999],
  "LA": [70001, 71599],
  "ME": [3901, 4999],
  "MD": [20601, 21999],
  "MA": [1001, 2799],
  "MI": [48001, 49999],
  "MN": [55001, 56799],
  "MS": [38601, 39999],
  "MO": [63001, 65999],
  "MT": [59001, 59999],
  "NE": [68001, 69999],
  "NV": [88901, 89999],
  "NH": [3001, 3899],
  "NJ": [7001, 8999],
  "NM": [87001, 88499],
  "NY": [10001, 14999],
  "NC": [27001, 28999],
  "ND": [58001, 58999],
  "OH": [43001, 45999],
  "OK": [73001, 74999],
  "OR": [97001, 97999],
  "PA": [15001, 19699],
  "RI": [2801, 2999],
  "SC": [29001, 29999],
  "SD": [57001, 57999],
  "TN": [37001, 38599],
  "TX": [75001, 79999],
  "UT": [84001, 84999],
  "VT": [5001, 5999],
  "VA": [22001, 24699],
  "WA": [98001, 99499],
  "WV": [24701, 26999],
  "WI": [53001, 54999],
  "WY": [82001, 83199]
};

function getRandomZipCode(state) {
  const [min, max] = stateZipRanges[state];
  return faker.number.int({ min, max }).toString().padStart(5, '0');
}

export function storeUserData(userdata) {
  const userRef = doc(db, "users", userdata.username);

  return setDoc(userRef, {
    username: userdata.username,
    firstName: userdata.firstName,
    lastName: userdata.lastName,
    //profilePictureURL: userdata.profilePictureURL,
    email: userdata.email,
    phoneNumber: userdata.phoneNumber,
    bio: userdata.bio,
    rating: userdata.rating,
    completedOrders: userdata.completedOrders,
    addresses: userdata.addresses,
  });
}

export async function generateFakeUsers(count) {
    for (let i = 0; i < count; i++) {
      const state = faker.location.state({abbreviated : true})
      const fakeUser = {
        username: faker.internet.username(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        bio: faker.lorem.sentence(),
        rating: faker.number.float({ min: 0, max: 5, fractionDigits: 1}),
        completedOrders: faker.number.int({ min: 0, max: 100 }),
        addresses: [
          {
            street: faker.location.streetAddress(),
            city: faker.location.city(),
            state: state,
            zip: getRandomZipCode(state),
            isPrimary: true
          },
        ]
      };
      await storeUserData(fakeUser);
    }
    console.log(`${count} fake users generated`);
  }

  generateFakeUsers(100).then(() => {
    console.log("done");
    process.exit(0);
  }).catch((error) => {
    console.error("Error generating fake data:", error);
    process.exit(1);
  });
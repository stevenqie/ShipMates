import { faker} from "@faker-js/faker";
import { db } from "../firebaseConfig.js";
import { doc, setDoc } from "firebase/firestore";
//import storeListingData from "../createlisting/page.js";

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
  
export async function generateFakeListings(count) {
    const status = ["active", "closed"];
    for (let i = 0; i < count; i++) {
        const randChoice = faker.number.int({min:0, max: 1})
        const state = faker.location.state({abbreviated : true})
        const fakeListing = {
            listingID: faker.string.uuid(),
            hostID: faker.string.uuid(),
            store: faker.company.name(),
            title: faker.commerce.product(),
            description: faker.commerce.productDescription(),
            minPurchaseRequired: faker.number.int({ min: 5, max: 25 }),
            currentTotal: faker.number.int({ min: 5, max: 50 }),
            createdAt: faker.date.past({days: 14}),
            expiresAt: faker.date.future({days: 14}),
            status: status[randChoice],
            location: {
                street: faker.location.streetAddress(),
                city: faker.location.city(),
                state: faker.location.state({abbreviated : true}),
                zip: getRandomZipCode(state)
            }
        };
        await storeListingData(fakeListing);
    }
    console.log(`${count} fake listings generated`);
  }

  generateFakeListings(100).then(() => {
    console.log("done");
    process.exit(0);
  }).catch((error) => {
    console.error("Error generating fake listings:", error);
    process.exit(1);
  });
import { faker } from "@faker-js/faker";
import storeListingData from "../createlisting/page.js";

export async function generateFakeListings(count) {
    const status = ["active", "closed"];
    for (let i = 0; i < count; i++) {
        const randChoice = faker.number.int({min:0, max: 1})
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
            zip: faker.location.zipCode()
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
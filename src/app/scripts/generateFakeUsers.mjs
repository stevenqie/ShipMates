import { faker } from "@faker-js/faker";
import storeUserData from "../register/page.js";

export async function generateFakeUsers(count) {
    for (let i = 0; i < count; i++) {
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
            state: faker.location.state({abbreviated : true}),
            zip: faker.location.zipCode(),
            isPrimary: true
          },
        ]
      };
      await storeUserData(fakeUser);
    }
    console.log(`${count} fake users generated`);
  }

  generateFakeData(100).then(() => {
    console.log("done");
    process.exit(0);
  }).catch((error) => {
    console.error("Error generating fake data:", error);
    process.exit(1);
  });
/**
 * Generic getAccount function that performs a GET request that takes in accountID 
 * and returns account data in json format
 * @param {} id 
 * @returns 
 */
export async function getAccount(id) {
    const response = await fetch(`http://localhost:3000/api/accounts/${id}?t=${Date.now()}`, {
      method: "GET",
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Error fetching account:", errorText);
        throw new Error(`Failed to fetch account: ${response.statusText}`);
    }

    return await response.json();
}

/**
 * Generic createNewAccount function that performs a PUT request that first makes a customer 
 * object and then an account object. 
 * @param {*} customerData 
 * @param {*} accountData 
 * @returns 
 */
export async function createNewAccount(customerData, accountData) {
  const response = await fetch(`http://localhost:3000/api/accounts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({customerData, accountData}),
  });
  return response.json();
}

//---------------------------------Actually Useful Functions---------------------------------//

/**
 * new balance has to be string lmaoooo
 * @param {*} id 
 * @param {*} newBalance 
 */
export async function changeAccountBalance(id, newBalance) {
  const response = await fetch(`http://localhost:3000/api/transact/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify({nickname: newBalance}),
  });
  const data = await response.json();
  return data; 
}

export async function getAccountBalance(id) {
  const response = await fetch(`http://localhost:3000/api/accounts/${id}?t=${Date.now()}`, {
    method: "GET",
  });

  if (!response.ok) {
      const errorText = await response.text();
      console.error("Error fetching account:", errorText);
      throw new Error(`Failed to fetch account: ${response.statusText}`);
  }

  const data =  await response.json();
  return data.nickname; 
}

/**
 * when firstid wants to send amount to secondid 
 * @param {} firstid 
 * @param {*} secondid 
 * @param {*} amount 
 */
export async function transaction(firstid, secondid, amount) {
  const sender_balance = await getAccountBalance(firstid);
  if (!sender_balance) {
      console.error("sender Balance not found in response");
      return (
          <div>
              <h1>Error: Sender Balance not found in response</h1>
          </div>
      );
  } else {
      console.log("Sender Balance: ", sender_balance);
  }

  if (Number(sender_balance) < Number(amount)) {
      console.error("Insufficient funds");
      return (
          <div>
              <h1>Error: Insufficient funds. Cannot send that much money </h1>
          </div>
      );
  } else {
    console.error("Sufficient funds from sender");
  }

  const sender_newbalance = Number(sender_balance) - Number(amount); 
  const receiver_newbalance= await getAccountBalance(secondid);
  if (!receiver_newbalance) {
      console.error("receiver Balance not found in response");
      return (
          <div>
              <h1>Error: Receiver Balance not found in response</h1>
          </div>
      );
  } else {
      console.log("Receiver Balance: ", receiver_newbalance);
  }

  const updatedSenderBalance = sender_newbalance.toString();
  const updatedReceiverBalance = (Number(receiver_newbalance) + Number(amount)).toString();
  
  await changeAccountBalance(firstid, updatedSenderBalance);
  await changeAccountBalance(secondid, updatedReceiverBalance);

  // console.error("Updated Sender Balance: ", updatedSenderBalance);
  // console.error("Updated Receiver Balance: ", updatedReceiverBalance);
  return {
    success: true,
    senderNewBalance: updatedSenderBalance,
    receiverNewBalance: updatedReceiverBalance,
    message: "Transaction completed successfully"
  };
}

/**
 * Creates a new account and returns the account ID(which will prob be stored in the database)
 * @param {*} customerData 
 * @param {*} accountData 
 * @returns 
 */
export async function createAndGetAccount(customerData, accountData) {
  const response = await fetch(`http://localhost:3000/api/accounts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({customerData, accountData}),
  });
  
  const data = await response.json();
  return data.objectCreated?._id;
}

// /**
//  * creates a new merchant account and returns the merchant ID (which will prob be stored in the database)
//  * @param {*} merchantData 
//  * @returns 
//  */
// export async function createMerchantAccount(merchantData) {
//   const response = await fetch(`http://localhost:3000/api/merchant`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(merchantData),
//   });

//   const data = await response.json();
//   return data.objectCreated?._id; 
// }

// /**
//  * Get's Merchant Name 
//  */
// export async function getMerchantName(id) {
//     const response = await fetch(`http://localhost:3000/api/merchant/${id}`, {
//       method: "GET",
//     })

//     if (!response.ok) {
//         const errorText = await response.text();
//         console.error("Error fetching account:", errorText);
//         throw new Error(`Failed to fetch account: ${response.statusText}`);
//     }

//     const data = await response.json();
//     return data.name; 
// }

// /**
//  * Get's merchant balance 
//  */
// /**
//  * Grabs Account Balance 
//  * @param {*} id 
//  * @returns 
//  */
// export async function getMerchantBalance(id) {
//   const response = await fetch(`http://localhost:3000/api/merchant/${id}`, {
//     method: "GET",
//   })

//   if (!response.ok) {
//       const errorText = await response.text();
//       console.error("Error fetching account:", errorText);
//       throw new Error(`Failed to fetch account: ${response.statusText}`);
//   }

//   const data = await response.json();
//   return data.category; 
// }


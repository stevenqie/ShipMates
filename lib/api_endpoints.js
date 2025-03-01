/**
 * Generic getAccount function that performs a GET request that takes in accountID 
 * and returns account data in json format
 * @param {} id 
 * @returns 
 */
export async function getAccount(id) {
    const response = await fetch(`http://localhost:3000/api/accounts/${id}`, {
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

//---------------------------------Actually Useful Functions Prob---------------------------------//

/**
 * Grabs Account name 
 * @param } id 
 * @returns 
 */
export async function getAccountName(id) {
  const response = await fetch(`http://localhost:3000/api/accounts/${id}`, {
    method: "GET",
  })

  if (!response.ok) {
      const errorText = await response.text();
      console.error("Error fetching account:", errorText);
      throw new Error(`Failed to fetch account: ${response.statusText}`);
  }

  const data = await response.json();
  return data.nickname; 
}

/**
 * Grabs Account Balance 
 * @param {*} id 
 * @returns 
 */
export async function getAccountBalance(id) {
  const response = await fetch(`http://localhost:3000/api/accounts/${id}`, {
    method: "GET",
  })

  if (!response.ok) {
      const errorText = await response.text();
      console.error("Error fetching account:", errorText);
      throw new Error(`Failed to fetch account: ${response.statusText}`);
  }

  const data = await response.json();
  return data.balance; 
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

/**
 * creates a new merchant account and returns the merchant ID (which will prob be stored in the database)
 * @param {*} merchantData 
 * @returns 
 */
export async function createMerchantAccount(merchantData) {
  const response = await fetch(`http://localhost:3000/api/merchant`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(merchantData),
  });

  const data = await response.json();
  return data.objectCreated?._id; 
}

/**
 * Get's Merchant Name 
 */
export async function getMerchantName(id) {
    const response = await fetch(`http://localhost:3000/api/merchant/${id}`, {
      method: "GET",
    })

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Error fetching account:", errorText);
        throw new Error(`Failed to fetch account: ${response.statusText}`);
    }

    const data = await response.json();
    return data.name; 
}

/**
 * Get's merchant balance 
 */
/**
 * Grabs Account Balance 
 * @param {*} id 
 * @returns 
 */
export async function getMerchantBalance(id) {
  const response = await fetch(`http://localhost:3000/api/merchant/${id}`, {
    method: "GET",
  })

  if (!response.ok) {
      const errorText = await response.text();
      console.error("Error fetching account:", errorText);
      throw new Error(`Failed to fetch account: ${response.statusText}`);
  }

  const data = await response.json();
  return data.category; 
}


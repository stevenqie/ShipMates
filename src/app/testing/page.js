//GET OPERATION: gets an account by ID
async function getAccount(id) {
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

// PUT OPERATION: Creates an account then takes that id  with ID and data(which will most likely be hardcoded for now)
async function createNewAccount(customerData, accountData) {
    const response = await fetch(`http://localhost:3000/api/accounts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({customerData, accountData}),
    });
    return response.json();
}

const customerData = {
    "first_name": "Steve",
    "last_name": "qw",
    "address": {
        "street_number": "43",
        "street_name": "23",
        "city": "4fdv",
        "state": "MA",
        "zip": "02492"
    }
};

const accountData = {
    "type": "Credit Card",
    "nickname": "steven",
    "rewards": 0,
    "balance": 10000
};
  
const Page = async () => {
    const accountCreationResponse = await createNewAccount(customerData, accountData);
    console.error("Create Account Reseponse", accountCreationResponse);

    const accountId = accountCreationResponse.objectCreated?._id;
    if (!accountId) {
        console.error("Customer ID not found in response");
        return (
            <div>
                <h1>Error: Customer ID not found in response</h1>
            </div>
        );
    } 
    
    const account = await getAccount(accountId);
    console.log("Account:", account);

    return (
        <div>
        <h1>Todo Item</h1>
        </div>
    );
};

export default Page;
  
import { resolve } from "styled-jsx/css";
import { getAccountName, getAccountBalance, createAndGetAccount, changeAccountBalance, transaction, getAccount } from "../../../lib/api_endpoints";

//what the data looks like that will get passed into the createNewAccount function 
const customerData1 = {
    "first_name": "abhi",
    "last_name": "khanduja",
    "address": {
        "street_number": "43",
        "street_name": "monkey ave",
        "city": "4fdv",
        "state": "MA",
        "zip": "02492"
    }
};
const accountData1 = {
    "type": "Credit Card",
    "nickname": "10000",
    "rewards": 0,
    "balance": 10000
};

const customerData2 = {
    "first_name": "steven",
    "last_name": "qie",
    "address": {
        "street_number": "43",
        "street_name": "monkey ave",
        "city": "4fdv",
        "state": "MA",
        "zip": "02492"
    }
};
const accountData2 = {
    "type": "Credit Card",
    "nickname": "400",
    "rewards": 0,
    "balance": 0
};

// const merchantCreation = {
//     "name": "GROUPBUY",
//     "category": "BANK",
//     "address": {
//         "street_number": "43",
//         "street_name": "Douglas Rd",
//         "city": "Champaign",
//         "state": "IL",
//         "zip": "61820"
//     },
//     "geocode": {
//         "lat": 12,
//         "lng": 12
//     }
// }

const Page = async () => {
    const account1_id = await createAndGetAccount(customerData1, accountData1);
    if (!account1_id) {
        console.error("Account 1 ID not found in response");
        return (
            <div>
                <h1>Error: Account 1 ID not found in response</h1>
            </div>
        );
    }
    const account1Balance = await getAccountBalance(account1_id);
    if (!account1Balance) {
        console.error("Account 1 Balance not found in response");
        return (
            <div>
                <h1>Error: Account 1 Balance not found in response</h1>
            </div>
        );
    }
    console.error(`Account 1 Starting Balance: ${account1Balance}`);

    // const data = await changeAccountBalance(account1_id, "9000");
    // console.error("Account 1 Balance Change Response:", JSON.stringify(data, null, 2));

    // const newAccount1Balance = await getAccountBalance(account1_id);
    // if (!newAccount1Balance) {
    //     console.error("New Account 1 Balance not found in response");
    //     return (
    //         <div>
    //             <h1>Error: New Account 1 Balance not found in response</h1>
    //         </div>
    //     );
    // }
    // console.error(`New Account 1 Balance: ${newAccount1Balance}`);

    const account2_id = await createAndGetAccount(customerData2, accountData2);
    if (!account2_id) {
        console.error("Account 2 ID not found in response");
        return (
            <div>
                <h1>Error: Account 2 ID not found in response</h1>
            </div>
        );
    }

    const account2Balance = await getAccountBalance(account2_id);
    if (!account2Balance) {
        console.error("Account 2 Balance not found in response");
        return (
            <div>
                <h1>Error: Account 2 Balance not found in response</h1>
            </div>
        );
    }
    console.error(`Account 2 Starting Balance: ${account2Balance}`);

    const transferAmount = "5000";
    const transferResult = await transaction(account1_id, account2_id, transferAmount);
    if (!transferResult) {
        console.error("Transaction failed");
        return (
            <div>
                <h1>Error: Transaction failed</h1>
            </div>
        );
    }

    //console log new balances
    const newAccount1Balance = await getAccountBalance(account1_id);
    const newAccount2Balance = await getAccountBalance(account2_id);

    console.error(`New Account 1 Balance: ${newAccount1Balance}`);
    console.error(`New Account 2 Balance: ${newAccount2Balance}`);

    return (
        <div>
            <h1>testing page</h1>
        </div>
    );
    
    // const merchantid = await createMerchantAccount(merchantCreation);
    // if (!merchantid) {
    //     console.error("Merchant ID not found in response");
    //     return (
    //         <div>
    //             <h1>Error: Merchant ID not found in response</h1>
    //         </div>
    //     );
    // } 
    // console.error(merchantid)
    
    // const merchantName = await getMerchantName(merchantid);
    // if (!merchantName) {
    //     console.error("merchant Name not found in response");
    //     return (
    //         <div>
    //             <h1>Error: merchant Name not found in response</h1>
    //         </div>
    //     );
    // }
    // const merchantBalance = await getMerchantBalance(merchantid);
    // if (!merchantBalance) {
    //     console.error("merchant Balance not found in response");
    //     return (
    //         <div>
    //             <h1>Error: merchant Balance not found in response</h1>
    //         </div>
    //     );
    // }

    // return (
    //     <div>
    //         <h1>Merchant Name: {merchantName}</h1>
    //         <h1>MerchantId: {merchantid}</h1>
    //         <h1>Merchant Balance: {merchantBalance}</h1>
    //     </div>
    // )
};
  
// const Page = async () => {
//     const account_id = await createAndGetAccount(customerData, accountData);
//     if (!account_id) {
//         console.error("Account ID not found in response");
//         return (
//             <div>
//                 <h1>Error: Account ID not found in response</h1>
//             </div>
//         );
//     } 
    
//     const accountName = await getAccountName(account_id);
//     if (!accountName) {
//         console.error("Account Name not found in response");
//         return (
//             <div>
//                 <h1>Error: Account Name not found in response</h1>
//             </div>
//         );
//     }
//     const accountBalance = await getAccountBalance(account_id);
//     if (!accountBalance) {
//         console.error("Account Balance not found in response");
//         return (
//             <div>
//                 <h1>Error: Account Balance not found in response</h1>
//             </div>
//         );
//     }

//     return (
//         <div>
//             <h1>Account Name: {accountName}</h1>
//             <h1>AccountId: {account_id}</h1>
//             <h1>Account Balance: {accountBalance}</h1>
//         </div>
//     )
// };

export default Page;
  
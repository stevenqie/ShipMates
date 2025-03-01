import { getAccountName, getAccountBalance, createAndGetAccount, createMerchantAccount, getMerchantName, getMerchantBalance } from "../../../lib/api_endpoints";

//what the data looks like that will get passed into the createNewAccount function 
const customerData = {
    "first_name": "abhi",
    "last_name": "khanduja",
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
    "nickname": "Steven's Account",
    "rewards": 0,
    "balance": 10000
};

const merchantCreation = {
    "name": "GROUPBUY",
    "category": "BANK",
    "address": {
        "street_number": "43",
        "street_name": "Douglas Rd",
        "city": "Champaign",
        "state": "IL",
        "zip": "61820"
    },
    "geocode": {
        "lat": 12,
        "lng": 12
    }
}

const Page = async () => {
    const merchantid = await createMerchantAccount(merchantCreation);
    if (!merchantid) {
        console.error("Merchant ID not found in response");
        return (
            <div>
                <h1>Error: Merchant ID not found in response</h1>
            </div>
        );
    } 
    console.error(merchantid)
    
    const merchantName = await getMerchantName(merchantid);
    if (!merchantName) {
        console.error("merchant Name not found in response");
        return (
            <div>
                <h1>Error: merchant Name not found in response</h1>
            </div>
        );
    }
    const merchantBalance = await getMerchantBalance(merchantid);
    if (!merchantBalance) {
        console.error("merchant Balance not found in response");
        return (
            <div>
                <h1>Error: merchant Balance not found in response</h1>
            </div>
        );
    }

    return (
        <div>
            <h1>Merchant Name: {merchantName}</h1>
            <h1>MerchantId: {merchantid}</h1>
            <h1>Merchant Balance: {merchantBalance}</h1>
        </div>
    )
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
  
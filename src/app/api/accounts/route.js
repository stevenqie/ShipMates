import { NextResponse } from "next/server";

const API_KEY = "309a844675e8f5c82d723fe65a6ae49d";
const API_BASE_URL = "http://api.nessieisreal.com";

export async function POST(request) {
    const body = await request.json(); // Parse JSON body
    //const accountData = body.customerData;
    const {customerData, accountData} = body

    if (!customerData || !accountData) {
        return NextResponse.json({ error: "customerData and accountData are required" }, { status: 400 });
    }

    try {
        //first api call to create a customer 
        const customerRes = await fetch(`${API_BASE_URL}/customers?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customerData),
        });

        if (!customerRes.ok) {
            return NextResponse.json({ error: "Failed to create customer. Can't procede to create an account for this customer." }, { status: customerRes.status });
        }

        const customerResponseData = await customerRes.json();
        
        const customerId = customerResponseData.objectCreated._id; // Assuming the customer ID is in this field
        console.error("Customer ID:", customerId);

        //second api call to create an account for the customer
        const accountRes = await fetch(`${API_BASE_URL}/customers/${customerId}/accounts?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(accountData),
        });
        const data = await accountRes.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create account" }, { status: 500 });
    }
}
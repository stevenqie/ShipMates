import { NextResponse } from "next/server";

const API_KEY = "309a844675e8f5c82d723fe65a6ae49d";
const API_BASE_URL = "http://api.nessieisreal.com";

export async function PUT(request, {params}) {

    const body = await request.json(); // Parse JSON body

    console.error("body", body);

    if (!body) {
        return NextResponse.json({error: "Could not parse body for update balance route."}, { status: 400 });
    }

    try {
        const res = await fetch(`${API_BASE_URL}/accounts/${params.id}?key=${API_KEY}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const toreturn = await res.json();
        return NextResponse.json(toreturn);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update account(balance)" }, { status: 500 });
    }
}
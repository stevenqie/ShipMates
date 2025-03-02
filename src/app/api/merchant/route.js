import { NextResponse } from "next/server";

const API_KEY = "";
const API_BASE_URL = "http://api.nessieisreal.com";

export async function POST(request) {
    const body = await request.json(); // Parse JSON body

    if (!body) {
        return NextResponse.json({error: "Could not parse body for merchant route."}, { status: 400 });
    }

    try {
        const res = await fetch(`${API_BASE_URL}/merchants?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const toreturn = await res.json();
        return NextResponse.json(toreturn);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create merchant account" }, { status: 500 });
    }
}
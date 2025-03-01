import { NextResponse } from "next/server";

const API_KEY = "309a844675e8f5c82d723fe65a6ae49d";
const API_BASE_URL = "http://api.nessieisreal.com";

export async function GET(request, {params}) {

    try {
        const res = await fetch(`${API_BASE_URL}/merchants/${params.id}?key=${API_KEY}`);
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to get merchant account" }, { status: 500 });
    }
}
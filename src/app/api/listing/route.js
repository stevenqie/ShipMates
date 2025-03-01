import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(req) {
    console.log("Recieved req: " + JSON.stringify(req));
    try {
        const data = await req.json(); // Parse JSON body

        const dataWithServerFields = {
            ...data,
            createdAt: serverTimestamp(),

        }
        
        console.log("Field to add: " + JSON.stringify(dataWithServerFields));
        await addDoc(collection(db, "listings"), dataWithServerFields);
        return NextResponse.json({ success: true });
  } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

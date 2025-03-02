import { db } from "@/app/lib/firebaseConfig";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const chatID = searchParams.get("chatID");
        const userID = searchParams.get("userID");

        if (!chatID) {
            return NextResponse.json({ error: "chatID is required" }, { status: 400 });
        }

        const messagesRef = collection(db, "chats");
        const q = query(messagesRef, where("chatID", "==", chatID), orderBy("timestamp", "asc"));

        const querySnapshot = await getDocs(q);
        const messages = querySnapshot.docs.map(doc => ({
            id: doc.id,
            message: doc.data().message,
            isSender: (doc.data().username == userID)
        }));

        return NextResponse.json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

import { db } from "@/lib/firebase";
import { NextRequest } from "next/server";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function GET(req: NextRequest): Promise<Response> {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    return Response.json(userData, { status: 200 });
  } catch (error: unknown) {
    let errorMessage = "Failed to fetch profile.";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return Response.json({ error: errorMessage }, { status: 500 });
  }
}

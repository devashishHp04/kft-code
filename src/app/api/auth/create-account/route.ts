import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getErrorMessage } from "@/lib/errorStatus";

export async function POST(req: Request): Promise<Response> {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return Response.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    const token = await user.getIdToken();

    await setDoc(doc(db, "users", email), {
      userId: user.uid,
      name,
      email,
      photo: null,
      createdAt: new Date().toISOString(),
    });

    return Response.json({ userId: user.uid, token }, { status: 201 });
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred.";

    if (error instanceof Error) {
      errorMessage = getErrorMessage(error.message) || errorMessage;
    }

    return Response.json({ error: errorMessage }, { status: 400 });
  }
}

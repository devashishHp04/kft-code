import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

export async function POST(req: Request): Promise<Response> {
  try {
    const { email, password, provider } = await req.json();

    let userCredential;

    if (provider === "google") {
      const googleProvider = new GoogleAuthProvider();
      userCredential = await signInWithPopup(auth, googleProvider);
    } else {
      userCredential = await signInWithEmailAndPassword(auth, email, password);
    }

    const user = userCredential.user;
    const token = await user.getIdToken();

    return Response.json({ userId: user.uid, token }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error && "code" in error) {
      const firebaseError = error as { code: string; message: string };
      return Response.json({ error: firebaseError.code }, { status: 400 });
    }
    return Response.json(
      { error: "An unknown error occurred" },
      { status: 400 }
    );
  }
}

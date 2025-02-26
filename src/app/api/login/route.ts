import { auth, signInWithEmailAndPassword } from "@/lib/firebase";
import { FirebaseError } from "firebase/app";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // ✅ Sign in user
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    console.log("🔥 User signed in:", user);

    // ✅ Force Firebase to refresh session
    await user.reload();

    return Response.json(
      { success: true, uid: user.uid, email: user.email },
      { status: 200 }
    );
  } catch (error) {
    let errorMessage = "An unknown error occurred";

    if (error instanceof FirebaseError) {
      errorMessage = error.code;
    }

    return Response.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}

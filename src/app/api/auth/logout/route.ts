import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export async function POST(): Promise<Response> {
  try {
    await signOut(auth);
    return Response.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );
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

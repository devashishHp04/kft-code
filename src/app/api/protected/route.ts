import { auth } from "@/lib/firebase";

export async function GET(req: Request): Promise<Response> {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return Response.json({ error: "Not authorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    if (!auth.currentUser) {
      return Response.json({ error: "Invalid token" }, { status: 403 });
    }

    const user = auth.currentUser;
    const userToken = await user.getIdToken();

    if (userToken !== token) {
      return Response.json({ error: "Invalid token" }, { status: 403 });
    }

    return Response.json({ userId: user.uid, token }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 400 });
    }
    return Response.json(
      { error: "An unknown error occurred" },
      { status: 400 }
    );
  }
}

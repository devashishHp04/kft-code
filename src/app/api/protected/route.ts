import { getAuth, onAuthStateChanged } from "firebase/auth";

export async function GET(req: Request) {
  try {
    const authorization = req.headers.get("authorization");

    if (!authorization) {
      return Response.json(
        { success: false, error: "Not authorized" },
        { status: 401 }
      );
    }

    // Extract Firebase ID token
    const token = authorization.split("Bearer ")[1];

    if (!token) {
      return Response.json(
        { success: false, error: "Invalid token" },
        { status: 401 }
      );
    }

    // Verify user authentication using Firebase Client SDK
    const authInstance = getAuth();
    return new Promise((resolve) => {
      onAuthStateChanged(authInstance, (user) => {
        if (!user) {
          resolve(
            Response.json(
              { success: false, error: "Not authorized" },
              { status: 401 }
            )
          );
        } else {
          resolve(
            Response.json(
              { success: true, userId: user.uid, authToken: token },
              { status: 200 }
            )
          );
        }
      });
    });
  } catch (error) {
    let errorMessage = "An unknown error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return Response.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}

import { v4 as uuid } from "uuid";
import { cookies } from "next/headers";
import { connectToMongoDB } from "@/configs/db";
import { Session } from "@/models/session-schema";

export const createSession = async (username: string) => {
  try {
    await connectToMongoDB();
    const cookieStore = await cookies();

    const sessionId = `session:${uuid()}`;
    const expiration = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

    await Session.create({ username, sessionId, expiration });

    cookieStore.set("session_id", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      sameSite: "lax",
    });

    return { success: true, sessionId };
  } catch (error) {
    console.log("Failed to create session:", error);
    return { success: false, error: "Failed to create session" };
  }
};

export const getSession = async () => {
  try {
    await connectToMongoDB();
    const cookieStore = await cookies();

    const sessionId = cookieStore.get("session_id")?.value;

    if (!sessionId) return null;

    // Find session in database and check if it's still valid
    const session = await Session.findOne({
      sessionId,
      expiration: { $gt: new Date() },
    });

    if (!session) {
      return { expired: true };
    }

    return {
      sessionId: session.sessionId,
      username: session.username,
    };
  } catch (error) {
    console.error("Failed to get session:", error);
    return null;
  }
};

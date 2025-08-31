import { v4 as uuid } from "uuid";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export const createSession = async (username: string) => {
  try {
    const supabase = await createClient();
    const cookieStore = await cookies();

    const sessionId = `session:${uuid()}`;
    const expiration = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

    const { error } = await supabase.from("user_sessions").insert({
      session_id: sessionId,
      username,
      expires_at: expiration.toISOString(),
      last_active: new Date().toISOString(),
    });

    if (error) {
      console.error("Database error:", error);
      return { success: false, error: "Failed to create session in database" };
    }

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
    const supabase = await createClient();
    const cookieStore = await cookies();

    const sessionId = cookieStore.get("session_id")?.value;

    if (!sessionId) return null;

    // Find session in Supabase and check if it's still valid
    const { data: session, error } = await supabase
      .from("user_sessions")
      .select("session_id, username, expires_at")
      .eq("session_id", sessionId)
      .gt("expires_at", new Date().toISOString())
      .single();

    if (error || !session) {
      return { expired: true, error: "Session not found." };
    }

    // Update last_active timestamp
    await supabase
      .from("user_sessions")
      .update({ last_active: new Date().toISOString() })
      .eq("session_id", sessionId);

    return {
      sessionId: session.session_id,
      username: session.username,
    };
  } catch (error) {
    console.error("Failed to get session:", error);
    return null;
  }
};

export const cleanupExpiredSessions = async () => {
  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from("user_sessions")
      .delete()
      .lt("expires_at", new Date().toISOString());

    if (error) {
      console.error("Failed to cleanup expired sessions:", error);
    }
  } catch (error) {
    console.error("Failed to cleanup sessions:", error);
  }
};

export const deleteSession = async (sessionId?: string) => {
  try {
    const supabase = await createClient();
    const cookieStore = await cookies();

    const targetSessionId = sessionId || cookieStore.get("session_id")?.value;

    if (!targetSessionId) return { success: false };

    // Delete from database
    const { error } = await supabase
      .from("user_sessions")
      .delete()
      .eq("session_id", targetSessionId);

    // Delete cookie
    cookieStore.delete("session_id");

    return { success: !error };
  } catch (error) {
    console.error("Failed to delete session:", error);
    return { success: false };
  }
};

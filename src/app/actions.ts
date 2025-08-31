"use server";

import { createSession, getSession } from "@/lib/sessions";
import { createClient } from "@/lib/supabase/server";

export async function handleUsernameSubmit(formData: FormData) {
  const username = formData.get("username") as string;

  if (!username || username.trim().length === 0) {
    return { error: "Username is required" };
  }

  const trimmedUsername = username.trim();

  if (trimmedUsername.length < 2) {
    return { error: "Username must be at least 2 characters long" };
  }

  if (trimmedUsername.length > 50) {
    return { error: "Username must be less than 50 characters" };
  }

  const sanitizedUsername = trimmedUsername.replace(/[<>\"'&]/g, "");

  if (sanitizedUsername !== trimmedUsername) {
    return { error: "Username contains invalid characters" };
  }

  try {
    const currentSession = await getSession();

    // If user already has the same username, no need to create new session
    if (
      currentSession?.username === sanitizedUsername &&
      !currentSession.expired
    ) {
      return { unchanged: true, username: sanitizedUsername };
    }

    // Create new session
    const result = await createSession(sanitizedUsername);

    if (!result.success) {
      return { error: result.error || "Failed to create session" };
    }

    return { success: true, username: sanitizedUsername };
  } catch (error) {
    console.error("Session creation error:", error);
    return { error: "Something went wrong. Please try again." };
  }
}

export async function checkUsernameAvailability(username: string) {
  try {
    const supabase = await createClient();

    // Check if username is currently in use (active sessions only)
    const { data } = await supabase
      .from("user_sessions")
      .select("username")
      .eq("username", username.trim())
      .gt("expires_at", new Date().toISOString());

    return { available: !data || data.length === 0 };
  } catch (error) {
    console.error("Failed to check username:", error);
    return { available: true };
  }
}

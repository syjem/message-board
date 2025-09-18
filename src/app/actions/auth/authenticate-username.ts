"use server";

import { createSession, getSession } from "@/lib/sessions";
import { validateUsername } from "@/lib/validations/validate-username";
import { checkUsernameAvailability } from "@/lib/validations/check-username-availability";

export async function authenticateUsername(formData: FormData) {
  const username = formData.get("username") as string;

  const { username: sanitizedUsername, error } = validateUsername(username);
  if (error) return { error };
  if (!sanitizedUsername) {
    return { error: "Invalid username." };
  }

  try {
    const currentSession = await getSession();

    if (currentSession?.username === sanitizedUsername) {
      return { unchanged: true };
    }

    const { available } = await checkUsernameAvailability(sanitizedUsername);

    if (!available) {
      return { error: "Username is already taken." };
    }

    // Create new session
    const result = await createSession(sanitizedUsername);

    if (!result.success) {
      return { error: result.error };
    }

    return { success: true, username: sanitizedUsername };
  } catch (error) {
    console.error("Session creation error:", error);
    return { error: "Something went wrong. Please try again." };
  }
}

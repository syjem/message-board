"use server";

import { createSession, getSession } from "@/lib/sessions";

export async function handleUsernameSubmit(formData: FormData) {
  const username = formData.get("username") as string;

  if (!username || username.trim().length === 0) {
    return { error: "Username is required" };
  }

  const currentSession = await getSession();

  if (currentSession?.username === username) {
    return { unchanged: true };
  }

  const result = await createSession(username);

  if (!result.success) {
    return { error: "Failed to create session" };
  }

  return { success: true };
}

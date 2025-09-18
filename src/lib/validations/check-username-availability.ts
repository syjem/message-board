import { createClient } from "@/lib/supabase/server";

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

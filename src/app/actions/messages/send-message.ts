"use server";

import { getSession } from "@/lib/sessions";
import { createClient } from "@/lib/supabase/server";

export async function sendMessageAction(
  text: string,
  pathname: string,
  username: string
) {
  const supabase = await createClient();
  const session = await getSession();

  if (!session?.is_admin && pathname === "/pinned") {
    return { success: false, error: "Unauthorized" };
  }

  if (!text.trim() || text.length > 500) {
    return { success: false, error: "Invalid message" };
  }

  if (!username || username.length > 50) {
    return { success: false, error: "Invalid username" };
  }

  if (!["/", "/pinned"].includes(pathname)) {
    return { success: false, error: "Invalid channel" };
  }

  if (!session?.is_admin && pathname === "/pinned") {
    return { success: false, error: "Unauthorized" };
  }

  const shouldPin = session?.is_admin && pathname === "/pinned";

  const { error } = await supabase.from("messages").insert({
    text: text,
    username: username,
    is_pinned: shouldPin,
  });

  if (error) {
    return { success: false, error: "Failed to send message" };
  }

  return { success: true };
}

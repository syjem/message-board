"use server";

import { getSession } from "@/lib/sessions";
import { createClient } from "@/lib/supabase/server";

export async function sendMessageAction(text: string, pathname: string) {
  const session = await getSession();

  if (!session) {
    return { success: false, error: "No session found" };
  }

  if (!session.is_admin && pathname === "/pinned") {
    return { success: false, error: "Only admin can pin messages." };
  }

  const shouldPin = session.is_admin && pathname === "/pinned";

  const supabase = await createClient();
  const { error } = await supabase.from("messages").insert({
    text: text.trim(),
    username: session.username,
    is_pinned: shouldPin,
  });

  if (error) {
    return { success: false, error: "Failed to send message" };
  }

  return { success: true };
}

"use server";

import { getSession } from "@/lib/sessions";
import { createClient } from "@/lib/supabase/server";

export async function storeMessage(text: string) {
  const supabase = await createClient();
  const session = await getSession();

  if (!session?.username) {
    return { success: false, error: "Unauthorized" };
  }

  if (!text.trim()) {
    return { success: false, error: "Invalid message" };
  }

  const { error } = await supabase.from("messages").insert({
    text: text,
    username: session.username,
  });

  if (error) {
    return { success: false, error: "Failed to send message" };
  }

  return { success: true };
}

"use server";

import { getSession } from "@/lib/sessions";
import { createClient } from "@/lib/supabase/server";
import type { ChatMessage } from "@/types/chat-message";

export async function storeMessage(message: ChatMessage) {
  const supabase = await createClient();
  const session = await getSession();

  if (!session?.username || message.username !== session.username) {
    return { success: false, error: "Unauthorized" };
  }

  const { data, error } = await supabase
    .from("messages")
    .insert({
      _id: message._id,
      text: message.text,
      username: session.username,
      created_at: message.created_at,
    })
    .select()
    .single();

  if (error || !data) {
    return { success: false, error: "Failed to send message" };
  }

  return { success: true, message: data };
}

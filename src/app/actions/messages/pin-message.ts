"use server";

import { validate as isUUID } from "uuid";
import { getSession } from "@/lib/sessions";
import { createServiceClient } from "@/lib/supabase/service";

export async function pinMessage(messageId: string) {
  const session = await getSession();
  const supabase = createServiceClient();

  if (!session || !session.is_admin) {
    return { success: false, error: "Unathorized: Admin access required" };
  }

  if (!isUUID(messageId)) {
    console.error("Invalid UUID passed:", messageId);
    return { success: false, error: "Invalid message ID" };
  }

  const { data, error } = await supabase
    .from("messages")
    .update({ is_pinned: true })
    .eq("_id", messageId)
    .select();

  if (error) {
    console.log("Failed to pin the message.", error);
    return { success: false, error: "Failed to pin the message." };
  }

  if (!data || data.length === 0) {
    console.log("No rows matched for id:", messageId);
    return { success: false, error: "Message not found." };
  }

  return { success: true, message: "Message pinned successfully." };
}

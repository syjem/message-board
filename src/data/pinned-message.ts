"use server";

import { createClient } from "@/lib/supabase/server";

export const getPinnedMessages = async () => {
  const supabase = await createClient();

  const { data } = await supabase
    .from("messages")
    .select(`*`)
    .eq("is_pinned", true);

  return data || [];
};

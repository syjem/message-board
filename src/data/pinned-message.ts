"use server";

import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export const getPinnedMessages = cache(async () => {
  const supabase = await createClient();

  const { data } = await supabase
    .from("messages")
    .select(`*`)
    .eq("is_pinned", true);

  return data || [];
});

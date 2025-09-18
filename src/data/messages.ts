import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export const getMessages = cache(async () => {
  const supabase = await createClient();

  const { data } = await supabase.from("messages").select(`*`);

  return data || [];
});

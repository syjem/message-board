"use server";

import { createClient } from "@/lib/supabase/server";

export const getMessages = async () => {
  const supabase = await createClient();

  const { data } = await supabase.from("messages").select(`*`);

  return data || [];
};

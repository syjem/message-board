"use client";

import type { Message } from "@/types/chat";
import { createClient } from "@/lib/supabase/client";
import { useCallback, useEffect, useState } from "react";

export function useRealtimeChat() {
  const supabase = createClient();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  const loadMessages = useCallback(async () => {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: true });

    if (data) {
      setMessages(data);
    }
  }, [supabase]);

  useEffect(() => {
    // Load initial messages
    loadMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel("messages-channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages((current) => [...current, newMessage]);
        }
      )
      .subscribe(async (status) => {
        setIsConnected(status === "SUBSCRIBED");
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, loadMessages]);

  const sendMessage = useCallback(
    async (text: string, username: string) => {
      if (!isConnected || !text.trim()) return;

      try {
        const { error } = await supabase.from("messages").insert({
          text: text.trim(),
          username,
          is_pinned: false,
        });

        if (error) throw error;

        return { success: true };
      } catch (error) {
        console.error("Failed to send message:", error);
        return { success: false };
      }
    },
    [isConnected, supabase]
  );

  return { messages, sendMessage, isConnected };
}

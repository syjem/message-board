"use client";

import { useEffect, useState } from "react";
import type { Message } from "@/types/chat";
import { createClient } from "@/lib/supabase/client";

export function useRealtimeChat() {
  const supabase = createClient();
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
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
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          const deletedMessage = payload.old as Message;
          setMessages((current) =>
            current.filter((msg) => msg._id !== deletedMessage._id)
          );
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "messages" },
        (payload) => {
          const updatedMessage = payload.new as Message;
          setMessages((current) =>
            current.map((msg) =>
              msg._id === updatedMessage._id ? updatedMessage : msg
            )
          );
        }
      )
      .subscribe(async (status) => {
        setIsConnected(status === "SUBSCRIBED");
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return { messages, isConnected };
}

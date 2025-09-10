"use client";

import type { Message } from "@/types/chat";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export function useRealtimeChat() {
  const supabase = createClient();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const pathname = usePathname();

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
          if (
            pathname === "/" ||
            (pathname === "/pinned" && newMessage.is_pinned)
          ) {
            setMessages((current) => [...current, newMessage]);
          }
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
        {
          event: "UPDATE",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          const updatedMessage = payload.new as Message;

          if (pathname === "/") {
            setMessages((current) =>
              current.map((msg) =>
                msg._id === updatedMessage._id ? updatedMessage : msg
              )
            );
          } else if (pathname === "/pinned") {
            setMessages((current) => {
              if (!updatedMessage.is_pinned) {
                return current.filter((msg) => msg._id !== updatedMessage._id);
              } else {
                return current.map((msg) =>
                  msg._id === updatedMessage._id ? updatedMessage : msg
                );
              }
            });
          }
        }
      )
      .subscribe(async (status) => {
        setIsConnected(status === "SUBSCRIBED");
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, pathname]);

  return { messages, isConnected };
}

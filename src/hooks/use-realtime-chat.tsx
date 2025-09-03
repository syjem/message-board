"use client";

import type { Message } from "@/types/chat";
import { getMessages } from "@/data/messages";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useCallback, useEffect, useState } from "react";
import { getPinnedMessages } from "@/data/pinned-message";
import { sendMessageAction } from "@/app/actions/messages/send-message";

export function useRealtimeChat() {
  const supabase = createClient();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const pathname = usePathname();

  const loadMessages = useCallback(async () => {
    if (pathname === "/") {
      const data = await getMessages();

      if (data) {
        setMessages(data);
      }
    } else if (pathname === "/pinned") {
      const data = await getPinnedMessages();

      if (data) {
        setMessages(data);
      }
    }
  }, [pathname]);

  useEffect(() => {
    loadMessages();

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
  }, [supabase, loadMessages, pathname]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!isConnected || !text.trim()) return;

      try {
        const result = await sendMessageAction(text, pathname);

        if (!result.success) {
          console.error(result.error);
        }

        return result;
      } catch (error) {
        console.error("Failed to send message:", error);
        return { success: false };
      }
    },
    [isConnected, pathname]
  );

  return { messages, sendMessage, isConnected };
}

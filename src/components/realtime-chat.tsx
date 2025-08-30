"use client";

import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useChatScroll } from "@/hooks/use-chat-scroll";
import { ChatMessageItem } from "@/components/chat-message";
import { useCallback, useEffect, useMemo, useState } from "react";
import { type ChatMessage, useRealtimeChat } from "@/hooks/use-realtime-chat";

interface RealtimeChatProps {
  roomName: string;
  username: string;
  onMessage?: (messages: ChatMessage[]) => void;
  messages?: ChatMessage[];
}

/**
 * Realtime chat component
 * @param roomName - The name of the room to join. Each room is a unique chat.
 * @param username - The username of the user
 * @param onMessage - The callback function to handle the messages. Useful if you want to store the messages in a database.
 * @param messages - The messages to display in the chat. Useful if you want to display messages from a database.
 * @returns The chat component
 */
export const RealtimeChat = ({
  roomName,
  username,
  onMessage,
  messages: initialMessages = [],
}: RealtimeChatProps) => {
  const [newMessage, setNewMessage] = useState("");
  const { containerRef, scrollToBottom } = useChatScroll();

  const {
    messages: realtimeMessages,
    sendMessage,
    isConnected,
  } = useRealtimeChat({
    roomName,
    username,
  });

  // Merge realtime messages with initial messages
  const allMessages = useMemo(() => {
    const mergedMessages = [...initialMessages, ...realtimeMessages];
    // Remove duplicates based on message id
    const uniqueMessages = mergedMessages.filter(
      (message, index, self) =>
        index === self.findIndex((m) => m._id === message._id)
    );
    // Sort by creation date
    const sortedMessages = uniqueMessages.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    return sortedMessages;
  }, [initialMessages, realtimeMessages]);

  useEffect(() => {
    if (onMessage) {
      onMessage(allMessages);
    }
  }, [allMessages, onMessage]);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    scrollToBottom();
  }, [allMessages, scrollToBottom]);

  const handleSendMessage = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!username || username === "") {
        toast.error("Enter your username first!");
        return;
      }

      if (!newMessage.trim() || !isConnected) return;

      sendMessage(newMessage);
      setNewMessage("");
    },
    [newMessage, isConnected, sendMessage, username]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (newMessage.trim()) {
        handleSendMessage(e);
      }
    }
  };

  return (
    <div className="relative flex flex-col h-[calc(100%-115px)]">
      <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="space-y-2.5">
          {allMessages.map((message, index) => {
            const prevMessage = index > 0 ? allMessages[index - 1] : null;
            const showHeader =
              !prevMessage || prevMessage.user !== message.user;

            return (
              <div
                key={message._id}
                className="animate-in fade-in slide-in-from-bottom-4 duration-300"
              >
                <ChatMessageItem
                  message={message}
                  isOwnMessage={message.user === username}
                  showHeader={showHeader}
                />
              </div>
            );
          })}
        </div>
      </div>
      <form
        onSubmit={handleSendMessage}
        className="flex w-full gap-2 px-1 py-2"
      >
        <Textarea
          className={cn(
            "min-h-[44px] max-h-20 flex-1 resize-none rounded-xl border border-gray-700 bg-gray-800 px-4 text-sm text-slate-50 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200",
            !isConnected && "opacity-50 cursor-not-allowed"
          )}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          disabled={!isConnected}
          onKeyDown={handleKeyDown}
        />
        <Button
          className="aspect-square rounded-full animate-in fade-in slide-in-from-right-4 duration-300 bg-gray-900 hover:bg-gray-950"
          type="submit"
          disabled={!isConnected}
        >
          <Send className="size-4" />
        </Button>
      </form>
    </div>
  );
};

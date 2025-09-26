"use client";

import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "@/types/chat-message";
import { Textarea } from "@/components/ui/textarea";
import { useChatScroll } from "@/hooks/use-chat-scroll";
import { ChatMessageItem } from "@/components/chat-message";
import { useRealtimeChat } from "@/hooks/use-realtime-chat";
import { useCallback, useEffect, useMemo } from "react";
import { storeMessage } from "@/app/actions/messages/store-message";

interface RealtimeChatProps {
  roomName: string;
  username: string;
  isAdmin: boolean;
  messages?: ChatMessage[];
}

export const RealtimeChat = ({
  roomName,
  username,
  isAdmin,
  messages: initialMessages = [],
}: RealtimeChatProps) => {
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
    const sortedMessages = uniqueMessages.sort((a, b) =>
      a.created_at.localeCompare(b.created_at)
    );

    return sortedMessages;
  }, [initialMessages, realtimeMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [allMessages, scrollToBottom]);

  const handleSendMessage = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const form = e.currentTarget;

      const formData = new FormData(form);
      const text = (formData.get("text") as string)?.trim();

      if (!text || !isConnected) return;

      if (!username) {
        toast.error("Enter your username first!");
        return;
      }

      // Create optimistic message
      const message: ChatMessage = {
        _id: crypto.randomUUID(),
        text,
        username,
        created_at: new Date().toISOString(),
      };

      // Broadcast and render optimistically
      await sendMessage(message);
      form.reset();

      const result = await storeMessage(message);

      if (!result.success) {
        toast.error(result.error);
      }
    },
    [isConnected, sendMessage, username]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      e.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <div className="relative flex flex-col h-[calc(100%-115px)]">
      {/* Messages */}
      <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="space-y-2.5">
          {allMessages.map((message, index) => {
            const prevMessage = index > 0 ? allMessages[index - 1] : null;
            const showHeader =
              !prevMessage || prevMessage.username !== message.username;

            return (
              <div
                key={message._id}
                className="animate-in fade-in slide-in-from-bottom-4 duration-300"
              >
                <ChatMessageItem
                  message={message}
                  isAdmin={isAdmin}
                  isOwnMessage={message.username === username}
                  showHeader={showHeader}
                />
              </div>
            );
          })}
        </div>
      </div>

      <form
        onSubmit={handleSendMessage}
        className="flex w-full gap-2 px-4 md:px-1 py-2"
      >
        <Textarea
          name="text"
          id="text"
          className={cn(
            "min-h-[40px] max-h-20 flex-1 resize-none rounded-xl border border-gray-700 bg-gray-800 px-4 text-sm text-slate-50 placeholder:text-gray-400 transition-all duration-200",
            isConnected ? "w-[calc(100%-36px)]" : "w-full"
          )}
          placeholder="Type a message..."
          disabled={!isConnected}
          onKeyDown={handleKeyDown}
        />

        {isConnected && (
          <Button
            size="icon"
            className="aspect-square rounded-full animate-in fade-in slide-in-from-right-4 duration-300"
            type="submit"
            disabled={!isConnected}
          >
            <Send className="size-4" />
          </Button>
        )}
      </form>
    </div>
  );
};

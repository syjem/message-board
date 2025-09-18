"use client";

import { RealtimeChat } from "@/components/realtime-chat";
import type { ChatMessage } from "@/types/chat-message";

interface RealtimeChatProps {
  roomName: string;
  username: string;
  isAdmin: boolean;
  onMessage?: (messages: ChatMessage[]) => void;
  messages?: ChatMessage[];
}

export default function RealtimeChatWrapper({
  messages,
  roomName,
  username,
  isAdmin,
}: RealtimeChatProps) {
  return (
    <RealtimeChat
      messages={messages}
      roomName={roomName}
      username={username}
      isAdmin={isAdmin}
    />
  );
}

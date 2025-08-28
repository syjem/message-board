"use client";

import React from "react";
import { RealtimeChat } from "./realtime-chat";
import { useUsername } from "@/contexts/username-context";
import { type ChatMessage } from "@/hooks/use-realtime-chat";

function Chat({ messages }: { messages: ChatMessage[] }) {
  const { username } = useUsername();
  return (
    <RealtimeChat
      messages={messages}
      roomName="Mini Message Board"
      username={username}
    />
  );
}

export default Chat;

import React from "react";
import { getSession } from "@/lib/sessions";
import { RealtimeChat } from "./realtime-chat";
import { type ChatMessage } from "@/hooks/use-realtime-chat";

async function Chat({ messages }: { messages: ChatMessage[] }) {
  const session = await getSession();

  return (
    <RealtimeChat
      messages={messages}
      roomName="Mini Message Board"
      username={session?.username || ""}
    />
  );
}

export default Chat;

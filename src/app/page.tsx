import React from "react";
import { getMessages } from "./data";
import Chat from "@/components/chat";
import ChatBoxHeader from "@/components/chat-box-header";

export default async function Home() {
  const messages = await getMessages();

  return (
    <React.Fragment>
      <div className="relative isolate">
        <div className="max-w-lg mx-auto my-4 h-120">
          <ChatBoxHeader />
          <Chat messages={messages} />
        </div>
      </div>
    </React.Fragment>
  );
}

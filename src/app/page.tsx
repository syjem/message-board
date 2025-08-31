import React from "react";
import { getSession } from "@/lib/sessions";
import { getMessages } from "@/data/messages";
import ChatHeader from "@/components/chat-header";
import { RealtimeChat } from "@/components/realtime-chat";

export default async function Home() {
  const messages = await getMessages();
  const session = await getSession();

  return (
    <div className="relative mx-auto my-4 border-gray-800 bg-gray-800 border-[14px] rounded-xl h-[600px] w-[384px] shadow-xl">
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
      <div className="rounded-xl overflow-hidden w-full h-[572px] bg-gray-800">
        <ChatHeader username={session?.username} />
        <RealtimeChat messages={messages} username={session?.username} />
      </div>
    </div>
  );
}

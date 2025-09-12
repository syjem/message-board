import React from "react";
import { getSession } from "@/lib/sessions";
import { getMessages } from "@/data/messages";
import ChatHeader from "@/components/chat-header";
import { RealtimeChat } from "@/components/realtime-chat";

export default async function Home() {
  const messages = await getMessages();
  const session = await getSession();

  return (
    <div className="relative mx-auto md:my-4 border-gray-800 bg-gray-800 border-[14px] md:rounded-xl h-full w-full md:max-w-[384px] shadow-xl">
      <div className="hidden md:block h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg" />
      <div className="hidden md:block h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg" />
      <div className="hidden md:block h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg" />
      <div className="rounded-xl overflow-hidden w-full h-full md:h-[572px] bg-gray-800">
        <ChatHeader username={session?.username} />
        <RealtimeChat
          messages={messages}
          username={session?.username}
          is_admin={session?.is_admin}
        />
      </div>
    </div>
  );
}

import React from "react";
import dynamic from "next/dynamic";
import { getSession } from "@/lib/sessions";
import FallbackUI from "@/components/fallback-ui";
import ChatHeader from "@/components/chat-header";
import { getPinnedMessages } from "@/data/pinned-message";

const RealtimeChat = dynamic(() => import("@/components/realtime-chat"), {
  loading: () => <FallbackUI />,
});

export default async function Home() {
  const messages = await getPinnedMessages();
  const session = await getSession();

  return (
    <div className="relative mx-auto my-4 border-gray-800 bg-gray-800 border-[14px] rounded-xl h-[600px] w-[384px] shadow-xl">
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg" />
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg" />
      <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg" />
      <div className="rounded-xl overflow-hidden w-full h-[572px] bg-gray-800">
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

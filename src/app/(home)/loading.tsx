import ChatHeader from "@/components/chat-header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { getSession } from "@/lib/sessions";
import { Send } from "lucide-react";
import React from "react";

async function Loading() {
  const session = await getSession();
  return (
    <div className="relative mx-auto my-4 border-gray-800 bg-gray-800 border-[14px] rounded-xl h-[600px] w-[384px] shadow-xl">
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg" />
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg" />
      <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg" />
      <div className="rounded-xl overflow-hidden w-full h-[572px] bg-gray-800">
        <ChatHeader username={session?.username} />
        <div className="relative flex flex-col h-[calc(100%-115px)]">
          <div className="flex-1 p-4 space-y-4">
            <Skeleton className="bg-gray-500/50 rounded-b-xl rounded-l-none rounded-r-xl h-10 w-[100px]" />
            <Skeleton className="bg-gray-500/50 rounded-b-xl rounded-l-none rounded-r-xl h-8 w-[280px]" />
            <Skeleton className="bg-gray-500/50 rounded-b-xl rounded-l-none rounded-r-xl h-8 w-full" />
            <Skeleton className="bg-gray-500/50 rounded-b-xl rounded-l-none rounded-r-xl h-8 w-1/4" />
            <Skeleton className="bg-gray-500/50 rounded-b-xl rounded-l-none rounded-r-xl h-8 w-1/2" />
            <Skeleton className="bg-gray-500/50 rounded-b-xl rounded-l-none rounded-r-xl h-8 w-3/4" />
            <Skeleton className="bg-gray-500/50 rounded-b-xl rounded-l-none rounded-r-xl h-8 w-full" />
            <Skeleton className="bg-gray-500/50 rounded-b-xl rounded-l-none rounded-r-xl h-8 w-1/4" />
          </div>
          <form className="flex w-full gap-2 px-1 py-2">
            <Textarea
              name="text"
              disabled
              id="text"
              className="min-h-[44px] max-h-20 flex-1 resize-none rounded-xl border border-gray-700 bg-gray-800 px-4 text-sm text-slate-50 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
              placeholder="Type a message..."
            />
            <Button
              disabled
              className="aspect-square rounded-full bg-gray-900 hover:bg-gray-950"
              type="submit"
            >
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Loading;

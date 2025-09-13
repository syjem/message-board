import React from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";

function FallbackUI() {
  return (
    <div className="relative flex flex-col h-[calc(100%-115px)]">
      <div className="flex-1 p-4 space-y-4">
        <Skeleton className="bg-gray-500/50 rounded-xl h-10 w-[100px]" />
        <Skeleton className="bg-gray-500/50 rounded-xl h-8 w-[280px]" />
        <Skeleton className="bg-gray-500/50 rounded-xl h-8 w-full" />
        <Skeleton className="bg-gray-500/50 rounded-xl h-8 w-1/4" />
        <Skeleton className="bg-gray-500/50 rounded-xl h-8 w-1/2" />
        <Skeleton className="bg-gray-500/50 rounded-xl h-8 w-3/4" />
        <Skeleton className="bg-gray-500/50 rounded-xl h-8 w-full" />
        <Skeleton className="bg-gray-500/50 rounded-xl h-8 w-1/4" />
      </div>
      <div className="flex w-full gap-2 px-1 py-2">
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
      </div>
    </div>
  );
}

export default FallbackUI;

"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Rocket, User } from "lucide-react";
import { cn, getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UsernameDialog } from "@/components/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ChatHeader({ username }: { username: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!username) {
      setOpen(true);
    }
  }, [username]);

  return (
    <header className="sticky top-0 left-0 right-0 md:static">
      <div className="flex items-center justify-between px-2.5 border-b border-b-gray-600">
        <span className="flex w-full h-[50px] items-center font-bold text-sm text-white">
          Mini Message Board
        </span>
        <div className="flex items-center gap-x-1.5">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="group size-9 bg-inherit hover:bg-gray-600 transition-colors"
          >
            <Link href="/changelogs">
              <Rocket className="group-hover:text-gray-100 transition-colors" />
            </Link>
          </Button>
          <Button
            onClick={() => setOpen(true)}
            variant="ghost"
            size="icon"
            className="group size-9 bg-inherit hover:bg-gray-600 transition-colors"
          >
            <User className="group-hover:text-gray-100 transition-colors" />
          </Button>
          <UsernameDialog open={open} setOpen={setOpen} username={username} />
        </div>
      </div>
      <div className="px-4 py-2 flex gap-2 items-center shadow-2xl">
        <div
          id="avatar"
          className={cn(
            "relative shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-500"
          )}
        >
          <Avatar>
            <AvatarImage src="" alt={username} />
            <AvatarFallback className="text-gray-700 font-bold">
              {getInitials(username || "")}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="w-full">
          <span className="block w-full py-1.5 font-bold text-sm text-slate-200">
            {username || "Your username"}
          </span>
        </div>
      </div>
    </header>
  );
}

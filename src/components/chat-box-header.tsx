"use client";

import { cn, formatDate } from "@/lib/utils";
import { Pin, User } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import AuthDialog from "./auth-dialog";
import { useUsername } from "@/contexts/username-context";

export default function ChatBoxHeader() {
  const [open, setOpen] = useState(true);
  const { username } = useUsername();

  return (
    <React.Fragment>
      <div className="flex items-center justify-between px-2.5 border-b border-b-gray-600">
        <span className="flex w-full h-[50px] items-center font-bold text-sm text-white">
          Mini Message Board
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="group size-8 hover:bg-gray-800 transition-colors"
          >
            <Pin className="group-hover:text-white rotate-45" />
          </Button>
          <Button
            onClick={() => setOpen(true)}
            variant="ghost"
            size="icon"
            className="group size-8 hover:bg-gray-800 transition-colors"
          >
            <User className="group-hover:text-white " />
          </Button>
          <AuthDialog open={open} setOpen={setOpen} />
        </div>
      </div>
      <div className="px-4 py-2 flex gap-2 items-center border-b border-b-gray-600">
        <div
          id="avatar"
          className={cn(
            "relative shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-500"
          )}
        >
          <span className="font-semibold text-white"></span>
        </div>
        <div className="w-full flex flex-col items-start justify-center">
          <span className="block w-full py-1.5 font-bold text-sm text-slate-200">
            {username || "Your username"}
          </span>
          <p className="font-semibold text-xs text-[#acaeb4]">
            {formatDate(new Date())}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}

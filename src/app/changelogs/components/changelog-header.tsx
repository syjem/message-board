"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function ChangelogHeader() {
  const router = useRouter();

  return (
    <header className="space-y-8 my-10">
      <div className="flex items-center gap-4">
        <Button
          onClick={router.back}
          size="icon"
          className="text-white bg-slate-400/20 hover:bg-slate-300/20 cursor-pointer rounded-full transition-colors"
        >
          <ArrowLeft className="size-5 text-white" />
        </Button>
        <h1 className="text-lg font-serif font-light text-balance text-white">
          Changelogs
        </h1>
      </div>
      <p className="font-normal">
        This app is my take on{" "}
        <Link
          href="https://www.theodinproject.com/lessons/node-path-nodejs-mini-message-board"
          target="__blank"
          className="italic font-medium underline text-white/80 hover:no-underline transition-colors"
        >
          The Odin Project’s Node.js Mini Message Board
        </Link>{" "}
        — but it didn’t stop at the first build. Over time, I rebuilt it in
        different stacks to solve real deployment and performance issues.
      </p>
    </header>
  );
}

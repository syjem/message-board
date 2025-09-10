"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function BackButton() {
  const router = useRouter();
  return (
    <div className="max-w-2xl mt-5 mx-auto px-4 md:px-0">
      <Button
        onClick={router.back}
        size="icon"
        className="text-white bg-slate-400/20 hover:bg-slate-300/20 cursor-pointer rounded-full transition-colors"
      >
        <ArrowLeft className="size-5 text-white" />
      </Button>
    </div>
  );
}

export default BackButton;

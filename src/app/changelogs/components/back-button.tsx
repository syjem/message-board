"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function BackButton() {
  const router = useRouter();
  return (
    <div className="max-w-5xl mt-5 mx-auto">
      <Button
        onClick={router.back}
        className="text-white bg-inherit hover:bg-inherit"
      >
        <ArrowLeft className="size-5 text-white" />
      </Button>
    </div>
  );
}

export default BackButton;

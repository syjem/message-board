"use client";

import * as React from "react";
import { toast } from "sonner";
import { Message } from "@/types/chat";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Delete, EllipsisVertical } from "lucide-react";
import { deleteMessage } from "@/app/actions/messages/delete-message";

export function ChatDropdownMenu({ message }: { message: Message }) {
  const router = useRouter();

  const handleDeleteMessage = async () => {
    const result = await deleteMessage(message._id);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success(result.message);
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="inline-flex self-center items-center p-2 text-sm font-medium text-center rounded-lg focus:outline-none text-white bg-gray-800"
          type="button"
        >
          <EllipsisVertical className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-gray-600 w-40 rounded-lg shadow-sm bg-gray-700 text-white">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-600" />
        <DropdownMenuItem className="group" onClick={handleDeleteMessage}>
          <Delete className="text-gray-300 group-hover:text-gray-700" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

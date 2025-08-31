import { cn, formatDate } from "@/lib/utils";
import type { Message } from "@/types/chat";

interface ChatMessageItemProps {
  message: Message;
  isOwnMessage: boolean;
  showHeader: boolean;
}

export const ChatMessageItem = ({
  message,
  isOwnMessage,
  showHeader,
}: ChatMessageItemProps) => {
  return (
    <div
      className={`flex mt-2 ${isOwnMessage ? "justify-end" : "justify-start"}`}
    >
      <div
        className={cn("max-w-[75%] w-fit flex flex-col gap-1", {
          "items-end": isOwnMessage,
        })}
      >
        {showHeader && (
          <div
            className={cn("flex items-center gap-2 text-xs px-3", {
              "justify-end flex-row-reverse": isOwnMessage,
            })}
          >
            <span className={"font-medium text-white"}>{message.username}</span>
            <span className="text-xs text-white/50">
              {formatDate(message.created_at)}
            </span>
          </div>
        )}
        <div
          className={cn(
            "py-2 px-3 rounded-xl text-sm w-fit whitespace-pre-line text-primary-foreground",
            isOwnMessage ? "bg-sky-500" : "bg-gray-500/50"
          )}
        >
          {message.text}
        </div>
      </div>
    </div>
  );
};

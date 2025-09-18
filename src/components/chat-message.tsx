import type { ChatMessage } from "@/types/chat-message";
import { cn, formatDate } from "@/lib/utils";
import { ChatDropdownMenu } from "@/components/chat-dropdown";

interface ChatMessageItemProps {
  message: ChatMessage;
  isOwnMessage: boolean;
  isAdmin: boolean;
  showHeader: boolean;
}

export const ChatMessageItem = ({
  message,
  isOwnMessage,
  isAdmin,
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
            className={cn("flex items-center gap-2 text-xs", {
              "justify-end flex-row-reverse": isOwnMessage,
              "mr-6": isAdmin,
            })}
          >
            <span className={"font-medium text-white"}>{message.username}</span>
            <span className="text-xs text-white/50">
              {formatDate(message.created_at)}
            </span>
          </div>
        )}
        <div className="flex items-center">
          <div
            className={cn(
              "py-2 px-3 text-sm w-fit whitespace-pre-line text-primary-foreground rounded-xl",
              isOwnMessage ? "bg-sky-500" : "bg-gray-500/50"
            )}
          >
            {message.text}
          </div>
          {isAdmin && <ChatDropdownMenu message={message} />}
        </div>
      </div>
    </div>
  );
};

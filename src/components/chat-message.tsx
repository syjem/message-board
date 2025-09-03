import type { Message } from "@/types/chat";
import { cn, formatDate } from "@/lib/utils";
import { ChatDropdownMenu } from "@/components/chat-dropdown";

interface ChatMessageItemProps {
  message: Message;
  isOwnMessage: boolean;
  is_admin: boolean;
  showHeader: boolean;
}

export const ChatMessageItem = ({
  message,
  isOwnMessage,
  is_admin,
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
              "mr-6": is_admin,
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
              "py-2 px-3 text-sm w-fit whitespace-pre-line text-primary-foreground",
              isOwnMessage
                ? "bg-sky-500 rounded-s-xl rounded-se-xl"
                : "bg-gray-500/50 rounded-e-xl rounded-es-xl"
            )}
          >
            {message.text}
          </div>
          {is_admin && <ChatDropdownMenu message={message} />}
        </div>
      </div>
    </div>
  );
};

import { useCallback, useEffect, useRef, useState } from "react";

export function useChatScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInitialScrollDone, setIsInitialScrollDone] = useState(false);

  const scrollToBottom = useCallback((smooth = true) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: smooth ? "smooth" : "auto",
    });
  }, []);

  useEffect(() => {
    if (!isInitialScrollDone) {
      scrollToBottom(false);
      setIsInitialScrollDone(true);
    } else {
      scrollToBottom(true);
    }
  }, [isInitialScrollDone, scrollToBottom]);

  return { containerRef, scrollToBottom };
}

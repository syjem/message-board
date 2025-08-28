"use client";
import { Loader } from "lucide-react";
import React, { useState, useEffect } from "react";

const ButtonScroller = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showLatest, setShowLatest] = useState(false);
  const [showGetOlder, setShowGetOlder] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Show/hide BackToTop + GetOlder
      if (scrollY > 60) {
        setShowBackToTop(true);
        setShowGetOlder(false);
      } else {
        setShowBackToTop(false);
        setShowGetOlder(true);
      }

      // Show/hide Latest
      if (scrollY + windowHeight < docHeight - 60) {
        setShowLatest(true);
      } else {
        setShowLatest(false);
      }
    };

    scrollToBottom();

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <React.Fragment>
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="bg-gray-800 text-xs fixed top-6 left-1/2 -translate-x-1/2 py-1.5 px-3.5 text-white border-none rounded-full z-[100] transition-opacity opacity-80 hover:opacity-100 cursor-pointer"
        >
          ↑ Scroll to Top
        </button>
      )}

      {showGetOlder && (
        <button className="bg-gray-800 text-xs fixed top-6 left-1/2 -translate-x-1/2 py-1.5 px-3.5 text-white border-none rounded-full z-[100] transition-opacity opacity-80 hover:opacity-100 cursor-pointer flex items-center gap-1.5">
          <Loader className="h-4 w-4" />
          Get older messages
        </button>
      )}

      {showLatest && (
        <button
          onClick={scrollToBottom}
          className="bg-gray-800 text-xs fixed bottom-6 left-1/2 -translate-x-1/2 py-1.5 px-3.5 text-white border-none rounded-full z-[100] transition-opacity opacity-80 hover:opacity-100 cursor-pointer"
        >
          ↓ Latest message
        </button>
      )}
    </React.Fragment>
  );
};

export default ButtonScroller;

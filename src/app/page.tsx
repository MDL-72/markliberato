"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const fullText = "I'll be back";

  useEffect(() => {
    // Typewriter effect
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        // Show button after typing completes
        setTimeout(() => setShowButton(true), 300);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    // Blinking cursor
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 font-mono">
      {/* Scanline overlay */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 65, 0.03) 2px, rgba(0, 255, 65, 0.03) 4px)",
          }}
        />
      </div>

      <div className="max-w-2xl text-center relative">
        {/* Terminal prompt */}
        <div className="flex items-center justify-center gap-2 text-[#00ff41] text-lg md:text-xl mb-4 opacity-60">
          <span>mark@portfolio:~$</span>
        </div>

        {/* Main text with typewriter effect */}
        <h1 className="text-4xl md:text-6xl font-bold text-[#00ff41] tracking-tight mb-12">
          <span>{displayText}</span>
          <span
            className={`inline-block w-3 h-8 md:h-12 bg-[#00ff41] ml-1 transition-opacity duration-100 ${
              showCursor ? "opacity-100" : "opacity-0"
            }`}
          />
        </h1>

        {/* Resume button - styled as terminal command */}
        <div
          className={`transition-all duration-500 ${
            showButton
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#00ff41]/40 text-[#00ff41] rounded font-mono text-sm hover:bg-[#00ff41]/10 hover:border-[#00ff41] transition-all duration-300 group"
          >
            <span className="opacity-60">[</span>
            <span>download resume</span>
            <span className="opacity-60">]</span>
            <span className="opacity-0 group-hover:opacity-60 transition-opacity duration-300">
              _
            </span>
          </a>
        </div>

        {/* Subtle terminal hint */}
        <div
          className={`mt-8 text-[#00ff41]/30 text-xs transition-all duration-700 delay-300 ${
            showButton ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="opacity-50">// </span>
          <span>System update in progress...</span>
        </div>
      </div>
    </div>
  );
}

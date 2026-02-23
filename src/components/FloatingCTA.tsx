"use client";

import { MessageCircle } from "lucide-react";

export function FloatingCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/436644417977?text=Hallo!%20Ich%20interessiere%20mich%20für%20das%20Fußballcamp."
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-14 min-h-[56px] min-w-[56px] items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
        aria-label="WhatsApp - Kontaktiere uns"
      >
        <MessageCircle className="h-7 w-7 text-white" />
      </a>
    </div>
  );
}

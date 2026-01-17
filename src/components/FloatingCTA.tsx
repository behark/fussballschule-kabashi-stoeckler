"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

export function FloatingCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
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
      
      {/* Anmelden Button - mobile only */}
      <Button
        asChild
        size="lg"
        className="h-14 min-h-[56px] rounded-full bg-[#22C55E] px-6 font-bold shadow-lg hover:bg-[#16a34a] lg:hidden"
      >
        <Link href="/contact" className="flex items-center min-h-[56px]">
          Anmelden
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FloatingCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-50 lg:hidden">
      <Button
        asChild
        size="lg"
        className="h-14 rounded-full bg-[#22C55E] px-6 font-bold shadow-lg hover:bg-[#16a34a]"
      >
        <Link href="/contact" className="flex items-center">
          Anmelden
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}

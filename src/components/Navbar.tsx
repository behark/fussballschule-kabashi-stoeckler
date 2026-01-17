"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/camps", label: "Camps & Training" },
  { href: "/philosophy", label: "Philosophie" },
  { href: "/about", label: "Über Uns" },
  { href: "/contact", label: "Kontakt" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#003399]">
            <span className="text-xl font-black text-white">KS</span>
          </div>
          <div className="hidden sm:block">
            <span className="text-lg font-black text-[#003399]">KABASHI-STÖCKLER</span>
            <span className="block text-xs font-semibold text-gray-600">FUSSBALLSCHULE</span>
          </div>
        </Link>

        <nav className="hidden lg:flex lg:items-center lg:space-x-6" aria-label="Hauptnavigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-gray-700 transition-colors hover:text-[#003399] focus-visible:outline-2 focus-visible:outline-[#22C55E] focus-visible:outline-offset-2 rounded"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center space-x-4 lg:flex">
          <a 
            href="tel:+436644417977" 
            aria-label="Rufe uns an: 0664 441 7977"
            className="flex items-center text-sm font-medium text-gray-600 hover:text-[#003399] focus-visible:outline-2 focus-visible:outline-[#22C55E] focus-visible:outline-offset-2 rounded"
          >
            <Phone className="mr-1 h-4 w-4" aria-hidden="true" />
            0664 441 7977
          </a>
          <Button asChild className="bg-[#22C55E] font-bold hover:bg-[#16a34a]">
            <Link href="/contact">Jetzt Anmelden</Link>
          </Button>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="min-h-[44px] min-w-[44px]">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menü öffnen</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col space-y-6 pt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="min-h-[44px] flex items-center text-lg font-semibold text-gray-700 transition-colors hover:text-[#003399] focus-visible:outline-2 focus-visible:outline-[#22C55E] focus-visible:outline-offset-2 rounded px-2"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4">
                <Button asChild className="w-full min-h-[48px] bg-[#22C55E] font-bold hover:bg-[#16a34a]">
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    Jetzt Anmelden
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

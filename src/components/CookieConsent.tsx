"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Cookie } from "lucide-react";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up bg-[#003399] p-4 shadow-lg md:p-6"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-modal="true"
    >
      <div className="container mx-auto flex max-w-6xl flex-col items-center gap-4 md:flex-row md:justify-between">
        <div className="flex flex-1 items-start gap-4">
          <Cookie className="mt-1 h-6 w-6 shrink-0 text-[#22C55E] md:h-8 md:w-8" />
          <div className="flex-1 text-white">
            <h3 id="cookie-consent-title" className="mb-2 font-bold md:text-lg">
              Cookie-Einstellungen
            </h3>
            <p className="text-sm text-gray-200 md:text-base">
              Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten. 
              Durch die Nutzung unserer Website stimmen Sie der Verwendung von Cookies zu. 
              Weitere Informationen finden Sie in unserer{" "}
              <a
                href="/datenschutz"
                className="underline hover:text-[#22C55E]"
                target="_blank"
                rel="noopener noreferrer"
              >
                Datenschutzerklärung
              </a>
              .
            </p>
          </div>
        </div>
        <div className="flex w-full shrink-0 gap-3 md:w-auto md:flex-col">
          <Button
            onClick={acceptCookies}
            className="w-full bg-[#22C55E] font-bold hover:bg-[#16a34a] md:w-auto"
            aria-label="Cookies akzeptieren"
          >
            Akzeptieren
          </Button>
          <Button
            onClick={declineCookies}
            variant="outline"
            className="w-full border-white bg-transparent text-white hover:bg-white/10 md:w-auto"
            aria-label="Cookies ablehnen"
          >
            Ablehnen
          </Button>
        </div>
        <button
          onClick={declineCookies}
          className="absolute right-4 top-4 text-white hover:text-[#22C55E] md:relative md:right-0 md:top-0"
          aria-label="Cookie-Banner schließen"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

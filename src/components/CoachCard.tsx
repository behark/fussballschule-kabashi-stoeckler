"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";

interface CoachCardProps {
  name: string;
  role: string;
  bio: string;
  bioExtended?: string[];
  photoUrl: string;
}

export function CoachCard({ name, role, bio, bioExtended, photoUrl }: CoachCardProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <Card className="overflow-hidden border-0 shadow-lg">
        <div
          className="relative h-80 cursor-pointer"
          onClick={() => setLightboxOpen(true)}
        >
          <Image
            src={photoUrl}
            alt={`${name} - Trainer`}
            fill
            className="object-cover object-top transition-transform hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 transition-colors hover:bg-black/10" />
          <div className="absolute bottom-2 right-2 rounded-full bg-black/50 px-3 py-1 text-xs text-white opacity-0 transition-opacity hover:opacity-100 group-hover:opacity-100">
            Vollbild anzeigen
          </div>
        </div>
        <CardContent className="p-6">
          <h3 className="mb-1 text-2xl font-black text-[#003399]">{name}</h3>
          <p className="mb-4 font-semibold text-[#22C55E]">{role}</p>
          {bioExtended ? (
            <div className="space-y-3 text-gray-600">
              {bioExtended.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">{bio}</p>
          )}
        </CardContent>
      </Card>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${name} - Vollbild`}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            aria-label="Schließen"
          >
            <X className="h-6 w-6" />
          </button>
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photoUrl}
              alt={`${name} - Trainer`}
              width={1200}
              height={1600}
              className="max-h-[90vh] w-auto rounded-lg object-contain"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 rounded-b-lg bg-black/60 p-4 text-center text-white">
              <p className="text-lg font-bold">{name}</p>
              <p className="text-sm text-gray-300">{role}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

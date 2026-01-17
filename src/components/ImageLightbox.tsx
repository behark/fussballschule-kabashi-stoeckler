"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageLightboxProps {
  images: Array<{
    src: string;
    alt: string;
    title?: string;
  }>;
  initialIndex?: number;
  onClose: () => void;
}

export function ImageLightbox({ images, initialIndex = 0, onClose }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const currentImage = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Bildgalerie"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
        aria-label="Galerie schließen"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Previous Button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
          }}
          className="absolute left-4 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
          aria-label="Vorheriges Bild"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      {/* Image */}
      <div
        className="relative max-h-full max-w-7xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          width={1920}
          height={1080}
          className="max-h-[90vh] w-auto object-contain"
          priority
        />
        {currentImage.title && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 text-center text-white">
            <p className="font-semibold">{currentImage.title}</p>
          </div>
        )}
      </div>

      {/* Next Button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          className="absolute right-4 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
          aria-label="Nächstes Bild"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 text-sm text-white">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Thumbnail Navigation */}
      {images.length > 1 && images.length <= 10 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto pb-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded border-2 transition-all ${
                index === currentIndex
                  ? "border-[#22C55E] scale-110"
                  : "border-white/30 hover:border-white/60"
              }`}
              aria-label={`Bild ${index + 1} anzeigen`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

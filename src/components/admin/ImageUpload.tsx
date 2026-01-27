"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Upload, X } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label = "Bild" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type more strictly
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
      "image/avif",
    ];

    if (!allowedTypes.includes(file.type) && !file.type.startsWith("image/")) {
      setError("Nicht unterstütztes Format. Bitte verwenden Sie JPEG, PNG, GIF, WebP, AVIF oder SVG.");
      return;
    }

    // Validate file size (max 4MB due to Vercel serverless function limit)
    const maxSize = 4 * 1024 * 1024; // 4MB (Vercel limit is 4.5MB)
    if (file.size > maxSize) {
      setError(`Die Datei ist zu groß (max. ${Math.round(maxSize / 1024 / 1024)}MB). Bitte komprimieren Sie das Bild oder verwenden Sie ein kleineres Format.`);
      return;
    }

    // Additional validation: check if file is actually an image by reading first bytes
    const reader = new FileReader();
    reader.onload = async (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      const bytes = new Uint8Array(arrayBuffer.slice(0, 4));
      
      // Check magic numbers for common image formats
      const isValidImage = 
        // JPEG: FF D8 FF
        (bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF) ||
        // PNG: 89 50 4E 47
        (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47) ||
        // GIF: 47 49 46 38
        (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x38) ||
        // WebP: RIFF...WEBP
        (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46) ||
        // SVG: starts with <
        file.type === "image/svg+xml";
      
      if (!isValidImage && file.type !== "image/svg+xml") {
        setError("Die Datei scheint kein gültiges Bild zu sein. Bitte überprüfen Sie die Datei.");
        setUploading(false);
        return;
      }
      
      // Continue with upload
      await performUpload(file);
    };
    
    reader.onerror = () => {
      setError("Fehler beim Lesen der Datei. Bitte versuchen Sie es erneut.");
      setUploading(false);
    };
    
    reader.readAsArrayBuffer(file);
    return;
  };

  const performUpload = async (file: File) => {
    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Upload fehlgeschlagen" }));
        
        // Handle 413 (Payload Too Large) specifically
        if (response.status === 413) {
          throw new Error("Die Datei ist zu groß (max. 4MB). Bitte komprimieren Sie das Bild.");
        }
        
        throw new Error(errorData.error || "Upload fehlgeschlagen");
      }

      const { url } = await response.json();
      onChange(url);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Fehler beim Hochladen. Bitte versuchen Sie es erneut.";
      setError(errorMessage);
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">{label}</label>
      {value ? (
        <div className="relative inline-block">
          <div className="relative h-48 w-48 overflow-hidden rounded-lg border">
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute -right-2 -top-2 h-6 w-6 rounded-full p-0"
            onClick={() => onChange("")}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 hover:bg-gray-100">
            <Upload className="mb-2 h-8 w-8 text-gray-400" />
            <span className="text-sm text-gray-600">
              {uploading ? "Wird hochgeladen..." : "Bild auswählen"}
            </span>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
              className="hidden"
            />
          </label>
          {uploading && <Loader2 className="h-5 w-5 animate-spin text-gray-400" />}
        </div>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {value && (
        <p className="text-xs text-gray-500">
          Aktuelles Bild: <a href={value} target="_blank" rel="noopener noreferrer" className="underline">{value}</a>
        </p>
      )}
    </div>
  );
}

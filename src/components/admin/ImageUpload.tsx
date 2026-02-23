"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import { upload } from "@vercel/blob/client";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label = "Bild" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Bitte wählen Sie eine Bilddatei (JPEG, PNG, WebP, etc.).");
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("Die Datei ist zu groß (max. 10MB). Bitte komprimieren Sie das Bild.");
      return;
    }

    setUploading(true);
    setError(null);
    setProgress("Wird hochgeladen...");

    try {
      // Client upload - file goes directly to Blob storage (no 4.5MB limit)
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
      });

      onChange(blob.url);
      setProgress(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Fehler beim Hochladen.";
      setError(errorMessage);
      setProgress(null);
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
              {progress || (uploading ? "Wird hochgeladen..." : "Bild auswählen (max. 10MB)")}
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

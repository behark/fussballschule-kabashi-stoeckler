"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SaveButton } from "@/components/admin/SaveButton";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import type { GalleryImage } from "@/lib/content";

export default function GaleriePage() {
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const response = await fetch("/api/admin/content/gallery");
      if (response.ok) {
        const data = await response.json();
        setGallery(
          data.data || [
            { src: "/images/camp-group.jpg", alt: "Fußballcamp Gruppentraining", title: "Teamtraining" },
            { src: "/images/team-banner.jpg", alt: "Team mit KICKEN Banner", title: "Unsere Werte" },
            { src: "/images/training-kids.jpg", alt: "Kinder beim Training", title: "Nachwuchsförderung" },
            {
              src: "/images/partnership.jpg",
              alt: "Partnerschaft mit ASKÖ Kirchdorf",
              title: "Partnerschaft mit ASKÖ Kirchdorf",
            },
            { src: "/images/trainer-team.jpg", alt: "Unser Trainerteam", title: "Unser Trainerteam" },
          ]
        );
      }
    } catch (error) {
      console.error("Error loading content:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async () => {
    await fetch("/api/admin/content/gallery", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: gallery }),
    });
  };

  const addImage = () => {
    setGallery([
      ...gallery,
      {
        src: "",
        alt: "",
        title: "",
      },
    ]);
  };

  const removeImage = (index: number) => {
    setGallery(gallery.filter((_, i) => i !== index));
  };

  if (loading) {
    return <div>Lädt...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-[#003399]">Galerie bearbeiten</h1>
        <Button onClick={addImage} className="bg-[#22C55E] hover:bg-[#16a34a]">
          <Plus className="mr-2 h-4 w-4" />
          Bild hinzufügen
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {gallery.map((image, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Bild {index + 1}</CardTitle>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeImage(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {image.src && (
                <div className="relative h-48 w-full overflow-hidden rounded-lg border">
                  <Image
                    src={image.src}
                    alt={image.alt || "Preview"}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <ImageUpload
                value={image.src}
                onChange={(url) => {
                  const newGallery = [...gallery];
                  newGallery[index].src = url;
                  setGallery(newGallery);
                }}
                label="Bild"
              />
              <div>
                <label className="mb-1 block text-sm font-medium">Titel</label>
                <Input
                  value={image.title}
                  onChange={(e) => {
                    const newGallery = [...gallery];
                    newGallery[index].title = e.target.value;
                    setGallery(newGallery);
                  }}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Alt-Text</label>
                <Input
                  value={image.alt}
                  onChange={(e) => {
                    const newGallery = [...gallery];
                    newGallery[index].alt = e.target.value;
                    setGallery(newGallery);
                  }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <SaveButton onSave={saveContent} />
    </div>
  );
}

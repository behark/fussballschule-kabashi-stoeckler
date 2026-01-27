"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SaveButton } from "@/components/admin/SaveButton";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Plus, Trash2 } from "lucide-react";
import type { CoachContent } from "@/lib/content";

export default function TrainerPage() {
  const [coaches, setCoaches] = useState<CoachContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const response = await fetch("/api/admin/content/coaches");
      if (response.ok) {
        const data = await response.json();
        setCoaches(
          data.data || [
            {
              name: "ALBERT KABASHI",
              role: "Co-Founder & Cheftrainer",
              bio: "Mit jahrelanger Erfahrung im Fußball bringt Albert technisches Know-how und echte Leidenschaft für die Entwicklung junger Spieler mit. Sein Fokus liegt auf der individuellen Förderung und dem Aufbau von Selbstvertrauen bei jedem Kind.",
              photoUrl: "/images/trainer-albert.jpg",
            },
            {
              name: "JONAS STÖCKLER",
              role: "Co-Founder & Trainer",
              bio: "Jonas kombiniert moderne Trainingsmethoden mit traditionellem Fußball-Know-how. Seine Stärke liegt in der Koordinations- und Athletikschulung sowie der Vermittlung von Spielintelligenz auf spielerische Art und Weise.",
              photoUrl: "/images/trainer-jonas.jpg",
            },
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
    await fetch("/api/admin/content/coaches", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: coaches }),
    });
  };

  const addCoach = () => {
    setCoaches([
      ...coaches,
      {
        name: "",
        role: "",
        bio: "",
        photoUrl: "",
      },
    ]);
  };

  const removeCoach = (index: number) => {
    setCoaches(coaches.filter((_, i) => i !== index));
  };

  if (loading) {
    return <div>Lädt...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-[#003399]">Trainer bearbeiten</h1>
        <Button onClick={addCoach} className="bg-[#22C55E] hover:bg-[#16a34a]">
          <Plus className="mr-2 h-4 w-4" />
          Trainer hinzufügen
        </Button>
      </div>

      <div className="space-y-6">
        {coaches.map((coach, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Trainer {index + 1}</CardTitle>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeCoach(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Name</label>
                <Input
                  value={coach.name}
                  onChange={(e) => {
                    const newCoaches = [...coaches];
                    newCoaches[index].name = e.target.value;
                    setCoaches(newCoaches);
                  }}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Rolle</label>
                <Input
                  value={coach.role}
                  onChange={(e) => {
                    const newCoaches = [...coaches];
                    newCoaches[index].role = e.target.value;
                    setCoaches(newCoaches);
                  }}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Biografie</label>
                <Textarea
                  value={coach.bio}
                  onChange={(e) => {
                    const newCoaches = [...coaches];
                    newCoaches[index].bio = e.target.value;
                    setCoaches(newCoaches);
                  }}
                  rows={4}
                />
              </div>
              <ImageUpload
                value={coach.photoUrl}
                onChange={(url) => {
                  const newCoaches = [...coaches];
                  newCoaches[index].photoUrl = url;
                  setCoaches(newCoaches);
                }}
                label="Trainer-Foto"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <SaveButton onSave={saveContent} />
    </div>
  );
}

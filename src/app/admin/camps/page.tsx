"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SaveButton } from "@/components/admin/SaveButton";
import { Plus, Trash2 } from "lucide-react";
import type { CampContent } from "@/lib/content";

export default function CampsPage() {
  const [camps, setCamps] = useState<CampContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const response = await fetch("/api/admin/content/camps");
      if (response.ok) {
        const data = await response.json();
        setCamps(
          data.data || [
            {
              id: "october2024",
              name: "OKTOBER BOOTCAMP",
              dates: "2024-10-27,2024-10-28",
              formattedDates: "27.-28. Oktober 2024",
              time: "09:00 - 12:00 Uhr",
              location: "ASKÖ Kirchdorf Fußballplatz",
              address: "Ertlstraße 16, 4560 Kirchdorf/Krems",
              price: "€50",
              ageGroup: "6-16 Jahre",
              schedule: [],
              included: [],
              bring: [],
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
    await fetch("/api/admin/content/camps", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: camps }),
    });
  };

  const addCamp = () => {
    setCamps([
      ...camps,
      {
        id: `camp-${Date.now()}`,
        name: "",
        dates: "",
        formattedDates: "",
        time: "",
        location: "",
        address: "",
        price: "",
        ageGroup: "",
        schedule: [],
        included: [],
        bring: [],
      },
    ]);
  };

  const removeCamp = (index: number) => {
    setCamps(camps.filter((_, i) => i !== index));
  };

  if (loading) {
    return <div>Lädt...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-[#003399]">Camps bearbeiten</h1>
        <Button onClick={addCamp} className="bg-[#22C55E] hover:bg-[#16a34a]">
          <Plus className="mr-2 h-4 w-4" />
          Camp hinzufügen
        </Button>
      </div>

      <div className="space-y-6">
        {camps.map((camp, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{camp.name || `Camp ${index + 1}`}</CardTitle>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeCamp(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Name</label>
                  <Input
                    value={camp.name}
                    onChange={(e) => {
                      const newCamps = [...camps];
                      newCamps[index].name = e.target.value;
                      setCamps(newCamps);
                    }}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Formatiertes Datum</label>
                  <Input
                    value={camp.formattedDates}
                    onChange={(e) => {
                      const newCamps = [...camps];
                      newCamps[index].formattedDates = e.target.value;
                      setCamps(newCamps);
                    }}
                    placeholder="z.B. 27.-28. Oktober 2024"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Datum (ISO)</label>
                  <Input
                    value={camp.dates}
                    onChange={(e) => {
                      const newCamps = [...camps];
                      newCamps[index].dates = e.target.value;
                      setCamps(newCamps);
                    }}
                    placeholder="2024-10-27,2024-10-28"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Zeit</label>
                  <Input
                    value={camp.time}
                    onChange={(e) => {
                      const newCamps = [...camps];
                      newCamps[index].time = e.target.value;
                      setCamps(newCamps);
                    }}
                    placeholder="09:00 - 12:00 Uhr"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Ort</label>
                  <Input
                    value={camp.location}
                    onChange={(e) => {
                      const newCamps = [...camps];
                      newCamps[index].location = e.target.value;
                      setCamps(newCamps);
                    }}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Adresse</label>
                  <Input
                    value={camp.address}
                    onChange={(e) => {
                      const newCamps = [...camps];
                      newCamps[index].address = e.target.value;
                      setCamps(newCamps);
                    }}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Preis</label>
                  <Input
                    value={camp.price}
                    onChange={(e) => {
                      const newCamps = [...camps];
                      newCamps[index].price = e.target.value;
                      setCamps(newCamps);
                    }}
                    placeholder="€50"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Altersgruppe</label>
                  <Input
                    value={camp.ageGroup}
                    onChange={(e) => {
                      const newCamps = [...camps];
                      newCamps[index].ageGroup = e.target.value;
                      setCamps(newCamps);
                    }}
                    placeholder="6-16 Jahre"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Inkludiert (eine pro Zeile)</label>
                <Textarea
                  value={camp.included.join("\n")}
                  onChange={(e) => {
                    const newCamps = [...camps];
                    newCamps[index].included = e.target.value.split("\n").filter(Boolean);
                    setCamps(newCamps);
                  }}
                  rows={5}
                  placeholder="Professionelles Training..."
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Mitbringen (eine pro Zeile)</label>
                <Textarea
                  value={camp.bring.join("\n")}
                  onChange={(e) => {
                    const newCamps = [...camps];
                    newCamps[index].bring = e.target.value.split("\n").filter(Boolean);
                    setCamps(newCamps);
                  }}
                  rows={5}
                  placeholder="Fußballschuhe..."
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

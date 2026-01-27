"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SaveButton } from "@/components/admin/SaveButton";
import { Plus, Trash2 } from "lucide-react";
import type { ContactContent, FAQContent } from "@/lib/content";

export default function KontaktPage() {
  const [contact, setContact] = useState<ContactContent | null>(null);
  const [faq, setFaq] = useState<FAQContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const [contactRes, faqRes] = await Promise.all([
        fetch("/api/admin/content/contact"),
        fetch("/api/admin/content/faq"),
      ]);

      if (contactRes.ok) {
        const data = await contactRes.json();
        setContact(
          data.data || {
            phone: "+43 664 441 7977",
            email: "jonas.stoeckler@gmx.at",
            whatsapp: "https://wa.me/436644417977",
            address: "Ertlstraße 16, 4560 Kirchdorf/Krems",
            hours: "Mo-Fr: 09:00 - 18:00 Uhr",
            bookingUrl: "https://cal.com/kabashi-jwghfq/30min",
          }
        );
      }

      if (faqRes.ok) {
        const data = await faqRes.json();
        setFaq(
          data.data || [
            {
              question: "Wie erfolgt die Bezahlung?",
              answer: "Die Bezahlung erfolgt per Überweisung nach Bestätigung. Details erhalten Sie per E-Mail.",
            },
            {
              question: "Kann ich kurzfristig anmelden?",
              answer: "Ja, solange Plätze verfügbar sind nehmen wir gerne auch kurzfristige Anmeldungen an.",
            },
            {
              question: "Was bei schlechtem Wetter?",
              answer: "Das Training findet bei fast jedem Wetter statt. Bei extremen Bedingungen informieren wir Sie.",
            },
            {
              question: "Muss mein Kind im Verein sein?",
              answer: "Nein, unser Bootcamp ist für alle Kinder von 6-16 Jahren offen.",
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

  const saveContact = async () => {
    if (!contact) return;
    await fetch("/api/admin/content/contact", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: contact }),
    });
  };

  const saveFAQ = async () => {
    await fetch("/api/admin/content/faq", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: faq }),
    });
  };

  const addFAQ = () => {
    setFaq([
      ...faq,
      {
        question: "",
        answer: "",
      },
    ]);
  };

  const removeFAQ = (index: number) => {
    setFaq(faq.filter((_, i) => i !== index));
  };

  if (loading) {
    return <div>Lädt...</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-black text-[#003399]">Kontakt & FAQ bearbeiten</h1>

      {/* Contact Section */}
      <Card>
        <CardHeader>
          <CardTitle>Kontaktdaten</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Telefon</label>
              <Input
                value={contact?.phone || ""}
                onChange={(e) => setContact({ ...contact!, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">E-Mail</label>
              <Input
                type="email"
                value={contact?.email || ""}
                onChange={(e) => setContact({ ...contact!, email: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">WhatsApp URL</label>
              <Input
                value={contact?.whatsapp || ""}
                onChange={(e) => setContact({ ...contact!, whatsapp: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Buchungs-URL</label>
              <Input
                value={contact?.bookingUrl || ""}
                onChange={(e) => setContact({ ...contact!, bookingUrl: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Adresse</label>
              <Input
                value={contact?.address || ""}
                onChange={(e) => setContact({ ...contact!, address: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Erreichbarkeit</label>
              <Input
                value={contact?.hours || ""}
                onChange={(e) => setContact({ ...contact!, hours: e.target.value })}
              />
            </div>
          </div>
          <SaveButton onSave={saveContact} />
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Häufige Fragen (FAQ)</CardTitle>
            <Button onClick={addFAQ} className="bg-[#22C55E] hover:bg-[#16a34a]">
              <Plus className="mr-2 h-4 w-4" />
              Frage hinzufügen
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {faq.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Frage {index + 1}</CardTitle>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeFAQ(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Frage</label>
                  <Input
                    value={item.question}
                    onChange={(e) => {
                      const newFAQ = [...faq];
                      newFAQ[index].question = e.target.value;
                      setFaq(newFAQ);
                    }}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Antwort</label>
                  <Textarea
                    value={item.answer}
                    onChange={(e) => {
                      const newFAQ = [...faq];
                      newFAQ[index].answer = e.target.value;
                      setFaq(newFAQ);
                    }}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          <SaveButton onSave={saveFAQ} />
        </CardContent>
      </Card>
    </div>
  );
}

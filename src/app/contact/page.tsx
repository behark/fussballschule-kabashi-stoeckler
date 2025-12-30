"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MapPin, Mail, Phone, Clock, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("success");
  };

  return (
    <>
      {/* Hero */}
      <section className="gradient-hero py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-[#22C55E] hover:bg-[#22C55E]">Kontakt & Anmeldung</Badge>
          <h1 className="mb-4 text-4xl font-black sm:text-5xl md:text-6xl">
            JETZT ANMELDEN
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Sichere dir deinen Platz beim Performance Bootcamp oder kontaktiere uns bei Fragen.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
            {/* Registration Form */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-[#003399] text-white">
                <CardTitle className="text-xl font-bold">Anmeldung zum Bootcamp</CardTitle>
                <p className="text-sm text-gray-300">27.-28. Oktober 2024 | €50</p>
              </CardHeader>
              <CardContent className="p-6">
                {formStatus === "success" ? (
                  <div className="py-8 text-center">
                    <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-[#22C55E]" />
                    <h3 className="mb-2 text-xl font-bold text-[#003399]">Vielen Dank!</h3>
                    <p className="text-gray-600">
                      Ihre Anmeldung wurde erfolgreich übermittelt. Wir werden uns in Kürze bei Ihnen melden.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="rounded-lg bg-gray-50 p-4">
                      <p className="mb-2 text-sm font-semibold text-[#003399]">Hinweis für Eltern:</p>
                      <p className="text-sm text-gray-600">
                        Bitte füllen Sie das Formular als Erziehungsberechtigte/r aus. 
                        Wir werden Sie über alle Details per E-Mail informieren.
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm font-medium">
                          Name des Kindes <span className="text-red-500">*</span>
                        </label>
                        <Input required placeholder="Vorname Nachname" />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium">
                          Alter <span className="text-red-500">*</span>
                        </label>
                        <Input required type="number" min="6" max="16" placeholder="z.B. 10" />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Name der Eltern / Erziehungsberechtigten <span className="text-red-500">*</span>
                      </label>
                      <Input required placeholder="Ihr vollständiger Name" />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm font-medium">
                          E-Mail <span className="text-red-500">*</span>
                        </label>
                        <Input required type="email" placeholder="ihre@email.at" />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium">
                          Telefon <span className="text-red-500">*</span>
                        </label>
                        <Input required type="tel" placeholder="0699 123 45 67" />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Verein / Mannschaft (optional)
                      </label>
                      <Input placeholder="z.B. SK Sturm Graz U11" />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Nachricht / Besondere Hinweise (optional)
                      </label>
                      <Textarea 
                        placeholder="Allergien, besondere Bedürfnisse, Fragen..."
                        rows={3}
                      />
                    </div>

                    <div className="flex items-start gap-2">
                      <input
                        required
                        type="checkbox"
                        id="privacy"
                        className="mt-1"
                      />
                      <label htmlFor="privacy" className="text-sm text-gray-600">
                        Ich habe die{" "}
                        <a href="/datenschutz" className="text-[#003399] underline">
                          Datenschutzerklärung
                        </a>{" "}
                        gelesen und stimme der Verarbeitung meiner Daten zu. <span className="text-red-500">*</span>
                      </label>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-[#22C55E] text-lg font-bold hover:bg-[#16a34a]"
                    >
                      <Send className="mr-2 h-5 w-5" />
                      Anmeldung absenden
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-[#003399]">Kontaktdaten</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-[#003399] p-3">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Trainingsort</p>
                      <p className="text-gray-600">ASKÖ Kirchdorf Fußballplatz</p>
                      <p className="text-gray-600">Ertlstraße 16</p>
                      <p className="text-gray-600">4560 Kirchdorf an der Krems</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-[#003399] p-3">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">E-Mail</p>
                      <a 
                        href="mailto:jonas.stoeckler@gmx.at" 
                        className="text-[#003399] hover:underline"
                      >
                        jonas.stoeckler@gmx.at
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-[#003399] p-3">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Telefon</p>
                      <a 
                        href="tel:069911798410" 
                        className="text-[#003399] hover:underline"
                      >
                        0699 117 984 10
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-[#003399] p-3">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Erreichbarkeit</p>
                      <p className="text-gray-600">Mo-Fr: 09:00 - 18:00 Uhr</p>
                      <p className="text-gray-600">Sa-So: Nach Vereinbarung</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="relative h-64 bg-gradient-to-br from-[#003399]/10 to-[#22C55E]/10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="mx-auto h-12 w-12 text-[#003399]" />
                      <p className="mt-2 font-bold text-gray-700">Karten-Platzhalter</p>
                      <p className="text-sm text-gray-500">Google Maps Integration</p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <a
                    href="https://maps.google.com/?q=Ertlstraße+16,+4560+Kirchdorf+an+der+Krems"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center text-sm text-[#003399] hover:underline"
                  >
                    In Google Maps öffnen →
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-black text-[#003399]">
            HÄUFIGE FRAGEN
          </h2>

          <div className="mx-auto max-w-3xl space-y-4">
            {[
              {
                q: "Wie erfolgt die Bezahlung?",
                a: "Die Bezahlung erfolgt per Überweisung nach Bestätigung der Anmeldung. Details erhalten Sie per E-Mail.",
              },
              {
                q: "Kann ich mein Kind auch kurzfristig anmelden?",
                a: "Solange Plätze verfügbar sind, nehmen wir gerne auch kurzfristige Anmeldungen an.",
              },
              {
                q: "Was passiert bei schlechtem Wetter?",
                a: "Das Training findet bei fast jedem Wetter statt. Bei extremen Bedingungen informieren wir Sie rechtzeitig.",
              },
              {
                q: "Muss mein Kind Vereinsspieler sein?",
                a: "Nein, unser Bootcamp ist für alle Kinder von 6-16 Jahren offen, unabhängig von Vereinszugehörigkeit.",
              },
            ].map((faq, i) => (
              <Card key={i} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h3 className="mb-2 font-bold text-[#003399]">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

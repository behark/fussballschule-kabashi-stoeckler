"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MapPin, Mail, Phone, Clock, Send, CheckCircle2, Loader2, MessageCircle, Calendar } from "lucide-react";

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    childName: "",
    childAge: "",
    name: "",
    email: "",
    phone: "",
    club: "",
    message: "",
    camp: "Performance Bootcamp Oktober 2024",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus("success");
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

      {/* Quick Contact Buttons */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/43699117984100?text=Hallo!%20Ich%20interessiere%20mich%20für%20das%20Fußballcamp."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-bold text-white transition-transform hover:scale-105"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp schreiben
            </a>
            <a
              href="mailto:jonas.stoeckler@gmx.at?subject=Anfrage%20Fussballschule"
              className="flex items-center gap-2 rounded-full bg-[#003399] px-6 py-3 font-bold text-white transition-transform hover:scale-105"
            >
              <Mail className="h-5 w-5" />
              E-Mail senden
            </a>
            <a
              href="tel:+43699117984100"
              className="flex items-center gap-2 rounded-full bg-[#22C55E] px-6 py-3 font-bold text-white transition-transform hover:scale-105"
            >
              <Phone className="h-5 w-5" />
              Jetzt anrufen
            </a>
          </div>
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
                <p className="text-sm text-gray-300">Wähle dein Camp und melde dich an!</p>
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
                    {formStatus === "error" && (
                      <div className="rounded-lg bg-red-50 p-4 text-red-700">
                        Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.
                      </div>
                    )}

                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Gewünschtes Camp <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="camp"
                        value={formData.camp}
                        onChange={handleChange}
                        required
                        className="w-full rounded-md border border-gray-300 p-2 focus:border-[#003399] focus:outline-none focus:ring-1 focus:ring-[#003399]"
                      >
                        <option value="Performance Bootcamp Oktober 2024">Performance Bootcamp - 27.-28. Okt 2024 (€50)</option>
                        <option value="Sommer Camp Juli 2025">Sommer Camp - 21.-24. Juli 2025 (€150)</option>
                        <option value="Individuelles Training">Individuelles Training</option>
                        <option value="Allgemeine Anfrage">Allgemeine Anfrage</option>
                      </select>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm font-medium">
                          Name des Kindes <span className="text-red-500">*</span>
                        </label>
                        <Input
                          name="childName"
                          value={formData.childName}
                          onChange={handleChange}
                          required
                          placeholder="Vorname Nachname"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium">
                          Alter <span className="text-red-500">*</span>
                        </label>
                        <Input
                          name="childAge"
                          value={formData.childAge}
                          onChange={handleChange}
                          required
                          type="number"
                          min="6"
                          max="16"
                          placeholder="z.B. 10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Name der Eltern <span className="text-red-500">*</span>
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Ihr vollständiger Name"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm font-medium">
                          E-Mail <span className="text-red-500">*</span>
                        </label>
                        <Input
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          type="email"
                          placeholder="ihre@email.at"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium">
                          Telefon <span className="text-red-500">*</span>
                        </label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          type="tel"
                          placeholder="0699 123 45 67"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Verein / Mannschaft (optional)
                      </label>
                      <Input
                        name="club"
                        value={formData.club}
                        onChange={handleChange}
                        placeholder="z.B. ASKÖ Kirchdorf U11"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Nachricht (optional)
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Allergien, besondere Bedürfnisse, Fragen..."
                        rows={3}
                      />
                    </div>

                    <div className="flex items-start gap-2">
                      <input required type="checkbox" id="privacy" className="mt-1" />
                      <label htmlFor="privacy" className="text-sm text-gray-600">
                        Ich habe die{" "}
                        <a href="/datenschutz" className="text-[#003399] underline">
                          Datenschutzerklärung
                        </a>{" "}
                        gelesen und stimme zu. <span className="text-red-500">*</span>
                      </label>
                    </div>

                    <Button
                      type="submit"
                      disabled={formStatus === "loading"}
                      className="w-full bg-[#22C55E] text-lg font-bold hover:bg-[#16a34a] disabled:opacity-50"
                    >
                      {formStatus === "loading" ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Wird gesendet...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Anmeldung absenden
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              {/* Booking Calendar */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-[#22C55E] text-white">
                  <CardTitle className="flex items-center gap-2 text-xl font-bold">
                    <Calendar className="h-5 w-5" />
                    Termin vereinbaren
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="mb-4 text-gray-600">
                    Buche einen kostenlosen Beratungstermin oder ein Probetraining:
                  </p>
                  <a
                    href="https://cal.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg bg-[#003399] p-4 text-center font-bold text-white transition-colors hover:bg-[#001a4d]"
                  >
                    Termin online buchen →
                  </a>
                  <p className="mt-3 text-center text-sm text-gray-500">
                    Oder ruf uns einfach an: 0699 117 984 10
                  </p>
                </CardContent>
              </Card>

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
                      <p className="text-gray-600">Ertlstraße 16, 4560 Kirchdorf/Krems</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-[#25D366] p-3">
                      <MessageCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">WhatsApp</p>
                      <a
                        href="https://wa.me/43699117984100"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#25D366] hover:underline"
                      >
                        Direkt chatten →
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-[#003399] p-3">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">E-Mail</p>
                      <a href="mailto:jonas.stoeckler@gmx.at" className="text-[#003399] hover:underline">
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
                      <a href="tel:+43699117984100" className="text-[#003399] hover:underline">
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
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Google Maps */}
              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="relative h-48">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2679.5!2d14.1231!3d47.9056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4773a1a1a1a1a1a1%3A0x1234567890!2sErtlstra%C3%9Fe%2016%2C%204560%20Kirchdorf%20an%20der%20Krems!5e0!3m2!1sde!2sat!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
                <CardContent className="p-4">
                  <a
                    href="https://maps.google.com/?q=Ertlstraße+16,+4560+Kirchdorf+an+der+Krems"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center text-sm text-[#003399] hover:underline"
                  >
                    Route in Google Maps öffnen →
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
          <h2 className="mb-8 text-center text-3xl font-black text-[#003399]">HÄUFIGE FRAGEN</h2>
          <div className="mx-auto max-w-3xl space-y-4">
            {[
              { q: "Wie erfolgt die Bezahlung?", a: "Die Bezahlung erfolgt per Überweisung nach Bestätigung. Details erhalten Sie per E-Mail." },
              { q: "Kann ich kurzfristig anmelden?", a: "Ja, solange Plätze verfügbar sind nehmen wir gerne auch kurzfristige Anmeldungen an." },
              { q: "Was bei schlechtem Wetter?", a: "Das Training findet bei fast jedem Wetter statt. Bei extremen Bedingungen informieren wir Sie." },
              { q: "Muss mein Kind im Verein sein?", a: "Nein, unser Bootcamp ist für alle Kinder von 6-16 Jahren offen." },
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

"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Mail, Phone, Clock, MessageCircle, Calendar } from "lucide-react";
import type { ContactContent, FAQContent } from "@/lib/content";

export default function ContactPage() {
  const [contact, setContact] = useState<ContactContent | null>(null);
  const [faq, setFaq] = useState<FAQContent[]>([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/content/contact").then(r => r.ok ? r.json() : null).then(d => d?.data),
      fetch("/api/content/faq").then(r => r.ok ? r.json() : null).then(d => d?.data),
    ]).then(([contactData, faqData]) => {
      setContact(contactData || {
        phone: "+43 664 441 7977",
        email: "jonas.stoeckler@gmx.at",
        whatsapp: "https://wa.me/436644417977",
        address: "Ertlstraße 16, 4560 Kirchdorf/Krems",
        hours: "Mo-Fr: 09:00 - 18:00 Uhr",
        bookingUrl: "https://cal.com/kabashi-jwghfq/30min",
      });
      setFaq(faqData || [
        { question: "Wie erfolgt die Bezahlung?", answer: "Die Bezahlung erfolgt per Überweisung nach Bestätigung. Details erhalten Sie per E-Mail." },
        { question: "Kann ich kurzfristig anmelden?", answer: "Ja, solange Plätze verfügbar sind nehmen wir gerne auch kurzfristige Anmeldungen an." },
        { question: "Was bei schlechtem Wetter?", answer: "Das Training findet bei fast jedem Wetter statt. Bei extremen Bedingungen informieren wir Sie." },
        { question: "Muss mein Kind im Verein sein?", answer: "Nein, unser Bootcamp ist für alle Kinder von 6-16 Jahren offen." },
      ]);
    }).catch(err => {
      console.error("Error loading content:", err);
      setContact({
        phone: "+43 664 441 7977",
        email: "jonas.stoeckler@gmx.at",
        whatsapp: "https://wa.me/436644417977",
        address: "Ertlstraße 16, 4560 Kirchdorf/Krems",
        hours: "Mo-Fr: 09:00 - 18:00 Uhr",
        bookingUrl: "https://cal.com/kabashi-jwghfq/30min",
      });
      setFaq([
        { question: "Wie erfolgt die Bezahlung?", answer: "Die Bezahlung erfolgt per Überweisung nach Bestätigung. Details erhalten Sie per E-Mail." },
        { question: "Kann ich kurzfristig anmelden?", answer: "Ja, solange Plätze verfügbar sind nehmen wir gerne auch kurzfristige Anmeldungen an." },
        { question: "Was bei schlechtem Wetter?", answer: "Das Training findet bei fast jedem Wetter statt. Bei extremen Bedingungen informieren wir Sie." },
        { question: "Muss mein Kind im Verein sein?", answer: "Nein, unser Bootcamp ist für alle Kinder von 6-16 Jahren offen." },
      ]);
    });
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="gradient-hero py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-[#22C55E] hover:bg-[#22C55E]">Kontakt</Badge>
          <h1 className="mb-4 text-4xl font-black sm:text-5xl md:text-6xl">
            KONTAKTIERE UNS
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Hast du Fragen zu unseren Camps oder möchtest mehr erfahren? Wir sind für dich da!
          </p>
        </div>
      </section>

      {/* Quick Contact Buttons */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {contact && (
              <>
                <a
                  href={`${contact.whatsapp}?text=Hallo!%20Ich%20interessiere%20mich%20für%20das%20Fußballcamp.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[48px] items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-bold text-white transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                  aria-label="WhatsApp schreiben"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp schreiben
                </a>
                <a
                  href={`mailto:${contact.email}?subject=Anfrage%20Fussballschule`}
                  className="flex min-h-[48px] items-center gap-2 rounded-full bg-[#003399] px-6 py-3 font-bold text-white transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                  aria-label="E-Mail senden"
                >
                  <Mail className="h-5 w-5" />
                  E-Mail senden
                </a>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="flex min-h-[48px] items-center gap-2 rounded-full bg-[#22C55E] px-6 py-3 font-bold text-white transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                  aria-label="Jetzt anrufen"
                >
                  <Phone className="h-5 w-5" />
                  Jetzt anrufen
                </a>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
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
                {contact && (
                  <>
                    <a
                      href={contact.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-lg bg-[#003399] p-4 text-center font-bold text-white transition-colors hover:bg-[#001a4d]"
                    >
                      Termin online buchen →
                    </a>
                    <p className="mt-3 text-center text-sm text-gray-500">
                      Oder ruf uns einfach an: {contact.phone}
                    </p>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Contact Details */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#003399]">Kontaktdaten</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-[#003399] p-3">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  {contact && (
                    <div>
                      <p className="font-semibold">Trainingsort</p>
                      <p className="text-gray-600">{contact.address}</p>
                    </div>
                  )}
                </div>

                {contact && (
                  <>
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-[#25D366] p-3">
                        <MessageCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold">WhatsApp</p>
                        <a
                          href={contact.whatsapp}
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
                        <a href={`mailto:${contact.email}`} className="text-[#003399] hover:underline">
                          {contact.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-[#003399] p-3">
                        <Phone className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold">Telefon</p>
                        <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="text-[#003399] hover:underline">
                          {contact.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-[#003399] p-3">
                        <Clock className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold">Erreichbarkeit</p>
                        <p className="text-gray-600">{contact.hours}</p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Google Maps - full width */}
            <Card className="overflow-hidden border-0 shadow-lg lg:col-span-2">
              <div className="relative h-64">
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
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-black text-[#003399]">HÄUFIGE FRAGEN</h2>
          <div className="mx-auto max-w-3xl space-y-4">
            {faq.map((item, i) => (
              <Card key={i} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h3 className="mb-2 font-bold text-[#003399]">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

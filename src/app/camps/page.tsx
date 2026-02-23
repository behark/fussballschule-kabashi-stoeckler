import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, CheckCircle2, ArrowRight, Star, MessageCircle } from "lucide-react";
import { campDates } from "@/lib/dates";
import { getCampsContent } from "@/lib/content";

export const metadata = {
  title: "Camps & Training | Kabashi-Stöckler Fussballschule",
  description: "Performance Bootcamp in Kirchdorf. Professionelles Fußballtraining für Kinder von 6-16 Jahren.",
};

export default async function CampsPage() {
  const camps = await getCampsContent();
  const mainCamp = camps[0] || null;
  return (
    <>
      {/* Hero with Background Image */}
      <section className="relative py-20 text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/training-kids.jpg"
            alt="Kinder beim Fußballtraining"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#003399]/90 to-[#001a4d]/95" />
        </div>
        <div className="container relative mx-auto px-4 text-center">
          <Badge className="mb-4 bg-[#22C55E] hover:bg-[#22C55E]">Camps & Training</Badge>
          <h1 className="mb-4 text-4xl font-black sm:text-5xl md:text-6xl">
            PERFORMANCE BOOTCAMP
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Intensives Fußballtraining mit Fokus auf Technik, Koordination und Power. 
            Für alle jungen Spieler, die besser werden wollen.
          </p>
        </div>
      </section>

      {/* Main Camp Card */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            {/* Match Card Style */}
            <Card className="overflow-hidden border-0 shadow-2xl">
              <div className="bg-[#003399] p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Star className="h-6 w-6 text-[#22C55E]" />
                    <span className="text-sm font-semibold uppercase tracking-wider">Nächstes Event</span>
                  </div>
                  <Badge className="bg-[#22C55E] font-bold">Nächstes Camp</Badge>
                </div>
              </div>
              
              <CardContent className="p-0">
                {/* Main Info Grid */}
                <div className="grid lg:grid-cols-2">
                  {/* Left - Event Details */}
                  {mainCamp && (
                    <>
                      <div className="border-b p-8 lg:border-b-0 lg:border-r">
                        <h2 className="mb-6 text-3xl font-black text-[#003399]">
                          {mainCamp.name}
                        </h2>
                        
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-4">
                            <div className="rounded-full bg-[#003399] p-3">
                              <Calendar className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Datum</p>
                              <p className="text-xl font-bold text-[#003399]">{mainCamp.formattedDates}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-4">
                            <div className="rounded-full bg-[#003399] p-3">
                              <Clock className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Trainingszeit</p>
                              <p className="text-xl font-bold text-[#003399]">{mainCamp.time}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-4">
                            <div className="rounded-full bg-[#003399] p-3">
                              <MapPin className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Ort</p>
                              <p className="font-bold text-[#003399]">{mainCamp.location}</p>
                              <p className="text-sm text-gray-600">{mainCamp.address}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right - Pricing & Registration */}
                      <div className="flex flex-col justify-between bg-gray-50 p-8">
                        <div>
                          <div className="mb-6 text-center">
                            <p className="text-sm text-gray-500">Teilnahmegebühr</p>
                            <p className="text-5xl font-black text-[#22C55E]">{mainCamp.price}</p>
                            <p className="text-sm text-gray-500">für beide Tage</p>
                          </div>
                          
                          <div className="mb-6 flex items-center justify-center gap-4 rounded-lg bg-white p-4">
                            <Users className="h-8 w-8 text-[#003399]" />
                            <div className="text-center">
                              <p className="text-sm text-gray-500">Altersgruppe</p>
                              <p className="text-2xl font-bold text-[#003399]">{mainCamp.ageGroup}</p>
                            </div>
                          </div>
                        </div>
                        
                        <a
                          href="https://wa.me/436644417977?text=Hallo!%20Ich%20interessiere%20mich%20für%20das%20Fußballcamp."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 text-lg font-bold text-white transition-colors hover:bg-[#1fb855]"
                        >
                          <MessageCircle className="h-5 w-5" />
                          Bei Interesse melden
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Upcoming Camp - July 2025 */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-black text-[#003399]">SOMMER CAMP 2025</h2>
          <div className="mx-auto max-w-md">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/images/camp-flyer.jpg"
                alt="Kabashi-Stöckler Fußballcamp 21.-24. Juli 2025"
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-6 text-center">
              <Badge className="mb-4 bg-[#22C55E] text-lg font-bold">21.-24. Juli 2025 - 4 Tage</Badge>
              <p className="mb-4 text-gray-600">
                4 Tage intensives Training mit Mittagessen, Obst & Getränke inklusive!
              </p>
              <a
                href="https://wa.me/436644417977?text=Hallo!%20Ich%20interessiere%20mich%20für%20das%20Sommer%20Camp%202025."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 font-bold text-white transition-colors hover:bg-[#1fb855]"
              >
                <MessageCircle className="h-5 w-5" />
                Bei Interesse melden
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Table */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-black text-[#003399]">TAGESABLAUF</h2>
          
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Day 1 */}
              <Card className="border-t-4 border-t-[#003399]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[#003399]">
                    <Calendar className="h-5 w-5" />
                    Tag 1 - Sonntag, 27. Oktober
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">08:45</span>
                      <span className="text-gray-600">Ankunft & Check-in</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">09:00</span>
                      <span className="text-gray-600">Aufwärmen & Koordination</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">09:45</span>
                      <span className="text-gray-600">Technik-Training</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">10:30</span>
                      <span className="text-gray-600">Kurze Pause</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">10:45</span>
                      <span className="text-gray-600">Spielformen & Wettkämpfe</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">12:00</span>
                      <span className="text-gray-600">Ende Tag 1</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Day 2 */}
              <Card className="border-t-4 border-t-[#22C55E]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[#003399]">
                    <Calendar className="h-5 w-5" />
                    Tag 2 - Montag, 28. Oktober
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">08:45</span>
                      <span className="text-gray-600">Ankunft</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">09:00</span>
                      <span className="text-gray-600">Power & Athletik</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">09:45</span>
                      <span className="text-gray-600">Technik-Vertiefung</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">10:30</span>
                      <span className="text-gray-600">Kurze Pause</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">10:45</span>
                      <span className="text-gray-600">Abschlussturnier</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">12:00</span>
                      <span className="text-gray-600">Siegerehrung & Ende</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-black text-[#003399]">WAS IST INKLUDIERT?</h2>
          
          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
            {mainCamp?.included.map((item, index) => (
              <div key={index} className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[#22C55E]" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Bring */}
      <section className="bg-[#003399] py-16 text-white">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-black">WAS MITBRINGEN?</h2>
          
          <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2 md:grid-cols-3">
            {mainCamp?.bring.map((item, index) => (
              <div key={index} className="flex items-center gap-2 rounded-lg bg-white/10 p-4">
                <CheckCircle2 className="h-5 w-5 text-[#22C55E]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-black text-[#003399]">BEREIT DURCHZUSTARTEN?</h2>
          <p className="mb-8 text-lg text-gray-600">
            Hast du Fragen? Kontaktiere uns direkt per WhatsApp!
          </p>
          <a
            href="https://wa.me/436644417977?text=Hallo!%20Ich%20interessiere%20mich%20für%20das%20Fußballcamp."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-10 py-3 text-lg font-bold text-white transition-colors hover:bg-[#1fb855]"
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp schreiben
          </a>
        </div>
      </section>
    </>
  );
}

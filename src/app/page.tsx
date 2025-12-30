import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, MapPin, Users, Trophy, Target, Zap, Heart, Star, ThumbsUp, MessageCircle, Facebook } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/trainer-team.jpg"
            alt="Kabashi-Stöckler Trainer Team"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#003399]/80 via-[#003399]/70 to-[#001a4d]/90" />
        </div>
        <div className="container relative mx-auto flex min-h-[90vh] flex-col items-center justify-center px-4 py-20 text-center text-white">
          <Badge className="mb-6 bg-[#22C55E] text-sm font-semibold hover:bg-[#22C55E]">
            🏆 Dein Fußball-Traum wird Realität! 🌟
          </Badge>
          <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            FÜR ALLE DIE<br />
            <span className="text-[#22C55E]">BESSER WERDEN</span><br />
            WOLLEN.
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-gray-300 sm:text-xl">
            Die Kabashi-Stöckler Fussballschule bietet professionelles Training für junge Talente. 
            Technik, Koordination und Power - alles was du brauchst, um dein Spiel auf das nächste Level zu bringen.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-[#22C55E] px-8 text-lg font-bold hover:bg-[#16a34a]">
              <Link href="/contact">
                Jetzt Anmelden
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white bg-transparent px-8 text-lg font-bold text-white hover:bg-white/10">
              <Link href="/camps">Camps entdecken</Link>
            </Button>
          </div>
          
          {/* Quick Info Cards */}
          <div className="mt-16 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
              <Calendar className="mx-auto mb-2 h-8 w-8 text-[#22C55E]" />
              <p className="font-bold">27.-28. Oktober</p>
              <p className="text-sm text-gray-300">Nächstes Bootcamp</p>
            </div>
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
              <Users className="mx-auto mb-2 h-8 w-8 text-[#22C55E]" />
              <p className="font-bold">6-16 Jahre</p>
              <p className="text-sm text-gray-300">Alle Altersgruppen</p>
            </div>
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
              <MapPin className="mx-auto mb-2 h-8 w-8 text-[#22C55E]" />
              <p className="font-bold">Kirchdorf/Krems</p>
              <p className="text-sm text-gray-300">ASKÖ Fußballplatz</p>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex h-8 w-5 justify-center rounded-full border-2 border-white/50">
            <div className="mt-2 h-2 w-1 animate-bounce rounded-full bg-white" />
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="bg-[#003399] py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 text-white md:gap-16">
            <div className="flex items-center gap-3">
              <ThumbsUp className="h-8 w-8 text-[#22C55E]" />
              <div>
                <p className="text-3xl font-black">326+</p>
                <p className="text-sm text-gray-300">Facebook Follower</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MessageCircle className="h-8 w-8 text-[#22C55E]" />
              <div>
                <p className="text-3xl font-black">33+</p>
                <p className="text-sm text-gray-300">Aktive Community</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Star className="h-8 w-8 text-[#22C55E]" />
              <div>
                <p className="text-3xl font-black">100%</p>
                <p className="text-sm text-gray-300">Zufriedenheit</p>
              </div>
            </div>
            <a
              href="https://www.facebook.com/profile.php?id=61575646112694"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-[#22C55E] px-6 py-3 font-bold transition-colors hover:bg-[#16a34a]"
            >
              <Facebook className="h-5 w-5" />
              Folge uns auf Facebook
            </a>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-black text-[#003399] sm:text-4xl">
              UNSERE MISSION
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Wir glauben daran, dass jedes Kind das Potenzial hat, ein großartiger Fußballer zu werden. 
              Unsere Mission ist es, durch qualitativ hochwertiges Training und echte Fußball-Leidenschaft 
              junge Talente zu fördern und zu inspirieren. Bei uns lernt ihr nicht nur Fußball - 
              ihr entwickelt euch als Sportler und als Person.
            </p>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-black text-[#003399] sm:text-4xl">
            EINDRÜCKE AUS UNSEREN CAMPS
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="group relative h-[300px] overflow-hidden rounded-2xl">
              <Image
                src="/images/camp-group.jpg"
                alt="Fußballcamp Gruppentraining"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-4 left-4 font-bold text-white">Teamtraining</p>
            </div>
            <div className="group relative h-[300px] overflow-hidden rounded-2xl">
              <Image
                src="/images/team-banner.jpg"
                alt="Team mit KICKEN Banner"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-4 left-4 font-bold text-white">Unsere Werte</p>
            </div>
            <div className="group relative h-[300px] overflow-hidden rounded-2xl">
              <Image
                src="/images/training-kids.jpg"
                alt="Kinder beim Training"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-4 left-4 font-bold text-white">Nachwuchsförderung</p>
            </div>
            <div className="group relative h-[300px] overflow-hidden rounded-2xl md:col-span-2">
              <Image
                src="/images/partnership.jpg"
                alt="Partnerschaft mit ASKÖ Kirchdorf"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-4 left-4 font-bold text-white">Partnerschaft mit ASKÖ Kirchdorf</p>
            </div>
            <div className="group relative h-[300px] overflow-hidden rounded-2xl">
              <Image
                src="/images/trainer-team.jpg"
                alt="Unser Trainerteam"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-4 left-4 font-bold text-white">Unser Trainerteam</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-black text-[#003399] sm:text-4xl">
            DIE 4 SÄULEN UNSERES TRAININGS
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="group border-0 bg-gradient-to-br from-[#003399] to-[#001a4d] text-white transition-transform hover:scale-105">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <Target className="mb-4 h-12 w-12 text-[#22C55E]" />
                <h3 className="mb-2 text-xl font-bold">TECHNIK</h3>
                <p className="text-sm text-gray-300">
                  Ballkontrolle, Dribbling und Passspiel auf höchstem Niveau
                </p>
              </CardContent>
            </Card>
            
            <Card className="group border-0 bg-gradient-to-br from-[#003399] to-[#001a4d] text-white transition-transform hover:scale-105">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <Zap className="mb-4 h-12 w-12 text-[#22C55E]" />
                <h3 className="mb-2 text-xl font-bold">KOORDINATION</h3>
                <p className="text-sm text-gray-300">
                  Beweglichkeit, Balance und Körperbeherrschung verbessern
                </p>
              </CardContent>
            </Card>
            
            <Card className="group border-0 bg-gradient-to-br from-[#003399] to-[#001a4d] text-white transition-transform hover:scale-105">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <Trophy className="mb-4 h-12 w-12 text-[#22C55E]" />
                <h3 className="mb-2 text-xl font-bold">POWER</h3>
                <p className="text-sm text-gray-300">
                  Kraft, Schnelligkeit und Ausdauer gezielt entwickeln
                </p>
              </CardContent>
            </Card>
            
            <Card className="group border-0 bg-gradient-to-br from-[#22C55E] to-[#16a34a] text-white transition-transform hover:scale-105">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <Heart className="mb-4 h-12 w-12 text-white" />
                <h3 className="mb-2 text-xl font-bold">LEIDENSCHAFT</h3>
                <p className="text-sm text-gray-100">
                  Die Liebe zum Spiel steht bei uns an erster Stelle
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Next Bootcamp CTA */}
      <section className="bg-[#003399] py-20">
        <div className="container mx-auto px-4 text-center text-white">
          <Badge className="mb-6 bg-[#22C55E] text-sm font-semibold hover:bg-[#22C55E]">
            Limitierte Plätze
          </Badge>
          <h2 className="mb-4 text-3xl font-black sm:text-4xl md:text-5xl">
            PERFORMANCE BOOTCAMP
          </h2>
          <p className="mb-2 text-2xl font-bold text-[#22C55E]">27.-28. Oktober 2024</p>
          <p className="mb-8 text-lg text-gray-300">
            Zwei Tage intensives Training am ASKÖ Kirchdorf Fußballplatz
          </p>
          <div className="mb-8 flex flex-wrap justify-center gap-8">
            <div>
              <p className="text-4xl font-black">€50</p>
              <p className="text-sm text-gray-300">Teilnahmegebühr</p>
            </div>
            <div>
              <p className="text-4xl font-black">09:00-12:00</p>
              <p className="text-sm text-gray-300">Trainingszeit</p>
            </div>
            <div>
              <p className="text-4xl font-black">6-16</p>
              <p className="text-sm text-gray-300">Jahre</p>
            </div>
          </div>
          <Button asChild size="lg" className="bg-[#22C55E] px-10 text-lg font-bold hover:bg-[#16a34a]">
            <Link href="/contact">
              Platz Sichern
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-black text-[#003399] sm:text-4xl">
            WAS ELTERN SAGEN
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="mb-4 text-gray-600">
                  &ldquo;Mein Sohn hat in nur einem Camp so viel gelernt! Die Trainer sind super motiviert und gehen auf jedes Kind individuell ein.&rdquo;
                </p>
                <p className="font-bold text-[#003399]">- Maria S.</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="mb-4 text-gray-600">
                  &ldquo;Professionelles Training in familiärer Atmosphäre. Die Kinder haben Spaß und werden gleichzeitig gefordert. Top!&rdquo;
                </p>
                <p className="font-bold text-[#003399]">- Thomas K.</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="mb-4 text-gray-600">
                  &ldquo;Die beste Fußballschule in der Region! Meine Tochter freut sich jedes Mal auf das Training.&rdquo;
                </p>
                <p className="font-bold text-[#003399]">- Sandra H.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Facebook Feed Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-black text-[#003399] sm:text-4xl">
            AKTUELLES AUF FACEBOOK
          </h2>
          <p className="mb-8 text-center text-gray-600">
            Folge uns für die neuesten Updates, Fotos und Videos von unseren Camps!
          </p>
          <div className="flex justify-center">
            <div className="w-full max-w-lg overflow-hidden rounded-2xl border shadow-lg">
              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61575646112694&tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
                width="500"
                height="500"
                style={{ border: "none", overflow: "hidden", width: "100%", maxWidth: "500px" }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Location Preview */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-black text-[#003399] sm:text-4xl">
                UNSER TRAININGSORT
              </h2>
              <p className="mb-4 text-2xl font-bold text-[#22C55E]">
                Kirchdorf an der Krems
              </p>
              <p className="mb-6 text-lg text-gray-700">
                Das Training findet am erstklassigen ASKÖ Kirchdorf Fußballplatz statt. 
                Eine professionelle Anlage mit optimalen Bedingungen für intensives Training.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <MapPin className="mr-3 h-5 w-5 text-[#22C55E]" />
                  <span className="font-medium">Ertlstraße 16, 4560 Kirchdorf an der Krems</span>
                </div>
              </div>
              <Button asChild className="mt-6 bg-[#003399] hover:bg-[#001a4d]">
                <Link href="/contact">Anfahrt & Kontakt</Link>
              </Button>
            </div>
            <div className="relative h-[400px] overflow-hidden rounded-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2679.5!2d14.1231!3d47.9056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4773a1a1a1a1a1a1%3A0x1234567890!2sErtlstra%C3%9Fe%2016%2C%204560%20Kirchdorf%20an%20der%20Krems!5e0!3m2!1sde!2sat!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

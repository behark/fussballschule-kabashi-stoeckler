"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, MapPin, Users, Trophy, Target, Zap, Heart, Star, ThumbsUp, MessageCircle, Facebook } from "lucide-react";
import { ImageLightbox } from "@/components/ImageLightbox";
import { getNextCamp } from "@/lib/dates";
import type { HeroContent, MissionContent, SocialProofContent, PillarContent, TestimonialContent, GalleryImage } from "@/lib/content";

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ThumbsUp,
  MessageCircle,
  Star,
  Target,
  Zap,
  Trophy,
  Heart,
};

export default function Home() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [hero, setHero] = useState<HeroContent | null>(null);
  const [mission, setMission] = useState<MissionContent | null>(null);
  const [socialProof, setSocialProof] = useState<SocialProofContent | null>(null);
  const [pillars, setPillars] = useState<PillarContent[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialContent[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    // Fetch content from public API (which uses Redis with fallback)
    Promise.all([
      fetch("/api/content/hero").then(r => r.ok ? r.json() : null).then(d => d?.data),
      fetch("/api/content/mission").then(r => r.ok ? r.json() : null).then(d => d?.data),
      fetch("/api/content/socialProof").then(r => r.ok ? r.json() : null).then(d => d?.data),
      fetch("/api/content/pillars").then(r => r.ok ? r.json() : null).then(d => d?.data),
      fetch("/api/content/testimonials").then(r => r.ok ? r.json() : null).then(d => d?.data),
      fetch("/api/content/gallery").then(r => r.ok ? r.json() : null).then(d => d?.data),
    ]).then(([heroData, missionData, socialData, pillarsData, testimonialsData, galleryData]) => {
      // Use defaults if no data from Redis
      setHero(heroData || {
        badge: "🏆 Dein Fußball-Traum wird Realität! 🌟",
        headline: "FÜR ALLE DIE\nBESSER WERDEN\nWOLLEN.",
        subtext: "Die Kabashi-Stöckler Fussballschule bietet professionelles Training für junge Talente. Technik, Koordination und Power - alles was du brauchst, um dein Spiel auf das nächste Level zu bringen.",
        image: "/images/trainer-team.jpg",
      });
      setMission(missionData || {
        title: "UNSERE MISSION",
        text: "Wir glauben daran, dass jedes Kind das Potenzial hat, ein großartiger Fußballer zu werden. Unsere Mission ist es, durch qualitativ hochwertiges Training und echte Fußball-Leidenschaft junge Talente zu fördern und zu inspirieren. Bei uns lernt ihr nicht nur Fußball - ihr entwickelt euch als Sportler und als Person.",
      });
      setSocialProof(socialData || {
        stats: [
          { value: "326+", label: "Facebook Follower", icon: "ThumbsUp" },
          { value: "33+", label: "Aktive Community", icon: "MessageCircle" },
          { value: "100%", label: "Zufriedenheit", icon: "Star" },
        ],
        facebookUrl: "https://www.facebook.com/profile.php?id=61575646112694",
      });
      setPillars(pillarsData || [
        { icon: "Target", title: "TECHNIK", description: "Ballkontrolle, Dribbling und Passspiel auf höchstem Niveau" },
        { icon: "Zap", title: "KOORDINATION", description: "Beweglichkeit, Balance und Körperbeherrschung verbessern" },
        { icon: "Trophy", title: "POWER", description: "Kraft, Schnelligkeit und Ausdauer gezielt entwickeln" },
        { icon: "Heart", title: "LEIDENSCHAFT", description: "Die Liebe zum Spiel steht bei uns an erster Stelle" },
      ]);
      setTestimonials(testimonialsData || [
        { quote: "Mein Sohn hat in nur einem Camp so viel gelernt! Die Trainer sind super motiviert und gehen auf jedes Kind individuell ein.", author: "Maria S.", stars: 5 },
        { quote: "Professionelles Training in familiärer Atmosphäre. Die Kinder haben Spaß und werden gleichzeitig gefordert. Top!", author: "Thomas K.", stars: 5 },
        { quote: "Die beste Fußballschule in der Region! Meine Tochter freut sich jedes Mal auf das Training.", author: "Sandra H.", stars: 5 },
      ]);
      setGalleryImages(galleryData || [
        { src: "/images/camp-group.jpg", alt: "Fußballcamp Gruppentraining", title: "Teamtraining" },
        { src: "/images/team-banner.jpg", alt: "Team mit KICKEN Banner", title: "Unsere Werte" },
        { src: "/images/training-kids.jpg", alt: "Kinder beim Training", title: "Nachwuchsförderung" },
        { src: "/images/partnership.jpg", alt: "Partnerschaft mit ASKÖ Kirchdorf", title: "Partnerschaft mit ASKÖ Kirchdorf" },
        { src: "/images/trainer-team.jpg", alt: "Unser Trainerteam", title: "Unser Trainerteam" },
      ]);
    }).catch(err => {
      console.error("Error loading content:", err);
      // Use defaults on error
      setHero({
        badge: "🏆 Dein Fußball-Traum wird Realität! 🌟",
        headline: "FÜR ALLE DIE\nBESSER WERDEN\nWOLLEN.",
        subtext: "Die Kabashi-Stöckler Fussballschule bietet professionelles Training für junge Talente. Technik, Koordination und Power - alles was du brauchst, um dein Spiel auf das nächste Level zu bringen.",
        image: "/images/trainer-team.jpg",
      });
      setMission({
        title: "UNSERE MISSION",
        text: "Wir glauben daran, dass jedes Kind das Potenzial hat, ein großartiger Fußballer zu werden. Unsere Mission ist es, durch qualitativ hochwertiges Training und echte Fußball-Leidenschaft junge Talente zu fördern und zu inspirieren. Bei uns lernt ihr nicht nur Fußball - ihr entwickelt euch als Sportler und als Person.",
      });
      setSocialProof({
        stats: [
          { value: "326+", label: "Facebook Follower", icon: "ThumbsUp" },
          { value: "33+", label: "Aktive Community", icon: "MessageCircle" },
          { value: "100%", label: "Zufriedenheit", icon: "Star" },
        ],
        facebookUrl: "https://www.facebook.com/profile.php?id=61575646112694",
      });
      setPillars([
        { icon: "Target", title: "TECHNIK", description: "Ballkontrolle, Dribbling und Passspiel auf höchstem Niveau" },
        { icon: "Zap", title: "KOORDINATION", description: "Beweglichkeit, Balance und Körperbeherrschung verbessern" },
        { icon: "Trophy", title: "POWER", description: "Kraft, Schnelligkeit und Ausdauer gezielt entwickeln" },
        { icon: "Heart", title: "LEIDENSCHAFT", description: "Die Liebe zum Spiel steht bei uns an erster Stelle" },
      ]);
      setTestimonials([
        { quote: "Mein Sohn hat in nur einem Camp so viel gelernt! Die Trainer sind super motiviert und gehen auf jedes Kind individuell ein.", author: "Maria S.", stars: 5 },
        { quote: "Professionelles Training in familiärer Atmosphäre. Die Kinder haben Spaß und werden gleichzeitig gefordert. Top!", author: "Thomas K.", stars: 5 },
        { quote: "Die beste Fußballschule in der Region! Meine Tochter freut sich jedes Mal auf das Training.", author: "Sandra H.", stars: 5 },
      ]);
      setGalleryImages([
        { src: "/images/camp-group.jpg", alt: "Fußballcamp Gruppentraining", title: "Teamtraining" },
        { src: "/images/team-banner.jpg", alt: "Team mit KICKEN Banner", title: "Unsere Werte" },
        { src: "/images/training-kids.jpg", alt: "Kinder beim Training", title: "Nachwuchsförderung" },
        { src: "/images/partnership.jpg", alt: "Partnerschaft mit ASKÖ Kirchdorf", title: "Partnerschaft mit ASKÖ Kirchdorf" },
        { src: "/images/trainer-team.jpg", alt: "Unser Trainerteam", title: "Unser Trainerteam" },
      ]);
    });
  }, []);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const nextCamp = getNextCamp();

  return (
    <>
      {/* Hero Section */}
      {hero && (
        <section className="relative min-h-[90vh] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={hero.image}
              alt="Kabashi-Stöckler Trainer Team"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#003399]/80 via-[#003399]/70 to-[#001a4d]/90" />
          </div>
          <div className="container relative mx-auto flex min-h-[90vh] flex-col items-center justify-center px-4 py-20 text-center text-white">
            <Badge className="mb-6 bg-[#22C55E] text-sm font-semibold hover:bg-[#22C55E]">
              {hero.badge}
            </Badge>
            <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              {hero.headline.split("\\n").map((line, i) => (
                <span key={i}>
                  {line.includes("BESSER WERDEN") ? (
                    <>
                      {line.split("BESSER WERDEN")[0]}
                      <span className="text-[#22C55E]">BESSER WERDEN</span>
                      {line.split("BESSER WERDEN")[1]}
                    </>
                  ) : (
                    line
                  )}
                  {i < hero.headline.split("\\n").length - 1 && <br />}
                </span>
              ))}
            </h1>
            <p className="mb-8 max-w-2xl text-lg text-gray-300 sm:text-xl">
              {hero.subtext}
            </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-[#22C55E] px-8 text-lg font-bold hover:bg-[#16a34a]">
              <Link href="/camps">
                Camps entdecken
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white bg-transparent px-8 text-lg font-bold text-white hover:bg-white/10">
              <Link href="/about">Über Uns</Link>
            </Button>
          </div>
          
          {/* Quick Info Cards */}
          <div className="mt-16 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
              <Calendar className="mx-auto mb-2 h-8 w-8 text-[#22C55E]" />
              <p className="font-bold">{nextCamp.formattedShort}</p>
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
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="flex h-8 w-5 justify-center rounded-full border-2 border-white/50">
              <div className="mt-2 h-2 w-1 animate-bounce rounded-full bg-white" />
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Social Proof Section */}
      {socialProof && (
        <section className="bg-[#003399] py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-8 text-white md:gap-16">
              {socialProof.stats.map((stat, index) => {
                const Icon = iconMap[stat.icon] || Star;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <Icon className="h-8 w-8 text-[#22C55E]" />
                    <div>
                      <p className="text-3xl font-black">{stat.value}</p>
                      <p className="text-sm text-gray-300">{stat.label}</p>
                    </div>
                  </div>
                );
              })}
              <a
                href={socialProof.facebookUrl}
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
      )}

      {/* Mission Statement */}
      {mission && (
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-black text-[#003399] sm:text-4xl">
                {mission.title}
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                {mission.text}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Photo Gallery */}
      {galleryImages.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-black text-[#003399] sm:text-4xl">
              EINDRÜCKE AUS UNSEREN CAMPS
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => openLightbox(index)}
                className={`group relative h-[300px] overflow-hidden rounded-2xl transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-[#22C55E] focus-visible:outline-offset-2 ${
                  index === 3 ? "md:col-span-2" : ""
                }`}
                aria-label={`${image.title} - Bild vergrößern`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="absolute bottom-4 left-4 font-bold text-white">{image.title}</p>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="rounded-full bg-white/20 p-3 backdrop-blur">
                    <svg
                      className="h-8 w-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                      />
                    </svg>
                  </div>
                </div>
              </button>
              ))}
            </div>
            {lightboxOpen && (
              <ImageLightbox
                images={galleryImages}
                initialIndex={lightboxIndex}
                onClose={() => setLightboxOpen(false)}
              />
            )}
          </div>
        </section>
      )}

      {/* Core Pillars */}
      {pillars.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-black text-[#003399] sm:text-4xl">
              DIE 4 SÄULEN UNSERES TRAININGS
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {pillars.map((pillar, index) => {
                const Icon = iconMap[pillar.icon] || Target;
                const isLast = index === pillars.length - 1;
                return (
                  <Card
                    key={index}
                    className={`group border-0 ${
                      isLast
                        ? "bg-gradient-to-br from-[#22C55E] to-[#16a34a] text-white"
                        : "bg-gradient-to-br from-[#003399] to-[#001a4d] text-white"
                    } transition-transform hover:scale-105`}
                  >
                    <CardContent className="flex flex-col items-center p-8 text-center">
                      <Icon
                        className={`mb-4 h-12 w-12 ${
                          isLast ? "text-white" : "text-[#22C55E]"
                        }`}
                      />
                      <h3 className="mb-2 text-xl font-bold">{pillar.title}</h3>
                      <p
                        className={`text-sm ${
                          isLast ? "text-gray-100" : "text-gray-300"
                        }`}
                      >
                        {pillar.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Next Bootcamp CTA */}
      <section className="bg-[#003399] py-20">
        <div className="container mx-auto px-4 text-center text-white">
          <Badge className="mb-6 bg-[#22C55E] text-sm font-semibold hover:bg-[#22C55E]">
            Limitierte Plätze
          </Badge>
          <h2 className="mb-4 text-3xl font-black sm:text-4xl md:text-5xl">
            PERFORMANCE BOOTCAMP
          </h2>
          <p className="mb-2 text-2xl font-bold text-[#22C55E]">{nextCamp.formatted}</p>
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
            <Link href="/camps">
              Mehr erfahren
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-black text-[#003399] sm:text-4xl">
              WAS ELTERN SAGEN
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="mb-4 flex text-yellow-400">
                      {[...Array(testimonial.stars || 5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                    <p className="mb-4 text-gray-600">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <p className="font-bold text-[#003399]">- {testimonial.author}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

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

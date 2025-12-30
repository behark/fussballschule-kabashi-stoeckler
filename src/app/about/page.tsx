import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Award, Users, Heart, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Über Uns | Kabashi-Stöckler Fussballschule",
  description: "Lerne das Team hinter der Kabashi-Stöckler Fussballschule kennen. Unsere Geschichte, unsere Trainer und unsere Vision.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-[#22C55E] hover:bg-[#22C55E]">Über Uns</Badge>
          <h1 className="mb-4 text-4xl font-black sm:text-5xl md:text-6xl">
            DAS TEAM
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Lerne die Menschen kennen, die hinter der Kabashi-Stöckler Fussballschule stehen.
          </p>
        </div>
      </section>

      {/* Coaches Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-black text-[#003399]">UNSERE TRAINER</h2>

          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            {/* Coach 1 - Albert Kabashi */}
            <Card className="overflow-hidden border-0 shadow-lg">
              <div className="relative h-80">
                <Image
                  src="/images/trainer-albert.jpg"
                  alt="Albert Kabashi - Trainer"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="mb-1 text-2xl font-black text-[#003399]">ALBERT KABASHI</h3>
                <p className="mb-4 font-semibold text-[#22C55E]">Co-Founder & Cheftrainer</p>
                <p className="text-gray-600">
                  Mit jahrelanger Erfahrung im Fußball bringt Albert technisches Know-how 
                  und echte Leidenschaft für die Entwicklung junger Spieler mit. 
                  Sein Fokus liegt auf der individuellen Förderung und dem Aufbau 
                  von Selbstvertrauen bei jedem Kind.
                </p>
              </CardContent>
            </Card>

            {/* Coach 2 - Jonas Stöckler */}
            <Card className="overflow-hidden border-0 shadow-lg">
              <div className="relative h-80">
                <Image
                  src="/images/trainer-jonas.jpg"
                  alt="Jonas Stöckler - Trainer"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="mb-1 text-2xl font-black text-[#003399]">JONAS STÖCKLER</h3>
                <p className="mb-4 font-semibold text-[#22C55E]">Co-Founder & Trainer</p>
                <p className="text-gray-600">
                  Jonas kombiniert moderne Trainingsmethoden mit traditionellem 
                  Fußball-Know-how. Seine Stärke liegt in der Koordinations- und 
                  Athletikschulung sowie der Vermittlung von Spielintelligenz 
                  auf spielerische Art und Weise.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Full Team Photo */}
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="relative h-[400px] overflow-hidden rounded-2xl">
              <Image
                src="/images/trainer-team.jpg"
                alt="Das komplette Trainerteam"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-black">UNSER TRAINERTEAM</h3>
                <p className="text-gray-200">Gemeinsam für euren Erfolg</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-8 text-3xl font-black text-[#003399]">UNSERE GESCHICHTE</h2>
            <p className="mb-6 text-lg text-gray-700">
              Die Kabashi-Stöckler Fussballschule wurde aus der gemeinsamen Leidenschaft 
              für den Fußball und dem Wunsch gegründet, jungen Talenten in Oberösterreich 
              professionelles Training zu bieten.
            </p>
            <p className="mb-6 text-lg text-gray-700">
              Was als kleine Initiative begann, hat sich zu einem anerkannten Trainingszentrum 
              entwickelt, das Kinder und Jugendliche von 6 bis 16 Jahren auf ihrem fußballerischen 
              Weg begleitet und fördert.
            </p>
            <p className="text-lg text-gray-700">
              Unser Ziel ist es, nicht nur bessere Fußballer zu entwickeln, sondern auch 
              Werte wie Teamgeist, Fairplay und Durchhaltevermögen zu vermitteln - 
              Eigenschaften, die weit über den Fußballplatz hinaus wichtig sind.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-black text-[#003399]">UNSERE WERTE</h2>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-[#003399] p-8 text-center text-white">
              <Award className="mx-auto mb-4 h-12 w-12 text-[#22C55E]" />
              <h3 className="mb-2 text-xl font-bold">Qualität</h3>
              <p className="text-sm text-gray-300">
                Professionelles Training auf höchstem Niveau mit modernsten Methoden
              </p>
            </div>

            <div className="rounded-xl bg-[#003399] p-8 text-center text-white">
              <Users className="mx-auto mb-4 h-12 w-12 text-[#22C55E]" />
              <h3 className="mb-2 text-xl font-bold">Gemeinschaft</h3>
              <p className="text-sm text-gray-300">
                Teamgeist und Zusammenhalt stehen bei uns an erster Stelle
              </p>
            </div>

            <div className="rounded-xl bg-[#003399] p-8 text-center text-white">
              <Heart className="mx-auto mb-4 h-12 w-12 text-[#22C55E]" />
              <h3 className="mb-2 text-xl font-bold">Leidenschaft</h3>
              <p className="text-sm text-gray-300">
                Die Liebe zum Fußball treibt uns jeden Tag an
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-black text-[#003399]">GALERIE</h2>

          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            <div className="group relative aspect-square overflow-hidden rounded-lg">
              <Image src="/images/camp-group.jpg" alt="Camp Gruppe" fill className="object-cover transition-transform group-hover:scale-110" />
            </div>
            <div className="group relative aspect-square overflow-hidden rounded-lg">
              <Image src="/images/team-banner.jpg" alt="Team Banner" fill className="object-cover transition-transform group-hover:scale-110" />
            </div>
            <div className="group relative aspect-square overflow-hidden rounded-lg">
              <Image src="/images/training-kids.jpg" alt="Training Kids" fill className="object-cover transition-transform group-hover:scale-110" />
            </div>
            <div className="group relative aspect-square overflow-hidden rounded-lg">
              <Image src="/images/partnership.jpg" alt="Partnerschaft" fill className="object-cover transition-transform group-hover:scale-110" />
            </div>
            <div className="group relative aspect-square overflow-hidden rounded-lg">
              <Image src="/images/trainer-team.jpg" alt="Trainer Team" fill className="object-cover transition-transform group-hover:scale-110" />
            </div>
            <div className="group relative aspect-square overflow-hidden rounded-lg">
              <Image src="/images/trainer-albert.jpg" alt="Albert Kabashi" fill className="object-cover object-top transition-transform group-hover:scale-110" />
            </div>
            <div className="group relative aspect-square overflow-hidden rounded-lg">
              <Image src="/images/trainer-jonas.jpg" alt="Jonas Stöckler" fill className="object-cover object-top transition-transform group-hover:scale-110" />
            </div>
            <div className="group relative aspect-square overflow-hidden rounded-lg">
              <Image src="/images/camp-flyer.jpg" alt="Camp Flyer" fill className="object-cover transition-transform group-hover:scale-110" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#003399] py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="mb-4 text-3xl font-black">WERDE TEIL UNSERES TEAMS!</h2>
          <p className="mb-8 text-lg text-gray-300">
            Melde dich jetzt für unser nächstes Bootcamp an.
          </p>
          <Button asChild size="lg" className="bg-[#22C55E] px-10 text-lg font-bold hover:bg-[#16a34a]">
            <Link href="/contact">
              Jetzt Anmelden
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}

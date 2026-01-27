import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Zap, Trophy, Heart, Brain, Users, TrendingUp, Shield } from "lucide-react";
import { getPillarsContent } from "@/lib/content";

export const metadata = {
  title: "Philosophie | Kabashi-Stöckler Fussballschule",
  description: "Unsere Trainingsphilosophie: Technik, Koordination, Power und Fußball-Leidenschaft. Erfahre mehr über unseren ganzheitlichen Ansatz.",
};

export default async function PhilosophyPage() {
  const pillars = await getPillarsContent();
  
  // Icon mapping
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Target,
    Zap,
    Trophy,
    Heart,
  };
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-[#22C55E] hover:bg-[#22C55E]">Unsere Philosophie</Badge>
          <h1 className="mb-4 text-4xl font-black sm:text-5xl md:text-6xl">
            PERFORMANCE
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Was bedeutet Performance für uns? Es geht um mehr als nur Fußball spielen - 
            es geht darum, das Beste aus jedem jungen Sportler herauszuholen.
          </p>
        </div>
      </section>

      {/* Main Pillars */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-black text-[#003399]">
            DIE 4 SÄULEN DES PERFORMANCE TRAININGS
          </h2>

          <div className="grid gap-8 lg:grid-cols-2">
            {pillars.map((pillar, index) => {
              const Icon = iconMap[pillar.icon] || Target;
              const isLast = index === pillars.length - 1;
              return (
                <Card key={index} className="overflow-hidden border-0 shadow-lg">
                  <div className={isLast ? "gradient-green p-4" : "bg-[#003399] p-4"}>
                    <div className="flex items-center gap-3">
                      <Icon className={`h-8 w-8 ${isLast ? "text-white" : "text-[#22C55E]"}`} />
                      <h3 className="text-2xl font-black text-white">{pillar.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="mb-4 text-gray-700">{pillar.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-black text-[#003399]">
            UNSER TRAININGSANSATZ
          </h2>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-white p-6 text-center shadow-md">
              <Brain className="mx-auto mb-4 h-12 w-12 text-[#003399]" />
              <h3 className="mb-2 font-bold text-[#003399]">Spielintelligenz</h3>
              <p className="text-sm text-gray-600">
                Wir fördern das Spielverständnis und die Entscheidungsfindung
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 text-center shadow-md">
              <Users className="mx-auto mb-4 h-12 w-12 text-[#003399]" />
              <h3 className="mb-2 font-bold text-[#003399]">Kleine Gruppen</h3>
              <p className="text-sm text-gray-600">
                Individuelle Betreuung durch optimale Trainer-Spieler-Verhältnis
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 text-center shadow-md">
              <TrendingUp className="mx-auto mb-4 h-12 w-12 text-[#003399]" />
              <h3 className="mb-2 font-bold text-[#003399]">Progression</h3>
              <p className="text-sm text-gray-600">
                Altersgerechte Übungen mit steigendem Schwierigkeitsgrad
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 text-center shadow-md">
              <Shield className="mx-auto mb-4 h-12 w-12 text-[#003399]" />
              <h3 className="mb-2 font-bold text-[#003399]">Sicherheit</h3>
              <p className="text-sm text-gray-600">
                Verletzungsprävention und korrektes Aufwärmen
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-[#003399] py-20">
        <div className="container mx-auto px-4">
          <blockquote className="mx-auto max-w-3xl text-center">
            <p className="mb-6 text-2xl font-bold italic text-white md:text-3xl">
              &ldquo;Wir glauben daran, dass jedes Kind das Potenzial hat, 
              ein besserer Fußballer zu werden. Unser Job ist es, 
              dieses Potenzial zu entfalten.&rdquo;
            </p>
            <footer className="text-[#22C55E]">
              — Kabashi & Stöckler, Gründer
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Age Groups */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-black text-[#003399]">
            ALTERSGERECHTES TRAINING
          </h2>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            <Card className="border-t-4 border-t-[#22C55E]">
              <CardContent className="p-6 text-center">
                <p className="mb-2 text-4xl font-black text-[#003399]">6-9</p>
                <p className="mb-4 font-bold text-gray-700">Jahre</p>
                <p className="text-sm text-gray-600">
                  Spielerische Grundlagen, Koordination und Spaß am Ball. 
                  Fokus auf Bewegungsfreude und erste technische Elemente.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-[#003399]">
              <CardContent className="p-6 text-center">
                <p className="mb-2 text-4xl font-black text-[#003399]">10-12</p>
                <p className="mb-4 font-bold text-gray-700">Jahre</p>
                <p className="text-sm text-gray-600">
                  Goldenes Lernalter! Intensive Technikschulung, 
                  Spielverständnis aufbauen und erste taktische Elemente.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-[#22C55E]">
              <CardContent className="p-6 text-center">
                <p className="mb-2 text-4xl font-black text-[#003399]">13-16</p>
                <p className="mb-4 font-bold text-gray-700">Jahre</p>
                <p className="text-sm text-gray-600">
                  Fortgeschrittene Techniken, Athletik und mentale Stärke. 
                  Vorbereitung auf höhere Leistungsklassen.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}

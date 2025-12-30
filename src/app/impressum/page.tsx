import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Impressum | Kabashi-Stöckler Fussballschule",
  description: "Impressum und rechtliche Informationen der Kabashi-Stöckler Fussballschule.",
};

export default function ImpressumPage() {
  return (
    <>
      <section className="gradient-hero py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-white/20 hover:bg-white/20">Rechtliches</Badge>
          <h1 className="text-4xl font-black">IMPRESSUM</h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-3xl border-0 shadow-lg">
            <CardContent className="prose prose-gray max-w-none p-8">
              <h2 className="text-xl font-bold text-[#003399]">
                Informationen gemäß § 5 E-Commerce-Gesetz (ECG)
              </h2>

              <h3 className="mt-6 font-bold text-[#003399]">Medieninhaber und Herausgeber</h3>
              <p>
                Kabashi-Stöckler Fussballschule<br />
                Ertlstraße 16<br />
                4560 Kirchdorf an der Krems<br />
                Österreich
              </p>

              <h3 className="mt-6 font-bold text-[#003399]">Kontakt</h3>
              <p>
                E-Mail: <a href="mailto:jonas.stoeckler@gmx.at" className="text-[#003399]">jonas.stoeckler@gmx.at</a><br />
                Telefon: <a href="tel:069911798410" className="text-[#003399]">0699 117 984 10</a>
              </p>

              <h3 className="mt-6 font-bold text-[#003399]">Unternehmensgegenstand</h3>
              <p>
                Organisation und Durchführung von Fußballcamps und Trainings für Kinder 
                und Jugendliche im Alter von 6-16 Jahren.
              </p>

              <h3 className="mt-6 font-bold text-[#003399]">Anwendbare Rechtsvorschriften</h3>
              <p>
                Gewerbeordnung: <a href="https://www.ris.bka.gv.at" target="_blank" rel="noopener noreferrer" className="text-[#003399]">www.ris.bka.gv.at</a><br />
                E-Commerce-Gesetz (ECG)<br />
                Datenschutzgrundverordnung (DSGVO)
              </p>

              <h3 className="mt-6 font-bold text-[#003399]">Haftungsausschluss</h3>
              <p>
                Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. 
                Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können 
                wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß 
                § 7 Abs.1 ECG für eigene Inhalte auf diesen Seiten nach den allgemeinen 
                Gesetzen verantwortlich.
              </p>

              <h3 className="mt-6 font-bold text-[#003399]">Urheberrecht</h3>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen 
                Seiten unterliegen dem österreichischen Urheberrecht. Die Vervielfältigung, 
                Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen 
                des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen 
                Autors bzw. Erstellers.
              </p>

              <h3 className="mt-6 font-bold text-[#003399]">Online-Streitbeilegung</h3>
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung 
                (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-[#003399]">https://ec.europa.eu/consumers/odr</a>
              </p>
              <p>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren 
                vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>

              <p className="mt-8 text-sm text-gray-500">
                Stand: Oktober 2024
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}

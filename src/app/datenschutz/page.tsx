import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Datenschutz | Kabashi-Stöckler Fussballschule",
  description: "Datenschutzerklärung der Kabashi-Stöckler Fussballschule gemäß DSGVO.",
};

export default function DatenschutzPage() {
  return (
    <>
      <section className="gradient-hero py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-white/20 hover:bg-white/20">Rechtliches</Badge>
          <h1 className="text-4xl font-black">DATENSCHUTZERKLÄRUNG</h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-3xl border-0 shadow-lg">
            <CardContent className="prose prose-gray max-w-none p-8">
              <h2 className="text-xl font-bold text-[#003399]">
                Datenschutzerklärung gemäß DSGVO
              </h2>

              <h3 className="mt-6 font-bold text-[#003399]">1. Verantwortlicher</h3>
              <p>
                Kabashi-Stöckler Fussballschule<br />
                Ertlstraße 16<br />
                4560 Kirchdorf an der Krems<br />
                E-Mail: jonas.stoeckler@gmx.at<br />
                Telefon: 0664 441 7977
              </p>

              <h3 className="mt-6 font-bold text-[#003399]">2. Erhebung und Speicherung personenbezogener Daten</h3>
              <p>
                Beim Besuch unserer Website werden automatisch Informationen allgemeiner 
                Natur erfasst (Server-Logfiles). Diese Informationen beinhalten etwa die 
                Art des Webbrowsers, das verwendete Betriebssystem, den Domainnamen Ihres 
                Internet-Service-Providers, Ihre IP-Adresse und ähnliches.
              </p>
              <p>
                Dies geschieht aus folgenden Gründen:
              </p>
              <ul>
                <li>Sicherstellung eines problemlosen Verbindungsaufbaus der Website</li>
                <li>Sicherstellung einer reibungslosen Nutzung unserer Website</li>
                <li>Auswertung der Systemsicherheit und -stabilität</li>
                <li>Weitere administrative Zwecke</li>
              </ul>

              <h3 className="mt-6 font-bold text-[#003399]">3. Kontaktformular / Anmeldung</h3>
              <p>
                Bei der Nutzung unseres Kontakt- oder Anmeldeformulars erheben wir 
                folgende Daten:
              </p>
              <ul>
                <li>Name des Kindes</li>
                <li>Alter des Kindes</li>
                <li>Name der Erziehungsberechtigten</li>
                <li>E-Mail-Adresse</li>
                <li>Telefonnummer</li>
                <li>Ggf. Vereinszugehörigkeit</li>
                <li>Ggf. zusätzliche Nachricht</li>
              </ul>
              <p>
                Die Verarbeitung dieser Daten erfolgt zur Bearbeitung Ihrer Anfrage bzw. 
                Anmeldung (Art. 6 Abs. 1 lit. b DSGVO). Die Daten werden gelöscht, sobald 
                sie für die Erreichung des Zweckes ihrer Erhebung nicht mehr erforderlich sind.
              </p>

              <h3 className="mt-6 font-bold text-[#003399]">4. Ihre Rechte</h3>
              <p>Sie haben folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:</p>
              <ul>
                <li><strong>Auskunftsrecht</strong> (Art. 15 DSGVO)</li>
                <li><strong>Recht auf Berichtigung</strong> (Art. 16 DSGVO)</li>
                <li><strong>Recht auf Löschung</strong> (Art. 17 DSGVO)</li>
                <li><strong>Recht auf Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO)</li>
                <li><strong>Recht auf Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
                <li><strong>Widerspruchsrecht</strong> (Art. 21 DSGVO)</li>
              </ul>
              <p>
                Zudem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde 
                über die Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren. 
                In Österreich ist dies die Datenschutzbehörde: <a href="https://www.dsb.gv.at" target="_blank" rel="noopener noreferrer" className="text-[#003399]">www.dsb.gv.at</a>
              </p>

              <h3 className="mt-6 font-bold text-[#003399]">5. Speicherdauer</h3>
              <p>
                Personenbezogene Daten werden nur so lange gespeichert, wie dies für 
                den Zweck, für den sie erhoben wurden, erforderlich ist, oder soweit 
                eine Speicherung durch Gesetze vorgeschrieben ist.
              </p>

              <h3 className="mt-6 font-bold text-[#003399]">6. Cookies</h3>
              <p>
                Diese Website verwendet technisch notwendige Cookies, die für den Betrieb 
                der Website erforderlich sind. Diese Cookies speichern keine persönlichen 
                Daten und werden nach Ende der Browser-Sitzung automatisch gelöscht.
              </p>

              <h3 className="mt-6 font-bold text-[#003399]">7. SSL-Verschlüsselung</h3>
              <p>
                Diese Website nutzt aus Gründen der Sicherheit und zum Schutz der 
                Übertragung vertraulicher Inhalte eine SSL-Verschlüsselung. Eine 
                verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile 
                des Browsers von &quot;http://&quot; auf &quot;https://&quot; wechselt.
              </p>

              <h3 className="mt-6 font-bold text-[#003399]">8. Änderung dieser Datenschutzerklärung</h3>
              <p>
                Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie 
                stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen 
                unserer Leistungen in der Datenschutzerklärung umzusetzen.
              </p>

              <h3 className="mt-6 font-bold text-[#003399]">9. Fragen zum Datenschutz</h3>
              <p>
                Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine E-Mail 
                an: <a href="mailto:jonas.stoeckler@gmx.at" className="text-[#003399]">jonas.stoeckler@gmx.at</a>
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

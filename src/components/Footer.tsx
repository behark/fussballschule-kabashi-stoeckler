import Link from "next/link";
import { MapPin, Mail, Phone, Instagram, Facebook } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-[#003399] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                <span className="text-xl font-black text-[#003399]">KS</span>
              </div>
              <div>
                <span className="text-lg font-black">KABASHI-STÖCKLER</span>
                <span className="block text-xs font-semibold text-gray-300">FUSSBALLSCHULE</span>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-300">
              Professionelles Fußballtraining für Kinder und Jugendliche von 6-16 Jahren in Oberösterreich.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-gray-300 hover:text-[#22C55E]">Home</Link></li>
              <li><Link href="/camps" className="text-gray-300 hover:text-[#22C55E]">Camps & Training</Link></li>
              <li><Link href="/philosophy" className="text-gray-300 hover:text-[#22C55E]">Philosophie</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-[#22C55E]">Über Uns</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-[#22C55E]">Kontakt</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Kontakt</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="mr-2 h-4 w-4 shrink-0 text-[#22C55E]" />
                <span className="text-gray-300">
                  ASKÖ Kirchdorf Fußballplatz<br />
                  Ertlstraße 16<br />
                  4560 Kirchdorf an der Krems
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-[#22C55E]" />
                <a href="mailto:jonas.stoeckler@gmx.at" className="text-gray-300 hover:text-[#22C55E]">
                  jonas.stoeckler@gmx.at
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-4 w-4 text-[#22C55E]" />
                <a href="tel:069911798410" className="text-gray-300 hover:text-[#22C55E]">
                  0699 117 984 10
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Folge Uns</h3>
            <div className="flex space-x-4">
              <a href="#" className="rounded-full bg-white/10 p-2 transition-colors hover:bg-[#22C55E]">
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61575646112694" 
                target="_blank" 
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 p-2 transition-colors hover:bg-[#22C55E]"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-3 text-sm text-gray-300">326+ Follower auf Facebook</p>
          </div>
        </div>

        <Separator className="my-8 bg-white/20" />

        <div className="flex flex-col items-center justify-between space-y-4 text-center text-sm text-gray-400 md:flex-row md:space-y-0 md:text-left">
          <p>&copy; {new Date().getFullYear()} Kabashi-Stöckler Fussballschule. Alle Rechte vorbehalten.</p>
          <div className="flex space-x-6">
            <Link href="/impressum" className="hover:text-[#22C55E]">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-[#22C55E]">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

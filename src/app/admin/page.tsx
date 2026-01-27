"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Users, Calendar, MessageSquare, Phone, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    hero: false,
    coaches: false,
    camps: false,
    testimonials: false,
    contact: false,
    gallery: false,
  });

  useEffect(() => {
    // Check which sections have custom content
    const checkContent = async () => {
      const sections = ["hero", "coaches", "camps", "testimonials", "contact", "gallery"];
      const newStats: typeof stats = { ...stats };

      for (const section of sections) {
        try {
          const response = await fetch(`/api/admin/content/${section}`);
          if (response.ok) {
            const data = await response.json();
            newStats[section as keyof typeof stats] = data.data !== null;
          }
        } catch (error) {
          console.error(`Error checking ${section}:`, error);
        }
      }

      setStats(newStats);
    };

    checkContent();
  }, []);

  const sections = [
    {
      href: "/admin/startseite",
      label: "Startseite",
      icon: Home,
      hasContent: stats.hero,
      description: "Hero, Mission, Social Proof",
    },
    {
      href: "/admin/trainer",
      label: "Trainer",
      icon: Users,
      hasContent: stats.coaches,
      description: "Trainer-Biografien & Fotos",
    },
    {
      href: "/admin/camps",
      label: "Camps",
      icon: Calendar,
      hasContent: stats.camps,
      description: "Camp-Details & Termine",
    },
    {
      href: "/admin/stimmen",
      label: "Stimmen",
      icon: MessageSquare,
      hasContent: stats.testimonials,
      description: "Testimonials & Bewertungen",
    },
    {
      href: "/admin/kontakt",
      label: "Kontakt & FAQ",
      icon: Phone,
      hasContent: stats.contact,
      description: "Kontaktdaten & FAQs",
    },
    {
      href: "/admin/galerie",
      label: "Galerie",
      icon: ImageIcon,
      hasContent: stats.gallery,
      description: "Bildergalerie verwalten",
    },
  ];

  return (
    <div>
      <h1 className="mb-8 text-3xl font-black text-[#003399]">Dashboard Übersicht</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link key={section.href} href={section.href}>
              <Card className="transition-transform hover:scale-105 hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Icon className="h-8 w-8 text-[#003399]" />
                    {section.hasContent && (
                      <span className="rounded-full bg-[#22C55E] px-2 py-1 text-xs font-bold text-white">
                        Aktiv
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-xl">{section.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{section.description}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

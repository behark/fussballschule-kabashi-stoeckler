"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SaveButton } from "@/components/admin/SaveButton";
import { ImageUpload } from "@/components/admin/ImageUpload";
import type { HeroContent, MissionContent, SocialProofContent } from "@/lib/content";

export default function StartseitePage() {
  const [hero, setHero] = useState<HeroContent | null>(null);
  const [mission, setMission] = useState<MissionContent | null>(null);
  const [socialProof, setSocialProof] = useState<SocialProofContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const [heroRes, missionRes, socialRes] = await Promise.all([
        fetch("/api/admin/content/hero"),
        fetch("/api/admin/content/mission"),
        fetch("/api/admin/content/socialProof"),
      ]);

      if (heroRes.ok) {
        const data = await heroRes.json();
        setHero(data.data || {
          badge: "🏆 Dein Fußball-Traum wird Realität! 🌟",
          headline: "FÜR ALLE DIE\nBESSER WERDEN\nWOLLEN.",
          subtext: "Die Kabashi-Stöckler Fussballschule bietet professionelles Training für junge Talente. Technik, Koordination und Power - alles was du brauchst, um dein Spiel auf das nächste Level zu bringen.",
          image: "/images/trainer-team.jpg",
        });
      }

      if (missionRes.ok) {
        const data = await missionRes.json();
        setMission(data.data || {
          title: "UNSERE MISSION",
          text: "Wir glauben daran, dass jedes Kind das Potenzial hat, ein großartiger Fußballer zu werden. Unsere Mission ist es, durch qualitativ hochwertiges Training und echte Fußball-Leidenschaft junge Talente zu fördern und zu inspirieren. Bei uns lernt ihr nicht nur Fußball - ihr entwickelt euch als Sportler und als Person.",
        });
      }

      if (socialRes.ok) {
        const data = await socialRes.json();
        setSocialProof(data.data || {
          stats: [
            { value: "326+", label: "Facebook Follower", icon: "ThumbsUp" },
            { value: "33+", label: "Aktive Community", icon: "MessageCircle" },
            { value: "100%", label: "Zufriedenheit", icon: "Star" },
          ],
          facebookUrl: "https://www.facebook.com/profile.php?id=61575646112694",
        });
      }
    } catch (error) {
      console.error("Error loading content:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveHero = async () => {
    if (!hero) return;
    await fetch("/api/admin/content/hero", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: hero }),
    });
  };

  const saveMission = async () => {
    if (!mission) return;
    await fetch("/api/admin/content/mission", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: mission }),
    });
  };

  const saveSocialProof = async () => {
    if (!socialProof) return;
    await fetch("/api/admin/content/socialProof", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: socialProof }),
    });
  };

  if (loading) {
    return <div>Lädt...</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-black text-[#003399]">Startseite bearbeiten</h1>

      {/* Hero Section */}
      <Card>
        <CardHeader>
          <CardTitle>Hero-Bereich</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Badge-Text</label>
            <Input
              value={hero?.badge || ""}
              onChange={(e) => setHero({ ...hero!, badge: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Überschrift (Zeilenumbrüche mit \n)</label>
            <Textarea
              value={hero?.headline || ""}
              onChange={(e) => setHero({ ...hero!, headline: e.target.value })}
              rows={3}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Untertitel</label>
            <Textarea
              value={hero?.subtext || ""}
              onChange={(e) => setHero({ ...hero!, subtext: e.target.value })}
              rows={3}
            />
          </div>
          <ImageUpload
            value={hero?.image}
            onChange={(url) => setHero({ ...hero!, image: url })}
            label="Hero-Bild"
          />
          <SaveButton onSave={saveHero} />
        </CardContent>
      </Card>

      {/* Mission Section */}
      <Card>
        <CardHeader>
          <CardTitle>Mission Statement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Titel</label>
            <Input
              value={mission?.title || ""}
              onChange={(e) => setMission({ ...mission!, title: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Text</label>
            <Textarea
              value={mission?.text || ""}
              onChange={(e) => setMission({ ...mission!, text: e.target.value })}
              rows={5}
            />
          </div>
          <SaveButton onSave={saveMission} />
        </CardContent>
      </Card>

      {/* Social Proof Section */}
      <Card>
        <CardHeader>
          <CardTitle>Social Proof (Statistiken)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Facebook URL</label>
            <Input
              value={socialProof?.facebookUrl || ""}
              onChange={(e) => setSocialProof({ ...socialProof!, facebookUrl: e.target.value })}
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-medium">Statistiken</label>
            {socialProof?.stats.map((stat, index) => (
              <div key={index} className="grid grid-cols-3 gap-2">
                <Input
                  placeholder="Wert (z.B. 326+)"
                  value={stat.value}
                  onChange={(e) => {
                    const newStats = [...socialProof.stats];
                    newStats[index] = { ...stat, value: e.target.value };
                    setSocialProof({ ...socialProof, stats: newStats });
                  }}
                />
                <Input
                  placeholder="Label"
                  value={stat.label}
                  onChange={(e) => {
                    const newStats = [...socialProof.stats];
                    newStats[index] = { ...stat, label: e.target.value };
                    setSocialProof({ ...socialProof, stats: newStats });
                  }}
                />
                <Input
                  placeholder="Icon (z.B. ThumbsUp)"
                  value={stat.icon}
                  onChange={(e) => {
                    const newStats = [...socialProof.stats];
                    newStats[index] = { ...stat, icon: e.target.value };
                    setSocialProof({ ...socialProof, stats: newStats });
                  }}
                />
              </div>
            ))}
          </div>
          <SaveButton onSave={saveSocialProof} />
        </CardContent>
      </Card>
    </div>
  );
}

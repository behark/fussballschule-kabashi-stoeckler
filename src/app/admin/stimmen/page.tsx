"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SaveButton } from "@/components/admin/SaveButton";
import { Plus, Trash2 } from "lucide-react";
import type { TestimonialContent } from "@/lib/content";

export default function StimmenPage() {
  const [testimonials, setTestimonials] = useState<TestimonialContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const response = await fetch("/api/admin/content/testimonials");
      if (response.ok) {
        const data = await response.json();
        setTestimonials(
          data.data || [
            {
              quote:
                "Mein Sohn hat in nur einem Camp so viel gelernt! Die Trainer sind super motiviert und gehen auf jedes Kind individuell ein.",
              author: "Maria S.",
              stars: 5,
            },
            {
              quote:
                "Professionelles Training in familiärer Atmosphäre. Die Kinder haben Spaß und werden gleichzeitig gefordert. Top!",
              author: "Thomas K.",
              stars: 5,
            },
            {
              quote:
                "Die beste Fußballschule in der Region! Meine Tochter freut sich jedes Mal auf das Training.",
              author: "Sandra H.",
              stars: 5,
            },
          ]
        );
      }
    } catch (error) {
      console.error("Error loading content:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async () => {
    await fetch("/api/admin/content/testimonials", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: testimonials }),
    });
  };

  const addTestimonial = () => {
    setTestimonials([
      ...testimonials,
      {
        quote: "",
        author: "",
        stars: 5,
      },
    ]);
  };

  const removeTestimonial = (index: number) => {
    setTestimonials(testimonials.filter((_, i) => i !== index));
  };

  if (loading) {
    return <div>Lädt...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-[#003399]">Stimmen bearbeiten</h1>
        <Button onClick={addTestimonial} className="bg-[#22C55E] hover:bg-[#16a34a]">
          <Plus className="mr-2 h-4 w-4" />
          Testimonial hinzufügen
        </Button>
      </div>

      <div className="space-y-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Testimonial {index + 1}</CardTitle>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeTestimonial(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Zitat</label>
                <Textarea
                  value={testimonial.quote}
                  onChange={(e) => {
                    const newTestimonials = [...testimonials];
                    newTestimonials[index].quote = e.target.value;
                    setTestimonials(newTestimonials);
                  }}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Autor</label>
                  <Input
                    value={testimonial.author}
                    onChange={(e) => {
                      const newTestimonials = [...testimonials];
                      newTestimonials[index].author = e.target.value;
                      setTestimonials(newTestimonials);
                    }}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Sterne (1-5)</label>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    value={testimonial.stars}
                    onChange={(e) => {
                      const newTestimonials = [...testimonials];
                      newTestimonials[index].stars = parseInt(e.target.value) || 5;
                      setTestimonials(newTestimonials);
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <SaveButton onSave={saveContent} />
    </div>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2 } from "lucide-react";

interface SaveButtonProps {
  onSave: () => Promise<void>;
  disabled?: boolean;
}

export function SaveButton({ onSave, disabled }: SaveButtonProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSave = async () => {
    setStatus("loading");
    try {
      await onSave();
      setStatus("success");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (error) {
      setStatus("idle");
      console.error("Save error:", error);
    }
  };

  return (
    <Button
      onClick={handleSave}
      disabled={disabled || status === "loading"}
      className="bg-[#22C55E] hover:bg-[#16a34a]"
    >
      {status === "loading" ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Wird gespeichert...
        </>
      ) : status === "success" ? (
        <>
          <CheckCircle2 className="mr-2 h-4 w-4" />
          Gespeichert!
        </>
      ) : (
        "Speichern"
      )}
    </Button>
  );
}

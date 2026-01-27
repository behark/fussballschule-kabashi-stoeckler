"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History, RotateCcw, Loader2 } from "lucide-react";

interface Backup {
  timestamp: number;
  data: any;
}

interface BackupRestoreProps {
  section: string;
}

export function BackupRestore({ section }: BackupRestoreProps) {
  const [backups, setBackups] = useState<Backup[]>([]);
  const [loading, setLoading] = useState(false);
  const [restoring, setRestoring] = useState<number | null>(null);

  useEffect(() => {
    loadBackups();
  }, [section]);

  const loadBackups = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/backup/${section}`);
      if (response.ok) {
        const data = await response.json();
        setBackups(data.backups || []);
      }
    } catch (error) {
      console.error("Error loading backups:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (timestamp: number) => {
    if (!confirm("Möchten Sie wirklich diese Version wiederherstellen? Die aktuelle Version wird überschrieben.")) {
      return;
    }

    setRestoring(timestamp);
    try {
      const response = await fetch(`/api/admin/backup/${section}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ timestamp }),
      });

      if (response.ok) {
        alert("Backup erfolgreich wiederhergestellt! Bitte laden Sie die Seite neu.");
        window.location.reload();
      } else {
        const error = await response.json();
        alert(`Fehler: ${error.error || "Wiederherstellung fehlgeschlagen"}`);
      }
    } catch (error) {
      console.error("Error restoring backup:", error);
      alert("Fehler beim Wiederherstellen des Backups");
    } finally {
      setRestoring(null);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Backups
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (backups.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Backups
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            Noch keine Backups verfügbar. Backups werden automatisch erstellt, wenn Sie Inhalte speichern.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Backups ({backups.length})
        </CardTitle>
        <p className="text-sm text-gray-600">
          Die letzten 5 Versionen werden automatisch gespeichert
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {backups.map((backup) => (
            <div
              key={backup.timestamp}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div>
                <p className="font-medium">{formatDate(backup.timestamp)}</p>
                <p className="text-xs text-gray-500">
                  {backup.timestamp === backups[0]?.timestamp && "Neueste Version"}
                </p>
              </div>
              <Button
                onClick={() => handleRestore(backup.timestamp)}
                disabled={restoring === backup.timestamp}
                variant="outline"
                size="sm"
              >
                {restoring === backup.timestamp ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Wiederherstellen...
                  </>
                ) : (
                  <>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Wiederherstellen
                  </>
                )}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

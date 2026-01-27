"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Home, Users, Calendar, MessageSquare, Phone, Image as ImageIcon, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/admin", label: "Übersicht", icon: LayoutDashboard },
  { href: "/admin/startseite", label: "Startseite", icon: Home },
  { href: "/admin/trainer", label: "Trainer", icon: Users },
  { href: "/admin/camps", label: "Camps", icon: Calendar },
  { href: "/admin/stimmen", label: "Stimmen", icon: MessageSquare },
  { href: "/admin/kontakt", label: "Kontakt & FAQ", icon: Phone },
  { href: "/admin/galerie", label: "Galerie", icon: ImageIcon },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-gray-50">
      <div className="border-b bg-[#003399] p-6">
        <h1 className="text-xl font-black text-white">Admin Dashboard</h1>
        <p className="text-sm text-gray-300">Fussballschule</p>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#003399] text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t p-4">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full justify-start"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Abmelden
        </Button>
      </div>
    </div>
  );
}

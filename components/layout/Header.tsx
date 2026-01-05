"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";
import { CurrencyToggle } from "./CurrencyToggle";
import { LogOut, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useExpenses } from "@/components/providers/ExpenseProvider";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export function Header() {
  const { t } = useLanguage();
  const { user } = useExpenses();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <header className="border-b bg-card text-card-foreground shadow-sm sticky top-0 z-10 transition-colors">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-lg md:text-xl text-primary flex items-center gap-2"
        >
          <span>💰</span>
          <span className="hidden sm:inline">{t.common.appName}</span>
          <span className="sm:hidden">
            {t.common.appName === "مصاريفي" ? "مصاريفي" : "Exp"}
          </span>
        </Link>
        <div className="flex items-center gap-1 md:gap-2">
          <CurrencyToggle />
          <ThemeToggle />
          <LanguageToggle />
          <div className="w-px h-6 bg-border mx-1" />

          {user ? (
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2 text-sm font-medium bg-muted/50 px-3 py-1.5 rounded-full border border-border/50">
                <UserIcon className="h-4 w-4 text-primary" />
                <span className="max-w-[150px] truncate">
                  {user.user_metadata?.full_name || user.email?.split("@")[0]}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 rounded-full hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                onClick={handleLogout}
                title={t.common.logout}
              >
                <LogOut className="h-4 w-4" />
                <span className="sr-only">{t.common.logout}</span>
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button variant="default" size="sm">
                {t.common.login || "Login"}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

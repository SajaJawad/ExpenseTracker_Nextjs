"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { dictionaries, Locale, Direction } from "@/lib/i18n/dictionaries";

interface LanguageContextType {
  locale: Locale;
  direction: Direction;
  t: (typeof dictionaries)["en"];
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en"); // Default to English as requested

  useEffect(() => {
    // Persist language preference
    const saved = localStorage.getItem("locale") as Locale;
    if (saved && (saved === "ar" || saved === "en")) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
    // Update HTML dir attribute for proper layout mirroring
    document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLocale;
  };

  const direction: Direction = locale === "ar" ? "rtl" : "ltr";
  const t = dictionaries[locale];

  return (
    <LanguageContext.Provider value={{ locale, direction, t, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

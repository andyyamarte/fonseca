"use client";

import React from "react";
import { Languages, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSitePreferences } from "./SitePreferencesContext";

export function PreferencesToggle({ compact = false }: { compact?: boolean }) {
  const { language, theme, toggleLanguage, toggleTheme, t } = useSitePreferences();

  return (
    <div className="flex items-center gap-1.5">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={toggleLanguage}
        aria-label={t("preferences.language")}
        title={t("preferences.language")}
        className="h-9 gap-1.5 border-white/20 bg-white/10 px-2.5 text-white hover:bg-white/20 hover:text-white dark:border-white/15 dark:bg-white/5 cursor-pointer"
      >
        <Languages className="size-4 text-sky-300" />
        <span className="font-mono text-[11px] font-bold tracking-wider">
          {language.toUpperCase()}
        </span>
      </Button>

      <Button
        type="button"
        variant="outline"
        size="icon-lg"
        onClick={toggleTheme}
        aria-label={t("preferences.theme")}
        title={t("preferences.theme")}
        className={`size-9 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white dark:border-white/15 dark:bg-white/5 cursor-pointer ${
          compact ? "" : ""
        }`}
      >
        {theme === "dark" ? (
          <Sun className="size-4 text-amber-300" />
        ) : (
          <Moon className="size-4 text-sky-300" />
        )}
      </Button>
    </div>
  );
}

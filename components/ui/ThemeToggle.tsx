"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";

type Theme = "light" | "dark";

// The inline script in app/layout.tsx sets data-theme before first paint;
// this only reads it back and flips it.
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "dark" : "light");
  }, []);

  if (!siteConfig.theme.toggleEnabled) return null;

  const next: Theme = theme === "dark" ? "light" : "dark";

  const toggle = () => {
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    setTheme(next);
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      style={theme ? undefined : { visibility: "hidden" }}
    >
      {next === "dark" ? "Dark" : "Light"}
    </button>
  );
}

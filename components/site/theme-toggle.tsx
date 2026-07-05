"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("novitas-theme") || window.localStorage.getItem("theme");
    const shouldDark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", shouldDark);
    document.documentElement.dataset.theme = shouldDark ? "dark" : "light";
    setDark(shouldDark);
  }, []);

  function toggle() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    window.localStorage.setItem("novitas-theme", next ? "dark" : "light");
    window.localStorage.setItem("theme", next ? "dark" : "light");
    setDark(next);
  }

  return (
    <Button variant="ghost" size="icon" type="button" onClick={toggle} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}>
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}

"use client";

import { useLayoutEffect } from "react";
import { THEME_KEY } from "@/lib/theme";
import { cx } from "./ui";

function readStored() {
  try {
    const t = localStorage.getItem(THEME_KEY);
    return t === "light" || t === "dark" ? t : null;
  } catch {
    return null;
  }
}

/**
 * Follows the system theme until clicked. A click sets an override; clicking
 * back to the system's theme clears it, so the site follows the system again.
 * The icon is switched by CSS (see globals.css), so it is right before hydration.
 */
export function ThemeToggle({ className }: { className?: string }) {
  // React's dev-mode remount clears attributes on <html>; put the override back.
  useLayoutEffect(() => {
    const stored = readStored();
    if (stored) document.documentElement.setAttribute("data-theme", stored);
  }, []);

  function toggle() {
    const root = document.documentElement;
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const current = root.getAttribute("data-theme") ?? (systemDark ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    const followsSystem = (next === "dark") === systemDark;
    try {
      if (followsSystem) localStorage.removeItem(THEME_KEY);
      else localStorage.setItem(THEME_KEY, next);
    } catch {
      // Storage unavailable: the choice lasts for this page view only.
    }
    if (followsSystem) root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      className={cx(
        "grid size-10 place-items-center rounded-md border border-line bg-surface text-ink transition-colors hover:border-ink/40",
        className,
      )}
    >
      {/* Moon, shown in light mode. */}
      <svg aria-hidden viewBox="0 0 20 20" fill="none" className="theme-icon-light size-[18px]">
        <path
          d="M16.5 12.2A6.8 6.8 0 0 1 7.8 3.5a6.8 6.8 0 1 0 8.7 8.7Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      {/* Sun, shown in dark mode. */}
      <svg aria-hidden viewBox="0 0 20 20" fill="none" className="theme-icon-dark size-[18px]">
        <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M10 1.75v2M10 16.25v2M1.75 10h2M16.25 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M4.2 15.8l1.4-1.4M14.4 5.6l1.4-1.4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import type { LinkItem } from "@/content/site";
import { ButtonLink } from "./ui";

export function MobileMenu({ items, cta }: { items: LinkItem[]; cta: LinkItem }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="grid size-10 place-items-center rounded-md border border-line bg-surface text-ink lg:hidden"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <svg aria-hidden viewBox="0 0 20 20" fill="none" className="size-[18px]">
          {open ? (
            <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          ) : (
            <path d="M3 6.5h14M3 13.5h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          )}
        </svg>
      </button>

      {open && (
        <div id={panelId} className="menu-in absolute inset-x-0 top-full border-b border-line bg-bg lg:hidden">
          <nav aria-label="Mobile" className="px-4 pt-2 pb-5 sm:px-6">
            <ul>
              {items.map((item) => (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3.5 font-display text-lg font-semibold text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ButtonLink href={cta.href} external className="mt-5 w-full">
              {cta.label}
            </ButtonLink>
          </nav>
        </div>
      )}
    </>
  );
}

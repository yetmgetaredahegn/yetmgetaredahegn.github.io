"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, cx } from "./ui";

/** The email as selectable text, plus a button that copies it. */
export function CopyEmail({ email, className }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  // Only animate the label once it has changed, not on first render.
  const [used, setUsed] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Clipboard API blocked: select the text so the visitor can copy it by hand.
      const node = textRef.current;
      const selection = window.getSelection();
      if (!node || !selection) return;
      const range = document.createRange();
      range.selectNodeContents(node);
      selection.removeAllRanges();
      selection.addRange(range);
      return;
    }
    setCopied(true);
    setUsed(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className={cx(
        "flex flex-wrap items-center gap-x-3 gap-y-2 rounded-md border border-line bg-bg py-1.5 pr-1.5 pl-3",
        className,
      )}
    >
      <span ref={textRef} className="min-w-0 flex-auto font-mono text-[15px] [overflow-wrap:anywhere] text-ink select-all">
        {email}
      </span>
      <button
        type="button"
        onClick={copy}
        className="inline-flex h-9 min-w-[7.5rem] shrink-0 items-center justify-center rounded-[5px] border border-line bg-surface px-3 text-sm font-medium text-ink transition-colors hover:border-ink/40"
      >
        {/* Keyed so the label's swap-in animation replays on each change. */}
        <span key={copied ? "copied" : "copy"} className={cx("inline-flex items-center gap-1.5", used && "swap-in")}>
          {copied ? (
            <>
              <CheckIcon className="size-3.5 text-pass" />
              Copied
            </>
          ) : (
            "Copy email"
          )}
        </span>
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Email address copied" : ""}
      </span>
    </div>
  );
}

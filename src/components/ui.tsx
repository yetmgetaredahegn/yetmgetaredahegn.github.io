import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { Status } from "@/content/site";

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("mx-auto w-full max-w-[80rem] px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

/** Renders `backtick` spans in content strings as inline code. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("`") && part.endsWith("`") && part.length > 1 ? (
          <code
            key={i}
            className="rounded-[3px] border border-line bg-bg px-1 py-px font-mono text-[0.86em] break-words"
          >
            {part.slice(1, -1)}
          </code>
        ) : (
          part
        ),
      )}
    </>
  );
}

/** Mono label with a small square marker, used above section titles. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cx(
        "flex items-center gap-2 font-mono text-xs font-medium tracking-[0.08em] text-muted uppercase",
        className,
      )}
    >
      <span aria-hidden className="size-1.5 shrink-0 bg-accent" />
      {children}
    </p>
  );
}

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-[4px] border border-line bg-bg px-2 py-0.5 font-mono text-[12.5px] leading-5 text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function ChipList({ items, label, className }: { items: string[]; label: string; className?: string }) {
  return (
    <ul aria-label={label} className={cx("flex flex-wrap gap-1.5", className)}>
      {items.map((item) => (
        <li key={item}>
          <Chip>{item}</Chip>
        </li>
      ))}
    </ul>
  );
}

export function StatusChip({ status }: { status: Status }) {
  const ongoing = status === "Ongoing";
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-[4px] border px-2 py-0.5 font-mono text-[12.5px] leading-5",
        ongoing ? "border-accent/40 bg-accent-soft text-accent" : "border-line bg-surface text-ink",
      )}
    >
      {ongoing ? (
        <span aria-hidden className="size-1.5 rounded-full bg-accent" />
      ) : (
        <CheckIcon className="size-3.5" />
      )}
      <span className="sr-only">Status: </span>
      {status}
    </span>
  );
}

export function PrivateBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-[4px] border border-line bg-surface px-2 py-0.5 font-mono text-[12.5px] leading-5 text-ink">
      <LockIcon className="size-3.5" />
      Private client repository
    </span>
  );
}

type ButtonLinkProps = ComponentPropsWithoutRef<"a"> & {
  variant?: "primary" | "secondary";
  size?: "md" | "sm";
  external?: boolean;
  /** Icon for internal links: "down" for on-page jumps, "right" for other pages. */
  icon?: "down" | "right";
};

/** Button look (see `.btn` in globals.css), for anchors and Next.js links alike. */
export function buttonClasses(variant: "primary" | "secondary" = "primary", size: "md" | "sm" = "md") {
  return cx("btn", variant === "primary" ? "btn-primary" : "btn-secondary", size === "md" ? "btn-md" : "btn-sm");
}

/**
 * Anchor styled as a button. `external` opens in a new tab and says so to
 * screen readers. At the default size the icon sits in its own chip, which
 * animates on hover.
 */
export function ButtonLink({
  variant = "primary",
  size = "md",
  external,
  icon,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const Icon = external ? ExternalIcon : icon === "down" ? ArrowDownIcon : icon === "right" ? ArrowRightIcon : null;
  return (
    <a
      className={cx(buttonClasses(variant, size), className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
      {Icon &&
        (size === "md" ? (
          <span aria-hidden className="btn-icon">
            <Icon className={cx("size-4", icon === "down" && "icon-down")} />
          </span>
        ) : (
          <Icon className="size-3.5 opacity-80" />
        ))}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}

type IconProps = { className?: string };

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M2.5 8h10M9 4.5 12.5 8 9 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowLeftIcon({ className }: IconProps) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M13.5 8h-10M7 4.5 3.5 8 7 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowDownIcon({ className }: IconProps) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M8 2.5v10M4.5 9 8 12.5 11.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ExternalIcon({ className }: IconProps) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M5.5 3.5h7v7M12.5 3.5l-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" fill="none" className={className}>
      <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LockIcon({ className }: IconProps) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" fill="none" className={className}>
      <rect x="3.5" y="7" width="9" height="6.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/** Three nodes joined by a line, the last one green: the site's mark. */
export function Mark({ className }: IconProps) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className}>
      <path d="M5 12h14" stroke="var(--line)" strokeWidth="2" />
      <circle cx="5" cy="12" r="3" fill="var(--accent)" />
      <circle cx="12" cy="12" r="3" fill="var(--accent)" />
      <circle cx="19" cy="12" r="3.5" fill="var(--pass)" />
    </svg>
  );
}

import { site } from "@/content/site";
import { Container, ExternalIcon, Mark } from "./ui";

const profiles = [
  { label: "Upwork", href: site.links.upwork },
  { label: "LinkedIn", href: site.links.linkedin },
  { label: "GitHub", href: site.links.github },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col gap-8 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="flex items-center gap-2.5 font-display text-[17px] font-semibold text-ink">
            <Mark className="size-6 shrink-0" />
            {site.name}
          </p>
          <p className="mt-2 text-sm text-muted">
            {site.role} · {site.availability}
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {profiles.map((p) => (
            <li key={p.label}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-muted transition-colors hover:text-ink"
              >
                {p.label}
                <ExternalIcon className="size-3" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}

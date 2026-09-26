import Link from "next/link";
import { site } from "@/content/site";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";
import { ButtonLink, Container, Mark } from "./ui";

const cta = { label: "Hire me", href: site.links.upwork };

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/95">
      <Container className="relative flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex min-w-0 items-center gap-2.5 rounded-sm">
          <Mark className="size-6 shrink-0" />
          <span className="truncate font-display text-[17px] font-semibold tracking-[-0.01em] text-ink">
            {site.name}
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-[15px] text-muted transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <div className="hidden lg:block">
            <ButtonLink href={cta.href} external size="sm">
              {cta.label}
            </ButtonLink>
          </div>
          <MobileMenu items={site.nav} cta={{ label: site.hero.primaryCta.label, href: cta.href }} />
        </div>
      </Container>
    </header>
  );
}

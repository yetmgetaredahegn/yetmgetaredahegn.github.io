import { site } from "@/content/site";
import { Container } from "./ui";

export function ProofStrip() {
  return (
    <section aria-label="Highlights" className="border-t border-line">
      <Container>
        {/* The 1px gaps show the line colour through, drawing hairlines between cells. */}
        <ul className="grid gap-px bg-line sm:-mx-6 sm:grid-cols-2 lg:grid-cols-4">
          {site.proof.map((item) => (
            <li key={item.title} className="bg-bg py-6 sm:px-6 lg:py-8">
              <p className="font-display text-lg leading-snug font-semibold text-ink">{item.title}</p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{item.detail}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

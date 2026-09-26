import type { Metadata } from "next";
import Link from "next/link";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { Container, buttonClasses } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="py-16 sm:py-24">
      <Container className="max-w-3xl">
        <p className="font-mono text-[13px] font-medium text-muted">status: 404 · no matching route</p>
        <h1 id="nf-title" className="mt-4 text-[2.5rem] leading-[1.05] font-semibold tracking-[-0.03em] sm:text-6xl">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          The link may be old, or the address mistyped. Everything on this site is one click from the home page.
        </p>
        <ArchitectureDiagram
          className="canvas-grid mt-10 rounded-lg border border-line p-4 sm:p-6"
          nodes={[{ label: "Your request" }, { label: "Route lookup" }, { label: "No match" }]}
        />
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className={buttonClasses("primary")}>
            Back to home
          </Link>
          <Link href="/#work" className={buttonClasses("secondary")}>
            See my work
          </Link>
        </div>
      </Container>
    </section>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";
import { getNextCaseStudy, type CaseStudy } from "@/content/site";
import { ArchitectureDiagram, DiagramLegend } from "./ArchitectureDiagram";
import { Contact } from "./Contact";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  ChipList,
  Container,
  ExternalIcon,
  PrivateBadge,
  Rich,
  StatusChip,
  cx,
} from "./ui";

function CaseSection({ id, title, wide, children }: { id: string; title: string; wide?: boolean; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-line py-12 sm:py-16">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <h2 id={id} className="text-2xl leading-tight font-semibold tracking-[-0.02em] lg:col-span-3">
            {title}
          </h2>
          <div className={wide ? "lg:col-span-12" : "max-w-3xl lg:col-span-9"}>{children}</div>
        </div>
      </Container>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="relative pl-5 text-[17px] leading-relaxed text-ink">
          <span aria-hidden className="absolute top-[0.62em] left-0 size-1.5 bg-accent" />
          <Rich text={item} />
        </li>
      ))}
    </ul>
  );
}

function MetaRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-2 border-b border-line py-4 first:pt-0 last:border-b-0 last:pb-0">
      <dt className="font-mono text-xs font-medium tracking-[0.08em] text-muted uppercase">{label}</dt>
      <dd className="text-[15px] text-ink">{children}</dd>
    </div>
  );
}

export function CaseStudyLayout({ study }: { study: CaseStudy }) {
  const next = getNextCaseStudy(study.slug);
  const hasPass = study.architecture.some((d) => d.pass || d.nodes.some((n) => n.pass));

  return (
    <article>
      <header className="pt-8 pb-12 sm:pt-10 lg:pb-16">
        <Container>
          <Link
            href="/#work"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
          >
            <ArrowLeftIcon className="size-4" />
            All work
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
              <p className="font-mono text-[13px] text-muted">{study.context}</p>
              <h1 className="mt-4 text-[2.25rem] leading-[1.05] font-semibold tracking-[-0.03em] sm:text-5xl lg:text-[3.5rem]">
                {study.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">{study.oneLiner}</p>
            </div>

            <dl className="self-end rounded-lg border border-line bg-surface p-5 lg:col-span-4">
              <MetaRow label="Role">{study.role}</MetaRow>
              {study.status && (
                <MetaRow label="Status">
                  <StatusChip status={study.status} />
                </MetaRow>
              )}
              {(study.privateRepo || study.codeUrl) && (
                <MetaRow label="Code">
                  {study.codeUrl ? (
                    <a
                      href={study.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-accent"
                    >
                      View code
                      <ExternalIcon className="size-3.5" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    <PrivateBadge />
                  )}
                </MetaRow>
              )}
              <MetaRow label="Stack">
                <ChipList items={study.stack} label="Stack" />
              </MetaRow>
            </dl>
          </div>
        </Container>
      </header>

      <CaseSection id="problem" title="The problem">
        <div className="space-y-5">
          {study.problem.paragraphs.map((p) => (
            <p key={p} className="text-[17px] leading-relaxed text-ink">
              <Rich text={p} />
            </p>
          ))}
          {study.problem.bullets && (
            <ul className="space-y-3 border-l-2 border-line pl-5">
              {study.problem.bullets.map((b) => (
                <li key={b} className="text-[17px] leading-relaxed text-muted">
                  <Rich text={b} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </CaseSection>

      <CaseSection id="built" title="What I built">
        <ul className="divide-y divide-line border-y border-line">
          {study.built.map((item) => (
            <li
              key={item.text}
              className={cx("py-5", item.lead && "grid gap-1.5 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-6")}
            >
              {item.lead && (
                <h3 className="font-sans text-[17px] leading-relaxed font-semibold text-ink">{item.lead}</h3>
              )}
              <p className={cx("text-[17px] leading-relaxed", item.lead ? "text-muted" : "text-ink")}>
                <Rich text={item.text} />
              </p>
            </li>
          ))}
        </ul>
      </CaseSection>

      <CaseSection id="architecture" title="Architecture" wide>
        <figure>
          <div className="overflow-hidden rounded-lg border border-line bg-surface">
            {study.architecture.map((d) => (
              <ArchitectureDiagram
                key={d.label ?? "main"}
                nodes={d.nodes}
                label={d.label}
                pass={d.pass}
                className="canvas-grid border-b border-line p-4 last:border-b-0 sm:p-6"
              />
            ))}
          </div>
          {hasPass && (
            <figcaption className="mt-4">
              <DiagramLegend />
            </figcaption>
          )}
        </figure>
      </CaseSection>

      <CaseSection id="highlights" title="Engineering highlights">
        <Bullets items={study.highlights} />
      </CaseSection>

      {study.results && (
        <CaseSection id="results" title="Results & verification">
          <ul className="space-y-3">
            {study.results.map((r) => (
              <li key={r} className="flex gap-3 text-[17px] leading-relaxed text-ink">
                <span className="mt-[0.3em] grid size-5 shrink-0 place-items-center rounded-full bg-pass text-on-fill">
                  <CheckIcon className="size-3.5" />
                </span>
                <span>
                  <Rich text={r} />
                </span>
              </li>
            ))}
          </ul>
        </CaseSection>
      )}

      <Contact />

      <nav aria-label="Next project" className="pb-16 sm:pb-20">
        <Container>
          <Link
            href={`/work/${next.slug}/`}
            className="group flex items-center justify-between gap-6 rounded-lg border border-line bg-surface p-5 transition-colors hover:border-ink/30 sm:p-8"
          >
            <span className="min-w-0">
              <span className="block font-mono text-xs font-medium tracking-[0.08em] text-muted uppercase">
                Next project
              </span>
              <span className="mt-2 block font-display text-2xl leading-tight font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
                {next.title}
              </span>
              <span className="mt-1.5 block text-[15px] text-muted">{next.context}</span>
            </span>
            <ArrowRightIcon className="size-6 shrink-0 text-accent transition-transform duration-150 group-hover:translate-x-1" />
          </Link>
        </Container>
      </nav>
    </article>
  );
}

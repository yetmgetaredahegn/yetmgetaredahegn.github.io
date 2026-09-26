import type { ReactNode } from "react";
import { site } from "@/content/site";
import { PipelineCard, type ShowcasePanel } from "./PipelineCard";
import { ButtonLink, CheckIcon, Container } from "./ui";

const { eyebrow, headline, headlineEmphasis, headlineGlyphs, sub, tech, primaryCta, secondaryCta, showcase } =
  site.hero;

// The RAG pipeline first, then each case study's architecture.
const panels: ShowcasePanel[] = [
  { kind: "pipeline", id: "rag", ...site.pipeline },
  ...site.caseStudies.map(
    (study): ShowcasePanel => ({
      kind: "project",
      id: study.slug,
      tab: study.short,
      title: study.title,
      context: study.context,
      status: study.status,
      href: `/work/${study.slug}/`,
      lanes: study.architecture,
    }),
  ),
];

const labels = { ...showcase, passLabel: site.diagram.passLabel };

/* Decorative glyphs set inline in the headline. They scale with the type (em units). */

/** A tiny pipeline: two steps and a green judge, with a pulse running through. */
function PipelineGlyph() {
  return (
    <span aria-hidden className="glyph">
      <svg viewBox="0 0 44 12" className="h-[0.3em] w-[1.15em] overflow-visible">
        <path d="M4 6h36" stroke="var(--line)" strokeWidth="1.5" />
        <circle cx="4" cy="6" r="3" fill="var(--accent)" />
        <circle cx="22" cy="6" r="3" fill="var(--accent)" />
        <circle cx="40" cy="6" r="3.6" fill="var(--pass)" />
        <circle className="glyph-pulse" cx="4" cy="6" r="1.9" fill="var(--accent)" />
      </svg>
    </span>
  );
}

/** The green check that stamps the claim once its underline has drawn. */
function CheckStamp() {
  return (
    <span aria-hidden className="glyph-check">
      <CheckIcon className="size-[0.26em]" />
    </span>
  );
}

const GLYPHS: Record<string, () => ReactNode> = { pipeline: PipelineGlyph };

/** Index of `word` in `text` as a whole word (bounded by spaces or the ends), or -1. */
function findWord(text: string, word: string) {
  for (let at = text.indexOf(word); at !== -1; at = text.indexOf(word, at + 1)) {
    const end = at + word.length;
    if ((at === 0 || text[at - 1] === " ") && (end === text.length || text[end] === " ")) return at;
  }
  return -1;
}

/**
 * The headline with its glyphs placed after their anchor words (see
 * `headlineGlyphs`), the emphasis underlined in green, and a check at the end.
 * Each glyph is kept on the same line as its word.
 */
function Headline() {
  const marks: { at: number; word: string; glyph: ReactNode }[] = [];
  for (const [kind, word] of Object.entries(headlineGlyphs)) {
    const at = findWord(headline, word);
    const Glyph = GLYPHS[kind];
    if (at !== -1 && Glyph) marks.push({ at, word, glyph: <Glyph /> });
  }

  const emphasisAt = headlineEmphasis ? headline.indexOf(headlineEmphasis) : -1;
  if (emphasisAt !== -1) {
    // The last word of the emphasis, plus any trailing punctuation, carries the check.
    const end = emphasisAt + headlineEmphasis.length;
    const tail = /^[.!?]*/.exec(headline.slice(end))?.[0] ?? "";
    marks.push({ at: emphasisAt, word: headline.slice(emphasisAt, end + tail.length), glyph: <CheckStamp /> });
  }
  marks.sort((a, b) => a.at - b.at);

  const out: ReactNode[] = [];
  let cursor = 0;
  marks.forEach(({ at, word, glyph }, i) => {
    if (at < cursor) return;
    out.push(headline.slice(cursor, at));
    const isEmphasis = at === emphasisAt;
    const emphasis = isEmphasis ? headlineEmphasis : "";
    const lastSpace = emphasis.lastIndexOf(" ");
    out.push(
      isEmphasis ? (
        <span key={i}>
          <span className="measure">
            {emphasis.slice(0, lastSpace + 1)}
            <span className="whitespace-nowrap">{emphasis.slice(lastSpace + 1)}</span>
          </span>
          <span className="whitespace-nowrap">
            {word.slice(emphasis.length)}
            {glyph}
          </span>
        </span>
      ) : (
        <span key={i} className="whitespace-nowrap">
          {word}
          {glyph}
        </span>
      ),
    );
    cursor = at + word.length;
  });
  out.push(headline.slice(cursor));
  return <>{out}</>;
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-10 pb-16 sm:pt-16 lg:pt-20 lg:pb-24">
      {/* Faded dot grid: the same canvas the architecture diagrams sit on. */}
      <div aria-hidden className="hero-canvas pointer-events-none absolute inset-0 -z-10" />
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="inline-flex max-w-full items-center gap-2.5 rounded-lg border border-line bg-surface/80 py-1.5 pr-3 pl-2.5 font-mono text-[12.5px] leading-5 font-medium text-muted">
            <span aria-hidden className="live-dot" />
            <span>{eyebrow}</span>
          </p>
          <h1
            id="hero-title"
            className="mt-6 text-[2.6rem] leading-[1.04] font-semibold tracking-[-0.035em] sm:text-6xl lg:text-[4.35rem]"
          >
            <Headline />
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{sub}</p>
          <ul aria-label="Tools I use" className="mt-6 flex flex-wrap font-mono text-[13px] text-ink">
            {tech.map((t, i) => (
              <li key={t} className="whitespace-nowrap">
                {t}
                {i < tech.length - 1 && (
                  <span aria-hidden className="px-2 text-muted">
                    ·
                  </span>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={primaryCta.href} external className="max-sm:w-full">
              {primaryCta.label}
            </ButtonLink>
            <ButtonLink href={secondaryCta.href} variant="secondary" icon="down" className="max-sm:w-full">
              {secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
        {/* Two sheets peek out below the card: one trace in a stack of them. */}
        <div className="relative pb-3 lg:col-span-5">
          <div aria-hidden className="absolute inset-x-8 top-8 bottom-0 rounded-lg border border-line bg-surface/50" />
          <div aria-hidden className="absolute inset-x-4 top-4 bottom-1.5 rounded-lg border border-line bg-surface/80" />
          <div className="card-lift relative">
            <PipelineCard panels={panels} labels={labels} />
          </div>
        </div>
      </Container>
    </section>
  );
}

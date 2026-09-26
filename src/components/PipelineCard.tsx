"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import type { Diagram, DiagramNode, Status } from "@/content/site";
import { ArrowRightIcon, CheckIcon, StatusChip, cx } from "./ui";
import { traceTime, useTrace, type Animate } from "./useTrace";

export type ShowcasePanel =
  | { kind: "pipeline"; id: string; tab: string; title: string; chip: string; steps: DiagramNode[]; caption: string }
  | {
      kind: "project";
      id: string;
      tab: string;
      title: string;
      context: string;
      status?: Status;
      href: string;
      lanes: Diagram[];
    };

export type ShowcaseLabels = {
  label: string;
  pause: string;
  play: string;
  caseStudyLink: string;
  passLabel: string;
};

/**
 * The hero's tabbed trace panel: the RAG pipeline first, then each case study's
 * architecture. Tabs advance on their own (the bar under the active tab shows
 * when), pause on hover, on the pause button, or once the visitor picks a tab,
 * and never advance for reduced motion. Every panel sits in the same grid cell,
 * so the card is always as tall as its tallest panel and switching never
 * shifts the layout.
 */
export function PipelineCard({ panels, labels }: { panels: ShowcasePanel[]; labels: ShowcaseLabels }) {
  const uid = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  // Bumped each time a panel becomes active, to remount it and replay its trace.
  const [runs, setRuns] = useState<number[]>(() => panels.map((_, i) => (i === 0 ? 1 : 0)));
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function select(i: number, byVisitor: boolean) {
    if (byVisitor) setPaused(true);
    if (i === active) return;
    setActive(i);
    setRuns((r) => r.map((n, j) => (j === i ? n + 1 : n)));
  }

  function onTabKey(e: KeyboardEvent<HTMLDivElement>) {
    const last = panels.length - 1;
    const next =
      e.key === "ArrowRight" ? (active === last ? 0 : active + 1)
      : e.key === "ArrowLeft" ? (active === 0 ? last : active - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    select(next, true);
    tabRefs.current[next]?.focus();
  }

  return (
    <div
      ref={rootRef}
      data-paused={paused || !inView || undefined}
      className="showcase overflow-hidden rounded-lg border border-line bg-surface"
    >
      <div className="flex items-stretch border-b border-line bg-bg/60">
        <div role="tablist" aria-label={labels.label} onKeyDown={onTabKey} className="flex min-w-0 flex-1">
          {panels.map((panel, i) => {
            const selected = i === active;
            return (
              <button
                key={panel.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${uid}-tab-${i}`}
                aria-selected={selected}
                aria-controls={`${uid}-panel-${i}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(i, true)}
                className={cx(
                  "relative border-r border-line px-3 py-2.5 font-mono text-xs whitespace-nowrap transition-colors",
                  selected ? "bg-surface font-medium text-ink" : "text-muted hover:text-ink",
                )}
              >
                {panel.tab}
                {selected && (
                  <span
                    key={runs[i]}
                    aria-hidden
                    onAnimationEnd={() => select((active + 1) % panels.length, false)}
                    className="tab-progress absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent"
                  />
                )}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? labels.play : labels.pause}
          title={paused ? labels.play : labels.pause}
          className="grid w-10 shrink-0 place-items-center text-muted transition-colors hover:text-ink motion-reduce:hidden"
        >
          <svg aria-hidden viewBox="0 0 16 16" className="size-3.5" fill="currentColor">
            {paused ? <path d="M5 3.5v9l7-4.5-7-4.5Z" /> : <path d="M4.5 3.5h2.5v9H4.5zM9 3.5h2.5v9H9z" />}
          </svg>
        </button>
      </div>

      <div className="grid">
        {panels.map((panel, i) => {
          const selected = i === active;
          return (
            <div
              key={panel.id}
              role="tabpanel"
              id={`${uid}-panel-${i}`}
              aria-labelledby={`${uid}-tab-${i}`}
              tabIndex={selected ? 0 : -1}
              className={cx(
                "flex flex-col [grid-area:1/1] transition-[opacity,visibility] duration-300 motion-reduce:transition-none",
                selected ? "visible opacity-100" : "invisible opacity-0",
              )}
            >
              {panel.kind === "pipeline" ? (
                <PipelinePanel key={runs[i]} panel={panel} active={selected} />
              ) : (
                <ProjectPanel key={runs[i]} panel={panel} active={selected} labels={labels} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * One row of a trace. A `group` row stands for a whole lane (for example an
 * evaluation loop): its steps are listed inside one green block, marked once.
 */
type TraceRow = { label: string; pass?: boolean; group?: string[] };

/**
 * A run, drawn as numbered steps joined by a line. As the trace moves down, the
 * line fills, a cursor highlights the current step, reached steps turn from
 * muted to ink, and green steps pulse when the trace hits them.
 * `passLabel` is the screen-reader label for green steps (left out for the
 * brief's RAG pipeline, whose judge step is described by its own text).
 */
function TraceList({
  rows,
  active,
  passLabel,
  onRun,
}: {
  rows: TraceRow[];
  active: boolean;
  passLabel?: string;
  /** Extra animations to start with the trace. */
  onRun?: (animate: Animate) => { stop: () => void }[];
}) {
  const listRef = useRef<HTMLOListElement>(null);
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const reached = useTrace(listRef, rows.length, active, {
    run: (animate) => [
      ...fillRefs.current.flatMap((fill, i) =>
        fill
          ? [
              animate(
                fill,
                { transform: ["scaleY(0)", "scaleY(1)"] },
                { delay: traceTime(i) + 0.05, duration: 0.3, ease: "easeOut" },
              ),
            ]
          : [],
      ),
      ...(onRun?.(animate) ?? []),
    ],
    finish: () => fillRefs.current.forEach((el) => el && (el.style.transform = "scaleY(1)")),
  });

  const running = reached > 0 && reached < rows.length;
  // Step numbers skip group rows, which show a loop icon instead.
  const numbers = rows.map((_, i) => rows.slice(0, i + 1).filter((r) => !r.group).length);

  return (
    // Rows stretch (up to a limit) to share the panel's height, so a short run
    // spreads into an even timeline instead of leaving the panel half empty.
    <ol ref={listRef} className="flex flex-1 flex-col justify-center px-2 py-3 sm:px-3">
      {rows.map((row, i) => {
        const pass = !!row.pass;
        const lit = i < reached;
        const current = running && i === reached - 1;
        return (
          <li key={row.label} className="relative max-h-[4.5rem] flex-1 last:flex-none">
            {i < rows.length - 1 && (
              // Connector from this step's marker down to the next one; the fill is the trace.
              <span aria-hidden className="absolute top-[18px] left-[calc(0.5rem+11.5px)] z-10 h-full w-px bg-line">
                <span
                  ref={(el) => {
                    fillRefs.current[i] = el;
                  }}
                  className="absolute inset-0 origin-top bg-accent [transform:scaleY(0)]"
                />
              </span>
            )}
            <div
              className={cx(
                "relative flex items-start gap-3 rounded-md px-2 py-1.5 transition-colors duration-300",
                pass ? "my-0.5 bg-pass-soft ring-1 ring-pass ring-inset" : current && "bg-accent-soft/70",
                pass && lit && "pass-hit",
              )}
            >
              <span
                aria-hidden={row.group ? true : undefined}
                className={cx(
                  "relative z-20 grid size-6 shrink-0 place-items-center rounded-full border font-mono text-[11px] font-medium transition-colors duration-300",
                  pass
                    ? "border-pass bg-pass text-on-fill"
                    : lit
                      ? "border-accent bg-accent-soft text-accent"
                      : "border-line bg-surface text-muted",
                )}
              >
                {row.group ? (
                  <LoopIcon className="size-3.5" />
                ) : (
                  // The visible number is the only number; screen readers hear "Step 1".
                  <>
                    <span className="sr-only">Step </span>
                    {numbers[i]}
                  </>
                )}
              </span>
              {row.group ? (
                <span className="min-w-0 pt-0.5">
                  <span className="block font-mono text-[11px] leading-5 font-medium tracking-[0.08em] text-ink uppercase">
                    {row.label}
                    {passLabel && pass && <span className="sr-only"> ({passLabel})</span>}
                  </span>
                  <span className="mt-0.5 flex flex-wrap items-center gap-x-1 gap-y-0.5 font-mono text-xs leading-5 text-ink">
                    {row.group.map((step, j, all) => (
                      <span key={step} className="inline-flex items-center gap-1">
                        {step}
                        {j < all.length - 1 && <ArrowRightIcon className="size-3 shrink-0 text-muted" />}
                      </span>
                    ))}
                  </span>
                </span>
              ) : (
                <span
                  className={cx(
                    "pt-px text-[14.5px] leading-6 transition-colors duration-300",
                    lit || pass || reached === 0 ? "text-ink" : "text-muted",
                    pass && "font-medium",
                  )}
                >
                  {row.label}
                  {passLabel && pass && <span className="sr-only"> ({passLabel})</span>}
                </span>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function LoopIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" fill="none" className={className}>
      <path
        d="M12.5 6.5A4.75 4.75 0 0 0 3.6 5.2M3.5 9.5a4.75 4.75 0 0 0 8.9 1.3M3.2 2.8v2.7h2.7M12.8 13.2v-2.7h-2.7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The brief's RAG pipeline, with its green "judge: grounded" chip. */
function PipelinePanel({ panel, active }: { panel: Extract<ShowcasePanel, { kind: "pipeline" }>; active: boolean }) {
  const { title, chip, steps, caption } = panel;
  const chipRef = useRef<HTMLSpanElement>(null);

  return (
    <figure className="flex flex-1 flex-col">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-line px-4 py-3">
        <span className="font-mono text-[13px] font-medium text-ink">{title}</span>
        <span
          ref={chipRef}
          className="inline-flex items-center gap-1.5 rounded-[4px] bg-pass px-2 py-0.5 font-mono text-xs leading-5 font-medium text-on-fill"
        >
          <CheckIcon className="size-3.5" />
          {chip}
        </span>
      </div>

      <TraceList
        rows={steps}
        active={active}
        onRun={(animate) =>
          chipRef.current
            ? [
                animate(
                  chipRef.current,
                  { transform: ["scale(1)", "scale(1.08)", "scale(1)"] },
                  { delay: traceTime(steps.length), duration: 0.45, ease: "easeOut" },
                ),
              ]
            : []
        }
      />

      <figcaption className="border-t border-line px-4 py-3 text-sm leading-relaxed text-muted">{caption}</figcaption>
    </figure>
  );
}

/**
 * A case study's architecture as a run: the first lane's nodes are the steps,
 * and a later lane that is an evaluation step becomes one green block.
 */
function ProjectPanel({
  panel,
  active,
  labels,
}: {
  panel: Extract<ShowcasePanel, { kind: "project" }>;
  active: boolean;
  labels: ShowcaseLabels;
}) {
  const { title, context, status, href, lanes } = panel;
  const rows: TraceRow[] = lanes.flatMap((lane, k) =>
    k > 0 && lane.pass && lane.label
      ? [{ label: lane.label, pass: true, group: lane.nodes.map((n) => n.label) }]
      : lane.nodes.map((n) => ({ label: n.label, pass: !!n.pass })),
  );

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-start justify-between gap-3 border-b border-line px-4 py-3">
        <div className="min-w-0">
          <p className="font-mono text-xs leading-5 text-muted">{context}</p>
          <p className="mt-0.5 font-display text-lg leading-snug font-semibold tracking-[-0.01em] text-ink">{title}</p>
        </div>
        {status && (
          <span className="shrink-0">
            <StatusChip status={status} />
          </span>
        )}
      </div>

      <TraceList rows={rows} active={active} passLabel={labels.passLabel} />

      <div className="border-t border-line px-4 py-3">
        <Link href={href} className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-accent">
          {labels.caseStudyLink}
          <span className="sr-only">: {title}</span>
          <ArrowRightIcon className="size-4 transition-transform duration-150 group-hover/link:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

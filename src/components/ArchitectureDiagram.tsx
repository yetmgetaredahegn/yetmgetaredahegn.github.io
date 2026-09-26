import type { CSSProperties } from "react";
import { site, type DiagramNode } from "@/content/site";
import { ArrowRightIcon, CheckIcon, cx } from "./ui";

const { passLabel, legend } = site.diagram;

type Props = {
  nodes: DiagramNode[];
  /** Optional lane name, e.g. "Evaluation loop". */
  label?: string;
  /** The whole lane is the AI evaluation / decision step: green nodes, one marker on the label. */
  pass?: boolean;
  /** `full` is the case-study diagram; `compact` is a wrapping chain for cards. */
  variant?: "full" | "compact";
  className?: string;
};

/**
 * Container widths (in rem) at which a full diagram may switch from a vertical
 * stack to a left-to-right row. Each has a matching rule in globals.css.
 */
const ROW_TIERS = [24, 32, 40, 48, 56, 64, 72] as const;

const CHAR_PX = 7.2; // IBM Plex Mono advance at 12px
const NODE_CHROME_PX = 18; // horizontal padding, border and a little slack
const MIN_NODE_PX = 90;
const GAP_PX = 16; // the arrow lives in the column gap

/** Smallest tier where every node fits its longest word on one line, or null if none do. */
function rowTier(nodes: DiagramNode[]) {
  const longestWord = Math.max(...nodes.flatMap((n) => n.label.split(/\s+/).map((w) => w.length)));
  const nodePx = Math.max(longestWord * CHAR_PX + NODE_CHROME_PX, MIN_NODE_PX);
  const needed = nodes.length * nodePx + (nodes.length - 1) * GAP_PX;
  return ROW_TIERS.find((rem) => rem * 16 >= needed) ?? null;
}

function describe(nodes: DiagramNode[], label?: string) {
  return `${label ?? "Architecture"}, from ${nodes[0].label} to ${nodes[nodes.length - 1].label}`;
}

/** Lane heading. A passing lane gets the green marker and the screen-reader label, once. */
function LaneLabel({ label, pass, className }: { label: string; pass?: boolean; className: string }) {
  return (
    <p className={cx("flex items-center gap-1.5 font-mono tracking-[0.08em] text-muted uppercase", className)}>
      {pass && (
        <span aria-hidden className="grid size-4 shrink-0 place-items-center rounded-full bg-pass text-on-fill">
          <CheckIcon className="size-3" />
        </span>
      )}
      {label}
      {pass && <span className="sr-only"> ({passLabel})</span>}
    </p>
  );
}

export function ArchitectureDiagram({ nodes, label, pass: lanePass, variant = "full", className }: Props) {
  // Green if the node or its lane is a pass step; marked per node only when the lane isn't.
  const isGreen = (node: DiagramNode) => lanePass || !!node.pass;
  const isMarked = (node: DiagramNode) => !lanePass && !!node.pass;

  if (variant === "compact") {
    return (
      <div className={className}>
        {label && <LaneLabel label={label} pass={lanePass} className="mb-2 text-[11px]" />}
        <ol aria-label={describe(nodes, label)} className="flex flex-wrap items-center gap-y-2">
          {nodes.map((node, i) => (
            <li key={node.label} className="flex items-center">
              <span
                className={cx(
                  "inline-flex items-center gap-1 rounded-[4px] border px-1.5 py-0.5 font-mono text-xs leading-5 text-ink",
                  isGreen(node) ? "border-pass bg-pass-soft" : "border-line bg-surface",
                )}
              >
                {isMarked(node) && <CheckIcon className="size-3 shrink-0 text-pass" />}
                {node.label}
                {isMarked(node) && <span className="sr-only"> ({passLabel})</span>}
              </span>
              {i < nodes.length - 1 && <ArrowRightIcon className="mx-1 size-3.5 shrink-0 text-muted" />}
            </li>
          ))}
        </ol>
      </div>
    );
  }

  const tier = rowTier(nodes);
  return (
    <div className={cx("arch", className)}>
      {label && <LaneLabel label={label} pass={lanePass} className="mb-4 text-xs font-medium" />}
      <ol
        aria-label={describe(nodes, label)}
        className="arch-list"
        data-row={tier ?? undefined}
        style={{ "--n": nodes.length } as CSSProperties}
      >
        {nodes.map((node, i) => (
          <li key={node.label} className="arch-node">
            <div
              className={cx(
                "relative flex w-full items-center justify-center rounded-md border px-1.5 py-3 text-center font-mono text-xs leading-[1.35] break-words text-ink",
                isGreen(node) ? "border-pass bg-pass-soft font-medium" : "border-line bg-surface",
              )}
            >
              {node.label}
              {isMarked(node) && (
                <>
                  <span
                    aria-hidden
                    className="absolute -top-2 -right-2 grid size-4 place-items-center rounded-full bg-pass text-on-fill"
                  >
                    <CheckIcon className="size-3" />
                  </span>
                  <span className="sr-only"> ({passLabel})</span>
                </>
              )}
            </div>
            {i < nodes.length - 1 && (
              <span aria-hidden className="arch-arrow text-muted">
                <svg className="arch-arrow-h" viewBox="0 0 16 10" fill="none">
                  <path d="M1 5h13M10 1.5 14 5l-4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <svg className="arch-arrow-v" viewBox="0 0 10 28" fill="none">
                  <path d="M5 3v21M1.5 20 5 24l3.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function DiagramLegend() {
  return (
    <p className="flex items-center gap-2 text-sm text-muted">
      <span aria-hidden className="size-3 shrink-0 rounded-[3px] border border-pass bg-pass-soft" />
      {legend}
    </p>
  );
}

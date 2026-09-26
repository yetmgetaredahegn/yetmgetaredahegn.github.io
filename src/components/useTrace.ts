"use client";

import { useEffect, useEffectEvent, useState, type RefObject } from "react";

export type Animate = typeof import("framer-motion/dom/mini").animate;
type Controls = { stop: () => void };

export const TRACE_START_S = 0.35;
export const TRACE_STEP_S = 0.32;

/** Seconds from the start of a trace until step `i` is reached. */
export const traceTime = (i: number) => TRACE_START_S + i * TRACE_STEP_S;

/**
 * Runs a trace over `count` steps once `ref` scrolls into view while `active`,
 * and returns how many steps it has reached. `run` adds Framer Motion
 * animations timed with `traceTime`; `finish` sets their end state instead
 * when the visitor prefers reduced motion. Framer Motion's small WAAPI
 * `animate` is imported on demand, so it stays out of the initial bundle.
 */
export function useTrace(
  ref: RefObject<HTMLElement | null>,
  count: number,
  active: boolean,
  { run, finish }: { run?: (animate: Animate) => Controls[]; finish?: () => void } = {},
) {
  const [reached, setReached] = useState(0);
  const onRun = useEffectEvent((animate: Animate) => run?.(animate) ?? []);
  const onFinish = useEffectEvent(() => finish?.());

  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    const controls: Controls[] = [];
    let cancelled = false;

    const start = async () => {
      if (reduceMotion) {
        setReached(count);
        onFinish();
        return;
      }
      const { animate } = await import("framer-motion/dom/mini");
      if (cancelled) return;
      for (let i = 0; i < count; i++) {
        timers.push(window.setTimeout(() => setReached(i + 1), traceTime(i) * 1000));
      }
      controls.push(...onRun(animate));
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        void start();
      },
      { threshold: 0.5 },
    );
    observer.observe(el);

    return () => {
      cancelled = true;
      observer.disconnect();
      timers.forEach(window.clearTimeout);
      controls.forEach((c) => c.stop());
    };
  }, [ref, count, active]);

  return reached;
}

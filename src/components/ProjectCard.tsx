import Link from "next/link";
import type { CaseStudy } from "@/content/site";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { ArrowRightIcon, ChipList, ExternalIcon, cx } from "./ui";

export function ProjectCard({ study }: { study: CaseStudy }) {
  const featured = !!study.featured;
  const href = `/work/${study.slug}/`;

  const diagram = (
    <div className="canvas-grid flex flex-col gap-4 rounded-md border border-line p-4">
      {study.architecture.map((d) => (
        <ArchitectureDiagram key={d.label ?? "main"} nodes={d.nodes} label={d.label} pass={d.pass} variant="compact" />
      ))}
    </div>
  );

  return (
    <article
      className={cx(
        "group relative flex flex-col rounded-lg border bg-surface p-5 transition-colors duration-150 sm:p-7",
        featured ? "border-accent ring-1 ring-accent lg:p-9" : "border-line hover:border-ink/30",
      )}
    >
      <div className={cx(featured && "lg:grid lg:grid-cols-12 lg:gap-10")}>
        <div className={cx("flex flex-col", featured && "lg:col-span-5")}>
          <p className="font-mono text-[13px] text-muted">{study.context}</p>
          <h3
            className={cx(
              "mt-3 leading-[1.12] font-semibold tracking-[-0.02em]",
              featured ? "text-[1.75rem] sm:text-[2.25rem]" : "text-2xl sm:text-[1.75rem]",
            )}
          >
            {study.title}
          </h3>
          <p className={cx("mt-4 leading-relaxed text-muted", featured ? "text-[17px]" : "text-[15px]")}>
            {study.oneLiner}
          </p>
          {featured && <ChipList items={study.stack} label="Stack" className="mt-6 hidden lg:flex" />}
        </div>

        <div className={cx("mt-6", featured && "lg:col-span-7 lg:mt-0 lg:self-center")}>{diagram}</div>
      </div>

      <ChipList items={study.stack} label="Stack" className={cx("mt-6", featured && "lg:hidden")} />

      <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-7">
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 font-medium text-accent after:absolute after:inset-0 after:rounded-lg"
        >
          Read the case study
          <span className="sr-only">: {study.title}</span>
          <ArrowRightIcon className="size-4 transition-transform duration-150 group-hover:translate-x-0.5" />
        </Link>
        {study.codeUrl && (
          <a
            href={study.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 inline-flex items-center gap-1 text-sm text-muted hover:text-ink"
          >
            View code
            <ExternalIcon className="size-3" />
            <span className="sr-only"> for {study.title} (opens in a new tab)</span>
          </a>
        )}
      </div>
    </article>
  );
}

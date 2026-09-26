import Link from "next/link";
import { getCaseStudy, site } from "@/content/site";
import { Section } from "./Section";
import { ArrowRightIcon, StatusChip } from "./ui";

export function Experience() {
  const { id, label, title } = site.sections.experience;
  const { degree, school, extra } = site.education;
  return (
    <Section id={id} label={label} title={title}>
      <ol className="border-y border-line">
        {site.experience.map((item) => {
          const study = item.caseStudy ? getCaseStudy(item.caseStudy) : undefined;
          return (
            <li key={item.org} className="grid gap-5 border-b border-line py-8 last:border-b-0 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-5">
                <h3 className="text-xl leading-snug font-semibold tracking-[-0.01em]">{item.org}</h3>
                <p className="mt-1.5 text-[15px] leading-snug text-ink">{item.role}</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <StatusChip status={item.status} />
                  <span className="font-mono text-xs text-muted">{item.kind}</span>
                </div>
              </div>
              <div className="md:col-span-7">
                <p className="text-[15px] leading-relaxed text-ink">{item.summary}</p>
                {item.points && (
                  <ul className="mt-4 space-y-2.5">
                    {item.points.map((point) => (
                      <li key={point} className="relative pl-5 text-[15px] leading-relaxed text-muted">
                        <span aria-hidden className="absolute top-[0.7em] left-0 h-px w-2.5 bg-muted" />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
                {study && (
                  <Link
                    href={`/work/${study.slug}/`}
                    className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-medium text-accent"
                  >
                    Case study: {study.title}
                    <ArrowRightIcon className="size-4" />
                  </Link>
                )}
              </div>
            </li>
          );
        })}
        <li className="grid gap-3 py-8 md:grid-cols-12 md:gap-8">
          <h3 className="text-xl font-semibold tracking-[-0.01em] md:col-span-5">Education</h3>
          <div className="md:col-span-7">
            <p className="text-[15px] leading-relaxed text-ink">
              {degree}, {school}
            </p>
            <p className="mt-1 text-[15px] leading-relaxed text-muted">{extra}</p>
          </div>
        </li>
      </ol>
    </Section>
  );
}

import { site } from "@/content/site";
import { Section } from "./Section";

export function Process() {
  const { id, label, title } = site.sections.process;
  const steps = site.process;
  return (
    <Section id={id} label={label} title={title}>
      {/* Same visual language as the diagrams: numbered nodes joined by a line. */}
      <ol className="grid lg:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step.title} className="relative pb-8 pl-12 last:pb-0 lg:pt-12 lg:pr-6 lg:pb-0 lg:pl-0">
            {i < steps.length - 1 && (
              <span
                aria-hidden
                className="absolute top-8 bottom-0 left-[15.5px] w-px bg-line lg:top-[15.5px] lg:right-0 lg:bottom-auto lg:left-8 lg:h-px lg:w-auto"
              />
            )}
            <h3 className="text-lg leading-snug font-semibold tracking-[-0.01em] max-lg:pt-1">
              {/* The visible number is the only number; screen readers hear "Step 1". */}
              <span className="absolute top-0 left-0 grid size-8 place-items-center rounded-full border border-accent bg-accent-soft font-mono text-[13px] font-medium text-accent">
                <span className="sr-only">Step </span>
                {i + 1}
              </span>
              {step.title}
            </h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{step.detail}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

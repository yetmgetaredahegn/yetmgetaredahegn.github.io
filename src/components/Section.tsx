import type { ReactNode } from "react";
import { Container, Eyebrow, cx } from "./ui";

type SectionProps = {
  id: string;
  label: string;
  title: string;
  /** Content spans the full container instead of the right-hand column. */
  wide?: boolean;
  className?: string;
  children: ReactNode;
};

/** Home-page section: mono label in the left rail, title and content on the right. */
export function Section({ id, label, title, wide, className, children }: SectionProps) {
  const titleId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={titleId} className={cx("border-t border-line py-16 sm:py-20 lg:py-24", className)}>
      <Container>
        <div className="grid gap-y-3 lg:grid-cols-12 lg:gap-x-8">
          <Eyebrow className="lg:col-span-3 lg:pt-3">{label}</Eyebrow>
          <h2
            id={titleId}
            className="text-[2rem] leading-[1.1] font-semibold tracking-[-0.02em] sm:text-[2.5rem] lg:col-span-9"
          >
            {title}
          </h2>
        </div>
        <div className={cx("mt-10 sm:mt-12", !wide && "lg:grid lg:grid-cols-12 lg:gap-x-8")}>
          {wide ? children : <div className="lg:col-span-9 lg:col-start-4">{children}</div>}
        </div>
      </Container>
    </section>
  );
}

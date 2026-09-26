import { site } from "@/content/site";
import { CopyEmail } from "./CopyEmail";
import { ButtonLink, Container, Eyebrow } from "./ui";

export function Contact() {
  const { id, label, title } = site.sections.contact;
  const { text, primary, secondary } = site.contact;
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid gap-10 rounded-xl border border-line bg-surface p-5 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-14">
          <div className="lg:col-span-7">
            <Eyebrow>{label}</Eyebrow>
            <h2
              id={`${id}-title`}
              className="mt-4 text-[2.25rem] leading-[1.05] font-semibold tracking-[-0.03em] sm:text-5xl lg:text-[3.5rem]"
            >
              {title}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{text}</p>
            <p className="mt-6 text-sm leading-relaxed text-muted">{site.availability}</p>
          </div>

          <div className="flex flex-col justify-end gap-3 lg:col-span-5">
            <p className="font-mono text-xs font-medium tracking-[0.08em] text-muted uppercase">Email</p>
            <CopyEmail email={site.email} />
            <ButtonLink href={primary.href} external className="mt-3 w-full">
              {primary.label}
            </ButtonLink>
            <div className="grid grid-cols-2 gap-3">
              {secondary.map((link) => (
                <ButtonLink key={link.label} href={link.href} external variant="secondary">
                  {link.label}
                </ButtonLink>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
